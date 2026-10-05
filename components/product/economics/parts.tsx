import type { ReactNode } from "react";
import { AdThumb, cx } from "@/components/product/ui";

/* Pieces the Economics page defines for itself in the app: its own section
   header and its own row thumbnail. Not exported from the area index. */

// ---------------------------------------------------------------- section

export type SectionTone = "good" | "warn" | "bad" | "neutral";

const STATUS_DOT: Record<SectionTone, string> = {
  good: "bg-pb-good",
  warn: "bg-pb-warn",
  bad: "bg-pb-bad",
  neutral: "bg-pb-fg-ghost",
};

/* EconSection: the Economics page's own section header. A sans title over
   a hairline with a status word and dot on the right, then one takeaway
   sentence. The app renders the title as a heading; here it is a div.
   Design width: fluid. 29px tall; a takeaway adds 8px and 21px a line. */
export function EconSection({
  title,
  status,
  takeaway,
}: {
  title: string;
  status?: { label: string; tone: SectionTone };
  /** One sentence. Wrap figures in <Fig>. */
  takeaway?: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 pb-2 border-b border-pb-border">
        <div className="text-[14px] font-semibold leading-tight text-pb-fg">{title}</div>
        {status && (
          <span className="inline-flex items-center gap-1.5 text-[12px] text-pb-fg-secondary shrink-0 font-mono tnum">
            <span className={cx("size-1.5 rounded-full", STATUS_DOT[status.tone])} />
            {status.label}
          </span>
        )}
      </div>
      {takeaway && <p className="mt-2 text-[13px] leading-relaxed text-pb-fg-muted max-w-2xl m-0">{takeaway}</p>}
    </div>
  );
}

// ------------------------------------------------------------------ thumb

/* RowThumb: the 40px row thumbnail. With no image it is the app's own
   fallback, a muted tile with the first two letters of the name. */
export function RowThumb({ image, name }: { image: string | null; name: string }) {
  if (image) return <AdThumb imageUrl={image} size="sm" className="rounded-lg size-10 shrink-0 border border-pb-border" />;
  return (
    <div className="size-10 rounded-lg shrink-0 bg-pb-muted flex items-center justify-center text-[11px] font-semibold text-pb-fg-muted">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}
