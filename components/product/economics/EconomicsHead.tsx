import { Fig, KpiStrip, TickStrip, VoiceBar, cx, formatCurrency, type KpiItem } from "@/components/product/ui";
import { COHORT_TICKS, ECON, FATIGUE_CANON_COUNT, fatigueRows, medianWinnerDays } from "./data";

/* EconomicsHead: the top of the Creative Economics page. The navy
   sentence with the hit rate, the three-cell strip (waste, hero
   concentration, fatigue flags) and the launch cohort as a tick strip
   with its legend.

   Design width: 1152 (the app's content column). 272px tall: the bar 98,
   20 of gap, the strip 120, then the 18px tick row 16 below it.
   narrow: design width 560, and a deliberate re-composition, not a crop:
   the app has no 560 layout for this region (its bar is one unwrapped row
   and its strip keeps three 186px cells there, which cuts three of the six
   small lines short). Two things differ from the app. The bar is the same
   VoiceBar with a shorter sentence, the app's waste clause without its
   window, so it holds two lines beside the figure and the link. The strip
   is set two cells over one, the third cell spanning the row. Every cell,
   the tick row and the legend are the app's own. 391px tall.
   Sits on the stone ground: the strip's cells paint the ground colour. */
export function EconomicsHead({
  narrow = false,
  fatigueFlags = FATIGUE_CANON_COUNT,
  className,
}: {
  /** The 560 re-composition: a shorter navy sentence and the strip two cells over one. */
  narrow?: boolean;
  /** The "Fatigue flags" figure. The default 2 is the sample account's count, which Today and the digest also print. Pass 3 only beside a FatigueCard with rows={3}. */
  fatigueFlags?: number;
  className?: string;
}) {
  const flagged = fatigueRows(fatigueFlags);
  const median = medianWinnerDays(flagged);
  const n = ECON.provenChallengers;

  const figure = {
    label: "Hit rate, 90 days",
    value: `${ECON.hitRatePct}%`,
    sub: `${ECON.hits} of ${ECON.qualified} qualified launches`,
  };
  const sentence = (
    <>
      <Fig>{ECON.hits}</Fig> of <Fig>{ECON.qualified}</Fig> qualified launches reached the top tier, and{" "}
      <Fig>{formatCurrency(ECON.waste30d, 0)}</Fig> flowed to under-tier creatives over 30 days. Your hero holds{" "}
      <Fig>{ECON.heroSharePct}%</Fig> of spend with <Fig>{n}</Fig> proven challenger{n === 1 ? "" : "s"} behind it.
    </>
  );

  /* The 560 bar leaves the sentence a 166px column: the app's waste clause, cut to two lines.
     The cell under it carries the window ("Waste · 30d"). */
  const shortSentence = (
    <>
      <Fig>{formatCurrency(ECON.waste30d, 0)}</Fig> flowed to under-tier creatives.
    </>
  );

  const items: KpiItem[] = [
    {
      label: "Waste · 30d",
      value: formatCurrency(ECON.waste30d),
      note: `${ECON.wasteSharePct.toFixed(1)}% of spend on under-tier`,
      source: "spend on under-tier creatives",
    },
    {
      label: "Hero concentration",
      value: `${ECON.heroSharePct}%`,
      note: `${n} proven challenger${n === 1 ? "" : "s"} behind it`,
      source: "top creative's share of 30-day spend",
    },
    {
      label: "Fatigue flags",
      value: String(flagged.length),
      note: median != null ? `winners last ~${median} days` : "CTR decay vs own best week",
      source: "CTR vs each creative's best week",
    },
  ];

  return (
    <div className={className}>
      <VoiceBar label="Scaling" className="mb-5" figure={figure} action="See the cut list">
        {narrow ? shortSentence : sentence}
      </VoiceBar>

      {narrow ? (
        <>
          <KpiStrip items={items.slice(0, 2)} />
          <KpiStrip items={items.slice(2)} className="-mt-px" />
        </>
      ) : (
        <KpiStrip items={items} />
      )}

      <div className="mt-4 flex items-center gap-4">
        <TickStrip className="flex-1" height={18} items={COHORT_TICKS.map((tone) => ({ tone }))} />
        <TickLegend />
      </div>
    </div>
  );
}

const LEGEND = [
  ["bg-pb-score-top", "Top"],
  ["bg-pb-score-above", "Above"],
  ["bg-pb-score-avg", "Avg"],
  ["bg-pb-score-under", "Under"],
] as const;

function TickLegend() {
  return (
    <div className="flex items-center gap-3 shrink-0">
      {LEGEND.map(([cls, label]) => (
        <span key={label} className="inline-flex items-center gap-1 text-[11.5px] text-pb-fg-muted">
          <span className={cx("size-1.5 rounded-full", cls)} />
          {label}
        </span>
      ))}
    </div>
  );
}
