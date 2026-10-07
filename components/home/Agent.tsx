import { Fragment, type CSSProperties, type ReactNode } from "react";
import { RANKED } from "@/components/product/agent/data";
import { MiniMetric, RankedList, ScoreCircle, Turn } from "@/components/product/agent/parts";
import { CardGrid, MCP_RANKED, ToolCall } from "@/components/product/mcp";
import type { SampleCreative } from "@/components/product/sample";
import { AdThumb, Card as AppCard, PlatformBadge, formatCurrency, formatCurrencyCompact, formatPercent, formatRoas } from "@/components/product/ui";
import { AGENT_PEACH } from "./content";
import { ClaudeMark } from "./Marks";
import { Block, Card, Cards, Dotted, Fluid, Keep, LogoTile, MEDIUM, More, Pill, Shot, SplitHead, T, TONE, Window, cx } from "@/components/site/parts";
import "./Agent.css";

/* Agent Peach (#agent-peach): two ways to chat, shown side by
   side at equal weight. Either chat with Agent Peach in the product, or
   connect Claude and ask there, with the same data.

   Top to bottom:
   1. The split header: the eyebrow and the h2 on the left; on the right
      the line that names the two ways, then bullets 1 and 2 as rows on
      dotted separators and a "More" row holding bullets 4 and 5.
   2. Two taupe cards, one per way. In each, from the top: the title (an
      h3) led by the mark of the place it names, with the card's one
      action as a small white pill at the row's right end; the card's one
      line, its first phrase in ink and its second in the secondary tone,
      the change falling on the line break; the question, the same in
      both cards, as an outlined bubble on the right (decoration: it says
      "one question, two places" without a label); and the answer in a
      white window that the card's foot cuts.
      Left: Agent Peach's turn, in its own words, over its ranked
      creatives as rows; the foot cuts the third row in the white under
      its name and over its figures.
      Right: Peachblue's tool row and the creative card it returned, a
      grid of the same five ads; the window also runs off the card's
      right edge, which cuts the third ad after its pills, and the foot
      cuts in the white under the names.
      The matching names and scores (94, 92, 91, three on each side) are
      the proof of "the same data".
   3. The note row: bullet 3, the claim both pictures bear out (each
      prints its window, "last 7 days").

   Copy: the eyebrow, the h2, the five bullets and the trial link are
   content.ts's. The section's own words are TWO_WAYS below.

   Truth rules: Claude is
   named only as the place the data goes (the title, its line, the link)
   and marked once, beside its name, outside the picture. No host
   interface is drawn: the right picture is Peachblue's own tool row and
   card on a plain white surface. No tool count and no "MCP" in this
   section. Nothing here acts on an account or generates an ad. "Pro and
   up" is the plan the connection is on; Agent Peach is on every plan, so
   the left card carries no gate.

   Page.tsx draws the rule above this section and the rule under it. */

const ID = "agent-peach";
const MCP_HREF = "/mcp";

/* The section's own words: the ones that are not in content.ts. They
   are published copy like the rest of the page: restyle freely, do not
   reword. */
const TWO_WAYS = {
  sub: "Chat with Agent Peach, or chat in Claude with the same data.",
  app: {
    title: "Chat with Agent Peach",
    /* One line, in its two sentences. */
    line: ["Built into Peachblue.", "Every answer comes from your own ad data."],
  },
  mcp: {
    title: "Chat in Claude",
    /* One line: the claim, then what pays it off. */
    line: ["Supercharge Claude with next-level ad intelligence:", "your scores, tags, and rankings."],
    link: "Connect Claude",
    /* The plan gate: a label beside the link, outside its anchor. */
    gate: "Pro and up",
  },
} as const;

/* ── Text alternatives ──────────────────────────────────────────── */

/* One sentence for each picture, true of every layout of it: the left
   shows all five rows where one card runs across the frame from about
   820, the first three under that, the first four in a narrow card, and
   the first two whole (with the head of the third) side by side from
   about 1180 and on a phone, so the first two always; the right is the grid of five, of which the first ad with its
   rank, score and name is always in view. Both say the question, which
   the card prints in a decorative layer. */
const WINDOW = /last \d+ days/.exec(RANKED.answer)?.[0] ?? "last 7 days";
const [R1, R2] = RANKED.cards.map((c) => c.creative);
const ANSWER_LABEL = `Agent Peach's answer in Peachblue, for a sample account, to the question "${RANKED.question}": a ranked list of ${RANKED.cards.length} creatives over the ${WINDOW}, led by ${R1.name} (score ${R1.score}) and ${R2.name} (score ${R2.score}), each with its spend, CTR, CPA and ROAS.`;
const MCP_LABEL = `The same question asked in Claude for the same sample account: a Peachblue tool call, get_creatives with limit ${MCP_RANKED.call.args.limit} over the ${WINDOW}, and Peachblue's creative card, a ranked grid of the same ${MCP_RANKED.creatives.length} creatives led by #1 ${R1.name} at score ${R1.score} and #2 ${R2.name} at ${R2.score}.`;

/* ── Left: Agent Peach, in the app ──────────────────────────────── */

/* The product's own turn: the role label, the answer, the ranked list of
   five. Shown where one card runs across the frame and the list has its
   own 672px. */
function Answer() {
  return (
    <Turn role="Agent Peach" text={RANKED.answer}>
      <RankedList cards={RANKED.cards} />
    </Turn>
  );
}

/* The list's four figures in its own order and formats. */
const figures = (c: SampleCreative) => [
  { label: "Spend", value: formatCurrencyCompact(c.spend) },
  { label: "CTR", value: formatPercent(c.ctr) },
  { label: "CPA", value: formatCurrency(c.cpa) },
  { label: "ROAS", value: formatRoas(c.roas) },
];

/* A window under about 630px cannot hold the list without cutting a name
   short, and under 600 it has to be painted small, so there it holds the
   same ranked creatives as compact rows made of the product's own parts:
   the thumbnail, the platform, the name, the score disc, and the list's
   four figures on a line of their own. It stands inside a picture and
   is put together from the product's parts, so it is written in the
   product's utility classes, not in the system's. */
function CompactRanked() {
  return (
    <AppCard className="divide-y divide-pb-border overflow-hidden">
      {RANKED.cards.map(({ creative: c }) => (
        <div key={c.key} className="p-3">
          <div className="flex items-center gap-3">
            <AdThumb imageUrl={c.image} size="sm" className="size-10 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex">
                <PlatformBadge platform={c.platform} />
              </div>
              <div className="truncate text-[13px] font-medium leading-tight text-pb-fg">{c.name}</div>
            </div>
            <ScoreCircle score={c.score} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {figures(c).map((f) => (
              <MiniMetric key={f.label} label={f.label} value={f.value} />
            ))}
          </div>
        </div>
      ))}
    </AppCard>
  );
}

/* Agent Peach's turn over the compact rows: the role label, the answer
   in its own words (which is where the left picture prints its window,
   "the last 7 days"), then the ranked creatives: the pairing for a
   window too narrow for the list. */
function CompactAnswer() {
  return (
    <Turn role="Agent Peach" text={RANKED.answer}>
      <CompactRanked />
    </Turn>
  );
}

/* ── Right: the same question, in Claude ────────────────────────── */

/* Peachblue's tool row (its own p, get_creatives, limit 5 · last 7 days)
   over the card grid alone, with no frame ground: white with hairline
   cards, like the list beside it. Where the row wraps (a phone) its
   arguments hang under "Peachblue" (a utility string on the product's
   own row, inside the picture). */
const HANG = "pl-7 [&>:first-child]:-ml-7";

function OverMcp({ host, hang = false }: { host: number; hang?: boolean }) {
  return (
    <div className="el-agent-mcp">
      <ToolCall call={MCP_RANKED.call} className={hang ? HANG : undefined} />
      <CardGrid width={host} ground={false} className="el-agent-host" />
    </div>
  );
}

/* ── The windows, in each fragment's own units ──────────────────── */

/* Each window is a box that lays its fragment out at `w` px and paints
   it at the width of its slot, showing `h` px of it, so the card's foot
   cuts the fragment on the same line at every width. Which layout a
   card shows goes by the card's own width (Agent.css, by container
   query), so no fragment is painted far from its own size:
     wide     470 to 550px inside the card's padding: the two cards side
              by side from about 1180 (507px at 1440)
     narrow   380 to 470px: the two side by side from 1024 to 1180
     mid      550 to 650px: one card across the frame, stacked, on a
              screen from about 650 to 820
     across   from 650px: one card across the frame, stacked, up to 1024
     phone    under 380px: a screen under about 480
   Every number below was measured on the built page, in the fragment's
   own units.

   Side by side both cards are one height, so the two cuts have to land
   together: on screen a window is its slot's width times h / w, and the
   left slot is 45px narrower than the right, which has no right inset.
   Whatever is left over (a pixel or two; under three at the narrow end
   of the wide range) is white over the shorter fragment, never taupe
   under a window.

   The left window, Agent Peach's answer.
   - wide: the turn over the compact rows, laid out 462 wide and painted
     at 1.02 at 1440 (1.00 at 1280, 0.95 at 1190): the role label, the
     answer on five lines (to 143.9), then the rows from 156.9, one every
     113.75. Rows 1 and 2 are whole with their four figures; row 3 shows
     its head (the thumbnail, the platform, the name, the score, to
     436.4) and the cut at 442 is in the 12px of white over its figures
     (from 448.4), which is where the window beside it is cut too: under
     the names, over the figures. So the left shows 94, 92 and 91 with
     their names, the same three the right shows.
     This replaced the product's five-column list laid out 568 wide and
     painted at 0.83 (0.81 at 1280): its type was 7 to 11px, one name was
     cut short by the list itself, and Peachblue's own agent was the
     quiet half of the pair. The list needs about 630px to cut no name
     and the card has 474.
   - mid: the same turn over the compact rows, laid out 560 wide and
     painted at 0.92 to 1.1 (1.01 at 768): the answer on four lines (to
     119.5), the rows from 132.5, one every 113.75. Rows 1 to 3 are
     whole; the cut at 467 is in the white under row 3's figures (to
     460.7; the row ends at 473.7). The cards are stacked here, so this
     cut does not have to meet the other card's.
   - across: the turn with the list at the app's own 684 (the list at
     its 672), the answer on three lines, the last row ending at 492.
     Only from 650px of card, where it is painted at 0.9 or more: in a
     564px slot (a 768 screen) it was painted at 0.82.
   - narrow: the compact rows alone at 372, a row every 113.75; the cut
     at 452 is in the white under row 4's figures (to 443; the row ends
     at 456).
   - phone: the compact rows at 282, rows 1 and 2 whole; the cut at 224
     is in the white under row 2's figures (to 215.5; the row ends at
     228.5).

   The right window, Peachblue's card in Claude. `host` is the width the
   card grid is given, `w` how much of it shows before the card's right
   edge.
   - wide: a 640 host (three columns of 205), 31px under the tool row
     (Agent.css; 24 in every other layout), painted at 0.925 at 1440
     (0.90 at 1280, 0.87 at 1190). The 31 is what puts the white under
     the names level with the white over row 3's figures on the left.
     The pictures from 63, the pills 437.8 to 457, the names 465.4 to
     483.6, SPEND from 494.6. The cut at 489 is in the white between the
     names and SPEND. The right edge at 560 cuts ad 3 (from 434.7) after
     its pills (to 551.1).
   - mid: the wide layout, unchanged, painted at 0.99 to 1.17.
   - narrow: the same grid 24px under the tool row, shown as far as 446:
     ads 1 and 2 whole and the edge of the third; the names 458.4 to
     476.6, SPEND from 487.6, the cut at 483.
   - across: a 1000 host (four columns of 241). The names 521.8 to 540,
     SPEND from 550, the cut at 546; the right edge at 720 cuts ad 3
     (from 506) after its pills (to 622.4).
   - phone: the card as it lays itself out at a 282 host, one column,
     the tool row on two lines; the cut at 628 is in the white under ad
     1's name, so "#1", "Score 94" and "Zero sugar. All fizz." match row
     1 of the list above. This window does not bleed. */
const TALK = {
  wide: { w: 462, h: 442 },
  mid: { w: 560, h: 467 },
};
const LIST = {
  across: { w: 684, h: 492 },
};
const ROWS = {
  narrow: { w: 372, h: 452 },
  phone: { w: 282, h: 224 },
};
const GRID = {
  wide: { host: 640, w: 560, h: 489 },
  narrow: { host: 640, w: 446, h: 483 },
  across: { host: 1000, w: 720, h: 546 },
  phone: { host: 282, w: 282, h: 628 },
};

/* The layouts a stylesheet has to switch to, handed to it as custom
   properties on the card's answer (Agent.css reads them inside its
   container queries; the layout each box is rendered with is the one in
   its own markup). */
type Box = { w: number; h: number; host?: number };
function layouts({ narrow, mid, across }: { narrow: Box; mid?: Box; across?: Box }): CSSProperties {
  return {
    "--el-agent-narrow-w": narrow.w,
    "--el-agent-narrow-h": narrow.h,
    ...(mid ? { "--el-agent-mid-w": mid.w, "--el-agent-mid-h": mid.h } : null),
    ...(across ? { "--el-agent-across-w": across.w, "--el-agent-across-h": across.h } : null),
    ...(across?.host ? { "--el-agent-across-host": `${across.host}px` } : null),
  } as CSSProperties;
}

/* ── A card: one way to chat ────────────────────────────────────── */

/* The question both cards answer, as the user's turn: an outlined
   bubble on the right. Decoration:
   both pictures' text alternatives say the question. It is not a
   control and does not look like one: no fill, no shadow. */
function Asked() {
  return (
    <div aria-hidden="true" className="el-agent-asked">
      <span className="el-body-sm el-agent-bubble">{RANKED.question}</span>
    </div>
  );
}

function Way({
  mark,
  title,
  line,
  action,
  bleed = false,
  label,
  layout,
  children,
}: {
  /** The 20px mark of the place the title names. */
  mark: ReactNode;
  title: string;
  /** The card's line in its two phrases. */
  line: readonly string[];
  /** The card's one link, and anything that stands beside it. */
  action: ReactNode;
  /** The window also runs off the card's right edge. */
  bleed?: boolean;
  /** The picture's text alternative. */
  label: string;
  /** The picture's other layouts, for the stylesheet. */
  layout: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Card className="el-agent-card">
      <div className="el-agent-head">
        <div className="el-agent-name">
          {mark}
          <h3 className={T.titleLg}>{title}</h3>
        </div>
        <p className={cx(T.bodySm, TONE.earth, "el-agent-line")}>
          {line.map((part, i) => (
            <Fragment key={part}>
              {i > 0 && " "}
              <span className={cx("el-agent-phrase", i === 0 && TONE.ink)}>
                <Keep text={part} words />
              </span>
            </Fragment>
          ))}
        </p>
        <div className="el-agent-action">{action}</div>
      </div>
      <Asked />
      <div className={cx("el-agent-answer", bleed && "el-agent-answer--bleed")} style={layout}>
        <Window bleed={bleed} className="el-agent-win">
          <Shot label={label} ground={false}>
            {children}
          </Shot>
        </Window>
      </div>
    </Card>
  );
}

/* ── The section ────────────────────────────────────────────────── */

export function AgentPeach() {
  const [b1, b2, b3, b4, b5] = AGENT_PEACH.bullets;
  const cta = AGENT_PEACH.cta;
  return (
    <section id={ID} className="el-agent">
      <Block top="top" bottom="gap">
        <SplitHead eyebrow={AGENT_PEACH.eyebrow} title={AGENT_PEACH.headline}>
          <p className={cx(T.body, "el-pretty")}>{TWO_WAYS.sub}</p>
          <div className="el-dotted el-agent-points">
            <Dotted items={[b1, b2]} />
            <More items={[b4, b5]} />
          </div>
        </SplitHead>
      </Block>

      <Block inset="card">
        <Cards>
          <Way
            mark={<LogoTile size={20} />}
            title={TWO_WAYS.app.title}
            line={TWO_WAYS.app.line}
            label={ANSWER_LABEL}
            layout={layouts({ narrow: ROWS.narrow, mid: TALK.mid })}
            action={
              <Pill href={cta.href} variant="outline" size="sm" arrow={cta.arrow}>
                {cta.label}
              </Pill>
            }
          >
            <Fluid width={TALK.wide.w} height={TALK.wide.h} className="el-agent-talk">
              <CompactAnswer />
            </Fluid>
            <Fluid width={LIST.across.w} height={LIST.across.h} className="el-agent-list">
              <Answer />
            </Fluid>
            <Fluid width={ROWS.phone.w} height={ROWS.phone.h} className="el-agent-rows">
              <CompactRanked />
            </Fluid>
          </Way>

          <Way
            mark={<ClaudeMark className="el-size-20" />}
            title={TWO_WAYS.mcp.title}
            line={TWO_WAYS.mcp.line}
            label={MCP_LABEL}
            layout={layouts({ narrow: GRID.narrow, across: GRID.across })}
            bleed
            action={
              <>
                <Pill href={MCP_HREF} variant="outline" size="sm" arrow>
                  {TWO_WAYS.mcp.link}
                </Pill>
                <span className={cx("el-caption", MEDIUM, TONE.earth)}>{TWO_WAYS.mcp.gate}</span>
              </>
            }
          >
            <Fluid width={GRID.wide.w} height={GRID.wide.h} className="el-agent-grid">
              <OverMcp host={GRID.wide.host} />
            </Fluid>
            <Fluid width={GRID.phone.w} height={GRID.phone.h} className="el-agent-one">
              <OverMcp host={GRID.phone.host} hang />
            </Fluid>
          </Way>
        </Cards>
      </Block>

      <Block top="gap" className="el-agent-note">
        <p className={cx(T.bodySm, "el-pretty")}>{b3}</p>
      </Block>
    </section>
  );
}
