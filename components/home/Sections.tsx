import type { CSSProperties, ReactNode } from "react";
import { ESSAY, FINAL_CTA, HOW_IT_WORKS, MANIFESTO } from "./content";
import { ACT_LABEL, ANALYZE_LABEL, ActFigure, AnalyzeFigure, CONNECT_LABEL, ConnectFigure, LoopFigure, RECIPE_LABEL, RecipeFigure } from "./Figures";
import { FIGURE, FRAME, GUTTER, INSET, OutlineLink, PAPER, PanelMarks, PeachLink, RuleRow, SECTION_END, SectionMarker, Sheet, Stage, T, TextStage } from "./parts";

/* The sections of the page that are not feature rows: how it works, the
   essay, the manifesto and the close. */

/* ── How it works: three sibling stages ─────────────────────────── */

const FIGURES: { label: string; node: ReactNode }[] = [
  { label: CONNECT_LABEL, node: <ConnectFigure /> },
  { label: ANALYZE_LABEL, node: <AnalyzeFigure /> },
  { label: ACT_LABEL, node: <ActFigure /> },
];

/* How it works (#product): three stages, one per step, one frame, three
   different pieces of the sample account: the four platforms as cells,
   the winning ad over what was read from it, the week's worklist. The step's
   words sit under its stage, unchanged. The steps carry no visible
   numerals: the page has one numbering system, the section index. Three
   across from xl; from sm to xl each step is a row (stage, then words);
   on a phone they stack. The section follows the hero directly: its strip
   opens on the hero's own foot rule, so its marker draws none. */
export function HowItWorks() {
  return (
    <Sheet id={HOW_IT_WORKS.id} className={SECTION_END}>
      <SectionMarker n={1} rule={false}>
        <h2>{HOW_IT_WORKS.eyebrow}</h2>
      </SectionMarker>
      <ol className={`grid gap-x-6 gap-y-12 pt-12 xl:grid-cols-3 ${INSET}`}>
        {HOW_IT_WORKS.steps.map((step, i) => (
          <li key={step.num} className="sm:max-xl:grid sm:max-xl:grid-cols-[minmax(0,392px)_minmax(0,1fr)] sm:max-xl:items-center sm:max-xl:gap-x-12">
            <Stage label={FIGURES[i].label}>{FIGURES[i].node}</Stage>
            <div>
              <span className="sr-only">{step.num}</span>
              <h3 className={`mt-6 sm:max-xl:mt-0 ${T.h3} ${PAPER.ink}`}>{step.title}</h3>
              <p className={`mt-2 text-pretty ${T.body} ${PAPER.body}`}>{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </Sheet>
  );
}

/* ── The navy panel ─────────────────────────────────────────────── */

/* The page has one: the essay's. It sits under its section's strip, 16px
   inside the frame's rules and 16px under the strip, with 4px corners
   and a plus mark 16px in from each corner; its content starts on the
   page's own column. On a phone it fills the frame's cell, square, so
   its text keeps the page's column. */
function NavyPanel({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`relative bg-[var(--mn-navy)] px-4 sm:mx-4 sm:mt-4 sm:rounded-[4px] lg:px-8 ${className}`}>
      <PanelMarks />
      {children}
    </div>
  );
}

/* ── Essay ──────────────────────────────────────────────────────── */

/* Why Peachblue exists: the page's long statement, on the page's one
   navy panel. The statement, the turn of the argument, a rule and the two
   paragraphs in one column on the left; the loop on the right, centred on
   the height of the column from lg. Under lg the loop sits between the
   statement and the paragraphs. */
export function Essay() {
  const [open, turn, close] = ESSAY.paragraphs;
  const on = "text-[color:var(--mn-on-navy)]";
  return (
    <Sheet className={SECTION_END}>
      <SectionMarker n={4}>
        <p>{ESSAY.eyebrow}</p>
      </SectionMarker>
      <NavyPanel className="py-16">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12 lg:gap-y-0">
          <div className="lg:col-span-6 xl:col-span-7">
            <h2 className={`text-balance ${T.statement} ${on}`}>{ESSAY.headline}</h2>
            <p className={`mt-6 text-balance ${T.h3} text-[color:var(--mn-on-navy-label)]`}>{turn}</p>
          </div>
          <div className="flex justify-center lg:col-span-6 lg:row-span-2 lg:self-center xl:col-span-5">
            <LoopFigure size={260} className="md:hidden" />
            <LoopFigure size={300} className="max-md:hidden xl:hidden" />
            <LoopFigure size={356} className="max-xl:hidden" />
          </div>
          <div className="border-t border-[color:var(--mn-on-navy-rule)] pt-8 lg:col-span-6 lg:mt-8 xl:col-span-7">
            <div className={`max-w-[34em] space-y-4 ${T.body} text-[color:var(--mn-on-navy-body)]`}>
              <p className="text-pretty">{open}</p>
              <p className="text-pretty">{close}</p>
            </div>
          </div>
        </div>
      </NavyPanel>
    </Sheet>
  );
}

/* ── Manifesto: the statement after the features ────────────────── */

const SHARE = /(\d+%)/.exec(MANIFESTO.source)?.[1] ?? "56%";
/* The same figure as a length: how much of the bar is filled. */
const SHARE_OF_100 = Math.min(100, Math.max(0, parseFloat(SHARE)));
const SPLIT = { gridTemplateColumns: `minmax(0,${SHARE_OF_100}fr) minmax(0,${100 - SHARE_OF_100}fr)` };
/* The label style on a 16px line, for the one label that takes two lines
   on a phone. */
const BAR_LABEL = T.label.replace("leading-none", "leading-[16px]");

/* The page's widest line of type, on paper: the two sentences at statement size, each on one line across
   the whole column from xl, the second in the accent. Under them one
   ruled row: the source's figure in a cell at 40px, then the source
   sentence, which from xl runs the length of the row. The row stands on a bar instead of a second rule: 8px, flat,
   square, as long as the row, filled in peach for the source's share of
   its length (the figure read from the sentence) and navy at the rule's
   15% for the rest. Under the bar two labels in the label style, each
   starting where its part of the bar starts, in words from the source
   sentence only: the filled part's in the eyebrow's peach, the rest's
   muted. No figure is printed for the rest: the copy gives none. The bar
   and its labels are decoration: the sentence beside the figure says
   all of it. A statement, not a section: it has
   no index and no strip, only the rule it starts under. A paragraph, not
   a heading, as on the live page. */
export function Manifesto() {
  return (
    <Sheet className={SECTION_END}>
      <RuleRow />
      <div className={`pt-16 md:pt-24 ${INSET}`}>
        <p className={`max-xl:text-balance ${T.statement} ${PAPER.ink}`}>
          <span className="xl:block xl:whitespace-nowrap">{MANIFESTO.lines[0]}</span>{" "}
          <span className={`xl:block xl:whitespace-nowrap ${PAPER.accentLg}`}>{MANIFESTO.lines[1]}</span>
        </p>
        <div className="mt-12 md:mt-16">
          <div className={`grid border-t md:grid-cols-[max-content_minmax(0,1fr)] ${PAPER.rule}`}>
            <p aria-hidden="true" className={`flex items-center pt-6 md:h-24 md:pr-12 md:pt-0 ${FIGURE} text-[40px] leading-none ${PAPER.ink}`}>
              {SHARE}
            </p>
            <p className={`flex items-center py-6 text-pretty md:h-24 md:border-l md:py-0 md:pl-12 ${T.body} ${PAPER.rule} ${PAPER.body}`}>
              <span className="max-w-[40em] xl:max-w-none">{MANIFESTO.source}</span>
            </p>
          </div>
          <div aria-hidden="true">
            <div className="grid h-2 bg-[var(--mn-paper-rule)]" style={SPLIT}>
              <span className="bg-[var(--mn-peach)]" />
            </div>
            <p className={`grid pt-3 ${BAR_LABEL}`} style={SPLIT}>
              <span className={`pr-4 ${PAPER.accent}`}>Creative</span>
              <span className={PAPER.muted}>Bid, targeting, placement</span>
            </p>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

/* ── Closing: the recipe for the next winner ────────────────────── */

/* Closing (#demo). On paper, flat. The copy on the left: the headline
   at Statement with its second line in the accent, the subhead, the
   peach button and the outlined one, the risk line. On the right one
   pale stage (paper-2, a hairline, 4px) holding the brief's winning
   recipe on a white mat: the page's promise, shown as the product prints
   it. The ledger is at its own size, all five lines whole, and the mat
   runs on to the stage's foot under its last line. From sm to xl the
   stage follows the copy; on a phone the close is its copy alone. The
   frame's two rules run on to the footer's top rule. */
export function FinalCta() {
  return (
    <section id={FINAL_CTA.id} className={`relative z-[1] bg-[var(--mn-paper)] ${GUTTER}`}>
      <div className={`${FRAME} relative border-x ${PAPER.rule} ${SECTION_END}`}>
        <SectionMarker n={9}>
          <p>{FINAL_CTA.eyebrow}</p>
        </SectionMarker>
        <div className={`grid items-start gap-x-16 gap-y-12 pt-12 xl:grid-cols-12 ${INSET}`}>
          <div className="xl:col-span-6">
            <h2 className={`${T.statement} ${PAPER.ink}`}>
              {FINAL_CTA.headlineLines[0]}
              <br />
              <span className={PAPER.accentLg}>{FINAL_CTA.headlineLines[1]}</span>
            </h2>
            <p className={`mt-6 max-w-[480px] text-pretty ${T.bodyLg} ${PAPER.body}`}>{FINAL_CTA.subhead}</p>
            {/* 8px between the buttons on a phone, so the two stay on one line at 390. */}
            <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
              <PeachLink href={FINAL_CTA.primaryCta.href} arrow={FINAL_CTA.primaryCta.arrow} className="max-sm:px-4">
                {FINAL_CTA.primaryCta.label}
              </PeachLink>
              <OutlineLink href={FINAL_CTA.secondaryCta.href} arrow={FINAL_CTA.secondaryCta.arrow} className="max-sm:px-4">
                {FINAL_CTA.secondaryCta.label}
              </OutlineLink>
            </div>
            <p className={`mt-4 font-mono text-[12px] leading-[16px] ${PAPER.muted}`}>{FINAL_CTA.riskReversal}</p>
          </div>
          <div className="max-w-[576px] max-sm:hidden xl:col-span-6">
            <RecipeStage />
          </div>
        </div>
      </div>
    </section>
  );
}

/* The close's stage: the page's stage for a fragment that is all type
   (TextStage in parts.tsx: paper-2, a hairline, 4px, a white mat with a
   hairline outline and 4px top corners, set in by one margin: 32px from
   1440, 24px under it) at a height of its own, 316px from 1440 and 292px
   under it. The ledger is all type, so it is not scaled and no edge
   passes through it: the mat's foot is the stage's. */
function RecipeStage() {
  return (
    <TextStage label={RECIPE_LABEL} className="h-[292px] min-[90rem]:h-[316px]">
      <RecipeFigure />
    </TextStage>
  );
}

/* The shared footer, on the paper ground. It is not edited: its colours
   are the site's tokens, restated here from the theme for its subtree
   only, and its two wrappers are given the page's gutter and, from xl,
   the frame's inset, so its content starts on the frame's inset column
   there. From xl to 1440 the inset leaves its five equal columns too
   narrow for the longest links, so it keeps the grid it uses under xl
   (the link columns at their own width, the brand column the rest).
   Under xl it keeps the frame's gutter alone, so the brand column has
   room. */
export function FooterGround({ children }: { children: ReactNode }) {
  return (
    <div
      className="[&>footer]:px-[33px] sm:[&>footer]:px-[65px] xl:[&>footer]:px-[113px] [&>footer>div]:max-w-[1214px] xl:max-[1439px]:[&>footer>div>div:first-child]:grid-cols-[minmax(0,1fr)_repeat(4,max-content)] xl:max-[1439px]:[&>footer>div>div:first-child]:gap-x-12"
      style={
        {
          "--color-pb-bg": "var(--mn-field)",
          "--color-pb-fg": "var(--mn-ink)",
          "--color-pb-fg-secondary": "var(--mn-body)",
          "--color-pb-fg-muted": "var(--mn-muted)",
          "--color-pb-border": "var(--mn-rule)",
          "--color-pb-peach-700": "var(--mn-accent)",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
