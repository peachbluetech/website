/* The sample account every product recreation on the site draws from.
   Fizzli is a fictional DTC sparkling-drink brand running conversion
   campaigns on Meta, TikTok and Google Ads. One object, typed once, so the
   hero, the feature visuals and the vignettes can never disagree.

   No directive and no JSX: server sections and client islands both import it. */

import { adImage } from "./ui/adImage";

export type Tier = "top" | "above" | "avg" | "under";
export type Platform = "Meta" | "TikTok" | "Google Ads";

export type SampleCreative = {
  key: string;
  /** The ad's own on-image headline; also used as its name. */
  name: string;
  /** Path under /public. The original file: 1080 by 1920. */
  image: string;
  /** The 128px square thumbnail, cut at the creative's focus: for square slots up to 64px wide. */
  thumb: string;
  /** The 560px-wide copy of the whole image, for tiles, previews and cards up to about 280px wide. A box that crops it positions it with adFocus(image, shape). */
  medium: string;
  /** The 16:9 band of the image at full width, cut at the creative's focus: for 16:9 slots wider than 280px. */
  wide: string;
  /** Native aspect of the image file. */
  aspect: "9:16" | "1:1";
  platform: Platform;
  score: number;
  tier: Tier;
  /** Last 7 days. */
  spend: number;
  ctr: number;
  cpa: number;
  roas: number;
  daysLive: number;
};

/** One scale everywhere, same thresholds as the app. */
export function tierOf(score: number): Tier {
  if (score >= 75) return "top";
  if (score >= 50) return "above";
  if (score >= 30) return "avg";
  return "under";
}

export const TIER_LABEL: Record<Tier, string> = {
  top: "Top",
  above: "Above",
  avg: "Average",
  under: "Under",
};

function c(
  key: string,
  name: string,
  file: string,
  platform: Platform,
  score: number,
  spend: number,
  ctr: number,
  cpa: number,
  roas: number,
  daysLive: number,
  aspect: "9:16" | "1:1" = "9:16",
): SampleCreative {
  const image = `/ads/${file}`;
  return {
    key,
    name,
    image,
    thumb: adImage(image, "sm"),
    medium: adImage(image, "md"),
    wide: adImage(image, "wide"),
    aspect,
    platform,
    score,
    tier: tierOf(score),
    spend,
    ctr,
    cpa,
    roas,
    daysLive,
  };
}

/* Ordered by score. The under-tier rows sum to the week's waste figure
   together with one unnamed creative (see ACCOUNT.waste7d), and with it
   the rows sum to the week's spend: 22 of the 23 creatives with spend
   are named here.

   The two creator ads lead on score, "Little can. Big mood." (the mirror
   selfie) and "Found my new fave fizz", with the two highest
   click-through rates in the account. "Zero sugar. All fizz." is third on
   score and is the week's new winner (HERO_CREATIVE below): new this
   week, the most spend, the lowest cost per purchase.

   "Post-workout, pre-brunch, anytime." is the earlier winner: still top
   tier, kept live on a small budget, so its week is $100.

   "Little can. Big mood." is pictured by its creator cut. The same
   line's studio cut (/ads/fizzli-big-mood.jpg, the blue splash still) is
   not a row here: it is a new cut waiting in the Data Hub's analysis
   queue (connect/data.ts).

   Where each image is cropped (which part of a 9:16 ad a square, a 4:5
   tile or a 16:9 card shows) is not written here: it is one table keyed by
   file name, ui/adFocus.json, read by ui/adImage.ts and by the script that
   cuts the thumbnails. */
export const CREATIVES = {
  bigMood: c("bigMood", "Little can. Big mood.", "fizzli-big-mood-selfie.jpg", "TikTok", 96, 4380, 4.31, 18.6, 4.0, 33),
  faveFizz: c("faveFizz", "Found my new fave fizz", "fizzli-fave-fizz.jpg", "Meta", 95, 3480, 4.06, 18.8, 4.0, 27),
  allFizz: c("allFizz", "Zero sugar. All fizz.", "fizzli-zero-sugar-all-fizz.jpg", "Meta", 94, 9400, 3.8, 18.4, 4.1, 7),
  zeroSugar: c("zeroSugar", "Zero sugar. Still fun.", "fizzli-zero-sugar.jpg", "Meta", 92, 6870, 3.42, 19.1, 3.9, 58),
  wouldRebuy: c("wouldRebuy", "Restock day. Would rebuy.", "fizzli-would-rebuy.jpg", "TikTok", 91, 4960, 3.31, 19.6, 3.8, 41),
  anytime: c("anytime", "Post-workout, pre-brunch, anytime.", "fizzli-anytime.jpg", "Meta", 86, 100, 3.24, 19.8, 3.8, 68),
  summerCarry: c("summerCarry", "Summer carry", "fizzli-summer-carry.jpg", "Meta", 81, 3010, 2.84, 21.9, 3.3, 49),
  fridgePick: c("fridgePick", "Fridge pick", "fizzli-fridge-pick.jpg", "Google Ads", 78, 2460, 2.61, 22.7, 3.2, 36),
  littleRitual: c("littleRitual", "Your new little ritual.", "fizzli-little-ritual.jpg", "TikTok", 71, 1980, 2.52, 23.4, 3.0, 22),
  honestlySoGood: c("honestlySoGood", "Honestly? So good.", "fizzli-honestly-so-good.jpg", "Meta", 66, 1540, 2.37, 24.8, 2.8, 19),
  obsessed: c("obsessed", "Currently obsessed", "fizzli-obsessed.jpg", "TikTok", 58, 1120, 2.21, 26.1, 2.6, 44),
  notAnotherSoda: c("notAnotherSoda", "Not just another soda.", "fizzli-not-another-soda.jpg", "Meta", 52, 1290, 1.7, 29.3, 2.3, 63),
  threePm: c("threePm", "My new 3pm pick me up", "fizzli-3pm-pick-me-up.jpg", "Google Ads", 44, 860, 1.94, 31.2, 2.1, 30),
  inMyTote: c("inMyTote", "In my tote", "fizzli-in-my-tote.jpg", "Meta", 37, 690, 1.62, 35.9, 1.8, 52),
  bubbles: c("bubbles", "Bubbles, upgraded.", "fizzli-bubbles-upgraded.jpg", "Meta", 28, 1060, 0.88, 58.9, 0.8, 21),
  currentLineup: c("currentLineup", "Current lineup", "fizzli-current-lineup.jpg", "Meta", 26, 1480, 0.92, 61.7, 0.7, 24),
  thirsty: c("thirsty", "Thirsty? Fix it.", "fizzli-thirsty-fix-it.jpg", "TikTok", 22, 1240, 0.81, 68.9, 0.6, 18),
  earnedIt: c("earnedIt", "Earned it.", "fizzli-earned-it.jpg", "Google Ads", 18, 920, 0.64, 83.6, 0.5, 26),
  dinner: c("dinner", "Dinner's plus one.", "fizzli-dinners-plus-one.jpg", "TikTok", 17, 520, 0.61, 86.7, 0.5, 12),
  cooldown: c("cooldown", "Cooldown, sorted.", "fizzli-cooldown-sorted.jpg", "Google Ads", 16, 290, 0.57, 96.7, 0.4, 11),
  groupChat: c("groupChat", "The group chat agrees.", "fizzli-group-chat.jpg", "Meta", 14, 380, 0.49, 126.7, 0.3, 14),
  quietNight: c("quietNight", "Quiet night. Loud bubbles.", "fizzli-quiet-night.jpg", "Meta", 11, 180, 0.41, 180.0, 0.2, 9),
} as const satisfies Record<string, SampleCreative>;

export const CREATIVE_LIST: SampleCreative[] = Object.values(CREATIVES);

/** The account's new winner this week: launched inside the week, the most spend, the lowest cost
    per purchase. Every visual that names "the week's winner" uses this one. It is not the top
    creative by score: two longer-running creator ads score above it (see CREATIVES). */
export const HERO_CREATIVE = CREATIVES.allFizz;

export const ACCOUNT = {
  brand: "Fizzli",
  /** What a brand org's Today title reads: scope word, then the window. */
  scopeTitle: "Portfolio",
  window: "Sep 24 to Sep 30",
  syncStamp: "synced Oct 1, 05:00",
  platforms: ["Meta", "TikTok", "Google Ads"] as Platform[],
  creativesWithSpend7d: 23,

  /* Last 7 days against the prior 7. */
  spend7d: 48320,
  spendPrior7d: 43143,
  spendDeltaPct: 12.0,
  results7d: 2237,
  resultsPrior7d: 1912,
  resultsDeltaPct: 17.0,
  roas7d: 3.4,
  roasPrior7d: 3.0,
  roasDeltaPct: 13.3,
  cpa7d: 21.6,
  cpaPrior7d: 22.56,
  cpaDeltaPct: -4.3,
  ctr7d: 2.9,
  ctrPrior7d: 2.7,
  ctrDeltaPct: 7.4,

  /* Waste: spend on under-tier creatives. */
  waste7d: 6180,
  wasteCreatives7d: 9,
  waste30d: 14960,

  /* Creative Economics, 90-day launch cohort. */
  spend30d: 198400,
  hitRatePct: 34,
  hitRateHits: 11,
  hitRateQualified: 32,
  cohortTiers: { top: 11, above: 8, avg: 4, under: 9 },
  heroSharePct: 22,
  heroKey: "zeroSugar",
  benchKeys: ["allFizz", "wouldRebuy", "bigMood"],
  fatigue: [
    { key: "notAnotherSoda", dropPct: -50, fromCtr: 3.4, toCtr: 1.7, activeDays: 63 },
    { key: "inMyTote", dropPct: -31, fromCtr: 2.35, toCtr: 1.62, activeDays: 52 },
  ],

  /* Performance, last 30 days. */
  creativesTotal: 44,
  creativesScored: 41,
  tierCounts: { top: 12, above: 9, avg: 11, under: 9 },
} as const;
