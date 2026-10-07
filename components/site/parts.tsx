import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";
import Link from "next/link";
import { Shot } from "@/components/product/frame";
import { PeachblueMark } from "./PeachblueMark";

/* The site's shared parts. Every page is one system: one canvas, one
   frame (rails, rules, a dot at every crossing), three display sizes,
   pills for every control, one flat taupe for cards, white only for
   raised things. Everything here is that system; a page's section files
   only arrange it. Every class is plain CSS from system.css (.el-*),
   and every colour is a token of the scope the page stands in (SitePage
   sets it). The rules of the system are in CLAUDE.md. */

/* Shot: the wrapper every product picture is rendered in. Always with
   ground={false} here (the frame brings the ground) and a one-sentence
   label that says "sample account". */
export { Shot };

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/* ── Scaling boxes for product pictures ─────────────────────────────
   They read no colour. Their rules (.pb-fluid, .bp-fit) are in
   app/globals.css, beside the product scope they serve. A frame (card,
   window, inner card, tile) is never inside one of these: only the
   fragment is scaled. */

/* A box that lays its content out at a design width and paints it at the
   width of its slot, with no cap. `height` is how much of the content to
   lay out: the box keeps that shape at every width, so whatever cuts a
   fragment cuts it at the same place on every screen. No Shot of its
   own: for a picture that has more than one layout inside one Shot. */
export function Fluid({ width, height, className = "", children }: { width: number; height: number; className?: string; children: ReactNode }) {
  return (
    <div className={`pb-fluid ${className}`} style={{ "--fw": width, "--fh": height, maxWidth: "none" } as CSSProperties}>
      <div className="pb-fluid-inner">{children}</div>
    </div>
  );
}

/* Peek: one product fragment in its own Shot, in a Fluid box. */
export function Peek({ label, width, height, className = "", children }: { label: string; width: number; height: number; className?: string; children: ReactNode }) {
  return (
    <Fluid width={width} height={height} className={className}>
      <Shot width={width} ground={false} label={label}>
        {children}
      </Shot>
    </Fluid>
  );
}

/* Pic: one product picture laid out at its design width and painted at
   the width of its slot, never wider than `max` (its own width unless
   told otherwise), so it is never scaled up. */
export function Pic({ label, width, height, max, className = "", children }: { label: string; width: number; height: number; max?: number; className?: string; children: ReactNode }) {
  return (
    <div className={`pb-fluid ${className}`} style={{ "--fw": width, "--fh": height, maxWidth: max ?? width } as CSSProperties}>
      <div className="pb-fluid-inner">
        <Shot width={width} ground={false} label={label}>
          {children}
        </Shot>
      </div>
    </div>
  );
}

/* Fit: a fragment whose rows hold their height (a list). Laid out at
   `width` and painted at the width of its slot, but never over one and a
   half times its size: where the slot is wider than that the fragment is
   laid out wider, at one and a half times. `height` is its height at its
   own size. No Shot of its own. */
export function Fit({ width, height, className = "", children }: { width: number; height: number; className?: string; children: ReactNode }) {
  return (
    <div className={`bp-fit ${className}`} style={{ "--fw": width, "--fh": height } as CSSProperties}>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
}

/* A figure never parts from its unit. A browser may end a line at any
   hyphen, so "7-day" can break as "7-" over "day" in a narrow column.
   Keep sets every word that joins a number to its unit with a hyphen on
   one line; the text is unchanged, the word is only wrapped. With
   `words` it holds every word joined by a hyphen ("per-client",
   "generation-ready"), for a list set in a narrow column. */
export function Keep({ text, words = false }: { text: string; words?: boolean }) {
  return (
    <>
      {text.split(words ? /(\S+-\S+)/ : /(\S*\d-\S+)/).map((part, i) =>
        i % 2 ? (
          <span key={i} className="el-keep">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/* ── Type ───────────────────────────────────────────────────────── */

/* The twelve roles and the eyebrow, each as trimmed block text (the
   .el-t class cuts the block to the cap top of its first line and the
   baseline of its last, which is what every distance in the system is
   measured between). Use these on headings, paragraphs, captions and
   list rows. For a label inside a pill, tag or chip, or a clipped
   one-line string, use the bare role class ("el-body-sm") without .el-t. */
export const T = {
  /* Display face, 48/52. The hero headline only. */
  display: "el-t el-display",
  /* Display face, 36/42. Section headings; the manifesto paragraph. */
  heading: "el-t el-heading",
  /* Display face, 32/36. The closing heading. */
  headingSm: "el-t el-heading-sm",
  /* Inter 24/32. Plan names, the two chat titles, the weekly and toolkit h2s, the platforms lead. */
  titleLg: "el-t el-title-lg",
  /* Inter 20/27. Prices. */
  title: "el-t el-title",
  /* Inter 18/26. Step titles. */
  subhead: "el-t el-subhead",
  /* Inter 17/25. FAQ questions and answers, "More". */
  bodyLg: "el-t el-body-lg",
  /* Inter 16/24. Leads, the essay, toolkit titles. */
  body: "el-t el-body",
  /* Inter 15/22. Captions, list rows, point text. */
  bodySm: "el-t el-body-sm",
  /* Inter 14/21. Footer links. */
  ui: "el-t el-ui",
  /* Inter 13/18. The risk line, footer labels, picture captions. */
  caption: "el-t el-caption",
  /* Inter 12/16 at 500. Chips inside pictures, the bar's labels, "Most popular". */
  micro: "el-t el-micro",
  /* Inter 15/22 at 500 in smoke. */
  eyebrow: "el-t el-eyebrow",
} as const;

/* Tone and weight. Ink is the default. Smoke is secondary text on the
   canvas; earth is secondary text on taupe (smoke on taupe fails AA). */
export const TONE = { ink: "el-ink", smoke: "el-smoke", earth: "el-earth" } as const;
export const MEDIUM = "el-500";

/* A section's own label: sentence case exactly as the page's copy has
   it, nothing before it. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx(T.eyebrow, className)}>{children}</p>;
}

/* ── The frame ──────────────────────────────────────────────────── */

/* The container: 1304px with the gutter inside it (content 1176 at 1440,
   350 at 390). */
export function Shell({ as: Tag = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={cx("el-shell", className)}>{children}</Tag>;
}

/* The framed column: the shell with a rail down each edge. A page
   renders it once, around every section between its header and the
   footer. */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="el-shell">
      <div className="el-frame">{children}</div>
    </div>
  );
}

const MARKS = {
  ends: [0, 100],
  halves: [0, 50, 100],
  thirds: [0, 33.3333, 66.6667, 100],
  quarters: [0, 25, 50, 75, 100],
  fifths: [0, 20, 40, 60, 80, 100],
} as const;

/* A rule: a 1px line across the screen with a crossing mark at every
   rail or inner rail that meets it, from above or below. `marks` names
   where: "ends" (the two rails), "halves" (over or under a split row),
   "thirds" (over or under three ruled cells), "quarters" and "fifths"
   (four and five). Marks over inner rails are drawn only from 1024,
   where the inner rails exist.

   The page draws the rule between every two sections and the rule that
   closes the frame, so a section never draws its own first or last
   rule: only the ones inside it. Rules are never doubled. */
export function Rule({ marks = "ends", className }: { marks?: keyof typeof MARKS; className?: string }) {
  return (
    <div aria-hidden="true" className={cx("el-rule", className)}>
      {MARKS[marks].map((at) => (
        <span key={at} className={cx("el-x", at > 0 && at < 100 && "el-x--inner")} style={{ left: `${at}%` }} />
      ))}
    </div>
  );
}

/* ── Blocks ─────────────────────────────────────────────────────── */

/* The named vertical distances. Desktop, then under 768:
   top 160/120 (rule to eyebrow or heading), pad 120/80 (text-only
   section bottom), band 72/48 (slim ruled bands), row 48/32 (ruled cells
   and split rows), gap 40/24 (header block to media; note rows), s 24,
   shelf 16 (media to the next rule). */
export type Space = "none" | "top" | "pad" | "band" | "row" | "gap" | "s" | "shelf";

/* One horizontal slice of a section inside the frame. `inset` is how far
   its content sits from the rails: "text" 48px (16 on a phone), "card"
   16px (8 on a phone), "none". Cards overhang the text edge by 32px a
   side on purpose. */
export function Block({
  as: Tag = "div",
  inset = "text",
  top = "none",
  bottom = "none",
  id,
  className,
  children,
}: {
  as?: ElementType;
  inset?: "text" | "card" | "none";
  top?: Space;
  bottom?: Space;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={cx(inset !== "none" && `el-in-${inset}`, top !== "none" && `el-pt-${top}`, bottom !== "none" && `el-pb-${bottom}`, className)}>
      {children}
    </Tag>
  );
}

/* The split section header. Left (columns 1 to 6), top to bottom: the
   reader label (ink), the eyebrow (smoke), the heading, the section's
   action as a 44px pill. Right (columns 7 to 12): the children, in the
   heading's row: one lead paragraph, a list, or nothing. A lead shorter
   than the heading ends on the heading's last baseline; a right column
   taller than the heading starts level with its cap top (the system's
   rule, and the homepage hero's). Three variants: heading and lead;
   heading alone (a header cell); heading and a list. A header with both
   an action and a right column taller than its heading is not built:
   the action would be pushed under the column.

   The heading is an h2 at 36/42 unless told otherwise; the level is the
   current page's and the size is a style. In the HTML the order is
   label, eyebrow, heading, action, children. Under 1024 it stacks as
   label, eyebrow, heading, children, action. Wrap it in a Block with
   inset "text" and top "top". */
export function SplitHead({
  label,
  eyebrow,
  title,
  as: Heading = "h2",
  titleClass = T.heading,
  action,
  className,
  children,
}: {
  /** The reader label ("For creative teams"), an ink line over the eyebrow. */
  label?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  as?: "h2" | "h3" | "p";
  /** The heading's type role. T.heading unless the section says otherwise. */
  titleClass?: string;
  /** The section's own action: a Pill (or two) under the heading. */
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cx("el-split", className)}>
      {(label || eyebrow) && (
        <div className="el-split-pre">
          {label && <p className={cx(T.bodySm, MEDIUM, TONE.ink)}>{label}</p>}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </div>
      )}
      <Heading className={cx(titleClass, "el-split-title")}>{title}</Heading>
      {action && <div className="el-split-action">{action}</div>}
      {children && <div className="el-split-side">{children}</div>}
    </div>
  );
}

/* The side header: a 354px heading column and a 724px content column at
   1440, no gutter between them (the FAQ, the toolkit). Two children.
   `flip` puts the wide column first (an article with its side column at
   the right). Stacks under 1024. */
export function Side({ as: Tag = "div", flip = false, className, children }: { as?: ElementType; flip?: boolean; className?: string; children: ReactNode }) {
  return <Tag className={cx("el-side", flip && "el-side--flip", className)}>{children}</Tag>;
}

/* Ruled cells: equal columns divided by inner rails, from 1024 (the
   three steps, the three plans, the two halves of a split row). The rule
   above and the rule under the set carry `marks` "thirds" or "halves".
   Under 1024 the cells stack: with `ruled` a rule and its two marks is
   drawn between them, without it they stack bare (the split rows). */
export function Cells({
  as: Tag = "div",
  cols = 3,
  ruled = true,
  className,
  children,
}: {
  as?: ElementType;
  cols?: 2 | 3 | 4 | 5;
  ruled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cx("el-cells", ruled && "el-cells--ruled", className)} style={{ "--el-cols": cols } as CSSProperties}>
      {children}
    </Tag>
  );
}

/* One cell. `pad` "text" is 48px all round (32 by 16 on a phone), "card"
   is 16px all round (8 on a phone), "none" leaves it to the caller. */
export function Cell({
  as: Tag = "div",
  pad = "text",
  className,
  children,
}: {
  as?: ElementType;
  pad?: "text" | "card" | "none";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cx("el-cell", className)}>
      <Rule className="el-cell-rule" />
      {pad === "none" ? children : <div className={`el-cell-${pad}`}>{children}</div>}
    </Tag>
  );
}

/* A row of cards, 16px apart: two equal cards, or two thirds and one
   third (`split`). One column under 1024. Wrap it in a Block with inset
   "card". */
export function Cards({ split = false, cols = 2, className, children }: { split?: boolean; cols?: 2 | 3 | 4; className?: string; children: ReactNode }) {
  return (
    <div className={cx("el-cards", split && "el-cards--21", className)} style={{ "--el-cols": cols } as CSSProperties}>
      {children}
    </div>
  );
}

/* Plain text columns on the grid's 48px gap, from 1024 (the three
   economics points): no rule over them, no icons. Under 1024 they stack
   32px apart. */
export function Columns({ cols = 3, className, children }: { cols?: 2 | 3 | 4; className?: string; children: ReactNode }) {
  return (
    <div className={cx("el-columns", className)} style={{ "--el-cols": cols } as CSSProperties}>
      {children}
    </div>
  );
}

/* ── Controls ───────────────────────────────────────────────────── */

/* An internal path goes through the router; anything else is a plain
   anchor. The href and the text are the published ones, untouched. */
function Anchor({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; "aria-label"?: string; "aria-current"?: "page" }) {
  return href.startsWith("/") ? (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

/* The text arrow that is part of some published anchor texts. It stays
   inside the anchor, hidden from assistive tech, and never moves. */
export function Arrow() {
  return (
    <>
      {" "}
      <span aria-hidden="true" className="el-arrow">
        &rarr;
      </span>
    </>
  );
}

/* The pill: the page's one control shape.
   - variant "filled": navy, white label. The action. At most one in a
     section. A filled pill drops its arrow.
   - variant "outline": white with the whisper shadow as its only edge.
     The secondary. Keeps its arrow where the page's copy has one.
   - size "md" is 44px (page), "sm" is 36px (nav and inside cards).
   - `block` fills its container's width (the plan buttons).
   - `current` marks a link to the page the reader is on (aria-current;
     the nav's "Book a demo" on the demo page). It changes nothing seen.
   Hover changes the ground, press scales to 0.98, keyboard focus draws
   the blue ring. A white pill with the whisper shadow is always a link:
   never use this shape for something that does nothing. */
export function Pill({
  href,
  variant = "filled",
  size = "md",
  arrow = false,
  block = false,
  current = false,
  className,
  children,
}: {
  href: string;
  variant?: "filled" | "outline";
  size?: "md" | "sm";
  arrow?: boolean;
  block?: boolean;
  current?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Anchor
      href={href}
      aria-current={current ? "page" : undefined}
      className={cx("el-pill", `el-pill--${variant}`, size === "sm" && "el-pill--sm", arrow && "el-pill--arrow", block && "el-pill--block", className)}
    >
      {children}
      {arrow && <Arrow />}
    </Anchor>
  );
}

/* The pill as a button, for the few controls that are not links (a
   form's submit, a choice that changes what the page shows). The same
   two variants and sizes as Pill; every other attribute of a button
   passes through (type, disabled, onClick, aria-pressed). `type` is
   "button" unless told otherwise. Never for navigation: a link is a
   Pill. */
export function PillButton({
  variant = "filled",
  size = "md",
  block = false,
  type = "button",
  className,
  children,
  ...rest
}: {
  variant?: "filled" | "outline";
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button type={type} className={cx("el-pill", `el-pill--${variant}`, size === "sm" && "el-pill--sm", block && "el-pill--block", className)} {...rest}>
      {children}
    </button>
  );
}

/* A plain text link: ink, smoke under the pointer (footer links,
   platform links). Pass the type role in className. `underline` adds
   the hairline underline of a link in running text, for a link that
   stands alone in a line of text. */
export function TextLink({ href, underline = false, className, children }: { href: string; underline?: boolean; className?: string; children: ReactNode }) {
  return (
    <Anchor href={href} className={cx("el-link", underline && "el-link--under", className)}>
      {children}
    </Anchor>
  );
}

/* The text link as a button: a quiet control that changes what the page
   shows and goes nowhere ("send us a note instead"). Underlined, so it
   reads as something to press. Every attribute of a button passes
   through; pass the type role in className. */
export function TextButton({ type = "button", className, children, ...rest }: { className?: string; children: ReactNode } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button type={type} className={cx("el-link el-link--under el-textbtn", className)} {...rest}>
      {children}
    </button>
  );
}

/* A row that is one link (the toolkit rows): put an ArrowNE in it and
   the arrow goes from smoke to ink under the pointer and on focus. */
export function RowLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <Anchor href={href} className={cx("el-rowlink", className)}>
      {children}
    </Anchor>
  );
}

/* The system's drawn glyphs are functional and hand-drawn: the chevron,
   the row arrow, the menu strokes (CSS, in the nav) and the tick. No
   icon set is imported anywhere in the system. */

/* The 16px chevron of a disclosure row: two 1.5px round-capped strokes. */
export function Chevron() {
  return (
    <svg aria-hidden="true" className="el-glyph" width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 6 8 10.5 12.5 6" />
    </svg>
  );
}

/* The 12px north-east arrow at the end of a row link. */
export function ArrowNE() {
  return (
    <svg aria-hidden="true" className="el-glyph" width={12} height={12} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9 9 3M4.5 3H9v4.5" />
    </svg>
  );
}

/* The 16px tick: "included" in a comparison, and the mark before a
   line of what a plan holds. It takes the colour of the text it stands
   in. Decoration by default; give it a `label` where it is the cell's
   whole content ("Included"). */
export function Check({ label }: { label?: string }) {
  return (
    <svg
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      className="el-mark"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  );
}

/* ── Lists and disclosure ───────────────────────────────────────── */

/* Rows on dotted separators: none above the first row, none under the
   last. `lead` also draws one above the first row, for a list that
   follows a row (the rows inside "More"). Strings become plain 15/22
   rows; pass children instead for rows of your own (give each row its
   own vertical padding). */
export function Dotted({
  as: Tag = "ul",
  items,
  lead = false,
  className,
  children,
}: {
  as?: ElementType;
  items?: readonly string[];
  lead?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Tag className={cx("el-dotted", lead && "el-dotted--lead", className)}>
      {items?.map((text) => (
        <li key={text} className={cx("el-row", T.bodySm, "el-pretty")}>
          {text}
        </li>
      ))}
      {children}
    </Tag>
  );
}

/* The disclosure row: a native details, so its content is in the HTML
   the server sends and it opens without script. The summary is a row:
   the label at 17/25 in ink, 20px above and below, and the chevron at
   the right (smoke; ink on hover and when open, when it also turns).
   `labelAs="h3"` makes the label a heading (the FAQ's questions). It
   opens over 240ms where the browser can animate a details and at once
   everywhere else. As a row of a dotted list it takes the list's
   separator like any other row. */
export function Disclosure({
  label,
  labelAs: Label = "span",
  open = false,
  className,
  children,
}: {
  label: ReactNode;
  labelAs?: "span" | "h3";
  open?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <details className={cx("el-disc", className)} open={open || undefined}>
      <summary>
        <Label className={cx(T.bodyLg, "el-disc-label")}>{label}</Label>
        <Chevron />
      </summary>
      {children}
    </details>
  );
}

/* "More": the lines a first read can skip, as further dotted rows. The
   word "More" is checked copy; it appears twice on the page. */
export function More({ items, label = "More", className }: { items: readonly string[]; label?: string; className?: string }) {
  return (
    <Disclosure label={label} className={className}>
      <Dotted items={items} lead />
    </Disclosure>
  );
}

/* ── Surfaces ───────────────────────────────────────────────────── */

/* The taupe card and panel: flat warm grey, 24px corners, a 0.5px ring,
   no shadow, no hover. It clips what it holds, so a window in it is cut
   by its edge.
   - variant "pad": the card. 28px sides, 28 top, 32 bottom (20 on a phone).
   - variant "wide": the wide panel. 48 top, 32 sides, a window standing
     on its foot.
   - variant "tile": the small taupe tile (a plan's name and price):
     20px corners, 20px of padding.
   - variant "bare": no padding; the caller places what is in it (the
     homepage's hero panel).
   - tone "navy": the one highlighted tile of a set (the popular plan):
     flat navy with everything on it in white. At most one in a section,
     and only on a tile.
   Taupe is for cards, panels and tiles only: never a section band. */
export function Card({
  as: Tag = "div",
  variant = "pad",
  tone = "taupe",
  className,
  style,
  children,
}: {
  as?: ElementType;
  variant?: "pad" | "wide" | "tile" | "bare";
  tone?: "taupe" | "navy";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Tag className={cx("el-card", variant !== "bare" && `el-card--${variant}`, tone === "navy" && "el-card--navy", className)} style={style}>
      {children}
    </Tag>
  );
}

/* The product window: white, 16px top corners, a 0.5px edge, no shadow.
   Always cut by the edge of the card it stands in, never shown whole:
   its foot is open and square. `bleed` also runs it off the card's right
   edge. `pad` adds 16px of white round a fragment that has none.
   Put the scaled fragment inside it (Fluid, Peek), never the window
   inside a scaled box. */
export function Window({ bleed = false, pad = false, className, children }: { bleed?: boolean; pad?: boolean; className?: string; children: ReactNode }) {
  return (
    <div className={cx("el-window", bleed && "el-window--bleed", className)} style={pad ? ({ "--el-window-pad": "16px 16px 0" } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}

/* The inner card: white, 20px corners, the whisper shadow, 16px of
   padding. Holds one distilled fragment, whole; never cropped. `flush`
   drops the padding for a fragment that brings its own. */
export function Inner({ flush = false, className, children }: { flush?: boolean; className?: string; children: ReactNode }) {
  return <div className={cx("el-inner", flush && "el-inner--flush", className)}>{children}</div>;
}

/* The image tile: one ad, whole, 20px corners and a 1px inner ring.
   Its one child is an AdThumb (ratio "four-five" or "wide"), which sets
   the shape; the tile takes over its corners. `small` is the 8px corner
   of a thumbnail inside a picture. */
export function Tile({ small = false, className, children }: { small?: boolean; className?: string; children: ReactNode }) {
  return <div className={cx("el-tile", small && "el-tile--sm", className)}>{children}</div>;
}

/* The small outlined tag ("Most popular"): an ink hairline, 8px corners,
   Inter 12/16 at 500. Not a control and not pill-shaped. */
export function Tag({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cx("el-tag", className)}>{children}</span>;
}

/* ── The logo ───────────────────────────────────────────────────── */

/* The brand's gradient tile with the white p. 28px in the nav and the
   footer; 20px beside the title "Chat with Agent Peach". Decoration: the
   name is always printed beside it. */
export function LogoTile({ size = 28 }: { size?: 20 | 28 }) {
  return (
    <span aria-hidden="true" className={cx("pb-logo el-logo-tile", size === 20 && "el-logo-tile--20")}>
      <PeachblueMark size={size === 28 ? 16 : 12} />
    </span>
  );
}

/* The logo, whole: the tile and the wordmark in its own lettering
   (Fraunces 600, the page's only heavy type), in ink. Never re-typeset
   in the display face. */
export function Logo() {
  return (
    <>
      <LogoTile />
      <span className="el-logo-word">peachblue</span>
    </>
  );
}
