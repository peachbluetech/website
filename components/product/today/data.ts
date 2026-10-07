/* Today, the week of Sep 24 to Sep 30, 2026, for the Fizzli sample account.
   Everything here is derived from components/product/sample.ts or invented
   to sit beside it; every figure reconciles with the canonical account.
   Sentences are built with the product's own templates, so a number changed
   in the sample account changes the sentence too. */

import { ACCOUNT, CREATIVES, CREATIVE_LIST, HERO_CREATIVE, type Platform, type SampleCreative } from "../sample";
import {
  formatCurrency,
  formatInteger,
  formatPercent,
  formatRoas,
  type KpiItem,
  type TrendPoint,
} from "@/components/product/ui";

/* ------------------------------------------------------------ page header */

/** The data date. Data lags the sync by a day. */
export const AS_OF = "2026-09-30";

export const TODAY_TITLE = `${ACCOUNT.scopeTitle}, ${ACCOUNT.window}`;

export const TODAY_SUBTITLE = `7 days against the prior 7 · ${ACCOUNT.creativesWithSpend7d} creatives with spend · as of ${AS_OF}`;

/* -------------------------------------------------------------- KPI strip */

/* Conversion path: Results, ROAS, CPA, CTR. Spend is not in the strip, it
   is the navy bar's figure. Deltas are relative change against the prior 7
   days; a falling CPA is good. */
export const TODAY_KPIS: KpiItem[] = [
  {
    label: "Results",
    value: formatInteger(ACCOUNT.results7d),
    delta: { pct: ACCOUNT.resultsDeltaPct, prior: formatInteger(ACCOUNT.resultsPrior7d), goodWhen: "up" },
  },
  {
    label: "ROAS",
    value: formatRoas(ACCOUNT.roas7d),
    delta: { pct: ACCOUNT.roasDeltaPct, prior: formatRoas(ACCOUNT.roasPrior7d), goodWhen: "up" },
  },
  {
    label: "CPA",
    value: formatCurrency(ACCOUNT.cpa7d),
    delta: { pct: ACCOUNT.cpaDeltaPct, prior: formatCurrency(ACCOUNT.cpaPrior7d), goodWhen: "down" },
  },
  {
    label: "CTR",
    value: formatPercent(ACCOUNT.ctr7d),
    delta: { pct: ACCOUNT.ctrDeltaPct, prior: formatPercent(ACCOUNT.ctrPrior7d), goodWhen: "up" },
    source: "clicks ÷ impressions",
  },
];

/* ------------------------------------------------------------ daily spend */

/* 28 days, Sep 3 to Sep 30, 2026. The first 14 draw in grey (the prior
   window), the last 14 in navy. The last 7 sum to 48,320 (the week's
   spend) and the 7 before them to 43,143 (the prior week's). */
const DAILY_SPEND = [
  5120, 5340, 5610, 5480, 5050, 5230, 5410, 5560, 5720, 6010, 5880, 5490, 5640, 5770,
  5890, 6120, 6480, 6390, 5940, 6060, 6263, 6480, 6920, 7310, 7150, 6540, 6780, 7140,
];

const WEEKDAY_LETTER = ["S", "M", "T", "W", "T", "F", "S"];

/** The chart's default range: the last 14 days against the 14 before. */
export const RANGE_DAYS = 14;

export const DAILY: TrendPoint[] = DAILY_SPEND.map((value, i) => {
  const date = new Date(Date.UTC(2026, 8, 3 + i));
  return {
    value,
    label: WEEKDAY_LETTER[date.getUTCDay()],
    title: date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
  };
});

/* ----------------------------------------------------------- pulse events */

export type PulseSeverity = "good" | "warn" | "bad" | "info";
export type PulseType = "drain" | "fatigue" | "new_winner" | "spend_shift" | "launch";

export type PulseEvent = {
  key: string;
  type: PulseType;
  severity: PulseSeverity;
  title: string;
  detail: string;
  /** Dollars attached to the row: 7-day spend, or the size of a budget move. */
  dollarImpact: number;
  /** The creative's image, shown as a 36px square. A row about several creatives has none and shows a grey square. */
  image?: string;
  /** The creative's platform. A row about several creatives has none and shows no badge. */
  platform?: Platform;
  /** The row's one verb. */
  action: string;
  /** Set when the row already went out in the weekly digest. */
  delivered?: string;
};

/** Dollars inside a sentence: rounded, grouped, no decimals. */
const dollars = (n: number) => `$${formatInteger(Math.round(n))}`;

/* The weekly digest goes out on Mondays; Sep 28, 2026 is one. */
const DIGEST = "Emailed · Slack Mon, Sep 28";

/* The drain row carries the thumbnail and platform of the under-tier
   creative that spent the most this week. */
const bleeders: SampleCreative[] = CREATIVE_LIST.filter((c) => c.tier === "under").sort((a, b) => b.spend - a.spend);
const worstBleeder = bleeders[0];

const DRAIN_TITLE_REST = " went to underperformers this week";
const DRAIN_DETAIL = `${ACCOUNT.wasteCreatives7d} creatives scoring under 30 still spent in the last 7 days. Cutting them is the fastest saving available.`;

const drain: PulseEvent = {
  key: "drain",
  type: "drain",
  severity: "bad",
  title: `${dollars(ACCOUNT.waste7d)}${DRAIN_TITLE_REST}`,
  detail: DRAIN_DETAIL,
  dollarImpact: ACCOUNT.waste7d,
  image: worstBleeder.image,
  platform: worstBleeder.platform,
  action: "See the cut list",
  delivered: DIGEST,
};

const fatigue: PulseEvent[] = ACCOUNT.fatigue.map((f, i) => {
  const creative = CREATIVES[f.key];
  return {
    key: `fatigue-${f.key}`,
    type: "fatigue",
    severity: "warn",
    title: `Fatigue: ${creative.name}`,
    detail: `CTR is down ${Math.abs(f.dropPct)}% from its best week (${f.fromCtr.toFixed(2)}% to ${f.toCtr.toFixed(2)}%) after ${f.activeDays} active days. Refresh or rotate before spend follows.`,
    dollarImpact: creative.spend,
    image: creative.image,
    platform: creative.platform,
    action: "Review fatigue",
    delivered: i === 0 ? DIGEST : undefined,
  };
});

/* First active day of the winner: seven days live as of the data date. */
const winner = HERO_CREATIVE;
const winnerLaunch = new Date(Date.UTC(2026, 8, 30 - winner.daysLive + 1)).toISOString().slice(0, 10);

const newWinner: PulseEvent = {
  key: "new-winner",
  type: "new_winner",
  severity: "good",
  title: `New winner: ${winner.name}`,
  detail: `Launched ${winnerLaunch}, already top tier at ${winner.roas.toFixed(1)}x ROAS. Worth more budget.`,
  dollarImpact: winner.spend,
  image: winner.image,
  platform: winner.platform,
  action: "Scale it",
};

/* The week's second-largest budget move. Invented: the size of the move
   and the prior week's ROAS. The move is large enough for the product to
   give it a row.
   Accepted departure from strict output: the largest move of the week is
   the new winner itself (nothing the week before, its whole spend this
   week), and the product would print a "Budget moved into" row for it as
   well. It would be the third row about one creative, so it is left out. */
const SHIFT = { creative: CREATIVES.wouldRebuy, delta: 2540, roasPrior: 3.5 };

const spendShift: PulseEvent = {
  key: "spend-shift",
  type: "spend_shift",
  severity: "info",
  title: `Budget moved into ${SHIFT.creative.name}`,
  detail: `${dollars(SHIFT.delta)} more than the prior week, ROAS ${SHIFT.roasPrior.toFixed(1)}x to ${SHIFT.creative.roas.toFixed(1)}x.`,
  dollarImpact: SHIFT.delta,
  image: SHIFT.creative.image,
  platform: SHIFT.creative.platform,
  action: "Review",
};

/* Creatives whose first active day falls inside the week (seven days live
   or fewer as of the data date). The product prints one row for all of
   them: no thumbnail, no platform, their names (the first three) and their
   combined spend. In the sample account that is the new winner alone. */
const WEEK_DAYS = 7;
const launched: SampleCreative[] = CREATIVE_LIST.filter((c) => c.daysLive <= WEEK_DAYS);

const launch: PulseEvent[] =
  launched.length === 0
    ? []
    : [
        {
          key: "launch",
          type: "launch",
          severity: "info",
          title: `${launched.length} new creative${launched.length === 1 ? "" : "s"} launched this week`,
          detail:
            launched
              .slice(0, 3)
              .map((c) => c.name)
              .join(", ") + (launched.length > 3 ? ` and ${launched.length - 3} more` : ""),
          dollarImpact: launched.reduce((sum, c) => sum + c.spend, 0),
          action: "See them",
        },
      ];

/* The product's order: bad, warn, good, info, then by dollars. */
const SEVERITY_RANK: Record<PulseSeverity, number> = { bad: 0, warn: 1, good: 2, info: 3 };

/** The week's rows in the product's order: act, watch, win, FYI, then by dollars. */
export const PULSE_EVENTS: PulseEvent[] = [newWinner, drain, ...fatigue, spendShift, ...launch].sort(
  (a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] || b.dollarImpact - a.dollarImpact,
);

/** The row a user ticks off first in the shorter lists: the smaller fatigue flag. */
export const PULSE_DONE_KEY = fatigue[fatigue.length - 1].key;

/** "6 open · $8,160 at stake": every visible row is open, only bad and warn rows are at stake. */
export function pulseMeta(events: PulseEvent[]): string {
  if (events.length === 0) return "All clear";
  const flagged = events.filter((ev) => ev.severity === "bad" || ev.severity === "warn");
  const atStake = flagged.reduce((sum, ev) => sum + ev.dollarImpact, 0);
  return `${events.length} ${flagged.length > 0 ? "open" : "to review"}${atStake > 0 ? ` · ${formatCurrency(atStake, 0)} at stake` : ""}`;
}

/* -------------------------------------------------------------- navy bar */

/* The bar's sentence is the top row: its title, then its detail.
   Accepted departure from strict output: the product appends the row's
   dollars after the title ("..., $6,180."). The drain title already opens
   with that figure, so here it is printed once, in mono, where the title
   has it. */
export const VOICE = {
  label: "This week",
  figureLabel: "Spend, 7 days",
  figure: formatCurrency(ACCOUNT.spend7d, 0),
  deltaPct: ACCOUNT.spendDeltaPct,
  prior: `${formatCurrency(ACCOUNT.spendPrior7d, 0)} prior`,
  stamp: ACCOUNT.syncStamp,
  sentenceFigure: dollars(ACCOUNT.waste7d),
  sentenceRest: `${DRAIN_TITLE_REST}. ${DRAIN_DETAIL}`,
  action: "Review",
};

/* ------------------------------------------------------------- right rail */

export const RAIL = {
  waste: {
    label: "Flowing to losers · 30d",
    figure: formatCurrency(ACCOUNT.waste30d),
    sentence: `${formatCurrency(ACCOUNT.waste7d)} of it in the last 7 days, across ${ACCOUNT.wasteCreatives7d} underperforming creatives.`,
    link: "See the leak",
  },
  hitRate: {
    label: "Creative hit rate · 90d",
    figure: `${ACCOUNT.hitRatePct}%`,
    sentence: `${ACCOUNT.hitRateHits} of ${ACCOUNT.hitRateQualified} creatives launched in the last 90 days reached the top tier.`,
    link: "Creative economics",
  },
  bench: {
    label: "Bench depth",
    figure: String(ACCOUNT.benchKeys.length),
    sentence: `Proven challengers behind your hero, which holds ${ACCOUNT.heroSharePct}% of 30-day spend.`,
    link: "Bench report",
  },
  fatigue: {
    label: "Fatigue watch",
    sentence: `${ACCOUNT.fatigue.length} creatives are losing CTR against their own best week.`,
    link: "Review flags",
  },
};
