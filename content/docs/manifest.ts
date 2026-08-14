/**
 * Docs manifest — single source of truth for every docs page. Drives the
 * docs index, sidebar nav, sitemap, llms.txt, llms-full.txt, .md siblings,
 * and internal links. Same pattern as content/blog/manifest.ts.
 *
 * Publishing: status "published" requires content/docs/pages/<slug>.mdx.
 * MCP pages stay "draft" until the app's Settings > MCP tab is re-enabled.
 */

export type DocSection = "getting-started" | "integrations" | "product" | "reference" | "mcp";

export interface DocFaqEntry {
  q: string;
  a: string;
}

export interface DocPage {
  slug: string;
  title: string;
  /** Sidebar label, shorter than title. */
  navLabel: string;
  description: string;
  section: DocSection;
  order: number;
  status: "draft" | "published";
  updated: string; // ISO date, drives sitemap lastmod + visible date
  faq?: DocFaqEntry[];
}

export const DOC_SECTIONS: Record<DocSection, { title: string; order: number }> = {
  "getting-started": { title: "Getting started", order: 1 },
  integrations: { title: "Integrations", order: 2 },
  product: { title: "Product guides", order: 3 },
  reference: { title: "Reference", order: 4 },
  mcp: { title: "MCP", order: 5 },
};

export const DOC_PAGES: DocPage[] = [
  {
    slug: "getting-started",
    title: "Getting started with Peachblue",
    navLabel: "Overview",
    description:
      "Connect an ad platform, let the sync run, and get your first creative analysis. What happens in your first hour with Peachblue.",
    section: "getting-started",
    order: 1,
    status: "published",
    updated: "2026-08-13",
    faq: [
      {
        q: "How long until I see my first analysis?",
        a: "The first sync typically completes within minutes for a normal-sized account. Creative analysis runs continuously in the background after sync; most accounts see their first analyzed creatives within the first hour.",
      },
      {
        q: "Do I need a developer to set up Peachblue?",
        a: "No. Every integration is an OAuth sign-in flow: you click Connect, approve access in the platform's own window, and pick the accounts to sync. There is no code, pixel, or tag involved.",
      },
    ],
  },
  {
    slug: "connect-meta",
    title: "Connect Meta (Facebook and Instagram ads)",
    navLabel: "Meta",
    description:
      "Connect your Meta ad accounts to Peachblue: OAuth sign-in, account selection, what data syncs, and how daily syncs work.",
    section: "integrations",
    order: 1,
    status: "published",
    updated: "2026-08-13",
  },
  {
    slug: "connect-tiktok",
    title: "Connect TikTok Ads",
    navLabel: "TikTok",
    description:
      "Connect TikTok advertiser accounts to Peachblue: OAuth flow, advertiser selection, synced data, and sync schedule.",
    section: "integrations",
    order: 2,
    status: "published",
    updated: "2026-08-13",
  },
  {
    slug: "connect-google-ads",
    title: "Connect Google Ads",
    navLabel: "Google Ads",
    description:
      "Connect Google Ads to Peachblue: supported campaign types (Search, Display, Video), RSA text analysis, and what is not yet covered.",
    section: "integrations",
    order: 3,
    status: "published",
    updated: "2026-08-13",
  },
  {
    slug: "connect-amazon-dsp",
    title: "Connect Amazon DSP",
    navLabel: "Amazon DSP",
    description:
      "Connect Amazon DSP to Peachblue: profile selection, what the DSP reporting data includes, 14-day attribution, and backfill limits.",
    section: "integrations",
    order: 4,
    status: "published",
    updated: "2026-08-13",
    faq: [
      {
        q: "Why does my Amazon DSP backfill only go back about 60 days?",
        a: "Amazon's DSP reporting retains roughly 60 days of report data. Peachblue backfills what Amazon makes available and then builds history forward from daily syncs, so your history grows the longer the connection runs.",
      },
      {
        q: "Why do Amazon DSP conversion metrics look different from Meta's?",
        a: "Amazon DSP reports on a 14-day attribution window only; there are no 1-day or 7-day windows. Purchases, detail page views, and new-to-brand metrics are all 14-day. Peachblue labels these accordingly rather than mixing them with other platforms' windows.",
      },
    ],
  },
  {
    slug: "creative-analysis",
    title: "How creative analysis works",
    navLabel: "Creative analysis",
    description:
      "What Peachblue's AI analysis produces for every creative: 31 tagged dimensions, a written expert analysis, copy suggestions, and how credits are consumed.",
    section: "product",
    order: 1,
    status: "published",
    updated: "2026-08-13",
  },
  {
    slug: "scoring",
    title: "How the composite score works",
    navLabel: "Scoring",
    description:
      "How Peachblue scores creatives from 0 to 100, what the performance tiers mean, and why some creatives show Insufficient Data.",
    section: "product",
    order: 2,
    status: "published",
    updated: "2026-08-13",
    faq: [
      {
        q: "Why does a creative show Insufficient Data instead of a score?",
        a: "Scores need conversion signals to be meaningful. A creative with no return-on-ad-spend and no cost-per-acquisition data cannot be fairly ranked, so Peachblue labels it Insufficient Data instead of guessing.",
      },
      {
        q: "Is the score absolute or relative to my account?",
        a: "Relative. Scores are percentile-based across the creatives in your account, so a Top Performer is a top performer among your ads. This makes the score an answer to 'what should I scale next' rather than an industry benchmark.",
      },
    ],
  },
  {
    slug: "reports-and-pacing",
    title: "Reports and pacing",
    navLabel: "Reports + pacing",
    description:
      "Client-ready date-range reports with PDF and CSV export, and per-order Amazon DSP flight pacing with CPM goals and agency margin.",
    section: "product",
    order: 3,
    status: "published",
    updated: "2026-08-13",
  },
  {
    slug: "brand-intel",
    title: "Brand Intel: Reddit monitoring",
    navLabel: "Brand Intel",
    description:
      "Track what people say about your brand, competitors, and topics on Reddit: keywords, sentiment, and the AI editorial brief.",
    section: "product",
    order: 4,
    status: "published",
    updated: "2026-08-13",
    faq: [
      {
        q: "How many keywords can I track?",
        a: "Up to 20 tracked keywords per workspace, across brand, competitor, and topic types. Agency workspaces get a separate 20-keyword budget per client.",
      },
    ],
  },
  {
    slug: "agent-peach",
    title: "Agent Peach: ask your ad data anything",
    navLabel: "Agent Peach",
    description:
      "What Agent Peach can answer about your accounts, how it grounds every answer in your own data, and per-plan message allowances.",
    section: "product",
    order: 5,
    status: "published",
    updated: "2026-08-13",
  },
  {
    slug: "credits-and-billing",
    title: "Credits, plans, and billing",
    navLabel: "Credits + billing",
    description:
      "How analysis credits work (5 per image or text creative, 10 per video), monthly resets, plan limits, trials, and changing plans.",
    section: "reference",
    order: 1,
    status: "published",
    updated: "2026-08-13",
    faq: [
      {
        q: "What happens when I run out of credits?",
        a: "Analysis pauses and queued creatives wait. Everything resumes automatically when your credits reset at the start of the next billing period, or immediately if you upgrade. Already-analyzed creatives, scores, and reports remain fully available.",
      },
      {
        q: "Do unused credits roll over?",
        a: "Credits reset at the start of each billing period. Check the Billing tab in Settings for your current balance and reset date.",
      },
    ],
  },
  {
    slug: "data-access-and-deletion",
    title: "Data access and deletion",
    navLabel: "Data + deletion",
    description:
      "Exactly what data Peachblue accesses from each ad platform, where creative assets are stored, and how to disconnect or request deletion.",
    section: "reference",
    order: 2,
    status: "published",
    updated: "2026-08-13",
  },
  // MCP pages: written and ready, held until the app's Settings > MCP tab
  // is re-enabled. Flip status to "published" then.
  {
    slug: "mcp",
    title: "Peachblue MCP: your ad data in Claude and Cursor",
    navLabel: "MCP setup",
    description:
      "Connect Peachblue to Claude Desktop, Claude Code, or Cursor over the Model Context Protocol: OAuth sign-in, connection URL, and what your AI can query.",
    section: "mcp",
    order: 1,
    status: "draft",
    updated: "2026-08-13",
  },
  {
    slug: "mcp-tools",
    title: "MCP tool reference",
    navLabel: "Tool reference",
    description:
      "Every tool the Peachblue MCP server exposes: performance summaries, creative rankings, comparisons, audience insights, patterns, and more.",
    section: "mcp",
    order: 2,
    status: "draft",
    updated: "2026-08-13",
  },
];
