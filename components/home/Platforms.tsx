import Link from "next/link";
import { PLATFORMS_CALLOUT } from "./content";
import { PACING_CAPTION } from "@/components/product/reports";
import { FLIGHTS, money, type Flight } from "@/components/product/reports/data";
import { PaceChip, ProgressBar } from "@/components/product/reports/parts";
import { MarkGroup, PLATFORM_MARKS } from "./Marks";
import { FOCUS_IN, INSET, MONO_FIG, PAPER, T, TextStage } from "./parts";

/* Platforms (#platforms): the block that closes "For performance teams"
   and the target of the nav's Platforms link.

   Not a feature row and not a logo wall: a statement, four ruled links
   and three rows of the product's DSP pacing. On the feature rows' own
   grid, text on the left (five columns) and the figure on the right
   (seven), so the group's three rows read right, left, right. No
   eyebrow, no strip, no rule. The picture stays because its caption
   ("Agency view, sample data") is published copy, and it captions
   nothing without a pacing picture.

   The contract with Performance.tsx, which renders this inside the
   group's Sheet, under the weekly report row, inside a wrapper that
   brings the air between two rows (ROW_GAP in ./parts): the root carries
   the id, the page's INSET and `pt-12` (what a FeatureRow brings), and
   no bottom spacing. No scroll margin: the site's 80px scroll padding
   lands it, as it lands every section. */

/* ── The four integration links ─────────────────────────────────── */

/* Ruled cells, two by two (the Connect tile's form): a top rule, each
   cell 56px with a bottom rule, one vertical rule between the two
   columns. A cell is one anchor: the platform's
   navy marks at 20px, then its label. The marks for link i are
   PLATFORM_MARKS[i].marks (the same four platforms in the same order;
   Meta shows both of its marks). The anchor's text is the label alone;
   the one arrow the data asks for (Amazon DSP) is inside its anchor.
   Under the pointer the label takes the accent and the marks stay navy.
   The two columns are equal wherever both fit; where the column is too
   narrow for that (1024 to about 1060, and a phone under about 340) the
   second is as wide as "Amazon DSP" and its arrow and the first takes
   the rest, so no label runs past the rule. */
function IntegrationLinks() {
  return (
    <ul className={`mt-8 grid grid-cols-[repeat(2,minmax(max-content,1fr))] border-t ${PAPER.rule}`}>
      {PLATFORMS_CALLOUT.links.map((link, i) => (
        <li key={link.href} className={`border-b ${i % 2 === 0 ? "border-r" : ""} ${PAPER.rule}`}>
          <Link href={link.href} className={`group flex h-14 items-center gap-3 ${i % 2 === 0 ? "pr-4" : "pl-4"} ${PAPER.ink} ${FOCUS_IN}`}>
            <MarkGroup marks={PLATFORM_MARKS[i].marks} />
            <span className="whitespace-nowrap text-[14px] font-semibold leading-[20px] transition-colors duration-150 group-hover:text-[color:var(--mn-paper-accent)]">
              {link.label}
              {link.arrow && (
                <>
                  {" "}
                  <span aria-hidden="true">&rarr;</span>
                </>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ── The pacing rows ────────────────────────────────────────────── */

/* The top of the pacing board's flight table (components/product/
   reports), drawn in the page's line the way Figures.tsx draws the Act
   tile's worklist: ruled rows, read from FLIGHTS in the board's own
   order (furthest behind first), so it follows the sample flights. The
   flights are Fizzli's own streaming and online video buys, run by an
   agency through the DSP (reports/data.ts), which is what the caption
   under the stage says.

   A row, from sm: the order (the supplier, then its CTV or OLV tag in
   muted mono caps, and under it the flight's own second line, "Fall
   2026 · Fizzli"); the product's own pacing cell (PaceChip over
   ProgressBar: the fill, the hatched gap, the tick where delivery should
   be today), 168px wide as the board's is at its narrowest; and spend
   against budget, the figures in MONO_FIG with "of" in Inter 13px.
   61px a row, the board's own. On a phone the pacing cell's two parts
   take two lines under the supplier, the chip beside the spend and the
   bar across the row, and the second line is left out.

   No total, no sentence and no display figure: the board's VoiceBar
   ($118,214 of $189.0k, and the sentence that names the flight furthest
   behind) is a navy ground of a third kind and a fourth big number in
   the group. Three rows, so the stage is one glance: two behind, one on
   pace. */
const SHOWN = FLIGHTS.slice(0, 3);
const STATUS: Record<string, string> = { under: "underpacing", over: "overpacing", on_pace: "on pace" };

const PACING_LABEL = `Amazon DSP flights for a sample account, run by an agency, each with its delivery against expected pace and its spend against budget: ${SHOWN.map((f) => `${f.label} (${f.channel}), ${STATUS[f.status] ?? f.status} at ${f.pace.toFixed(0)}%, ${money(f.spend)} of ${money(f.budget)}`).join("; ")}.`;

const INK = PAPER.ink;
const MUTED = PAPER.muted;

/* Three layouts, chosen by the mat's inside width (a container query),
   so every name, chip and figure is whole and nothing is scaled:
   - WIDE, 528px and more (from about 1262, and about 708 to 1023): one
     line in the board's own columns: the order and its second line, the
     pacing cell (168px), the spend. 16px over and under, 70px a row.
   - MID, 340 to 528 (1024 to about 1262, and from a phone's width to
     about 708): two columns, the order over the spend on the left, the
     chip over the bar on the right (150px). 12px over and under, 71px a
     row, so three rows fit the stage beside the column at 1024.
   - PHONE, under 340 (under about 432): the order across the row; the
     chip and the spend on the next line; the bar across the third.
   The order's second line is shown in WIDE only. The container queries
   are written out in full in the classes (the stylesheet is built from
   the source's text): @min-[21.25rem] is MID, @min-[33rem] is WIDE. */

function FlightRow({ f }: { f: Flight }) {
  return (
    <li
      className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 border-b px-3 py-2.5 @min-[21.25rem]:grid-cols-[minmax(0,1fr)_150px] @min-[21.25rem]:gap-x-6 @min-[21.25rem]:px-6 @min-[21.25rem]:py-3 @min-[33rem]:grid-cols-[minmax(0,1fr)_168px_auto] @min-[33rem]:py-4 ${PAPER.rule}`}
    >
      <div className={`col-span-2 row-start-1 min-w-0 @min-[21.25rem]:col-span-1`}>
        <div className={`whitespace-nowrap text-[13px] font-medium leading-[20px] ${INK}`}>
          {f.label}
          <span className={`ml-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${MUTED}`}>{f.channel}</span>
        </div>
        <div className={`hidden whitespace-nowrap text-[11px] leading-[16px] @min-[33rem]:block ${MUTED}`}>{f.sub}</div>
      </div>
      {/* The pacing cell. In WIDE it is one column (the chip over the
          bar, as on the board); otherwise its two parts are placed in the
          row's own grid. */}
      <div className={`contents @min-[33rem]:col-start-2 @min-[33rem]:row-start-1 @min-[33rem]:flex @min-[33rem]:flex-col @min-[33rem]:gap-1.5`}>
        <div className={`col-start-1 row-start-2 @min-[21.25rem]:col-start-2 @min-[21.25rem]:row-start-1`}>
          <PaceChip status={f.status} pct={f.pace} />
        </div>
        <div className={`col-span-2 row-start-3 @min-[21.25rem]:col-span-1 @min-[21.25rem]:col-start-2 @min-[21.25rem]:row-start-2`}>
          <ProgressBar spendPct={f.spendPct} expectedPct={f.expectedPct} />
        </div>
      </div>
      <div
        className={`col-start-2 row-start-2 whitespace-nowrap text-right text-[13px] leading-[16px] @min-[21.25rem]:col-start-1 @min-[21.25rem]:text-left @min-[33rem]:col-start-3 @min-[33rem]:row-start-1 @min-[33rem]:text-right ${MUTED}`}
      >
        <span className={`${MONO_FIG} ${INK}`}>{money(f.spend)}</span> of <span className={MONO_FIG}>{money(f.budget)}</span>
      </div>
    </li>
  );
}

/* Under lg the stage is as tall as what it holds, and the mat keeps 24px
   of white under the third row's rule. */
function PacingFigure() {
  return (
    <div className="@container">
      <ul className="max-lg:pb-6">
        {SHOWN.map((f) => (
          <FlightRow key={f.id} f={f} />
        ))}
      </ul>
    </div>
  );
}

/* The stage: the page's stage for a fragment that is not scaled
   (TextStage in parts.tsx, the close's frame). No edge passes through
   the rows: the mat ends in the white under the third row's rule, and
   the mat's foot is the stage's. Under lg that white is 24px. From lg
   the stage takes what is left of the row's height over its caption, so
   the caption ends level with the links' last rule, and the mat runs on
   in white to the stage's foot as the close's does. */
function PacingStage() {
  return (
    <TextStage label={PACING_LABEL} className="lg:flex-1">
      <PacingFigure />
    </TextStage>
  );
}

export function Platforms() {
  return (
    <div id={PLATFORMS_CALLOUT.id} className={`grid grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-12 pt-12 lg:grid-cols-12 ${INSET}`}>
      <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
        {/* One paragraph, as on the live page: the lead in a strong, then
            the rest of the sentence. Not a heading. Beside the stage the
            lead is raised by the space over its capitals, so their tops
            stand on the stage's top edge, as an eyebrow's do on a band's. */}
        <p>
          <strong className={`block text-balance lg:-mt-[0.18em] ${T.h2} ${PAPER.ink}`}>{PLATFORMS_CALLOUT.lead}</strong>{" "}
          <span className={`mt-4 block max-w-[30em] text-pretty ${T.body} ${PAPER.body}`}>{PLATFORMS_CALLOUT.text}</span>
        </p>
        <IntegrationLinks />
      </div>
      <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:flex lg:flex-col">
        <PacingStage />
        {/* Published copy: wherever a pacing picture appears, it says so. */}
        <p className={`mt-3 flex items-center gap-2 ${T.label} ${PAPER.muted}`}>
          <span aria-hidden="true" className="size-1.5 shrink-0 bg-[var(--mn-peach)]" />
          {PACING_CAPTION}
        </p>
      </div>
    </div>
  );
}
