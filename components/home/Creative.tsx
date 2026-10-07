import "./Creative.css";
import { BriefView, RecipeLedger, type ReferenceAd } from "@/components/product/brief";
import { CREATIVES } from "@/components/product/sample";
import { Block, Card, Cards, Fluid, Inner, More, Pill, Shot, SplitHead, T, cx } from "@/components/site/parts";
import { NEXT_CREATIVE_BRIEF } from "./content";

/* For creative teams: Next Creative Brief (#creative-teams). The
   section opens as every section does (rule, 160px), the reader label
   is an ink line over the eyebrow, and the section's trial link is the
   one filled pill, 32px under the heading. Nothing stands in columns 7
   to 12: a header cell.

   40px lower, one row of two taupe cards, two thirds and one third. Each
   holds one distilled piece of the brief in a white inner card floated in
   its upper part, and one of the section's sentences pinned bottom left
   as its caption:
   - the brief's "winning recipe" ledger, five tag values with the lift
     each carries;
   - two of the brief's reference ads, each with its name and its
     figures. No outline marks either as chosen.
   The other three sentences wait in a "More" row under the cards.

   Page.tsx draws the rule above this section and the rule under it. */

/* The reader this section speaks to: its id (a link target) and the
   label over its eyebrow. */
const CREATIVE_READER = { id: "creative-teams", label: "For creative teams" };

/* The recipe picture's text alternative. */
const RECIPE_LABEL =
  "The winning recipe from a creative brief for a sample account: playful tone, studio backdrop, benefit-led hook, minimal text and a vibrant palette, each with the lift in return it carries across the account.";

/* Where the heading breaks, at every width: before this word, so the
   second line is the whole question. The text is the headline,
   unchanged; the break is only a line break. */
const BREAK_BEFORE = " what ";
const CUT = NEXT_CREATIVE_BRIEF.headline.indexOf(BREAK_BEFORE);
const HEADLINE = CUT < 0 ? [NEXT_CREATIVE_BRIEF.headline] : [NEXT_CREATIVE_BRIEF.headline.slice(0, CUT), NEXT_CREATIVE_BRIEF.headline.slice(CUT + 1)];

/* The two reference ads, in this order: "Honestly? So good." (a creator
   talking to the camera, can in hand) and "Your new little ritual.".
   The pair is chosen for the page and is not the head of the brief's own
   four: the first of those, the mirror selfie, already leads the Agent
   Peach section above, so this picture shows a different person.
   Names, pictures and figures are the sample account's own (sample.ts);
   the brief is given the pair in place of its own four through its
   `referenceAds` prop. How each picture is cropped is the creative's own
   focus (ui/adFocus.json). */
const ref = (c: { key: string; name: string; image: string; ctr: number; roas: number }): ReferenceAd => ({ key: c.key, name: c.name, image: c.image, ctr: c.ctr, roas: c.roas });
const REFS: ReferenceAd[] = [ref(CREATIVES.honestlySoGood), ref(CREATIVES.littleRitual)];

const REFS_LABEL = `Two of the reference ads in a creative brief for a sample account, each a picture with its name, click-through rate and return: ${REFS.map((r) => `"${r.name}" at ${r.ctr}% CTR and ${r.roas.toFixed(1)}x`).join(", and ")}.`;

/* The brief's last row, the reference ads, on its own: the brief laid
   out REFS_W wide in its narrow grid (two ads across, 132px each) and
   anchored by its foot, seen through a window REFS_H tall: the two tiles
   and nothing over them. A 132px tile is too narrow for either name on
   one line, so each name is given two lines (Creative.css), which is what
   makes the row 205px: 132 of tile, 10, two lines of 17.25, 2, 16.5, 10.
   The same layout at every width, painted at the width of its slot. */
const REFS_W = 276;
const REFS_H = 205;

function BriefEnd() {
  return (
    <div className="el-creative-end">
      <div className="el-creative-end-in">
        <BriefView stopAfter="references" referenceColumns={2} referenceAds={REFS} bare />
      </div>
    </div>
  );
}

export function Creative() {
  const [b1, b2, ...rest] = NEXT_CREATIVE_BRIEF.bullets;
  return (
    <section id={CREATIVE_READER.id} className="el-creative">
      <Block top="top" bottom="gap">
        <SplitHead
          label={CREATIVE_READER.label}
          eyebrow={NEXT_CREATIVE_BRIEF.eyebrow}
          title={
            <>
              {HEADLINE[0]}
              {HEADLINE[1] && (
                <>
                  {" "}
                  <br />
                  {HEADLINE[1]}
                </>
              )}
            </>
          }
          action={<Pill href={NEXT_CREATIVE_BRIEF.cta.href}>{NEXT_CREATIVE_BRIEF.cta.label}</Pill>}
        />
      </Block>

      <Block inset="card">
        <Cards split>
          <Card className="el-creative-card">
            <Shot label={RECIPE_LABEL} ground={false}>
              <Inner className="el-creative-recipe">
                {/* A Fluid whose two numbers live in Creative.css, so the
                    one ledger is laid out 560 wide from 768 and at a
                    phone's width under it. */}
                <div className="pb-fluid el-creative-ledger">
                  <div className="pb-fluid-inner">
                    <RecipeLedger />
                  </div>
                </div>
              </Inner>
            </Shot>
            <p className={cx(T.bodySm, "el-pretty el-creative-caption")}>{b1}</p>
          </Card>

          <Card className="el-creative-card">
            <Shot label={REFS_LABEL} ground={false}>
              <Inner className="el-creative-refs">
                <Fluid width={REFS_W} height={REFS_H}>
                  <BriefEnd />
                </Fluid>
              </Inner>
            </Shot>
            <p className={cx(T.bodySm, "el-pretty el-creative-caption")}>{b2}</p>
          </Card>
        </Cards>
      </Block>

      <Block top="s" bottom="shelf">
        <More items={rest} />
      </Block>
    </section>
  );
}
