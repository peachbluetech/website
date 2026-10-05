import { Calendar, Clock, Loader2, RefreshCw, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { Card, adImage, cx, formatInteger } from "../ui";
import { ANALYSIS_QUEUE, SYNC_OVERVIEW, TOTAL_ADS } from "./data";

/** Widths the rail cards are drawn at: 300 is the app's rail column, the wider ones are for a card shown on its own. */
export type RailWidth = 300 | 320 | 340 | 360;

/* One row of the overview: a small icon and a muted label on the left,
   the value on the right. */
function OverviewRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span className="flex items-center gap-2 text-pb-fg-muted">
        <Icon className="size-3.5" strokeWidth={1.8} />
        {label}
      </span>
      <span className="font-mono font-medium text-pb-fg tnum">{value}</span>
    </div>
  );
}

/* The "Sync overview" card: ads synced, last full sync, the range held,
   the next automatic run, and the green "All caught up" strip under a
   hairline. 254 tall. */
function SyncOverviewCard() {
  return (
    <Card className="p-5">
      <div className="text-[12.5px] font-medium text-pb-fg-muted mb-3">Sync overview</div>
      <div className="space-y-3">
        <OverviewRow icon={Zap} label="Ads synced" value={formatInteger(TOTAL_ADS)} />
        <OverviewRow icon={Clock} label="Last full sync" value={SYNC_OVERVIEW.lastFullSync} />
        <OverviewRow icon={Calendar} label="Range" value={SYNC_OVERVIEW.range} />
        <OverviewRow icon={RefreshCw} label="Next auto-sync" value={SYNC_OVERVIEW.nextAutoSync} />
      </div>
      <div className="mt-4 pt-4 border-t border-pb-border text-[12.5px]">
        <div className="flex items-center gap-2 rounded-[10px] bg-pb-good-bg px-3 py-2 font-medium text-pb-good-text">
          <ShieldCheck className="size-4" strokeWidth={2} />
          {SYNC_OVERVIEW.status}
        </div>
      </div>
    </Card>
  );
}

/* The "Data freshness" card: one row, Auto-sync, Daily. 92 tall. */
function DataFreshnessCard() {
  return (
    <Card className="p-5">
      <div className="text-[12.5px] font-medium text-pb-fg-muted mb-3">Data freshness</div>
      <div className="space-y-2 text-[12.5px]">
        <div className="flex justify-between">
          <span className="text-pb-fg-muted">Auto-sync</span>
          <span className="font-medium text-pb-fg">{SYNC_OVERVIEW.autoSync}</span>
        </div>
      </div>
    </Card>
  );
}

/* The "Analysis queue" card: the blue "Analyzing 3 creatives" line with
   its spinner at rest, then one row per creative still being analysed: a
   36px thumbnail under the app's faint blue wash and the ad's name. */
function AnalysisQueueCard() {
  const { pending, items } = ANALYSIS_QUEUE;
  return (
    <Card className="p-5">
      <div className="text-[12.5px] font-medium text-pb-fg-muted mb-3">Analysis queue</div>
      <div className="flex items-center gap-2 mb-3">
        <Loader2 className="size-3.5 shrink-0 text-pb-info" strokeWidth={2.2} />
        <span className="text-[12px] font-medium text-pb-info">
          Analyzing <span className="font-mono tnum">{pending}</span> {pending === 1 ? "creative" : "creatives"}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-2.5">
            <div className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-pb-border bg-pb-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={adImage(item.image, "sm")} alt="" width={36} height={36} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-pb-info/10" />
            </div>
            <p className="flex-1 truncate text-[12px] text-pb-fg-muted">{item.name}</p>
          </div>
        ))}
        {pending > items.length && (
          <p className="text-[11px] text-pb-fg-muted pl-0.5">
            +<span className="font-mono tnum">{pending - items.length}</span> more in queue
          </p>
        )}
      </div>
    </Card>
  );
}

/* SyncOverview: the Data Hub's right rail in its healthy state. The
   "Sync overview" card over the "Data freshness" card, and with
   queue the "Analysis queue" card under them, 16px apart.

   Design width 300 (the app's rail column); pass width for 320, 340 or
   360 when the rail stands on its own. Heights are the same at every width.
   Natural height:
     default                    362  (overview 254, freshness 92)
     queue                      605  (and the queue card, 227)
     freshness={false}          254  (the overview card alone)
     freshness={false} queue    497 */
export function SyncOverview({
  width = 300,
  freshness = true,
  queue = false,
  className,
}: {
  /** 300 is the app's rail; 320, 340 and 360 are for the rail shown on its own. */
  width?: RailWidth;
  /** Pass false to leave out the "Data freshness" card, for the overview card as a single object. */
  freshness?: boolean;
  /** Add the "Analysis queue" card (3 creatives being analysed) at the foot of the rail. */
  queue?: boolean;
  className?: string;
}) {
  return (
    <div className={cx("min-w-0 space-y-4", className)} style={{ width }}>
      <SyncOverviewCard />
      {freshness && <DataFreshnessCard />}
      {queue && <AnalysisQueueCard />}
    </div>
  );
}

/* AnalysisQueue: the rail's "Analysis queue" card on its own. Three new
   cuts of Fizzli ads, synced on Oct 1 and still being analysed: the one
   place on the Data Hub where creative shows up.

   Design width 300; pass width for 320, 340 or 360.
   Natural height 227 at every width. */
export function AnalysisQueue({ width = 300, className }: { width?: RailWidth; className?: string }) {
  return (
    <div className={cx("min-w-0", className)} style={{ width }}>
      <AnalysisQueueCard />
    </div>
  );
}
