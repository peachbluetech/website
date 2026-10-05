import { ArrowRight, FileText, Filter, TrendingDown, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/product/frame";
import {
  AdThumb,
  Button,
  Card,
  Fig,
  KpiStrip,
  VoiceBar,
  cx,
  formatCurrencyCompact,
  formatSignedPct,
} from "@/components/product/ui";
import { INTEL, SIGNALS, STRATEGIES, type Confidence, type Metric, type Signal, type Strategy } from "./data";

/* Creative Intelligence, the brand view of a conversion account: which
   creative strategies carry the spend, and which tag values move the
   result. Quiet-instrument register: the page title is the only serif,
   the headline sentence is the only navy, "Generate brief" is the only
   peach. Classes are the app's, resolved for a 1152px content column. */

function titleCase(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
}

/* A lower CPA is the good direction; everything else reads higher is better. */
function liftIsGood(metric: Metric, lift: number): boolean {
  return metric === "cpa" ? lift < 0 : lift > 0;
}

function metricLabel(metric: Metric): string {
  if (metric === "cpa") return "CPA";
  if (metric === "roas") return "ROAS";
  if (metric === "cpm") return "CPM";
  return "CTR";
}

/* The strategies behind the headline sentence: good lift only, strongest
   first, three at most. */
const TOP = STRATEGIES.filter((s) => liftIsGood(s.metric, s.liftPct))
  .sort((a, b) => Math.abs(b.liftPct) - Math.abs(a.liftPct))
  .slice(0, 3);
const TOP_SHARE = Math.round(TOP.reduce((sum, s) => sum + s.spendSharePct, 0));

/* IntelligenceHead: the top of the page. Title row with the peach
   "Generate brief" button, the navy headline sentence, the advice line
   with the winning strategy's thumbnails, and the four-figure strip.
   Design width: 1152. Natural height: 335; 233 without the advice row. */
export function IntelligenceHead({
  explore = true,
  className,
}: {
  /** Show the advice sentence, the thumbnail stack and "Explore winners" under the navy bar. */
  explore?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <PageHeader
        title="Creative Intelligence"
        subtitle={`${INTEL.strategies} strategies identified · ${INTEL.creativesAnalyzed} creatives analyzed · ${formatCurrencyCompact(INTEL.spendAnalyzed)}`}
        actions={
          <Button size="sm" variant="peach">
            <FileText className="size-3.5" />
            Generate brief
          </Button>
        }
      />

      <div className="mb-8">
        <VoiceBar label="Headline signal">
          <Fig>{TOP.length}</Fig> patterns are driving <Fig>{TOP_SHARE}%</Fig> of your active spend.
        </VoiceBar>
        {explore && (
          <>
            <p className="text-[13px] text-pb-fg-muted mt-3 max-w-[560px] leading-relaxed">
              Your winners are concentrated. Before you add more creatives, double down on these patterns, or test against them with a
              different angle.
            </p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <div className="flex -space-x-2">
                {TOP[0].creatives.slice(0, 3).map((c) => (
                  /* relative is added here: without it the stone ring of each
                     thumbnail paints under its neighbour's image and the
                     three read as one strip. */
                  <div key={c.key} className="relative size-9 ring-2 ring-pb-bg rounded-md overflow-hidden">
                    <AdThumb imageUrl={c.image} ratio="square" size="sm" className="rounded-none" />
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm">
                Explore winners <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </>
        )}
      </div>

      <KpiStrip
        dense
        items={[
          { label: "Strategies", value: String(INTEL.strategies), source: "from the pattern engine" },
          { label: "Creatives", value: String(INTEL.creativesAnalyzed), source: "analyzed creatives" },
          { label: "Patterns", value: String(INTEL.patterns), source: "from the pattern engine" },
          {
            label: "Spend analyzed",
            value: formatCurrencyCompact(INTEL.spendAnalyzed),
            primary: true,
            source: "lifetime, all synced history",
          },
        ]}
      />
    </div>
  );
}

function signalFor(s: Strategy): { label: string; tone: string } {
  if (s.tier === "emerging") return { label: "Early signal", tone: "bg-pb-info-bg text-pb-info" };
  if (s.confidence === "high") return { label: "Strong signal", tone: "bg-pb-good-bg text-pb-good" };
  if (s.confidence === "medium") return { label: "Above baseline", tone: "bg-pb-info-bg text-pb-info" };
  return { label: "Watching", tone: "bg-pb-muted text-pb-fg-muted" };
}

/* StrategyCard: one identified strategy. Three creatives on a 150px
   strip with the signal pill and the lift badge floating over them, then
   the name, the meta line and the counts.
   Design width: 276 (a quarter of the 1152 column). Do not stretch it:
   the strip is a fixed 150px tall, so a wider card leaves gaps beside
   the 9:16 thumbnails. Natural height: 269 (every sample name sets on
   two lines).

   The signal pill and the lift badge sit where the app puts them, over
   the top of the first and the third thumbnail, and cover the first line
   of an ad whose headline is in its top third. Only the middle slot is
   clear, so the fix is the order of the creatives in ./data (see the note
   above STRATEGIES), never the position of the chips. One card is clean
   throughout; on the others a first word ("zero", "currently", "Honestly?",
   "Bubbles,") stays under a chip, as it would in the app. */
export function StrategyCard({
  strategy = STRATEGIES[0],
  className,
}: {
  /** One of STRATEGIES from ./data. Defaults to the winning strategy. */
  strategy?: Strategy;
  className?: string;
}) {
  const good = liftIsGood(strategy.metric, strategy.liftPct);
  const signal = signalFor(strategy);
  return (
    <div className={cx("relative text-left w-full rounded-lg border border-pb-border bg-pb-card overflow-hidden", className)}>
      <div className="relative h-[150px] grid grid-cols-3 gap-1 p-1">
        {strategy.creatives.slice(0, 3).map((c) => (
          <AdThumb key={c.key} imageUrl={c.image} ratio="portrait" size="md" className="rounded-md h-full" />
        ))}
        <div
          className={cx(
            "absolute top-3 left-3 inline-flex items-center gap-1 h-[18px] rounded-[4px] px-1.5 text-[11px] font-medium",
            signal.tone,
          )}
        >
          <span className={cx("size-1 rounded-full", good ? "bg-pb-good" : "bg-pb-bad")} />
          {signal.label}
        </div>
        <div
          className={cx(
            "absolute top-3 right-3 rounded-full h-6 px-2 text-[11px] font-semibold tnum font-mono flex items-center gap-1",
            good ? "bg-pb-good text-white" : "bg-pb-bad text-white",
          )}
        >
          {good ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {formatSignedPct(strategy.liftPct)}
        </div>
      </div>

      <div className="p-4">
        <div className="text-[14px] font-semibold mb-1 leading-tight text-pb-fg">{strategy.name}</div>
        <div className="text-[11.5px] text-pb-fg-muted line-clamp-1 mb-3">{strategy.meta}</div>
        <div className="flex items-center gap-2 text-[11px] text-pb-fg-muted tnum">
          <span>
            {strategy.creativeCount} creative{strategy.creativeCount !== 1 ? "s" : ""}
          </span>
          <span>·</span>
          <span>{strategy.spendSharePct}% of spend</span>
        </div>
      </div>
    </div>
  );
}

/* StrategyGrid: "Identified strategies", four cards across.
   Design width: 1152 (cards 276 wide, 16px apart).
   Natural height: 322 with the header, 269 without. */
export function StrategyGrid({
  header = true,
  className,
}: {
  /** Show the "Identified strategies" label and count line above the cards. */
  header?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {header && (
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[12.5px] text-pb-fg-faint mb-0.5">Identified strategies</div>
            <div className="text-[14px] font-semibold text-pb-fg">
              {INTEL.primary} primary{INTEL.emerging > 0 && ` · ${INTEL.emerging} emerging`}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {STRATEGIES.map((s) => (
          <div key={s.key}>
            <StrategyCard strategy={s} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* The dot before a signal: green or red by direction, larger with the lift. */
function DeltaDot({ good, delta }: { good: boolean; delta: number }) {
  const size = Math.min(8 + Math.abs(delta) * 0.3, 13);
  return <div className={cx("rounded-full shrink-0", good ? "bg-pb-good" : "bg-pb-bad")} style={{ width: size, height: size }} />;
}

/* Three small dots after a signal: how many are filled is the confidence. */
function ConfidenceDot({ confidence }: { confidence: Confidence }) {
  const dots = confidence === "high" ? 3 : confidence === "medium" ? 2 : 1;
  return (
    <div className="flex items-center gap-0.5 ml-0.5 shrink-0">
      {[0, 1, 2].map((i) => (
        <div key={i} className={cx("size-1 rounded-full", i < dots ? "bg-pb-fg-muted" : "bg-pb-border")} />
      ))}
    </div>
  );
}

const CHIP = "h-7 px-2.5 rounded-full text-[11px] inline-flex items-center";

/* SignalsTable: "Performance signals", one row per tag value that moves
   the result: direction dot, value, confidence, dimension, lift, ads and
   spend in mono.
   Design width: 1152, the app's columns with a wider Lift (1fr, 120, 112,
   80, 100). Pass compact for a 560 frame: the dimension chips go and the
   fixed columns tighten (112, 112, 52, 84) so the signal names are not cut.
   Natural height, at either width: 589 with all ten rows, 392 with six.
   A row is 49.25px, the column header 41.5px, and the section header
   takes 54px (leave it out with header={false}). */
export function SignalsTable({
  rows = SIGNALS.length,
  header = true,
  compact = false,
  className,
}: {
  /** How many signals to list, from the top (highest confidence first). Ten by default. */
  rows?: number;
  /** Show the "Performance signals" label, the title and the dimension chips. */
  header?: boolean;
  /** The 560 layout. */
  compact?: boolean;
  className?: string;
}) {
  const list: Signal[] = SIGNALS.slice(0, rows);
  const dimensions = Array.from(new Set(SIGNALS.map((p) => p.dimension)));
  /* The app's Lift column is 80px, which breaks "+41.3% ROAS" onto two lines
     and leaves every row 68px tall with its cells out of line. Here the
     column is 112px and the figure stays on one line. */
  const cols = compact ? "grid-cols-[1fr_112px_112px_52px_84px]" : "grid-cols-[1fr_120px_112px_80px_100px]";
  return (
    <div className={className}>
      {header && (
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <div className="text-[12.5px] text-pb-fg-faint mb-0.5">Performance signals</div>
            <div className="text-[14px] font-semibold text-pb-fg">What dimensions move the needle</div>
          </div>
          {!compact && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <Filter className="size-3.5 text-pb-fg-muted" />
              <span className={cx(CHIP, "bg-pb-fg text-pb-bg")}>All</span>
              {dimensions.map((d) => (
                <span key={d} className={cx(CHIP, "text-pb-fg-muted")}>
                  {titleCase(d)}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <Card className="overflow-hidden">
        <div className={cx("grid border-b border-pb-border bg-pb-muted/30 text-[11px] uppercase tracking-[0.06em] text-pb-fg-faint font-medium", cols)}>
          <div className="px-4 py-3">Signal</div>
          <div className="px-3 py-3">Dimension</div>
          <div className="px-3 py-3 text-right">Lift</div>
          <div className="px-3 py-3 text-right">Ads</div>
          <div className="px-3 py-3 text-right">Spend</div>
        </div>
        {list.map((p) => {
          const good = liftIsGood(p.metric, p.liftPct);
          return (
            <div key={`${p.dimension}-${p.value}`} className={cx("grid border-b border-pb-border last:border-0", cols)}>
              <div className="px-4 py-3.5 flex items-center gap-2 min-w-0">
                <DeltaDot good={good} delta={p.liftPct} />
                <span className="text-[13.5px] font-medium text-pb-fg truncate">{titleCase(p.value)}</span>
                <ConfidenceDot confidence={p.confidence} />
              </div>
              <div className="px-3 py-3.5 text-[12px] text-pb-fg-muted truncate">{titleCase(p.dimension)}</div>
              <div
                className={cx(
                  "px-3 py-3.5 text-right tnum font-mono text-[13px] font-semibold whitespace-nowrap",
                  good ? "text-pb-good" : "text-pb-bad",
                )}
              >
                {formatSignedPct(p.liftPct)} {metricLabel(p.metric)}
              </div>
              <div className="px-3 py-3.5 text-right tnum font-mono text-[12.5px] text-pb-fg-muted">{p.adCount}</div>
              <div className="px-3 py-3.5 text-right tnum font-mono text-[12.5px] text-pb-fg">{formatCurrencyCompact(p.totalSpend)}</div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

/* IntelligencePage: the three regions stacked with the page's own gaps
   (32px under the strip, 40px under the strategies), for an AppWindow
   whose content column is 1152 (width 1280 with the icon rail).
   Design width: 1152. Natural height: 1318 with ten signals, 1121 with
   six, 689 without the table. Inside the AppWindow add 139 (the top bar,
   the 40px page padding top and bottom, the border): 1260 with six. */
export function IntelligencePage({
  signalRows,
  className,
}: {
  /** Rows of the signals table; 0 leaves the table out. Ten by default. */
  signalRows?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <IntelligenceHead className="mb-8" />
      <StrategyGrid className={signalRows === 0 ? undefined : "mb-10"} />
      {signalRows !== 0 && <SignalsTable rows={signalRows} />}
    </div>
  );
}
