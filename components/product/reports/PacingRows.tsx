import { FLIGHTS, PACING_ROWS_IDS } from "./data";
import { FlightTable } from "./parts";

/* PacingRows: the flight table of the pacing board on its own, for the
   agency sample. Five flights with their pacing cells: two behind (amber
   dot, hatched gap up to the peach tick), two on pace (green dot, fill at
   the tick) and one over (red dot, fill past the tick). The CPM goal
   column is left off at this width.

   Design width: 760. Sits on the stone ground (the table is a white card).
   Natural height at 760: 348px with the head row, 306px without. */
export function PacingRows({
  ids = PACING_ROWS_IDS,
  head = true,
}: {
  /** Which flights to show, in table order: lumen, tidewater, kestrel, elmwick, harbor, orbit. */
  ids?: string[];
  /** Show the column head row. */
  head?: boolean;
}) {
  const flights = FLIGHTS.filter((f) => ids.includes(f.id));
  return <FlightTable flights={flights} goal={false} head={head} />;
}
