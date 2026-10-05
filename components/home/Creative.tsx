import { BriefView, type ReferenceAd } from "@/components/product/brief";
import { CREATIVES } from "@/components/product/sample";
import { NEXT_CREATIVE_BRIEF } from "./content";
import { Shot } from "@/components/product/frame";
import { BAND_X, Bullets, FeatureRow, Fluid, More, PeekBand, SECTION_END, SectionMarker, Sheet } from "./parts";

/* For creative teams (03): one row, the Next Creative Brief: a short
   text column beside one navy band holding one product fragment: two of
   the brief's reference ads on a white mat, large and whole, one of them
   outlined. Agent Peach is its own section, 02 (Agent.tsx). */

export const CREATIVE_READER = { id: "creative-teams", label: "For creative teams" };

/* The two reference ads this picture shows, in this order: the winner
   in its lifestyle cut (the mirror selfie; the hero
   shows the same creative's studio cut) and "Your new little ritual.".
   Names and figures are the sample account's own (sample.ts); the brief
   is given the pair in place of its own four through its `referenceAds`
   prop. How each picture is cropped is the creative's
   own focus (ui/adFocus.json), so new art frames itself. */
const ref = (c: { key: string; name: string; image: string; ctr: number; roas: number }, image = c.image): ReferenceAd => ({ key: c.key, name: c.name, image, ctr: c.ctr, roas: c.roas });
const REFS: ReferenceAd[] = [ref(CREATIVES.bigMood, "/ads/fizzli-big-mood-selfie.jpg"), ref(CREATIVES.littleRitual)];
const [CHOSEN, BESIDE] = REFS;

const REFS_LABEL = `Two of the reference ads in a creative brief for a sample account, each a picture with its name, click-through rate and return: "${CHOSEN.name}" at ${CHOSEN.ctr}% CTR and ${CHOSEN.roas}x, and "${BESIDE.name}" at ${BESIDE.ctr}% CTR and ${BESIDE.roas}x.`;

/* The end of the brief laid out `width` wide: its last `height` px.
   `columns` is the brief's own grid of reference ads: four across (the
   pair takes the first two columns), or its narrow two. */
function BriefEnd({ width, height, columns = 4 }: { width: number; height: number; columns?: 2 | 4 }) {
  return (
    <div className="relative overflow-hidden" style={{ height }}>
      <div className="absolute bottom-0 left-0" style={{ width }}>
        <BriefView stopAfter="references" referenceColumns={columns} referenceAds={REFS} bare className="bg-transparent!" />
      </div>
    </div>
  );
}

/* The window is the brief's last row, the reference ads: the section's
   own heading and helper line are left out. Both ads are whole at every
   width, with their captions.

   - From sm: the brief at its own 760, four columns, and the window is
     the first two (374px: two 181px tiles and the 12px between them),
     painted at the width the mat gives it: 1.0 at 1024, 1.19 at 1280,
     1.44 from 1440 (a tile is 260px wide), never over 1.5 (the mat is
     capped and centred where the band is wider than that). Both names
     fit one line there, so the row is 236.75px tall.
   - On a phone two tiles of that grid would have to be painted under
     nine tenths, so the brief is laid out 276 wide in its narrow grid,
     two ads across, 132px each. The mat's margin is 8px there, so the
     row is painted at its own size at 390 and at nine tenths or more
     down to 360. A 132px tile is too narrow for either name on one line,
     so there a name is let onto a second line (the brief would cut it
     short with an ellipsis) and each is given two lines, so the figures
     under them share a line: the row is 205px.

   A tile's corners are the page's 4px at whatever scale it is painted,
   set from outside the brief by its class name.

   The outline on the chosen ad: one 1.5px peach line on the tile's own
   edge, with the tile's own corners. It is placed in the window's box in
   percentages, so it holds at every scale.

   The mat has 4px top corners and stands on the band's foot, like the
   leak sheet's lower down. */
const COLUMN = 193;
const WIDE = { brief: 760, w: 2 * COLUMN - 12, tile: COLUMN - 12, h: 236.75 };
const PHONE = { brief: 276, w: 276, tile: 132, h: 205 };
const TILE = "[&_.rounded-xl]:rounded-[calc(4px/var(--pb-fluid-scale,1))] max-sm:[&_.truncate]:min-h-[2lh] max-sm:[&_.truncate]:whitespace-normal";

function ReferencePeek() {
  const outline = "pointer-events-none absolute inset-y-0 left-0 rounded-[4px] border-[1.5px] border-[color:var(--mn-peach)]";
  return (
    <PeekBand>
      <div className={`pt-5 sm:pt-8 ${BAND_X}`}>
        <div className="mx-auto rounded-t-[4px] bg-[var(--mn-white)] p-2 sm:max-w-[609px] sm:p-6 lg:max-xl:p-4">
          <div className={`relative ${TILE}`}>
            <Shot label={REFS_LABEL} ground={false}>
              <Fluid width={PHONE.w} height={PHONE.h} className="sm:hidden">
                <BriefEnd width={PHONE.brief} height={PHONE.h} columns={2} />
              </Fluid>
              <Fluid width={WIDE.w} height={WIDE.h} className="max-sm:hidden">
                <BriefEnd width={WIDE.brief} height={WIDE.h} />
              </Fluid>
            </Shot>
            <span aria-hidden="true" className={`${outline} sm:hidden`} style={{ width: `${(PHONE.tile / PHONE.w) * 100}%` }} />
            <span aria-hidden="true" className={`${outline} max-sm:hidden`} style={{ width: `${(WIDE.tile / WIDE.w) * 100}%` }} />
          </div>
        </div>
      </div>
    </PeekBand>
  );
}

export function CreativeTeams() {
  const [b1, b2, ...bRest] = NEXT_CREATIVE_BRIEF.bullets;
  return (
    <Sheet id={CREATIVE_READER.id} className={SECTION_END}>
      <SectionMarker n={3}>
        <p>{CREATIVE_READER.label}</p>
      </SectionMarker>
      <FeatureRow flip eyebrow={NEXT_CREATIVE_BRIEF.eyebrow} headline={NEXT_CREATIVE_BRIEF.headline} accent="what to make next." cta={NEXT_CREATIVE_BRIEF.cta} tile={<ReferencePeek />}>
        <Bullets items={[b1, b2]} />
        <More>
          <Bullets items={bRest} open />
        </More>
      </FeatureRow>
    </Sheet>
  );
}
