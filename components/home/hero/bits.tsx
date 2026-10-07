import type { CSSProperties } from "react";
import { AdThumb } from "@/components/product/ui";
import { Arrow, Tile, cx } from "@/components/site/parts";
import { ACTION, AD, DOLLARS, FRAME, SENTENCE, TAGS, VERDICT, WORDS, type AdPoint, type AdTag } from "./data";
import "./showcase.css";

/* The pieces of the hero picture (ShowcaseA.tsx). Each piece is small
   and takes no layout of its own: the picture arranges them and adds
   what only it has (its glance lists, its frames). Their rules are
   hero/showcase.css (.el-hs-*), their words and figures hero/data.ts.

   All of it is drawn inside a Shot, so none of it is reachable: static
   server components, no handlers, no headings, no links. Type is the
   system's own roles as bare classes (never the trimmed .el-t, which
   is for the chrome) with a tone class on every piece, because the
   product scope sets the app's own colour and face. */

/* ── The head ───────────────────────────────────────────────────── */

/** "New winner" at the left in ink, "This week" at the right in smoke, both 13/18. For a white card. */
export function WinnerHead({ className }: { className?: string }) {
  return (
    <div className={cx("el-hs-head", className)}>
      <span className="el-caption el-500 el-ink">{WORDS.winner}</span>
      <span className="el-caption el-smoke">{WORDS.when}</span>
    </div>
  );
}

/* ── The verdict ────────────────────────────────────────────────── */

/* The scale's parts: one per tier, from the product's own thresholds. */
const SPANS = VERDICT.marks.slice(1).map((to, i) => ({ from: VERDICT.marks[i], to }));

/** The product's 0 to 100 scale: four parts (the ad's own tier in the tier's colour, the rest stone), an ink tick at the score, the ends and thresholds as figures under it. As wide as its container. */
export function Scale({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="el-hs-scale">
        <div className="el-hs-track" style={{ gridTemplateColumns: SPANS.map((s) => `${s.to - s.from}fr`).join(" ") }}>
          {SPANS.map((s) => (
            <span key={s.from} className={cx("el-hs-seg", s.from >= VERDICT.from ? VERDICT.fill : "el-hs-seg--rest")} />
          ))}
        </div>
        <span className="el-hs-at" style={{ "--el-hs-x": `${VERDICT.score}%` } as CSSProperties} />
      </div>
      <div className="el-hs-marks">
        {VERDICT.marks.map((m) => (
          <span key={m} className="el-hs-mark el-micro el-tnum el-smoke" style={{ left: `${m}%` }}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/** "Score", the 94 at Inter 24/32 with its tier beside it, then the scale. As wide as its container (150 to 300px reads well). `scale={false}` leaves the scale out for a caller that places it elsewhere. */
export function Verdict({ scale = true, className }: { scale?: boolean; className?: string }) {
  return (
    <div className={className}>
      <div className="el-micro el-smoke">{WORDS.score}</div>
      <div className="el-hs-score">
        <span className="el-title-lg el-tnum el-ink">{VERDICT.score}</span>
        <span className="el-hs-tier el-body-sm el-500 el-ink">
          <span className={cx("el-hs-tier-dot", VERDICT.fill)} />
          {VERDICT.tier}
        </span>
      </div>
      {scale && <Scale />}
    </div>
  );
}

/* ── The reason ─────────────────────────────────────────────────── */

/** The ad's name (15/22 medium, or the caller's role through `nameClass`) over the worklist's one sentence (13/18 smoke, or `sentenceClass`). */
export function Why({ nameClass = "el-body-sm el-500", sentenceClass = "el-caption", className }: { nameClass?: string; sentenceClass?: string; className?: string }) {
  return (
    <div className={className}>
      <div className={cx(nameClass, "el-ink")}>{AD.name}</div>
      <div className={cx("el-hs-sentence el-smoke el-pretty", sentenceClass)}>{SENTENCE}</div>
    </div>
  );
}

/* ── What it earned, and what to do ─────────────────────────────── */

/** "$9,400.00" at Inter 20/27, tabular. */
export function Dollars({ className }: { className?: string }) {
  return <span className={cx("el-title el-tnum el-ink", className)}>{DOLLARS}</span>;
}

/** "Scale it" and its arrow at 15/22 medium in ink. A line of type, not a control: no ground, no edge, no shadow, and never a pill. */
export function Verb({ className }: { className?: string }) {
  return (
    <span className={cx("el-hs-verb el-body-sm el-500 el-ink", className)}>
      {ACTION}
      <Arrow />
    </span>
  );
}

/** The foot of a white card: one stone hairline, the dollars at the left, the verb at the right. */
export function Foot({ className }: { className?: string }) {
  return (
    <div className={cx("el-hs-foot", className)}>
      <Dollars />
      <Verb />
    </div>
  );
}

/* ── The three things read from the ad ──────────────────────────── */

/** A tag on a white card: the key (12/16 smoke) over its value (13/18 medium ink). Plain type. `style` is for a caller that places it level with its mark. */
export function TagText({ tag, className, style }: { tag: AdTag; className?: string; style?: CSSProperties }) {
  return (
    <span className={cx("el-hs-tag", className)} style={style}>
      <span className="el-micro el-smoke">{tag.key}</span>
      <span className="el-caption el-500 el-ink">{tag.value}</span>
    </span>
  );
}

/* ── The ad ─────────────────────────────────────────────────────── */

/** The winning ad, as wide as the class it is given makes it, with the three tags' marks on it.
    - The frame is the hero's own (FRAME in ./data): 2 by 3, from just over the headline to just under the can, so both are whole, because the hero is the one place where the whole idea of the ad has to read. The corners are the 8px of a picture inside a white card.
    - `priority`: the page's one large eager image.
    - The marks: each tag's mark stands at its point on the ad, with a hairline from it to the ad's right edge. The piece of hairline past the edge, and the tag itself, are the caller's: the same `top` as the mark (the point's `y` percent of the ad's height, rounded to a whole pixel as the mark's is) puts a tag level with it. */
export function Ad({ priority = false, className }: { priority?: boolean; className?: string }) {
  /* The whole 9:16 creative ("portrait", which has no focus of its own)
     in a box that showcase.css makes 2 by 3 and places with these two
     values. */
  const framing = { "--el-hs-frame": FRAME.ratio, "--el-hs-focus": FRAME.focus } as CSSProperties;
  return (
    <div className={cx("el-hs-ad el-hs-ad--hero", className)} style={framing}>
      <Tile small>
        <AdThumb imageUrl={AD.image} ratio="portrait" size="md" priority={priority} />
      </Tile>
      {TAGS.map((tag) => (
        <Mark key={tag.key} at={tag.hero} />
      ))}
    </div>
  );
}

/* One mark: the hairline over the ad and the disc. Where it stands goes
   to the stylesheet as two numbers (percent of the ad's box), which
   sets both on whole pixels. */
function Mark({ at }: { at: AdPoint }) {
  const place = { "--el-hs-x": `${at.x}%`, "--el-hs-y": `${at.y}%` } as CSSProperties;
  return (
    <>
      <span className="el-hs-lead el-hs-lead--in el-hs-lead--right" style={place} />
      <span className="el-hs-pin" style={place} />
    </>
  );
}

/** One ad of the cut list as a square thumbnail with 8px corners, as wide as the class it is given makes it (32 to 48px). Loaded lazily unless `priority`, which is for a list that is on the first screen when the page opens (the files are 2 to 5 KB each). */
export function CutThumb({ image, priority = false, className }: { image: string | null; priority?: boolean; className?: string }) {
  return (
    <Tile small className={className}>
      <AdThumb imageUrl={image} size="sm" priority={priority} />
    </Tile>
  );
}
