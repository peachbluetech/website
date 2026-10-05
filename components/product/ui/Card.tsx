import type { CSSProperties, ReactNode } from "react";
import { cx } from "./cx";

/* Card: a panel for an object (a creative, a row group), never for a
   section. 8px radius, one hairline, white ground, no shadow. A caller's
   border or padding class replaces the base one, as in the app. */
type BoxProps = { className?: string; style?: CSSProperties; children?: ReactNode };

export function Card({ className, style, children }: BoxProps) {
  return (
    <div className={cx("rounded-lg border border-pb-border bg-pb-card text-pb-fg", className)} style={style}>
      {children}
    </div>
  );
}

export function CardHeader({ className, style, children }: BoxProps) {
  return (
    <div className={cx("flex flex-col gap-1 p-4", className)} style={style}>
      {children}
    </div>
  );
}

/** A heading in the app; a div here. */
export function CardTitle({ className, style, children }: BoxProps) {
  return (
    <div className={cx("text-[14px] font-semibold leading-tight tracking-[-0.01em]", className)} style={style}>
      {children}
    </div>
  );
}

export function CardDescription({ className, style, children }: BoxProps) {
  return (
    <p className={cx("text-[13px] text-pb-fg-muted", className)} style={style}>
      {children}
    </p>
  );
}

export function CardContent({ className, style, children }: BoxProps) {
  return (
    <div className={cx("p-4 pt-0", className)} style={style}>
      {children}
    </div>
  );
}
