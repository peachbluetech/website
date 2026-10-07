/* Brand Intel sample data for the fictional brand Fizzli.

   Everything here is invented for the site. The two competitor names are
   coined words. Each was put through a web search on 2026-10-01 (the bare
   word in quotes, and again with drink, soda, brand and company) and
   neither returned a product, a business, a place or a person. Run the
   same check before changing either one. The topic keywords are generic
   category phrases. The brief reads like the app's generated brief: one
   editorial headline, a short sentiment read, three themes, two
   competitor signals, three actions, three takeaways. It echoes the
   sample creatives' own headlines (the little can, zero sugar, the
   afternoon pick me up) and the three flavors on the cans.

   Brand Intel is market talk, not ad performance, but its advice should
   not argue with the account's own scores: the first action leads with
   the little can (the line on the account's top creative by score) and
   treats the afternoon routine as a second hook to test, because the one
   afternoon creative in the account scores average.

   No directive and no JSX: server sections can import it anywhere. */

export type KeywordType = "brand" | "competitor" | "topic";

export type TrackedKeyword = { keyword: string; type: KeywordType };

/* value: the cheap grocery-aisle soda. functional: the gut-health one. */
export const COMPETITORS = { value: "Quenchby", functional: "Pellowick" } as const;

/* Newest first, as the app lists them. */
export const KEYWORDS: TrackedKeyword[] = [
  { keyword: "Fizzli", type: "brand" },
  { keyword: "Fizzli zero sugar", type: "brand" },
  { keyword: COMPETITORS.value, type: "competitor" },
  { keyword: COMPETITORS.functional, type: "competitor" },
  { keyword: "zero sugar soda", type: "topic" },
  { keyword: "mini can soda", type: "topic" },
  { keyword: "afternoon pick me up", type: "topic" },
];

/* Mentions by sentiment. Every tracked mention is analysed, so the four
   counts sum to the header's mention total. */
export const SENTIMENT = { positive: 212, neutral: 96, mixed: 41, negative: 27 } as const;

export const SENTIMENT_TOTAL = SENTIMENT.positive + SENTIMENT.neutral + SENTIMENT.mixed + SENTIMENT.negative; // 376

export const MENTIONS_TOTAL = SENTIMENT_TOTAL;

export const LAST_SCAN = "3h ago";

/** The page subtitle: mentions, keywords, last scan. */
export const SUBTITLE = `${MENTIONS_TOTAL.toLocaleString("en-US")} mentions tracked · ${KEYWORDS.length} keywords · last scan ${LAST_SCAN}`;

export type BriefTheme = { tag: string; body: string };

export const BRIEF = {
  date: "Oct 1, 2026",
  headline:
    "Fizzli is winning on taste and the little can, but shoppers still hesitate at the price per can next to grocery-aisle sparkling water.",
  sentiment:
    "People describe Fizzli as the first zero-sugar soda that does not taste like a compromise, and the little can comes up again and again as the reason it fits an afternoon routine. The recurring concern is cost: buyers like the product but question paying a premium for a smaller serving. Flavor fatigue is low, with Citrus Orange and Berry Hibiscus named most often.",
  themes: [
    {
      tag: "Small cans as portion control",
      body: "Shoppers frame the little can as a feature, not a shortfall: enough for a 3pm lift without a full soda.",
    },
    {
      tag: "Zero sugar without the aftertaste",
      body: "Sweetener aftertaste is the top complaint across the category, and it is the thing Fizzli is most often praised for avoiding.",
    },
    {
      tag: "The afternoon ritual",
      body: "Buyers are positioning the drink themselves as a replacement for a second coffee.",
    },
  ] as BriefTheme[],
  competitive: [
    `${COMPETITORS.value} is praised for price and wide grocery distribution, and criticized for a flat, syrupy finish.`,
    `${COMPETITORS.functional} owns the gut-health conversation; Fizzli is rarely mentioned alongside functional claims.`,
  ],
  actions: [
    "Lead new creative with the little can and test the afternoon routine as a second hook. Both are language buyers already use.",
    "Answer the price question directly with a per-case or subscribe-and-save frame in ad copy.",
    "Test a taste-comparison creative against the category's aftertaste complaint.",
  ],
  takeaways: [
    "No brand in the set owns the afternoon slot. Fizzli can claim it before a competitor does.",
    "A variety pack is the most requested format and neither competitor offers one.",
    "Price objections fall away when buyers talk about cost per week instead of cost per can.",
  ],
  sinceLastScan: `Mentions of the little-can format are up since the last brief, and price complaints are flat. ${COMPETITORS.value}'s new flavor launch drew attention but mixed reviews.`,
} as const;

/* The two buttons under the brief. One summary per tracked keyword; the
   mentions list shows the newest 50 (the app's list cap), which is why
   this count is lower than the header's mentions total. Where both would
   sit in one frame with nothing to explain the cap, render the page or
   the brief with nav off. */
export const NAV = {
  summaries: `${KEYWORDS.length} summaries`,
  mentions: "50 posts & comments",
} as const;

export const SOURCES = ["Reddit"] as const;
