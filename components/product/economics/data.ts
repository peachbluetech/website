/* Creative Economics sample data for the Fizzli account.

   Everything the canon fixes is read from components/product/sample.ts:
   the hit rate (11 of 32), the cohort tier counts, 30-day spend, 30-day
   and 7-day waste, the hero and its share, the three proven challengers,
   the fatigue flags, and each creative's score, platform, 7-day spend,
   CTR and days live. What this file adds is the detail the Economics page
   shows that the canon does not carry, kept consistent with it:

   - 30-day spend per creative where the page prints it (bench, cut list)
   - 90-day spend per creative for the launch cohort table
   - five more under-tier creatives (the canon's "five unnamed"), so the
     cut list sums to the week's waste and the 30-day under-tier spend
   - the rolling-CTR curve of each fatigue flag, and one opt-in third flag
     that is not in the canon (the canon's count is two)
   - the tier order of the 15 unnamed launches and 3 micro-tests

   No directive and no JSX. */

import { ACCOUNT, CREATIVES, type Platform, type SampleCreative, type Tier } from "@/components/product/sample";

type CreativeKey = keyof typeof CREATIVES;

/* ------------------------------------------------------------ headline */

/** Launches under $50 sit outside the hit rate. The account's three unscored creatives are those launches. */
const MICRO_TESTS = ACCOUNT.creativesTotal - ACCOUNT.creativesScored;

export const ECON = {
  hitRatePct: ACCOUNT.hitRatePct,
  hits: ACCOUNT.hitRateHits,
  qualified: ACCOUNT.hitRateQualified,
  /** Qualified launches in the above tier. */
  workhorses: ACCOUNT.cohortTiers.above,
  microTests: MICRO_TESTS,
  spend30d: ACCOUNT.spend30d,
  waste30d: ACCOUNT.waste30d,
  /** 14,960 of 198,400: 7.5 */
  wasteSharePct: (ACCOUNT.waste30d / ACCOUNT.spend30d) * 100,
  waste7d: ACCOUNT.waste7d,
  heroSharePct: ACCOUNT.heroSharePct,
  provenChallengers: ACCOUNT.benchKeys.length as number,
} as const;

/* ---------------------------------------------------------------- bench */

/** The largest 30-day spender. Its 30-day spend is its share of the account's: 22% of 198,400. */
export const HERO = {
  creative: CREATIVES[ACCOUNT.heroKey] as SampleCreative,
  spend30d: (ACCOUNT.spend30d * ACCOUNT.heroSharePct) / 100,
};

/* 30-day spend of every top or above-tier creative other than the hero,
   so the bench follows whichever keys the canon names: the same figures
   the Performance screen prints for these creatives (a recreation of that
   screen fixes 30-day spend per creative in its own data file; if one is
   added to this directory, keep the two in step). Each is at least the
   creative's 7-day spend and below the hero's. The newest one has been
   live 7 days, so its 30-day spend is its 7-day spend. */
const CHALLENGER_SPEND_30D: Partial<Record<CreativeKey, number>> = {
  wouldRebuy: 21240,
  anytime: 18460,
  faveFizz: 13120,
  summerCarry: 12870,
  fridgePick: 10340,
  bigMood: CREATIVES.bigMood.spend,
  notAnotherSoda: 6480,
  littleRitual: 6240,
  obsessed: 4760,
  honestlySoGood: 4120,
};

export type Challenger = { creative: SampleCreative; spend30d: number };

/** The app lists challengers by 30-day spend, highest first. */
export const CHALLENGERS: Challenger[] = ACCOUNT.benchKeys
  .map((key) => ({ creative: CREATIVES[key] as SampleCreative, spend30d: CHALLENGER_SPEND_30D[key] ?? 0 }))
  .sort((a, b) => b.spend30d - a.spend30d);

/* ------------------------------------------------------------- cut list */

export type BleedingRow = {
  key: string;
  name: string;
  /** Null renders the app's initials tile, as it does for a creative with no thumbnail. */
  image: string | null;
  platform: Platform;
  score: number;
  activeDays: number;
  spend7d: number;
  spend30d: number;
};

function named(key: CreativeKey, spend30d: number): BleedingRow {
  const c: SampleCreative = CREATIVES[key];
  return { key, name: c.name, image: c.image, platform: c.platform, score: c.score, activeDays: c.daysLive, spend7d: c.spend, spend30d };
}

/* Nine under-tier creatives still spending, by 7-day spend. The four from
   the canon carry their own 7-day spend (4,700 between them); the five
   added here carry the other 1,480, so the list sums to 6,180. The 30-day
   column sums to the account's 30-day under-tier spend, 14,960: the four
   named rows carry the Performance screen's 30-day figures (11,880) and
   the five added ones the remaining 3,080, each below the smallest named
   30-day spend in the account. The five added ones also score below the
   lowest named score (18), which is how the Performance screen describes
   the account's five unnamed under-tier creatives. */
export const BLEEDING: BleedingRow[] = [
  named("currentLineup", 6600),
  named("thirsty", 1820),
  named("bubbles", 1900),
  named("zeroAllFizz", 1560),
  { key: "sipSipHooray", name: "Sip, sip, hooray", image: null, platform: "TikTok", score: 17, activeDays: 12, spend7d: 520, spend30d: 1040 },
  { key: "fizzTheSeason", name: "Fizz the season", image: null, platform: "Meta", score: 14, activeDays: 14, spend7d: 380, spend30d: 820 },
  { key: "restock", name: "The 12-pack restock", image: null, platform: "Google Ads", score: 16, activeDays: 11, spend7d: 290, spend30d: 610 },
  { key: "popTheWeekend", name: "Pop the weekend", image: null, platform: "Meta", score: 11, activeDays: 9, spend7d: 180, spend30d: 380 },
  { key: "sodaReconsidered", name: "Soda, reconsidered", image: null, platform: "TikTok", score: 9, activeDays: 8, spend7d: 110, spend30d: 230 },
];

/* -------------------------------------------------------------- fatigue */

export type FatigueRow = {
  creative: SampleCreative;
  activeDays: number;
  /** Best rolling 7-day CTR, then the trailing one. */
  peakCtr: number;
  recentCtr: number;
  /** Whole percent, positive: the row prints it behind a true minus sign. */
  decayPct: number;
  /** Rolling 7-day CTR, oldest first, 12 samples. Its maximum is peakCtr and its last value recentCtr. */
  trend: number[];
  /** False for the opt-in row this file adds to the canon's flags. */
  canon: boolean;
};

/* One curve per flag, sampled evenly from the creative's first full week
   to today. Each peaks at its best week and ends on its trailing week, and
   its last 30 days average the 30-day CTR the Performance screen prints
   for the same creative (2.31%, 1.94% and 2.18%). The third creative
   peaked in its second week and fell fast, so its last 30 days sit flat. */
const TREND: Partial<Record<CreativeKey, number[]>> = {
  notAnotherSoda: [2.2, 2.7, 3.1, 3.3, 3.4, 3.3, 3.0, 2.8, 2.5, 2.2, 1.9, 1.7],
  inMyTote: [1.8, 2.05, 2.25, 2.35, 2.34, 2.28, 2.18, 2.07, 1.94, 1.82, 1.71, 1.62],
  obsessed: [3.1, 3.45, 3.1, 2.5, 2.18, 2.11, 2.09, 2.09, 2.11, 2.14, 2.18, 2.21],
};

const CANON_FATIGUE: FatigueRow[] = ACCOUNT.fatigue.map((f) => ({
  creative: CREATIVES[f.key] as SampleCreative,
  activeDays: f.activeDays,
  peakCtr: f.fromCtr,
  recentCtr: f.toCtr,
  decayPct: Math.abs(f.dropPct),
  trend: TREND[f.key] ?? [f.fromCtr, f.toCtr],
  canon: true,
}));

/* The opt-in extra flag, not in the canon: 44 days live, trailing CTR
   2.21% (its 7-day CTR in the canon) against a best week of 3.45%, a 36%
   decay. Dropped if the canon ever names this creative itself. */
const EXTRA_FATIGUE: FatigueRow[] = CANON_FATIGUE.some((r) => r.creative.key === CREATIVES.obsessed.key)
  ? []
  : [
      {
        creative: CREATIVES.obsessed,
        activeDays: CREATIVES.obsessed.daysLive,
        peakCtr: 3.45,
        recentCtr: CREATIVES.obsessed.ctr,
        decayPct: 36,
        trend: TREND.obsessed ?? [3.45, CREATIVES.obsessed.ctr],
        canon: false,
      },
    ];

/** How many flags the canon carries: the count Today and the digest print. */
export const FATIGUE_CANON_COUNT = CANON_FATIGUE.length;
/** The canon's flags plus the opt-in extra one. */
export const FATIGUE_MAX_COUNT = CANON_FATIGUE.length + EXTRA_FATIGUE.length;

/** Flagged creatives by 7-day spend. With no argument, the canon's flags only; a higher count adds the opt-in row. */
export function fatigueRows(count: number = FATIGUE_CANON_COUNT): FatigueRow[] {
  const rows = count > FATIGUE_CANON_COUNT ? [...CANON_FATIGUE, ...EXTRA_FATIGUE] : CANON_FATIGUE;
  return [...rows].sort((a, b) => b.creative.spend - a.creative.spend);
}

/** Median active days of the flagged creatives that are top or above tier: what the "winners last" note reads. */
export function medianWinnerDays(rows: FatigueRow[]): number | null {
  const days = rows
    .filter((r) => r.creative.tier === "top" || r.creative.tier === "above")
    .map((r) => r.activeDays)
    .sort((a, b) => a - b);
  if (days.length === 0) return null;
  const mid = Math.floor(days.length / 2);
  return Math.round(days.length % 2 ? days[mid] : (days[mid - 1] + days[mid]) / 2);
}

/* --------------------------------------------------------------- cohort */

/** As-of date of the page: 2026-09-30. A creative live n days launched n minus 1 days before it. */
function launchedOn(daysLive: number): string {
  const d = new Date(Date.UTC(2026, 8, 30));
  d.setUTCDate(d.getUTCDate() - (daysLive - 1));
  return d.toISOString().slice(0, 10);
}

/* Spend since launch (all 17 launched inside the 90-day window). A
   creative live 30 days or fewer carries its 30-day spend from the
   Performance screen unchanged; an older one carries more, and the
   fatigued creatives were larger before they decayed. */
const SPEND_90D: Record<CreativeKey, number> = {
  zeroSugar: 74810,
  wouldRebuy: 25460,
  notAnotherSoda: 22180,
  summerCarry: 21640,
  anytime: 19870,
  inMyTote: 17930,
  faveFizz: 13120,
  fridgePick: 12870,
  obsessed: 11260,
  bigMood: 9400,
  currentLineup: 6600,
  littleRitual: 6240,
  honestlySoGood: 4120,
  threePm: 3540,
  bubbles: 1900,
  thirsty: 1820,
  zeroAllFizz: 1560,
};

export type CohortRow = { creative: SampleCreative; launched: string; spend: number };

/** The named launches, by spend, highest first: the head of the cohort table. */
export const COHORT_ROWS: CohortRow[] = (Object.keys(SPEND_90D) as CreativeKey[])
  .map((key) => ({ creative: CREATIVES[key] as SampleCreative, launched: launchedOn(CREATIVES[key].daysLive), spend: SPEND_90D[key] }))
  .sort((a, b) => b.spend - a.spend);

export type CohortTone = Tier | "none";

/* The 15 qualified launches without a name here, by spend (all below the
   named 17): 4 top, 4 above, 2 average, 5 under. With the named 17 that is
   the canon's 11 top, 8 above, 4 average and 9 under. */
const UNNAMED_TIERS: Tier[] = "TAUTVAUTAUVTAUU".split("").map((ch) => (ch === "T" ? "top" : ch === "A" ? "above" : ch === "V" ? "avg" : "under"));

/** One tone per launch, by spend: 32 qualified, then the micro-tests with no score. */
export const COHORT_TICKS: CohortTone[] = [
  ...COHORT_ROWS.map((r) => r.creative.tier),
  ...UNNAMED_TIERS,
  ...Array.from({ length: MICRO_TESTS }, () => "none" as const),
];
