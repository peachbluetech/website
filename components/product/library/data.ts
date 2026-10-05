/* Sample data for the Creative Library and the Creative Detail Panel.

   Everything here extends the canonical Fizzli account in ../sample and
   reconciles with it: counts come from ACCOUNT, per-creative figures from
   CREATIVES, and the detail figures for the top creative are derived so
   they divide back to its canonical spend, CTR, CPA and ROAS.

   Every Fizzli creative is a still image, so no tag, pill or sentence here
   describes motion, timing or sound. */

import { ACCOUNT, CREATIVES, HERO_CREATIVE, type SampleCreative } from "../sample";

/* ── Labels ───────────────────────────────────────────────────────────
   Tags are stored as snake_case words and printed in Title Case, as the
   product prints them ("cta_type" reads "Cta Type", "en" reads "En"). */

export function labelForTag(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export function labelForValue(value: string): string {
  return value.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
}

/** Long names keep their head and tail: the distinguishing suffix survives. */
export function truncateMiddle(value: string, max = 44): string {
  if (value.length <= max) return value;
  const keep = Math.max(max - 1, 2);
  const head = Math.ceil(keep * 0.6);
  const tail = keep - head;
  return `${value.slice(0, head)}…${value.slice(value.length - tail)}`;
}

/** 1st, 2nd, 3rd, 4th, 11th, 12th, 13th, 21st. */
export function ordinal(n: number): string {
  const v = Math.round(n);
  const tens = v % 100;
  if (tens >= 11 && tens <= 13) return `${v}th`;
  const unit = v % 10;
  return `${v}${unit === 1 ? "st" : unit === 2 ? "nd" : unit === 3 ? "rd" : "th"}`;
}

/* ── Library page ─────────────────────────────────────────────────── */

/* Saved views and their counts. Top performers are the top tier,
   underperformers the under tier, low data the creatives not yet scored. */
export const LIBRARY_COUNTS = {
  all: ACCOUNT.creativesTotal,
  top: ACCOUNT.tierCounts.top,
  under: ACCOUNT.tierCounts.under,
  lowData: ACCOUNT.creativesTotal - ACCOUNT.creativesScored,
} as const;

/* The three pills under a tile's name: the message the creative leads
   with, its format, and its tone. Values are the product's tag words.
   Each trio is chosen to fit the tile's 242px pill line: the longest here
   measures 237px. "Cozy Comfort" after "Social Proof" or "Brand Story"
   does not fit and would be cut mid-word. */
export type TileTags = { primaryMessage: string; emotionalTone: string };

export const TILE_FORMAT = "static_image";

export const TILE_TAGS: Record<string, TileTags> = {
  bigMood: { primaryMessage: "brand_story", emotionalTone: "playful" },
  zeroSugar: { primaryMessage: "product_quality", emotionalTone: "playful" },
  wouldRebuy: { primaryMessage: "social_proof", emotionalTone: "playful" },
  anytime: { primaryMessage: "brand_story", emotionalTone: "empowering" },
  faveFizz: { primaryMessage: "social_proof", emotionalTone: "aspirational" },
  summerCarry: { primaryMessage: "seasonal_event", emotionalTone: "playful" },
  fridgePick: { primaryMessage: "bestseller", emotionalTone: "minimal_clean" },
  littleRitual: { primaryMessage: "brand_story", emotionalTone: "aspirational" },
  honestlySoGood: { primaryMessage: "social_proof", emotionalTone: "playful" },
  obsessed: { primaryMessage: "social_proof", emotionalTone: "playful" },
  notAnotherSoda: { primaryMessage: "brand_story", emotionalTone: "bold_edgy" },
  threePm: { primaryMessage: "problem_solution", emotionalTone: "playful" },
  inMyTote: { primaryMessage: "new_arrival", emotionalTone: "playful" },
  bubbles: { primaryMessage: "new_arrival", emotionalTone: "bold_edgy" },
  currentLineup: { primaryMessage: "new_arrival", emotionalTone: "playful" },
  thirsty: { primaryMessage: "problem_solution", emotionalTone: "urgent" },
  zeroAllFizz: { primaryMessage: "product_quality", emotionalTone: "playful" },
};

/* Which artwork survives a tile. A tile crops its 9:16 image to 4:5, which
   keeps 70% of the ad's height, and the platform and score chips cover the
   top 28px of its two corners. The product crops about the centre; here
   each ad sits at its own "tile" focus instead (ui/adFocus.json), chosen
   so the on-image headline is whole and starts below the chips.

   - Headline in the top third, so the tile shows the upper part of the
     ad and loses the bottom: "Little can. Big mood.", "Zero sugar.
     Still fun.", "Would rebuy", "Post-workout, pre-brunch, anytime.",
     "Found my new fave fizz", and of the older ads "Honestly? So good.",
     "Currently obsessed", "Not just another soda.", "Current lineup".
     "Little can. Big mood." and "Zero sugar. Still fun." lose their own
     Shop now button this way, which is the cleaner cut.
   - Headline in the bottom third, so the tile shows the lower part of
     the ad and loses the top of the artwork: "Summer carry", "Fridge
     pick", "Your new little ritual.".
   - Headline mid-frame, centre crop: "My new 3pm pick me up".
   - One ad cannot clear the chips: "Post-workout, pre-brunch, anytime."
     starts 4% from the top of the artwork, so even with the tile at the
     very top the platform chip touches its first line.
   - Two ads are lifestyle photographs with a person in them, "Would
     rebuy" and "Post-workout, pre-brunch, anytime.". Each carries its
     headline in the top third with the can and the face below it, so the
     tile, cut from the top, keeps the headline, the can and the face.
   - Do not show "In my tote" as a tile, or anywhere larger than a 40px
     thumbnail: a third party's printed name is legible in the artwork.
     Hold it back until the image is retouched.
   - The three under-tier creatives other than "Current lineup" have
     small artwork only (about 200px wide) and blur at tile size. */

/* The single-row default: four creatives that crop cleanly, newest first
   (7, 22, 30 and 33 days live). Three platforms; top, above and average
   tiers; one headline at the top, one at the bottom, one mid-frame and
   one hard against the top edge. */
export const LIBRARY_ROW: SampleCreative[] = [
  CREATIVES.bigMood,
  CREATIVES.littleRitual,
  CREATIVES.threePm,
  CREATIVES.anytime,
];

/* The grid's default tiles under "Sort: Newest": eight of the account's
   creatives in order of days live, fewest first (7, 22, 24, 30, then 33,
   44, 49, 63). The first row alone shows all four score tiers and all
   three platforms; the under-tier tile is "Current lineup", the only one
   with full-size artwork. Every tile shows its headline whole. */
export const LIBRARY_GRID: SampleCreative[] = [
  CREATIVES.bigMood,
  CREATIVES.littleRitual,
  CREATIVES.currentLineup,
  CREATIVES.threePm,
  CREATIVES.anytime,
  CREATIVES.obsessed,
  CREATIVES.summerCarry,
  CREATIVES.notAnotherSoda,
];

/* ── Creative detail panel: "Little can. Big mood." ───────────────── */

const HERO = HERO_CREATIVE;

/* Delivery behind the canonical figures. 9,400 / 511 results is the
   canonical $18.40 CPA; 3.8% of 662,000 impressions is 25,156 clicks, so
   CPC is $0.37; 9,400 / 662 thousand impressions is a $14.20 CPM. The ad
   has been live for the 7 days of the account's current window. */
const IMPRESSIONS = 662000;
const RESULTS = 511;
const CLICKS = Math.round((IMPRESSIONS * HERO.ctr) / 100);

export const HERO_DETAIL = {
  creative: HERO,
  creativeId: "23850000000940117",
  campaign: "Summer Citrus | Prospecting",
  adSet: "Broad US | 18-44",
  spend: HERO.spend,
  ctr: HERO.ctr,
  cpc: HERO.spend / CLICKS,
  cpm: (HERO.spend / IMPRESSIONS) * 1000,
  roas: HERO.roas,
  results: RESULTS,
  cpa: HERO.spend / RESULTS,
  impressions: IMPRESSIONS,
  daysActive: HERO.daysLive,
  firstActive: "2026-09-24",
  lastActive: "2026-09-30",
  /* The ad's own copy, as the panel prints it under the preview. The
     sample creative is named for its headline. */
  headline: HERO.name,
  body: "Sparkling citrus in a can that fits your bag. Zero sugar, real juice, all mood.",
} as const;

/* What stands behind the 94: each metric's percentile against every other
   scored creative. Spend ranks lowest because the ad is one week old and
   older winners have spent more over the scoring window. How the four are
   blended into the score is not written here: the public docs describe the
   blend in words only (docs/scoring), and this repository is public. */
export const SCORE_PARTS: Array<{ key: string; word: string; percentile: number }> = [
  { key: "ctr", word: "click-through rate", percentile: 98 },
  { key: "roas", word: "return on ad spend", percentile: 95 },
  { key: "cpa", word: "cost per result", percentile: 96 },
  { key: "spend", word: "spend", percentile: 88 },
];

/* Tags on the top creative. A string prints as "Key: Value"; true prints
   the key alone; false, "none" and missing values are not shown. The image
   is a studio product shot: no people, an orange can floating at a tilt in
   a splash on flat cobalt blue, a two-line headline above it and a button
   below. */
export type TagValue = string | boolean;

/* What the creative is doing, in the product's order. */
export const STRATEGIC_TAGS: Array<[key: string, value: TagValue]> = [
  ["offer_type", "none"],
  ["cta_type", "shop_now"],
  ["emotional_tone", "playful"],
  ["headline_style", "brand_slogan"],
  ["primary_message", "brand_story"],
  ["funnel_stage", "awareness"],
  ["has_price", false],
  ["has_discount", false],
  ["has_social_proof", false],
  ["has_urgency", false],
  ["language", "en"],
  ["copy_length", "short"],
];

/* What it looks like, in the product's order. */
export const VISUAL_TAGS: Array<[key: string, value: TagValue]> = [
  ["format", "static_image"],
  ["content_style", "product_closeup"],
  ["aspect_ratio", "9:16"],
  ["has_face", false],
  ["number_of_people", "none"],
  ["has_product", true],
  ["product_position", "hero"],
  ["setting", "studio_backdrop"],
  ["text_density", "minimal"],
  ["dominant_color_tone", "vibrant"],
  ["logo_visible", true],
  ["brand_mentioned", true],
];

export function hasMeaningfulTag(value: TagValue | null | undefined): boolean {
  if (value == null) return false;
  if (typeof value === "boolean") return value;
  const v = value.trim().toLowerCase();
  return v !== "" && v !== "none" && v !== "null" && v !== "unknown" && v !== "n/a";
}

export function shownTags(tags: Array<[string, TagValue]>): Array<[string, TagValue]> {
  return tags.filter(([, value]) => hasMeaningfulTag(value));
}

/* Expert Analysis. The first section is shown open; each line is a bold
   lead-in and a sentence about this image. The other sections are shown
   as closed rows. */
export const ANALYSIS_OPEN = {
  title: "Visual Design Analysis",
  lines: [
    ["Color psychology", "The orange can and its cut fruit sit on their complement, a flat cobalt blue, so the eye lands on the product first."],
    ["Composition", "The can floats at a tilt in the center, ringed by a splash and four orange wedges, with the headline stacked above it."],
    ["Typography", "A lower-case serif in cream, one small line over one large, makes the last two words the punchline."],
    ["Imagery quality", "Clean studio light and a frozen splash make it read as a finished brand ad, not a snapshot."],
    ["Mobile legibility", "Two short lines of text and a large logo on the can stay readable at story size."],
  ] as Array<[label: string, body: string]>,
};

export const ANALYSIS_CLOSED = ["Psychological Triggers", "Message Strategy", "Performance Correlation", "Strategic Recommendations"];
