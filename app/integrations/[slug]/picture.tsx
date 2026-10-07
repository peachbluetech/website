import { AdTile } from "@/components/product/library";
import { PACING_CAPTION, PacingRows } from "@/components/product/reports";
import { FLIGHTS, PACING_ROWS_IDS, money, type Flight } from "@/components/product/reports/data";
import { PaceChip, ProgressBar } from "@/components/product/reports/parts";
import { ACCOUNT, CREATIVES, type SampleCreative } from "@/components/product/sample";
import { PeekBox, PeekPanel } from "@/components/site/kit";

/* The picture under a platform page's header: one window of the product
   for that platform, read from the sample account.

   Meta, TikTok and Google Ads: four of the sample account's creatives on
   that platform as tiles of the Creative Library (library/AdTile), the
   highest score first, so the row runs from a winner to a creative to
   cut. One row of tiles at the library's own 276px; the panel's width
   decides how many of them the window shows (integration.css).

   Amazon DSP: the sample account does not run Amazon itself. Its
   streaming and online video flights are run by an agency through the
   DSP (reports/data.ts), so this page shows that agency's flight table
   (reports/PacingRows: the table without its goal column) and says so
   in the line under the panel, the published caption of every pacing
   picture.
   Where the panel is too narrow for the table, the same flights are
   rows put together from the table's own pacing cell.

   Nothing here is a control and nothing is drawn by hand. */

/* ── Meta, TikTok, Google Ads: library tiles ────────────────────── */

/* Four creatives for each platform, the highest score first. Each list
   runs from the top tier to the under tier.

   `cut` is where the panel's foot cuts the tiles. "figures" is the
   whole tile: its name, its three tag pills and its figures. "names"
   stops under the name. TikTok takes "names": every creative of the
   sample account is a still image and its tile says so in a pill, which
   would sit oddly on the page whose first capability is video. */
const TILES: Record<string, { name: string; cut: "figures" | "names"; creatives: SampleCreative[] }> = {
  meta: { name: "Meta", cut: "figures", creatives: [CREATIVES.allFizz, CREATIVES.honestlySoGood, CREATIVES.inMyTote, CREATIVES.bubbles] },
  tiktok: { name: "TikTok", cut: "names", creatives: [CREATIVES.bigMood, CREATIVES.littleRitual, CREATIVES.obsessed, CREATIVES.thirsty] },
  "google-ads": { name: "Google Ads", cut: "figures", creatives: [CREATIVES.fridgePick, CREATIVES.threePm, CREATIVES.earnedIt, CREATIVES.cooldown] },
};

function tilesLabel(name: string, creatives: SampleCreative[]): string {
  return `Four of a sample account's ${name} creatives in the Creative Library, each with its score: ${creatives.map((c) => `"${c.name}", ${c.score}`).join("; ")}.`;
}

function Tiles({ creatives }: { creatives: SampleCreative[] }) {
  return (
    <div className="el-integration-tiles">
      {creatives.map((c) => (
        <div key={c.key} className="el-integration-tile">
          <AdTile creative={c} />
        </div>
      ))}
    </div>
  );
}

/* ── Amazon DSP: the agency's flights ───────────────────────────── */

/* The flights of the product's own rows crop (PacingRows shows the
   same five), in the table's order (furthest behind first), and one
   more than the window shows, so the last row shown ends on a rule of
   the table and not on its rounded foot. */
const SHOWN = FLIGHTS.filter((f) => PACING_ROWS_IDS.includes(f.id));
const STATUS: Record<string, string> = { under: "underpacing", over: "overpacing", on_pace: "on pace" };

const FLIGHTS_LABEL = `Amazon DSP flights for a sample account, run by an agency, each with its budget, its spend and its delivery against expected pace: ${SHOWN.slice(0, 4)
  .map((f) => `${f.label} (${f.channel}), ${STATUS[f.status] ?? f.status} at ${f.pace.toFixed(0)}%, ${money(f.spend)} of ${money(f.budget)}`)
  .join("; ")}.`;

/* One flight where the table does not fit: the order and its channel
   over its spend against budget, and the table's own pacing cell
   (PaceChip over ProgressBar) at the right. Inside a picture and put
   together from the product's parts, so it is written in the product's
   utility classes. 68px a row. */
function FlightRow({ f }: { f: Flight }) {
  return (
    <li className="flex h-[68px] items-center gap-4 px-4">
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-pb-fg">
          {f.label}
          <span className="ml-2 text-[11px] font-normal uppercase tracking-[0.08em] text-pb-fg-muted">{f.channel}</span>
        </div>
        <div className="mt-0.5 whitespace-nowrap font-mono text-[11.5px] tnum text-pb-fg-muted">
          <span className="text-pb-fg">{money(f.spend)}</span> of {money(f.budget)}
        </div>
      </div>
      <div className="flex w-[132px] shrink-0 flex-col gap-1.5">
        <PaceChip status={f.status} pct={f.pace} />
        <ProgressBar spendPct={f.spendPct} expectedPct={f.expectedPct} />
      </div>
    </li>
  );
}

/* ── The picture ────────────────────────────────────────────────── */

export function PlatformPicture({ slug }: { slug: string }) {
  const tiles = TILES[slug];
  if (tiles) {
    return (
      <PeekPanel
        bleed
        className={`el-integration-peek el-integration-peek--tiles el-integration-peek--${tiles.cut}`}
        label={tilesLabel(tiles.name, tiles.creatives)}
        caption={`Sample account: ${ACCOUNT.brand}`}
      >
        <PeekBox>
          <Tiles creatives={tiles.creatives} />
        </PeekBox>
      </PeekPanel>
    );
  }
  if (slug === "amazon-dsp") {
    return (
      <PeekPanel className="el-integration-peek el-integration-peek--flights" label={FLIGHTS_LABEL} caption={PACING_CAPTION}>
        <PeekBox className="el-integration-table">
          <PacingRows />
        </PeekBox>
        <PeekBox className="el-integration-rows">
          <ul className="divide-y divide-pb-border">
            {SHOWN.map((f) => (
              <FlightRow key={f.id} f={f} />
            ))}
          </ul>
        </PeekBox>
      </PeekPanel>
    );
  }
  return null;
}
