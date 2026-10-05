import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOLKIT } from "./content";
import { FOCUS_IN, INSET, PAPER, SECTION_END, SectionMarker, Sheet, T } from "./parts";

/* Also in Peachblue: the toolkit, section 06.

   Type only. The strip is the heading (an h2); there is no second
   heading under it. Directly under the strip, the five links as one
   ruled row.

   Five links, content.ts's five, in its order. The MCP row ("Your data
   in Claude", "The 23-tool MCP server, included on Pro and up.", to
   /mcp) is one intact anchor here: the Agent Peach band sells the
   benefit under its own titles and its own link ("Connect Claude"), and
   the published anchor and its description stand in this row.

   - The row has no bottom rule. Its cells' dividers stop at the cells'
     foot, as the manifesto's divider stops at its cell's, and open paper
     follows (SECTION_END) up to Pricing's rule: two full-width rules with
     nothing between them read as an empty strip.
   - From xl: five cells across the frame, divided by 1px vertical rules
     that run from the strip's rule to the cells' foot. The row is
     set 24px inside the frame and every cell has 24px of padding, so the
     first cell's text starts on the page's inset column (48px) and the
     last ends on it. The first and last anchors reach out to the frame's
     own rules, so each anchor fills its cell. A cell is its title, its
     description 8px under it, and the arrow 16px under that. The cells
     are subgrids of the row's three tracks, so the five titles share one
     line, the five descriptions the next and the five arrows the last.
     A title never breaks: the five columns are equal wherever every
     title fits its measure (from about 1373), and under that the column
     with the longest title ("Objective-aware scoring", 191px) is as
     wide as that title and the other four share the rest (at 1280: 240
     and four of 216).
     The arrow is at the cell's foot, not at its top right: on the
     title's line it would leave 172px for the title at 1440, and the
     longest title would break.
   - md to xl: a ruled list, one link per row of at least 64px, a rule
     between two rows and none under the last: the title
     in the first four of twelve columns, the description in the next
     seven, the arrow at the row's end.
   - Phone: the same list, the title over its description, 16px above
     and below, the arrow at the row's end on the title's line.

   Each link is one anchor: its title, then its description, and nothing
   else in its text. The arrow is decoration. Under the pointer and on
   focus the title and the arrow take the accent. No pictures. */

const HOVER = "transition-colors duration-150 group-hover:text-[color:var(--mn-paper-accent)] group-focus-visible:text-[color:var(--mn-paper-accent)]";

/* From xl a cell takes the row's three tracks (title, description, arrow). */
const SUB = "xl:row-span-3 xl:grid xl:grid-rows-subgrid";

/* The five rows, in content.ts's order. */
const ROWS = TOOLKIT.rows;

export function Toolkit() {
  const last = ROWS.length - 1;
  return (
    <Sheet className={SECTION_END}>
      <SectionMarker n={6}>
        <h2>{TOOLKIT.eyebrow}</h2>
      </SectionMarker>
      <div className="xl:px-6">
        <ul className="grid xl:grid-cols-[repeat(5,minmax(min-content,1fr))] xl:gap-y-2">
          {ROWS.map((row, i) => (
            <li key={row.href} className={`max-xl:border-b max-xl:last:border-b-0 xl:border-l xl:first:border-l-0 ${SUB} ${PAPER.rule}`}>
              <Link
                href={row.href}
                className={`group grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 py-4 md:min-h-16 md:grid-cols-12 md:items-center md:py-3 xl:min-h-0 xl:grid-cols-[auto] xl:items-start xl:gap-x-0 xl:p-6 ${SUB} ${INSET} ${i === 0 ? "xl:-ml-6 xl:pl-12" : ""} ${i === last ? "xl:-mr-6 xl:pr-12" : ""} ${FOCUS_IN}`}
              >
                <span className={`col-start-1 row-start-1 text-[16px] font-semibold leading-[24px] md:col-span-4 xl:col-span-1 xl:whitespace-nowrap ${PAPER.ink} ${HOVER}`}>{row.title}</span>{" "}
                <span className={`col-start-1 row-start-2 mt-1 text-pretty md:col-span-7 md:col-start-5 md:row-start-1 md:mt-0 xl:col-span-1 xl:col-start-1 xl:row-start-2 ${T.small} ${PAPER.body}`}>{row.desc}</span>
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={`col-start-2 row-start-1 mt-1 size-4 shrink-0 md:col-start-12 md:mt-0 md:justify-self-end xl:col-start-1 xl:row-start-3 xl:mt-2 xl:justify-self-start ${PAPER.muted} ${HOVER}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
}
