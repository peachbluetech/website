import type { ReactNode } from "react";
import { PeachMark, cx } from "@/components/product/ui";
import { CardCompare, CardGrid } from "./CreativeCard";
import { MCP_COMPARE, MCP_RANKED, callParams, type ToolCallSpec } from "./data";

/* The neutral turn around the card: the question, one row naming the
   Peachblue tool that answered it, then the card the tool returned.

   Drawn by us in Peachblue's own line, not as any chat product: no window,
   no avatar, no logo but Peachblue's own p, no role label on any turn, no
   reply text. The client is not drawn and not named; a page names it only
   in its own link text. MCP Apps cards render in chat hosts, so nothing
   here looks like a terminal.

   The colours are the homepage's paper values, read from its
   custom properties when the turn sits on that page and written out as
   the same values everywhere else: navy ink, muted, the 15% navy rule,
   paper-2. Type is the site's: Inter for words, JetBrains Mono for the
   tool and its arguments. */

const NAVY = "text-[color:var(--mn-paper-ink,#13214B)]";
const MUTED = "text-[color:var(--mn-paper-muted,#66665F)]";
const RULE = "border-[color:var(--mn-paper-rule,rgba(19,33,75,0.15))]";
const PAPER_2 = "bg-[var(--mn-paper-2,#F4F0E8)]";
/** 4px on screen at any paint scale. */
const R4 = "rounded-[calc(4px/var(--pb-fluid-scale,1))]";

/* ToolCall: one row, 32px: a 20px hairline square holding the p in navy,
   "Peachblue" in Inter 13/600, the tool's name in mono 12/500 navy, then
   the count and the window in mono, muted. Under about 330px the
   arguments wrap to a second line as one piece. */
export function ToolCall({ call, className }: { call: ToolCallSpec; className?: string }) {
  const params = callParams(call);
  return (
    <div className={cx("flex min-h-8 flex-wrap items-center gap-x-2 gap-y-0.5", className)}>
      <span className={cx("grid size-5 shrink-0 place-items-center border bg-white", RULE, NAVY)}>
        <PeachMark size={18} />
      </span>
      <span className={cx("font-sans text-[13px] font-semibold leading-5", NAVY)}>Peachblue</span>
      <span className={cx("font-mono text-[12px] font-medium leading-5", NAVY)}>{call.tool}</span>
      {params.length > 0 && <span className={cx("whitespace-nowrap font-mono text-[12px] leading-5", MUTED)}>{params.join(" · ")}</span>}
    </div>
  );
}

/* AskedChip: the question as a plain chip, right-aligned: Inter 14/500
   navy on paper-2, 4px, no avatar. you prints "You" over it in the muted
   12px label the agent's own turns use; off by default (the spec draws the
   chip bare). */
export function AskedChip({ question, you = false, className }: { question: string; you?: boolean; className?: string }) {
  return (
    <div className={cx("flex flex-col items-end", className)}>
      {you && <div className={cx("mb-1 font-sans text-[12px] font-medium", MUTED)}>You</div>}
      <div className={cx("max-w-[85%] px-3 py-2 font-sans text-[14px] font-medium leading-5", PAPER_2, NAVY, R4)}>{question}</div>
    </div>
  );
}

/* McpTurn: the chip (when there is a question), 12px, the tool row, 12px,
   the card. As wide as its container; give it the card's width. */
export function McpTurn({
  question,
  you = false,
  call,
  className,
  children,
}: {
  /** null leaves the chip out, where the page already says the question. */
  question?: string | null;
  you?: boolean;
  call: ToolCallSpec;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("flex flex-col gap-3", className)}>
      {question && <AskedChip question={question} you={you} />}
      <ToolCall call={call} />
      {children}
    </div>
  );
}

type TurnProps = {
  /** Draw the question chip. false where the page's own lead asks it. */
  asked?: boolean;
  /** Print "You" over the chip. */
  you?: boolean;
  /** The card frame's width: the turn's design width. */
  width?: number;
  /** The card frame's cream ground and padding. */
  ground?: boolean;
};

/* McpRanked: "Show me my top five creatives this week", get_creatives
   (limit 5, last 7 days), and the card grid with the same five creatives
   and scores as Agent Peach's ranked answer.
   Design width 664 (three columns). */
export function McpRanked({ asked = true, you = false, width = 664, ground = true }: TurnProps) {
  return (
    <McpTurn question={asked ? MCP_RANKED.question : null} you={you} call={MCP_RANKED.call}>
      <CardGrid width={width} ground={ground} />
    </McpTurn>
  );
}

/* McpCompare: "Compare Zero sugar. All fizz. with Currently obsessed",
   compare_ads (last 7 days), and the compare card: 94 against 58.
   Design width 642. */
export function McpCompare({ asked = true, you = false, width = 642, ground = true }: TurnProps) {
  return (
    <McpTurn question={asked ? MCP_COMPARE.question : null} you={you} call={MCP_COMPARE.call}>
      <CardCompare width={width} ground={ground} />
    </McpTurn>
  );
}
