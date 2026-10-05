import {
  DEMO_HREF,
  PRO_HREF,
  RISK_REVERSAL,
  SALES_HREF,
  STARTER_HREF,
  TRIAL_HREF,
  TRIAL_LABEL,
} from "@/lib/site";

/* Homepage copy, as data. Transcribed word for word from the published
   homepage, so sections can be rearranged and restyled without rewording
   them. Rules for editing this file:

   - Every string here is published, indexed copy. Statistics and product
     claims come from content/blog/truth; do not change a digit or a word
     without checking there first.
   - Headlines are stored as plain text. The page sets headings upright;
     a phrase set in the accent colour is styling, applied where the
     heading is rendered.
   - Apostrophes are the characters the live page renders: typographic in
     most body copy, straight in a few strings. Leave them as they are.
   - Call-to-action labels and hrefs are the constants from lib/site.ts,
     never literals, so the self-serve gate keeps working.
   - Some links on the live page end with a trailing arrow, so their anchor
     text is "Label →". Every link below records that in `arrow`. When
     it is true, render the link so the arrow stays inside the anchor
     (the homepage's links in parts.tsx and the site's in
     components/site/Button.tsx take an `arrow` prop). The filled primary
     button may drop its arrow; the text links keep theirs.
   - Section ids (product, platforms, pricing, faq, demo) are linked from
     the nav, the footer and possibly from outside the site. Keep them. */

/* ── Types ──────────────────────────────────────────────────────── */

export type Cta = {
  label: string;
  href: string;
  /* True where the live anchor text ends with a trailing arrow. */
  arrow: boolean;
};

export type TitledText = { title: string; text: string };

export type FeatureCopy = {
  eyebrow: string;
  headline: string;
  bullets: [string, string, string, string, string];
  cta: Cta;
};

export type HowItWorksStep = { num: string; title: string; desc: string };

/* Same shape as Cta. On the live page only the last of the four platform
   links carries the arrow. */
export type PlatformLink = Cta;

/* Each row is one link wrapping the title and the description. From md up
   the live row also ends with a decorative arrow, hidden from assistive
   tech, inside the same link. */
export type ToolkitRow = { title: string; desc: string; href: string };

export type PlanTeaser = {
  name: string;
  blurb: string;
  /* As displayed: "$79", "$199", "Custom". */
  price: string;
  /* "/mo" beside a dollar price; null where the price is "Custom". */
  cadence: string | null;
  cta: Cta;
  /* The plan that carries the badge and the one filled button. */
  popular: boolean;
};

export type FaqPair = { q: string; a: string };

/* ── Anchors ────────────────────────────────────────────────────── */

export const SECTION_IDS = {
  howItWorks: "product",
  platforms: "platforms",
  pricing: "pricing",
  faq: "faq",
  finalCta: "demo",
} as const;

/* ── Hero ───────────────────────────────────────────────────────── */

export const HERO: {
  keywordHeading: string;
  headline: string;
  subhead: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  riskReversal: string;
} = {
  /* The page's h1 text today (visually hidden on the live page). It must
     stay in the one h1, character for character. */
  keywordHeading: "Peachblue: AI creative intelligence for Meta, TikTok, Google Ads, and Amazon DSP",
  headline: "The intelligence layer for ad creative.",
  subhead:
    "Peachblue turns your ad data and creative into the blueprint for your next winning ad. Create what works. Cut what doesn’t. Get smarter every time.",
  primaryCta: { label: TRIAL_LABEL, href: TRIAL_HREF, arrow: true },
  /* No arrow here; the same link in the final section has one. */
  secondaryCta: { label: "Book a demo", href: DEMO_HREF, arrow: false },
  riskReversal: RISK_REVERSAL,
};

/* ── Essay: the judgment gap ────────────────────────────────────── */

export const ESSAY: {
  eyebrow: string;
  headline: string;
  paragraphs: [string, string, string];
} = {
  eyebrow: "Why Peachblue exists",
  headline: "The creative feedback loop is broken.",
  paragraphs: [
    "Ad creation has never been faster. AI writes the scripts, cuts the variants, and fills the queue, and 82% of teams now use it to generate ideas. But only 7% trust it with the decision that actually moves budget: which ad to make next.",
    "The making got automated. The judgment didn’t.",
    "Peachblue closes that gap. It connects your creative to your performance data across every platform, finds the patterns behind what works, and turns those insights into a blueprint for your next winning creative.",
  ],
};

/* ── How it works (#product) ────────────────────────────────────── */

export const HOW_IT_WORKS: {
  id: string;
  eyebrow: string;
  steps: [HowItWorksStep, HowItWorksStep, HowItWorksStep];
} = {
  id: SECTION_IDS.howItWorks,
  eyebrow: "How it works",
  steps: [
    {
      num: "01",
      title: "Connect",
      desc: "Secure OAuth to Meta, TikTok, Google Ads, and Amazon DSP. Peachblue syncs your creatives and daily performance automatically, every day.",
    },
    {
      num: "02",
      title: "Analyze",
      desc: "AI reads every image and video: hook, tone, format, CTA, 31 dimensions in all. Every creative is scored against the objective its campaign was bought for.",
    },
    {
      num: "03",
      title: "Act",
      desc: "Every finding arrives with an action and a dollar figure. Scale, cut, fix, and when you’re ready, turn what’s working into your next set of winning ads.",
    },
  ],
};

/* ── Feature: Agent Peach ───────────────────────────────────────── */

export const AGENT_PEACH: FeatureCopy = {
  eyebrow: "Agent Peach",
  headline: "Ask your ad accounts anything.",
  bullets: [
    "One conversation across every account you run: Meta, TikTok, Google, Amazon DSP",
    "Answers grounded in your real performance data, not generic advice",
    "Every number states the time window it came from, so you can audit any answer",
    "Follow-up questions reuse the data behind earlier answers instead of guessing",
    "Ranked creative lists, head-to-head comparisons, and deep dives",
  ],
  cta: { label: TRIAL_LABEL, href: TRIAL_HREF, arrow: true },
};

/* ── Creative Economics band ────────────────────────────────────── */

export const ECONOMICS: {
  eyebrow: string;
  headline: string;
  subhead: string;
  cards: [TitledText, TitledText, TitledText];
  cta: Cta;
} = {
  eyebrow: "Creative Economics",
  headline: "How much budget reached creatives that earned it?",
  subhead: "Hit rate, waste in dollars, bench depth, and fatigue, computed from your daily data.",
  cards: [
    {
      title: "Hit rate",
      text: "How often a qualified launch becomes a winner, so you know if new creative is earning its spend.",
    },
    {
      title: "Waste, in dollars",
      text: "Exactly how much budget went to creatives that never performed, with a bleeding-now list to catch drains early.",
    },
    {
      title: "Bench and fatigue",
      text: "Hero concentration, what's ready behind it, and fatigue flagged against each creative's own best week.",
    },
  ],
  cta: { label: TRIAL_LABEL, href: TRIAL_HREF, arrow: true },
};

/* ── The weekly report ──────────────────────────────────────────── */

export const WEEKLY_REPORT: {
  eyebrow: string;
  headline: string;
  subhead: string;
  blurbs: [TitledText, TitledText, TitledText];
} = {
  eyebrow: "The weekly report",
  headline: "Peachblue tells you.",
  subhead:
    "Your Today worklist updates with every sync. The full report lands Monday morning, in your inbox and your Slack.",
  blurbs: [
    {
      title: "Daily, in the app",
      text: "Today refreshes as each platform syncs: new winners, drains, and fatigue flags, every one carrying its dollars.",
    },
    {
      title: "Monday, in your inbox",
      text: "Spend and ROAS against the week before, plus waste, hit rate, and the one thing to act on.",
    },
    {
      title: "And in your Slack",
      text: "The same report posts to the channel your team already reads, so nobody has to log in to see it.",
    },
  ],
};

/* ── Feature: Next Creative Brief ───────────────────────────────── */

export const NEXT_CREATIVE_BRIEF: FeatureCopy = {
  eyebrow: "Next Creative Brief",
  headline: "Stop guessing what to make next.",
  bullets: [
    "One click turns your account’s proven patterns into a brief your creative team can build from",
    "Proven hooks with their real CTRs, and reference ads labeled as top performers",
    "Do and don’t rules in plain language, with the evidence behind each one",
    "A generation-ready prompt block for whichever creative tool you use",
    "Share it with a public link, no login needed on the other end",
  ],
  cta: { label: TRIAL_LABEL, href: TRIAL_HREF, arrow: true },
};

/* ── Manifesto interlude ────────────────────────────────────────── */

export const MANIFESTO: { lines: [string, string]; source: string } = {
  /* One statement set on two lines; on the live page it is a paragraph,
     not a heading. */
  lines: ["Automation took targeting and bidding.", "Creative is the lever you still own."],
  source:
    "Creative quality drives roughly 56% of auction outcomes, more than bid, targeting, and placement combined, per Meta data science.",
};

/* ── Amazon DSP callout (#platforms) ────────────────────────────── */

export const PLATFORMS_CALLOUT: {
  id: string;
  lead: string;
  text: string;
  links: [PlatformLink, PlatformLink, PlatformLink, PlatformLink];
} = {
  id: SECTION_IDS.platforms,
  /* The live page sets the lead in semibold, then the rest of the sentence. */
  lead: "Amazon DSP, included.",
  text: "No creative analytics tool at self-serve pricing touches DSP.",
  links: [
    { label: "Meta", href: "/integrations/meta", arrow: false },
    { label: "TikTok", href: "/integrations/tiktok", arrow: false },
    { label: "Google Ads", href: "/integrations/google-ads", arrow: false },
    { label: "Amazon DSP", href: "/integrations/amazon-dsp", arrow: true },
  ],
};

/* ── Toolkit index ──────────────────────────────────────────────── */

export const TOOLKIT: {
  eyebrow: string;
  rows: [ToolkitRow, ToolkitRow, ToolkitRow, ToolkitRow, ToolkitRow];
} = {
  eyebrow: "Also in Peachblue",
  rows: [
    {
      title: "Brand Intel",
      desc: "Reddit brand monitoring: sentiment on every mention, plus an AI editorial brief.",
      href: "/docs/brand-intel",
    },
    {
      title: "Reports and pacing",
      desc: "Client-ready reports, DSP flight pacing, and agency margin baked in.",
      href: "/docs/reports-and-pacing",
    },
    {
      title: "Your data in Claude",
      desc: "The 23-tool MCP server, included on Pro and up.",
      href: "/mcp",
    },
    {
      title: "Objective-aware scoring",
      desc: "Reach ranks for awareness creatives, with components you can audit.",
      href: "/docs/scoring",
    },
    {
      title: "Creative Library",
      desc: "Every ad and creative, tagged, filterable, and deep-linkable.",
      href: "/docs/creative-analysis",
    },
  ],
};

/* ── Pricing teaser (#pricing) ──────────────────────────────────── */

export const PRICING_TEASER: {
  id: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  popularBadge: string;
  plans: [PlanTeaser, PlanTeaser, PlanTeaser];
  allPlans: Cta;
} = {
  id: SECTION_IDS.pricing,
  eyebrow: "Pricing",
  headline: "Plans that scale with your ad spend.",
  subhead: "Starter and Pro start with a 7-day trial. Upgrade, downgrade, or cancel anytime.",
  popularBadge: "Most popular",
  plans: [
    {
      name: "Starter",
      blurb: "For solo advertisers getting started.",
      price: "$79",
      cadence: "/mo",
      cta: { label: TRIAL_LABEL, href: STARTER_HREF, arrow: false },
      popular: false,
    },
    {
      name: "Pro",
      blurb: "For growing teams running multiple channels.",
      price: "$199",
      cadence: "/mo",
      cta: { label: TRIAL_LABEL, href: PRO_HREF, arrow: false },
      popular: true,
    },
    {
      name: "Agency",
      blurb: "For agencies managing many clients.",
      price: "Custom",
      cadence: null,
      cta: { label: "Talk to sales", href: SALES_HREF, arrow: false },
      popular: false,
    },
  ],
  allPlans: { label: "See all plans", href: "/pricing", arrow: true },
};

/* ── FAQ (#faq) ─────────────────────────────────────────────────── */

export const FAQ: {
  id: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  pairs: [FaqPair, FaqPair, FaqPair, FaqPair, FaqPair, FaqPair];
} = {
  id: SECTION_IDS.faq,
  eyebrow: "Questions",
  headline: "Good to know.",
  subhead: "Everything you might want to check before starting a trial.",
  pairs: [
    {
      q: "Which platforms does Peachblue support?",
      a: "Meta, TikTok, Google Ads, and Amazon DSP are all live today. Connect any of them via secure OAuth and Peachblue syncs your creatives and performance data automatically, every day.",
    },
    {
      q: "How does the 7-day trial work?",
      a: "Starter and Pro start with a 7-day trial: add your card, try everything in your plan, and cancel before day 7 if it's not for you. Scale, Power, and Agency start right away, and you can book a walkthrough anytime.",
    },
    {
      q: "Is my ad data secure?",
      a: "Yes. OAuth tokens are encrypted at rest, every workspace is isolated at the organization level, and you can disconnect a platform and delete your synced data at any time.",
    },
    {
      q: "Does Peachblue work for agencies?",
      a: "Yes. The Agency plan adds multi-client workspaces with a client switcher, per-client scoping across the whole app, and margin-aware reports so what you show clients matches what you invoice.",
    },
    {
      q: "Can I cancel or change plans?",
      a: "Anytime. Upgrade or downgrade from Settings and changes take effect right away and billing is adjusted on your next invoice. Cancel whenever you like.",
    },
    {
      q: "Do you support Amazon DSP?",
      a: "Yes, and we lead with it. Peachblue syncs Amazon DSP campaigns with flight pacing and DSP-aware reporting built in. Very few tools in this category cover DSP at all.",
    },
  ],
};

/* ── Final CTA (#demo) ──────────────────────────────────────────── */

export const FINAL_CTA: {
  id: string;
  eyebrow: string;
  headlineLines: [string, string];
  subhead: string;
  primaryCta: Cta;
  riskReversal: string;
  secondaryCta: Cta;
} = {
  id: SECTION_IDS.finalCta,
  eyebrow: "Get started",
  /* Two lines of one h2; the live page breaks between them. */
  headlineLines: ["See what's working.", "Make more of it."],
  subhead: "Connect your first platform and see your own creatives analyzed today.",
  primaryCta: { label: TRIAL_LABEL, href: TRIAL_HREF, arrow: true },
  riskReversal: RISK_REVERSAL,
  secondaryCta: { label: "Book a demo", href: DEMO_HREF, arrow: true },
};
