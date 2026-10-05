import type { ReactNode } from "react";
import { cx } from "./cx";

/* Badge: two shapes only. Marks are outlined text (default, outline,
   peach, meta). Status is a coloured 6px dot plus muted text (info, good,
   warn, bad). No tinted fills, no uppercase, no letter-spacing. 18px tall. */
export type BadgeVariant = "default" | "outline" | "peach" | "meta" | "info" | "good" | "warn" | "bad";

const BASE = "inline-flex items-center gap-1.5 rounded-[4px] text-[11px] font-medium leading-none h-[18px] px-1.5 whitespace-nowrap";

const STATUS = "px-0 text-pb-fg-secondary before:size-1.5 before:rounded-full before:content-['']";

const VARIANT: Record<BadgeVariant, string> = {
  default: "ring-1 ring-inset ring-pb-border-control text-pb-fg",
  outline: "ring-1 ring-inset ring-pb-border-control text-pb-fg-muted",
  peach: "ring-1 ring-inset ring-pb-peach-300 text-pb-peach-700",
  meta: "ring-1 ring-inset ring-pb-border-control text-pb-fg-muted",
  info: `${STATUS} before:bg-pb-info`,
  good: `${STATUS} before:bg-pb-good`,
  warn: `${STATUS} before:bg-pb-warn`,
  bad: `${STATUS} before:bg-pb-bad`,
};

export function Badge({
  variant = "default",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children?: ReactNode;
}) {
  return <span className={cx(BASE, VARIANT[variant], className)}>{children}</span>;
}
