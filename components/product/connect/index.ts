/* Connect: the Data Hub recreations. One platform card, the stack of
   platform cards, the right-rail sync cards, the analysis queue card and
   the whole page in the application window. Static server components;
   render each inside the Shot wrapper from components/product/frame at
   its design width. */

export { PlatformCard, PlatformCards } from "./PlatformCard";
export { SyncOverview, AnalysisQueue } from "./SyncOverview";
export type { RailWidth } from "./SyncOverview";
export { DataHubWindow } from "./DataHubWindow";
export { ANALYSIS_QUEUE, CONNECTED_PLATFORMS, PLATFORMS, PLATFORM_ORDER, SYNC_OVERVIEW, TOTAL_ADS, stackFor } from "./data";
export type { AmazonState, ConnectedPlatformKey, PlatformAccount, PlatformInfo, PlatformKey, PlatformTile, QueueItem } from "./data";
