/* Sample content for the Agent Peach recreations. Every figure on a card
   is read from the canonical account (components/product/sample.ts); what
   is defined here is the wording around those figures: questions, answers,
   campaign names, the sources trail. Answers follow the agent's own voice:
   two or three plain sentences, the data window named in the prose, no
   list of the figures the card already shows. */

import { ACCOUNT, CREATIVES, type SampleCreative } from "../sample";

/* A creative as the agent returns it: the canonical row plus the
   campaign line the card prints above the name. */
export type AgentCard = {
  creative: SampleCreative;
  /** Campaign name, shown when the creative runs in one campaign. */
  campaign?: string;
  /** More than one: the card prints "2 campaigns" instead of a name. */
  campaignCount?: number;
  /** More than one: the spotlight prints "3 ads". */
  adCount?: number;
  /** The one-line observation under the spotlight's figures. */
  insight?: string;
};

/* ── Home ─────────────────────────────────────────────────────────── */

/* The subtitle and placeholder exactly as the app shows them to a brand
   account with no client in scope. The thread composer shows this same
   placeholder in every scope. AgentHome takes subtitle and placeholder
   props where a placement wants other words. */
export const HOME_SUBTITLE = "Ask about pacing, suppliers, creatives or what changed. Every answer shows its sources.";
export const COMPOSER_PLACEHOLDER = "Ask about pacing, suppliers, creatives or what changed…";

/** What sits typed in the composer, ready to send. */
export const HOME_TYPED = "What's winning across all my accounts?";

/* The app's starter set for a conversion account, in source order. */
export const QUESTION_GROUPS: Array<{ group: string; items: string[] }> = [
  { group: "Results", items: ["What's killing ROAS this week?", "Which campaign should I scale?"] },
  { group: "Creatives", items: ["Why is my top ad working?", "Which creative is starting to fatigue?"] },
  { group: "Risk", items: ["What's my riskiest campaign?", "Where is spend flowing to losers?"] },
  { group: "This week", items: ["What changed since last week?", "Write the Monday update email for the client."] },
];

/* A conversation is titled by its first question. Ages as the app prints
   them: hours, then "yesterday", then days. */
export const RECENT: Array<{ title: string; ago: string }> = [
  { title: "Show me my top five creatives this week", ago: "2h ago" },
  { title: "Compare Little can. Big mood. with Currently obsessed", ago: "yesterday" },
  { title: "Why is Not just another soda. losing clicks?", ago: "2d ago" },
  { title: "Where is spend flowing to losers?", ago: "5d ago" },
  { title: "Which creative is starting to fatigue?", ago: "9d ago" },
];

/* ── Thread: one creative (spotlight) ─────────────────────────────── */

export const SPOTLIGHT = {
  question: "What's winning across all my accounts?",
  answer:
    "Over the last 7 days, Little can. Big mood. is the clear winner across Meta, TikTok and Google Ads. It launched 7 days ago and already takes more spend than any other creative while converting at the lowest cost per purchase in the account. It has no history yet, so scale it in steps and watch for the click rate to soften.",
  card: {
    creative: CREATIVES.bigMood,
    campaign: "Advantage+ Shopping",
    adCount: 3,
    insight: "One can in a splash on flat blue, headline above it. Studio backdrops are the strongest setting in this account.",
  } satisfies AgentCard,
};

/* ── Thread: ranked list ──────────────────────────────────────────── */

const RANKED_CARDS: AgentCard[] = [
  { creative: CREATIVES.bigMood, campaign: "Advantage+ Shopping" },
  { creative: CREATIVES.zeroSugar, campaignCount: 3 },
  { creative: CREATIVES.wouldRebuy, campaign: "Spark Ads · Creators" },
  { creative: CREATIVES.anytime, campaign: "Spark Ads · Creators" },
  { creative: CREATIVES.faveFizz, campaign: "Prospecting · Broad US" },
];

/* The five rows' share of the week's spend, rounded to the nearest five
   for the sentence ("about 60%"). */
const RANKED_SPEND = RANKED_CARDS.reduce((sum, c) => sum + c.creative.spend, 0);
const RANKED_SHARE = Math.round(((RANKED_SPEND / ACCOUNT.spend7d) * 100) / 5) * 5;

export const RANKED = {
  question: "Show me my top five creatives this week",
  answer: `Over the last 7 days these five lead the account on score, and together they carry about ${RANKED_SHARE}% of spend. Little can. Big mood. is in front on every measure after only 7 days live, so it is the one to feed first. Found my new fave fizz has the highest cost per purchase of the five, so watch it.`,
  cards: RANKED_CARDS,
};

/* ── Thread: compare ──────────────────────────────────────────────── */

export const COMPARE = {
  question: "Compare Little can. Big mood. with Currently obsessed",
  answer:
    "Little can. Big mood. wins over the last 7 days. The gap that matters is cost per purchase, where it converts for about 30% less than Currently obsessed on more than eight times the spend.",
  /* Side A is always the left card, whether or not it wins. */
  a: CREATIVES.bigMood as SampleCreative,
  b: CREATIVES.obsessed as SampleCreative,
  winner: "bigMood",
};

/* ── Ask Peach sheet ──────────────────────────────────────────────── */

const SHEET_CREATIVE: SampleCreative = CREATIVES.currentLineup;

export const SHEET = {
  /* Header: what the reader was looking at, and the window they were in. */
  subject: SHEET_CREATIVE.name,
  window: "Last 7 days",
  /* The question a Performance row sends. */
  question: `Why is ${SHEET_CREATIVE.name} scoring ${SHEET_CREATIVE.score} and what should I do with it?`,
  answer: `Over the last 7 days, ${SHEET_CREATIVE.name} took more spend than any other creative scoring under 30 and returned less than it cost. Its click rate is under a third of the account's, and the daily trend over the last 30 days shows no stronger stretch in its ${SHEET_CREATIVE.daysLive} days live. I cannot pause it for you, but it is the first one I would turn off.`,
  card: { creative: SHEET_CREATIVE } satisfies AgentCard,
  /* What was read, and the period each read covered. */
  trail: [
    { label: "Creative detail", window: "the last 7 days" },
    { label: "Account performance summary", window: "the last 7 days" },
    { label: "Daily trend", window: "the last 30 days" },
  ],
};
