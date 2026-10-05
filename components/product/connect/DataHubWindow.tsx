import { RefreshCw } from "lucide-react";
import { AppWindow, PageHeader } from "../frame";
import { Button, formatInteger } from "../ui";
import { PlatformStack } from "./PlatformCard";
import { SyncOverview } from "./SyncOverview";
import { CONNECTED_PLATFORMS, TOTAL_ADS, type AmazonState } from "./data";

/* DataHubWindow: the whole Data Hub page in the application window. The
   rail with Data Hub active and its green sync dot, the breadcrumb
   "Setup / Data Hub", the title row with the outline "Sync all" button,
   the platform cards on the left and the sync rail on the right: Sync
   overview, Data freshness and, unless queue is false, the Analysis
   queue. The page's healthy state has no navy block and no peach beyond
   the active rail row.

   Design width 1200 (fixed). With the full rail the content column is 914:
   platform cards 590, 24px gap, rail 300. With the icon rail it is 1086:
   cards 762.
   Natural height (either rail; the cards column is the taller one, so the
   queue does not change it):
     amazon "connect"  936  (cards 732, rail 605 with the queue, 362 without)
     amazon "hidden"   838  (cards 635: with the queue the two columns end 30px apart)
   Pass height to crop the page at the window's bottom edge. With
   queue={false}, a height of about 600 ends just under the rail.

   Render inside <Shot ground={false} width={1200}>. */
export function DataHubWindow({
  amazon = "connect",
  rail = "full",
  queue = true,
  height,
  className,
}: {
  /** The Amazon card: "connect" (not connected, Connect pill) or "hidden". */
  amazon?: AmazonState;
  /** "full" is the 236px rail with labels; "icon" is the 64px rail. */
  rail?: "full" | "icon";
  /** The "Analysis queue" card at the foot of the right rail. Pass false for the two-card rail. */
  queue?: boolean;
  /** Fixed height in px; the page is cropped at the bottom edge. Omit to grow with the content. */
  height?: number;
  className?: string;
}) {
  const platforms = CONNECTED_PLATFORMS.length;
  return (
    <AppWindow active="Data Hub" group="Setup" page="Data Hub" rail={rail} width={1200} height={height} className={className}>
      <PageHeader
        title="Data Hub"
        description={`${platforms} platform${platforms === 1 ? "" : "s"} connected · ${formatInteger(TOTAL_ADS)} ads syncing daily.`}
        actions={
          <Button variant="outline" size="default">
            <RefreshCw className="size-3.5" strokeWidth={2} />
            Sync all
          </Button>
        }
      />

      <div className="grid gap-6 grid-cols-[1fr_300px]">
        <PlatformStack amazon={amazon} />
        <SyncOverview queue={queue} />
      </div>
    </AppWindow>
  );
}
