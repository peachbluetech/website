import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "./cx";

/* Button: the app's button as an inert span. Three real variants: primary
   (flat peach, white text: the one primary action per view), outline
   (hairline on white: secondary) and ghost (text only). default, subtle
   and destructive exist for the places the app uses them. 6px radius.
   Heights: sm 32, default 36, lg 40. */
export type ButtonVariant = "primary" | "peach" | "outline" | "ghost" | "default" | "subtle" | "destructive";
export type ButtonSize = "default" | "sm" | "lg" | "icon" | "pill";

const BASE = "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium";

const PEACH = "bg-pb-peach-500 text-white";

const VARIANT: Record<ButtonVariant, string> = {
  primary: PEACH,
  peach: PEACH,
  outline: "border border-pb-border-control bg-pb-card text-pb-fg",
  ghost: "text-pb-fg",
  default: "bg-pb-fg text-pb-bg",
  subtle: "bg-pb-muted text-pb-fg",
  destructive: "bg-pb-bad text-white",
};

const SIZE: Record<ButtonSize, string> = {
  default: "h-9 rounded-md px-3.5 text-[13px]",
  sm: "h-8 rounded-md px-3 text-[12.5px]",
  lg: "h-10 rounded-md px-5 text-[14px]",
  icon: "h-9 w-9 rounded-md",
  pill: "h-9 rounded-full px-4 text-[13px]",
};

export function Button({
  variant = "default",
  size = "default",
  className,
  children,
}: {
  /** "primary" and "peach" are the same flat peach button; the app calls it peach. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Label, optionally with a lucide icon at size-4 or size-3.5. */
  children?: ReactNode;
}) {
  return <span className={cx(BASE, VARIANT[variant], SIZE[size], className)}>{children}</span>;
}

/* PeachLink: the peach text link with a trailing arrow that sits beside
   sections and at the foot of rows ("Review fatigue", "Bench report").
   12px medium, arrow 14px. Not a Button in the app either. */
export function PeachLink({
  children,
  arrow = true,
  className,
}: {
  children: ReactNode;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <span className={cx("inline-flex items-center gap-1 text-[12px] font-medium text-pb-peach-600", className)}>
      {children}
      {arrow && <ArrowRight className="size-3.5" strokeWidth={2.2} />}
    </span>
  );
}
