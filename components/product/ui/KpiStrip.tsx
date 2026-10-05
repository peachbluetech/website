import { cx } from "./cx";
import { formatSignedPct } from "./format";

/* KpiStrip: one row of figures separated by hairlines. No card, no
   sparkline. The hairlines are a 1px grid gap over the border colour, and
   each cell paints the page ground over it, so the strip must sit on the
   stone ground (inside a white card the cells would read as stone blocks).
   Design width: fluid; cells are at least minCell wide and wrap below
   that. 102px tall, 120px when a cell carries a source line (the row
   takes the height of its tallest cell); dense is 88px and 107px. */
export interface KpiItem {
  label: string;
  value: string;
  /** Comparison against the prior period. goodWhen says which direction is good; "none" keeps it neutral. */
  delta?: { pct: number | null; prior?: string; goodWhen?: "up" | "down" | "none" } | null;
  /** Free-form line under the value when there is no delta. */
  note?: string;
  /** Where the number came from: a formula, a row count. Faint, under everything. */
  source?: string;
  /** A larger number for the strip's lead figure. */
  primary?: boolean;
}

export function KpiStrip({
  items,
  className,
  dense,
  minCell = 150,
}: {
  items: KpiItem[];
  className?: string;
  dense?: boolean;
  /** Minimum cell width in px before the row wraps. */
  minCell?: number;
}) {
  return (
    <div
      className={cx("grid gap-px border-y border-pb-border bg-pb-border", className)}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minCell}px, 1fr))` }}
    >
      {items.map((it, i) => {
        const pct = it.delta?.pct ?? null;
        const goodWhen = it.delta?.goodWhen ?? "up";
        const neutral = pct == null || goodWhen === "none" || pct === 0;
        const good = !neutral && (pct as number) > 0 === (goodWhen === "up");
        const tone = neutral ? "text-pb-fg-muted" : good ? "text-pb-good" : "text-pb-bad";
        const muted = "text-pb-fg-muted";
        return (
          <div
            key={`${it.label}-${i}`}
            className={cx("min-w-0 bg-pb-bg", dense ? "py-2.5 pr-4 [&:not(:first-child)]:pl-4" : "py-3.5 pr-5 [&:not(:first-child)]:pl-5")}
          >
            <div className={cx("text-[12.5px] truncate", muted)}>{it.label}</div>
            <div
              className={cx(
                "font-mono tnum tracking-[-0.01em] mt-0.5 truncate text-pb-fg",
                it.primary ? (dense ? "text-[20px]" : "text-[24px]") : dense ? "text-[17px]" : "text-[20px]",
              )}
            >
              {it.value}
            </div>
            {it.delta ? (
              <div className={cx("mt-0.5 font-mono tnum text-[11.5px] truncate", muted)}>
                {pct != null ? <span className={cx("font-medium", tone)}>{formatSignedPct(pct)}</span> : <span>{"–"}</span>}
                {it.delta.prior && <span> · {it.delta.prior}</span>}
              </div>
            ) : it.note ? (
              <div className={cx("mt-0.5 text-[11.5px] truncate", muted)}>{it.note}</div>
            ) : null}
            {it.source && <div className="mt-1 text-[10.5px] truncate text-pb-fg-faint">{it.source}</div>}
          </div>
        );
      })}
    </div>
  );
}
