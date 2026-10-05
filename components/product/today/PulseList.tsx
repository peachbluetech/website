import { ArrowRight, Check, Mail } from "lucide-react";
import { AskPeachButton, PlatformBadge, SectionHeader, adImage, cx, formatCurrency } from "@/components/product/ui";
import { PULSE_DONE_KEY, PULSE_EVENTS, pulseMeta, type PulseEvent, type PulseSeverity } from "./data";

const SEVERITY_STYLES: Record<PulseSeverity, string> = {
  good: "bg-pb-good",
  warn: "bg-pb-warn",
  bad: "bg-pb-bad",
  info: "bg-pb-info",
};

/* The 36px creative thumbnail with its severity dot. The dot's ring is
   white, as in the app, so it reads as a thin halo over the image. A row
   about several creatives (a launch) has no image and shows the app's
   grey square. */
function PulseThumb({ ev }: { ev: PulseEvent }) {
  return (
    <div className="relative shrink-0 mt-0.5">
      {ev.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={adImage(ev.image, "sm")}
          alt=""
          width={36}
          height={36}
          loading="lazy"
          decoding="async"
          className="size-9 rounded-lg object-cover border border-pb-border"
        />
      ) : (
        <div className="size-9 rounded-lg bg-pb-muted" />
      )}
      <span className={cx("absolute -top-1 -right-1 size-2.5 rounded-full ring-2 ring-pb-card", SEVERITY_STYLES[ev.severity])} />
    </div>
  );
}

/* The row's controls: its one verb, the agent handoff, the done tick. */
function PulseActions({ ev }: { ev: PulseEvent }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-pb-peach-600 underline-offset-2 whitespace-nowrap">
        {ev.action}
        <ArrowRight className="size-3" />
      </span>
      <AskPeachButton variant="text" />
      <span className="size-6 rounded-md border border-pb-border flex items-center justify-center text-pb-fg-faint">
        <Check className="size-3.5" strokeWidth={2.2} />
      </span>
    </span>
  );
}

function PulseDelivered({ ev }: { ev: PulseEvent }) {
  if (!ev.delivered) return null;
  return (
    <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-pb-fg-faint">
      <Mail className="size-3" strokeWidth={2} />
      {ev.delivered}
    </p>
  );
}

/* One pulse row: thumbnail and severity dot, title and platform, the
   engine's sentence, then dollars over the row's controls on the right.
   Design width: 560 and up. The right-hand cluster does not shrink (217px
   on the drain row), so in a column under 601px the drain row's title and
   badge (320px together) no longer fit on one line and the title is
   truncated with an ellipsis, as the app does it. */
export function PulseRow({ ev }: { ev: PulseEvent }) {
  return (
    <li>
      <div className="flex gap-3.5 px-1 -mx-1 py-3.5">
        <PulseThumb ev={ev} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13.5px] font-medium text-pb-fg truncate">{ev.title}</span>
            {ev.platform && <PlatformBadge platform={ev.platform} />}
          </div>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-pb-fg-muted">{ev.detail}</p>
          <PulseDelivered ev={ev} />
        </div>
        <div className="shrink-0 flex flex-col items-end justify-between gap-1">
          {ev.dollarImpact > 0 && (
            <span className="font-mono tnum text-[12px] leading-[20px] font-medium text-pb-fg-secondary">{formatCurrency(ev.dollarImpact)}</span>
          )}
          <PulseActions ev={ev} />
        </div>
      </div>
    </li>
  );
}

/* Not a state of the app and not used by the Today area. A row re-laid
   for a column of about 300 to 360px: the title wraps instead of
   truncating, and the dollars and controls drop to their own line under
   the sentence. The app's row is one line at every width. Kept only
   because the digest area's worklist vignette imports it; once that
   vignette renders PulseRow at 560 or wider this can be deleted. */
export function PulseRowStacked({ ev }: { ev: PulseEvent }) {
  return (
    <li>
      <div className="py-3.5">
        <div className="flex gap-3.5">
          <PulseThumb ev={ev} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[13.5px] font-medium text-pb-fg">{ev.title}</span>
              {ev.platform && <PlatformBadge platform={ev.platform} className="mt-px shrink-0" />}
            </div>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-pb-fg-muted">{ev.detail}</p>
            <PulseDelivered ev={ev} />
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <span className="font-mono tnum text-[12px] leading-[20px] font-medium text-pb-fg-secondary">{formatCurrency(ev.dollarImpact)}</span>
          <PulseActions ev={ev} />
        </div>
      </div>
    </li>
  );
}

/* The "What changed this week" header with its open count and dollars at
   stake. meta false leaves the count off: under about 350px the title and
   the count do not fit on one line and the app truncates the title. */
export function PulseHeader({
  events,
  done = 0,
  meta = true,
  className,
}: {
  events: PulseEvent[];
  done?: number;
  meta?: boolean;
  className?: string;
}) {
  return (
    <SectionHeader
      className={className}
      title="What changed this week"
      meta={meta ? pulseMeta(events) : undefined}
      action={done > 0 ? <span className="text-[12px] text-pb-fg-muted underline underline-offset-2">restore {done} done</span> : undefined}
    />
  );
}

/* The feed itself: hairline-separated rows, exactly the app's row at every
   width. */
export function PulseRows({ events, className }: { events: PulseEvent[]; className?: string }) {
  return (
    <div className={cx("min-w-0", className)}>
      <ul className="divide-y divide-pb-border">
        {events.map((ev) => (
          <PulseRow key={ev.key} ev={ev} />
        ))}
      </ul>
    </div>
  );
}

/* PulseList: the "What changed this week" worklist on its own.
   Design width: 620 (no padding of its own; sits on the stone ground).
   At 560 it still works as the app does: the drain title is truncated.

   rows 6 is the untouched week, as in the Today window: "6 open · $8,160
   at stake". rows 4 (default) is the list after two rows have been ticked
   off, so there is one row of each severity and the header reads "4 open
   · $7,470 at stake" with the app's "restore 2 done" control. The smaller
   fatigue flag is always one of the two; blue picks which blue row stays:
   "launch" (the new-creatives row with the app's grey square, no badge)
   or "shift" (the budget move, with a thumbnail and a platform badge).

   Natural height at 620: 448px at rows 4 (either blue row), 638px at
   rows 6. At 560, rows 4 is 469px. */
export function PulseList({
  rows = 4,
  blue = "launch",
  header = true,
  className,
}: {
  /** 4: one row of each severity, two rows marked done. 6: the full week. */
  rows?: 4 | 6;
  /** rows 4 only: the blue row that stays. */
  blue?: "launch" | "shift";
  /** The section header with the open count. */
  header?: boolean;
  className?: string;
}) {
  const dropped = blue === "launch" ? "spend_shift" : "launch";
  const events = rows === 6 ? PULSE_EVENTS : PULSE_EVENTS.filter((ev) => ev.key !== PULSE_DONE_KEY && ev.type !== dropped);
  const done = PULSE_EVENTS.length - events.length;
  return (
    <div className={className}>
      {header && <PulseHeader events={events} done={done} />}
      <PulseRows events={events} />
    </div>
  );
}
