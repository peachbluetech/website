import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "./cx";

/* Collapsible: the disclosure row of the creative detail panel. A white
   hairline row with a chevron, a title and an optional muted summary; the
   body follows when open. Static: pick a state. Row is about 40px tall. */
export function Collapsible({
  title,
  summary,
  open = false,
  children,
  className,
}: {
  title: string;
  summary?: ReactNode;
  /** Render the open state: chevron turned, body shown. */
  open?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mb-4", className)}>
      <div className="w-full flex items-center gap-2 rounded-xl border border-pb-border bg-pb-card px-3 py-2.5 text-[12.5px]">
        <ChevronRight className={cx("size-3.5 shrink-0 text-pb-fg-muted", open && "rotate-90")} strokeWidth={2} />
        <span className="shrink-0 font-medium text-pb-fg">{title}</span>
        {summary != null && (
          <>
            <span className="shrink-0 text-pb-fg-muted/40">·</span>
            <span className="min-w-0 truncate text-pb-fg-muted text-left">{summary}</span>
          </>
        )}
      </div>
      {open && children != null && <div className="mt-2">{children}</div>}
    </div>
  );
}
