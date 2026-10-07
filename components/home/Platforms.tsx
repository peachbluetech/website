import "./Platforms.css";
import { PLATFORMS_CALLOUT } from "./content";
import { MonoMark, PLATFORM_MARKS } from "./Marks";
import { PACING_CAPTION } from "@/components/product/reports";
import { FLIGHTS, money, type Flight } from "@/components/product/reports/data";
import { PaceChip, ProgressBar } from "@/components/product/reports/parts";
import { ArrowNE, Cell, Cells, Inner, Shot, T, TONE, TextLink, cx } from "@/components/site/parts";

/* Platforms (#platforms): the row that closes "For performance teams"
   and the target of the nav's Platforms link. Rendered by
   Performance.tsx inside its section; the rule above it is drawn there
   and the rule under it by Page.tsx.

   The same ruled split row as the weekly report, and a different thing
   in each half:
   - Left: one paragraph, not a heading, set as a row title over its
     line: the strong "Amazon DSP, included." at Inter
     24/32 in ink, weight 400, then the rest of the sentence at 16/24 in
     smoke. 32px under it the four integration links, two across on a
     44px pitch: each one anchor holding a 28px white tile with the
     platform's one colour mark in ink (the site holds one colour
     glyphs only), the label, and the small north-east arrow the page's
     other link rows end on, in smoke. Meta keeps both of its marks. All
     four carry the same arrow, so all four read as links.
   - Right: one white inner card with three rows of the product's DSP
     flight pacing, whole, and under it the published caption. */

/* ── The four integration links ─────────────────────────────────── */

/* The marks for link i are PLATFORM_MARKS[i].marks (the same four
   platforms in the same order). The anchor's text is the label alone:
   the marks and the arrow are decoration, and the Amazon tile's letter
   is generated content. The copy flags an arrow on Amazon DSP only; the
   page gives every link the same one. Under the pointer the label goes
   to smoke and the arrow to ink; the marks stay ink. */
function IntegrationLinks() {
  return (
    <ul className="el-platforms-links">
      {PLATFORMS_CALLOUT.links.map((link, i) => (
        <li key={link.href}>
          <TextLink href={link.href} className="el-body-sm el-platforms-link">
            <span aria-hidden="true" className="el-platforms-marks">
              {PLATFORM_MARKS[i].marks.map((mark) => (
                <span key={mark} className="el-platforms-tile">
                  <MonoMark mark={mark} size={16} />
                </span>
              ))}
            </span>
            <span className="el-platforms-name">{link.label}</span>
            <span className="el-platforms-go">
              <ArrowNE />
            </span>
          </TextLink>
        </li>
      ))}
    </ul>
  );
}

/* ── The pacing rows ────────────────────────────────────────────── */

/* The top of the pacing board's flight table (components/product/
   reports), read from FLIGHTS in the board's own order (furthest behind
   first): two behind, one on pace. The flights are the sample account's
   own streaming and online video buys, run by an agency through the DSP
   (reports/data.ts), which is what the caption under the card says.

   A row: the order (the supplier and its CTV or OLV tag) over its spend
   against budget on the left, and on the right the product's own pacing
   cell, PaceChip over ProgressBar (the fill, the hatched gap, the tick
   where delivery should be today), 150px wide. On a phone: the order
   across the row, the chip beside the spend, the bar across the row.
   Rows are divided by stone hairlines, which is stone's role. Nothing is
   scaled and no edge passes through the card. */
const SHOWN = FLIGHTS.slice(0, 3);
const STATUS: Record<string, string> = { under: "underpacing", over: "overpacing", on_pace: "on pace" };

const PACING_LABEL = `Amazon DSP flights for a sample account, run by an agency, each with its delivery against expected pace and its spend against budget: ${SHOWN.map((f) => `${f.label} (${f.channel}), ${STATUS[f.status] ?? f.status} at ${f.pace.toFixed(0)}%, ${money(f.spend)} of ${money(f.budget)}`).join("; ")}.`;

function FlightRow({ f }: { f: Flight }) {
  return (
    <li className="el-platforms-flight">
      <div className="el-platforms-order">
        <span className="el-caption el-500 el-ink">{f.label}</span>
        <span className="el-micro el-smoke">{f.channel}</span>
      </div>
      <div className="el-platforms-chip">
        <PaceChip status={f.status} pct={f.pace} />
      </div>
      <div className="el-platforms-spend el-caption el-tnum el-smoke">
        <span className="el-ink">{money(f.spend)}</span> of {money(f.budget)}
      </div>
      <div className="el-platforms-bar">
        <ProgressBar spendPct={f.spendPct} expectedPct={f.expectedPct} />
      </div>
    </li>
  );
}

export function Platforms() {
  return (
    <div id={PLATFORMS_CALLOUT.id} className="el-platforms">
      <Cells cols={2} ruled={false}>
        <Cell>
          {/* One paragraph: the lead in a strong, then the rest of the
              sentence. Not a heading. */}
          <p>
            <strong className={cx(T.titleLg, "el-platforms-lead")}>{PLATFORMS_CALLOUT.lead}</strong>{" "}
            <span className={cx(T.body, TONE.smoke, "el-pretty el-platforms-text")}>{PLATFORMS_CALLOUT.text}</span>
          </p>
          <IntegrationLinks />
        </Cell>

        <Cell pad="card">
          <Shot label={PACING_LABEL} ground={false}>
            <Inner className="el-platforms-card">
              <ul>
                {SHOWN.map((f) => (
                  <FlightRow key={f.id} f={f} />
                ))}
              </ul>
            </Inner>
          </Shot>
          {/* Published copy: wherever a pacing picture appears, it says so. */}
          <p className={cx(T.caption, TONE.smoke, "el-platforms-caption")}>{PACING_CAPTION}</p>
        </Cell>
      </Cells>
    </div>
  );
}
