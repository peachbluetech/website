import { cx } from "./cx";
import { PeachMark } from "./PeachMark";

/* AskPeachButton: the entry point to the agent. It always carries the
   mark, so the control reads as the agent and not as help.
     topbar  the outlined button in the top bar (36px, white, control
             hairline); with active it takes the peach tint it has on the
             agent page
     text    "Ask Peach" as a small peach link beside a row's own link
     button  the peach-tinted header action of the creative detail panel (32px)
     icon    dense tables: the mark alone, as the app shows it at rest */
export function AskPeachButton({
  variant = "text",
  label,
  active = false,
  className,
}: {
  variant?: "topbar" | "text" | "button" | "icon";
  /** Defaults to "Ask Peach". Not shown by the icon variant. */
  label?: string;
  /** topbar only: the state on the agent page. */
  active?: boolean;
  className?: string;
}) {
  const text = label ?? "Ask Peach";

  if (variant === "topbar") {
    return (
      <span
        className={cx(
          "inline-flex items-center gap-2 h-9 rounded-md border text-[13px] font-medium",
          "w-auto justify-center px-3",
          active ? "border-pb-peach-300 bg-pb-peach-50 text-pb-peach-700" : "border-pb-border-control bg-pb-card text-pb-fg",
          className,
        )}
      >
        <PeachMark size={14} className="shrink-0 text-pb-peach-500" />
        <span>{text}</span>
      </span>
    );
  }

  if (variant === "button") {
    return (
      <span
        className={cx(
          "inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[12.5px] font-medium border border-pb-peach-200 bg-pb-peach-50 text-pb-peach-700 shrink-0",
          className,
        )}
      >
        <PeachMark size={13} className="shrink-0" />
        {text}
      </span>
    );
  }

  if (variant === "icon") {
    return (
      <span
        className={cx("inline-flex items-center h-6 rounded-md px-1 text-[11.5px] font-medium text-pb-peach-600 shrink-0", className)}
      >
        <PeachMark size={13} className="shrink-0" />
      </span>
    );
  }

  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 text-[12px] font-medium whitespace-nowrap text-pb-peach-600 underline-offset-2 shrink-0",
        className,
      )}
    >
      <PeachMark size={12} className="shrink-0" />
      {text}
    </span>
  );
}
