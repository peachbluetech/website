import { cx } from "./cx";

/* The product's chart kit, hand-rolled and token-native: no chart library.
   Each is a pure function of its data and renders what the app shows at
   rest (the app's hover state is not reproduced). */

// ---------------------------------------------------------------- TrendLine

export type TrendPoint = {
  /** Short axis label, for example a weekday initial. Empty string for no tick. */
  label: string;
  value: number;
  /** Full label for the readout above the chart, for example "Sep 30". */
  title?: string;
};

export type TrendAnnotation = {
  /** Index into data. */
  index: number;
  label: string;
};

/* TrendLine: one flat line. The first mutedBefore points draw in the
   hairline grey (the comparison period), the rest in navy (the current
   period). No area fill, a faint three-line grid, mono axis ticks. At rest
   the last point is active: a peach dot, a dashed cursor on the right edge
   and a mono readout above it comparing the last day with the same day one
   period earlier. Leave about 24px of space above for the readout (the
   app's header row carries mb-6).
   Design width: fluid, stretches to its container. Height: the height prop
   (the app's Today page passes 128). */
export function TrendLine({
  data,
  format,
  height = 120,
  mutedBefore = 0,
  annotations = [],
  compareLabel = "prior",
  className,
}: {
  data: TrendPoint[];
  format: (v: number) => string;
  height?: number;
  mutedBefore?: number;
  /** Dashed vertical markers with a small mono label at the top of the chart. */
  annotations?: TrendAnnotation[];
  /** Word used for the comparison value in the readout, for example "14d earlier". */
  compareLabel?: string;
  className?: string;
}) {
  if (data.length < 2) return null;
  const W = 600;
  const H = height;
  const padTop = 14;
  const padBottom = 20;
  const max = Math.max(...data.map((d) => d.value), 1);
  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => padTop + (1 - v / max) * (H - padTop - padBottom);
  const pts = data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`);
  const cut = Math.min(Math.max(mutedBefore, 0), data.length - 1);
  const priorPts = pts.slice(0, cut + 1).join(" ");
  const currentPts = pts.slice(cut).join(" ");
  const active = data.length - 1;
  const grid = [0.25, 0.5, 0.75].map((f) => padTop + f * (H - padTop - padBottom));
  const tooltipLeft = Math.min(Math.max((x(active) / W) * 100, 8), 92);
  const period = cut > 0 ? cut : Math.floor(data.length / 2);
  const compareIdx = active - period;
  const compare = compareIdx >= 0 && active >= cut ? data[compareIdx] : null;
  const compareDelta = compare && compare.value > 0 ? ((data[active].value - compare.value) / compare.value) * 100 : null;
  const visibleAnnotations = annotations.filter((a) => a.index >= 0 && a.index < data.length);

  return (
    <div className={cx("relative", className)}>
      <div
        className={cx(
          "absolute -top-1 -translate-y-full font-mono tnum text-[11px] text-pb-fg whitespace-nowrap pointer-events-none",
          tooltipLeft > 66 ? "-translate-x-full" : tooltipLeft < 20 ? "" : "-translate-x-1/2",
        )}
        style={{ left: `${tooltipLeft}%` }}
      >
        {data[active].title ?? data[active].label} · {format(data[active].value)}
        {compare && (
          <span className="text-pb-fg-muted">
            {" "}· {compareLabel} {format(compare.value)}
            {compareDelta != null && (
              <span className={cx("ml-1", compareDelta < 0 ? "text-pb-bad" : "text-pb-good")}>
                {compareDelta < 0 ? "−" : "+"}
                {Math.abs(compareDelta).toFixed(1)}%
              </span>
            )}
          </span>
        )}
      </div>
      {visibleAnnotations.map((a) => (
        <div
          key={`${a.index}-${a.label}`}
          className="absolute top-0 bottom-5 border-l border-dashed border-pb-border-control pointer-events-none"
          style={{ left: `${(x(a.index) / W) * 100}%` }}
        >
          <span className="absolute top-0 left-1.5 font-mono text-[10px] text-pb-fg-faint whitespace-nowrap">{a.label}</span>
        </div>
      ))}
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full block" style={{ height: H }} aria-hidden="true">
        {grid.map((gy) => (
          <line key={gy} x1={0} x2={W} y1={gy} y2={gy} className="stroke-pb-border" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
        <line x1={0} x2={W} y1={H - padBottom} y2={H - padBottom} className="stroke-pb-border-control" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        {cut > 0 && (
          <polyline points={priorPts} fill="none" className="stroke-pb-border-control" strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        )}
        <polyline points={currentPts} fill="none" className="stroke-pb-ink" strokeWidth={1.75} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        <line x1={x(active)} x2={x(active)} y1={padTop} y2={H - padBottom} className="stroke-pb-fg-faint" strokeWidth={1} vectorEffect="non-scaling-stroke" strokeDasharray="2 3" />
      </svg>
      {/* The active point is an HTML dot, not an SVG circle: the SVG is
          stretched to the container width, so a circle inside it would
          render as an ellipse. */}
      <span
        className="absolute size-[7px] -ml-[3.5px] -mt-[3.5px] rounded-full bg-pb-peach-500 pointer-events-none"
        style={{ left: `${(x(active) / W) * 100}%`, top: y(data[active].value) }}
      />
      <div className="flex justify-between font-mono text-[10.5px] text-pb-fg-faint -mt-4 px-px select-none">
        {data.map((d, i) => (
          <span key={i} className={i === active ? "text-pb-fg" : undefined}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- TickStrip

/** "avg" is accepted as a synonym of "average" so the sample account's tier keys can be passed straight in. */
export type TickTone = "top" | "above" | "average" | "avg" | "under" | "none";

const TICK_TONE: Record<TickTone, string> = {
  top: "bg-pb-score-top",
  above: "bg-pb-score-above",
  average: "bg-pb-score-avg",
  avg: "bg-pb-score-avg",
  under: "bg-pb-score-under",
  none: "bg-pb-score-none",
};

/* On the navy surface the score colours need to read against deep blue.
   The palette exists in the app, but no app page puts a strip on navy, and
   the only navy surface is the VoiceBar: do not build one for it. */
const TICK_TONE_INK: Record<TickTone, string> = {
  top: "bg-pb-score-top-dark",
  above: "bg-pb-sky-300",
  average: "bg-pb-ink-fg/30",
  avg: "bg-pb-ink-fg/30",
  under: "bg-pb-score-under-dark",
  none: "bg-pb-ink-fg/15",
};

/* TickStrip: a barcode strip, one 3px tick per item, coloured by tier.
   Ticks are left-aligned and never stretch: n items are 6n minus 3 px wide.
   Height: the height prop (26 by default; Economics passes 18). */
export function TickStrip({
  items,
  onInk = false,
  height = 26,
  className,
}: {
  items: { tone: TickTone }[];
  /** Palette for a navy ground. Kept for parity with the app, which never uses it on a page. */
  onInk?: boolean;
  height?: number;
  className?: string;
}) {
  if (items.length === 0) return null;
  const palette = onInk ? TICK_TONE_INK : TICK_TONE;
  return (
    <div className={cx("flex items-stretch gap-[3px]", className)} style={{ height }}>
      {items.map((t, i) => (
        <div key={i} className={cx("w-[3px] rounded-full", palette[t.tone])} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- DecayLine

/* DecayLine: the mini trend for a fatigue row, rolling CTR from launch to
   now. An amber line over a pale wash, a quiet dot at the peak and an
   amber dot at the current value. The end dot's white stroke assumes a
   white card behind it. 148 by 40 px by default. */
export function DecayLine({
  points,
  width = 148,
  height = 40,
  className,
}: {
  points: number[];
  width?: number;
  height?: number;
  className?: string;
}) {
  if (points.length < 2) return null;
  const max = Math.max(...points);
  const min = Math.min(...points, 0);
  const span = max - min || 1;
  const pad = 4;
  const xy = (v: number, i: number): [number, number] => [
    pad + (i / (points.length - 1)) * (width - pad * 2),
    pad + (1 - (v - min) / span) * (height - pad * 2),
  ];
  const pts = points.map((v, i) => xy(v, i));
  const line = pts.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const area = `${line} ${(width - pad).toFixed(1)},${(height - 1).toFixed(1)} ${pad},${(height - 1).toFixed(1)}`;
  const [px, py] = pts[points.indexOf(max)];
  const [ex, ey] = pts[pts.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={cx("overflow-visible", className)} aria-hidden="true">
      <polygon points={area} className="fill-pb-warn/10" />
      <polyline points={line} fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="stroke-pb-warn/70" />
      <circle cx={px} cy={py} r={2.6} className="fill-pb-fg-faint" />
      <circle cx={ex} cy={ey} r={3.2} className="fill-pb-warn stroke-pb-card" strokeWidth={1.5} />
    </svg>
  );
}
