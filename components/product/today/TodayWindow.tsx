import { AppWindow } from "@/components/product/frame";
import { TodayContent } from "./TodayContent";

/* The content column of an AppWindow: its width less the 2px border, the
   rail and the page's 48px of gutter. */
function columnOf(width: number, rail: "full" | "icon"): number {
  return width - 2 - (rail === "full" ? 236 : 64) - 48;
}

/* TodayWindow: the application window on the Today page.
   Design width: 1280 with the full rail (a 994px content column), the
   width at which the page is the app unmodified: the navy bar carries its
   sync stamp on a two-line sentence and every worklist row shows its
   title and platform badge in full. Natural height: 1,303px.

   Pass height to crop the page at the window's bottom edge. The worklist
   and the rail run side by side, so a cut is only clean where neither
   column has a line of text under it. At 1280 those are:
     688    just under the worklist's header rule
     796    after the first row (the window's edge stands in for the row's
            divider; the rail shows the waste block down to its sentence)
     997    after the third row, with two whole rail blocks
     1096   after the fourth row
   There is no clean cut after the second row: the rail's hit-rate
   sentence sits across it.

   1200 with the full rail (a 914px column) is the compromise for a
   narrower slot; natural height 1,350px. Two things differ there, both
   states the app has: the bar is without its sync stamp (with it the
   sentence would take three lines), and the first worklist row's title is
   truncated beside its badge in the 574px worklist column. So do not set
   a 1200 window next to a PulseList that shows that title in full. Clean
   cuts at 1200: 688, 824 (after the first row, the waste block down to
   its link) and 946 (after the second row).
   1200 with the icon rail (a 1086px column) has neither compromise. */
export function TodayWindow({
  width = 1280,
  height,
  rail = "full",
  className,
}: {
  /** Outer width in px. 1280 by default; 1200 is the documented compromise. */
  width?: number;
  /** Fixed height in px: crops the page at the bottom edge. Omit for the whole page. */
  height?: number;
  rail?: "full" | "icon";
  className?: string;
}) {
  const column = columnOf(width, rail);
  return (
    <AppWindow active="Today" group="Operate" page="Today" rail={rail} width={width} height={height} className={className}>
      <TodayContent layout={column >= 860 ? "columns" : "stacked"} stamp={column >= 952} />
    </AppWindow>
  );
}

/* TodayCompact: the same page in a narrower window with the icon rail.
   Design width: 930 (an 816px content column). The navy sentence holds
   two lines from an 800px column, so 930 is the narrowest round width
   with a 98px bar (no sync stamp at this width). The app is under its
   1024px breakpoint here, so the page is one column: the worklist runs
   the full width and the rail follows it. Natural height: 1,812px with
   the rail, 1,274px without. Pass height to crop; the page is one column,
   so any height just past a row works: 688 ends under the worklist's
   header rule, 804 after the first row, 920 after the second, 1012 after
   the third. */
export function TodayCompact({
  width = 930,
  height,
  rail = true,
  className,
}: {
  width?: number;
  /** Fixed height in px: crops the page at the bottom edge. */
  height?: number;
  /** Include the standing-health blocks under the worklist. */
  rail?: boolean;
  className?: string;
}) {
  return (
    <AppWindow active="Today" group="Operate" page="Today" rail="icon" width={width} height={height} className={className}>
      <TodayContent layout="stacked" stamp={false} rail={rail} />
    </AppWindow>
  );
}
