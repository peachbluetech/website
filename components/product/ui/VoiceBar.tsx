import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "./cx";

/* VoiceBar: the product's one navy sentence per page. A flat navy row, a
   short label, an optional headline figure in mono, one sentence with its
   figures in mono, and one peach link. Never more than one per screen.
   Design width: fluid. Height follows the sentence: with a figure it is
   98px while the sentence fits two lines and grows by about 10px at three
   lines (108px) and 20px a line after that; without a figure it is 44px on
   one line. The product shows the sentence on two lines at most, so give
   the bar the width for that. The figure cell takes its content width
   (325px with a delta, a prior value and a sync stamp) and the link about
   60px, so the sentence column is the bar minus about 466px. The sample
   account's Today sentence (about 150 characters) needs a bar of 952px or
   more: the content column of a 1280 window with the full rail, or of a
   1200 window with the icon rail. In a narrower bar shorten the sentence
   or drop the sync stamp from the sub-line. */
export function VoiceBar({
  label,
  figure,
  children,
  action,
  className,
}: {
  label: string;
  /** The headline number, 26px mono, left of a hairline. */
  figure?: { label: string; value: string; sub?: ReactNode };
  /** One sentence. Wrap figures in <Fig>. */
  children: ReactNode;
  /** The peach link's label. An object with a label is accepted for parity with the app; nothing navigates. */
  action?: string | { label: string; href?: string };
  /** Spacing only, for example "mb-5". */
  className?: string;
}) {
  const actionLabel = typeof action === "string" ? action : action?.label;
  return (
    <div className={cx("flex items-center gap-5 rounded-lg bg-pb-ink text-pb-ink-fg px-5", figure ? "py-3.5" : "py-3", className)}>
      {figure ? (
        <div className="shrink-0 pr-5 border-r border-pb-ink-border min-w-[150px]">
          <div className="text-[11.5px] text-pb-ink-fg-muted">{figure.label}</div>
          <div className="font-mono tnum text-[26px] leading-none mt-1 tracking-[-0.01em]">{figure.value}</div>
          {figure.sub && <div className="font-mono tnum text-[11.5px] text-pb-ink-fg-muted mt-1.5">{figure.sub}</div>}
        </div>
      ) : (
        <span className="text-[11.5px] text-pb-ink-fg-muted whitespace-nowrap shrink-0">{label}</span>
      )}
      <p className="flex-1 min-w-0 text-[14px] leading-[1.45] m-0">
        {figure && <span className="block text-[11.5px] text-pb-ink-fg-muted mb-0.5">{label}</span>}
        {children}
      </p>
      {actionLabel && (
        <span className="shrink-0 inline-flex items-center gap-1 text-[12.5px] font-medium text-pb-peach-300 underline-offset-2 whitespace-nowrap">
          {actionLabel}
          <ArrowRight className="size-3.5" strokeWidth={2} />
        </span>
      )}
    </div>
  );
}

/** A figure inside a VoiceBar sentence: mono, tabular. */
export function Fig({ children }: { children: ReactNode }) {
  return <span className="font-mono tnum">{children}</span>;
}

/** The delta span of a VoiceBar figure's sub line: green on navy when up, peach when down. */
export function VoiceDelta({ pct }: { pct: number }) {
  return (
    <span className={pct >= 0 ? "text-pb-score-top-dark" : "text-pb-peach-300"}>
      {pct >= 0 ? "+" : "−"}
      {Math.abs(pct).toFixed(1)}%
    </span>
  );
}
