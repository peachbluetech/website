import "./Hero.css";
import { ACCOUNT } from "@/components/product/sample";
import { Pill, Shell, T, TONE, cx } from "@/components/site/parts";
import { HERO } from "./content";
import { ShowcaseA } from "./hero/ShowcaseA";

/* The first screen, outside the rails.

   A split header on the shell's 12 columns: the headline at 48/52 in the
   display face in columns 1 to 6 (plain black, no phrase recoloured, two
   balanced lines), the lead in columns 7 to 12 ending on the headline's
   last baseline, the two pills 32px under the headline and the risk line
   under them in the page's one italic. The page's one h1, the keyword
   line, is first in the hero and visually hidden; the visible headline
   is an h2.

   40px lower, the hero picture (hero/ShowcaseA.tsx), which brings its
   own Shot (and so its own text alternative) and its own panel: the
   week's winning ad drawn whole on one lit white card (why it won, its
   94, what it spent, the one verb) with a pale cut list and a pale next
   brief, on the taupe panel. One picture that reflows: from a tablet up
   the lit card stands between the two pale ones; on a phone it is turned
   on end, the ad and its three tags first, then the verdict, then the
   two pale cards.

   Hero.css is imported first, so the picture's own stylesheets come
   after it. */

/* Where the headline breaks from 768 up, where it is two lines of 48px:
   before this word, so the first line is the whole noun phrase. The text
   is HERO.headline, unchanged; under 768 it is balanced over three lines. */
const BREAK_BEFORE = " for ";
const CUT = HERO.headline.indexOf(BREAK_BEFORE);
const HEADLINE = CUT < 0 ? [HERO.headline] : [HERO.headline.slice(0, CUT), HERO.headline.slice(CUT + 1)];

export function Hero() {
  return (
    <Shell as="section" className="el-hero">
      <div className="el-hero-grid">
        <h1 className="sr-only">{HERO.keywordHeading}</h1>
        <h2 className={cx(T.display, "el-hero-title")}>
          {HEADLINE[0]}
          {HEADLINE[1] && (
            <>
              {" "}
              <br className="el-from-md" />
              {HEADLINE[1]}
            </>
          )}
        </h2>
        <p className={cx(T.body, "el-pretty el-hero-lead")}>{HERO.subhead}</p>
        <div className="el-hero-actions">
          <Pill href={HERO.primaryCta.href}>{HERO.primaryCta.label}</Pill>
          <Pill href={HERO.secondaryCta.href} variant="outline" arrow={HERO.secondaryCta.arrow}>
            {HERO.secondaryCta.label}
          </Pill>
        </div>
        <p className={cx(T.caption, "el-italic", TONE.smoke, "el-hero-risk")}>{HERO.riskReversal}</p>
      </div>

      <div className="el-hero-stage">
        <ShowcaseA />
      </div>

      {/* The page's one visible mention of the sample account. Every Shot
          label already says it for assistive tech. */}
      <p aria-hidden="true" className={cx(T.caption, TONE.smoke, "el-hero-note")}>
        Sample account: {ACCOUNT.brand}
      </p>
    </Shell>
  );
}
