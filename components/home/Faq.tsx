import { FAQ, type FaqPair } from "./content";
import { FOCUS_RING, INSET, Keep, PAPER, SECTION_END, SectionMarker, Sheet, T } from "./parts";

/* Questions (#faq): six native disclosures, section 08. Type only, and
   calm on purpose: the heading and its line on five of twelve columns,
   six ruled rows on the other seven (the feature rows' own grid). Under
   lg the rows follow the heading.

   Every answer is in the HTML the server sends; a row opens with no
   script. */

/* One question: the construction of `More` in parts.tsx at the size of a
   point's title, copied here because More's summary holds a word, not a
   heading. The summary is one ruled row, 64px or taller: the question as
   an h3 (the Points title style) and, at the row's end, the same plus as
   More's, a cross when the row is open (it does not turn over time: only
   colours change on this page). The answer follows as one paragraph, 24px
   over and under, on a rule of its own that runs the row's length. */
function Question({ pair }: { pair: FaqPair }) {
  return (
    <details className="group">
      <summary
        className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 border-b py-4 transition-colors duration-150 hover:text-[color:var(--mn-paper-accent)] ${PAPER.rule} ${PAPER.ink} ${FOCUS_RING} [&::-webkit-details-marker]:hidden`}
      >
        <h3 className="text-pretty text-[16px] font-semibold leading-[24px]">
          <Keep text={pair.q} />
        </h3>
        <span className="flex size-6 shrink-0 items-center justify-center" aria-hidden="true">
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="group-open:rotate-45">
            <path d="M10 3.5v13M3.5 10h13" />
          </svg>
        </span>
      </summary>
      <div className={`border-b py-6 ${PAPER.rule}`}>
        <p className={`max-w-[40em] text-pretty ${T.body} ${PAPER.body}`}>
          <Keep text={pair.a} />
        </p>
      </div>
    </details>
  );
}

export function Faq() {
  return (
    <Sheet id={FAQ.id} className={SECTION_END}>
      <SectionMarker n={8}>
        <p>{FAQ.eyebrow}</p>
      </SectionMarker>
      <div className={`grid grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-12 pt-12 lg:grid-cols-12 ${INSET}`}>
        <div className="lg:col-span-5">
          <h2 className={`text-balance ${T.h2} ${PAPER.ink}`}>{FAQ.headline}</h2>
          <p className={`mt-4 max-w-[30em] text-balance ${T.body} ${PAPER.body}`}>{FAQ.subhead}</p>
        </div>
        <div className={`border-t lg:col-span-7 ${PAPER.rule}`}>
          {FAQ.pairs.map((pair) => (
            <Question key={pair.q} pair={pair} />
          ))}
        </div>
      </div>
    </Sheet>
  );
}
