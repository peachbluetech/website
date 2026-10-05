import type { ReactNode } from "react";
import { Send } from "lucide-react";
import {
  Card,
  PeachMark,
  PlatformBadge,
  cx,
  formatCurrency,
  formatCurrencyCompact,
  formatPercent,
  formatRoas,
  metaForScore,
} from "@/components/product/ui";
import type { SampleCreative } from "@/components/product/sample";
import { COMPOSER_PLACEHOLDER, type AgentCard } from "./data";

/* The pieces the agent page draws inline: the turn, the three answer
   cards and the composer. Classes follow the app's agent page; hover,
   focus and transition classes are left out because nothing here can be
   pointed at. */

/* Figures as the agent's cards print them: CTR and ROAS to two decimals,
   CPA in dollars and cents, spend compact with a lower-case k. */
const fmt = {
  ctr: (c: SampleCreative) => formatPercent(c.ctr),
  cpa: (c: SampleCreative) => formatCurrency(c.cpa),
  roas: (c: SampleCreative) => formatRoas(c.roas),
  spend: (c: SampleCreative) => formatCurrencyCompact(c.spend),
};

/** Label over value: the cards' only figure style. */
export function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11.5px] text-pb-fg-muted">{label}</div>
      <div className="text-[13px] font-semibold font-mono tnum text-pb-fg">{value}</div>
    </div>
  );
}

/* The score as a flat disc in its tier colour: 32px on the page, 28px in
   the sheet. The one coloured figure on the screen. */
export function ScoreCircle({ score, small = false, className }: { score: number; small?: boolean; className?: string }) {
  return (
    <div
      className={cx(
        "rounded-full text-white font-bold flex items-center justify-center shrink-0",
        small ? "size-7 text-[10.5px]" : "size-8 text-[11px]",
        metaForScore(score).fill,
        className,
      )}
    >
      {Math.round(score)}
    </div>
  );
}

/* The 120px image column of the spotlight and compare cards. The image
   sets the card's height (a 9:16 creative stands 213px tall) and is shown
   whole. */
function TallThumb({ creative, well }: { creative: SampleCreative; well: string }) {
  return (
    <div className={cx("w-[120px] shrink-0 overflow-hidden", well)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={creative.medium} alt="" width={360} height={640} loading="lazy" decoding="async" className="w-full h-full object-cover" />
    </div>
  );
}

/** A turn: a muted role label, then plain text on the ground. No bubble for either side. */
export function Turn({ role, text, children }: { role: "You" | "Agent Peach"; text?: string; children?: ReactNode }) {
  return (
    <div>
      <div className="text-[12px] mb-1 text-pb-fg-muted font-medium">{role}</div>
      {text && <div className="whitespace-pre-wrap leading-relaxed mb-3 text-pb-fg text-[15px]">{text}</div>}
      {children}
    </div>
  );
}

/* One creative: the image at left, platform and campaign over the name,
   the score, four figures, one observation. 520px wide, 215px tall.
   Followed by the two actions an answer ends on. */
export function SpotlightCard({ card }: { card: AgentCard }) {
  const c = card.creative;
  return (
    <>
      <Card className="mb-3 max-w-[520px] overflow-hidden">
        <div className="flex">
          <TallThumb creative={c} well="bg-pb-muted/40" />
          <div className="flex-1 p-4 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <PlatformBadge platform={c.platform} />
                  {card.adCount && card.adCount > 1 && <span className="text-[11px] text-pb-fg-muted">{card.adCount} ads</span>}
                  {card.campaignCount && card.campaignCount > 1 ? (
                    <span className="text-[11px] text-pb-fg-muted">{card.campaignCount} campaigns</span>
                  ) : card.campaign ? (
                    <span className="text-[11px] text-pb-fg-muted truncate">{card.campaign}</span>
                  ) : null}
                </div>
                <div className="text-[13px] font-medium leading-tight text-pb-fg truncate">{c.name}</div>
              </div>
              <ScoreCircle score={c.score} />
            </div>
            <div className="grid grid-cols-4 gap-2 mb-3">
              <MiniMetric label="CTR" value={fmt.ctr(c)} />
              <MiniMetric label="CPA" value={fmt.cpa(c)} />
              <MiniMetric label="ROAS" value={fmt.roas(c)} />
              <MiniMetric label="Spend" value={fmt.spend(c)} />
            </div>
            {card.insight && (
              <div className="pt-3 border-t border-pb-border">
                <div className="flex items-start gap-1.5 text-[11.5px] leading-relaxed text-pb-fg/80">
                  <div className="mt-1.5 size-1.5 rounded-full bg-pb-peach-500 shrink-0" />
                  <span className="line-clamp-2">{card.insight}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-8 px-3 rounded-lg bg-pb-fg text-pb-bg text-[12.5px] font-medium inline-flex items-center">Scale this ad</span>
        <span className="h-8 px-3 rounded-lg border border-pb-border-control text-[12.5px] font-medium text-pb-fg-secondary inline-flex items-center">
          Full analysis
        </span>
      </div>
    </>
  );
}

/* Two or more creatives: one 76px row each. Rank, 44px square thumbnail,
   platform and campaign over the name, four figures, the score. 672px. */
export function RankedList({ cards }: { cards: AgentCard[] }) {
  return (
    <Card className="mb-3 max-w-2xl divide-y divide-pb-border overflow-hidden">
      {cards.map((card, i) => {
        const c = card.creative;
        return (
          <div key={c.key} className="flex items-center gap-4 p-4">
            <span className="w-5 text-center font-mono text-[13px] text-pb-fg-muted">{i + 1}</span>
            <div className="size-11 rounded-lg overflow-hidden bg-pb-muted/40 flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.thumb} alt="" width={44} height={44} loading="lazy" decoding="async" className="size-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <PlatformBadge platform={c.platform} className="h-[16px] px-1 text-[8.5px]" />
                {card.campaignCount && card.campaignCount > 1 ? (
                  <span className="text-[11px] text-pb-fg-muted">{card.campaignCount} campaigns</span>
                ) : card.campaign ? (
                  <span className="text-[11px] text-pb-fg-muted truncate">{card.campaign}</span>
                ) : null}
              </div>
              <div className="text-[13px] font-medium truncate text-pb-fg">{c.name}</div>
            </div>
            <div className="flex items-center gap-4 tnum">
              <MiniMetric label="Spend" value={fmt.spend(c)} />
              <MiniMetric label="CTR" value={fmt.ctr(c)} />
              <MiniMetric label="CPA" value={fmt.cpa(c)} />
              <MiniMetric label="ROAS" value={fmt.roas(c)} />
            </div>
            <ScoreCircle score={c.score} />
          </div>
        );
      })}
    </Card>
  );
}

/* Winner and challenger side by side, 330px each. The winner takes a
   green hairline and a faint green ground; the challenger stays a plain
   card. Side A is the left card whether or not it wins. */
export function ComparePair({ a, b, winner }: { a: SampleCreative; b: SampleCreative; winner: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-3 max-w-2xl">
      {[a, b].map((c) => {
        const wins = c.key === winner;
        return (
          <Card key={c.key} className={cx("overflow-hidden", wins && "border-pb-good/40 bg-pb-good-bg/30")}>
            <div className="flex">
              <TallThumb creative={c} well="bg-pb-muted/30" />
              <div className="flex-1 p-4 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className={cx("text-[12px] font-semibold", wins ? "text-pb-good" : "text-pb-fg-muted")}>{wins ? "Winner" : "Challenger"}</span>
                  <ScoreCircle score={c.score} />
                </div>
                <div className="text-[13px] font-medium truncate text-pb-fg mb-3">{c.name}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <MiniMetric label="CTR" value={fmt.ctr(c)} />
                  <MiniMetric label="ROAS" value={fmt.roas(c)} />
                  <MiniMetric label="Spend" value={fmt.spend(c)} />
                  <MiniMetric label="CPA" value={fmt.cpa(c)} />
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

/** The peach square that sends. Half strength while the field is empty. */
export function SendButton({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cx("size-8 rounded-md bg-pb-peach-500 text-white grid place-items-center", disabled && "opacity-50")}>
      <Send className="size-3.5" strokeWidth={2.5} />
    </div>
  );
}

/* The composer once a conversation is under way: a white card pinned
   under the thread, a small label with the mark, a 44px field. */
export function ThreadComposer({ value }: { value?: string }) {
  return (
    <div className="mt-4 shrink-0">
      <Card className="overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <PeachMark size={14} className="text-pb-peach-500" />
            <div className="text-[12.5px] text-pb-fg-muted font-medium">Ask Agent Peach</div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-pb-border-control bg-pb-card px-3 h-11">
            <div className={cx("flex-1 bg-transparent text-[14px]", value ? "text-pb-fg" : "text-pb-fg-muted")}>{value || COMPOSER_PLACEHOLDER}</div>
            <SendButton disabled={!value} />
          </div>
        </div>
      </Card>
    </div>
  );
}

/* The thread column: 16px of padding, turns 12px apart, the composer
   under them when asked for. Fills its container up to the app's 960px. */
export function ThreadColumn({ composer = false, children }: { composer?: boolean; children: ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[960px]">
        <div className="p-4 flex flex-col">
          <div className="flex-1 space-y-3 pr-1">{children}</div>
          {composer && <ThreadComposer />}
        </div>
      </div>
    </div>
  );
}
