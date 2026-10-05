import { PulseHeader, PulseRowStacked } from "../today/PulseList";
import { DIGEST_EVENTS, WORKLIST_MINI } from "./data";

/* TodayWorklistMini: three rows of the Today page's worklist, the same
   rows the weekly digest carries, as they wait in the app every day.
   Design width 360, no outer padding (set it on stone, in a Tile).
   Natural height 494 (534 at 304 wide with meta false). In a Tile that
   bleeds off the bottom (32px of padding above), tile heights that cut
   through a sentence and not through a row's controls: 448 (two whole
   rows, then the third) or 318 (one whole row, then the second).

   Nothing here is drawn twice. The header, the rows and the narrow row
   layout are the Today area's own (its header and its stacked row, the
   one its phone-width crop uses), so this vignette and the Today window
   cannot disagree about a figure, a badge or where the controls sit.
   Each row keeps everything the app's row has: the creative's thumbnail
   with its severity dot, the title and platform, the sentence, the line
   saying the row already went out in the digest, the dollars, the verb,
   Ask Peach and the done tick.

   The header counts the whole week (five open), not the three rows shown:
   the list reads as cut short, which is how it is meant to be cropped. */
export function TodayWorklistMini({
  meta = true,
  className,
}: {
  /** The open count and dollars at stake beside the title. Pass false under 350 wide, where the two no longer fit on one line. */
  meta?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <PulseHeader events={DIGEST_EVENTS} meta={meta} />
      <ul className="divide-y divide-pb-border">
        {WORKLIST_MINI.map((ev) => (
          <PulseRowStacked key={ev.key} ev={ev} />
        ))}
      </ul>
    </div>
  );
}
