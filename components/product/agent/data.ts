/* Sample content for the Agent Peach recreations. Every figure on a card
   is read from the canonical account (components/product/sample.ts); what
   is defined here is the wording around those figures: questions, answers,
   campaign names, the sources trail. Answers follow the agent's own voice:
   two or three plain sentences, the data window named in the prose, no
   list of the figures the card already shows. */

import { ACCOUNT, CREATIVES, HERO_CREATIVE, type SampleCreative } from "../sample";

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

/* The week's new winner, named once: every sentence below that speaks of
   it reads its name from the sample account. It is the newest of the top
   five and takes the most spend; on score it is third, behind the two
   creator ads (see RANKED). */
const WINNER = HERO_CREATIVE;
const COMPARE_QUESTION = `Compare ${WINNER.name} with ${CREATIVES.obsessed.name}`;

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
  { title: COMPARE_QUESTION, ago: "yesterday" },
  { title: "Why is Not just another soda. losing clicks?", ago: "2d ago" },
  { title: "Where is spend flowing to losers?", ago: "5d ago" },
  { title: "Which creative is starting to fatigue?", ago: "9d ago" },
];

/* ── Thread: one creative (spotlight) ─────────────────────────────── */

export const SPOTLIGHT = {
  question: "What's winning across all my accounts?",
  answer: `Over the last 7 days, ${WINNER.name} is the clear winner across Meta, TikTok and Google Ads. It launched 7 days ago and already takes more spend than any other creative while converting at the lowest cost per purchase in the account. It has no history yet, so scale it in steps and watch for the click rate to soften.`,
  card: {
    creative: WINNER,
    campaign: "Advantage+ Shopping",
    adCount: 3,
    insight: "One can among cut oranges, edge to edge, headline above it. Studio backdrops are the strongest setting in this account.",
  } satisfies AgentCard,
};

/* ── Thread: ranked list ──────────────────────────────────────────── */

/* The account's top five by score, highest first: the two creator ads,
   then the week's new winner, then the two longer-running ads behind it.
   Both TikTok creator ads run in the one Spark Ads campaign. */
const RANKED_CARDS: AgentCard[] = [
  { creative: CREATIVES.bigMood, campaign: "Spark Ads · Creators" },
  { creative: CREATIVES.faveFizz, campaign: "Prospecting · Broad US" },
  { creative: WINNER, campaign: "Advantage+ Shopping" },
  { creative: CREATIVES.zeroSugar, campaignCount: 3 },
  { creative: CREATIVES.wouldRebuy, campaign: "Spark Ads · Creators" },
];

/* The five rows' share of the week's spend, rounded to the nearest five
   for the sentence ("about 60%"). */
const RANKED_SPEND = RANKED_CARDS.reduce((sum, c) => sum + c.creative.spend, 0);
const RANKED_SHARE = Math.round(((RANKED_SPEND / ACCOUNT.spend7d) * 100) / 5) * 5;

/* What the answer says, and what makes each clause true of the rows: the
   first two cards have the two highest click-through rates of all the
   account's creatives; the new winner is the third card, 7 days live,
   with the most spend of any creative, more than twice the spend of
   either card above it. It recommends nothing: the worklist's own row
   for the new winner does that.

   Its length is part of two layouts. The two homepages show this turn
   through windows cut to the line (their Agent.tsx): the answer sets on
   three lines at 684, four at 630, 576 and 560, and five at 462 and 424,
   as the answer before it did, with room to spare on the last line at
   every one of them. Reword it and measure those six again. */
export const RANKED = {
  question: "Show me my top five creatives this week",
  answer: `Over the last 7 days these five lead the account on score and carry about ${RANKED_SHARE}% of spend. The two creator ads are in front, with the account's two highest click-through rates. ${WINNER.name} is third after only 7 days live and takes the most spend, over twice what either spent.`,
  cards: RANKED_CARDS,
};

/* ── Thread: compare ──────────────────────────────────────────────── */

export const COMPARE = {
  question: COMPARE_QUESTION,
  answer: `${WINNER.name} wins over the last 7 days. The gap that matters is cost per purchase, where it converts for about 30% less than ${CREATIVES.obsessed.name} on more than eight times the spend.`,
  /* Side A is always the left card, whether or not it wins. */
  a: WINNER as SampleCreative,
  b: CREATIVES.obsessed as SampleCreative,
  winner: WINNER.key,
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
