/* The pricing page's data: the five plans, the comparison table and the
   questions. Plain data, read by the server-rendered page. */

export type Plan = {
  id: string;
  name: string;
  /** USD per month. A year costs exactly ten months. */
  monthly: number;
  seats: string;
  tagline: string;
  /** The plan this one builds on: "Everything in X, plus:". */
  inherits?: string;
  features: string[];
  popular?: boolean;
  cta: "trial" | "buy" | "sales";
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 79,
    seats: "1 seat",
    tagline: "For solo advertisers getting started.",
    features: [
      "Meta + TikTok auto-sync",
      "31-dimension AI creative analysis (400 credits/mo)",
      "Creative Library + objective-aware scoring",
      "Agent Peach chat (500 messages/mo)",
      "Weekly digest email + Slack delivery",
    ],
    cta: "trial",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 199,
    seats: "3 seats",
    tagline: "For growing teams running multiple channels.",
    inherits: "Starter",
    features: [
      "Google Ads auto-sync",
      "Creative intelligence patterns",
      "Next Creative Brief (shareable, generation-ready)",
      "Brand Intel (Reddit monitoring)",
      "Full history",
      "MCP/API access (your data in Claude)",
      "1,500 credits/mo",
      "3,000 agent messages/mo",
    ],
    popular: true,
    cta: "trial",
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 499,
    seats: "10 seats",
    tagline: "For teams scaling spend across platforms.",
    inherits: "Pro",
    features: [
      "Amazon DSP sync",
      "10 seats for the whole team",
      "4,000 credits/mo",
      "Unlimited agent messages",
    ],
    cta: "buy",
  },
  {
    id: "power",
    name: "Power",
    monthly: 799,
    seats: "8 seats",
    tagline: "For in-house teams reporting to stakeholders.",
    inherits: "Scale",
    features: [
      "Client-ready reports + pacing",
      "Priority support + onboarding",
      "6,000 credits/mo",
    ],
    cta: "buy",
  },
  {
    id: "agency",
    name: "Agency",
    monthly: 1499,
    seats: "25 seats",
    tagline: "For agencies managing many clients.",
    inherits: "Power",
    features: [
      "Multi-client workspaces (client switcher, per-client scoping)",
      "Per-client reports, Intelligence + Brand Intel",
      "Agency margin/markup on reports",
      "25 seats across your roster",
      "15,000 credits/mo",
    ],
    cta: "sales",
  },
];

export type CompareValue = boolean | string;
export type CompareGroup = {
  title: string;
  rows: {
    label: string;
    values: [CompareValue, CompareValue, CompareValue, CompareValue, CompareValue];
  }[];
};

/* Column order matches PLANS: Starter, Pro, Scale, Power, Agency. */
export const COMPARE: CompareGroup[] = [
  {
    title: "Platforms",
    rows: [
      { label: "Meta auto-sync", values: [true, true, true, true, true] },
      { label: "TikTok auto-sync", values: [true, true, true, true, true] },
      { label: "Google Ads sync", values: [false, true, true, true, true] },
      { label: "Amazon DSP sync", values: [false, false, true, true, true] },
    ],
  },
  {
    title: "Creative analysis",
    rows: [
      { label: "AI creative analysis (31 dimensions)", values: [true, true, true, true, true] },
      { label: "Objective-aware scoring + performance tiers", values: [true, true, true, true, true] },
      { label: "Creative economics (hit rate, waste in dollars, fatigue)", values: [true, true, true, true, true] },
      { label: "Creative Library (By Ad / By Creative)", values: [true, true, true, true, true] },
      { label: "Performance history", values: ["30 days", "Full", "Full", "Full", "Full"] },
      { label: "Creative intelligence patterns", values: [false, true, true, true, true] },
      { label: "Next Creative Brief (shareable, generation-ready)", values: [false, true, true, true, true] },
      { label: "Brand Intel (Reddit monitoring)", values: [false, true, true, true, true] },
    ],
  },
  {
    title: "Agent + integrations",
    rows: [
      { label: "Agent Peach messages", values: ["500/mo", "3,000/mo", "Unlimited", "Unlimited", "Unlimited"] },
      { label: "MCP/API access (your data in Claude)", values: [false, true, true, true, true] },
      { label: "Daily performance digest", values: [true, true, true, true, true] },
      { label: "Weekly digest email + Slack delivery", values: [true, true, true, true, true] },
    ],
  },
  {
    title: "Reporting",
    rows: [
      { label: "Client-ready reports + pacing", values: [false, false, false, true, true] },
      { label: "Agency margin/markup on reports", values: [false, false, false, false, true] },
      { label: "Multi-client workspaces", values: [false, false, false, false, true] },
    ],
  },
  {
    title: "Limits + support",
    rows: [
      { label: "Seats", values: ["1", "3", "10", "8", "25"] },
      { label: "Credits per month", values: ["400", "1,500", "4,000", "6,000", "15,000"] },
      { label: "Priority support + onboarding", values: [false, false, false, true, true] },
    ],
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What counts as a credit?",
    a: "Credits pay for AI creative analysis. An image or text creative uses 5 credits and a video uses 10, which covers the full analysis: visual breakdown, copy strategy, and intelligence tags. A creative that has already been analyzed is never charged twice. Credits reset every month.",
  },
  {
    q: "What happens after the trial?",
    a: "Starter and Pro start with a 7-day trial: add your card, try everything in your plan, and cancel before day 7 if it's not for you. Scale, Power, and Agency start right away with a walkthrough available whenever you want one.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade at any time from Settings. Changes take effect right away and billing is adjusted on your next invoice.",
  },
  {
    q: "Which platforms can I connect?",
    a: "Meta and TikTok on Starter. Pro adds Google Ads. Scale and up add Amazon DSP.",
  },
];
