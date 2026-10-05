import { cx } from "../ui/cx";
import { TICKER, type TickerItem } from "./data";

/* SupplierTicker: the rate card above the pacing board. One mono line of
   every supplier in the filter, cheapest CPM first, each with its share of
   spend, over a hairline. No card. It wraps instead of scrolling.
   Design width: 560 as a crop (two lines of three suppliers and the note
   on a third, 77px tall); inside the 1152 board the six suppliers fill one
   line and the note wraps to a second (56px). Sits on the stone ground. */
export function SupplierTicker({
  items = TICKER,
  note = "CPM · share of spend",
  className,
}: {
  /** Defaults to the six suppliers of the agency sample. */
  items?: TickerItem[];
  /** The faint legend pushed to the right edge. Pass null to drop it. */
  note?: string | null;
  /** Spacing only. */
  className?: string;
}) {
  const sorted = [...items].sort((a, b) => a.cpm - b.cpm);
  return (
    <div
      className={cx(
        "flex flex-wrap items-baseline gap-x-5 gap-y-1 py-2 border-b border-pb-border font-mono tnum text-[11.5px] text-pb-fg-muted",
        className,
      )}
    >
      {sorted.map((i) => (
        <span key={i.supplier} className="whitespace-nowrap">
          <span className="font-medium text-pb-fg">{i.supplier}</span> {`$${i.cpm.toFixed(2)}`}
          <span className="text-pb-fg-faint"> · {Math.round(i.share * 100)}%</span>
        </span>
      ))}
      {note && <span className="ml-auto text-pb-fg-faint">{note}</span>}
    </div>
  );
}
