/* The weekly digest for the Fizzli sample account.

   The digest carries the same worklist the Today page shows, so its rows
   are the Today area's rows, imported and not rebuilt: one definition of
   every title, sentence, dollar figure, platform and delivery line. They
   arrive in the product's order (act, watch, win, FYI, then by dollars).
   What is defined here is only what the digest adds around those rows:
   the sender, the opening sentence and the closing line of standing
   figures, all read from the canonical sample account.

   No directive and no JSX. */

import { ACCOUNT } from "../sample";
import { PULSE_EVENTS, type PulseEvent, type PulseSeverity } from "../today/data";

export type DigestEvent = PulseEvent;
export type DigestSeverity = PulseSeverity;

/** Whole dollars with thousands grouped, as the digest prints money. */
export function money(value: number, digits = 0): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

/** The week's rows, in digest order. The same objects the Today worklist renders. */
export const DIGEST_EVENTS: DigestEvent[] = PULSE_EVENTS;

export const DIGEST = {
  org: ACCOUNT.brand,
  sender: "Peachblue",
  /** Invented: the time on the chat message. The digest goes out on Monday mornings. */
  received: "8:00 AM",
  /** Invented: the channel the digest posts to. */
  channel: "paid-social",

  /* The chat message's opening sentence, after the account name (set bold).
     Ratios print two decimals and deltas print whole percents there. */
  chatHeadline: ` spent ${money(ACCOUNT.spend7d)} last week (+${ACCOUNT.spendDeltaPct.toFixed(0)}% vs prior) at ${ACCOUNT.roas7d.toFixed(2)}x ROAS`,

  /* The closing line of standing figures. */
  economics: [
    { label: "Waste 30d", value: money(ACCOUNT.waste30d) },
    { label: "Bleeding 7d", value: money(ACCOUNT.waste7d) },
    { label: "Hit rate", value: `${ACCOUNT.hitRatePct}%` },
    { label: "Fatigue flags", value: String(ACCOUNT.fatigue.length) },
  ],
} as const;

/* The three rows of the Today vignette: the first act, watch and win rows
   of the week, picked by kind so they follow the worklist if it changes. */
const MINI_KINDS: PulseEvent["type"][] = ["drain", "fatigue", "new_winner"];

export const WORKLIST_MINI: DigestEvent[] = MINI_KINDS.flatMap((kind) => {
  const row = PULSE_EVENTS.find((ev) => ev.type === kind);
  return row ? [row] : [];
});
