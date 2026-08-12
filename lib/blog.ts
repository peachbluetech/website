import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { ARTICLES, type Article } from "@/content/blog/manifest";

/**
 * Server-only helpers joining the blog manifest with the MDX files on disk.
 * The manifest owns all metadata; MDX files are pure article bodies.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog", "posts");

export function postFilePath(slug: string): string {
  return path.join(POSTS_DIR, `${slug}.mdx`);
}

export function publishedArticles(): Article[] {
  return ARTICLES.filter((a) => a.status === "published").sort((a, b) => {
    const da = a.datePublished ?? "";
    const db = b.datePublished ?? "";
    if (da !== db) return db.localeCompare(da);
    return a.priority - b.priority;
  });
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug && a.status === "published");
}

export function relatedArticles(article: Article, limit = 3): Article[] {
  const explicit = (article.related ?? [])
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));
  const siblings = publishedArticles().filter(
    (a) =>
      a.slug !== article.slug &&
      a.pillar === article.pillar &&
      !explicit.some((e) => e.slug === a.slug),
  );
  return [...explicit, ...siblings].slice(0, limit);
}

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

/**
 * Extract h2/h3 headings from the raw MDX for the sticky TOC. Ids use
 * github-slugger, matching what rehype-slug assigns at render time.
 */
export function extractToc(slug: string): TocEntry[] {
  const file = postFilePath(slug);
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
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
    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    entries.push({ id: slugger.slug(text), text, depth });
  }
  return entries;
}

/**
 * Manifest/filesystem drift check, called from generateStaticParams so a bad
 * state fails the build instead of shipping a 404 or an orphaned page.
 */
export function assertManifestIntegrity(): void {
  const published = ARTICLES.filter((a) => a.status === "published");
  for (const a of published) {
    if (!fs.existsSync(postFilePath(a.slug))) {
      throw new Error(
        `Blog manifest drift: "${a.slug}" is published but content/blog/posts/${a.slug}.mdx does not exist.`,
      );
    }
    if (!a.datePublished) {
      throw new Error(`Blog manifest drift: "${a.slug}" is published without datePublished.`);
    }
  }
  if (fs.existsSync(POSTS_DIR)) {
    for (const file of fs.readdirSync(POSTS_DIR)) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      if (!ARTICLES.some((a) => a.slug === slug)) {
        throw new Error(
          `Blog manifest drift: content/blog/posts/${file} has no manifest entry.`,
        );
      }
    }
  }
  const slugs = new Set<string>();
  for (const a of ARTICLES) {
    if (slugs.has(a.slug)) throw new Error(`Blog manifest drift: duplicate slug "${a.slug}".`);
    slugs.add(a.slug);
  }
}
