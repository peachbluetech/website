import { Fragment } from "react";
import { cx } from "../ui/cx";
import { PeachMark } from "../ui/PeachMark";
import { DIGEST, DIGEST_EVENTS, money, type DigestSeverity } from "./data";

/* SlackDigest: the weekly digest as it posts to a team channel.
   Design width 520. Natural height 582 with the channel line, 542 without
   (the same in both figure settings). In a Tile that bleeds off the bottom
   (32px of padding above), tile heights that cut through a line of text
   and not through the button: 496 or 526 with the channel line, 456 or 486
   without.

   Drawn as a neutral chat message, not as any chat product: the app's own
   logo square as the avatar, the sender, a time, then the message blocks
   in the order the digest sends them (a title, the week in one sentence,
   the worklist with a bracketed label per row, a line of standing figures,
   one button). Details hang under their title; the message itself indents
   them by four spaces.

   Figures. By default every number in the message is set in the product's
   mono, like every other recreation. figures "plain" leaves the message as
   the chat itself would show it, one sans face throughout, time included. */

const SEVERITY_LABEL: Record<DigestSeverity, string> = {
  bad: "ACT",
  warn: "WATCH",
  good: "WIN",
  info: "FYI",
};

/* A number as the digest writes one: an optional sign and dollar mark,
   grouped digits, decimals, an ISO date's tail, a percent or a ratio's x. */
const FIGURE = /([+−]?\$?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?:-\d\d-\d\d)?(?:%|x\b)?)/;

/* Message text with its numbers set in mono. */
function Figures({ text, mono }: { text: string; mono: boolean }) {
  if (!mono) return <>{text}</>;
  return (
    <>
      {text.split(FIGURE).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-mono tnum">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function SlackDigest({
  channel = DIGEST.channel,
  time = DIGEST.received,
  figures = "mono",
  className,
}: {
  /** Channel name shown above the message, without the hash. Pass null to drop the line. */
  channel?: string | null;
  /** The time beside the sender. */
  time?: string;
  /** "mono" sets every number in the product's mono. "plain" keeps the whole message in the chat's sans. */
  figures?: "mono" | "plain";
  className?: string;
}) {
  const mono = figures === "mono";
  return (
    <div className={cx("rounded-lg border border-pb-border bg-pb-card text-pb-fg overflow-hidden", className)}>
      {channel && (
        <div className="flex items-center h-10 px-4 border-b border-pb-border text-[13.5px] font-semibold text-pb-fg">
          <span className="mr-1 font-normal text-pb-fg-faint">#</span>
          {channel}
        </div>
      )}

      <div className="flex gap-3 px-4 pt-4 pb-5">
        <span className="relative mt-0.5 size-9 rounded-md pb-logo shrink-0 flex items-center justify-center">
          <PeachMark size={20} color="#ffffff" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 leading-[22px]">
            <span className="text-[15px] font-bold text-pb-fg">{DIGEST.sender}</span>
            <span className="inline-flex items-center h-[15px] rounded-[3px] bg-pb-muted px-1 text-[10px] font-semibold leading-none text-pb-fg-muted">
              APP
            </span>
            <span className={cx("text-pb-fg-muted", mono ? "font-mono tnum text-[11.5px]" : "text-[12px]")}>{time}</span>
          </div>

          {/* Title block */}
          <div className="mt-1 text-[18px] font-bold leading-[1.33] text-pb-fg">Peachblue weekly digest</div>

          {/* The week in one sentence. In mono it runs to two lines; text-pretty keeps the last word from sitting alone. */}
          <p className="mt-2 text-[15px] leading-[22px] text-pb-fg text-pretty">
            <span className="font-bold">{DIGEST.org}</span>
            <Figures text={DIGEST.chatHeadline} mono={mono} />
          </p>

          {/* The worklist */}
          <div className="mt-2 text-[15px] leading-[22px] text-pb-fg">
            {DIGEST_EVENTS.map((e) => {
              const amount = money(e.dollarImpact);
              /* The amount is left off when the title already states it. */
              const line = e.title.includes(amount) ? e.title : `${e.title} (${amount})`;
              return (
                <div key={e.key}>
                  <div>
                    &bull; <span className="font-bold">[{SEVERITY_LABEL[e.severity]}]</span> <Figures text={line} mono={mono} />
                  </div>
                  <div className="pl-4">
                    <Figures text={e.detail} mono={mono} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Standing figures. Each item holds together; the line breaks between items. */}
          <p className="mt-2.5 text-[13px] leading-[18px] text-pb-fg-muted">
            {DIGEST.economics.map((item, i) => (
              <Fragment key={item.label}>
                {i > 0 && <span className="whitespace-pre-wrap">{"  •  "}</span>}
                <span className="whitespace-nowrap">
                  {item.label} <span className={cx(mono && "font-mono tnum")}>{item.value}</span>
                </span>
              </Fragment>
            ))}
          </p>

          <div className="mt-3">
            <span className="inline-flex items-center h-7 rounded-[4px] border border-pb-border-control bg-pb-card px-3 text-[13px] font-bold text-pb-fg">
              Open Today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
