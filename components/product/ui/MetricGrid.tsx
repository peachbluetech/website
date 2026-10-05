import { cx } from "./cx";

/* MetricGrid: a grid of small labelled tiles for the creative detail
   panel. Each tile: a muted 12.5px label over a 14px mono value, with an
   optional hint. Tiles are 64px tall, 82px in a row where one carries a
   hint; 8px gaps; 3 columns by default. */
export interface MetricItem {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "good" | "bad" | "muted";
}

export function MetricGrid({
  metrics,
  columns = 3,
  className,
}: {
  metrics: MetricItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const gridCols = columns === 4 ? "grid-cols-4" : columns === 2 ? "grid-cols-2" : "grid-cols-3";
  return (
    <div className={cx("grid gap-2", gridCols, className)}>
      {metrics.map((m, i) => (
        <MetricTile key={`${m.label}-${i}`} {...m} />
      ))}
    </div>
  );
}

function MetricTile({ label, value, hint, tone = "default" }: MetricItem) {
  const valueClass =
    tone === "good" ? "text-pb-good" : tone === "bad" ? "text-pb-bad" : tone === "muted" ? "text-pb-fg-muted" : "text-pb-fg";
  return (
    <div className="rounded-lg border border-pb-border bg-pb-muted/30 p-2.5">
      <div className="text-[12.5px] font-medium text-pb-fg-muted mb-0.5">{label}</div>
      <div className={cx("text-[14px] font-semibold font-mono tnum", valueClass)}>{value}</div>
      {hint && <div className="text-[11px] text-pb-fg-muted mt-0.5">{hint}</div>}
    </div>
  );
}
