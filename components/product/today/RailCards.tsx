import { ArrowRight, Flame } from "lucide-react";
import { cx } from "@/components/product/ui";
import { RAIL } from "./data";

const LABEL = "text-[12.5px] text-pb-fg-muted";
const FIGURE = "mt-1 font-mono text-[20px] leading-none tnum";
const SENTENCE = "mt-2 text-[12px] leading-relaxed text-pb-fg-muted";
const LINK = "mt-2.5 inline-flex items-center gap-1 text-[12px] font-medium";

function RailLink({ children, tone = "text-pb-peach-600" }: { children: string; tone?: string }) {
  return (
    <span className={cx(LINK, tone)}>
      {children}
      <ArrowRight className="size-3.5" strokeWidth={2.2} />
    </span>
  );
}

/* The four flat blocks of Today's right column: waste, hit rate, bench
   depth, fatigue. No cards: a hairline between blocks. The frame class
   carries the outer rules, which differ between the page grid (the top
   rule comes from the cell above) and a standalone crop. */
export function Rail({ className }: { className?: string }) {
  return (
    <div className={cx("divide-y divide-pb-border border-pb-border", className)}>
      {/* Waste: red figure, hatch on the right edge while money is still flowing. */}
      <div className="relative overflow-hidden py-4">
        <div className="absolute inset-y-0 right-0 w-24 pb-hatch text-pb-bad/[0.10] pointer-events-none" />
        <div className={LABEL}>{RAIL.waste.label}</div>
        <div className={cx(FIGURE, "text-pb-bad")}>{RAIL.waste.figure}</div>
        <p className={SENTENCE}>{RAIL.waste.sentence}</p>
        <RailLink>{RAIL.waste.link}</RailLink>
      </div>

      {/* Hit rate */}
      <div className="py-4">
        <div className={LABEL}>{RAIL.hitRate.label}</div>
        <div className={cx(FIGURE, "text-pb-fg")}>{RAIL.hitRate.figure}</div>
        <p className={SENTENCE}>{RAIL.hitRate.sentence}</p>
        <RailLink>{RAIL.hitRate.link}</RailLink>
      </div>

      {/* Bench */}
      <div className="py-4">
        <div className={LABEL}>{RAIL.bench.label}</div>
        <div className={cx(FIGURE, "text-pb-fg")}>{RAIL.bench.figure}</div>
        <p className={SENTENCE}>{RAIL.bench.sentence}</p>
        <RailLink>{RAIL.bench.link}</RailLink>
      </div>

      {/* Fatigue: amber label and link, no figure. */}
      <div className="py-4">
        <div className="flex items-center gap-1.5 text-[12.5px] text-pb-warn">
          <Flame className="size-3.5" strokeWidth={2} />
          {RAIL.fatigue.label}
        </div>
        <p className={SENTENCE}>{RAIL.fatigue.sentence}</p>
        <RailLink tone="text-pb-warn">{RAIL.fatigue.link}</RailLink>
      </div>
    </div>
  );
}

/* RailCards: the right-rail blocks on their own, with a rule above and
   below. Design width: 300 (the rail's width in the app; no padding of its
   own; sits on the stone ground). Natural height: 586px. */
export function RailCards({ className }: { className?: string }) {
  return <Rail className={cx("border-y", className)} />;
}
