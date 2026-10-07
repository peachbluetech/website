/* Sample data for the Intelligence page and the creative brief it writes.
   Everything here is the fictional Fizzli account and reconciles with the
   canonical sample in ../sample.ts: 41 analyzed creatives, the same ad
   names, platforms, CTRs and ROAS. All creatives are still images, so the
   strategies, the recipe, the concepts and the prompt only ever describe
   stills. No JSX in this file. */

import { ACCOUNT, CREATIVES, type SampleCreative } from "../sample";

export type Metric = "roas" | "cpa" | "ctr" | "cpm";
export type Confidence = "high" | "medium" | "low";

/* ── Intelligence ───────────────────────────────────────────────────── */

export type Strategy = {
  key: string;
  /** Format first, then tone and execution, joined with a middle dot. */
  name: string;
  /** Funnel stage, ad count, format count, platforms. One line. In this
      account every creative runs as one ad, so the ad count is creativeCount. */
  meta: string;
  tier: "primary" | "emerging";
  confidence: Confidence;
  metric: Metric;
  /** Lift against the account baseline, one decimal. */
  liftPct: number;
  /** Share of analyzed spend, printed as given. */
  spendSharePct: number;
  creativeCount: number;
  /** Up to three are drawn on the card, left to right. The order is a
      layout choice, not a ranking: see the note above STRATEGIES. */
  creatives: SampleCreative[];
};

/* Four strategies: three primary, one emerging. The three with a good
   lift hold 31 + 19 + 12 = 62% of analyzed spend, which is the figure in
   the headline sentence. The emerging one has two creatives, so its card
   shows two thumbnails and an empty third slot, as the app does.

   What the art shows. The winning card is the account's product
   closeups: the can large in the frame, a short headline and a button.
   Two are studio stills on one bold color ("Zero sugar. Still fun." and
   the week's new winner, "Zero sugar. All fizz.") and the third is the
   can held up to a stocked fridge ("Fridge pick"). All three are playful
   in tone, which is also what the top signal says (Playful, +41.3%).
   The second and third cards are creator-style photographs: a person
   with the can held up (the account's top two creatives by score, the
   mirror selfie "Little can. Big mood." and "Found my new fave fizz",
   and a beach), and quieter scenes at home and in the car. The last
   card is the two product shots that lead with a harder sell ("Bubbles,
   upgraded.", "Thirsty? Fix it."): closeups like the winning card's, in
   another tone.

   Two of the account's top creator photographs, "Restock day. Would
   rebuy." and "Post-workout, pre-brunch, anytime.", are on no card: one
   is an unboxing on a hallway floor, told as social proof, and the other
   a workout scene with an empowering line, so neither is a scene to
   aspire to or a cozy one. Both are among the brief's proven hooks.

   Order of the creatives. The card lays its signal pill over the top of
   the first thumbnail and its lift badge over the top of the third (the
   pill also reaches a few pixels into the second). Only the middle slot
   is clear, so each card puts there the ad whose top matters most: the
   week's new winner with its headline on the first card, the can held
   against the sky on the second, a face on the third. On the second
   card the two creator portraits take the outer slots: each has its
   headline in the band a chip covers and its face and can under it, so
   the chip hides the line and nothing else. An outer thumbnail keeps a
   chip over the top of its ad, headline or not, as it would in the app;
   do not move the chips. */
export const STRATEGIES: Strategy[] = [
  {
    key: "playful-closeup",
    name: "Static Image · Playful Product Closeup",
    meta: "Conversion · 5 ads · 1 format · Meta, Google",
    tier: "primary",
    confidence: "high",
    metric: "roas",
    liftPct: 38.2,
    spendSharePct: 31,
    creativeCount: 5,
    creatives: [CREATIVES.zeroSugar, CREATIVES.allFizz, CREATIVES.fridgePick],
  },
  {
    key: "aspirational-lifestyle",
    name: "Static Image · Aspirational Lifestyle Scene",
    meta: "Conversion · 4 ads · 1 format · Meta, TikTok",
    tier: "primary",
    confidence: "high",
    metric: "roas",
    liftPct: 24.6,
    spendSharePct: 19,
    creativeCount: 4,
    creatives: [CREATIVES.bigMood, CREATIVES.summerCarry, CREATIVES.faveFizz],
  },
  {
    key: "cozy-lifestyle",
    name: "Static Image · Cozy Comfort Lifestyle Scene",
    meta: "Awareness · 4 ads · 1 format · TikTok, Meta",
    tier: "primary",
    confidence: "medium",
    metric: "roas",
    liftPct: 14.1,
    spendSharePct: 12,
    creativeCount: 4,
    creatives: [CREATIVES.notAnotherSoda, CREATIVES.honestlySoGood, CREATIVES.littleRitual],
  },
  {
    key: "bold-edgy-closeup",
    name: "Static Image · Bold Edgy Product Closeup",
    meta: "Conversion · 2 ads · 1 format · Meta, TikTok",
    tier: "emerging",
    confidence: "low",
    metric: "roas",
    liftPct: -22.5,
    spendSharePct: 2,
    creativeCount: 2,
    creatives: [CREATIVES.bubbles, CREATIVES.thirsty],
  },
];

export type Signal = {
  /** Tag value, as stored. Title-cased on screen. */
  value: string;
  /** Tag dimension, as stored. Title-cased on screen. */
  dimension: string;
  metric: Metric;
  liftPct: number;
  confidence: Confidence;
  adCount: number;
  totalSpend: number;
};

/* Ten signals, highest confidence first, then by size of lift. One value
   here also names a strategy, playful, and it carries more than that
   strategy's ads and spend (14 ads against 5; $164.2k against 31% of the
   $412.6k analyzed). graphic_text names no strategy: its 7 creatives are
   text-led layouts, none of them among the named sample creatives, and
   the two ads on the losing strategy card are product closeups, not part
   of that count. One creative is one ad here, so adCount is also the
   creative count the brief prints, and every line of the brief's recipe is
   a row of this table with the same lift and count. */
export const SIGNALS: Signal[] = [
  { value: "playful", dimension: "emotional_tone", metric: "roas", liftPct: 41.3, confidence: "high", adCount: 14, totalSpend: 164200 },
  { value: "studio_backdrop", dimension: "setting", metric: "roas", liftPct: 29.4, confidence: "high", adCount: 17, totalSpend: 189600 },
  { value: "graphic_text", dimension: "content_style", metric: "roas", liftPct: -26.4, confidence: "high", adCount: 7, totalSpend: 31800 },
  { value: "minimal", dimension: "text_density", metric: "roas", liftPct: 22.0, confidence: "high", adCount: 19, totalSpend: 201300 },
  { value: "benefit_led", dimension: "hook_style", metric: "roas", liftPct: 23.7, confidence: "medium", adCount: 9, totalSpend: 74500 },
  { value: "urgent", dimension: "emotional_tone", metric: "roas", liftPct: -21.9, confidence: "medium", adCount: 4, totalSpend: 14600 },
  { value: "vibrant", dimension: "color_tone", metric: "roas", liftPct: 20.8, confidence: "medium", adCount: 12, totalSpend: 121400 },
  { value: "testimonial_quote", dimension: "headline_style", metric: "roas", liftPct: 18.5, confidence: "medium", adCount: 8, totalSpend: 61700 },
  { value: "percent_off", dimension: "offer_type", metric: "roas", liftPct: -17.2, confidence: "medium", adCount: 5, totalSpend: 22900 },
  { value: "heavy", dimension: "text_density", metric: "roas", liftPct: -31.0, confidence: "low", adCount: 3, totalSpend: 9400 },
];

export const INTEL = {
  strategies: STRATEGIES.length,
  primary: STRATEGIES.filter((s) => s.tier === "primary").length,
  emerging: STRATEGIES.filter((s) => s.tier === "emerging").length,
  creativesAnalyzed: ACCOUNT.creativesScored,
  patterns: SIGNALS.length,
  /** Lifetime, all synced history. */
  spendAnalyzed: 412600,
} as const;

/* ── The brief ──────────────────────────────────────────────────────── */

export type RecipeItem = {
  dimLabel: string;
  value: string;
  liftPct: number;
  /** Printed after the lift: ROAS for an account with revenue tracked. */
  metric: string;
  /** Creatives carrying the tag value. */
  count: number;
};

export type Concept = { title: string; description: string; format: string; hook: string; why: string };

/** One reference ad as the brief prints it: the creative's own name, image, CTR and ROAS. */
export type ReferenceAd = { key: string; name: string; image: string; ctr: number; roas: number };

/** Top four creatives by CTR, best first. Names, CTR and ROAS are the
    canonical ones. The brief paints each as a square at the creative's
    own focus (the "square" column of ui/adFocus.json). The first two are
    the creator ads, a mirror selfie and a can held to the cheek, both at
    home; the other two are studio product stills on one bold color, the
    week's new winner among them. The summary's "playful stills on bold
    color" and the recipe's lines are the account-wide signals (a playful
    tone across 14 creatives, a studio backdrop across 17), not a
    description of these four. */
const REFERENCE_ADS: SampleCreative[] = [CREATIVES.bigMood, CREATIVES.faveFizz, CREATIVES.allFizz, CREATIVES.zeroSugar];

/** Live headlines from the account's own ads, best CTR first. */
const PROVEN_HOOKS: SampleCreative[] = [
  CREATIVES.bigMood,
  CREATIVES.faveFizz,
  CREATIVES.allFizz,
  CREATIVES.zeroSugar,
  CREATIVES.wouldRebuy,
  CREATIVES.anytime,
];

export const BRIEF = {
  clientLabel: ACCOUNT.brand,
  title: `Creative brief: ${ACCOUNT.brand}`,
  evidenceNote: `Derived from ${ACCOUNT.creativesScored} analyzed creatives and live performance patterns.`,
  generatedDate: "2026-10-01",
  summary:
    "Playful stills on bold color are carrying this account. Creatives with a playful tone return 41% more than the account baseline across 14 creatives, and studio backdrops sit 29% above it across 17. Build the next round in that lane, keep on-image text to a few words, and stop funding text-heavy graphic layouts.",
  /* One line per dimension, sorted by lift. Every line here is a tag value
     with a clear lift across several creatives. */
  leanInto: [
    { dimLabel: "Emotional tone", value: "Playful", liftPct: 41.3, metric: "ROAS", count: 14 },
    { dimLabel: "Setting", value: "Studio Backdrop", liftPct: 29.4, metric: "ROAS", count: 17 },
    { dimLabel: "Hook style", value: "Benefit Led", liftPct: 23.7, metric: "ROAS", count: 9 },
    { dimLabel: "Text density", value: "Minimal", liftPct: 22.0, metric: "ROAS", count: 19 },
    { dimLabel: "Color tone", value: "Vibrant", liftPct: 20.8, metric: "ROAS", count: 12 },
  ] as RecipeItem[],
  avoid: [
    { dimLabel: "Text density", value: "Heavy", liftPct: -31.0, metric: "ROAS", count: 3 },
    { dimLabel: "Content style", value: "Graphic Text", liftPct: -26.4, metric: "ROAS", count: 7 },
    { dimLabel: "Emotional tone", value: "Urgent", liftPct: -21.9, metric: "ROAS", count: 4 },
  ] as RecipeItem[],
  concepts: [
    {
      title: "Flavor, edge to edge",
      description:
        "The Lime Zest can lying in a bed of whole and cut limes that fills the frame, shot from above. One short line of copy sits in the top third and nothing else is on the image.",
      format: "Static image, 9:16, studio backdrop",
      hook: "Zero sugar. All fizz.",
      why: "Playful stills correlate with the strongest return in this account (+41% ROAS, 14 creatives).",
    },
    {
      title: "Tone on tone",
      description:
        "A can on a ground of its own flavor color with cut citrus at its base, shot at eye level in hard light. The flavor color carries the frame and the copy stays at four words.",
      format: "Static image, 4:5, studio backdrop",
      hook: "Zero sugar. Still fun.",
      why: "Vibrant palettes and benefit-led lines both sit above baseline (+21% ROAS, 12 creatives; +24% ROAS, 9 creatives).",
    },
    {
      title: "Can on repeat",
      description:
        "The same can repeated in two tight rows across a flat yellow backdrop, every label facing front. A four-word title set in the band between the rows, then nothing.",
      format: "Static image, 9:16, studio backdrop",
      hook: "Small can. Whole afternoon.",
      why: "Minimal on-image text correlates with +22% ROAS across 19 creatives, so the can does the work.",
    },
  ] as Concept[],
  provenHooks: PROVEN_HOOKS.map((c) => ({ text: c.name, ctr: c.ctr })),
  hooksToTest: [
    "Tiny can. Main character energy.",
    "Zero sugar. Zero notes.",
    "Fridge door MVP.",
    "Small can. Whole afternoon.",
    "Cold, fizzy, done.",
  ],
  /* Every rule ends with its lift and its cohort size. A rule from a small
     cohort is marked as a lead to test. */
  dos: [
    "Keep the tone playful; in this account it correlates with the highest return (+41% ROAS, 14 creatives)",
    "Set the can on a studio backdrop: one bold color behind it (+29% ROAS, 17 creatives)",
    "Lead with the benefit in the headline (+24% ROAS, 9 creatives)",
    "Keep on-image text to a few words and let the can carry the ad (+22% ROAS, 19 creatives)",
  ],
  donts: [
    "Fill the frame with stacked claims or price blocks; one short title line is fine (−31% ROAS, 3 creatives, treat as a lead to test, not a law)",
    "Lead with templated graphics: title-case headline, button, corner logo (−26% ROAS, 7 creatives)",
    "Use countdown or last-chance framing (−22% ROAS, 4 creatives, treat as a lead to test, not a law)",
  ],
  referenceAds: REFERENCE_ADS.map((c) => ({
    key: c.key,
    name: c.name,
    image: c.image,
    ctr: c.ctr,
    roas: c.roas,
  })),
  generationPrompt: [
    "Create 3 still-image ad concepts for Fizzli.",
    "",
    "Product: a zero-sugar sparkling drink in a slim can, sold direct to consumers.",
    "",
    "Follow this recipe, taken from live account performance:",
    "- Tone: playful. Never urgent.",
    "- Setting: a studio backdrop. One bold color behind the can.",
    "- Headline: lead with the benefit, in one short line.",
    "- On-image text: a few words at most. The can carries the ad.",
    "- Palette: vibrant, one flavor color per ad.",
    "",
    'Use this proven hook verbatim in one concept: "Zero sugar. All fizz."',
    "",
    "Avoid: graphic templates, stacked claims, price blocks, countdown framing.",
    "",
    "Formats: two 9:16 stills and one 4:5 still.",
    "",
    "Per concept: a hook line, a static layout description, and a call to action.",
  ].join("\n"),
} as const;
