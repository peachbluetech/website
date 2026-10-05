import { ArrowRight, CornerDownLeft, ExternalLink, X } from "lucide-react";
import { Card, PeachMark, PlatformBadge, cx, formatCurrency, formatCurrencyCompact, formatPercent, formatRoas } from "@/components/product/ui";
import { SHEET } from "./data";
import { ScoreCircle } from "./parts";

/* AskPeachSheet: the side sheet that opens from any "Ask Peach" in the
   app. The header says what the reader was looking at and in which
   window; the body is the question, the answer, the creative it is about
   and the Sources trail (what was read, and the period each read
   covered); the white footer takes a follow-up and hands off to the full
   page.

   It is a floating surface: stone ground, a hairline on its left edge and
   the lift shadow. In the app it runs the full height of the window, flush
   right, with no scrim, so the page behind stays readable.

   Design width: 480 (its real width). Natural height: 582. Pass height to
   stand it taller (the body takes the slack), or className="h-full" to
   fill an overlay. */
export function AskPeachSheet({ height, className }: { height?: number; className?: string }) {
  const c = SHEET.card.creative;
  return (
    <div className={cx("w-[480px] flex flex-col bg-pb-bg border-l border-pb-border shadow-pb-lift", className)} style={{ height }}>
      {/* Header */}
      <div className="flex items-start gap-3 px-5 py-4 border-b border-pb-border">
        <div className="size-7 rounded-full bg-pb-peach-500 flex items-center justify-center shrink-0 mt-0.5">
          <PeachMark size={15} color="#ffffff" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12px] text-pb-fg-muted font-medium">Ask Peach</div>
          <div className="text-[13.5px] font-medium text-pb-fg truncate">{SHEET.subject}</div>
          <div className="mt-0.5 flex items-center gap-2 text-[11.5px] text-pb-fg-muted">
            <span className="tnum">{SHEET.window}</span>
          </div>
        </div>
        <div className="size-8 rounded-lg flex items-center justify-center text-pb-fg-muted shrink-0">
          <X className="size-4" />
        </div>
      </div>

      {/* Body: one finished turn */}
      <div className="flex-1 overflow-hidden px-5 py-4 space-y-5">
        <div>
          <div className="text-[12px] text-pb-fg-muted font-medium mb-1">You asked</div>
          <div className="text-[13.5px] text-pb-fg mb-3">{SHEET.question}</div>

          <div className="whitespace-pre-wrap leading-relaxed text-[14px] text-pb-fg">{SHEET.answer}</div>

          <Card className="mt-3 divide-y divide-pb-border overflow-hidden">
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="size-9 rounded-lg overflow-hidden bg-pb-muted/40 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.thumb} alt="" width={36} height={36} loading="lazy" decoding="async" className="size-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-medium truncate text-pb-fg">{c.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <PlatformBadge platform={c.platform} className="h-[16px] px-1 text-[8.5px]" />
                  <span className="text-[11px] text-pb-fg-muted tnum truncate">
                    {formatCurrencyCompact(c.spend)} · {formatPercent(c.ctr)} CTR · {formatCurrency(c.cpa)} CPA · {formatRoas(c.roas)} ROAS
                  </span>
                </div>
              </div>
              <ScoreCircle score={c.score} small />
            </div>
          </Card>

          <div className="mt-3 pt-3 border-t border-pb-border">
            <div className="text-[12px] text-pb-fg-muted font-medium mb-1">Sources</div>
            <ul className="space-y-0.5">
              {SHEET.trail.map((s) => (
                <li key={s.label} className="text-[11.5px] text-pb-fg-muted flex items-baseline gap-1.5">
                  <span className="size-1 rounded-full bg-pb-peach-500 shrink-0 translate-y-[-2px]" />
                  <span>
                    {s.label}
                    <span className="tnum"> · {s.window}</span>
                  </span>
                </li>
              ))}
            </ul>
            <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-pb-peach-600 underline-offset-2">
              Open this in the app <ArrowRight className="size-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Footer: follow-up and the hand-off to the full page */}
      <div className="border-t border-pb-border px-4 py-3 bg-pb-card">
        <div className="flex items-center gap-2 rounded-lg border border-pb-border bg-pb-muted/40 px-3 h-10">
          <div className="flex-1 bg-transparent text-[13.5px] text-pb-fg-muted">Follow up...</div>
          <div className="size-7 rounded-md bg-pb-peach-500 text-white grid place-items-center opacity-50">
            <CornerDownLeft className="size-3.5" strokeWidth={2.5} />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11.5px] text-pb-fg-muted">
          <span>Esc closes</span>
          <span className="inline-flex items-center gap-1 font-medium text-pb-peach-600 underline-offset-2">
            Open in Agent Peach
            <ExternalLink className="size-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
