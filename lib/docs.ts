import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { DOC_PAGES, DOC_SECTIONS, type DocPage, type DocSection } from "@/content/docs/manifest";
import type { TocEntry } from "@/lib/blog";

/** Server-only helpers joining the docs manifest with MDX files on disk. */

const DOCS_DIR = path.join(process.cwd(), "content", "docs", "pages");

export function docFilePath(slug: string): string {
  return path.join(DOCS_DIR, `${slug}.mdx`);
}

export function publishedDocs(): DocPage[] {
  return DOC_PAGES.filter((p) => p.status === "published").sort((a, b) => {
    const sa = DOC_SECTIONS[a.section].order;
    const sb = DOC_SECTIONS[b.section].order;
    if (sa !== sb) return sa - sb;
    return a.order - b.order;
  });
}

export function getDoc(slug: string): DocPage | undefined {
  return DOC_PAGES.find((p) => p.slug === slug && p.status === "published");
}

export function docsBySection(): { section: DocSection; title: string; pages: DocPage[] }[] {
  const grouped = new Map<DocSection, DocPage[]>();
  for (const p of publishedDocs()) {
    const list = grouped.get(p.section) ?? [];
    list.push(p);
    grouped.set(p.section, list);
  }
  return [...grouped.entries()]
    .sort((a, b) => DOC_SECTIONS[a[0]].order - DOC_SECTIONS[b[0]].order)
    .map(([section, pages]) => ({ section, title: DOC_SECTIONS[section].title, pages }));
}

/** Raw MDX body for .md siblings and llms-full.txt. */
export function rawDocMarkdown(slug: string): string | null {
  const file = docFilePath(slug);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

export function extractDocToc(slug: string): TocEntry[] {
  const raw = rawDocMarkdown(slug);
  if (!raw) return [];
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const line of raw.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(##{1,2})\s+(.+)$/.exec(line);
    if (!match) continue;
    entries.push({
      id: slugger.slug(match[2].replace(/[*_`]/g, "").trim()),
      text: match[2].replace(/[*_`]/g, "").trim(),
      depth: match[1].length as 2 | 3,
    });
  }
  return entries;
}

export function assertDocsIntegrity(): void {
  for (const p of DOC_PAGES.filter((p) => p.status === "published")) {
    if (!fs.existsSync(docFilePath(p.slug))) {
      throw new Error(
        `Docs manifest drift: "${p.slug}" is published but content/docs/pages/${p.slug}.mdx does not exist.`,
      );
    }
  }
  if (fs.existsSync(DOCS_DIR)) {
    for (const file of fs.readdirSync(DOCS_DIR)) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      if (!DOC_PAGES.some((p) => p.slug === slug)) {
        throw new Error(`Docs manifest drift: content/docs/pages/${file} has no manifest entry.`);
      }
    }
  }
  const slugs = new Set<string>();
  for (const p of DOC_PAGES) {
    if (slugs.has(p.slug)) throw new Error(`Docs manifest drift: duplicate slug "${p.slug}".`);
    slugs.add(p.slug);
  }
}
