import type { ReactNode } from "react";
import { cx } from "./cx";

/* SectionHeader: a sans title over a hairline, optional mono meta and an
   action on the right. Structure is carried by the rule and the 32px of
   whitespace above it, not by a card. The app renders the title as a
   heading; here it is a div so the marketing page keeps its own outline.
   Design width: fluid. About 28px tall, plus the description line. */
export function SectionHeader({
  title,
  meta,
  description,
  action,
  className,
}: {
  title: ReactNode;
  /** Short factual context on the right, set in mono: counts, a range, an as-of date. */
  meta?: ReactNode;
  /** One muted sentence under the rule. */
  description?: ReactNode;
  /** A link or small control, right-aligned after meta. */
  action?: ReactNode;
  className?: string;
  /** Accepted for parity with the app and ignored: the title is always a div. */
  as?: "h2" | "h3";
}) {
  return (
    <div className={cx("mt-8 first:mt-0", className)}>
      <div className="flex items-baseline justify-between gap-4 pb-2 border-b border-pb-border">
        <div className="text-[14px] font-semibold leading-tight text-pb-fg truncate">{title}</div>
        {(meta || action) && (
          <div className="flex items-baseline gap-3 shrink-0">
            {meta && <span className="font-mono tnum text-[12px] text-pb-fg-muted">{meta}</span>}
            {action}
          </div>
        )}
      </div>
      {description && <p className="mt-2 text-[13px] leading-snug text-pb-fg-muted max-w-2xl">{description}</p>}
    </div>
  );
}
