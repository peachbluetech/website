import { TOOLKIT } from "./content";
import { ArrowNE, Block, Dotted, RowLink, Side, T, TONE, cx } from "@/components/site/parts";
import "./Toolkit.css";

/* Also in Peachblue (no id).

   A slim ruled band on the FAQ's two columns (354 and 724 at 1440). On
   the left the h2 as a statement at Inter 24/32: the level is the
   page's outline, the size is a style. On the right the five links of
   content.ts, in its order, as rows on dotted separators.

   Each row is one anchor whose text is the title, a space, then the
   description, and nothing else: the published anchor text. The title is
   16/24 in ink in a 220px column, the description 15/22 in smoke beside
   it, and at the row's end the 12px north-east arrow, which is
   decoration (aria-hidden) and goes from smoke to ink under the pointer
   and on focus. Nothing else changes on hover. No tiles, no thumbnails,
   no cards: five links need rows.

   The first row's text is level with the h2's cap top, as the FAQ's
   first row is with its heading. Under 1024 the columns stack; under 768 a row is its title over its description, with the
   arrow on the title's line.

   72px above and below (48 on a phone). Page.tsx draws the rule above
   this section and the rule under it.
   HTML order: section > h2, ul > li > a (title span, space, description
   span, arrow). */
export function Toolkit() {
  return (
    <section className="el-toolkit">
      <Block top="band" bottom="band">
        <Side>
          <h2 className={T.titleLg}>{TOOLKIT.eyebrow}</h2>
          <Dotted className="el-toolkit-list">
            {TOOLKIT.rows.map((row) => (
              <li key={row.href} className="el-toolkit-item">
                <RowLink href={row.href} className="el-toolkit-row">
                  <span className={cx(T.body, "el-toolkit-title")}>{row.title}</span>{" "}
                  <span className={cx(T.bodySm, TONE.smoke, "el-balance el-toolkit-desc")}>{row.desc}</span>
                  <ArrowNE />
                </RowLink>
              </li>
            ))}
          </Dotted>
        </Side>
      </Block>
    </section>
  );
}
