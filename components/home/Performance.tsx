import "./Performance.css";
import { WasteLeak } from "@/components/product/economics";
import { BLEEDING, ECON, type BleedingRow } from "@/components/product/economics/data";
import { RowThumb } from "@/components/product/economics/parts";
import { Fig, formatCurrency } from "@/components/product/ui";
import { Block, Card, Columns, Fit, MEDIUM, Pill, Rule, Shot, SplitHead, T, TONE, Window, cx } from "@/components/site/parts";
import { ECONOMICS } from "./content";
import { Platforms } from "./Platforms";
import { Weekly } from "./Weekly";

/* For performance teams: Creative Economics (#performance-teams). The
   reader label is an ink line over the eyebrow, the section's trial link
   is the one filled pill under the heading, and the three points are
   plain columns with no rule over them.

   Three rows in one section, each a different form:
   1. Creative Economics: the split header, one wide taupe panel holding
      one window of the product's "Where the money leaks" section, 820
      wide and centred, cut by the panel's foot on the rule under the
      fourth row of its cut list, and under it the three measures as
      plain columns.
   2. The weekly report (Weekly.tsx): a ruled split row.
   3. Platforms (Platforms.tsx, #platforms): a ruled split row.

   Page.tsx draws the rule above this section and the rule under the
   platforms row; the two rules between the rows are drawn here, each
   with a mark over the centre rail of the row it meets. */

/* The reader this section speaks to: its id (a link target) and the
   label over its eyebrow. */
const PERFORMANCE_READER = { id: "performance-teams", label: "For performance teams" };

/* The top of the cut list: its first creatives, as far as they have a
   picture in the sample data, four at most. These are the rows the
   window shows whole, and the ones its text alternative names. Eight of
   the list's nine rows have a picture; the one bare row is the last,
   outside every window. */
const firstBare = BLEEDING.findIndex((b) => !b.image);
const ROWS = BLEEDING.slice(0, Math.min(4, firstBare < 0 ? BLEEDING.length : firstBare));

const WASTE_LABEL = `Where the money leaks, for a sample account: ${formatCurrency(ECON.waste7d)} went to creatives scoring under 30 in the last 7 days, the share of 30-day spend on those creatives, and the top of the list of creatives to cut first, each with its platform, its score, its active days and what it spent: ${ROWS.map((b) => `"${b.name}", ${formatCurrency(b.spend7d)}`).join("; ")}.`;

/* ── From 768: the product's own section, windowed ──────────────── */

/* The product's "Where the money leaks" section (economics/WasteLeak)
   with one row more than the window shows, so the fourth row ends on a
   rule of the list and not on the list's own rounded foot. The window
   shows the section from its own header (the status figure and the
   takeaway sentence), the hatched bar and its two captions, and the cut
   list down to that rule, where the panel's foot cuts it.

   The window is 820px wide at most and centred in the panel, with taupe
   either side (Performance.css). A window as wide as the panel (1078)
   read as the app itself and left 700px of white between a creative's
   name and its red amount.

   The section holds its heights from 560 to 1152 of layout width (the
   takeaway is two lines throughout, a row is 69.5px), so it is not
   scaled with its slot: it is laid out at the width the window gives it
   and painted at 1.05 (--fk in Performance.css) at every width where
   the window is 663px or wider, which is 750px of layout in the 820
   window: names and amounts at 14px. The cut is then on the same rule
   at every width and the type never falls under that size. Under 663px
   of window it is laid out SHEET_MIN wide and painted down to fit (0.93
   at 768).

   SHEET_H: how much of the section the window shows, in the section's
   own px: down to the foot of the fourth row, where the rule under it
   begins, measured on the built page (the list's first row starts
   146.75px down and a row is 69.5px with its rule). */
const SHEET_MIN = 600;
const SHEET_H = 146.75 + 4 * 69.5;

/* ── Phone: the cut list alone ──────────────────────────────────── */

/* A phone's window is too narrow for the product's row (the platform
   mark and the 30-day amount would cut the names short) and for the
   bar's two captions on one line, so there the window holds the cut list
   alone: the thumbnail, the name, the score and the red 7-day amount,
   from the product's own row parts and in the product's own classes (the
   ones economics/WasteLeak sets its rows in, which is why this helper is
   written in utilities and not in the system's classes), as four whole
   rows. The panel's foot is the fourth row's. */
const PHONE_W = 300;
const PHONE_ROW_H = 69;

function CutRow({ b }: { b: BleedingRow }) {
  return (
    <li style={{ height: PHONE_ROW_H }} className="flex items-center gap-3 px-4">
      <RowThumb image={b.image} name={b.name} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13.5px] font-medium text-pb-fg">{b.name}</div>
        <div className="mt-0.5 whitespace-nowrap text-[11.5px] text-pb-fg-muted">
          Score <Fig>{b.score}</Fig>
        </div>
      </div>
      <div className="shrink-0 text-[13.5px] font-semibold text-pb-bad">
        <Fig>{formatCurrency(b.spend7d)}</Fig>
      </div>
    </li>
  );
}

function CutList() {
  return (
    <ul className="divide-y divide-pb-border">
      {ROWS.map((b) => (
        <CutRow key={b.key} b={b} />
      ))}
    </ul>
  );
}

export function Performance() {
  return (
    <section id={PERFORMANCE_READER.id} className="el-econ">
      <Block top="top" bottom="gap">
        <SplitHead
          label={PERFORMANCE_READER.label}
          eyebrow={ECONOMICS.eyebrow}
          title={ECONOMICS.headline}
          action={<Pill href={ECONOMICS.cta.href}>{ECONOMICS.cta.label}</Pill>}
        >
          <p className={cx(T.body, "el-pretty")}>{ECONOMICS.subhead}</p>
        </SplitHead>
      </Block>

      <Block inset="card">
        <Card variant="wide">
          <Shot label={WASTE_LABEL} ground={false}>
            <Window className="el-econ-window">
              <Fit width={SHEET_MIN} height={SHEET_H} className="el-from-md el-econ-sheet">
                <WasteLeak rows={ROWS.length + 1} />
              </Fit>
              <Fit width={PHONE_W} height={ROWS.length * PHONE_ROW_H} className="el-to-md el-econ-cut">
                <CutList />
              </Fit>
            </Window>
          </Shot>
        </Card>
      </Block>

      <Block top="gap" bottom="row">
        <Columns>
          {ECONOMICS.cards.map((card) => (
            <div key={card.title}>
              <h3 className={cx(T.body, MEDIUM)}>{card.title}</h3>
              <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-econ-point")}>{card.text}</p>
            </div>
          ))}
        </Columns>
      </Block>

      <Rule marks="halves" />
      <Weekly />
      <Rule marks="halves" />
      <Platforms />
    </section>
  );
}
