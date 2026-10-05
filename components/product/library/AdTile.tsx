import type { SampleCreative } from "../sample";
import { AdThumb, Badge, PlatformBadge, ScoreBadge, cx, formatCurrencyCompact, formatPercent, formatRoas } from "../ui";
import { TILE_FORMAT, TILE_TAGS, labelForValue, truncateMiddle } from "./data";

/* AdTile: one Creative Library tile.
   Design width 276 (a column of the 4-column grid at 1152), 448 tall.
   It fills its container, so give it a 276px box when it stands alone.

   A white hairline card. Inside 12px of padding, the creative cropped to
   4:5 with two white chips on it: the platform at the top left, the score
   at the top right. Below: the creative's name, one fixed line of three
   pills (the message it leads with, its format, its tone) and three mono
   figures: CTR, ROAS, spend.

   The pill line never wraps: pills that do not fit are cut at the card's
   edge, as in the app, so keep the three labels within 242px. */

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11.5px] text-pb-fg-muted">{label}</div>
      <div className="text-[14px] font-semibold font-mono tnum leading-tight mt-0.5 text-pb-fg">{value}</div>
    </div>
  );
}

export function AdTile({
  creative,
  className,
}: {
  /** A creative from the sample account. Its pills come from the library's own tag table. */
  creative: SampleCreative;
  className?: string;
}) {
  const tags = TILE_TAGS[creative.key];
  return (
    <div className={cx("group relative text-left rounded-lg border overflow-hidden border-pb-border bg-pb-card", className)}>
      <div className="relative p-3">
        <AdThumb imageUrl={creative.image} ratio="four-five" size="md" />
        <div className="absolute top-5 right-5 flex items-center justify-between gap-1.5 flex-wrap left-5">
          <div className="flex items-center gap-1 flex-wrap">
            <PlatformBadge platform={creative.platform} className="bg-pb-card text-pb-fg" />
          </div>
          <ScoreBadge score={creative.score} chip />
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="text-[12.5px] font-medium text-pb-fg truncate mb-1.5">{truncateMiddle(creative.name, 44)}</div>
        <div className="flex items-center gap-1 flex-nowrap overflow-hidden h-[22px] mb-2.5">
          {tags ? (
            <>
              <Badge variant="outline">{labelForValue(tags.primaryMessage)}</Badge>
              <Badge variant="peach">{labelForValue(TILE_FORMAT)}</Badge>
              <Badge variant="info">{labelForValue(tags.emotionalTone)}</Badge>
            </>
          ) : (
            <Badge variant="outline">Not classified</Badge>
          )}
        </div>
        <div className="flex items-baseline gap-4 tnum">
          <Metric label="CTR" value={formatPercent(creative.ctr, 2)} />
          <Metric label="ROAS" value={formatRoas(creative.roas, 2)} />
          <Metric label="Spend" value={formatCurrencyCompact(creative.spend)} />
        </div>
      </div>
    </div>
  );
}
