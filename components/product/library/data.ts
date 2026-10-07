/* Sample data for the Creative Library and the Creative Detail Panel.

   Everything here extends the canonical Fizzli account in ../sample and
   reconciles with it: counts come from ACCOUNT, per-creative figures from
   CREATIVES, and the detail figures for the week's new winner are derived
   so they divide back to its canonical spend, CTR, CPA and ROAS.

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
  allFizz: { primaryMessage: "product_quality", emotionalTone: "playful" },
  zeroSugar: { primaryMessage: "product_quality", emotionalTone: "playful" },
  wouldRebuy: { primaryMessage: "social_proof", emotionalTone: "playful" },
  anytime: { primaryMessage: "brand_story", emotionalTone: "empowering" },
  faveFizz: { primaryMessage: "social_proof", emotionalTone: "aspirational" },
  bigMood: { primaryMessage: "brand_story", emotionalTone: "playful" },
  summerCarry: { primaryMessage: "seasonal_event", emotionalTone: "playful" },
  fridgePick: { primaryMessage: "bestseller", emotionalTone: "playful" },
  littleRitual: { primaryMessage: "brand_story", emotionalTone: "aspirational" },
  honestlySoGood: { primaryMessage: "social_proof", emotionalTone: "playful" },
  obsessed: { primaryMessage: "social_proof", emotionalTone: "playful" },
  notAnotherSoda: { primaryMessage: "brand_story", emotionalTone: "aspirational" },
  threePm: { primaryMessage: "problem_solution", emotionalTone: "playful" },
  inMyTote: { primaryMessage: "new_arrival", emotionalTone: "playful" },
  bubbles: { primaryMessage: "new_arrival", emotionalTone: "bold_edgy" },
  currentLineup: { primaryMessage: "new_arrival", emotionalTone: "playful" },
  thirsty: { primaryMessage: "problem_solution", emotionalTone: "urgent" },
  earnedIt: { primaryMessage: "brand_story", emotionalTone: "empowering" },
  dinner: { primaryMessage: "brand_story", emotionalTone: "aspirational" },
  cooldown: { primaryMessage: "brand_story", emotionalTone: "empowering" },
  groupChat: { primaryMessage: "social_proof", emotionalTone: "playful" },
  quietNight: { primaryMessage: "brand_story", emotionalTone: "aspirational" },
};

/* Which artwork survives a tile. A tile crops its 9:16 image to 4:5,
   which keeps 70% of the ad's height, and the platform and score chips
   cover the top 28px of its two corners. The product crops about the
   centre; here each ad sits at its own "tile" focus instead
   (ui/adFocus.json), set to one rule: the can and the person come first
   (the can whole or boldly cropped, a face never sliced), and the
   on-image headline is in the tile whole, clear of the chips, or not in
   it at all. So some tiles carry no headline: the name under the tile
   says it.

   The account's one square file (the Data Hub's "All fizz, square cut")
   is not a library tile: a 4:5 box is narrower than a square and would
   cut its headline at the side. */

/* The single-row default: four creatives that crop cleanly, newest first
   (7, 12, 19 and 30 days live). Three platforms and all four score
   tiers. */
export const LIBRARY_ROW: SampleCreative[] = [
  CREATIVES.allFizz,
  CREATIVES.dinner,
  CREATIVES.honestlySoGood,
  CREATIVES.threePm,
];

/* The grid's default tiles under "Sort: Newest": eight of the account's
   creatives in order of days live, fewest first (7, 14, 22, 30, then 33,
   44, 49, 63). The first row alone shows all four score tiers and all
   three platforms; the under-tier tile is "The group chat agrees.". The
   second row opens on the account's top creative by score, 33 days
   live. */
export const LIBRARY_GRID: SampleCreative[] = [
  CREATIVES.allFizz,
  CREATIVES.groupChat,
  CREATIVES.littleRitual,
  CREATIVES.threePm,
  CREATIVES.bigMood,
  CREATIVES.obsessed,
  CREATIVES.summerCarry,
  CREATIVES.notAnotherSoda,
];

/* ── Creative detail panel: the week's winner ─────────────────────── */

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
  body: "Sparkling citrus with real juice. Zero sugar, all fizz.",
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

/* Tags on the week's new winner. A string prints as "Key: Value"; true prints
   the key alone; false, "none" and missing values are not shown. The image
   is a studio product shot: no people, an orange can lying among whole and
   cut oranges that fill the frame, a two-line headline over the top of the
   can and a button below. */
export type TagValue = string | boolean;

/* What the creative is doing, in the product's order. */
export const STRATEGIC_TAGS: Array<[key: string, value: TagValue]> = [
  ["offer_type", "none"],
  ["cta_type", "shop_now"],
  ["emotional_tone", "playful"],
  ["headline_style", "brand_slogan"],
  ["primary_message", "product_quality"],
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
    ["Color psychology", "The can sits in a frame of its own color, whole and cut oranges from edge to edge, so the flavor is read before a word is."],
    ["Composition", "The can lies in the center and runs most of the height of the frame, ringed by oranges, with the headline stacked above its rim."],
    ["Typography", "A serif in cream, two short lines of one size, sets the claim and its payoff as a pair."],
    ["Imagery quality", "Clean studio light and beads of water on the can and the fruit make it read as a finished brand ad, not a snapshot."],
    ["Mobile legibility", "Two short lines of text and a large logo on the can stay readable at story size."],
  ] as Array<[label: string, body: string]>,
};

export const ANALYSIS_CLOSED = ["Psychological Triggers", "Message Strategy", "Performance Correlation", "Strategic Recommendations"];
