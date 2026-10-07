import type { ReactNode } from "react";
import { HERO_CREATIVE } from "@/components/product/sample";
import { PULSE_EVENTS, type PulseEvent } from "@/components/product/today/data";
import { AdThumb, formatCurrency } from "@/components/product/ui";
import { HOW_IT_WORKS, PLATFORMS_CALLOUT } from "./content";
import { tagValue } from "./tags";
import { MonoMark, PLATFORM_MARKS } from "./Marks";
import { Block, Cell, Cells, Fit, Inner, MEDIUM, Rule, Shot, T, TONE, Tile, cx } from "@/components/site/parts";
import "./HowItWorks.css";

/* How it works (#product): a
   header cell (the h2 alone, 160px under the section's rule), a rule
   with marks at the thirds, then three ruled cells, one per step.

   In a cell, top to bottom: the step's number as an eyebrow, 24px, the
   picture slot (one height for all three, so the three titles share a
   line), 32px, the h3, the paragraph.

   The three pictures. Each is one white inner card, whole, at the
   top left of its slot and as wide as the cell's text: a small true
   piece of the sample account, read from the product's own data. None
   has the form of a control: no pill, no bubble, no verb, no arrow.
   Lines inside a card are stone hairlines.
     01 Connect: the four platforms as a two by two grid, each cell a
        platform's one-colour mark in ink and its name.
     02 Analyze: the winning ad's 16:9 cut beside what was read from it:
        hook, tone, format, CTA, the product's own tag values.
     03 Act: two findings of the week (the new winner, the first fatigue
        flag), each with its ad, its title, its platform and its dollars.

   Each card is laid out at its slot's width and holds its height
   (CARD_H): at 1440 and on a phone it is painted at exactly its own
   size. Where the slot is narrower than CARD_W (the three cells side by
   side under 1440: 287px of text at 1280, 218 at 1024) the card's
   content is laid out at CARD_W and painted at the slot's width, so
   nothing in it reflows. The inner card itself is never scaled: only
   what it holds.

   Three sizes, each measured on the page: the ad's 16:9 cut is 112 by
   63 (the four lines beside it need 131 of the card's 262px); a
   finding's title has a line of its own, whole, with its platform and
   its dollars under it (on one line with its dollars the winner's name
   would be cut short); and the title stands 18px over its paragraph,
   the system's distance from a step title to its paragraph in a ruled
   cell.

   Page.tsx draws the rule above this section and the rule under it. */

/* The card's content: laid out no narrower than this, and this tall. */
const CARD_W = 294;
const CARD_H = 136;

/* ── 01 Connect ─────────────────────────────────────────────────── */

/* The four platforms in the order the copy names them, each with the
   name its link carries further down the page and the first of its
   marks (Meta has two; the platform links show both). */
const HUB = PLATFORMS_CALLOUT.links.map((link, i) => ({ name: link.label, mark: PLATFORM_MARKS[i].marks[0] }));

const CONNECT_LABEL = `The four platforms a sample account can connect to Peachblue: ${HUB.map((p) => p.name).join(", ")}.`;

function Connect() {
  return (
    <div className="el-how-hub">
      {HUB.map((p) => (
        <div key={p.name} className="el-how-hub-cell">
          <MonoMark mark={p.mark} size={20} />
          <span className={cx("el-caption", MEDIUM, "el-how-line")}>{p.name}</span>
        </div>
      ))}
    </div>
  );
}

/* ── 02 Analyze ─────────────────────────────────────────────────── */

/* The four dimensions the step names, in its order. The word in front
   is the step's own; the value is the product's tag for the winning ad
   (library/data.ts, through tagValue). */
const READ: [label: string, value: string][] = (
  [
    ["Hook", "headline_style"],
    ["Tone", "emotional_tone"],
    ["Format", "format"],
    ["CTA", "cta_type"],
  ] as const
).map(([label, key]) => [label, tagValue(key)]);

const ANALYZE_LABEL = `One ad from a sample account, "${HERO_CREATIVE.name}", beside what Peachblue read from it: ${READ.map(([label, value]) => `${label === "CTA" ? label : label.toLowerCase()}, ${value.toLowerCase()}`).join("; ")}.`;

function Analyze() {
  return (
    <div className="el-how-read">
      <Tile small className="el-how-read-ad">
        <AdThumb imageUrl={HERO_CREATIVE.image} ratio="wide" size="wide" />
      </Tile>
      <div className="el-how-read-lines">
        {READ.map(([label, value]) => (
          <div key={label} className="el-how-read-line">
            <span className={cx("el-micro", TONE.smoke, "el-how-read-key")}>{label}</span>
            <span className={cx("el-caption", TONE.ink, "el-how-line")}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 03 Act ─────────────────────────────────────────────────────── */

/* Two rows of the week's worklist: the new winner and the first fatigue
   flag, the two findings about a single creative that carry the largest
   dollars. Each row prints the finding's own title, the creative's
   platform and the dollars attached to it. The row's verb is left to
   the product: a picture on this page shows nothing that looks like a
   control. */
const FINDINGS: PulseEvent[] = [PULSE_EVENTS.find((ev) => ev.type === "new_winner"), PULSE_EVENTS.find((ev) => ev.type === "fatigue")].filter(
  (ev): ev is PulseEvent => Boolean(ev),
);

const ACT_LABEL = `Two findings from a sample account's week: ${FINDINGS.map((ev) => `"${ev.title}", ${formatCurrency(ev.dollarImpact)}`).join("; ")}.`;

function Act() {
  return (
    <div className="el-how-finds">
      {FINDINGS.map((ev) => (
        <div key={ev.key} className="el-how-find">
          <Tile small className="el-how-find-ad">
            <AdThumb imageUrl={ev.image} seed={ev.key} size="sm" />
          </Tile>
          <div className="el-how-find-text">
            <span className={cx("el-caption", MEDIUM, TONE.ink, "el-how-line")}>{ev.title}</span>
            <span className="el-how-find-meta">
              <span className={cx("el-micro", TONE.smoke)}>{ev.platform}</span>
              <span className={cx("el-caption", TONE.ink, "el-tnum")}>{formatCurrency(ev.dollarImpact)}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── The section ────────────────────────────────────────────────── */

const PICTURES: { label: string; node: ReactNode }[] = [
  { label: CONNECT_LABEL, node: <Connect /> },
  { label: ANALYZE_LABEL, node: <Analyze /> },
  { label: ACT_LABEL, node: <Act /> },
];

export function HowItWorks() {
  return (
    <section id={HOW_IT_WORKS.id} className="el-how">
      <Block top="top" bottom="gap">
        <h2 className={T.heading}>{HOW_IT_WORKS.eyebrow}</h2>
      </Block>
      <Rule marks="thirds" />
      <Cells as="ol" cols={3} className="el-how-steps">
        {HOW_IT_WORKS.steps.map((step, i) => (
          <Cell as="li" key={step.num}>
            <span className={cx(T.eyebrow, "el-tnum el-how-num")}>{step.num}</span>
            <div className="el-how-slot">
              <Shot label={PICTURES[i].label} ground={false}>
                <Inner flush className="el-how-card">
                  <Fit width={CARD_W} height={CARD_H} className="el-how-fit">
                    {PICTURES[i].node}
                  </Fit>
                </Inner>
              </Shot>
            </div>
            <h3 className={cx(T.subhead, "el-how-title")}>{step.title}</h3>
            <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-how-desc")}>{step.desc}</p>
          </Cell>
        ))}
      </Cells>
    </section>
  );
}
