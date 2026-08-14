import { publishedDocs, rawDocMarkdown } from "@/lib/docs";
import { publishedArticles, postFilePath } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import fs from "node:fs";

/**
 * llms-full.txt — the entire docs (and blog) content as one markdown file,
 * so an AI assistant can ingest everything Peachblue publishes in a single
 * fetch. The Supabase/Mintlify pattern.
 */
export function GET(): Response {
  const parts: string[] = [
    "# Peachblue — full documentation",
    "",
    "> Peachblue is a creative intelligence platform for digital advertisers. It connects to Meta, TikTok, Google Ads, and Amazon DSP, syncs creative assets and performance data, and uses AI to analyze which ad creatives work and why. This file contains the full text of peachblue.io/docs and the Peachblue blog.",
    "",
  ];

  for (const doc of publishedDocs()) {
    const body = rawDocMarkdown(doc.slug);
    if (!body) continue;
    parts.push("---", "", `# ${doc.title}`, "", `Source: ${SITE_URL}/docs/${doc.slug}`, "", body, "");
  }

  for (const article of publishedArticles()) {
    const file = postFilePath(article.slug);
    if (!fs.existsSync(file)) continue;
    parts.push(
      "---",
      "",
      `# ${article.title}`,
      "",
      `Source: ${SITE_URL}/blog/${article.slug}`,
      "",
      fs.readFileSync(file, "utf8"),
      "",
    );
  }

  return new Response(parts.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
