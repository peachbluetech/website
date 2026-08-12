import { SITE_URL } from "@/lib/site";
import { publishedArticles } from "@/lib/blog";
import { bylineName } from "@/components/blog/PostMeta";

function escapeXml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET(): Response {
  const articles = publishedArticles();
  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/blog/${a.slug}`;
      const pubDate = new Date(`${a.datePublished}T12:00:00Z`).toUTCString();
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(a.description)}</description>
      <author>hello@peachblue.io (${escapeXml(bylineName(a.byline))})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Peachblue blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Practitioner guides on creative analytics, Amazon DSP reporting, and AI for media buying.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
