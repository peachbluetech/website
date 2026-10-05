import { ChevronDown, LayoutGrid, List, Search, SlidersHorizontal, SquareCheck } from "lucide-react";
import type { SampleCreative } from "../sample";
import { Button, Card, SegmentedToggle, cx } from "../ui";
import { AdTile } from "./AdTile";
import { LIBRARY_COUNTS, LIBRARY_GRID, LIBRARY_ROW } from "./data";

/* The Creative Library page body: the filter card, the count line and
   the grid of tiles. The page title row (PageHeader from the frame, with
   LibraryHeaderActions as its actions) sits above it in the app. */

function SavedViewPill({ label, count, active = false }: { label: string; count: number; active?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 h-8 rounded-md border px-3 text-[12.5px]",
        active ? "bg-pb-peach-500 text-white border-transparent" : "border-pb-border bg-pb-card text-pb-fg-muted",
      )}
    >
      {label}
      <span className={cx("font-mono tnum text-[11px]", active ? "text-white/85" : "text-pb-fg-muted/70")}>{count}</span>
    </span>
  );
}

/* A select in the app; here the closed control: the label and its caret. */
function FilterChip({ label }: { label: string }) {
  return (
    <div className="relative inline-flex">
      <span className="inline-flex items-center h-8 pl-2.5 pr-6 rounded-lg border text-[11.5px] max-w-[120px] border-pb-border bg-pb-card text-pb-fg-muted">
        {label}
      </span>
      <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 size-3 text-pb-fg-muted" strokeWidth={2} />
    </div>
  );
}

function SortPill({ label }: { label: string }) {
  return (
    <div className="relative inline-flex">
      <span className="inline-flex items-center h-8 pl-3 pr-7 rounded-md border border-pb-border-control bg-pb-card text-pb-fg-muted text-[12.5px]">
        Sort: {label}
      </span>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-pb-fg-muted" strokeWidth={2} />
    </div>
  );
}

/* The filter card: saved views with their counts on the left (the active
   one is the row's only flat peach), then search, two filter selects, the
   All filters button and the sort. 54px tall. */
function FilterCard({ sort }: { sort: string }) {
  return (
    <Card className="p-2.5 mb-4">
      <div className="flex items-center gap-1.5 flex-wrap">
        <SavedViewPill label="All creatives" count={LIBRARY_COUNTS.all} active />
        <SavedViewPill label="Top performers" count={LIBRARY_COUNTS.top} />
        <SavedViewPill label="Underperformers" count={LIBRARY_COUNTS.under} />
        <SavedViewPill label="Low data" count={LIBRARY_COUNTS.lowData} />
        <div className="flex-1" />

        <div className="flex items-center gap-2 h-8 px-2.5 rounded-lg border border-pb-border bg-pb-muted/30 w-[180px]">
          <Search className="size-3.5 text-pb-fg-muted" strokeWidth={1.8} />
          <span className="flex-1 min-w-0 text-[12px] text-pb-fg-muted">Search…</span>
        </div>

        <FilterChip label="Campaign" />
        <FilterChip label="Format" />

        <span className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border text-[11.5px] border-pb-border bg-pb-card text-pb-fg-muted">
          <SlidersHorizontal className="size-3" strokeWidth={1.8} />
          All filters
        </span>

        <SortPill label={sort} />
      </div>
    </Card>
  );
}

/* LibraryGrid: the filter card, the count line and a 4-column grid of
   tiles (two rows of four by default).
   Design width 1152 (the page's content column), 1,016 tall with eight
   tiles (552 with four). Each tile is 276 wide with a 252 by 315 thumbnail.
   Every figure is mono, the saved-view counts and the count line included. */
export function LibraryGrid({
  creatives = LIBRARY_GRID,
  sort = "Newest",
  className,
}: {
  /** Tiles in order, four to a row. Defaults to LIBRARY_GRID: eight creatives, newest first, all four tiers in the first row. */
  creatives?: SampleCreative[];
  /** The sort control's value: "Newest", "Score (High)", "Spend (High)". */
  sort?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FilterCard sort={sort} />
      <div className="mb-4 flex items-center gap-2.5 flex-wrap">
        <p className="text-[12px] text-pb-fg-muted tnum">
          <span className="font-mono tnum">{LIBRARY_COUNTS.all}</span> creatives
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {creatives.map((creative) => (
          <AdTile key={creative.key} creative={creative} />
        ))}
      </div>
    </div>
  );
}

/* LibraryRow: one row of tiles, four across.
   Design width 1152, 448 tall. The default four are the creatives whose
   artwork crops cleanly at tile size; pass LIBRARY_GRID.slice(0, 4) for
   one of each tier (its under-tier tile has a cut headline). */
export function LibraryRow({
  creatives = LIBRARY_ROW,
  className,
}: {
  /** Four creatives. Defaults to LIBRARY_ROW. */
  creatives?: SampleCreative[];
  className?: string;
}) {
  return (
    <div className={cx("grid grid-cols-4 gap-4", className)}>
      {creatives.map((creative) => (
        <AdTile key={creative.key} creative={creative} />
      ))}
    </div>
  );
}

/* LibraryHeaderActions: the controls on the page's title row. The view
   toggle (By Ad is the default view), the grid or list switch, and the
   Select button. Pass it as the actions of the frame's PageHeader.
   Design width 339, 38 tall (the bordered layout switch is 36 plus its
   hairline; the toggle is 34 and the button 36, centred on it). It sizes
   to its content and wraps below 339. */
export function LibraryHeaderActions() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <SegmentedToggle options={["By Ad", "By Creative"]} value="By Ad" />
      <div className="inline-flex items-center rounded-md border border-pb-border-control overflow-hidden">
        <span className="h-9 w-9 inline-flex items-center justify-center bg-pb-muted text-pb-fg">
          <LayoutGrid className="size-4" strokeWidth={1.75} />
        </span>
        <span className="h-9 w-9 inline-flex items-center justify-center bg-pb-card text-pb-fg-muted">
          <List className="size-4" strokeWidth={1.75} />
        </span>
      </div>
      <Button variant="outline" size="default">
        <SquareCheck className="size-3.5" strokeWidth={1.8} />
        Select
      </Button>
    </div>
  );
}
