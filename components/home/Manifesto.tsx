import type { CSSProperties } from "react";
import { MANIFESTO } from "./content";
import { Block, T, TONE, cx } from "@/components/site/parts";
import "./Manifesto.css";

/* The manifesto (no id).

   The page's one centred moment, and its one two-tone statement at
   display size: a paragraph, not a heading, at 36/42 whose first sentence is smoke and whose second is ink. The tone
   changes by lightness only: same face, same size, same weight. Each
   sentence is its own block span, so the change falls on a line break
   at every width, and the two are joined by a space in the HTML.

   Under it, the source's one number as a bar: a 28px track with a
   hairline ring and no ground, filled for exactly the share the source
   sentence states (the figure is read from the sentence). The labels
   use words of that sentence only. This is the page's single
   code-native data primitive: a quiet object with its label inside. No
   axis, no legend, no display-size figure. It is decoration (aria-hidden): the source line under it says
   all of it, as a real paragraph.

   The labels are placed against the track at their resting places
   and are not children of the fill. Only the fill's inline size changes
   when the bar enters the viewport, so nothing is clipped or pushed.
   That fill is the page's one expressive motion (Manifesto.css): its
   resting width is plain CSS, so it is right with no support and under
   reduced motion.

   Under 768 the two part labels move under the bar, each starting where
   its part starts; the figure stays inside the fill.

   160px above, 120px under. Page.tsx draws the rule above this section
   and the rule under it.
   HTML order: section > p (two spans), the bar, p (source). */

/* The share, as printed in the source sentence, and the same figure as a
   length. */
const SHARE = /(\d+%)/.exec(MANIFESTO.source)?.[1] ?? "56%";
const SHARE_OF_100 = Math.min(100, Math.max(0, parseFloat(SHARE)));

/* The two parts of the bar, in the source sentence's own words. */
const PART = "Creative quality";
const REST = "Bid, targeting, placement";

export function Manifesto() {
  return (
    <section className="el-manifesto">
      <Block top="top" bottom="pad">
        <p className={cx(T.heading, "el-manifesto-statement")}>
          <span className={cx("el-manifesto-line", TONE.smoke)}>{MANIFESTO.lines[0]}</span>{" "}
          <span className="el-manifesto-line">{MANIFESTO.lines[1]}</span>
        </p>

        <div aria-hidden="true" className="el-manifesto-bar" style={{ "--el-share": `${SHARE_OF_100}%` } as CSSProperties}>
          <span className="el-manifesto-track">
            <span className="el-manifesto-fill" />
          </span>
          <span className="el-micro el-manifesto-label el-manifesto-label--part">{PART}</span>
          <span className="el-micro el-tnum el-manifesto-label el-manifesto-label--figure">{SHARE}</span>
          <span className="el-micro el-manifesto-label el-manifesto-label--rest">{REST}</span>
        </div>

        <p className={cx(T.bodySm, TONE.smoke, "el-balance el-manifesto-source")}>{MANIFESTO.source}</p>
      </Block>
    </section>
  );
}
