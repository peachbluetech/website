import { Building2, Hash, Plus, Target, type LucideIcon } from "lucide-react";
import { Card, cx } from "@/components/product/ui";
import { KEYWORDS, SENTIMENT, SENTIMENT_TOTAL, type KeywordType } from "./data";

/* SentimentOverview: the left rail of the Brand Intel page. Two white
   cards 16px apart: the tracked keywords (a 20px tinted tile per keyword
   type: peach for the brand, amber for a competitor, blue for a topic) and
   the sentiment split (four 4px bars with the mention count in mono).

   Design width: 280 (the rail). The cards have 16px of padding, so the
   bars are 246px long. It fills its container and reads well up to about
   360px. */

const TYPE_STYLE: Record<KeywordType, { bg: string; fg: string; icon: LucideIcon }> = {
  brand: { bg: "bg-pb-peach-100", fg: "text-pb-peach-700", icon: Building2 },
  competitor: { bg: "bg-pb-warn-bg", fg: "text-pb-warn", icon: Target },
  topic: { bg: "bg-pb-info-bg", fg: "text-pb-info", icon: Hash },
};

const RAIL_LABEL = "text-[12.5px] text-pb-fg-muted font-medium";

function SentimentBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-[11.5px] mb-1">
        <span className="text-pb-fg-muted">{label}</span>
        <span className="tnum font-mono font-medium text-pb-fg">{value}</span>
      </div>
      <div className="h-1 rounded-full bg-pb-muted overflow-hidden">
        <div className={cx("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function TrackedKeywordsCard() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={RAIL_LABEL}>Tracked keywords</div>
        <span className="size-6 rounded-md bg-pb-fg text-pb-bg flex items-center justify-center">
          <Plus className="size-3" strokeWidth={2.2} />
        </span>
      </div>
      <div className="space-y-1">
        {KEYWORDS.map((kw) => {
          const style = TYPE_STYLE[kw.type];
          const Icon = style.icon;
          return (
            <div key={kw.keyword} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
              <div className={cx("size-5 rounded-md flex items-center justify-center shrink-0", style.bg, style.fg)}>
                <Icon className="size-2.5" strokeWidth={2.5} />
              </div>
              <span className="flex-1 truncate text-[12.5px] text-pb-fg">{kw.keyword}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function SentimentCard() {
  return (
    <Card className="p-4">
      <div className={cx(RAIL_LABEL, "mb-3")}>Sentiment overview</div>
      <div className="space-y-2.5">
        <SentimentBar label="Positive" value={SENTIMENT.positive} total={SENTIMENT_TOTAL} color="bg-pb-good" />
        <SentimentBar label="Neutral" value={SENTIMENT.neutral} total={SENTIMENT_TOTAL} color="bg-pb-fg-muted/50" />
        <SentimentBar label="Mixed" value={SENTIMENT.mixed} total={SENTIMENT_TOTAL} color="bg-pb-warn" />
        <SentimentBar label="Negative" value={SENTIMENT.negative} total={SENTIMENT_TOTAL} color="bg-pb-bad" />
      </div>
    </Card>
  );
}

export function SentimentOverview({
  keywords = true,
  sentimentFirst = false,
  className,
}: {
  /** Show the tracked keywords card with the sentiment card. On by default; false leaves the sentiment card alone. */
  keywords?: boolean;
  /** Put the sentiment card above the keywords. The app's rail has the keywords first, which is the default. */
  sentimentFirst?: boolean;
  className?: string;
}) {
  return (
    <div className={cx("space-y-4", className)}>
      {keywords && !sentimentFirst && <TrackedKeywordsCard />}
      <SentimentCard />
      {keywords && sentimentFirst && <TrackedKeywordsCard />}
    </div>
  );
}
