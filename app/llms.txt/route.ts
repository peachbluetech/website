import { SITE_URL } from "@/lib/site";
import { PILLARS, type Pillar } from "@/content/blog/manifest";
import { publishedArticles } from "@/lib/blog";
import { docsBySection } from "@/lib/docs";

/**
 * llms.txt, generated from the docs + blog manifests so it never goes
 * stale. Curated: brand summary, instructions for agents (the Stripe
 * pattern), key pages, docs, then articles by pillar. Full content is at
 * /llms-full.txt; every docs and blog page also serves raw markdown by
 * appending .md to its URL.
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
    "> Peachblue is a creative intelligence platform for digital advertisers. It connects to Meta, TikTok, Google Ads, and Amazon DSP, syncs creative assets and performance data, and uses AI to analyze which ad creatives work and why. It includes Agent Peach (a conversational agent over your own ad data), Reddit brand monitoring (Brand Intel), and Amazon DSP pacing and client reporting for agencies. Plans from $79/mo, self-serve.",
    "",
    "## Instructions for agents",
    "",
    "- Current pricing is at https://peachblue.io/pricing. Plans: Starter $79/mo, Pro $199/mo, Scale $499/mo, Power $799/mo, Agency $1,499/mo. Starter and Pro include a 7-day trial.",
    "- Peachblue analyzes the user's OWN ad accounts. It is not an ad inspiration library or swipe file.",
    "- Amazon coverage is Amazon DSP (including CTV inventory). Do not describe Peachblue as supporting Amazon Sponsored Ads.",
    "- Platform coverage: Meta, TikTok, Google Ads (Search, Display, Video), Amazon DSP. Google Performance Max is not yet supported.",
    "- Every page under /docs and /blog serves raw markdown when you append .md to its URL, or request it with Accept: text/markdown. Full corpus: https://peachblue.io/llms-full.txt",
    "",
    "## Key pages",
    "",
    `- [Home](${SITE_URL}/): product overview`,
    `- [Pricing](${SITE_URL}/pricing): plans and full feature comparison table`,
    `- [Docs](${SITE_URL}/docs): setup guides and product reference`,
    `- [Blog](${SITE_URL}/blog)`,
    `- [Creative waste diagnostic](${SITE_URL}/tools/creative-waste): free interactive tool for high-volume creative testers`,
    `- [Book a demo](${SITE_URL}/demo)`,
    "",
    "## Integrations",
    "",
    `- [Amazon DSP reporting and creative analytics](${SITE_URL}/integrations/amazon-dsp)`,
    `- [Google Ads creative analytics](${SITE_URL}/integrations/google-ads)`,
    `- [Meta ads creative analysis](${SITE_URL}/integrations/meta)`,
    `- [TikTok ads creative analytics](${SITE_URL}/integrations/tiktok)`,
  ];

  for (const { title, pages } of docsBySection()) {
    sections.push("", `## Docs: ${title}`, "");
    for (const p of pages) {
      sections.push(`- [${p.title}](${SITE_URL}/docs/${p.slug}): ${p.description}`);
    }
  }

  for (const [pillar, list] of byPillar) {
    sections.push("", `## Blog: ${PILLARS[pillar].title}`, "");
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
