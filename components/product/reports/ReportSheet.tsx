import { SlidersHorizontal } from "lucide-react";
import { KpiStrip, PlatformBadge, adImage, cx } from "../ui";
import { REPORT, REPORT_KPIS, TOP_CREATIVES } from "./data";

/* ReportSheet: Reports in Report mode for the brand sample. The white
   paper a brand sends on: the account title in the brand serif over a
   hairline with a mono date line and the generated stamp, "Performance
   overview" with the eight headline tiles as a stone band between two
   hairlines, then "Top 5 by Spend" with real thumbnails, closed by the
   paper footer. The serif appears once, in the masthead; the peach rank
   numeral is the only accent.

   Design width: 1000 (inner width 934 after the 32px gutters), with the
   tiles four over four, which keeps every note in full.
   kpiRows 1 is a second fixed layout with its own design width: 1152, the
   app's full content column (inner width 1,086), where the eight tiles sit
   in one row as they do in the app. Do not use one row on a narrower
   sheet: under about 1,113 the row breaks seven and one.
   Natural height at 1000: 924px in full; 437px with until "kpis". At 1152
   with kpiRows 1: 837px in full; 350px with until "kpis". Footer off is
   42px less and each Top 5 row fewer is 77px less, at either width.
   Sits on the stone ground or directly on a tile. */

const SECTION_HEAD = "text-[14px] font-semibold text-pb-fg mb-4 pb-2 border-b border-pb-border";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.1em] text-pb-fg-muted">{label}</div>
      <div className="text-[13px] font-semibold font-mono tnum text-pb-fg">{value}</div>
    </div>
  );
}

export function ReportSheet({
  until = "top5",
  kpiRows = 2,
  topLimit = 5,
  footer = true,
  className,
}: {
  /** Where the sheet stops: after the KPI tiles, or after Top 5 by Spend. */
  until?: "kpis" | "top5";
  /** 2: two rows of four tiles, for the 1000 sheet. 1: one row of eight, only for a sheet 1152 wide (the app's full width). */
  kpiRows?: 1 | 2;
  /** Rows of the Top 5 list to show. The heading stays "Top 5 by Spend". */
  topLimit?: number;
  /** The paper's footer line. */
  footer?: boolean;
  className?: string;
}) {
  const top = TOP_CREATIVES.slice(0, topLimit);
  return (
    <div className={cx("bg-pb-card text-pb-fg rounded-lg border border-pb-border overflow-hidden", className)}>
      {/* Masthead: the report's title in the brand serif over a hairline */}
      <div className="px-8 pt-7 pb-6 border-b border-pb-border">
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0">
            {/* tell-ok font-display: report masthead */}
            <div className="font-display text-[24px] font-medium leading-tight tracking-[-0.01em] truncate">{REPORT.title}</div>
            <div className="text-[13px] text-pb-fg-muted mt-1 flex flex-wrap items-center gap-x-2 font-mono tnum">
              <span>
                {REPORT.range}
                <span className="text-pb-fg-faint"> · {REPORT.days} days</span>
              </span>
            </div>
          </div>
          <div className="text-right shrink-0 font-mono tnum text-[11px] text-pb-fg-faint">Peachblue · generated {REPORT.generated}</div>
        </div>
      </div>

      {/* Performance overview */}
      <div className="px-8 py-7">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-pb-border">
          <div className="text-[14px] font-semibold text-pb-fg">Performance overview</div>
          <span className="inline-flex items-center gap-1.5 text-[11px] rounded-md border border-pb-border px-2 py-1 text-pb-fg-muted">
            <SlidersHorizontal className="size-3" strokeWidth={2.25} />
            Edit KPIs
          </span>
        </div>
        {/* The app passes 130, which fills one row at its 1,086px inner width
            and is what one row uses here. At the 934px of the 1000 sheet
            that would wrap seven and one, so two rows set the minimum to
            200 and land on four over four. There the cell that starts the
            second row drops its left padding, so it lines up with the cell
            above it. In one row the longest note ("$164.3k in revenue")
            fills its 135px cell to within half a pixel, so the cells give
            up half of their right padding: nothing moves, since every line
            is left aligned, and the note cannot tip into an ellipsis. */}
        <KpiStrip
          dense
          minCell={kpiRows === 2 ? 200 : 130}
          items={REPORT_KPIS}
          className={kpiRows === 2 ? "[&>div:nth-child(4n+1)]:pl-0" : "[&>div]:pr-2"}
        />
      </div>

      {/* Top 5 by Spend */}
      {until === "top5" && (
        <div className="px-8 py-7 border-t border-pb-border">
          <div className={SECTION_HEAD}>Top 5 by Spend</div>
          <div className="divide-y divide-pb-border">
            {top.map((row, i) => (
              <div key={row.key} className="flex items-center gap-4 py-3.5">
                <span
                  className={cx(
                    "w-7 text-center font-mono text-[16px] leading-none",
                    i === 0 ? "text-pb-peach-600 font-semibold" : "text-pb-fg-muted/70",
                  )}
                >
                  {i + 1}
                </span>
                <div className="size-12 rounded-lg overflow-hidden bg-pb-muted/40 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={adImage(row.image, "sm")} alt="" width={48} height={48} loading="lazy" decoding="async" className="size-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <PlatformBadge platform={row.platform} className="h-[16px] px-1 text-[8.5px]" />
                    <span className="text-[11px] text-pb-fg-muted truncate">{row.campaign}</span>
                  </div>
                  <div className="text-[13px] font-medium truncate text-pb-fg">{row.name}</div>
                </div>
                <div className="grid gap-x-5 tnum grid-cols-4">
                  <Metric label="Spend" value={row.spend} />
                  <Metric label="CTR" value={row.ctr} />
                  <Metric label="CPA" value={row.cpa} />
                  <Metric label="ROAS" value={row.roas} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {footer && (
        <div className="px-8 py-3 border-t border-pb-border text-[11.5px] text-pb-fg-muted flex items-center justify-between">
          <span>Peachblue Creative Intel</span>
          <span className="font-mono">peachblue.io</span>
        </div>
      )}
    </div>
  );
}
