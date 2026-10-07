import { Fragment, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import Link from "next/link";
import { RISK_REVERSAL, SALES_HREF, TRIAL_HREF, TRIAL_LABEL } from "@/lib/site";
import { ArrowNE, Block, Card, Check, Disclosure, Dotted, Eyebrow, Fluid, Keep, MEDIUM, Pill, RowLink, Shell, Shot, Side, SplitHead, T, TONE, Window, cx, type Space } from "./parts";

/* The inner-page kit: the parts every page under the homepage is built
   from, made of the system's own parts (parts.tsx) and tokens. Their
   rules are in kit.css, which app/layout.tsx loads once for every page.
   The homepage takes two of them as well: its questions (FaqBand) and
   its closing band (CtaBand), so those are one part on every page.

   An inner page is: SitePage > PageHeader > Frame > sections, with a
   Rule between every two. How to build one, and what never to do, is in
   CLAUDE.md ("How to build an inner page"). Every part is shown once on
   the parts sheet at /kit (local only).

   Plain components with no state: they render the same on the server
   and inside a client component (a form passes its own handlers to
   Input, Select and PillButton). Words, links and ids are always the
   caller's: nothing here writes copy, except TrialBand, which carries
   the closing card's published lines. */

/* An internal path goes through the router; a hash, a mailto or another
   site is a plain anchor. */
function A({ href, children, ...rest }: { href: string; children: ReactNode } & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">) {
  return href.startsWith("/") ? (
    <Link href={href} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

/* ── Page header ────────────────────────────────────────────────── */

/* The header of an inner page: the page's h1 and what stands round it.
   In the shell and outside the frame, as the homepage's hero is; the
   page's first Rule comes right after it.

   Top to bottom, which is also the order of the HTML:
   - `crumb` or `eyebrow`: the line above the title. An eyebrow is a
     string; a crumb is a Crumb (or any one line, such as a back link).
   - `title`: the h1, in the display face. `size="display"` (48/52, the
     default) for every page; `size="heading"` (36/42) only where a page
     has two headers and this is the lesser.
   - `sub`: one quiet line under the title (a date, "Last updated").
   - `lead`: the page's opening line or paragraph. A string, several
     strings (paragraphs) or your own elements.
   - `meta`: a byline row (a Meta).
   - `actions`: the page's pills, the filled one first.
   - `note`: the risk line under the pills, in the system's one italic.
   - children: whatever the page hangs under its header.

   `layout="split"` (the default) is the homepage hero's: the title on
   the left half, the lead on the right half, everything else under the
   title. For a title of up to about 40 characters. The lead follows the
   system's rule for a split header: shorter than the title, it ends on
   the title's last baseline; taller, it starts level with the title's
   cap top. A lead that is taller than the title in a header that has a
   line or pills under the title takes `leadAt="top"`: it then runs down
   the right half without pushing them away from the title.
   `layout="stack"` is one column with the lead under the title in
   smoke: for a long title and for an article. Under 1024 both are one
   column.

   `inline` drops the shell and the padding, for a header that stands
   inside the body column of an Article (a doc, whose side nav must not
   move from page to page); what follows it there starts 48px under it.
   `top` and `bottom` are named distances: 120 above and 72 to the first
   rule unless told otherwise. */
export function PageHeader({
  as = "header",
  layout = "split",
  inline = false,
  eyebrow,
  crumb,
  title,
  size = "display",
  sub,
  lead,
  leadAt = "baseline",
  meta,
  actions,
  note,
  top = "pad",
  bottom = "band",
  className,
  children,
}: {
  as?: ElementType;
  layout?: "split" | "stack";
  inline?: boolean;
  eyebrow?: ReactNode;
  crumb?: ReactNode;
  title: ReactNode;
  size?: "display" | "heading";
  sub?: ReactNode;
  lead?: ReactNode | readonly string[];
  /** Split layout only: "top" for a lead taller than the title where something stands under the title. */
  leadAt?: "baseline" | "top";
  meta?: ReactNode;
  actions?: ReactNode;
  note?: ReactNode;
  top?: Space;
  bottom?: Space;
  className?: string;
  children?: ReactNode;
}) {
  const leadRole = layout === "split" ? cx(T.body, "el-pretty") : cx(T.subhead, TONE.smoke, "el-pretty");
  const paragraphs = typeof lead === "string" ? [lead] : Array.isArray(lead) && lead.every((item) => typeof item === "string") ? (lead as readonly string[]) : null;
  const body = (
    <>
      {(crumb || eyebrow) && (
        <div className="el-ph-pre">
          {crumb}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </div>
      )}
      <div className="el-ph-grid">
        <h1 className={cx(size === "display" ? T.display : T.heading, "el-ph-title")}>{title}</h1>
        {sub && <p className={cx(T.ui, TONE.smoke, "el-tnum el-ph-sub")}>{sub}</p>}
        {lead && (
          <div className="el-ph-lead">
            {paragraphs
              ? paragraphs.map((text) => (
                  <p key={text} className={leadRole}>
                    <Keep text={text} />
                  </p>
                ))
              : (lead as ReactNode)}
          </div>
        )}
        {meta && <div className="el-ph-meta">{meta}</div>}
        {actions && <div className="el-ph-actions">{actions}</div>}
        {note && <p className={cx(T.caption, "el-italic", TONE.smoke, "el-ph-note")}>{note}</p>}
      </div>
      {children && <div className="el-ph-extra">{children}</div>}
    </>
  );
  const classes = cx("el-ph", `el-ph--${layout}`, layout === "split" && leadAt === "top" && "el-ph--lead-top", className);
  if (inline) {
    const Tag = as;
    return <Tag className={cx(classes, "el-ph--inline")}>{body}</Tag>;
  }
  return (
    <Shell as={as} className={cx(classes, top !== "none" && `el-pt-${top}`, bottom !== "none" && `el-pb-${bottom}`)}>
      {body}
    </Shell>
  );
}

/* The type role of a lead you write yourself (two paragraphs, a link in
   it): give each paragraph LEAD in a split header, LEAD_STACK in a
   stacked one. */
export const LEAD = cx(T.body, "el-pretty");
export const LEAD_STACK = cx(T.subhead, TONE.smoke, "el-pretty");

/* The crumb: where the page sits, as the line above its title. Items
   with an href are links; the last is the place itself. The stroke
   between two items is decoration (aria-hidden), as it always was. */
export function Crumb({ items, label = "Breadcrumb" }: { items: readonly { label: ReactNode; href?: string }[]; label?: string }) {
  return (
    <nav aria-label={label} className={cx(T.eyebrow, "el-crumb")}>
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span aria-hidden="true" className="el-crumb-sep">
              /
            </span>
          )}
          {item.href ? <A href={item.href}>{item.label}</A> : <span>{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}

/* The meta row: who and when, 14/21 in smoke, on one line that wraps.
   Put a MetaName first (the name in ink, with an Avatar or the logo
   tile before it), then a Dot before each further item. */
export function Meta({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("el-meta", className)}>{children}</div>;
}

export function MetaName({ avatar, children }: { avatar?: ReactNode; children: ReactNode }) {
  return (
    <span className="el-meta-name">
      {avatar}
      <span>{children}</span>
    </span>
  );
}

/* A person's initial in a 24px taupe disc. Decoration: the name is
   printed beside it. For the company's own byline use LogoTile at 20. */
export function Avatar({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="el-avatar">
      {children}
    </span>
  );
}

/* The dot between two items of a meta row. Decoration. */
export function Dot() {
  return <span aria-hidden="true">·</span>;
}

/* ── Article ────────────────────────────────────────────────────── */

/* A long page inside the frame: the body in the wide column of the side
   layout and a side column beside it that rests under the nav while the
   body scrolls. `sideAt="start"` puts the side column first (a doc and
   its nav); `"end"` puts it after the body (a post and its table of
   contents). The HTML follows the same order. Under 1024 there is one
   column: `narrow="hide"` (the default) drops the side column there,
   `"stack"` keeps it, over or under the body as the HTML has it.

   Wrap it in a Block (inset "text"; top "band", bottom "pad"). The
   body is an `article` unless told otherwise; the side is an `aside`. */
export function Article({
  as: Body = "article",
  side,
  sideAt = "start",
  narrow = "hide",
  sticky = true,
  className,
  children,
}: {
  as?: ElementType;
  side?: ReactNode;
  sideAt?: "start" | "end";
  narrow?: "hide" | "stack";
  sticky?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const aside = <aside className="el-article-side">{side && (sticky ? <Sticky>{side}</Sticky> : side)}</aside>;
  return (
    <Side flip={sideAt === "end"} className={cx("el-article", `el-article--${sideAt}`, narrow === "hide" && "el-article--hide", className)}>
      {sideAt === "start" && aside}
      <Body className="el-article-body">{children}</Body>
      {sideAt === "end" && aside}
    </Side>
  );
}

/* What rests 32px under the nav while the column beside it scrolls,
   from 1024. Its parent must run the height of that column (the side
   of an Article does). */
export function Sticky({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("el-sticky", className)}>{children}</div>;
}

export type SideNavItem = { label: ReactNode; href: string; current?: boolean; sub?: boolean };

/* The side nav: titled lists of links, for the side column of an
   Article (a section's pages; "On this page"). `label` names the nav
   for assistive tech. An item with `current` is the page the reader is
   on (aria-current, ink at 500); `sub` indents a second-level entry. */
export function SideNav({ label, groups, className }: { label: string; groups: readonly { title?: ReactNode; items: readonly SideNavItem[] }[]; className?: string }) {
  return (
    <nav aria-label={label} className={cx("el-sidenav", className)}>
      {groups.map((group, i) => (
        <div key={i} className="el-sidenav-group">
          {group.title && <div className={cx(T.caption, MEDIUM)}>{group.title}</div>}
          <ul className="el-sidenav-list">
            {group.items.map((item) => (
              <li key={item.href}>
                <A href={item.href} aria-current={item.current ? "page" : undefined} className={cx("el-sidenav-link", item.sub && "el-sidenav-link--sub")}>
                  {item.label}
                </A>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/* ── Clauses ────────────────────────────────────────────────────── */

/* A document in titled rows (a policy, a method): rows on dotted
   separators, each a Clause. Wrap it in a Block. */
export function Clauses({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("el-dotted el-clauses", className)}>{children}</div>;
}

/* One row: its heading in the narrow column (Inter 24/32; an h2 unless
   told otherwise), resting under the nav while its text scrolls, and
   its text in the wide column, usually a Prose. `id` goes on the
   heading and names the row for assistive tech. Without a title the
   text keeps its column. */
export function Clause({ title, as: Heading = "h2", id, className, children }: { title?: ReactNode; as?: "h2" | "h3"; id?: string; className?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={title && id ? id : undefined} className={cx("el-clause", className)}>
      {title && (
        <div className="el-clause-head">
          <Heading id={id} className={cx(T.titleLg, "el-balance")}>
            {title}
          </Heading>
        </div>
      )}
      <div className="el-clause-body">{children}</div>
    </section>
  );
}

/* ── Running text ───────────────────────────────────────────────── */

/* Running text: the one class that sets an article's MDX, a doc or a
   policy. Put the text's own elements straight inside it (h2, h3, p,
   ul, ol, a, strong, code, pre, blockquote, img, table): elements with
   no class are styled, anything that carries a class keeps its own
   look. The measure is 680px. */
export function Prose({ as: Tag = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={cx("el-prose", className)}>{children}</Tag>;
}

/* A component standing in running text (a tool, a table part, a
   picture): the text's rules stop at its edge and it gets 40px above
   and below. */
export function Embed({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("el-embed", className)}>{children}</div>;
}

/* A callout: a quiet taupe card in running text or beside it, for a
   note the reader should not miss. A `>` quotation in MDX draws the
   same way. */
export function Callout({ as: Tag = "aside", title, className, children }: { as?: ElementType; title?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <Tag className={cx("el-callout", className)}>
      {title && <p className="el-callout-title">{title}</p>}
      {children}
    </Tag>
  );
}

/* ── Tables ─────────────────────────────────────────────────────── */

/* A simple data table: a head and rows on hairlines, the first column
   the row's name. `numeric` lists the columns (from 0) that hold
   figures and are set to the right. It scrolls sideways in its own box
   on a narrow screen; give it a `label` and the box is a named region
   the keyboard can reach. `caption` is a line of small print under it. */
export function DataTable({
  head,
  rows,
  numeric = [],
  label,
  caption,
  className,
}: {
  head: readonly ReactNode[];
  rows: readonly (readonly ReactNode[])[];
  numeric?: readonly number[];
  label?: string;
  caption?: ReactNode;
  className?: string;
}) {
  const num = (i: number) => (numeric.includes(i) ? "el-num" : undefined);
  return (
    <div className={cx("el-embed", className)}>
      <div className="el-table-scroll" role={label ? "region" : undefined} aria-label={label} tabIndex={label ? 0 : undefined}>
        <table className="el-table">
          <thead>
            <tr>
              {head.map((cell, i) => (
                <th key={i} scope="col" className={num(i)}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, i) => (
                  <td key={i} className={num(i)}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <p className={cx(T.caption, TONE.smoke, "el-table-caption")}>{caption}</p>}
    </div>
  );
}

export type CompareValue = boolean | string;

/* One value of a comparison: a tick ("Included"), a quiet dash ("Not
   included"), or the figure or phrase itself. */
export function CompareCell({ value }: { value: CompareValue }) {
  if (value === true) {
    return (
      <span role="img" aria-label="Included" className="el-compare-yes">
        <Check />
      </span>
    );
  }
  if (value === false) {
    return (
      <span role="img" aria-label="Not included" className="el-compare-no">
        –
      </span>
    );
  }
  return <span>{value}</span>;
}

/* The comparison table: plans across, features down, in titled groups.
   A real table: column headers, a row-group header per group, a row
   header per row. `corner` heads the names' column; a column is a name
   and one quiet line under it (a price). On a narrow screen it scrolls
   sideways with the names' column held in place; `label` names the
   scrolling region. */
export function CompareTable({
  label,
  corner,
  columns,
  groups,
  className,
}: {
  label: string;
  corner: ReactNode;
  columns: readonly { key: string; name: ReactNode; note?: ReactNode }[];
  groups: readonly { title: string; rows: readonly { label: string; values: readonly CompareValue[] }[] }[];
  className?: string;
}) {
  return (
    <div role="region" aria-label={label} tabIndex={0} className={cx("el-compare-scroll", className)}>
      <table className="el-compare">
        <thead>
          <tr>
            <th scope="col" className="el-compare-corner">
              {corner}
            </th>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="el-compare-col">
                <div className="el-compare-name">{col.name}</div>
                {col.note && <div className="el-compare-note">{col.note}</div>}
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.title}>
            <tr>
              <th scope="rowgroup" colSpan={columns.length + 1} className="el-compare-group">
                <span>{group.title}</span>
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="el-compare-row">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td key={columns[i]?.key ?? i} className="el-compare-cell">
                    <CompareCell value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

/* ── Lists ──────────────────────────────────────────────────────── */

/* The entry row: a row of an index that is one link (a post, a doc, a
   further read). Put the rows in a Dotted. `lead` is the narrow first
   column (a date, a kind, a short name); the children are the entry
   (a title, a line under it); the 12px arrow closes the row and goes
   from smoke to ink under the pointer. The whole row is the anchor, so
   the anchor's text is the lead and the children, in that order. The
   lead and the entry are stacks: give each a block element per line
   (h2, p, div), each with a T role, and they stand 12px apart. `tight`
   is the 20px row of a short list of links. */
export function EntryRow({
  as: Tag = "li",
  href,
  lead,
  tight = false,
  className,
  children,
}: {
  as?: ElementType;
  href: string;
  lead?: ReactNode;
  tight?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className="el-entry-item">
      <RowLink href={href} className={cx("el-entry", !lead && "el-entry--bare", tight && "el-entry--tight", className)}>
        {lead && <div className="el-entry-lead">{lead}</div>}
        <div className="el-entry-main">{children}</div>
        <ArrowNE />
      </RowLink>
    </Tag>
  );
}

/* Steps: an ordered list on dotted separators, each row its figure in
   smoke and its sentence at 16/24. The figure is decoration (the list
   is already ordered). */
export function Steps({ items, className }: { items: readonly ReactNode[]; className?: string }) {
  return (
    <ol className={cx("el-dotted el-steps", className)}>
      {items.map((item, i) => (
        <li key={i} className="el-step">
          <span aria-hidden="true" className={cx(T.eyebrow, "el-tnum")}>
            {i + 1}
          </span>
          <span className={cx(T.body, "el-pretty")}>{item}</span>
        </li>
      ))}
    </ol>
  );
}

/* Ticked lines: what a plan holds, 15/22, a tick before each. On taupe
   or on the navy tile the tick takes the text's colour. */
export function CheckList({ items, className }: { items: readonly ReactNode[]; className?: string }) {
  return (
    <ul className={cx("el-checks", className)}>
      {items.map((item, i) => (
        <li key={i} className="el-check">
          <Check />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* The stack: blocks of text one under the other, a fixed distance apart
   between their trimmed edges (16 unless told otherwise). For the
   inside of a card or a cell. Every child takes a T role. */
export function Stack({ as: Tag = "div", gap = 16, className, children }: { as?: ElementType; gap?: 8 | 12 | 16 | 20 | 24 | 32 | 40; className?: string; children: ReactNode }) {
  return <Tag className={cx("el-stack", gap !== 16 && `el-stack--${gap}`, className)}>{children}</Tag>;
}

/* A small filled label (a saving, a state, a kind): taupe on the
   canvas, `tone="white"` on taupe. Not a control. The outlined Tag of
   parts.tsx is its sibling. */
export function Badge({ tone = "taupe", className, children }: { tone?: "taupe" | "white"; className?: string; children: ReactNode }) {
  return <span className={cx("el-badge", tone === "white" && "el-badge--white", className)}>{children}</span>;
}

/* ── Form ───────────────────────────────────────────────────────── */

/* A form's column: fields 20px apart. Every attribute of a form passes
   through. */
export function Form({ className, children, ...rest }: ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cx("el-form", className)} {...rest}>
      {children}
    </form>
  );
}

/* Two fields side by side from 768, one over the other under it. */
export function FormRow({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("el-form-row", className)}>{children}</div>;
}

/* One field: its label, its control (the child) and one line under it.
   `id` is the control's id: the label points at it, and the line under
   it is `<id>-note`, which the control should name in aria-describedby.
   `error` replaces `help` and is announced. `optional` is a quiet word
   after the label. */
export function Field({ id, label, optional, help, error, className, children }: { id: string; label: ReactNode; optional?: ReactNode; help?: ReactNode; error?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={cx("el-field", className)}>
      <label htmlFor={id} className="el-label">
        {label}
        {optional && <span className="el-label-opt">{optional}</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-note`} role="alert" className="el-error">
          {error}
        </p>
      ) : help ? (
        <p id={`${id}-note`} className="el-help">
          {help}
        </p>
      ) : null}
    </div>
  );
}

/* The controls. Each is the element itself with the system's class, so
   every attribute and handler passes through. `invalid` draws the error
   ring and sets aria-invalid. */
export function Input({ invalid, className, ...rest }: ComponentPropsWithoutRef<"input"> & { invalid?: boolean }) {
  return <input className={cx("el-input", className)} aria-invalid={invalid || undefined} {...rest} />;
}

/* `empty` sets the select's text in smoke while nothing is chosen yet,
   as a placeholder is. */
export function Select({ invalid, empty, className, children, ...rest }: ComponentPropsWithoutRef<"select"> & { invalid?: boolean; empty?: boolean }) {
  return (
    <select className={cx("el-select", empty && "el-select--empty", className)} aria-invalid={invalid || undefined} {...rest}>
      {children}
    </select>
  );
}

export function Textarea({ invalid, className, ...rest }: ComponentPropsWithoutRef<"textarea"> & { invalid?: boolean }) {
  return <textarea className={cx("el-textarea", className)} aria-invalid={invalid || undefined} {...rest} />;
}

/* A tick box and its sentence, one label. */
export function Checkbox({ label, className, ...rest }: Omit<ComponentPropsWithoutRef<"input">, "type"> & { label: ReactNode }) {
  return (
    <label className={cx("el-tick", className)}>
      <input type="checkbox" className="el-box" {...rest} />
      <span>{label}</span>
    </label>
  );
}

/* A range: the browser's own slider, in ink. */
export function Range({ className, ...rest }: Omit<ComponentPropsWithoutRef<"input">, "type">) {
  return <input type="range" className={cx("el-range", className)} {...rest} />;
}

/* The segmented choice: a taupe pill holding two or three buttons of
   which one is on (a billing period). `label` names the group. A
   SegmentedButton with `pressed` is the white raised one. */
export function Segmented({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={label} className={cx("el-seg", className)}>
      {children}
    </div>
  );
}

export function SegmentedButton({ pressed, className, children, ...rest }: Omit<ComponentPropsWithoutRef<"button">, "type"> & { pressed: boolean }) {
  return (
    <button type="button" aria-pressed={pressed} className={cx("el-seg-btn", className)} {...rest}>
      {children}
    </button>
  );
}

/* ── Bands ──────────────────────────────────────────────────────── */

export type Question = { q: string; a: string };

/* Questions as disclosure rows on dotted separators: each question a
   row with the chevron at its end, each answer one paragraph at 17/25
   in smoke. Native details, so every answer is in the HTML the server
   sends. `labelAs="h3"` makes each question a heading; leave it out
   where the page's questions are not headings. */
export function FaqRows({ items, labelAs = "span", className }: { items: readonly Question[]; labelAs?: "span" | "h3"; className?: string }) {
  return (
    <Dotted as="div" className={cx("el-faqs-rows", className)}>
      {items.map((item) => (
        <Disclosure key={item.q} labelAs={labelAs} label={<Keep text={item.q} />} className="el-faqs-row">
          <p className={cx(T.bodyLg, TONE.smoke, "el-pretty el-faqs-answer")}>
            <Keep text={item.a} />
          </p>
        </Disclosure>
      ))}
    </Dotted>
  );
}

/* The questions band, the homepage's own and every inner page's: the
   heading (an h2 at 36/42 with the id the page's markup always gave it)
   in the narrow column, the questions in the wide one. Renders nothing
   without questions. The page draws the Rule above it and the Rule
   under it. `anchor` is the section's own id, where links point at the
   band (the homepage's #faq). `id={null}` leaves the heading without an
   id, where the page's heading never had one. */
export function FaqBand({
  faq,
  anchor,
  id = "faq-heading",
  title = "Frequently asked questions",
  eyebrow,
  sub,
  labelAs,
  top = "top",
  bottom = "pad",
  className,
}: {
  faq: readonly Question[];
  anchor?: string;
  id?: string | null;
  title?: ReactNode;
  eyebrow?: ReactNode;
  sub?: ReactNode;
  labelAs?: "span" | "h3";
  top?: Space;
  bottom?: Space;
  className?: string;
}) {
  if (faq.length === 0) return null;
  return (
    <section id={anchor} aria-labelledby={id ?? undefined} className={cx("el-faqs", className)}>
      <Block top={top} bottom={bottom}>
        <Side className="el-faqs-grid">
          {eyebrow && <Eyebrow className="el-faqs-eyebrow">{eyebrow}</Eyebrow>}
          <h2 id={id ?? undefined} className={cx(T.heading, "el-faqs-title")}>
            {title}
          </h2>
          {sub && <p className={cx(T.bodySm, TONE.smoke, "el-balance el-faqs-sub")}>{sub}</p>}
          <FaqRows items={faq} labelAs={labelAs} className="el-faqs-list" />
        </Side>
      </Block>
    </section>
  );
}

/* The closing call to action, the homepage's own and every inner
   page's: one slim band, 72 above and below. Left: the eyebrow and a
   heading at 32/36 (`titleAs` "p" where the page's line was never a
   heading). Right: one line, the pills (the filled one first), the risk
   line in italic. The page draws the Rule above it and the Rule under
   it. */
export function CtaBand({
  as: Tag = "section",
  id,
  eyebrow,
  title,
  titleAs = "h2",
  lead,
  actions,
  note,
  className,
}: {
  as?: ElementType;
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  titleAs?: "h2" | "h3" | "p";
  lead?: ReactNode;
  actions?: ReactNode;
  note?: ReactNode;
  className?: string;
}) {
  return (
    <Tag id={id} className={cx("el-cta", className)}>
      <Block top="band" bottom="band">
        <SplitHead eyebrow={eyebrow} title={title} as={titleAs} titleClass={T.headingSm}>
          {lead && <p className={cx(T.body, "el-pretty")}>{lead}</p>}
          {actions && <div className="el-cta-actions">{actions}</div>}
          {note && <p className={cx(T.caption, "el-italic", TONE.smoke, "el-cta-note")}>{note}</p>}
        </SplitHead>
      </Block>
    </Tag>
  );
}

/* The trial band: the card that closed every article, doc, platform
   page and tool, as a closing band. Its lines and links are the
   published ones (the labels and hrefs come from lib/site.ts, so the
   self-serve gate turns them with the rest of the site); the main line
   is a paragraph, as it always was. `agency` adds the link to the
   agency plan. */
export function TrialBand({ agency = false }: { agency?: boolean }) {
  return (
    <CtaBand
      as="aside"
      eyebrow="Peachblue"
      title="Know what ads work and why."
      titleAs="p"
      lead="AI creative analysis across Meta, TikTok, Google Ads, and Amazon DSP. Your creatives, scored and explained."
      actions={
        <>
          <Pill href={TRIAL_HREF}>{TRIAL_LABEL}</Pill>
          {agency && (
            <Pill href={SALES_HREF} variant="outline">
              Talk to us about agency plans
            </Pill>
          )}
        </>
      }
      note={RISK_REVERSAL}
    />
  );
}

/* Link rows: a band's title (an h2 at Inter 24/32 with the page's id)
   in the narrow column and a short list of links in the wide one, each
   a row that ends in the arrow ("Keep reading", "From the blog"). The
   page draws the Rule above it and the Rule under it. */
export function LinkBand({ id, title, links, className }: { id: string; title: ReactNode; links: readonly { href: string; label: ReactNode }[]; className?: string }) {
  if (links.length === 0) return null;
  return (
    <section aria-labelledby={id} className={cx("el-links", className)}>
      <Block top="band" bottom="band">
        <Side>
          <h2 id={id} className={T.titleLg}>
            {title}
          </h2>
          <Dotted className="el-links-list">
            {links.map((link) => (
              <EntryRow key={link.href} href={link.href} tight>
                <div className={cx(T.body, "el-pretty")}>{link.label}</div>
              </EntryRow>
            ))}
          </Dotted>
        </Side>
      </Block>
    </section>
  );
}

/* ── Picture panel ──────────────────────────────────────────────── */

/* The picture under a page's header, as the homepage's hero has one: a
   wide taupe panel holding one white window of the product, cut by the
   panel's foot, and one quiet line under it that says whose account it
   is. It goes in the children of a PageHeader.

   The panel is a size container. What its window shows goes by the
   panel's own width: the page's stylesheet sets, for each range of
   widths, how much of the fragment the window shows, in the fragment's
   own px (`--el-peek-w` wide, `--el-peek-h` tall, both on the window).
   The fragment is laid out at its own size and painted at the width of
   its slot, never larger than its own size, so the window is as wide as
   what it shows and stands in the middle of the panel with taupe either
   side. With `bleed`, a phone's window also runs off the panel's right
   edge, which then cuts the fragment.

   One Shot, so one text alternative: `label` is one sentence that says
   "sample account". The line under the panel is a caption for the eye
   only: the label already says it, and an inner page's words are
   frozen, so the caption is painted by generated content (kit.css reads
   it from data-caption) and adds no text to the page. */
export function PeekPanel({
  label,
  caption,
  bleed = false,
  className,
  children,
}: {
  /** The picture's text alternative: one sentence, naming the sample account. */
  label: string;
  /** The line under the panel. */
  caption: string;
  /** On a phone the window runs off the panel's right edge. */
  bleed?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("el-peek", bleed && "el-peek--bleed", className)}>
      <Card variant="wide">
        <Shot label={label} ground={false}>
          <Window className="el-peek-window">{children}</Window>
        </Shot>
      </Card>
      <p aria-hidden="true" className={cx(T.caption, TONE.smoke, "el-peek-caption")}>
        <span data-caption={caption} className="el-peek-caption-text" />
      </p>
    </div>
  );
}

/* One layout of the fragment in a PeekPanel: a box that shows
   `--el-peek-w` by `--el-peek-h` px of what it holds, from its top
   left. The numbers passed to the box here are placeholders: the
   stylesheet's are the ones that apply. A picture with two layouts
   renders a PeekBox for each and its stylesheet shows one at a time. */
export function PeekBox({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Fluid width={1} height={1} className={cx("el-peek-box", className)}>
      {children}
    </Fluid>
  );
}
