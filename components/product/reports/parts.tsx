import { ChevronDown, ChevronUp, ChevronsUpDown, Minus, Rows3, Rows4, TrendingDown, TrendingUp } from "lucide-react";
import { AskPeachButton, Card, cx } from "../ui";
import { dollars, money, type Flight, type GoalStatus, type PaceStatus } from "./data";

/* Pieces of the pacing board that live in the app's own pacing file and
   are shared here by the full board and the rows crop. All inert. */

/* PaceChip: status is a 6px dot and a word, never a tinted pill. The
   percentage is spend against expected spend. */
export function PaceChip({ status, pct }: { status: PaceStatus; pct: number | null }) {
  const label =
    status === "on_pace"
      ? "On pace"
      : status === "over"
        ? "Overpacing"
        : status === "under"
          ? "Underpacing"
          : status === "ended"
            ? "Ended"
            : status === "not_started"
              ? "Upcoming"
              : "No budget";
  const dot =
    status === "on_pace" ? "bg-pb-good" : status === "over" ? "bg-pb-bad" : status === "under" ? "bg-pb-warn" : "bg-pb-fg-ghost";
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-pb-fg-secondary whitespace-nowrap">
      <span className={cx("size-1.5 rounded-full shrink-0", dot)} />
      {label}
      {pct != null && <span className="font-mono tnum text-pb-fg">{pct.toFixed(0)}%</span>}
    </span>
  );
}

/* ProgressBar: a 4px track. Dark fill is delivered spend, the amber hatch
   is what was expected by today and has not been delivered, the 2px peach
   tick is where delivery should be today. Fill short of the tick is
   behind; fill past it is ahead. Both values are percent of budget. */
export function ProgressBar({ spendPct, expectedPct }: { spendPct: number; expectedPct: number | null }) {
  return (
    <div className="relative h-1 w-full bg-pb-muted-2 rounded-full overflow-visible">
      <div className="absolute left-0 top-0 bottom-0 rounded-full bg-pb-fg-secondary" style={{ width: `${spendPct}%` }} />
      {expectedPct != null && expectedPct > spendPct + 0.5 && (
        <div
          className="absolute top-0 bottom-0 pb-hatch text-pb-warn/50 rounded-r-full"
          style={{ left: `${spendPct}%`, width: `${expectedPct - spendPct}%` }}
        />
      )}
      {expectedPct != null && (
        <div className="absolute top-[-3px] bottom-[-3px] w-[2px] bg-pb-peach-500" style={{ left: `calc(${expectedPct}% - 1px)` }} />
      )}
    </div>
  );
}

/* The arrow beside a CPM: green down when it clearly beats the goal, red
   up when it clearly misses, a grey dash when it is met. */
export function GoalDeltaIcon({ status }: { status: GoalStatus }) {
  if (status === "under") return <TrendingDown className="size-3.5 text-pb-good" />;
  if (status === "over") return <TrendingUp className="size-3.5 text-pb-bad" />;
  if (status === "met") return <Minus className="size-3.5 text-pb-fg-muted" />;
  return null;
}

/* The editable CPM goal, as a picture of the field. The value is the raw
   number as typed (26, 15.5); an empty field shows "Set". */
function GoalField({ value }: { value: number | null }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-pb-fg-muted text-[11px]">$</span>
      <span className="inline-flex items-center justify-end w-16 h-7 rounded-md border border-pb-border bg-pb-card px-1.5 text-[12px] font-mono tnum text-right">
        {value != null ? String(value) : <span className="text-pb-fg/50">Set</span>}
      </span>
      <span className="size-3.5" />
    </div>
  );
}

/* Two-state row density control; comfortable is selected. 30px tall. */
export function DensityToggle({ className }: { className?: string }) {
  return (
    <div className={cx("inline-flex items-center rounded-md border border-pb-border-control overflow-hidden", className)}>
      <span className="size-7 grid place-items-center bg-pb-muted text-pb-fg">
        <Rows3 className="size-3.5" strokeWidth={2} />
      </span>
      <span className="size-7 grid place-items-center text-pb-fg-muted">
        <Rows4 className="size-3.5" strokeWidth={2} />
      </span>
    </div>
  );
}

function SortHead({
  label,
  align = "right",
  active,
  dir,
  className,
}: {
  label: string;
  align?: "left" | "right";
  active?: boolean;
  dir?: "asc" | "desc";
  className?: string;
}) {
  return (
    <th className={cx("font-medium py-3 px-3", align === "right" ? "text-right" : "text-left", active && "text-pb-fg", className)}>
      <span className={cx("inline-flex items-center gap-1", align === "right" && "justify-end")}>
        {label}
        {active ? (
          dir === "desc" ? (
            <ChevronDown className="size-3" />
          ) : (
            <ChevronUp className="size-3" />
          )
        ) : (
          <ChevronsUpDown className="size-3 opacity-40" />
        )}
      </span>
    </th>
  );
}

function HoverLine({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-pb-fg-muted">{label}</span>
      <span className={cx("font-mono tnum text-pb-fg", tone)}>{value}</span>
    </div>
  );
}

/* The card a row's pacing cell opens on hover: the arithmetic behind the
   bar. The one floating surface on the board, so the one lifted shadow. */
function PaceHoverCard({ f }: { f: Flight }) {
  const gap = f.spend - f.expected;
  const remaining = Math.max(0, f.budget - f.spend);
  return (
    <div className="absolute left-0 top-full mt-1.5 z-50 w-[250px] rounded-md border border-pb-border bg-pb-card shadow-pb-lift p-3 text-[12px] leading-[1.5] space-y-0.5">
      <HoverLine label="Expected by today" value={money(f.expected)} />
      <HoverLine label="Delivered" value={money(f.spend)} />
      <HoverLine label={gap < 0 ? "Behind by" : "Ahead by"} value={money(Math.abs(gap))} tone={gap < -0.5 ? "text-pb-warn" : undefined} />
      <div className="pt-1.5 mt-1.5 border-t border-pb-border">
        <HoverLine label="Budget" value={money(f.budget)} />
        <HoverLine label="To finish" value={`${money(remaining / f.daysLeft)} a day, ${f.daysLeft}d`} />
      </div>
    </div>
  );
}

/* FlightTable: one row per flight in a white hairline card, sorted by
   pace with the furthest behind first. Head row 41px, each row 61px.
   Columns: Order, Flight, Budget, Spend, Pacing (180px), CPM and, when
   goal is on, the CPM goal field with the Ask Peach mark. */
export function FlightTable({
  flights,
  goal = true,
  head = true,
  hoverId,
}: {
  flights: Flight[];
  /** Show the CPM goal column. */
  goal?: boolean;
  /** Show the column head row. */
  head?: boolean;
  /** Open the pacing hover card under this flight's bar. */
  hoverId?: string;
}) {
  const cell = "py-3";
  const figure = "font-mono tnum";
  return (
    <Card className="overflow-hidden">
      <table className="w-full text-[12.5px]">
        {head && (
          <thead className="bg-pb-card">
            <tr className="text-[11px] uppercase tracking-[0.06em] font-medium text-pb-fg-muted border-b border-pb-border-control">
              <SortHead label="Order" align="left" className="px-4" />
              <SortHead label="Flight" align="left" />
              <SortHead label="Budget" />
              <SortHead label="Spend" />
              <SortHead label="Pacing" align="left" active dir="asc" className="w-[180px]" />
              <SortHead label="CPM" className={goal ? undefined : "px-4"} />
              {goal && <th className="text-right font-medium py-3 px-4">CPM Goal</th>}
            </tr>
          </thead>
        )}
        <tbody>
          {flights.map((f) => (
            <tr key={f.id} className="border-b last:border-b-0 border-pb-border">
              <td className={cx(cell, "px-4 min-w-0 max-w-[340px]")}>
                <div className="text-[13px] font-medium text-pb-fg truncate">
                  {f.label}
                  <span className="ml-2 text-[11px] uppercase tracking-[0.08em] font-normal text-pb-fg-muted">{f.channel}</span>
                </div>
                <div className="text-[11px] text-pb-fg-muted truncate">{f.sub}</div>
              </td>
              <td className={cx(cell, figure, "px-3 text-pb-fg-muted whitespace-nowrap")}>
                {f.dates}
                <div className="text-[11px]">{f.daysLeft}d left</div>
              </td>
              <td className={cx(cell, figure, "px-3 text-right text-pb-fg")}>{money(f.budget)}</td>
              <td className={cx(cell, figure, "px-3 text-right text-pb-fg")}>{money(f.spend)}</td>
              <td className={cx(cell, "px-3")}>
                <div className="relative">
                  <div className="flex flex-col gap-1.5 min-w-[150px]">
                    <PaceChip status={f.status} pct={f.pace} />
                    <ProgressBar spendPct={f.spendPct} expectedPct={f.expectedPct} />
                  </div>
                  {hoverId === f.id && <PaceHoverCard f={f} />}
                </div>
              </td>
              <td className={cx(cell, figure, "text-right", goal ? "px-3" : "px-4")}>
                <div className="inline-flex items-center justify-end gap-1 text-pb-fg">
                  {dollars(f.cpm)}
                  {/* Rows with no goal keep the arrow's width so the figures stay in one column. */}
                  {f.goalStatus ? <GoalDeltaIcon status={f.goalStatus} /> : <span className="size-3.5" />}
                </div>
              </td>
              {goal && (
                <td className={cx(cell, "px-4 text-right")}>
                  <div className="inline-flex items-center gap-2">
                    <GoalField value={f.goal} />
                    <AskPeachButton variant="icon" />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
