import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Shot } from "@/components/product/frame";
import { RANKED } from "@/components/product/agent/data";
import { MiniMetric, RankedList, ScoreCircle, Turn } from "@/components/product/agent/parts";
import { CardGrid, MCP_RANKED, ToolCall } from "@/components/product/mcp";
import { AdThumb, Card, PlatformBadge, formatCurrency, formatCurrencyCompact, formatPercent, formatRoas } from "@/components/product/ui";
import type { SampleCreative } from "@/components/product/sample";
import { AGENT_PEACH } from "./content";
import { ClaudeMark, PeachblueTile } from "./Marks";
import { Accent, BAND_X, Bullets, Fluid, INSET, More, PAPER, PeekBand, SECTION_END, SectionMarker, Sheet, T } from "./parts";

/* 02 Agent Peach: two ways to chat. Either chat with Agent Peach in the
   product, or connect Claude for the same data in the workflow you
   already use. The band shows Claude's mark beside its name and says
   nothing about the tool count or MCP.

   The two ways are the band's headline, first and biggest at every
   width. Top to bottom:
   1. The head (on paper): the h2, and under it the line that names the
      two ways ("Chat with Agent Peach, or chat in Claude with the same
      data.").
   2. The band's lead: the pair of titles, the largest type in the band
      (H2, 44px at 1440), each led by the mark of the place it names:
      Peachblue's p beside "Chat with Agent Peach", Claude's mark beside
      "Chat in Claude", with "or" between them. Under each title its one
      line at Body large, its first phrase in full paper colour; under
      that each half's one action, on one line across the band: the
      section's trial link on the left, the band's own link to /mcp
      ("Connect Claude") on the right with its plan gate, "Pro and up",
      beside it as a label.
   3. The question, once and small: "You asked / Show me my top five
      creatives this week" on one ruled line directly over the mats
      (from xl across both halves; stacked, between the left half's
      action and its mat).
   4. The two mats: Agent Peach's ranked answer on the left,
      Peachblue's get_creatives card returned over MCP on the right. The
      matching scores (94, 92, 91 on both mats at 1440) are the proof of
      "the same data".

   Copy: the h2, bullets 1 and 2 (head), 4 and 5 (More), 3 (the caption
   under the band) and the trial link (on the band) are content.ts's.
   The section's own words are TWO_WAYS below: the subline, the two
   titles (h3), their two lines, the link "Connect Claude" (to /mcp) and
   the label "Pro and up" beside it. The MCP anchor ("Your data in
   Claude", "The 23-tool MCP server, included on Pro and up.") is in the
   toolkit, whole (Toolkit.tsx).

   Truth: the right half's picture is drawn by us from Peachblue's own
   parts (components/product/mcp): no window, no reply prose, only the
   tool row and Peachblue's card. Claude is named as the place the data
   goes (the title, its line, the link) and marked once, beside its name
   in the title, outside the picture (Marks.tsx). It is never on a turn
   and never Agent Peach. "Supercharge" and "next-level" are paid off
   in the same line by what Claude receives: your scores, tags, and
   rankings. "The same data" is the same data and tools, so the same
   numbers; nothing promises the same words. "Pro and up" is the plan
   the MCP server is on (the toolkit's published line, plans.ts); Agent
   Peach is on every plan, so the left half carries no gate. Nothing
   here acts on an account, and nothing generates an ad. */

const ID = "agent-peach";
const MCP_HREF = "/mcp";

/* The section's own words (the rest of its copy is in content.ts). */
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
    /* The plan gate, said without the plumbing: a label beside the link,
       outside its anchor. */
    gate: "Pro and up",
  },
} as const;

/* ── Text alternatives ──────────────────────────────────────────── */

/* The list's four figures in its own order and formats (compact spend,
   two decimals for CTR and ROAS, cents for CPA). */
const figures = (c: SampleCreative) => [
  { label: "Spend", value: formatCurrencyCompact(c.spend) },
  { label: "CTR", value: formatPercent(c.ctr) },
  { label: "CPA", value: formatCurrency(c.cpa) },
  { label: "ROAS", value: formatRoas(c.roas) },
];

/* Each label says what every window of its picture shows, and no more:
   the left shows rows 1 and 2 on a phone and all five from xl; the right
   shows card 1 on a phone, cards 1 and 2 from 640 (card 3 too at 1440)
   and never the figures under the names. Both say the question, which
   the band prints once in a decorative layer. */
const WINDOW = /last \d+ days/.exec(RANKED.answer)?.[0] ?? "last 7 days";
const [R1, R2] = RANKED.cards.map((c) => c.creative);
const ANSWER_LABEL = `Agent Peach's answer in Peachblue for a sample account. The question: "${RANKED.question}" The answer is a ranked list of ${RANKED.cards.length} creatives over the ${WINDOW}, led by ${R1.name} (score ${R1.score}) and ${R2.name} (score ${R2.score}), each with its spend, CTR, CPA and ROAS.`;
const MCP_LABEL = `The same question asked in Claude for the same sample account: a Peachblue tool call over MCP, get_creatives with limit ${MCP_RANKED.call.args.limit} over the ${WINDOW}, and Peachblue's creative card, a ranked grid of the same ${MCP_RANKED.creatives.length} creatives led by #1 ${R1.name} at score ${R1.score} and #2 ${R2.name} at ${R2.score}.`;

/* ── The band's type on navy ────────────────────────────────────── */

const ON_NAVY = "text-[color:var(--mn-on-navy)]";
const ON_NAVY_BODY = "text-[color:var(--mn-on-navy-body)]";
const ON_NAVY_LABEL = "text-[color:var(--mn-on-navy-label)]";
const ON_NAVY_RULE = "border-[color:var(--mn-on-navy-rule)]";
const ON_NAVY_RING = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--mn-on-navy-accent)]";
/* The page's text link (ArrowLink) in the navy's colours: its label and
   its rule are paper colour; under the pointer and on focus both take
   the accent on navy, and the ring is drawn in it. */
const ON_NAVY_LINK = `inline-flex items-center gap-1.5 border-b border-[color:var(--mn-on-navy)] pb-1 font-semibold transition-colors duration-150 hover:border-[color:var(--mn-on-navy-accent)] hover:text-[color:var(--mn-on-navy-accent)] focus-visible:border-[color:var(--mn-on-navy-accent)] focus-visible:text-[color:var(--mn-on-navy-accent)] ${T.small} ${ON_NAVY} ${ON_NAVY_RING}`;

/* ── "or" ───────────────────────────────────────────────────────── */

/* The word the row hinges on, in the titles' own face and their paper
   colour, about three quarters of their size (32px at 1440, 28.8 at
   1280, 28 stacked), so the row reads as one sentence: "Chat with Agent
   Peach or Chat in Claude". Decoration: the subline says "or" in words.
   - From xl (`OrBetween`) it stands on the titles' line, in the middle
     of the room between the end of the left title and the right title's
     mark. It is the left title row's last cell and reaches through the
     48px column between the halves. No rule beside it: a short hairline
     either side of a word reads as a pair of dashes.
   - Stacked (`OrRow`) it is a row of its own between the left mat and
     the right title: "or", then a hairline in the navy's rule to the
     band's inset. */
const OR = `font-display text-[clamp(28px,2.25vw,32px)] font-semibold leading-none tracking-[-0.015em] ${ON_NAVY}`;

function OrBetween() {
  return (
    <span aria-hidden="true" className={`-mr-12 flex-1 text-center max-xl:hidden ${OR}`}>
      or
    </span>
  );
}

function OrRow() {
  return (
    <div aria-hidden="true" className="flex items-center gap-4 pt-8 xl:hidden">
      <span className={OR}>or</span>
      <span className={`flex-1 border-t ${ON_NAVY_RULE}`} />
    </div>
  );
}

/* ── The two titles ─────────────────────────────────────────────── */

/* One form for both halves, and the band's largest type: the mark, then
   the title (an h3) at H2 in paper colour (44px at 1440, 40 at 1280, 32
   under 1032); 12px under it the half's one line at Body large (18px
   from md); under that the half's one action (`children`). The mark is
   32px (28 on a phone) and stands on the middle of the title's first
   line, which for Fraunces at 1.08 is the middle of its capitals; where
   a title takes two lines (a phone's "Chat with / Agent Peach") the
   mark stays beside the first.

   The line is set in its phrases (`line`: the left's two sentences, the
   right's claim and what pays it off). The first phrase is in full
   paper colour, the second in the band's body tone, so the sell reads
   before its payoff: "Supercharge Claude with next-level ad
   intelligence:" then "your scores, tags, and rankings."; "Built into
   Peachblue." then "Every answer comes from your own ad data.". Each
   phrase is a box of its own and keeps to its own line wherever the
   measure (30em, 26em from xl) cannot hold both, which is every width
   checked, so the change of tone falls on a line break; a phrase wider
   than its column wraps inside itself, balanced.

   The action is 16px under the line. From xl the two heads share one
   grid row and each is a column whose action stands on its foot, so the
   titles share a line and the two actions share a line whatever the
   lines above them wrap to (at 1280 the right line takes three lines,
   the left two). The marks stand on the mats' left edges. Paddings come
   from each half (`className`). */
/* A hyphenated word keeps to one line ("next-level" never ends a line on
   its hyphen). The text is unchanged: the word is only wrapped. */
function Whole({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\S+-\S+)/).map((part, i) =>
        i % 2 ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Way({ mark, title, line, between, className = "", children }: { mark: ReactNode; title: string; line: readonly string[]; between?: ReactNode; className?: string; children?: ReactNode }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center">
        <h3 className={`flex items-start gap-3 ${T.h2} ${ON_NAVY}`}>
          <span aria-hidden="true" className="flex h-[1.08em] shrink-0 items-center">
            {mark}
          </span>
          <span className="text-balance">{title}</span>
        </h3>
        {between}
      </div>
      <p className={`mt-3 max-w-[30em] text-balance xl:max-w-[26em] ${T.bodyLg} ${ON_NAVY_BODY}`}>
        {line.map((part, i) => (
          <Fragment key={part}>
            {i > 0 && " "}
            <span className={`inline-block ${i === 0 ? ON_NAVY : ""}`}>
              <Whole text={part} />
            </span>
          </Fragment>
        ))}
      </p>
      {children && <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2 xl:mt-auto xl:pt-4">{children}</div>}
    </div>
  );
}

const MARK_SIZE = "size-7 sm:size-8";

function LinkArrow() {
  return (
    <>
      {" "}
      <span aria-hidden="true">&rarr;</span>
    </>
  );
}

/* The left half, the band's first thing at every width: 20px under the
   band's labels on a phone, 24 from sm, 40 from xl. Its action is the
   section's own trial link (content.ts's anchor text and href), so
   the product's way ends on an action as the Claude way does. Stacked,
   24px under it, the question's rule; from xl, 32px. */
function AppWay() {
  const cta = AGENT_PEACH.cta;
  return (
    <Way
      mark={<PeachblueTile className={MARK_SIZE} />}
      title={TWO_WAYS.app.title}
      line={TWO_WAYS.app.line}
      between={<OrBetween />}
      className="pb-6 pt-5 sm:pt-6 xl:col-start-1 xl:row-start-1 xl:pb-8 xl:pt-10"
    >
      {cta && (
        <a href={cta.href} className={ON_NAVY_LINK}>
          {cta.label}
          {cta.arrow && <LinkArrow />}
        </a>
      )}
    </Way>
  );
}

/* The right half. Its action is the band's own link to /mcp, and beside
   it, on its baseline and outside the anchor, the plan gate in the
   band's 10px label cut: the offer and its condition in one place, with
   no tool count and no "MCP". Stacked it follows "or" and its own mat
   follows it (16px on a phone, 24 from sm). From xl the grid has no
   right inset (the mat under it runs off the band), so the head brings
   its own 24px. */
function McpWay() {
  return (
    <Way
      mark={<ClaudeMark className={MARK_SIZE} />}
      title={TWO_WAYS.mcp.title}
      line={TWO_WAYS.mcp.line}
      className="pb-4 pt-6 sm:pb-6 sm:pt-8 xl:col-start-3 xl:row-start-1 xl:pb-8 xl:pr-6 xl:pt-10"
    >
      <Link href={MCP_HREF} className={ON_NAVY_LINK}>
        {TWO_WAYS.mcp.link}
        <LinkArrow />
      </Link>
      <span className={`${T.labelFig} ${ON_NAVY_LABEL}`}>{TWO_WAYS.mcp.gate}</span>
    </Way>
  );
}

/* ── The question, once ─────────────────────────────────────────── */

/* What both halves answer, said once and small: "You asked" in the
   label's 10px cut, then the question at Body large (Inter 500) in paper
   colour, on one line (on a phone the label stands over the question).
   Neither mat draws its own "You" turn. Decoration: both pictures' text
   alternatives say the question.
   At every width it is one ruled row directly over a mat: a hairline in
   the navy's rule on top, 16px over and under its line. From xl it is
   the row between the two heads and the two mats, across both halves,
   and its rule runs to the band's cut right edge with the right mat.
   Stacked it stands between the left half's action and the left mat,
   so the band opens on the first title, not on the question. */
function Asked() {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t py-4 xl:col-span-3 xl:col-start-1 xl:row-start-2 ${ON_NAVY_RULE}`}
    >
      <p className={`${T.labelFig} ${ON_NAVY_LABEL}`}>You asked</p>
      <p className={`text-balance font-medium ${T.bodyLg} ${ON_NAVY}`}>{RANKED.question}</p>
    </div>
  );
}

/* ── Left: Agent Peach, in the app ──────────────────────────────── */

/* The product's own turn: the role label, the answer, the ranked list of
   five (RankedList, 672 wide at most). In the product's units the role
   label takes 22px, a line of the answer 24.375px, then 12px; then the
   list's 1px border and one 77px row a creative (76 and the divider),
   its 44px thumbnail 16px into the row. */
function Answer() {
  return (
    <Turn role="Agent Peach" text={RANKED.answer}>
      <RankedList cards={RANKED.cards} />
    </Turn>
  );
}

/* Under 605px of mat the list cannot be painted at nine tenths, and
   under about 560 it cuts the names short, so a narrow mat holds the
   ranked creatives as compact rows made of the product's own parts: the
   thumbnail, the platform, the name, the score disc, and the list's four
   figures on a line of their own. From 640 the answer's prose stands
   over them (CompactAnswer); on a phone the rows stand alone. */
function CompactRanked() {
  return (
    <Card className="divide-y divide-pb-border overflow-hidden">
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
    </Card>
  );
}

function CompactAnswer() {
  return (
    <Turn role="Agent Peach" text={RANKED.answer}>
      <CompactRanked />
    </Turn>
  );
}

/* ── Right: the same question, in Claude over MCP ───────────────── */

/* The neutral turn around Peachblue's card, drawn from the product's own
   parts: the tool row (Peachblue, get_creatives, limit 5 · last 7 days),
   24px, then the card grid alone, with no frame ground (white with
   hairline cards like the list beside it). The tool row is the right
   half's "Agent Peach" line: who answered, and with which tool. Where it
   wraps (a phone) its arguments hang under "Peachblue". Side by side the
   gap is 48px, not 24 (see SIDE). */
const HANG = "pl-7 [&>:first-child]:-ml-7";

function OverMcp({ width, gap = "gap-6" }: { width: number; gap?: string }) {
  return (
    <div className={`flex flex-col ${gap}`}>
      <ToolCall call={MCP_RANKED.call} className={HANG} />
      <CardGrid width={width} ground={false} />
    </div>
  );
}

/* ── The windows, in each fragment's own units ──────────────────── */

/* From xl the halves stand side by side: the left column 599px (the
   left fragment's 630 layout at 0.90, plus the mat's 32px of margin), the
   48px "or" column, and the rest for the right half, which runs off the
   band's edge: 519px at 1440, 359 at 1280. 630 is the narrowest layout of
   the list that cuts no name short (measured: at 620 "Post-workout,
   pre-brunch, anytime." is cut; at 560 so is "Prospecting · Broad US"),
   and 0.90 is the page's floor, so the left cannot be narrower; equal
   columns would need the left painted at 0.84. The right is the visual
   heavier half (five tall ads), so the two read as one weight.
   Both mats are painted at 0.90 and both windows are SIDE.h (505) of
   their fragment, so they are one height and stand on the band's foot
   side by side. Measured in the fragments' units:
   - Left, 630 wide: the answer on four lines, the list from 131.5, row 5
     from 440.5 to 516.5 with its content to 500.5. The cut at 505 falls
     in row 5's lower padding: all five rows whole.
   - Right, the card grid at a 640 host (three columns of 205), 48px
     under the tool row: the pictures from 81, the pills 454.5 to 474.4,
     the names 482.4 to 500.6, SPEND from 510.6. The cut at 505 falls in
     the white between the names and SPEND. The 48px (24 stacked) is what
     puts that white on the left's: at 24 the names end 24px higher, in
     row 5's thumbnail. At 1440 the band's edge cuts card 3 at 559 of its
     host's 640, after its pills (to 551: "#3 Score 91" whole); at 1280
     it cuts card 2 at 381, after its pills.
   The left reuses the WIDE box, relaid at 630 by two overrides on its
   custom properties (xl:[--fw:630]! xl:[--fh:505]!), which Tailwind has
   to find as literals, so the server sends no extra copy of the answer. */
const SIDE = { left: 630, right: 640, h: 505 };

/* Under xl the mats stack. The left mat is as wide as its fragment and
   margin (never over 716, the 684 list at one to one plus 32), with navy
   beside it where the band is wider, and it chooses one of four layouts
   by a container query on its own inside width, the one nearest its
   size:
   - WIDE, the list at 672 in the app's 684 turn: from 616px of mat
     (0.90) to its own size (1.0, from lg). Rows 1 to 3 whole. From xl
     the same box is relaid at 630 (see SIDE).
   - MID, the list at 560: from 504 to 616 (0.90 to 1.10).
   - NARROW, the answer and the compact rows at 424: from 382 to 504
     (0.90 to 1.19; from 640, where the mat has 384).
   The windows end in row 3's lower padding (the list) or in the white
   over row 2's figures (the compact rows).
   - PHONE, the compact rows alone at 282: under 640 (sm), painted at
     the mat's width and never over one and a quarter. Rows 1 and 2
     whole, the answer's prose left to the wider layouts.
   Answer line counts are measured, not worked out: three at 684, four at
   560, five at 424. */
const WIDE = { w: 684, h: 330 };
const MID = { w: 560, h: 355 };
const NARROW = { w: 424, h: 328.6 };
const PHONE = { w: 282, h: 222 };

/* The right mat under xl: the card at a 1104 host (five columns of 211),
   painted at the left fragment's scale (container query units on the
   band's grid, whose width is the left mat's inside plus its 32px of
   margin), running off the band's right edge. On a phone the card as it
   lays itself out at a 282 host, one column, the tool row on two lines,
   painted at the mat's width up to one and a quarter; its window ends in
   the white under card 1's name, so "#1", "Score 94" and "Little can.
   Big mood." match row 1's 94 above. */
const STACK_R = { w: 1104, h: 491 };
const PHONE_R = { w: 282, h: 628 };
const STACK_R_W =
  "w-[calc((100cqw-32px)*1104/424)] @min-[33.5rem]:w-[calc((100cqw-32px)*1104/560)] @min-[40.5rem]:w-[calc(min(684px,100cqw-32px)*1104/684)]";

/* ── The band ───────────────────────────────────────────────────── */

/* A 4px corner on the product's cards and thumbnails at whatever scale
   they are painted, set from outside the product by its class name. */
const CORNERS = "[&_.rounded-lg]:rounded-[calc(4px/var(--pb-fluid-scale,1))]";

/* The mats' white margin: 8px on a phone, 16px from sm. Both mats have
   4px top corners and square feet: the window cuts them. The left mat's
   inside is a size container, so it takes no width from what it holds;
   from xl it fills its column. */
function LeftMat() {
  return (
    <div
      className={`overflow-hidden rounded-t-[4px] bg-[var(--mn-white)] px-2 pt-2 max-sm:max-w-[368px] sm:max-w-[716px] sm:px-4 sm:pt-4 xl:col-start-1 xl:row-start-3 xl:max-w-none xl:self-end ${CORNERS}`}
    >
      <div className="@container">
        <Shot label={ANSWER_LABEL} ground={false}>
          <div className="max-w-[352px] sm:hidden">
            <Fluid width={PHONE.w} height={PHONE.h}>
              <CompactRanked />
            </Fluid>
          </div>
          <Fluid width={NARROW.w} height={NARROW.h} className="max-sm:hidden @min-[31.5rem]:hidden xl:hidden">
            <CompactAnswer />
          </Fluid>
          <Fluid width={MID.w} height={MID.h} className="@max-[31.5rem]:hidden @min-[38.5rem]:hidden xl:hidden">
            <Answer />
          </Fluid>
          <div className="max-w-[684px] max-sm:hidden max-xl:@max-[38.5rem]:hidden">
            <Fluid width={WIDE.w} height={WIDE.h} className="xl:[--fw:630]! xl:[--fh:505]!">
              <Answer />
            </Fluid>
          </div>
        </Shot>
      </div>
    </div>
  );
}

/* On a phone the right mat has the left mat's margin on all three sides.
   From sm it runs off the band's right edge (a negative margin through
   the band's inset; from xl the grid has no right inset), with its margin
   on the top and left only. */
function RightMat() {
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-t-[4px] bg-[var(--mn-white)] px-2 pt-2 max-sm:max-w-[368px] sm:-mr-12 sm:rounded-tr-none sm:pl-4 sm:pr-0 sm:pt-4 lg:max-xl:-mr-4 xl:col-start-3 xl:row-start-3 xl:mr-0 xl:self-end ${CORNERS}`}
    >
      <Shot label={MCP_LABEL} ground={false}>
        <div className="max-w-[352px] sm:hidden">
          <Fluid width={PHONE_R.w} height={PHONE_R.h}>
            <OverMcp width={PHONE_R.w} />
          </Fluid>
        </div>
        <div className={`max-sm:hidden xl:hidden ${STACK_R_W}`}>
          <Fluid width={STACK_R.w} height={STACK_R.h}>
            <OverMcp width={STACK_R.w} />
          </Fluid>
        </div>
        <div className="max-xl:hidden xl:w-[576px]">
          <Fluid width={SIDE.right} height={SIDE.h}>
            <OverMcp width={SIDE.right} gap="gap-12" />
          </Fluid>
        </div>
      </Shot>
    </div>
  );
}

/* Its two labels, then one grid. From xl three columns (the left half's
   599px, the 48px column between the halves, the right half) and three
   rows: the two titles, the question across all three columns, the two
   mats, tops on one line, both standing on the band's foot. The grid
   drops the band's right inset, so the right mat runs to the band's edge,
   which cuts it clean (PeekBand's bleed). Stacked, one column in reading
   order, which is the DOM's: the left title with its line and action,
   the question, the left mat, "or", the right title with its line and
   action, the right mat. The grid is a size container for the right
   mat's width. */
function TwoWays() {
  return (
    <PeekBand bleed>
      <div
        className={`@container grid grid-cols-[minmax(0,1fr)] ${BAND_X} xl:grid-cols-[599px_48px_minmax(0,1fr)] xl:pr-0`}
      >
        <AppWay />
        <Asked />
        <LeftMat />
        <OrRow />
        <McpWay />
        <RightMat />
      </div>
    </PeekBand>
  );
}

/* ── Under the band: the caption ────────────────────────────────── */

/* 24px under the band, on the band's inset: bullet 3 in the bullets'
   item style at Small. Both mats print the window, so the caption is the
   picture's claim, for both halves. On a phone, on the page's column. */
function Foot({ claim }: { claim: string }) {
  return (
    <div className="mt-6 sm:px-12 lg:max-xl:px-4">
      <p className={`flex max-w-[640px] gap-4 ${T.small} ${PAPER.body}`}>
        <span className="mt-[7.5px] size-1.5 shrink-0 bg-[var(--mn-peach)]" aria-hidden="true" />
        <span className="flex-1 text-pretty">{claim}</span>
      </p>
    </div>
  );
}

/* ── The head ───────────────────────────────────────────────────── */

/* 48px under the strip: the h2 at Statement, "anything." on its own line
   from lg; 24px under it the subline that names the two ways (Body
   large). The section's trial link is not here: it is the left half's
   action on the band (AppWay). Beside them, bullets 1 and 2 and More (4
   and 5), the list's top rule on the heading's cap line. From lg to xl on the 12-column grid (the heading
   on columns 1 to 7, the list on 8 to 12); from xl on the band's own
   columns (its 48px inset, the left half, the 48px column between the
   halves, the right half), so the list starts on the line the right
   title's mark and the right mat start on. */
/* The heading's cap line, measured: Fraunces 600 at Statement's 1.05
   puts the capitals' top 0.175em under the line box's top (9.8px at
   56px). */
const CAP_LINE = "lg:pt-[calc(clamp(34px,3.9vw,56px)*0.175)]";

function Head({ shown, more }: { shown: string[]; more: string[] }) {
  return (
    <div
      className={`grid grid-cols-[minmax(0,1fr)] gap-x-16 pt-12 lg:grid-cols-12 xl:grid-cols-[48px_599px_48px_minmax(0,1fr)] xl:gap-x-0 ${INSET}`}
    >
      <div className="lg:col-span-7 xl:col-span-2 xl:col-start-1">
        <h2 className={`${T.statement} ${PAPER.ink}`}>
          <Accent text={AGENT_PEACH.headline} phrase="anything." className={`${PAPER.accentLg} lg:block`} />
        </h2>
        <p className={`mt-6 max-w-[36em] text-pretty ${T.bodyLg} ${PAPER.body}`}>{TWO_WAYS.sub}</p>
      </div>
      <div className={`mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0 xl:col-span-1 xl:col-start-4 ${CAP_LINE}`}>
        <Bullets items={shown} />
        <More>
          <Bullets items={more} open />
        </More>
      </div>
    </div>
  );
}

/* ── The section ────────────────────────────────────────────────── */

export function AgentPeach() {
  const [b1, b2, b3, b4, b5] = AGENT_PEACH.bullets;
  return (
    <Sheet id={ID} className={SECTION_END}>
      <SectionMarker n={2}>
        <p>{AGENT_PEACH.eyebrow}</p>
      </SectionMarker>
      <Head shown={[b1, b2]} more={[b4, b5]} />
      <div className={`pt-12 ${INSET}`}>
        <TwoWays />
        <Foot claim={b3} />
      </div>
    </Sheet>
  );
}
