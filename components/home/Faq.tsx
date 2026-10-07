import { FaqBand } from "@/components/site/kit";
import { FAQ } from "./content";

/* Questions (#faq).

   The kit's questions band, the same one every inner page closes with:
   a heading column of 354 and a column of 724 at 1440 with no gutter
   between them, in the text inset. On the left the eyebrow, the h2 at
   36/42 and the subhead in smoke. On the right the six questions as
   native disclosure rows, closed, on dotted separators: each question
   is an h3 at 17/25 in ink with the chevron at the row's end, each
   answer one paragraph at 17/25 in smoke, 8px under its row and 32px
   over the next separator.

   The first question's cap top is level with the heading's. Under 1024
   the heading block comes first and the rows follow at full width.

   Every answer is in the HTML the server sends; a row opens with no
   script (over 240ms where the browser can animate a details, at once
   everywhere else). "7-day" is kept on one line in the questions and
   the answers.

   Type only. 160px above, 120px under. Page.tsx draws the rule above
   this section and the rule under it. The section carries the page's
   #faq; the h2 has no id of its own here.
   HTML order: section#faq > p, h2, p, six details (summary > h3; p). */
export function Faq() {
  return <FaqBand anchor={FAQ.id} id={null} eyebrow={FAQ.eyebrow} title={FAQ.headline} sub={FAQ.subhead} faq={FAQ.pairs} labelAs="h3" />;
}
