import { Card, Fig, PlatformBadge, formatCurrency } from "@/components/product/ui";
import { BLEEDING, ECON } from "./data";
import { EconSection, RowThumb } from "./parts";

/* WasteLeak: the "Where the money leaks" section. Header with the red
   status, the takeaway sentence, the hatched leak bar (under-tier share of
   30-day spend) and the cut list: under-tier creatives still spending, by
   7-day spend.

   Design width: 1152. 422px tall with the default 4 rows; each further
   row adds 69px (767px with all 9).
   narrow: design width 560. Same markup and, with the takeaway on two
   lines at both widths, the same heights.
   The first eight rows are the canon's creatives with their images; the
   ninth has no thumbnail and shows the app's initials tile. All nine sum
   to the status figure.
   Type is the app's: the meta lines and bar labels are Inter with only
   their figures in mono; the red 7-day amount is mono throughout. */
export function WasteLeak({
  narrow = false,
  rows = 4,
  className,
}: {
  /** The 560 layout. The markup is fluid; this only records the intent. */
  narrow?: boolean;
  /** How many rows of the cut list to show, 1 to 9. */
  rows?: number;
  className?: string;
}) {
  const share = ECON.wasteSharePct;
  const list = BLEEDING.slice(0, Math.max(1, Math.min(BLEEDING.length, rows)));
  return (
    <div className={className} data-layout={narrow ? "narrow" : "wide"}>
      <EconSection
        title="Where the money leaks"
        status={{ label: `${formatCurrency(ECON.waste7d)} leaking`, tone: "bad" }}
        takeaway={
          <>
            <Fig>{formatCurrency(ECON.waste7d)}</Fig> went to creatives scoring under 30 in the last 7 days. Cutting these is the cheapest
            performance gain available. No new creative required.
          </>
        }
      />

      <div className="mt-4">
        <div className="h-3 rounded-full bg-pb-muted overflow-hidden">
          <div
            className="h-full rounded-full pb-hatch text-pb-bad bg-pb-bad/15"
            style={{ width: `${Math.max(1.5, Math.min(100, share)).toFixed(1)}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-pb-fg-faint tnum">
          <span>
            <Fig>{share.toFixed(1)}%</Fig> of 30-day spend on under-tier
          </span>
          <span>
            <Fig>{formatCurrency(ECON.spend30d)}</Fig> total
          </span>
        </div>
      </div>

      <Card className="mt-4 overflow-hidden">
        <ul className="divide-y divide-pb-border">
          {list.map((b) => (
            <li key={b.key}>
              <div className="flex items-center gap-3.5 px-5 py-3.5">
                <RowThumb image={b.image} name={b.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-medium text-pb-fg truncate">{b.name}</span>
                    <PlatformBadge platform={b.platform} />
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-pb-fg-muted">
                    Score <Fig>{b.score}</Fig> · <Fig>{b.activeDays}</Fig> active days
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13.5px] font-semibold font-mono tnum text-pb-bad">{formatCurrency(b.spend7d)}</div>
                  <div className="text-[11px] text-pb-fg-faint">
                    last 7d · <Fig>{formatCurrency(b.spend30d)}</Fig> 30d
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
