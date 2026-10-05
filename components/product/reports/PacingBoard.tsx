import { ChevronDown } from "lucide-react";
import { Fig, KpiStrip, VoiceBar, cx } from "../ui";
import { FLIGHTS, PACING, dollars, money } from "./data";
import { DensityToggle, FlightTable } from "./parts";
import { SupplierTicker } from "./SupplierTicker";

/* PacingBoard: Reports in Pacing mode, for the agency sample (a media
   agency running streaming and online video flights for Fizzli). Top to
   bottom: status chips with the supplier select and the as-of stamp, the
   supplier rate card, the navy sentence that names the flight furthest
   behind and the daily spend that fixes it, four delivery figures, the
   overall delivery bar (dark is delivered, amber hatch is expected and not
   yet delivered, the peach tick is today), and one row per flight.
   The page's one navy block is the VoiceBar.

   Design width: 1152 (the app's content column). Sits on the stone ground.
   Natural height at 1152: 823px with six rows; each row fewer is 61px less. */
export function PacingBoard({
  rows = 6,
  hover = false,
  className,
}: {
  /** How many flight rows to show, furthest behind first. 1 to 6. */
  rows?: number;
  /** Open the hover card under the first row's pacing bar. Needs three or more rows to sit inside the table. */
  hover?: boolean;
  className?: string;
}) {
  const flights = FLIGHTS.slice(0, rows);
  const delivered = `${PACING.delivered.toFixed(0)}%`;
  const expected = `${PACING.expected.toFixed(0)}%`;
  return (
    <div className={cx("space-y-4", className)}>
      {/* Filters */}
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {PACING.chips.map((c) => (
              <span
                key={c.label}
                className={cx(
                  "h-8 px-3 rounded-full text-[12px] font-medium border inline-flex items-center gap-1.5",
                  c.selected ? "bg-pb-fg text-pb-bg border-pb-fg" : "bg-pb-card text-pb-fg border-pb-border",
                )}
              >
                {c.label}
                <span className={cx("font-mono tnum text-[11px]", c.selected ? "text-pb-bg/70" : "text-pb-fg-muted")}>{c.count}</span>
              </span>
            ))}
          </div>
          <div className="relative">
            <span className="inline-flex items-center h-8 pr-8 pl-3 rounded-full text-[12px] font-medium border border-pb-border bg-pb-card text-pb-fg">
              All suppliers
            </span>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-pb-fg-muted" strokeWidth={2} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono tnum text-[12px] text-pb-fg-muted">{PACING.asOf}</div>
          <DensityToggle />
        </div>
      </div>

      {/* The rate card first: every supplier in the filter, cheapest CPM first */}
      <SupplierTicker className="mb-4" />

      {/* The flights in one navy sentence, then the strip and a thin delivery bar */}
      <div>
        <VoiceBar
          label="Flights"
          className="mb-4"
          figure={{
            label: "Spend to date",
            value: dollars(PACING.spend, 0),
            sub: `of ${money(PACING.budget)} · ${delivered} delivered · ${PACING.syncStamp}`,
          }}
        >
          <Fig>{PACING.behind}</Fig> of <Fig>{PACING.active}</Fig> flights are behind pace, <Fig>{PACING.over}</Fig> over.{" "}
          {PACING.worst.label} is furthest behind at <Fig>{PACING.worst.pace}%</Fig> of expected;{" "}
          <Fig>{dollars(PACING.worst.perDay, 0)}</Fig> a day finishes it by {PACING.worst.endIso}.
        </VoiceBar>
        <KpiStrip
          items={[
            { label: "Delivery", value: delivered, note: `${expected} expected by today`, source: "spend ÷ budget", primary: true },
            {
              label: "Behind pace",
              value: `${PACING.behind} of ${PACING.active}`,
              note: `${PACING.over} over pace`,
              source: "under 95% of expected",
            },
            { label: "Blended CPM", value: dollars(PACING.cpm), note: `${PACING.active} campaigns`, source: "spend ÷ impressions × 1,000" },
            { label: "Impressions", value: `${(PACING.impressions / 1_000_000).toFixed(2)}M`, note: "to date", source: "daily rows" },
          ]}
        />
        <div className="mt-3">
          <div className="relative h-1 rounded-full bg-pb-muted-2 overflow-visible">
            <div className="absolute left-0 top-0 bottom-0 rounded-full bg-pb-fg-secondary" style={{ width: `${PACING.delivered}%` }} />
            <div
              className="absolute top-0 bottom-0 pb-hatch text-pb-warn/50"
              style={{ left: `${PACING.delivered}%`, width: `${PACING.expected - PACING.delivered}%` }}
            />
            <div className="absolute top-[-3px] bottom-[-3px] w-[2px] bg-pb-peach-500" style={{ left: `calc(${PACING.expected}% - 1px)` }} />
          </div>
          <div className="mt-1.5 flex items-center justify-between font-mono tnum text-[11px] text-pb-fg-faint">
            <span>
              {delivered} delivered · {expected} expected by today
            </span>
            <span>{money(PACING.budget)} total budget</span>
          </div>
        </div>
      </div>

      {/* Per-order table */}
      <FlightTable flights={flights} hoverId={hover ? flights[0]?.id : undefined} />
    </div>
  );
}
