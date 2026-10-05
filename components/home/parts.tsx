import type { CSSProperties, ReactNode } from "react";
import { Shot } from "@/components/product/frame";

/* The homepage's shared pieces. The page is one system: one frame, one
   rule, one mark, one label, one way to set a figure, two stroke weights,
   four grounds. Everything here is that system; the section files only
   arrange it. Every colour is a CSS variable from theme.ts. */

/* ── The frame ──────────────────────────────────────────────────── */

/* The column every section is ruled to: 1312px, with a narrow gutter on a
   phone so the two vertical rules stay on screen. */
export const FRAME = "mx-auto w-full max-w-[1312px]";
export const GUTTER = "px-4 sm:px-8 lg:px-16";
/* The inset of content inside the two vertical rules. */
export const INSET = "px-4 sm:px-8 lg:px-12";
/* The air between the end of one section's content and the next rule. */
export const SECTION_END = "pb-16 md:pb-24 lg:pb-32";
/* The air between two rows of one reader group: 96px from md, 64px on a
   phone, so two navy bands never stand closer than that. A row brings
   48px of it as its own top padding (FeatureRow's `pt-12`, and the same
   on the root of a row that is not a FeatureRow); ROW_GAP is the rest,
   on a wrapper around every row after a group's first. */
export const ROW_GAP = "pt-4 md:pt-12";

/* ── Type: eight steps, and the two ways to set a number ────────── */

export const T = {
  /* Hero headline only. */
  display: "font-display text-[clamp(40px,5vw,72px)] font-semibold leading-[1.02] tracking-[-0.025em]",
  /* Essay, manifesto, close. */
  statement: "font-display text-[clamp(34px,3.9vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]",
  /* Feature row headings. */
  h2: "font-display text-[clamp(32px,3.1vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em]",
  /* Step titles, section titles, the essay's turn line. */
  h3: "font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-[28px]",
  /* Hero and close subheads. */
  bodyLg: "text-[16px] leading-[1.6] md:text-[18px] md:leading-[28px]",
  body: "text-[16px] leading-[1.6]",
  small: "text-[14px] leading-[1.5]",
  /* The one label: mono caps, always horizontal, never on a filled block. */
  label: "font-mono text-[11px] font-medium uppercase leading-none tracking-[0.12em]",
  /* Its 10px cut, inside figures and tags only (11px on a phone). */
  labelFig: "font-mono text-[11px] font-medium uppercase leading-none tracking-[0.12em] sm:text-[10px]",
} as const;

/* A display figure: Fraunces, lining and tabular. Sizes 72, 40 and 28.
   Its line height is set where it is used (1, or 0 inside a line of text). */
export const FIGURE = "font-display font-semibold tracking-[-0.03em] [font-variant-numeric:lining-nums_tabular-nums]";
/* A small figure: mono, tabular, 13px. */
export const MONO_FIG = "font-mono text-[13px] font-medium leading-none [font-variant-numeric:tabular-nums]";

/* Colour shorthands on paper. */
export const PAPER = {
  ink: "text-[color:var(--mn-paper-ink)]",
  body: "text-[color:var(--mn-paper-body)]",
  muted: "text-[color:var(--mn-paper-muted)]",
  accent: "text-[color:var(--mn-paper-accent)]",
  accentLg: "text-[color:var(--mn-paper-accent-lg)]",
  rule: "border-[color:var(--mn-paper-rule)]",
};

/* The page's focus ring: 2px in the accent, 2px off the thing it is on. */
export const FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--mn-focus)]";
/* The same ring drawn inside a ruled cell (the platform links, the
   toolkit's cells), so the rules round the cell stay clear of it. */
export const FOCUS_IN = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--mn-focus)]";

/* ── Marks, rules, markers ──────────────────────────────────────── */

/* The registration mark: a 13px plus of 1px lines, centred on the pixel
   it is placed at (its className positions that pixel's top left
   corner). One colour, at the dim line strength of the ground it is on.
   The page draws it in two places only: the two ends of the hero's
   rule, and the four corners of the essay's navy panel. */
export function Plus({ className = "", on = "paper" }: { className?: string; on?: "paper" | "field" | "navy" }) {
  const colour = on === "navy" ? "text-[color:var(--mn-on-navy-line-dim)]" : on === "field" ? "text-[color:var(--mn-line-dim)]" : "text-[color:var(--mn-paper-line-dim)]";
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute block size-px ${colour} ${className}`}>
      <span className="absolute -left-1.5 top-0 h-px w-[13px] bg-current" />
      <span className="absolute -top-1.5 left-0 h-[6px] w-px bg-current" />
      <span className="absolute left-0 top-px h-[6px] w-px bg-current" />
    </span>
  );
}

/* The four marks of a navy panel, 16px in from each corner. From sm,
   where the panel is inset and has its corners. */
export function PanelMarks() {
  return (
    <div aria-hidden="true" className="max-sm:hidden">
      <Plus on="navy" className="left-4 top-4" />
      <Plus on="navy" className="right-4 top-4" />
      <Plus on="navy" className="bottom-4 left-4" />
      <Plus on="navy" className="bottom-4 right-4" />
    </div>
  );
}

/* A horizontal rule across the frame. */
export function RuleRow({ className = "" }: { className?: string }) {
  return <div className={`h-px bg-[var(--mn-paper-rule)] ${className}`} />;
}

const two = (n: number) => String(n).padStart(2, "0");

/* The index a titled section carries, in the label style. The page's one
   numbering system; decoration. */
export function Index({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`${T.label} ${className}`}>
      {two(n)}
    </span>
  );
}

/* What opens every numbered section, the same nine times (01 to 09):
   a rule across the frame, then a 56px strip holding the section's index
   and its title at H3 (the children: a heading or a paragraph), closed
   by a second rule. `rule={false}` leaves the first rule out where the row
   above already ends on one (How it works, under the hero's foot rule). */
export function SectionMarker({ n, rule = true, children }: { n: number; rule?: boolean; children: ReactNode }) {
  return (
    <div>
      {rule && <RuleRow />}
      <div className={`flex h-14 items-center border-b ${PAPER.rule} ${INSET}`}>
        {/* The index stands on the title's baseline. */}
        <div className={`flex items-baseline gap-4 ${T.h3} ${PAPER.ink}`}>
          <Index n={n} className={PAPER.muted} />
          {children}
        </div>
      </div>
    </div>
  );
}

/* A section's own label, in the label style, led by the 6px marker. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2 ${T.label} ${PAPER.accent} ${className}`}>
      <span aria-hidden="true" className="size-1.5 shrink-0 bg-[var(--mn-peach)]" />
      {children}
    </p>
  );
}

/* The one annotation: a white ruled cell, 22px tall: the
   key in muted mono caps in a fixed 64px cell, its value in navy sentence
   case in the rest. The width comes from the stack it stands in
   (`style`), so every tag in a stack shares both edges and the divider
   between key and value runs in one line. Decoration, desktop only. */
export function Tag({ k, v, className = "", style }: { k: string; v: string; className?: string; style?: CSSProperties }) {
  return (
    <span aria-hidden="true" style={style} className={`inline-flex h-[22px] items-stretch whitespace-nowrap border border-[color:var(--mn-line-dim)] bg-[var(--mn-cell)] ${className}`}>
      <span className="flex w-16 shrink-0 items-center pl-2 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-[color:var(--mn-muted)]">{k}</span>
      <span className="flex min-w-0 flex-1 items-center border-l border-[color:var(--mn-rule)] pl-2 text-[13px] font-medium leading-none text-[color:var(--mn-ink)]">{v}</span>
    </span>
  );
}

/* One phrase of a headline set in the accent. The text is unchanged: the
   phrase is found in it and wrapped. */
export function Accent({ text, phrase, className }: { text: string; phrase: string; className: string }) {
  const i = text.lastIndexOf(phrase);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  );
}

/* A figure never parts from its unit. A browser may end a line at any
   hyphen, so "7-day" can break as "7-" over "day" in a narrow column.
   Keep sets every word that joins a number to its unit with a hyphen on
   one line; the text is unchanged, the word is only wrapped. Used by the
   pricing subhead and by the questions and their answers. */
export function Keep({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\S*\d-\S+)/).map((part, i) =>
        i % 2 ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/* ── Actions ────────────────────────────────────────────────────── */

function Arrow() {
  return (
    <>
      {" "}
      <span aria-hidden="true">&rarr;</span>
    </>
  );
}

type LinkProps = { href: string; children: ReactNode; arrow?: boolean; size?: "md" | "sm"; className?: string };

const SIZE = { md: "h-12 px-6 text-[15px]", sm: "h-10 px-4 text-[14px]" };

/* The one peach action. Its label is ink (never light type on peach) and
   the ground lightens under the pointer. The arrow stays inside the
   anchor, hidden from assistive tech. */
export function PeachLink({ href, children, arrow = false, size = "md", className = "" }: LinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] bg-[var(--mn-peach)] font-semibold text-[color:var(--mn-action-fg)] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--mn-peach)_84%,white)] ${SIZE[size]} ${FOCUS_RING} ${className}`}
    >
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

/* The outlined action: a ruled cell on the field (white on paper). */
export function OutlineLink({ href, children, arrow = false, size = "md", className = "" }: LinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] border border-[color:var(--mn-line-dim)] bg-[var(--mn-cell)] font-medium text-[color:var(--mn-ink)] transition-colors duration-150 hover:border-[color:var(--mn-ink)] ${SIZE[size]} ${FOCUS_RING} ${className}`}
    >
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

/* A text link with its arrow, on paper. */
export function ArrowLink({ href, children, arrow = true, className = "" }: LinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1.5 border-b border-[color:var(--mn-paper-ink)] pb-1 font-semibold transition-colors duration-150 hover:border-[color:var(--mn-paper-accent)] hover:text-[color:var(--mn-paper-accent)] ${T.small} ${PAPER.ink} ${FOCUS_RING} ${className}`}
    >
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

/* ── Product fragments ──────────────────────────────────────────── */

/* One product picture: laid out at its design width and painted at the
   width of its slot (the page's .pb-fluid rule), up to `max`. */
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

/* A box that lays its content out at a design width and paints it at the
   width of its slot, with no cap (the page's .pb-fluid rule). `height` is
   how much of the content to lay out: the box keeps that shape at every
   width, so whatever cuts a fragment cuts it at the same place on every
   screen. No Shot of its own: for a picture that has more than one
   layout inside one Shot. */
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

/* Fit: a fragment whose rows hold their height (a list). Laid out at
   `width` and painted at the width of its slot, but never over one and a
   half times its size: where the slot is wider than that the fragment is
   laid out wider, at one and a half times (.bp-fit). `height` is its
   height at its own size. No Shot of its own. */
export function Fit({ width, height, className = "", children }: { width: number; height: number; className?: string; children: ReactNode }) {
  return (
    <div className={`bp-fit ${className}`} style={{ "--fw": width, "--fh": height } as CSSProperties}>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
}

/* The inset of everything inside a navy band, labels and mat alike: the
   page's own 48px from sm; 16px from lg to xl, where a band is at its
   narrowest beside its text column; 12px on a phone. The two narrow
   insets are what let a fragment show at full size there. */
export const BAND_X = "px-3 sm:px-12 lg:max-xl:px-4";

/* A peek band: the product on a white mat, on the page's one dark. Flat
   navy, 4px corners, nothing drawn on it but two bare labels along its
   top (the sample account and its name), an optional `lead`, and ONE
   product fragment on a white mat (the children, which bring the mat).
   The mat has 4px top corners and stands on the band's foot: the
   reference ads are whole on it, and the leak sheet runs off it between
   two rows or through the middle of one. The band is as tall as what it holds, or as its
   text column where it is asked to be. A 1px navy edge is drawn over
   everything, so the band ends on its own line under the mat.
   `bleed` (the Agent Peach band, from sm): a mat runs off the band's
   right edge, so that edge is cut clean: no navy line down the right side
   and a square bottom right corner, and the white reaches the band's edge
   the way the band's foot cuts the mats. */
export function PeekBand({ slug = "Fizzli", lead, bleed = false, className = "", children }: { slug?: string; lead?: ReactNode; bleed?: boolean; className?: string; children: ReactNode }) {
  const label = `${T.labelFig} text-[color:var(--mn-on-navy-label)]`;
  const cut = bleed ? "sm:rounded-br-none" : "";
  return (
    <div className={`relative isolate overflow-hidden rounded-[4px] bg-[var(--mn-navy)] ${cut} ${className}`}>
      <div aria-hidden="true" className={`flex items-center justify-between pt-5 sm:pt-8 ${BAND_X}`}>
        <span className={`flex items-center gap-2 ${label}`}>
          <span className="size-1.5 shrink-0 bg-[var(--mn-peach)]" />
          Sample account
        </span>
        {slug && <span className={label}>{slug}</span>}
      </div>
      {lead}
      {children}
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded-[4px] border border-[color:var(--mn-navy)] ${bleed ? "sm:rounded-br-none sm:border-r-0" : ""}`} />
    </div>
  );
}

/* A figure stage: the frame every figure off a navy ground shares. Pale
   paper, a hairline, 4px corners, and ONE product fragment on a white
   mat with a hairline outline and 4px top corners, set in from the top
   and sides by one margin (32px from 1440, 16px from 1280, 24px under
   that, 12px on a phone) and cut by the stage's bottom edge.

   The fragment is laid out at MAT_W by MAT_H and painted at the width of
   the mat (Peek), so the stage has no height of its own: it is as tall as
   its margin plus the mat, and its bottom edge cuts every fragment at
   MAT_H at every width. A figure is drawn to that line: the edge passes
   through the middle of a thumbnail, or falls exactly where the fragment
   ends, never through a mark or a line of type and never under an empty
   strip. Never painted under nine tenths of its size. */
export const MAT_W = 324;
export const MAT_H = 308;

export function Stage({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={`overflow-hidden rounded-[4px] border bg-[var(--mn-paper-2)] px-3 pt-3 sm:px-6 sm:pt-6 xl:px-4 xl:pt-4 min-[90rem]:px-8 min-[90rem]:pt-8 ${PAPER.rule}`}>
      <div className={`overflow-hidden rounded-t-[4px] border border-b-0 bg-[var(--mn-white)] ${PAPER.rule}`}>
        <Peek label={label} width={MAT_W} height={MAT_H}>
          {children}
        </Peek>
      </div>
    </div>
  );
}

/* The same frame for a fragment that is drawn at its own size, not
   scaled (the close's recipe, the platforms block's three pacing rows):
   pale paper, a hairline, 4px, one white mat with a hairline outline and
   4px top corners, set in by one margin (32px from 1440, 24px under it,
   12px on a phone). No edge passes through it: the mat ends in white
   under its last line or rule and runs on to the stage's foot, so the
   mat's foot is the stage's. The stage is as tall as what it holds, or as its
   `className` makes it (a fixed height in the close, the row's height in
   the platforms block): the mat takes whatever height that leaves. */
export function TextStage({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-[4px] border bg-[var(--mn-paper-2)] px-3 pt-3 sm:px-6 sm:pt-6 min-[90rem]:px-8 min-[90rem]:pt-8 ${PAPER.rule} ${className}`}>
      <div className={`flex-1 overflow-hidden rounded-t-[4px] border border-b-0 bg-[var(--mn-white)] ${PAPER.rule}`}>
        <Shot label={label} ground={false}>
          {children}
        </Shot>
      </div>
    </div>
  );
}

/* ── Sections ───────────────────────────────────────────────────── */

/* A paper section: the two vertical rules of the hero run on down it.
   Paper is the reading ground and stays clean. */
export function Sheet({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`bg-[var(--mn-paper)] ${GUTTER}`}>
      <div className={`${FRAME} relative border-x ${PAPER.rule} ${className}`}>{children}</div>
    </section>
  );
}

/* Ruled lines, each led by the 6px marker. `open` leaves the first rule
   out, where the list carries on under a row that already has one. */
export function Bullets({ items, open = false }: { items: readonly string[]; open?: boolean }) {
  return (
    <ul className={open ? "" : `border-t ${PAPER.rule}`}>
      {items.map((b) => (
        <li key={b} className={`flex gap-4 border-b py-4 ${T.body} ${PAPER.rule} ${PAPER.body}`}>
          <span className="mt-[10px] size-1.5 shrink-0 bg-[var(--mn-peach)]" aria-hidden="true" />
          <span className="flex-1 text-pretty">{b}</span>
        </li>
      ))}
    </ul>
  );
}

/* A native disclosure for the lines a first read can skip, drawn as one
   more ruled row of the list above it: its word on the text's own
   column, a plus at the row's end that is a cross when it is open (it
   does not turn: only colours change over time on this page). The lines
   it holds follow as further rows. Its content is in the HTML the server
   sends; no script. `inset` puts the word on the list's text column: 22px
   under Bullets (the marker and its gap), 40px under PointTitles (the
   icon's box and its gap). */
export function More({ label = "More", inset = "pl-[22px]", children }: { label?: string; inset?: string; children: ReactNode }) {
  return (
    <details className="group">
      <summary
        className={`flex h-14 cursor-pointer list-none items-center justify-between gap-4 border-b ${inset} font-semibold transition-colors duration-150 hover:text-[color:var(--mn-paper-accent)] ${T.small} ${PAPER.rule} ${PAPER.ink} ${FOCUS_RING} [&::-webkit-details-marker]:hidden`}
      >
        {label}
        <span className="flex size-6 items-center justify-center" aria-hidden="true">
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="group-open:rotate-45">
            <path d="M10 3.5v13M3.5 10h13" />
          </svg>
        </span>
      </summary>
      {children}
    </details>
  );
}

/* Title and sentence pairs, ruled, each led by a 20px line icon in a
   24px box (`icons`, in order). */
export function Points({ points, icons }: { points: readonly { title: string; text: string }[]; icons: ReactNode[] }) {
  return (
    <div className={`border-t ${PAPER.rule}`}>
      {points.map((p, i) => (
        <div key={p.title} className={`flex gap-4 border-b py-4 ${PAPER.rule}`}>
          <span className={`flex size-6 shrink-0 items-center justify-center ${PAPER.ink}`} aria-hidden="true">
            {icons[i]}
          </span>
          <div className="flex-1">
            <h3 className={`text-[16px] font-semibold leading-[24px] ${PAPER.ink}`}>{p.title}</h3>
            <p className={`mt-1 text-pretty ${T.small} ${PAPER.body}`}>{p.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* The same points, read at a glance: each title (still an h3) on one
   ruled row of 56px with its icon, then one More row that holds the
   sentences, each on a ruled row of its own led by its point's icon, so
   an open list still pairs every sentence with its title. For a row whose
   sub line already says what the points say (the weekly report). */
export function PointTitles({ points, icons }: { points: readonly { title: string; text: string }[]; icons: ReactNode[] }) {
  const icon = (i: number) => (
    <span className={`flex size-6 shrink-0 items-center justify-center ${PAPER.ink}`} aria-hidden="true">
      {icons[i]}
    </span>
  );
  return (
    <div className={`border-t ${PAPER.rule}`}>
      {points.map((p, i) => (
        <div key={p.title} className={`flex h-14 items-center gap-4 border-b ${PAPER.rule}`}>
          {icon(i)}
          <h3 className={`flex-1 text-[16px] font-semibold leading-[24px] ${PAPER.ink}`}>{p.title}</h3>
        </div>
      ))}
      <More inset="pl-10">
        {points.map((p, i) => (
          <div key={p.title} className={`flex gap-4 border-b py-4 ${PAPER.rule}`}>
            {icon(i)}
            <p className={`flex-1 text-pretty ${T.small} ${PAPER.body}`}>{p.text}</p>
          </div>
        ))}
      </More>
    </div>
  );
}

/* One feature: a text column (eyebrow, heading, one line, a few points,
   a link) beside a peek band that takes seven of the twelve columns.
   Both start on one line, 48px under the section's strip: the band's top
   edge is the top of the eyebrow's caps. `flip` puts the band on the
   left, and both cells are as tall as the taller of the two, so a band
   that asks for it (`h-full`) ends level with the column's last line.
   Under lg the band follows the text column. `accent` is the phrase of the
   headline set in the accent. `cta` is left out for a feature that has
   no link of its own on the live page (the weekly report). */
export function FeatureRow({
  eyebrow,
  headline,
  accent,
  sub,
  cta,
  flip = false,
  tile,
  children,
}: {
  eyebrow: string;
  headline: string;
  accent?: string;
  sub?: string;
  cta?: { label: string; href: string; arrow: boolean };
  flip?: boolean;
  tile: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`grid grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-12 pt-12 lg:grid-cols-12 ${INSET}`}>
      <div className={`lg:col-span-5 lg:row-start-1 ${flip ? "lg:col-start-8" : "lg:col-start-1"}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={`mt-6 text-balance ${T.h2} ${PAPER.ink}`}>{accent ? <Accent text={headline} phrase={accent} className={PAPER.accentLg} /> : headline}</h2>
        {sub && <p className={`mt-4 max-w-[30em] text-pretty ${T.body} ${PAPER.body}`}>{sub}</p>}
        <div className="mt-8">{children}</div>
        {cta && (
          <ArrowLink href={cta.href} arrow={cta.arrow} className="mt-8">
            {cta.label}
          </ArrowLink>
        )}
      </div>
      <div className={`max-lg:row-start-2 lg:col-span-7 lg:row-start-1 ${flip ? "lg:col-start-1" : "lg:col-start-6"}`}>{tile}</div>
    </div>
  );
}
