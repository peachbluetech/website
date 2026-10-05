import { Card, DecayLine, Fig, PlatformBadge, cx, formatCurrency, formatPercent } from "@/components/product/ui";
import { FATIGUE_CANON_COUNT, FATIGUE_MAX_COUNT, fatigueRows } from "./data";
import { EconSection, RowThumb } from "./parts";

/* FatigueCard: the "Fatigue watch" list. One white card of
   hairline-separated rows: thumbnail, name and platform, active days and
   7-day spend, the rolling-CTR decay line from launch to now (148 by 40,
   never resized), and the drop against the creative's own best week in
   amber. Type is the app's: the meta and CTR lines are Inter with only
   their figures in mono.

   Design width: 1152. Rows are 72px plus hairlines: 147px tall with the
   default 2 rows, 220px with 3, 74px with 1.
   narrow: design width 560. The app's row with the decay line inline. The
   name column is 170px there, so the platform mark is left out (the one
   change from the app's row) and the meta line wraps after the amount, as
   it would in the app: rows are 89px, 181px tall with 2 rows, 270px with
   3, 91px with 1.
   header adds the section header and its two-line takeaway above: 95px
   more at either width.

   rows defaults to the sample account's own count (2), the number Today
   and the digest print. A third row adds a flag the canon does not carry;
   see the prop. */
export function FatigueCard({
  narrow = false,
  rows = FATIGUE_CANON_COUNT,
  header = false,
  className,
}: {
  /** The 560 layout. */
  narrow?: boolean;
  /** How many flagged creatives to show, 1 to 3. The default 2 is the sample account's fatigue list. 3 adds Currently obsessed, which is not in that list: use it only where nothing else on the page prints the fatigue count, and pair it with EconomicsHead fatigueFlags={3}. */
  rows?: number;
  /** Show the section header ("Fatigue watch", "2 flagged") and takeaway above the card. The count is the number flagged, not the rows shown. */
  header?: boolean;
  className?: string;
}) {
  const want = Math.max(1, Math.min(FATIGUE_MAX_COUNT, Math.round(rows)));
  const flagged = fatigueRows(want);
  const shown = flagged.slice(0, want);
  return (
    <div className={className}>
      {header && (
        <EconSection
          title="Fatigue watch"
          status={{ label: `${flagged.length} flagged`, tone: "warn" }}
          takeaway="CTR is measured against each creative's own best rolling week, not an account average, so a flag here means the audience is genuinely wearing out."
        />
      )}
      <Card className={cx("overflow-hidden", header && "mt-4")}>
        <ul className="divide-y divide-pb-border">
          {shown.map((f) => (
            <li key={f.creative.key}>
              <div className="block px-5 py-4">
                <div className="flex items-center gap-3.5">
                  <RowThumb image={f.creative.image} name={f.creative.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-medium text-pb-fg truncate">{f.creative.name}</span>
                      {!narrow && <PlatformBadge platform={f.creative.platform} />}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-pb-fg-muted">
                      <Fig>{f.activeDays}</Fig> active days · <Fig>{formatCurrency(f.creative.spend)}</Fig>
                      {/* A no-break space keeps "last 7d" together where the narrow column wraps the line. */}
                      {" last\u00a07d"}
                    </div>
                  </div>
                  <DecayLine points={f.trend} className="block shrink-0" />
                  <div className="text-right shrink-0 w-[118px]">
                    <div className="text-[15px] font-semibold font-mono tnum text-pb-warn">−{f.decayPct}%</div>
                    <div className="text-[11px] text-pb-fg-faint">
                      <Fig>{formatPercent(f.peakCtr)}</Fig> → <Fig>{formatPercent(f.recentCtr)}</Fig> CTR
                    </div>
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
