/* Sample data for the Reports recreations.

   Two scenarios, never mixed in one picture:

   1. The brand report. Fizzli's own account for Sep 24 to Sep 30, 2026.
      Every figure comes from the canonical sample account; the two values
      it does not carry (impressions and clicks for the week) are defined
      here so that CTR, CPM and CPC work out to the canon.

   2. The agency pacing board. A fictional media agency running streaming
      and online video flights for Fizzli through a demand-side platform.
      Supplier names are invented and stand for no real broadcaster or
      streaming service. Totals, shares, pace and CPM are all derived from
      the six flight rows below, so the sentence, the strip, the bar and the
      table can never disagree.

   No JSX and no directive: plain values and formatters. */

import { ACCOUNT, CREATIVE_LIST, type SampleCreative } from "../sample";

/** Printed by the page near any pacing visual. */
export const PACING_CAPTION = "Agency view, sample data";

/* ── Formatting, as the Reports screen formats it ───────────────────── */

const DASH = "–";

/** $48.3k, $1.20M, $760 (no decimals under a thousand). */
export function money(n: number | null): string {
  if (n == null || !Number.isFinite(n)) return DASH;
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}

/** 3.9M, 113.4k, 870. */
export function count(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString("en-US");
}

/** $12.35 */
export function dollars(n: number | null, digits = 2): string {
  if (n == null || !Number.isFinite(n)) return DASH;
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** 2026-09-11 becomes Sep 11. */
export function shortDate(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

/* ── 1. Brand report ────────────────────────────────────────────────── */

/* The week's delivery. Chosen so the canon holds:
   113,448 ÷ 3,912,000 = 2.90% CTR; 48,320 ÷ 3,912 = $12.35 CPM;
   48,320 ÷ 113,448 = $0.43 CPC. */
const IMPRESSIONS_7D = 3_912_000;
const CLICKS_7D = 113_448;

const spend = ACCOUNT.spend7d;
const ctr = (CLICKS_7D / IMPRESSIONS_7D) * 100;
const cpm = (spend / IMPRESSIONS_7D) * 1000;
const cpc = spend / CLICKS_7D;
const cpa = spend / ACCOUNT.results7d;
const revenue = spend * ACCOUNT.roas7d;

export const REPORT = {
  title: "Account Performance",
  range: "Sep 24, 2026 to Sep 30, 2026",
  days: 7,
  generated: "10/1/2026 09:04 AM",
} as const;

export type ReportKpi = { label: string; value: string; note?: string; primary?: boolean };

/** The report's eight default tiles, in the app's order. */
export const REPORT_KPIS: ReportKpi[] = [
  { label: "Spend", value: money(spend), note: `${ACCOUNT.creativesWithSpend7d} creatives`, primary: true },
  { label: "Impressions", value: count(IMPRESSIONS_7D) },
  { label: "Clicks", value: count(CLICKS_7D), note: `CTR ${ctr.toFixed(2)}%` },
  { label: "Results", value: ACCOUNT.results7d.toLocaleString("en-US"), note: `CPA ${dollars(cpa)}` },
  { label: "ROAS", value: `${ACCOUNT.roas7d.toFixed(2)}x`, note: `${money(revenue)} in revenue` },
  { label: "CPM", value: dollars(cpm) },
  { label: "CPC", value: dollars(cpc) },
  { label: "CTR", value: `${ctr.toFixed(2)}%` },
];

/* Campaign names per platform. Invented; the canonical account has none. */
const CAMPAIGN: Record<string, string> = {
  allFizz: "Prospecting · Broad US",
  zeroSugar: "Prospecting · Broad US",
  wouldRebuy: "Spark Ads · Creators",
  bigMood: "Spark Ads · Creators",
  faveFizz: "Retargeting · 30d visitors",
};

export type TopCreative = {
  key: string;
  name: string;
  image: string;
  platform: SampleCreative["platform"];
  campaign: string;
  spend: string;
  ctr: string;
  cpa: string;
  roas: string;
};

/** The five creatives with the most spend in the window, largest first. */
export const TOP_CREATIVES: TopCreative[] = [...CREATIVE_LIST]
  .sort((a, b) => b.spend - a.spend)
  .slice(0, 5)
  .map((c) => ({
    key: c.key,
    name: c.name,
    image: c.image,
    platform: c.platform,
    campaign: CAMPAIGN[c.key] ?? "Prospecting · Broad US",
    spend: money(c.spend),
    ctr: `${c.ctr.toFixed(2)}%`,
    cpa: dollars(c.cpa),
    roas: `${c.roas.toFixed(2)}x`,
  }));

/* ── 2. Agency pacing board ─────────────────────────────────────────── */

export type PaceStatus = "on_pace" | "under" | "over" | "ended" | "not_started" | "no_budget";
export type GoalStatus = "under" | "over" | "met" | null;

type RawFlight = {
  id: string;
  supplier: string;
  channel: "CTV" | "OLV";
  start: string;
  end: string;
  /** Days of the flight already run on Oct 1, 2026. */
  elapsed: number;
  total: number;
  budget: number;
  spend: number;
  impressions: number;
  /** The buyer's CPM goal, as typed. */
  goal: number | null;
  /** How the row's CPM reads against its goal: stated here, as the board
      shows it for these figures. Null where no goal is set. */
  goalStatus: GoalStatus;
};

/* Six active flights as of Oct 1, 2026. Order names in the platform read
   "<agency> | Fizzli | <channel> | <supplier> | Fall 2026"; the table shows
   the parsed supplier, the channel tag and the flight text. */
const RAW: RawFlight[] = [
  { id: "lumen", supplier: "Lumen Stream", channel: "CTV", start: "2026-09-11", end: "2026-10-10", elapsed: 21, total: 30, budget: 45_000, spend: 22_680, impressions: 810_000, goal: 26, goalStatus: "over" },
  { id: "tidewater", supplier: "Tidewater", channel: "OLV", start: "2026-09-11", end: "2026-10-10", elapsed: 21, total: 30, budget: 24_000, spend: 13_944, impressions: 996_000, goal: 15.5, goalStatus: "under" },
  { id: "kestrel", supplier: "Kestrel TV", channel: "CTV", start: "2026-09-11", end: "2026-10-10", elapsed: 21, total: 30, budget: 60_000, spend: 41_160, impressions: 1_680_000, goal: 25, goalStatus: "met" },
  { id: "elmwick", supplier: "Elmwick", channel: "CTV", start: "2026-09-18", end: "2026-10-10", elapsed: 14, total: 23, budget: 18_000, spend: 10_840, impressions: 492_700, goal: null, goalStatus: null },
  { id: "harbor", supplier: "Harbor Kids", channel: "CTV", start: "2026-09-25", end: "2026-10-10", elapsed: 7, total: 16, budget: 12_000, spend: 5_410, impressions: 273_200, goal: 21, goalStatus: "under" },
  { id: "orbit", supplier: "Orbit Sports", channel: "CTV", start: "2026-09-11", end: "2026-10-10", elapsed: 21, total: 30, budget: 30_000, spend: 24_180, impressions: 700_870, goal: 32, goalStatus: "over" },
];

export type Flight = {
  id: string;
  /** The parsed order label: the supplier. */
  label: string;
  channel: "CTV" | "OLV";
  /** Second line of the order cell: flight text, then the advertiser. */
  sub: string;
  dates: string;
  endIso: string;
  daysLeft: number;
  budget: number;
  spend: number;
  expected: number;
  status: PaceStatus;
  /** Spend against expected spend, percent. */
  pace: number;
  /** Bar geometry, percent of budget. */
  spendPct: number;
  expectedPct: number;
  cpm: number;
  goal: number | null;
  goalStatus: GoalStatus;
};

function paceStatus(pace: number): PaceStatus {
  if (pace < 90) return "under";
  if (pace > 110) return "over";
  return "on_pace";
}

/** Furthest behind first: the table's default sort. */
export const FLIGHTS: Flight[] = RAW.map((r) => {
  const expected = (r.budget * r.elapsed) / r.total;
  const pace = (r.spend / expected) * 100;
  const cpmValue = (r.spend / r.impressions) * 1000;
  return {
    id: r.id,
    label: r.supplier,
    channel: r.channel,
    sub: `Fall 2026 · ${ACCOUNT.brand}`,
    dates: `${shortDate(r.start)} – ${shortDate(r.end)}`,
    endIso: r.end,
    daysLeft: r.total - r.elapsed,
    budget: r.budget,
    spend: r.spend,
    expected,
    status: paceStatus(pace),
    pace,
    spendPct: Math.min(100, (r.spend / r.budget) * 100),
    expectedPct: Math.min(100, (expected / r.budget) * 100),
    cpm: cpmValue,
    goal: r.goal,
    goalStatus: r.goalStatus,
  };
}).sort((a, b) => a.pace - b.pace);

const totalBudget = RAW.reduce((s, r) => s + r.budget, 0);
const totalSpend = RAW.reduce((s, r) => s + r.spend, 0);
const totalImpressions = RAW.reduce((s, r) => s + r.impressions, 0);
const totalExpected = FLIGHTS.reduce((s, f) => s + f.expected, 0);
const behind = FLIGHTS.filter((f) => f.status === "under");
const over = FLIGHTS.filter((f) => f.status === "over");
const worst = behind[0];

export const PACING = {
  asOf: "as of Oct 1, 2026",
  /* 6 active, plus one ended summer flight and one upcoming holiday flight
     that the Active filter hides. */
  chips: [
    { label: "Active", count: FLIGHTS.length, selected: true },
    { label: "All", count: FLIGHTS.length + 2, selected: false },
    { label: "Ended", count: 1, selected: false },
    { label: "Upcoming", count: 1, selected: false },
  ],
  active: FLIGHTS.length,
  behind: behind.length,
  over: over.length,
  budget: totalBudget,
  spend: totalSpend,
  impressions: totalImpressions,
  /** Delivered share of budget, percent. */
  delivered: (totalSpend / totalBudget) * 100,
  /** Share of budget expected by today, percent. */
  expected: (totalExpected / totalBudget) * 100,
  cpm: (totalSpend / totalImpressions) * 1000,
  worst: {
    label: worst.label,
    pace: Math.round(worst.pace),
    /** What a day has to deliver for the flight to finish on budget. */
    perDay: (worst.budget - worst.spend) / worst.daysLeft,
    endIso: worst.endIso,
  },
  syncStamp: ACCOUNT.syncStamp,
} as const;

export type TickerItem = { supplier: string; cpm: number; share: number };

/** One entry per supplier in the filter: CPM and share of spend to date. */
export const TICKER: TickerItem[] = FLIGHTS.map((f) => ({
  supplier: f.label,
  cpm: f.cpm,
  share: f.spend / totalSpend,
}));

/** The five rows the PacingRows crop shows: two behind, two on pace, one over. */
export const PACING_ROWS_IDS = ["lumen", "tidewater", "kestrel", "harbor", "orbit"];
