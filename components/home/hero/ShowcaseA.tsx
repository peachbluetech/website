import type { CSSProperties } from "react";
import { Card, Inner, Shot } from "@/components/site/parts";
import { Ad, CutThumb, Foot, TagText, Verdict, WinnerHead, Why } from "./bits";
import { CUTS, LABEL, RECIPE, TAGS, WORDS } from "./data";
import "./ShowcaseA.css";

/* The hero picture (rendered by Hero.tsx).

   One picture that reflows. From a tablet up it is a triptych: on the
   taupe panel, one lit white card in the middle and a pale card either
   side of it, smaller, centred on it and run off the panel's edge, the
   cut list at the left and the next brief at the right. One large thing
   in the middle, quieter ones either side, the outermost cut by the
   panel. On a phone the same lit card is turned on end, picture first:
   the ad as large as on a desktop with its three tags still beside it,
   each still on its hairline, then the verdict, the reason and the foot
   under it, then the two pale cards.

   The lit card answers the five questions in reading order. What won:
   the ad, in a frame of its own that holds its headline and its can
   whole (2 by 3; the library's 4:5 tile loses the can's foot), because
   this is the one place on the page where the whole idea of the ad has
   to read. Why: three tags in a lane beside it, each level with a mark
   on the thing it names and joined to it by one hairline. How good: the
   94 on the product's own scale. What it spent and what to do: the
   card's foot, the dollars at the left and the one verb at the right.
   The two pale cards are the glances: what to cut, what to brief next.

   One set of elements, four arrangements, chosen by the width of the
   panel itself (ShowcaseA.css):
   - the triptych, whole (screens from 1186). On a desktop monitor (the
     panel at its full width and the screen 920 or more tall) the ad in
     it is 224 by 336, not 192 by 288, and the lit card grows with it;
   - the triptych with the next brief's values only (1024 to 1185);
   - the lit card with the two pale cards in a strip under it (684 to
     1023);
   - picture first (under 684, phones): the lit card as one column, the
     ad and its tags, then the verdict, the reason and the foot; the two
     pale cards under it.
   The ad, the tags, the verdict, the reason, the foot and the cut list
   are in the HTML once and only moved; the next brief is there twice
   because its lines are a size smaller where it stands under the card.
   The parts are the same in every arrangement: the lit card and the two
   pale ones, the tags as a key over its value, the same figures and the
   one verb, the cut list's thumbnails grey.

   Every word and figure is ./data's, read from the sample account. The
   pieces are ./bits's (rules in showcase.css). This file only arranges
   them; its own rules are ShowcaseA.css (.el-ha-*). Nothing moves and
   nothing answers the pointer: the picture is right at rest, and the
   Shot it is in is inert. */

/* What to cut. Four thumbnails and their scores: rows on hairlines
   beside the lit card, a small grid under it. They are on the first
   screen of a desktop, so the four small files are loaded eagerly. */
function Cut() {
  return (
    <div className="el-ha-pale el-ha-cut">
      <div className="el-ha-col">
        <div className="el-ha-cut-head el-caption el-500 el-earth">{WORDS.cut}</div>
        <div className="el-ha-cuts">
          {CUTS.map((cut) => (
            <span key={cut.key} className="el-ha-cut-item">
              <CutThumb image={cut.image} priority className="el-ha-thumb" />
              <span className="el-ha-cut-score el-caption el-500 el-tnum el-earth">{cut.score}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* What to brief next, beside the lit card: four rows on hairlines at
   13/18, the value at the left and its lift at the right. */
function BriefSide() {
  return (
    <div className="el-ha-pale el-ha-brief el-ha-brief--side">
      <div className="el-ha-col">
        <div className="el-caption el-500 el-earth">{WORDS.brief}</div>
        <div className="el-ha-brief-rows">
          {RECIPE.map((line) => (
            <div key={line.value} className="el-ha-brief-row">
              <span className="el-caption el-earth">{line.value}</span>
              <span className="el-ha-lift el-caption el-500 el-tnum el-earth">{line.lift}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* The same four lines under the lit card, at 12/16. */
function BriefUnder() {
  return (
    <div className="el-ha-pale el-ha-brief el-ha-brief--under">
      <div className="el-caption el-500 el-earth">{WORDS.brief}</div>
      <div className="el-ha-lines">
        {RECIPE.map((line) => (
          <div key={line.value} className="el-ha-line">
            <span className="el-ha-plain el-micro el-earth">{line.value}</span>
            <span className="el-micro el-tnum el-earth">{line.lift}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShowcaseA() {
  return (
    <Shot label={LABEL} ground={false}>
      <Card variant="bare" className="el-ha">
        <div className="el-ha-set">
          <Inner className="el-ha-lead">
            <WinnerHead className="el-ha-head" />
            {/* The ad in the hero's frame (its headline and its can
                both whole), with its three marks. Each mark's hairline
                runs to the ad's right edge; the piece of it past the
                edge is the lane's (ShowcaseA.css), because its length
                changes with the arrangement. */}
            <Ad priority className="el-ha-ad" />
            {/* The three tags: a lane beside the ad and as tall as it,
                each tag level with its mark (the same share of the
                lane's height as the mark's of the ad's). */}
            <div className="el-ha-tags">
              {TAGS.map((tag) => (
                <TagText key={tag.key} tag={tag} className="el-ha-tag" style={{ "--el-hs-y": `${tag.hero.y}%` } as CSSProperties} />
              ))}
            </div>
            <Verdict className="el-ha-verdict" />
            <Why className="el-ha-why" />
            <Foot className="el-ha-foot" />
          </Inner>
          <Cut />
          <BriefSide />
          <BriefUnder />
        </div>
      </Card>
    </Shot>
  );
}
