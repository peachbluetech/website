import type { CSSProperties } from "react";
import { CircleDollarSign, Layers, Target } from "lucide-react";
import { Shot } from "@/components/product/frame";
import { WasteLeak } from "@/components/product/economics";
import { BLEEDING, ECON, type BleedingRow } from "@/components/product/economics/data";
import { RowThumb } from "@/components/product/economics/parts";
import { ACCOUNT, tierOf } from "@/components/product/sample";
import { Fig, formatCurrency } from "@/components/product/ui";
import { ECONOMICS } from "./content";
import { BAND_X, FIGURE, FeatureRow, Fit, PeekBand, Points, ROW_GAP, SECTION_END, SectionMarker, Sheet, T } from "./parts";
import { Platforms } from "./Platforms";
import { WeeklyRow } from "./Weekly";

/* For performance teams: three rows. Creative Economics, then the weekly
   report (Weekly.tsx), then the platforms block (Platforms.tsx).
   Creative Economics: a short text column
   beside one navy band: one row of three figures for the week's waste
   (the dollars at 40px under a label that names their window, then how
   many creatives and what share of the week's spend), and under it the
   product's own leak bar and cut list on the mat, in a band as tall as
   the column that the sheet fills to its foot. */

export const PERFORMANCE_READER = { id: "performance-teams", label: "For performance teams" };

/* The top of the cut list: its first creatives, as far as they have a
   picture in the sample data, four at most. These are the rows the band
   shows where it has a height of its own (under lg, and on a phone) and
   the ones its text alternative names. A row with no picture draws the
   app's initials tile; the band shows those only where it needs more
   rows to reach the foot of its column (from lg). */
const firstBare = BLEEDING.findIndex((b) => !b.image);
const ROWS = BLEEDING.slice(0, Math.min(4, firstBare < 0 ? BLEEDING.length : firstBare));

/* ── From sm: the product's own section, windowed ───────────────── */

/* The product's "Where the money leaks" section (economics/WasteLeak)
   with its whole cut list, seen through a window. Its header and
   takeaway sentence are above the window: the figure over the mat
   already says them, so in this section the figure is stated once. The
   window starts 2px over the leak bar and shows the bar with its two
   captions, then the rows, as far as the band's foot.

   The sheet is anchored to the window by its foot, not its head, so the
   window does not depend on how the takeaway wraps (.bp-leak, in
   app/globals.css).

   In the product's units: the bar and its captions take 34.5px, then
   16px, the card's 1px border, and 69.5px a row (68.5 and a rule; the
   last row has the card's border for its rule). In a row the thumbnail
   starts 14.4px down, the name and the 7-day amount end 34px down, and
   the second line's first ink (the dollar sign of the 30-day amount)
   starts 38.7px down. */
const ROW_H = 69.5;
const BAR_H = 2 + 34.5 + 16 + 1;

/* Under lg the band has a height of its own: three whole rows, and the
   fourth, which has a picture, down to 37px: the upper half of its
   thumbnail, its name, its platform and its 7-day amount. */
const FIXED_H = BAR_H + (ROWS.length - 1) * ROW_H + 37;

/* From lg the window is as tall as the band leaves it (see LeakPeek),
   and the band's foot may fall in one of two places in a row:
   - GAP: in the white over the row's thumbnail, up to 12px under the
     rule of the row before, so the sheet ends on whole rows. This is the
     foot the band takes while the list has rows with no picture: such a
     row shows the app's initials tile, whose two letters stand between
     the row's two lines of text, so no line through its middle is clear
     of type. It also lets the sheet end on its four pictured rows where
     the column's height allows (from about 1410).
   - CUT: between the row's two lines of text, 38.8px down: the band's
     1px edge covers the last pixel, an initials tile's letters stand on
     it, and the second line stays under it. Taken where the first would
     paint the sheet under nine tenths (MIN_SCALE; 1024 to about 1028
     today), and at every width once every row has a picture. */
const GAP = firstBare < 0 ? -BLEEDING.length * ROW_H : 12;
const CUT = 38.8;
const MIN_SCALE = 0.9;
/* The narrowest the section is laid out there: every name in the list
   fits beside its platform mark and its two amounts (the longest row
   needs 418px). */
const LEAK_MIN_W = 422;

const LEAK_VARS = {
  "--fh": FIXED_H,
  "--bar": BAR_H,
  "--row": ROW_H,
  "--n": BLEEDING.length,
  "--gap": GAP,
  "--cut": CUT,
  "--kmin": MIN_SCALE,
  "--fmin": LEAK_MIN_W,
} as CSSProperties;

function LeakWindow() {
  return (
    <div className="bp-leak [--fw:420] max-sm:hidden md:max-lg:[--fw:490]" style={LEAK_VARS}>
      <div className="[&_.rounded-lg]:rounded-[calc(4px/var(--k,1))]">
        <div>
          <WasteLeak narrow rows={BLEEDING.length} />
        </div>
      </div>
    </div>
  );
}

/* ── Phone: the cut list alone ──────────────────────────────────── */

/* A phone's band is too narrow for the product's row (the platform mark
   and the 30-day amount would cut the names short) and for the bar's two
   captions on one line, so there the mat holds the cut list alone: the
   thumbnail, the name, the score, and the red 7-day amount, from the
   product's own row parts, as whole rows. */
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
      <div className="shrink-0 font-mono text-[13.5px] font-semibold text-pb-bad tnum">{formatCurrency(b.spend7d)}</div>
    </li>
  );
}

function CutList() {
  return (
    <ul className="divide-y divide-pb-border [&_.rounded-lg]:rounded-[calc(4px/var(--bp-k,1))]">
      {ROWS.map((b) => (
        <CutRow key={b.key} b={b} />
      ))}
    </ul>
  );
}

/* The band's head: one stat row, three true figures of the sample
   account's week, each a label over a display figure, all on one
   baseline. The week's waste at 40px, as before; then, a step smaller
   (28px), how many creatives that money went to and what share of the
   week's spend it is. All three are read from the sample data:
   - the waste is the account's (ECON.waste7d);
   - the count is the cut list's rows in the app's under tier, and the
     score in its label is where that tier ends on the app's scale;
   - the share is the waste over the account's 7-day spend. */
const UNDER_LINE = Array.from({ length: 101 }, (_, score) => score).find((score) => tierOf(score) !== "under") ?? 0;
const UNDER_COUNT = BLEEDING.filter((b) => tierOf(b.score) === "under").length;
const WEEK_SHARE = (ECON.waste7d / ACCOUNT.spend7d) * 100;

const WASTE_LABEL = `Where the money leaks, for a sample account: the dollars that went to creatives scoring under ${UNDER_LINE} in the last 7 days, how many creatives that is and their share of the week's spend, the share of 30-day spend on those creatives, and the top of the list of creatives to cut first, each with its platform, its score, its active days and what it spent: ${ROWS.map((b) => `"${b.name}", ${formatCurrency(b.spend7d)}`).join("; ")}.`;

/* One stat: the label, then the figure. A small figure is set inside a
   line of the large one's size where the three stand in a row, so every
   figure stands on one baseline whatever its size. The label stands at
   the cell's top and the figure at its foot, so two stats side by side
   keep one baseline if their labels take a different number of lines.

   NARROW_LABEL: where the row is under 268px wide (a phone narrower
   than 358px) the two small labels do not fit side by side on one line
   each (with their padding they take 263px), so there each takes two
   lines of 16px (the line of the page's other two-line label, under the
   manifesto's bar). Its measure is held to 88px, so at every such width
   both break, and each at its first space: "Scoring / under 30",
   "Of 7-day / spend". */
const NARROW_LABEL = "@max-[16.75rem]:max-w-[5.5rem] @max-[16.75rem]:whitespace-normal @max-[16.75rem]:leading-[16px]";

function Stat({ label, small = false, className = "", children }: { label: string; small?: boolean; className?: string; children: string }) {
  return (
    <div className={`flex min-w-0 flex-col justify-between ${className}`}>
      <p className={`whitespace-nowrap ${T.labelFig} text-[color:var(--mn-on-navy-label)] ${small ? NARROW_LABEL : ""}`}>{label}</p>
      <p className={`mt-3 ${FIGURE} leading-none text-[color:var(--mn-on-navy)] ${small ? "text-[28px] @[28rem]:text-[40px]" : "text-[40px]"}`}>
        {small ? <span className="text-[28px]">{children}</span> : children}
      </p>
    </div>
  );
}

/* The row. Where the band's column is 448px or wider the three stand
   across it, divided by two hairlines (paper colour at 14%), each column
   at least as wide as its label and the rest shared out, the first
   taking the most. Under that (1024 to about 1097, 640 to about 671,
   and a phone) the week's waste keeps its own line and the two smaller
   figures stand under a hairline in two columns: on a phone of 358px or
   wider the first is as wide as its label; under that the two are
   equal and each label takes two lines (NARROW_LABEL above); from 640
   to about 671 the two are equal.

   The row brings its own air, so the band's head is as short as it can
   be: three across, 40px over it and 32px under it (the mat starts 176px
   under the band's top); stacked, 32px and 24px (24px and 24px on a
   phone), which is what keeps the sheet beside it at nine tenths or more
   at 1024. Decoration: the Shot's text alternative says all three. */
const HAIR = "border-[color:var(--mn-on-navy-rule)]";

function LeakStats() {
  return (
    <div aria-hidden="true" className={`@container ${BAND_X}`}>
      <div className="grid grid-cols-[max-content_minmax(0,1fr)] pb-6 pt-6 @max-[16.75rem]:grid-cols-2 sm:@max-[28rem]:grid-cols-2 sm:@max-[28rem]:pt-8 @[28rem]:grid-cols-[minmax(max-content,1.2fr)_minmax(max-content,1fr)_minmax(max-content,0.9fr)] @[28rem]:pb-8 @[28rem]:pt-10">
        <Stat label="Leaking / last 7 days" className="col-span-2 pb-4 @[28rem]:col-span-1 @[28rem]:pb-0 @[28rem]:pr-4 @[34rem]:pr-6">
          {formatCurrency(ECON.waste7d, 0)}
        </Stat>
        <Stat small label={`Scoring under ${UNDER_LINE}`} className={`border-t pr-3 pt-4 sm:pr-4 @[28rem]:border-l @[28rem]:border-t-0 @[28rem]:pl-4 @[28rem]:pt-0 @[34rem]:px-6 ${HAIR}`}>
          {String(UNDER_COUNT)}
        </Stat>
        <Stat small label="Of 7-day spend" className={`border-l border-t pl-3 pt-4 sm:pl-4 @[28rem]:border-t-0 @[28rem]:pt-0 @[34rem]:pl-6 ${HAIR}`}>
          {`${WEEK_SHARE.toFixed(1)}%`}
        </Stat>
      </div>
    </div>
  );
}

/* The band. Its two labels, then the stat row, then the mat, which
   stands on the band's foot; the band holds no other air.

   From sm the mat holds the leak window inside a white margin: 32px from
   md to lg, 16px from xl and from sm to md, 12px from lg to xl, where
   the band is at its narrowest. From 1440 the margin over the sheet is
   32px and the sides stay at 16px: that width is what lets the four
   pictured rows be painted large enough (1.31) to reach the band's foot
   under the compact stat row, with no fifth row.

   From lg the band is as tall as the text column beside it, and all of
   that height goes to the sheet: the window is
   what is left under the mat's margin, and it shows as many rows as it
   takes to fill it. With m whole rows the window is 53.5 + 69.5m of the
   product's px tall (and up to 12 more of white), so the sheet is
   painted at the scale that makes that the window's height and laid out
   at the width that scale leaves it. m is the fewest rows that keep that
   width at LEAK_MIN_W or more, so no name is cut short and the sheet is
   never painted over one and a third times: four whole rows from 1440
   (1.31), six at 1280 (1.02), six and the seventh cut at 1024 (0.90).

   Under lg the band runs the page's width and has no column to match:
   the window shows three whole rows and cuts the fourth, laid out 420
   wide (490 from md, instead of being painted over one and a half
   times) and painted at the width its margin leaves it: 0.91 at 640,
   0.98 at 768, 1.5 at 1023.

   On a phone the mat has no margin and holds the cut list, whole rows.
   One Shot holds both layouts, so the picture has one text alternative. */
const STRETCH = "lg:flex lg:min-h-0 lg:flex-1 lg:flex-col";

function LeakPeek() {
  return (
    <PeekBand className="flex flex-col lg:h-full" lead={<LeakStats />}>
      <div
        className={`mx-3 overflow-hidden rounded-t-[4px] bg-[var(--mn-white)] sm:mx-12 sm:px-4 sm:pt-4 md:px-8 md:pt-8 lg:max-xl:mx-4 lg:max-xl:px-3 lg:max-xl:pt-3 xl:px-4 xl:max-[90rem]:pt-4 ${STRETCH} lg:[&>figure]:flex lg:[&>figure]:min-h-0 lg:[&>figure]:flex-1 lg:[&>figure]:flex-col`}
      >
        <Shot label={WASTE_LABEL} ground={false} className={STRETCH}>
          <Fit width={300} height={ROWS.length * PHONE_ROW_H} className="sm:hidden">
            <CutList />
          </Fit>
          <LeakWindow />
        </Shot>
      </div>
    </PeekBand>
  );
}

/* The three measures, each led by one line icon: 20px, 1.5px, no fill. */
const ICON = { size: 20, strokeWidth: 1.5 };
const ICONS = [<Target key="hit" {...ICON} />, <CircleDollarSign key="waste" {...ICON} />, <Layers key="bench" {...ICON} />];

export function PerformanceTeams() {
  return (
    <Sheet id={PERFORMANCE_READER.id} className={SECTION_END}>
      <SectionMarker n={5}>
        <p>{PERFORMANCE_READER.label}</p>
      </SectionMarker>
      <FeatureRow eyebrow={ECONOMICS.eyebrow} headline={ECONOMICS.headline} accent="earned it?" sub={ECONOMICS.subhead} cta={ECONOMICS.cta} tile={<LeakPeek />}>
        <Points points={ECONOMICS.cards} icons={ICONS} />
      </FeatureRow>
      <div className={ROW_GAP}>
        <WeeklyRow />
      </div>
      <div className={ROW_GAP}>
        <Platforms />
      </div>
    </Sheet>
  );
}
