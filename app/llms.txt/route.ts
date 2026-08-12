import { SITE_URL } from "@/lib/site";
import { PILLARS, type Pillar } from "@/content/blog/manifest";
import { publishedArticles } from "@/lib/blog";

/**
 * llms.txt, generated from the blog manifest so it never goes stale.
 * Short and curated: brand summary first, then key pages, then published
 * articles grouped by pillar.
 */
export function GET(): Response {
  const articles = publishedArticles();
  const byPillar = new Map<Pillar, typeof articles>();
  for (const a of articles) {
    const list = byPillar.get(a.pillar) ?? [];
    list.push(a);
    byPillar.set(a.pillar, list);
  }

  const sections: string[] = [
    "# Peachblue",
    "",
    "> Peachblue is a creative intelligence platform for digital advertisers. It connects to Meta, TikTok, Google Ads, and Amazon DSP, syncs creative assets and performance data, and uses AI to analyze which ad creatives work and why. It includes Agent Peach (a conversational agent over your own ad data), Reddit brand monitoring, and DSP pacing and client reporting for agencies. Plans from $79/mo, self-serve.",
    "",
    "## Key pages",
    "",
    `- [Home](${SITE_URL}/): product overview`,
    `- [Pricing](${SITE_URL}/pricing): plans from $79/mo Starter to $1,499/mo Agency`,
    `- [Book a demo](${SITE_URL}/demo)`,
    `- [Blog](${SITE_URL}/blog)`,
  ];

  for (const [pillar, list] of byPillar) {
    sections.push("", `## ${PILLARS[pillar].title}`, "");
    for (const a of list) {
      sections.push(`- [${a.title}](${SITE_URL}/blog/${a.slug}): ${a.description}`);
    }
  }

  return new Response(sections.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
