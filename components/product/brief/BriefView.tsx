import type { ReactNode } from "react";
import { ClipboardList, Copy } from "lucide-react";
import { adFocus, adImage, cx } from "@/components/product/ui";
import { BRIEF, type RecipeItem, type ReferenceAd } from "./data";

/* The Next Creative Brief: the document the Intelligence page writes and
   shares at a public link. It renders bare (no rail, no top bar) and is
   the one product surface in the marketing register: a 34px serif title
   with one peach word, tracked capital section labels, 10px panels.
   Classes are the app's, with its viewport variants resolved to their
   desktop values (the recipe count is shown, the reference grid is four
   across). Pictures only: no headings, no buttons, no links.

   Where this differs from the app's brief, to pass the recreation rules:
   the peach word in the title is upright (slanted in the app), the
   capital labels are tracked 0.1em (0.14em and 0.16em in the app), the
   masthead square is flat peach (a gradient in the app), the panels cast
   no shadow, and the recipe's label column is 112px (110px in the app). */

/* The lift in a recipe line: rounded to a whole percent, signed. */
function liftLabel(item: RecipeItem): string {
  const n = Math.round(item.liftPct);
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n)}% ${item.metric}`;
}

/* The copy control, as an inert pill. */
function CopyPill({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border border-pb-border bg-pb-card px-3.5 h-8 text-[12.5px] font-medium text-pb-fg",
        className,
      )}
    >
      <Copy className="size-3.5" />
      {label}
    </span>
  );
}

/* A section label: tracked capitals under a hairline. first drops the
   hairline and the space above it, for a section shown on its own. */
function SectionLabel({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <div
      className={cx(
        "text-[11px] font-semibold uppercase tracking-[0.1em] text-pb-fg-muted mb-3",
        !first && "border-t border-pb-border pt-5 mt-10",
      )}
    >
      {children}
    </div>
  );
}

function RecipeLine({ item, tone }: { item: RecipeItem; tone: "good" | "bad" }) {
  return (
    <div className="flex items-baseline gap-3 py-2 border-b border-pb-border/60 last:border-b-0">
      {/* 110px in the app, where "EMOTIONAL TONE" (110.7px) breaks onto two lines; 112px holds it on one. */}
      <span className="text-[11px] uppercase tracking-[0.08em] text-pb-fg-muted w-[112px] shrink-0">{item.dimLabel}</span>
      <span className="text-[14px] font-medium text-pb-fg flex-1 min-w-0">{item.value}</span>
      <span className="font-mono tnum text-[11px] text-pb-fg-faint shrink-0 inline">{item.count} creatives</span>
      <span className={cx("font-mono tnum text-[12px] font-medium shrink-0", tone === "good" ? "text-pb-good" : "text-pb-bad")}>
        {liftLabel(item)}
      </span>
    </div>
  );
}

function RecipeLines({ items, tone }: { items: readonly RecipeItem[]; tone: "good" | "bad" }) {
  return (
    <div>
      {items.map((r) => (
        <RecipeLine key={`${r.dimLabel}:${r.value}`} item={r} tone={tone} />
      ))}
    </div>
  );
}

function PromptBox() {
  return (
    <div className="relative rounded-2xl border border-pb-border bg-pb-card">
      <pre className="p-5 pr-16 text-[12.5px] leading-[1.65] font-mono whitespace-pre-wrap text-pb-fg overflow-x-auto">
        {BRIEF.generationPrompt}
      </pre>
      <CopyPill label="Copy" className="absolute top-3 right-3" />
    </div>
  );
}

const PROMPT_HELPER = "Paste into your creative tool or hand to a freelancer. It carries the full recipe.";

/* RecipeLedger: the winning recipe on its own. A ledger of tag values,
   each with its cohort size and its lift in mono.
   Design width: 560. Natural height: 217 (five lines), 420 with avoid. */
export function RecipeLedger({
  avoid = false,
  className,
}: {
  /** Also show the "Avoid" lines under their own label. */
  avoid?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <SectionLabel first>The winning recipe</SectionLabel>
      <RecipeLines items={BRIEF.leanInto} tone="good" />
      {avoid && (
        <>
          <SectionLabel>Avoid</SectionLabel>
          <RecipeLines items={BRIEF.avoid} tone="bad" />
        </>
      )}
    </div>
  );
}

/* PromptBlock: the generation prompt on its own. A white mono block with
   the Copy pill in its corner; the brief ends in something executable.
   Design width: 560. Natural height: 576 with the label and helper line,
   517 for the box alone. The first prompt line is kept short so it never
   runs under the Copy pill. */
export function PromptBlock({
  label = true,
  className,
}: {
  /** Show the "Generation prompt" label and the helper sentence above the box. */
  label?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <>
          <SectionLabel first>Generation prompt</SectionLabel>
          <p className="text-[12.5px] text-pb-fg-muted mb-3">{PROMPT_HELPER}</p>
        </>
      )}
      <PromptBox />
    </div>
  );
}

/* The brief's sections in page order. stopAfter names the last one shown. */
const SECTIONS = ["summary", "recipe", "avoid", "concepts", "hooks", "newHooks", "rules", "references", "prompt"] as const;
export type BriefSection = (typeof SECTIONS)[number];

/* BriefView: the whole brief for Fizzli.
   Design width: 760 (a 712px column inside 24px gutters, the app's own
   width). It also sets at 560 for a narrow frame (a 512px column); past
   the rules, pass referenceColumns={2} there.
   Natural height at 760: 3333 complete. By stopAfter: summary 378,
   recipe 657, avoid 859, concepts 1609, hooks 1855, newHooks 2073,
   rules 2361, references 2706, prompt 3239 (the footer only shows on the
   complete brief).
   Natural height at 560: summary 425, recipe 704, avoid 906, concepts
   1762, hooks 2008, newHooks 2226, rules 2615; with two reference
   columns: references 3359, prompt 4016, complete 4110.
   bare takes 96 off every height (and the 48px of side gutter off the
   width the column needs). */
export function BriefView({
  stopAfter,
  referenceColumns = 4,
  referenceAds,
  bare = false,
  className,
}: {
  /** The last section to render. Omit for the complete brief with its footer. */
  stopAfter?: BriefSection;
  /** Reference ads per row. Four is the app's desktop grid; two is its narrow one, for a 560 frame, where four would cut the captions. */
  referenceColumns?: 2 | 4;
  /** The reference ads to show in place of the brief's own four (the account's top four by CTR). For a picture that features particular creatives; names and figures must still come from the sample account. */
  referenceAds?: readonly ReferenceAd[];
  /** Drop the page gutters (24px sides, 48px top and bottom) when a Tile supplies the padding. */
  bare?: boolean;
  className?: string;
}) {
  const b = BRIEF;
  const last = stopAfter ? SECTIONS.indexOf(stopAfter) : SECTIONS.length;
  const show = (section: BriefSection) => SECTIONS.indexOf(section) <= last;

  return (
    <div className={cx("bg-pb-bg", className)}>
      <div className={cx("mx-auto max-w-[760px]", !bare && "px-6 py-12")}>
        {/* Masthead */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-pb-peach-500">
              <ClipboardList className="size-3.5 text-white" strokeWidth={2} />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-pb-fg-muted">Creative brief</span>
          </div>
          <CopyPill label="Copy as Markdown" />
        </div>

        {/* tell-ok font-display: public brief title */}
        <div className="font-display text-[34px] leading-[1.12] tracking-[-0.01em] text-pb-fg">
          {b.clientLabel}: the next <span className="text-pb-peach-600">round</span>.
        </div>
        <p className="mt-3 text-[13px] text-pb-fg-muted">
          {b.evidenceNote} Generated {b.generatedDate}.
        </p>

        {/* Direction */}
        <p className="mt-8 text-[16px] leading-[1.7] text-pb-fg">{b.summary}</p>

        {show("recipe") && (
          <>
            <SectionLabel>The winning recipe</SectionLabel>
            <RecipeLines items={b.leanInto} tone="good" />
          </>
        )}

        {show("avoid") && (
          <>
            <SectionLabel>Avoid</SectionLabel>
            <RecipeLines items={b.avoid} tone="bad" />
          </>
        )}

        {show("concepts") && (
          <>
            <SectionLabel>Concepts to produce</SectionLabel>
            <div className="space-y-4">
              {b.concepts.map((c, i) => (
                <div key={c.title} className="rounded-2xl border border-pb-border bg-pb-card p-5">
                  <div className="flex items-baseline gap-3">
                    {/* tell-ok font-display: public brief concept number */}
                    <span className="font-display text-[20px] text-pb-peach-600">{i + 1}</span>
                    <div className="text-[15px] font-semibold text-pb-fg">{c.title}</div>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-pb-fg-muted">{c.description}</p>
                  <div className="mt-3 space-y-1 text-[13px]">
                    <div>
                      <span className="text-pb-fg-muted">Format: </span>
                      <span className="text-pb-fg">{c.format}</span>
                    </div>
                    <div>
                      <span className="text-pb-fg-muted">Hook: </span>
                      <span className="text-pb-fg">{`"${c.hook}"`}</span>
                    </div>
                    <div>
                      <span className="text-pb-fg-muted">Why: </span>
                      <span className="text-pb-fg">{c.why}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {show("hooks") && (
          <>
            <SectionLabel>Proven hooks, already working</SectionLabel>
            <ul className="space-y-1.5">
              {b.provenHooks.map((h) => (
                <li key={h.text} className="flex items-baseline gap-3 text-[14px]">
                  <span className="flex-1 text-pb-fg">{`"${h.text}"`}</span>
                  <span className="font-mono tnum text-[12px] text-pb-fg-muted shrink-0">{h.ctr}% CTR</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {show("newHooks") && (
          <>
            <SectionLabel>New hooks to test</SectionLabel>
            <ul className="space-y-1.5">
              {b.hooksToTest.map((h) => (
                <li key={h} className="text-[14px] text-pb-fg">{`"${h}"`}</li>
              ))}
            </ul>
          </>
        )}

        {show("rules") && (
          <>
            <SectionLabel>Rules</SectionLabel>
            <div className="space-y-1.5 text-[13.5px]">
              {b.dos.map((d) => (
                <div key={d} className="flex gap-2.5">
                  <span className="font-semibold text-pb-good shrink-0">Do</span>
                  <span className="text-pb-fg">{d}</span>
                </div>
              ))}
              {b.donts.map((d) => (
                <div key={d} className="flex gap-2.5">
                  <span className="font-semibold text-pb-bad shrink-0">Don&apos;t</span>
                  <span className="text-pb-fg">{d}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {show("references") && (
          <>
            <SectionLabel>Reference ads: your top performers</SectionLabel>
            <p className="text-[12.5px] text-pb-fg-muted mb-3">
              The recipe was derived from these. Match their energy, not their exact layout.
            </p>
            <div className={cx("grid gap-3", referenceColumns === 2 ? "grid-cols-2" : "grid-cols-4")}>
              {(referenceAds ?? b.referenceAds).map((r) => (
                <div key={r.key} className="rounded-xl border border-pb-border bg-pb-card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={adImage(r.image, "md")}
                    alt=""
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-square object-cover"
                    style={{ objectPosition: adFocus(r.image, "square") }}
                  />
                  <div className="p-2.5">
                    <div className="text-[11.5px] font-medium text-pb-fg truncate">{r.name}</div>
                    <div className="font-mono tnum text-[11px] text-pb-fg-muted mt-0.5">
                      {r.ctr}% CTR · {r.roas.toFixed(1)}x
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {show("prompt") && (
          <>
            <SectionLabel>Generation prompt</SectionLabel>
            <p className="text-[12.5px] text-pb-fg-muted mb-3">{PROMPT_HELPER}</p>
            <PromptBox />
          </>
        )}

        {/* Footer: only on the complete brief. */}
        {!stopAfter && (
          <div className="mt-14 pt-5 border-t border-pb-border flex items-center justify-between">
            <span className="text-[11.5px] text-pb-fg-muted">{b.title}</span>
            <span className="text-[11.5px] font-medium text-pb-peach-600">Made with Peachblue</span>
          </div>
        )}
      </div>
    </div>
  );
}
