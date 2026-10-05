import type { ReactNode } from "react";
import { AdThumb, cx } from "@/components/product/ui";
import {
  CARD_FONT,
  CARD_STYLE,
  MCP_COMPARE,
  MCP_RANKED,
  MCP_SINGLE,
  archetypeOf,
  cardFmt,
  tagChips,
  type CardCreative,
} from "./data";

/* Peachblue's creative card, as an MCP Apps host renders it inside a
   reply: the card seven of the MCP server's tools return (get_creatives,
   view_creative, rank_ads, search_creatives, get_ad_details,
   get_creative_detail, compare_ads). Three layouts, chosen by the card
   from the tool result: one creative, a grid of up to five, and an A
   against B compare.

   Each export takes width: the width the host gives the card's frame, in
   px. The card lays itself out from it with its own rules (the grid is
   repeat(auto-fit, minmax(200px, 1fr)) with 12px gaps; the single layout
   stacks at 540 and under), so a width picks the layout the card itself
   would show there. ground false drops the frame's own cream ground and
   its 12px padding and leaves the card alone at that width.

   Faithful to the app: layout, fields and their order, labels, figures
   and their formatting, the frame's ground and padding, the card's own
   palette, its system sans and its system serif for names, line clamps,
   the 9:16 image wells, the winner dots.

   Where this differs from the app, on purpose, so it sits with the site's
   pictures (and passes scripts/lint-tells.mjs):
   - Corners: 4px everywhere (the app: 14px on the single and compare
     cards, 12px on grid cards, 999px on the two pills, 8px on metric
     tiles, the archetype box and the compare image wells; 4px on tag
     chips, as here). Written as 4px divided by the paint scale, so they
     stay 4px on screen when a page paints the card smaller or larger.
   - No shadow (the app: a soft two-layer shadow on every card).
   - The score pill is flat #EC6F45, the foot stop of the app's two-stop
     peach (#F9B295 to #EC6F45, top to bottom). The rank pill is as the app.
   - Caps labels are tracked 0.1em; the app tracks the score label, the
     compare row labels and the archetype label 0.12em (the metric labels
     are 0.1em in both).
   - The single layout leaves out the ad's headline line (the app prints
     the ad copy's headline in quotes, slanted, when the analysis has one;
     the sample account records no ad copy) and the top placement and top
     demographic line (get_creatives does not return them).
   - Light scheme only; the app's card also follows a dark scheme.
   - Divs and spans for the app's article and heading elements. */

/** 4px on screen at any paint scale. */
const R4 = "rounded-[calc(4px/var(--pb-fluid-scale,1))]";
const FG = "text-[color:var(--mcp-fg)]";
const FG_MUTED = "text-[color:var(--mcp-fg-muted)]";
const LINE = "border-[color:var(--mcp-border)]";
const WELL = "bg-[var(--mcp-muted)]";
/** The caps label cut. */
const CAPS = "uppercase tracking-[0.1em] font-medium";

/* The frame the host gives the card: the card's body rule (13px system
   sans at 1.45, tabular figures, the cream ground, 12px of padding, never
   under 320px tall). */
export function CardFrame({
  width,
  ground = true,
  className,
  children,
}: {
  width?: number;
  ground?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx("tnum text-[13px] leading-[1.45]", FG, ground && "min-h-[320px] bg-[var(--mcp-bg)] p-3", ground && R4, className)}
      style={{ ...CARD_STYLE, width, fontFamily: CARD_FONT.sans }}
    >
      {children}
    </div>
  );
}

function ScorePill({ score }: { score: number }) {
  return (
    <span className={cx("inline-flex items-center gap-1 bg-[var(--mcp-peach)] px-2 py-0.5 text-[11px] font-semibold tracking-[0.02em] text-white", R4)}>
      Score {Math.round(score)}
    </span>
  );
}

function RankPill({ rank }: { rank: number }) {
  return (
    <span className={cx("inline-flex items-center bg-[var(--mcp-fg)] px-2 py-0.5 text-[10.5px] font-semibold tracking-[0.02em] text-[color:var(--mcp-bg)]", R4)}>
      #{rank}
    </span>
  );
}

/* A creative's name in the card's system serif (the app's stack, not the
   site's display face). */
function Name({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("font-semibold tracking-[-0.01em] [overflow-wrap:anywhere]", FG, className)} style={{ fontFamily: CARD_FONT.serif }}>
      {children}
    </div>
  );
}

/* The ad, whole, in a well of its own aspect (the card reads it from the
   creative's aspect_ratio tag). A 9:16 file fills a 9:16 well exactly, so
   cover and the app's contain paint the same pixels. */
function WholeAd({ c, className }: { c: CardCreative; className?: string }) {
  return (
    <AdThumb
      imageUrl={c.image}
      headline={c.name}
      seed={c.key}
      ratio={c.aspect === "1:1" ? "square" : "portrait"}
      size="md"
      className={cx("rounded-none", WELL, className)}
    />
  );
}

/* ── Grid: up to five creatives ───────────────────────────────────── */

function gridRows(c: CardCreative): Array<[string, string]> {
  return [
    ["Spend", cardFmt.money(c.spend)],
    ["Results", cardFmt.num(c.results)],
    ["CTR", cardFmt.pct(c.ctr)],
    ["CPA", cardFmt.money(c.cpa)],
    ["ROAS", cardFmt.x(c.roas)],
  ];
}

function GridCard({ c, rank }: { c: CardCreative; rank: number }) {
  return (
    <div className={cx("flex flex-col overflow-hidden border bg-white", LINE, R4)}>
      <WholeAd c={c} />
      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-center gap-1.5">
          <RankPill rank={rank} />
          <ScorePill score={c.score} />
        </div>
        <Name className="line-clamp-2 text-[14px] leading-[1.3]">{c.name}</Name>
        <div className="mt-0.5 flex flex-col gap-1">
          {gridRows(c).map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between text-[11.5px]">
              <span className={cx("text-[10px]", CAPS, FG_MUTED)}>{label}</span>
              <span className={cx("font-semibold", FG)}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* CardGrid: what get_creatives (limit 2 to 5) or rank_ads returns: the
   ads side by side, each with its rank, score, name and five figures.
   Defaults to the top five of Agent Peach's ranked answer.
   Widths: 664 gives three columns of 205 (the second row holds two),
   1128 gives five of 211, 282 one column of 258. */
export function CardGrid({
  creatives = MCP_RANKED.creatives,
  width = 664,
  ground = true,
  className,
}: {
  creatives?: CardCreative[];
  width?: number;
  ground?: boolean;
  className?: string;
}) {
  return (
    <CardFrame width={width} ground={ground} className={className}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-start gap-3">
        {creatives.slice(0, 5).map((c, i) => (
          <GridCard key={c.key} c={c} rank={i + 1} />
        ))}
      </div>
    </CardFrame>
  );
}

/* ── Compare: A against B ─────────────────────────────────────────── */

type CompareRow = { label: string; a: string; b: string; winner: "a" | "b" | null };

/* The card's six rows. Score, CTR, CPA and ROAS mark a winner (CPA lower
   is better); spend and results are volume and mark none. */
function compareRows(a: CardCreative, b: CardCreative): CompareRow[] {
  const defs: Array<{ label: string; av: number; bv: number; fmt: (n: number) => string; lowBetter?: boolean; comparable: boolean }> = [
    { label: "Score", av: a.score, bv: b.score, fmt: (n) => String(Math.round(n)), comparable: true },
    { label: "Spend", av: a.spend, bv: b.spend, fmt: cardFmt.money, comparable: false },
    { label: "Results", av: a.results, bv: b.results, fmt: cardFmt.num, comparable: false },
    { label: "CTR", av: a.ctr, bv: b.ctr, fmt: cardFmt.pct, comparable: true },
    { label: "CPA", av: a.cpa, bv: b.cpa, fmt: cardFmt.money, lowBetter: true, comparable: true },
    { label: "ROAS", av: a.roas, bv: b.roas, fmt: cardFmt.x, comparable: true },
  ];
  return defs.map(({ label, av, bv, fmt, lowBetter, comparable }) => {
    let winner: "a" | "b" | null = null;
    if (comparable && av !== bv) winner = lowBetter ? (av < bv ? "a" : "b") : av > bv ? "a" : "b";
    return { label, a: fmt(av), b: fmt(bv), winner };
  });
}

function WinnerDot() {
  return <span className="mx-1 inline-block size-1.5 rounded-full bg-[var(--mcp-good)] align-middle" />;
}

/* CardCompare: what compare_ads returns: both ads in square wells with
   their names and scores, six mirrored rows, and the winner by name.
   Defaults to the agent's compare question. Widths: 642 is the 618px
   card inside the frame; the two sides stay side by side at any width. */
export function CardCompare({
  a = MCP_COMPARE.a,
  b = MCP_COMPARE.b,
  winner = MCP_COMPARE.winner,
  width = 642,
  ground = true,
  className,
}: {
  a?: CardCreative;
  b?: CardCreative;
  /** The winner's name, or null for a tie (no summary line). */
  winner?: string | null;
  width?: number;
  ground?: boolean;
  className?: string;
}) {
  return (
    <CardFrame width={width} ground={ground} className={className}>
      <div className={cx("overflow-hidden border bg-white", LINE, R4)}>
        <div className="grid grid-cols-2">
          {[a, b].map((c, i) => (
            <div key={c.key} className={cx("flex min-w-0 flex-col gap-2 p-3.5", i === 0 && "border-r", LINE)}>
              <AdThumb
                imageUrl={c.image}
                headline={c.name}
                seed={c.key}
                ratio="square"
                fit="contain"
                size="md"
                className={cx(WELL, "[&>img]:bg-[var(--mcp-muted)]", R4)}
              />
              <Name className="line-clamp-2 text-[14px] leading-[1.25]">{c.name}</Name>
              <span className={cx("text-[11px] tracking-[0.02em]", FG_MUTED)}>Score {Math.round(c.score)}</span>
            </div>
          ))}
        </div>
        <div className={cx("border-t", LINE)}>
          {compareRows(a, b).map((r, i) => (
            <div
              key={r.label}
              className={cx("grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3.5 py-2 text-[12.5px]", i > 0 && "border-t", LINE)}
            >
              <span className={cx("text-right", FG, r.winner === "a" ? "font-bold" : "font-medium")}>
                {r.a}
                {r.winner === "a" && <WinnerDot />}
              </span>
              <span className={cx("min-w-14 text-center text-[9.5px]", CAPS, FG_MUTED)}>{r.label}</span>
              <span className={cx("text-left", FG, r.winner === "b" ? "font-bold" : "font-medium")}>
                {r.winner === "b" && <WinnerDot />}
                {r.b}
              </span>
            </div>
          ))}
        </div>
        {winner && (
          <div className={cx("border-t px-3.5 py-2.5 text-[12px]", LINE, WELL, FG)}>
            Winner: <span className="font-bold">{winner}</span>
          </div>
        )}
      </div>
    </CardFrame>
  );
}

/* ── Single: one creative ─────────────────────────────────────────── */

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className={cx("flex flex-col gap-0.5 px-2 py-1.5", WELL, R4)}>
      <span className={cx("text-[9.5px]", CAPS, FG_MUTED)}>{label}</span>
      <span className={cx("text-[14px] font-semibold", FG)}>{value}</span>
    </div>
  );
}

/* CardSingle: what a one-creative result returns (get_creatives with
   limit 1, view_creative, get_creative_detail, get_ad_details): the ad in
   a 220px column, the score and its label, the name, five figure tiles,
   the archetype, the tag chips and the reach line. Defaults to the
   week's winner. Widths: 744 is the card at its 720px cap; at 540 and
   under the ad stacks over the body, as the card does. */
export function CardSingle({
  creative = MCP_SINGLE.creative,
  width = 744,
  ground = true,
  className,
}: {
  creative?: CardCreative;
  width?: number;
  ground?: boolean;
  className?: string;
}) {
  const c = creative;
  const stacked = width <= 540;
  const archetype = archetypeOf(c.tags);
  const tags = tagChips(c.tags);
  const reach = [
    c.adCount ? `${c.adCount} ad${c.adCount === 1 ? "" : "s"}` : null,
    c.campaignCount ? `${c.campaignCount} campaign${c.campaignCount === 1 ? "" : "s"}` : null,
    c.platforms.length ? c.platforms.join(", ") : null,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <CardFrame width={width} ground={ground} className={className}>
      <div className={cx("max-w-[720px] overflow-hidden border bg-white", LINE, R4)}>
        <div className={cx("grid", stacked ? "grid-cols-1" : "grid-cols-[220px_1fr]")}>
          <WholeAd c={c} />
          <div className="flex min-w-0 flex-col gap-2.5 p-4">
            <div className="flex items-center gap-2 text-[12px]">
              <ScorePill score={c.score} />
              <span className={cx("text-[11px]", CAPS, FG_MUTED)}>{c.scoreLabel}</span>
            </div>
            <Name className="text-[18px] leading-[1.2]">{c.name}</Name>
            <div className="mt-1 grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-2">
              <Metric label="Spend" value={cardFmt.money(c.spend)} />
              <Metric label="Results" value={cardFmt.num(c.results)} />
              <Metric label="CTR" value={cardFmt.pct(c.ctr)} />
              <Metric label="CPA" value={cardFmt.money(c.cpa)} />
              <Metric label="ROAS" value={cardFmt.x(c.roas)} />
            </div>
            {archetype && (
              <div className={cx("mt-0.5 flex flex-col gap-[3px] px-3 py-2.5", WELL, R4)}>
                <span className={cx("text-[9.5px]", CAPS, FG_MUTED)}>Archetype</span>
                <span className={cx("text-[12px] leading-[1.4]", FG)}>{archetype}</span>
              </div>
            )}
            {tags.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {tags.map((t) => (
                  <span key={t} className={cx("px-1.5 py-0.5 text-[10.5px] font-medium", WELL, FG_MUTED, R4)}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            {reach && <div className={cx("mt-0.5 text-[11px]", FG_MUTED)}>{reach}</div>}
          </div>
        </div>
      </div>
    </CardFrame>
  );
}
