import { Crown } from "lucide-react";
import { Card, Fig, PlatformBadge, cx, formatCurrency } from "@/components/product/ui";
import { CHALLENGERS, ECON, HERO } from "./data";
import { EconSection, RowThumb } from "./parts";

/* HeroBench: the two cards of "The hero and the bench". Left, the hero
   (the largest 30-day spender) on the page's one peach-edged card with
   its dot texture; right, the proven challengers ready behind it.

   Design width: 1152. Two 568px cards side by side, equal height: 225px.
   narrow: design width 560. The cards stack: 355px tall.
   header adds the section header and its one-line takeaway above: 74px
   more at either width (299px and 429px). */
export function HeroBench({
  narrow = false,
  header = false,
  className,
}: {
  /** The 560 layout: one column. */
  narrow?: boolean;
  /** Show the section header ("The hero and the bench", "3 ready") and takeaway above the cards. */
  header?: boolean;
  className?: string;
}) {
  const hero = HERO.creative;
  const n = ECON.provenChallengers;
  return (
    <div className={className}>
      {header && (
        <EconSection
          title="The hero and the bench"
          status={{ label: `${n} ready`, tone: "good" }}
          takeaway={
            <>
              {hero.name} holds <Fig>{ECON.heroSharePct}%</Fig> of 30-day spend with <Fig>{n}</Fig> proven challenger{n === 1 ? "" : "s"} ready
              behind it.
            </>
          }
        />
      )}
      <div className={cx("grid gap-4", header && "mt-4", !narrow && "grid-cols-2")}>
        <Card className="relative overflow-hidden p-5 border-pb-peach-200">
          <div className="absolute inset-y-0 right-0 w-28 pb-dots text-pb-peach-500/15 pointer-events-none" />
          <div className="flex items-center gap-1.5 text-[12.5px] text-pb-peach-600">
            <Crown className="size-3.5" strokeWidth={2} />
            Hero
          </div>
          <div className="mt-3 flex items-center gap-3.5">
            <RowThumb image={hero.image} name={hero.name} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-pb-fg truncate">{hero.name}</span>
                <PlatformBadge platform={hero.platform} />
              </div>
              <div className="mt-0.5 text-[12px] text-pb-fg-muted">
                <Fig>{formatCurrency(HERO.spend30d)}</Fig> · 30d spend · score <Fig>{hero.score}</Fig>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-[12.5px] text-pb-fg-muted">Proven challengers</div>
          <ul className="mt-3 space-y-2.5">
            {CHALLENGERS.slice(0, 4).map(({ creative, spend30d }) => (
              <li key={creative.key}>
                <div className="flex items-center gap-2.5 -mx-1.5 px-1.5 py-0.5 rounded-lg">
                  <RowThumb image={creative.image} name={creative.name} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-medium text-pb-fg truncate">{creative.name}</div>
                    <div className="text-[11px] text-pb-fg-muted">
                      score <Fig>{creative.score}</Fig> · <Fig>{formatCurrency(spend30d)}</Fig> 30d
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
