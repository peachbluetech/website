import { Card, Fig, PlatformBadge, cx, formatCurrency } from "@/components/product/ui";
import type { Tier } from "@/components/product/sample";
import { COHORT_ROWS, ECON } from "./data";
import { EconSection, RowThumb } from "./parts";

/* CohortTable: "The 90-day launch cohort" as a table, so the hit rate can
   be audited row by row. Creative, launch date, spend since launch, score
   and an outcome chip. Rows are sorted by spend, highest first.

   Design width: 1152. Header row 37px, body rows 61px: 405px tall with the
   default 6 rows. header adds the section header and its two-line
   takeaway above (95px more).
   The outcome chips are the app's filled tints, and they follow the app's
   own mapping: Top and Above avg are both green, Average is amber. */

const TIER_CHIP: Record<Tier, { label: string; className: string }> = {
  top: { label: "Top", className: "bg-pb-good-bg text-pb-good" },
  above: { label: "Above avg", className: "bg-pb-good-bg text-pb-good" },
  avg: { label: "Average", className: "bg-pb-warn-bg text-pb-warn" },
  under: { label: "Under", className: "bg-pb-bad-bg text-pb-bad" },
};

const TH = "py-2.5 text-[11px] uppercase tracking-[0.06em] font-medium text-pb-fg-muted";

export function CohortTable({
  rows = 6,
  header = false,
  className,
}: {
  /** How many launches to show, 1 to 18 (the named creatives at the head of the cohort). The app shows 20. */
  rows?: number;
  /** Show the section header ("The 90-day launch cohort", "34% hit rate") and takeaway above the table. */
  header?: boolean;
  className?: string;
}) {
  const list = COHORT_ROWS.slice(0, Math.max(1, Math.min(COHORT_ROWS.length, rows)));
  const micro = ECON.microTests;
  return (
    <div className={className}>
      {header && (
        <EconSection
          title="The 90-day launch cohort"
          status={{ label: `${ECON.hitRatePct}% hit rate`, tone: "neutral" }}
          takeaway={
            <>
              <Fig>{ECON.qualified}</Fig> launches got real spend in the last 90 days: <Fig>{ECON.hits}</Fig> became winners,{" "}
              <Fig>{ECON.workhorses}</Fig> are above average. <Fig>{micro}</Fig> micro-test{micro === 1 ? "" : "s"} under $50 sit outside the rate.
              Raising hit rate is what compounds from here, not raising budget.
            </>
          }
        />
      )}
      <Card className={cx("overflow-hidden", header && "mt-4")}>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-pb-border">
              <th className={cx("px-5", TH)}>Creative</th>
              <th className={cx("px-3", TH)}>Launched</th>
              <th className={cx("px-3", TH, "text-right")}>Spend</th>
              <th className={cx("px-3", TH, "text-right")}>Score</th>
              <th className={cx("px-5", TH, "text-right")}>Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pb-border">
            {list.map(({ creative, launched, spend }) => {
              const chip = TIER_CHIP[creative.tier];
              return (
                <tr key={creative.key}>
                  <td className="px-5 py-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <RowThumb image={creative.image} name={creative.name} />
                      <span className="text-[13px] font-medium text-pb-fg truncate max-w-[280px]">{creative.name}</span>
                      <PlatformBadge platform={creative.platform} />
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[12px] font-mono tnum text-pb-fg-muted whitespace-nowrap">{launched}</td>
                  <td className="px-3 py-2.5 text-[12.5px] font-mono tnum text-pb-fg text-right whitespace-nowrap">{formatCurrency(spend)}</td>
                  <td className="px-3 py-2.5 text-[12.5px] font-mono tnum text-pb-fg text-right">{creative.score}</td>
                  <td className="px-5 py-2.5 text-right">
                    <span className={cx("inline-flex items-center h-[20px] rounded-md px-2 text-[11px] font-semibold", chip.className)}>
                      {chip.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
