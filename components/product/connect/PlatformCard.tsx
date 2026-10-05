import { ChevronDown, Clock, Plug, Settings2, Zap, type LucideIcon } from "lucide-react";
import { Card, cx, formatInteger } from "../ui";
import { PLATFORMS, stackFor, type AmazonState, type ConnectedPlatformKey, type PlatformTile } from "./data";

/* The 40px platform tile at the left of a card. Meta, Amazon and Google
   are a white letter on the platform's colour; TikTok is the app's white
   note glyph on near-black, in a box with no type classes. */
function LogoTile({ tile }: { tile: PlatformTile }) {
  if ("glyph" in tile) {
    return (
      <div className="size-10 rounded-xl shrink-0 flex items-center justify-center text-white" style={{ background: tile.background }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.88a8.28 8.28 0 0 0 3.76.91V6.34a4.84 4.84 0 0 1-.01.35Z" />
        </svg>
      </div>
    );
  }
  return (
    <div
      className="size-10 rounded-xl shrink-0 flex items-center justify-center font-semibold text-[15px] text-white"
      style={{ background: tile.background }}
    >
      {tile.letter}
    </div>
  );
}

/* The Connected pill beside a platform name: a tinted capsule with a 6px dot. */
function StatusDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 h-[20px] rounded-full px-2 text-[11px] font-medium bg-pb-good-bg text-pb-good">
      <span className="size-1.5 rounded-full bg-pb-good" />
      {label}
    </span>
  );
}

/* One of the three quiet controls at the foot of a connected card. */
function IntegrationAction({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-[12px] font-medium text-pb-fg-muted">
      <Icon className="size-3.5" strokeWidth={2} />
      {label}
    </span>
  );
}

type PlatformCardProps =
  | {
      /** A platform Fizzli runs: "meta", "tiktok" or "google". */
      platform: ConnectedPlatformKey;
      /** "connected" shows the count, account row and controls; "connect" is the not-connected card. */
      state?: "connected" | "connect";
      className?: string;
    }
  | {
      /** Amazon is not one of Fizzli's platforms, so its card is only ever the not-connected one. */
      platform: "amazon";
      state?: "connect";
      className?: string;
    };

/* PlatformCard: one platform on the Data Hub. The platform tile, the
   platform name with its Connected pill, one muted line, the ads-synced
   count at the right, then the account being read with its sync stamp and
   the card's three controls. In the "connect" state only the top row
   shows, with the platform-coloured Connect pill where the count would be.

   Design width 828 (the Data Hub's left column at the full page width).
   The card fills its container and also holds at 590 (inside the 1200
   window), 560 and 520; below about 400 the control row would wrap.
   Natural height: 204 connected (one account row), 85 in the connect state. */
export function PlatformCard({ platform, state, className }: PlatformCardProps) {
  const p = PLATFORMS[platform];
  const connected = platform !== "amazon" && state !== "connect";
  return (
    <Card className={cx("p-5 space-y-3", className)}>
      <div className="flex items-start gap-4">
        <LogoTile tile={p.tile} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-[15px] font-semibold text-pb-fg">{p.name}</div>
                {connected && <StatusDot label="Connected" />}
              </div>
              <div className="text-[12.5px] text-pb-fg-muted mt-0.5">{p.description}</div>
            </div>

            {connected && p.adsSynced > 0 && (
              <div className="text-right shrink-0">
                <div className="text-[18px] font-semibold font-mono tnum text-pb-fg">{formatInteger(p.adsSynced)}</div>
                <div className="text-[11px] text-pb-fg-muted uppercase tracking-[0.1em]">ads synced</div>
              </div>
            )}

            {!connected && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white shrink-0"
                style={{ background: p.connectBackground }}
              >
                <Plug size={12} />
                Connect
              </span>
            )}
          </div>
        </div>
      </div>

      {connected && (
        <div className="space-y-2 pt-1">
          <ul className="space-y-2">
            {p.accounts.map((account) => (
              <li
                key={account.name}
                className="rounded-lg border border-pb-border bg-pb-muted/30 px-3 py-2.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-pb-fg truncate">{account.name}</p>
                  <p className="text-[11px] text-pb-fg-muted">{account.sub}</p>
                </div>
                <div className="text-[11px] text-pb-fg-muted flex items-center gap-1.5 shrink-0">
                  <Clock className="size-3" strokeWidth={1.8} />
                  Synced {account.synced}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 -ml-2 pt-1">
            <IntegrationAction icon={Settings2} label="Manage" />
            <IntegrationAction icon={Zap} label="Sync more data" />
            <IntegrationAction icon={ChevronDown} label="Details" />
          </div>
        </div>
      )}
    </Card>
  );
}

/* The stack itself, filling its container: the cards in the app's order
   (Meta, TikTok, Amazon, Google) with 12px between them. Used by
   PlatformCards at a fixed width and by DataHubWindow in its left column. */
export function PlatformStack({ amazon = "connect", className }: { amazon?: AmazonState; className?: string }) {
  return (
    <div className={cx("min-w-0 space-y-3", className)}>
      {stackFor(amazon).map((key) =>
        key === "amazon" ? <PlatformCard key={key} platform="amazon" /> : <PlatformCard key={key} platform={key} />,
      )}
    </div>
  );
}

/* PlatformCards: the Data Hub's platform list on its own. Meta Ads, TikTok
   Ads and Google Ads connected, each with its count, account row and
   Oct 1 sync stamp (84 + 46 + 28 = 158 ads), and the Amazon card third,
   in the app's order, not connected.

   Design width 828; pass width={560} or width={520} for the narrow
   variants (same cards, every line still fits on one row).
   Natural height at any of the three widths:
     amazon "connect"  732  (three connected cards, the Connect card)
     amazon "hidden"   635  (three connected cards) */
export function PlatformCards({
  amazon = "connect",
  width = 828,
  className,
}: {
  /** "connect" draws Amazon not connected with its Connect pill; "hidden" leaves it out. */
  amazon?: AmazonState;
  /** 828 is the app's column; 560 and 520 are the narrow variants for a feature tile. */
  width?: 828 | 560 | 520;
  className?: string;
}) {
  return (
    <div className={className} style={{ width }}>
      <PlatformStack amazon={amazon} />
    </div>
  );
}
