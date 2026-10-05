import type { ReactNode } from "react";
import { cx } from "./cx";

/* SegmentedToggle: the two-to-four-way toggle (Library "By Ad / By
   Creative", Reports "Report / Pacing"). A white box with a control
   hairline and 2px inner padding; the active segment is the dark inverted
   pill at 4px radius. Static: exactly one segment is active. 34px tall
   (30px at size sm), hairline and padding included. */
export type SegmentedOption = string | { value: string; label: ReactNode };

export function SegmentedToggle({
  options,
  value,
  size = "md",
  className,
}: {
  options: SegmentedOption[];
  /** The active option's value (for a string option, the string itself). */
  value: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div className={cx("inline-flex items-center rounded-md border border-pb-border-control bg-pb-card p-0.5", className)}>
      {options.map((opt) => {
        const v = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        const active = v === value;
        return (
          <span
            key={v}
            className={cx(
              "inline-flex items-center rounded-[4px] font-medium whitespace-nowrap",
              size === "sm" ? "h-6 px-2.5 text-[11.5px]" : "h-7 px-3 text-[12.5px]",
              active ? "bg-pb-fg text-pb-bg" : "text-pb-fg-secondary",
            )}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

/* RangeToggle: the chart range control on Today (7d / 14d / 30d / 90d).
   Hand-written in the app, not the SegmentedToggle: mono 11.5px, segments
   flush inside one hairline box, active segment solid near-black. 26px tall. */
export function RangeToggle({
  options = ["7d", "14d", "30d", "90d"],
  value,
  className,
}: {
  options?: string[];
  value: string;
  className?: string;
}) {
  return (
    <div className={cx("inline-flex rounded-md border border-pb-border-control overflow-hidden font-mono text-[11.5px]", className)}>
      {options.map((opt) => (
        <span
          key={opt}
          className={cx("inline-flex items-center px-2.5 h-6", opt === value ? "bg-pb-fg text-pb-bg" : "text-pb-fg-muted")}
        >
          {opt}
        </span>
      ))}
    </div>
  );
}
