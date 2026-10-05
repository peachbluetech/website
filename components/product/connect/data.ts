/* Data Hub sample values for the Fizzli account.

   The canonical account (components/product/sample.ts) runs Meta, TikTok
   and Google Ads, holds 44 creatives over the last 30 days, 41 of them
   scored, and last synced on Oct 1 at 05:00. Everything here hangs off that:

   - Ad counts are ads, not creatives: one creative runs in several ads.
     84 + 46 + 28 = 158 ads, about 3.6 ads per creative for 44 creatives,
     split like the 17 sample creatives' platforms (9 Meta, 5 TikTok,
     3 Google Ads).
   - Every account row carries the Oct 1 stamp of the canonical sync.
   - The rail reads as if opened at 08:00 New York time: the last full
     sync ran three hours ago and the next daily run is 18 hours out.
   - The analysis queue holds the three creatives that are not scored yet
     (44 less 41): new cuts of existing ads that arrived with the Oct 1
     sync, each drawn with the artwork it was cut from.

   Amazon is not part of the canonical account. Its card is only ever drawn
   in the app's not-connected state, with the Connect pill, or left out. */

import { ACCOUNT } from "../sample";

export type PlatformKey = "meta" | "tiktok" | "amazon" | "google";

/** The platforms Fizzli has connected. */
export type ConnectedPlatformKey = Exclude<PlatformKey, "amazon">;

/** How the Amazon card is drawn in the stack: not connected with its Connect pill, or left out. */
export type AmazonState = "connect" | "hidden";

export type PlatformAccount = {
  /** Account name line. */
  name: string;
  /** Muted line under it: currency and timezone (Google leads with the customer number). */
  sub: string;
  /** The date in "Synced <date>", formatted Mon D, YYYY. */
  synced: string;
};

/** The app's 40px platform tile: a flat colour square holding one white letter, or the white note glyph on the TikTok card. */
export type PlatformTile = { background: string } & ({ letter: string } | { glyph: "note" });

export type PlatformInfo = {
  key: PlatformKey;
  name: string;
  /** One muted line under the name. Only surfaces the product supports. */
  description: string;
  tile: PlatformTile;
  /** Fill of the Connect pill in the not-connected state. */
  connectBackground: string;
  adsSynced: number;
  accounts: PlatformAccount[];
};

const SYNCED = "Oct 1, 2026";

export const PLATFORMS: Record<PlatformKey, PlatformInfo> = {
  meta: {
    key: "meta",
    name: "Meta Ads",
    description: "Facebook & Instagram ad performance",
    tile: { letter: "f", background: "#1877F2" },
    connectBackground: "#1877F2",
    adsSynced: 84,
    accounts: [{ name: "Fizzli US", sub: "USD · America/New_York", synced: SYNCED }],
  },
  tiktok: {
    key: "tiktok",
    name: "TikTok Ads",
    description: "In-feed ad performance",
    tile: { glyph: "note", background: "#111111" },
    connectBackground: "#000000",
    adsSynced: 46,
    accounts: [{ name: "Fizzli", sub: "USD · America/New_York", synced: SYNCED }],
  },
  amazon: {
    key: "amazon",
    name: "Amazon Ads",
    description: "Amazon DSP ad performance",
    tile: { letter: "a", background: "#FF9900" },
    connectBackground: "#FF9900",
    adsSynced: 0,
    accounts: [],
  },
  google: {
    key: "google",
    name: "Google Ads",
    description: "Search, Display & Video ad performance",
    tile: { letter: "G", background: "#4285F4" },
    connectBackground: "#4285F4",
    adsSynced: 28,
    accounts: [{ name: "Fizzli", sub: "123-456-7890 · USD · America/New_York", synced: SYNCED }],
  },
};

/** The app's fixed card order. */
export const PLATFORM_ORDER: PlatformKey[] = ["meta", "tiktok", "amazon", "google"];

/** The platforms with ads arriving, in card order. */
export const CONNECTED_PLATFORMS: ConnectedPlatformKey[] = ["meta", "tiktok", "google"];

/** The cards in the stack, in the app's order, with or without the Amazon card. */
export function stackFor(amazon: AmazonState): PlatformKey[] {
  return PLATFORM_ORDER.filter((key) => key !== "amazon" || amazon === "connect");
}

/** Ads synced across the connected platforms: 158. */
export const TOTAL_ADS = CONNECTED_PLATFORMS.reduce((sum, key) => sum + PLATFORMS[key].adsSynced, 0);

/* The right rail, as the app words each value. */
export const SYNC_OVERVIEW = {
  lastFullSync: "3h ago",
  range: "Jul 2026 → Oct 2026",
  nextAutoSync: "in 18h",
  status: "All caught up",
  autoSync: "Daily",
} as const;

export type QueueItem = {
  /** The row's one line of text: the new ad's name. */
  name: string;
  /** Path under /public: the artwork the cut was made from. */
  image: string;
};

/* The analysis queue: creatives synced but not analysed yet. Pending is
   the account's unscored count, so the queue and every other screen agree. */
export const ANALYSIS_QUEUE: { pending: number; items: QueueItem[] } = {
  pending: ACCOUNT.creativesTotal - ACCOUNT.creativesScored,
  items: [
    { name: "Big mood, square cut", image: "/ads/fizzli-big-mood.jpg" },
    { name: "Would rebuy, tighter crop", image: "/ads/fizzli-would-rebuy.jpg" },
    { name: "All fizz, citrus stack", image: "/ads/fizzli-square-b.png" },
  ],
};
