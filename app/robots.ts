import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI crawlers, explicitly allowed: both the training fleets and the
// retrieval/search fleets. Being fetchable by these is how the site appears
// in ChatGPT/Claude/Perplexity answers.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicitly allow Meta's crawlers so ad review never sees a block,
      // even if a future rule tightens the wildcard above.
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "facebookcatalog", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
