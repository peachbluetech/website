import { Card, cx } from "@/components/product/ui";
import { BRIEF, SOURCES } from "./data";

/* Takeaways: the right rail of the Brand Intel page. The "Key takeaways"
   card (white, a 2px peach rule down its left edge, three sentences with
   peach mono numerals 01. 02. 03.), then "Since last scan" (one short
   paragraph), then optionally "Sources" (one grey pill).

   Design width: 280 (the rail). The takeaways card has 20px of padding
   and the 2px rule, so its measure is 237px. It fills its container and
   reads well up to about 360px. */

const RAIL_LABEL = "text-[12.5px] font-medium";

export function Takeaways({
  sinceLastScan = true,
  sources = false,
  className,
}: {
  /** Show the "Since last scan" card under the takeaways. On by default. */
  sinceLastScan?: boolean;
  /** Show the "Sources" card last, as the page does. Off by default. */
  sources?: boolean;
  className?: string;
}) {
  return (
    <div className={cx("space-y-4", className)}>
      {/* The app's Card with "p-5 border-l-2 border-l-pb-peach-500". The left
          rule's colour is set as a style here because the shared class joiner
          reads a one-side border colour as the card's whole border colour and
          drops the hairline on the other three sides. Once the joiner keeps
          side colours apart, this can be the app's class string again. */}
      <Card className="p-5 border-l-2" style={{ borderLeftColor: "var(--color-pb-peach-500)" }}>
        <div className={cx(RAIL_LABEL, "text-pb-peach-700 mb-3")}>Key takeaways</div>
        <ol className="space-y-3">
          {BRIEF.takeaways.map((o, i) => (
            <li key={o} className="text-[12.5px] leading-relaxed text-pb-fg">
              <span className="text-pb-peach-700 font-mono tnum font-semibold mr-1.5">{String(i + 1).padStart(2, "0")}.</span>
              {o}
            </li>
          ))}
        </ol>
      </Card>

      {sinceLastScan && (
        <Card className="p-4">
          <div className={cx(RAIL_LABEL, "text-pb-fg-muted mb-2")}>Since last scan</div>
          <div className="text-[13px] leading-relaxed text-pb-fg/85">{BRIEF.sinceLastScan}</div>
        </Card>
      )}

      {sources && (
        <Card className="p-4">
          <div className={cx(RAIL_LABEL, "text-pb-fg-muted mb-2")}>Sources</div>
          <div className="flex flex-wrap gap-1.5">
            {SOURCES.map((s) => (
              <span key={s} className="inline-flex items-center h-6 rounded-full bg-pb-muted text-[11px] px-2.5 text-pb-fg-muted">
                {s}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
