import type { CSSProperties } from "react";
import { ACCOUNT } from "../sample";
import { cx } from "../ui/cx";
import { DIGEST, DIGEST_EVENTS, money, type DigestSeverity } from "./data";

/* DigestEmail: the weekly digest as the recipient reads it.
   Design width 600 (the email's own column is 560, centred on its warm
   ground with 16px gutters). Natural height 1,089 with the header, 1,005
   without.

   The email is its own register, not the app's. It is drawn with the
   template's own values (system sans and serif stacks, a headline with one
   emphasised word, spaced capital labels, a 16px card, a pill button,
   figures in the template's type and not in mono), because that is what
   lands in the inbox. Styles are inline, as in the email itself, so the
   product scope's radius and font remaps do not touch them.

   Around it: a white hairline card with the subject and one sender line.
   No mail-client chrome. */

const FG = "#1F2430";
const MUTED = "#5B5648";
const FAINT = "#8A8578";
const BORDER = "#E8E4DC";
const CARD = "#ffffff";
const GROUND = "#FBFAF7";
const PEACH = "#E8724A";

const SEVERITY_COLOR: Record<DigestSeverity, string> = {
  good: "#2E8F63",
  warn: "#B07B1E",
  bad: "#C24747",
  info: "#4A7FB5",
};

const SANS = "Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

const TONE_COLOR = { flat: FAINT, good: SEVERITY_COLOR.good, bad: SEVERITY_COLOR.bad } as const;

/* Rows that ask for a decision: the act and watch rows. */
const FLAGGED = DIGEST_EVENTS.filter((e) => e.severity === "bad" || e.severity === "warn").length;

/* What only the email prints, read from the canonical sample account. */
const EMAIL = {
  subject: `Your week: ${money(ACCOUNT.spend7d)} spent, ${FLAGGED} thing${FLAGGED === 1 ? "" : "s"} to act on`,
  senderAddress: "hello@peachblue.io",
  /* The email's own date line. */
  range: ACCOUNT.window,
  /* The three figures at the top. Ratios print two decimals and deltas
     print whole percents there. */
  stats: [
    { label: "Spend (7d)", value: money(ACCOUNT.spend7d), sub: `+${ACCOUNT.spendDeltaPct.toFixed(0)}% vs prior week`, tone: "flat" },
    { label: "ROAS", value: `${ACCOUNT.roas7d.toFixed(2)}x`, sub: `+${ACCOUNT.roasDeltaPct.toFixed(0)}% vs prior week`, tone: "good" },
    {
      label: "Results",
      value: ACCOUNT.results7d.toLocaleString("en-US"),
      sub: `+${ACCOUNT.resultsDeltaPct.toFixed(0)}% vs prior week`,
      tone: "good",
    },
  ] as { label: string; value: string; sub: string; tone: "flat" | "good" | "bad" }[],
  /* The closing row of standing figures. */
  economics: [
    { label: "Waste (30d)", value: money(ACCOUNT.waste30d) },
    { label: "Bleeding now (7d)", value: money(ACCOUNT.waste7d) },
    { label: "Hit rate", value: `${ACCOUNT.hitRatePct}%` },
    { label: "Fatigue flags", value: String(ACCOUNT.fatigue.length) },
  ],
};

const sectionLabel: CSSProperties = {
  fontFamily: SANS,
  fontSize: 11,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: FAINT,
};

export function DigestEmail({
  header = true,
  received = DIGEST.received,
  className,
}: {
  /** The subject and sender line above the email. Pass false for the bare email. */
  header?: boolean;
  /** The time at the right of the sender line. */
  received?: string;
  className?: string;
}) {
  return (
    <div className={cx("rounded-lg border border-pb-border bg-pb-card text-pb-fg overflow-hidden", className)}>
      {header && (
        <div className="px-6 pt-5 pb-4 border-b border-pb-border">
          <div className="text-[16px] font-semibold leading-snug text-pb-fg">{EMAIL.subject}</div>
          <div className="mt-1.5 flex items-baseline justify-between gap-4">
            <div className="min-w-0 truncate text-[13px] text-pb-fg-muted">
              <span className="font-medium text-pb-fg">{DIGEST.sender}</span> &lt;{EMAIL.senderAddress}&gt;
            </div>
            <span className="shrink-0 font-mono tnum text-[12px] text-pb-fg-muted">{received}</span>
          </div>
        </div>
      )}

      {/* The email body. Line height resets to the mail client's default. */}
      <div style={{ backgroundColor: GROUND, padding: "40px 16px", lineHeight: "normal", WebkitFontSmoothing: "auto" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ paddingBottom: 8, textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/email/peachblue-mark.png"
              alt=""
              width={44}
              height={44}
              loading="lazy"
              decoding="async"
              className="object-cover"
              style={{ display: "block", width: 44, height: 44, margin: "0 auto" }}
            />
            <div
              style={{
                fontFamily: SANS,
                fontSize: 11,
                letterSpacing: 2.5,
                color: FAINT,
                textTransform: "uppercase",
                paddingTop: 12,
              }}
            >
              Weekly digest &middot; {DIGEST.org}
            </div>
          </div>

          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "32px 30px" }}>
            <div style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1.2, color: FG, paddingBottom: 4 }}>
              Your <em style={{ fontStyle: "italic" }}>week</em>.
            </div>
            <div style={{ fontFamily: SANS, fontSize: 12, color: FAINT, paddingBottom: 20 }}>{EMAIL.range}</div>

            {/* Three figures */}
            <div style={{ display: "flex", gap: 8 }}>
              {EMAIL.stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    flex: "1 1 0",
                    minWidth: 0,
                    padding: "14px 12px",
                    border: `1px solid ${BORDER}`,
                    borderRadius: 12,
                    backgroundColor: GROUND,
                  }}
                >
                  <div
                    style={{
                      fontFamily: SANS,
                      fontSize: 10,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      color: FAINT,
                      paddingBottom: 6,
                    }}
                  >
                    {s.label}
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: 24, color: FG }}>{s.value}</div>
                  <div style={{ fontFamily: SANS, fontSize: 11, color: TONE_COLOR[s.tone], paddingTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* The pulse: the week's worklist */}
            <div style={{ ...sectionLabel, padding: "26px 0 4px" }}>The pulse</div>
            <div>
              {DIGEST_EVENTS.map((e) => {
                const amount = money(e.dollarImpact);
                /* The amount is left off when the title already states it. */
                const showAmount = !e.title.includes(amount);
                return (
                  <div key={e.key} style={{ display: "flex" }}>
                    <div style={{ flex: "none", width: 20, padding: "12px 10px 0 0" }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 99,
                          backgroundColor: SEVERITY_COLOR[e.severity],
                          marginTop: 5,
                        }}
                      />
                    </div>
                    <div style={{ flex: "1 1 0", minWidth: 0, padding: "10px 0", borderBottom: `1px solid ${BORDER}` }}>
                      <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: "bold", color: FG }}>
                        {e.title}
                        {showAmount && <span style={{ color: FAINT }}> &middot; {amount}</span>}
                      </div>
                      <div style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: MUTED, paddingTop: 2 }}>{e.detail}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Standing figures */}
            <div style={{ ...sectionLabel, padding: "26px 0 8px" }}>Creative economics (30d)</div>
            <div style={{ display: "flex" }}>
              {EMAIL.economics.map((i) => (
                <div key={i.label} style={{ width: "25%", padding: "10px 0", borderTop: `1px solid ${BORDER}` }}>
                  <div style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: FAINT }}>
                    {i.label}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 16, fontWeight: "bold", color: FG, paddingTop: 3 }}>{i.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 26 }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: PEACH,
                  color: "#ffffff",
                  fontFamily: SANS,
                  fontSize: 14,
                  fontWeight: "bold",
                  padding: "12px 32px",
                  borderRadius: 999,
                }}
              >
                Open Today
              </span>
            </div>
          </div>

          <div style={{ paddingTop: 20, textAlign: "center" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, color: FAINT, lineHeight: 1.8 }}>
              Peachblue &middot; Creative intelligence for ads
              <br />
              <span style={{ textDecoration: "underline" }}>Notification settings</span> &nbsp;&middot;&nbsp;{" "}
              <span style={{ textDecoration: "underline" }}>Unsubscribe from this digest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
