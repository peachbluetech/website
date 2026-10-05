import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Card, cx } from "@/components/product/ui";
import { BRIEF, NAV } from "./data";

/* BrandIntelBrief: the centre column of the Brand Intel page. One white
   card that reads like a short consulting note: a peach eyebrow with the
   brief's date, one editorial headline, then up to four labelled sections
   (Sentiment, Trending themes, Competitive signals, Action items).

   Design width: 544 (the middle column of the 1,152px page). The card has
   40px of padding, so the text measure is 462px. Sans throughout: the
   headline is Inter 22px semibold, not the brand serif. The only peach is
   the eyebrow, the theme tags and the numbered action discs. */

const SECTION_LABEL = "text-[12.5px] text-pb-fg-muted font-medium";

function NavButton({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-left rounded-xl border border-pb-border bg-pb-card p-4 flex items-center justify-between">
      <div>
        <div className="text-[12.5px] text-pb-fg-muted font-medium mb-1">{label}</div>
        <div className="text-[13px] font-medium text-pb-fg">{value}</div>
      </div>
      <ChevronRight className="size-4 text-pb-fg-muted" />
    </div>
  );
}

export function BrandIntelBrief({
  sections = 4,
  themes,
  nav = false,
  className,
}: {
  /** Stop after this many sections below the headline, in the brief's order: 1 Sentiment, 2 Trending themes, 3 Competitive signals, 4 Action items. 0 leaves the eyebrow and headline alone. All four by default. */
  sections?: 0 | 1 | 2 | 3 | 4;
  /** Show only the first N theme sub-cards (there are 3). All by default. A value outside 1 to 3 is clamped, so the "Trending themes" label never stands over nothing. */
  themes?: 1 | 2 | 3;
  /** Add the two buttons that sit under the brief on the page ("Keyword analysis", "All mentions"). Off by default. */
  nav?: boolean;
  className?: string;
}) {
  const themeCount = Math.max(1, Math.min(BRIEF.themes.length, Math.floor(themes ?? BRIEF.themes.length) || 1));
  const shownThemes = BRIEF.themes.slice(0, themeCount);

  /* Each section is a label and a body. The last one shown drops its 32px
     bottom margin so the card closes on its own padding, as the full brief does. */
  const all: Array<(last: boolean) => ReactNode> = [
    (last) => (
      <>
        <div className={cx(SECTION_LABEL, "mb-2")}>Sentiment</div>
        <p className={cx("text-[15px] leading-[1.65] text-pb-fg-body", !last && "mb-8")}>{BRIEF.sentiment}</p>
      </>
    ),
    (last) => (
      <>
        <div className={cx(SECTION_LABEL, "mb-3")}>Trending themes</div>
        <div className={cx("space-y-3", !last && "mb-8")}>
          {shownThemes.map((t) => (
            <div key={t.tag} className="rounded-xl border border-pb-border bg-pb-muted/30 p-4">
              <div className="text-[12px] font-semibold text-pb-peach-600 mb-1">{t.tag}</div>
              <p className="text-[13px] leading-relaxed text-pb-fg/80 m-0">{t.body}</p>
            </div>
          ))}
        </div>
      </>
    ),
    (last) => (
      <>
        <div className={cx(SECTION_LABEL, "mb-3")}>Competitive signals</div>
        <ul className={cx("space-y-2 list-none p-0", !last && "mb-8")}>
          {BRIEF.competitive.map((c) => (
            <li key={c} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-pb-fg/80">
              <div className="mt-2 size-1.5 rounded-full bg-pb-info shrink-0" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </>
    ),
    () => (
      <>
        <div className={cx(SECTION_LABEL, "mb-3")}>Action items</div>
        <ol className="space-y-3 list-none p-0 m-0">
          {BRIEF.actions.map((a, i) => (
            <li key={a} className="flex gap-3 text-[14px] leading-relaxed text-pb-fg/90">
              <div className="size-5 rounded-full bg-pb-peach-500 text-white text-[11px] font-semibold font-mono tnum flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <span>{a}</span>
            </li>
          ))}
        </ol>
      </>
    ),
  ];
  const shown = all.slice(0, sections);

  return (
    <div className={cx("min-w-0", className)}>
      <Card className="p-10 relative overflow-hidden">
        <div className="text-[12.5px] text-pb-peach-600 font-medium mb-3">
          Intelligence Brief
          <span className="ml-2 text-pb-fg-muted/80">· {BRIEF.date}</span>
        </div>

        {/* A heading in the app; a div here. */}
        <div
          className={cx(
            "text-[22px] leading-[1.25] font-semibold tracking-[-0.01em] text-pb-fg",
            shown.length > 0 && "mb-5",
          )}
        >
          {BRIEF.headline}
        </div>

        {shown.length > 0 && (
          <div className="max-w-[640px]">
            {shown.map((render, i) => (
              <div key={i}>{render(i === shown.length - 1)}</div>
            ))}
          </div>
        )}
      </Card>

      {nav && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <NavButton label="Keyword analysis" value={NAV.summaries} />
          <NavButton label="All mentions" value={NAV.mentions} />
        </div>
      )}
    </div>
  );
}
