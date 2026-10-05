import type { CSSProperties } from "react";
import { ListChecks, Mail, MessageSquare } from "lucide-react";
import { Shot } from "@/components/product/frame";
import { DigestEmail, SlackDigest } from "@/components/product/digest";
import { money } from "@/components/product/digest/data";
import { ACCOUNT } from "@/components/product/sample";
import { WEEKLY_REPORT } from "./content";
import { FeatureRow, Fluid, PAPER, PointTitles } from "./parts";

/* The weekly report: the second feature row of "For performance teams".
   A short text column beside one pale stage holding the top of the
   Monday email on a white mat: "Your week.", its dates and the week's
   three figures, each against the week before. One idea: the week
   arrives as three figures.

   The contract with Performance.tsx, which renders this inside the
   group's Sheet, under the Creative Economics row, in a ROW_GAP wrapper:
   one FeatureRow with `flip` (the stage on the left) and no link. Copy
   from WEEKLY_REPORT, word for word. */

const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(0)}%`;

const DIGEST_LABEL = `The weekly digest for a sample account, ${ACCOUNT.window}: ${money(ACCOUNT.spend7d)} spent (${pct(ACCOUNT.spendDeltaPct)} against the week before), ${ACCOUNT.roas7d.toFixed(2)}x ROAS (${pct(ACCOUNT.roasDeltaPct)}) and ${ACCOUNT.results7d.toLocaleString("en-US")} results (${pct(ACCOUNT.resultsDeltaPct)}).`;

/* ── From 351px of mat: the email, windowed ─────────────────────── */

/* The product's digest email (digest/DigestEmail), seen through a window
   on the inside of its white card: from the line "Your week." down to
   the white under the three tiles. The email's warm ground, its logo and
   the card's own border are outside the window, so the mat is the card:
   white on white, and the three figures stand on the stage.

   The window stops before "The pulse": its first row is the week's
   drain, which the economics band directly above already states at 40px
   and the Act tile in How it works states again, and its sentences
   would add about fifty words of product prose to the page's densest
   group. The three tiles are the band's moment.

   In the email's units: the inside of the card starts EMAIL_TOP px under
   the email's top and EMAIL_SIDE px in from each side. From its first
   line: the headline and the date take 69.2px, the three tiles 92px, and
   the label "The pulse" stands 26px under the tiles' foot (its caps about
   29px under it). */
const EMAIL_TOP = 151;
const EMAIL_SIDE = 48;
/* The window's height in the email's units, as a literal class (the
   stylesheet is built from the source's text): 69.2 + 92, then 20 of the
   card's white under the tiles, clear of the label's caps. */
const WINDOW_H = "[--fh:181.2]";

/* The email laid out so the inside of its card is as wide as this box,
   and placed so that inside is the box. */
function EmailInside() {
  return (
    <div className="absolute" style={{ top: -EMAIL_TOP, left: -EMAIL_SIDE, right: -EMAIL_SIDE }}>
      <DigestEmail header={false} />
    </div>
  );
}

/* Two layouts, chosen by the width the mat has for the fragment (a
   container query on the mat's inside):
   - OWN, where the mat has under 498px: the email is laid out as wide as
     the mat and painted one to one, so its type is the email's own size
     (1100 and 640, for example). Its three tiles need 383px to hold each
     change line whole, so the email is never laid out under OWN_MIN:
     where the mat is narrower than that it is painted down to fit, 0.93
     at 1024 and never under nine tenths (the page's .bp-fit with a
     ceiling of one). The headline, the date and the tiles keep their
     heights at every width in the range, so the window's height holds.
   - WIDE, at 498, the widest the email's card goes, where the mat has
     more: painted at the mat's width, 1.14 from 1440, 1.01 at 1280, 1.05
     at 768, and never over one and a quarter (the window is never wider
     than 622; past that it is centred in the mat's white), so the
     email's Georgia stays a text face beside the page's serif.
   Measured on the stage. */
const OWN_MIN = 390;
const WIDE_W = 498;

function EmailOwn() {
  return (
    <div className={`bp-fit [--fk:1] ${WINDOW_H} @max-[21.9375rem]:hidden @min-[31.125rem]:hidden`} style={{ "--fw": OWN_MIN } as CSSProperties}>
      <div>
        <div>
          <EmailInside />
        </div>
      </div>
    </div>
  );
}

function EmailWide() {
  return (
    <div className={`pb-fluid ${WINDOW_H} @max-[31.125rem]:hidden`} style={{ "--fw": WIDE_W, maxWidth: "none" } as CSSProperties}>
      <div className="pb-fluid-inner">
        <EmailInside />
      </div>
    </div>
  );
}

/* ── Under 351px of mat (a phone): the same report in Slack ─────── */

/* The email cannot be laid out that narrow (its tiles would break their
   figures), so a phone's mat holds the same report as it posts to the
   team's channel (digest/SlackDigest, in the chat's own sans, with no
   channel line and no card of its own): from its top to the end of its
   first paragraph, the week in one sentence ("Fizzli spent $48,320 last
   week (+12% vs prior) at 3.40x ROAS", two lines whose box ends 118px
   down). The cut is 127px down: in the white over the worklist's first
   line, whose box starts at 126 and whose first ink is lower still, with
   the band's 1px edge on the last pixel. So the drain is left out here,
   as it is from the email. Laid out 300
   wide: at its own size at 390, at nine tenths at 360, 1.21 at most (the
   email takes over from about 457). It brings its own 16px of padding,
   so it takes the mat's 8px margin as well. */
const SLACK = { w: 300, h: 127 };

/* ── The stage ──────────────────────────────────────────────────── */

/* Not a navy band: the page's pale stage (paper-2, a hairline,
   4px, one white mat with a hairline outline and 4px top corners, set in
   by the stage's margin: 32px from 1440, 24px under it, as TextStage,
   and 8px on a phone, not TextStage's 12, because the stage's and the
   mat's hairlines take 4px of the width the Slack post needs: at 12 it
   would be painted at 0.89 at 360). A navy band here would be a second
   one of the same size 96px under the economics band; on paper-2 the
   group's two rows read as two different things, and the page's navy
   grounds are four, each with its own job (the agent's frame-wide band,
   the brief band, the essay panel, the economics band). The stage
   carries no labels, as the page's other stages carry none.

   The mat's white margin is 24px from 1440, 16px from xl and from sm to
   md, 12px from lg to xl, 32px from md to lg, 8px under sm, and the
   window ends at its foot, in the white under the tiles (on a phone,
   under the Slack post's first paragraph). The
   white is the email card's own, so the mat runs the stage's width and
   the window is capped at 622px inside it and centred (the email is then
   never painted over one and a quarter). The stage is as tall as what it
   holds, so from lg it ends short of its text column with paper under it,
   as the brief band does from 1024 to 1280.

   The email draws its tiles with an inline 12px radius; here it is the
   page's 4px at whatever scale it is painted, set from outside the
   product. One Shot holds the three layouts, so the picture has one
   text alternative. */
const TILE_CORNERS = "[&_[style*='border-radius:12px']]:rounded-[calc(4px/var(--pb-fluid-scale,var(--bp-k,1)))]!";
const MAT_PAD = "px-2 pt-2 sm:px-4 sm:pt-4 md:px-8 md:pt-8 lg:max-xl:px-3 lg:max-xl:pt-3 xl:px-4 xl:pt-4 min-[90rem]:px-6 min-[90rem]:pt-6";

function DigestPeek() {
  return (
    <div className={`overflow-hidden rounded-[4px] border bg-[var(--mn-paper-2)] px-2 pt-2 sm:px-6 sm:pt-6 min-[90rem]:px-8 min-[90rem]:pt-8 ${PAPER.rule}`}>
      <div className={`overflow-hidden rounded-t-[4px] border border-b-0 bg-[var(--mn-white)] ${PAPER.rule} ${MAT_PAD}`}>
        <div className={`@container mx-auto max-w-[622px] ${TILE_CORNERS}`}>
          <Shot label={DIGEST_LABEL} ground={false}>
            <div className="-mx-2 -mt-2 @min-[21.9375rem]:hidden">
              <Fluid width={SLACK.w} height={SLACK.h}>
                <SlackDigest channel={null} figures="plain" className="rounded-none border-0" />
              </Fluid>
            </div>
            <EmailOwn />
            <EmailWide />
          </Shot>
        </div>
      </div>
    </div>
  );
}

/* The three places the report shows up, each led by one line icon:
   20px, 1.5px, no fill. */
const ICON = { size: 20, strokeWidth: 1.5 };
const ICONS = [<ListChecks key="daily" {...ICON} />, <Mail key="monday" {...ICON} />, <MessageSquare key="slack" {...ICON} />];

/* The subhead already says the three places (every sync, Monday, inbox
   and Slack), so the points show their titles only, each on one ruled
   row with its icon, and their sentences wait behind one More row (the
   disclosure the Agent Peach and brief rows use). The titles stay h3s,
   and the sentences are in the server's HTML. */
export function WeeklyRow() {
  return (
    <FeatureRow flip eyebrow={WEEKLY_REPORT.eyebrow} headline={WEEKLY_REPORT.headline} accent="tells you." sub={WEEKLY_REPORT.subhead} tile={<DigestPeek />}>
      <PointTitles points={WEEKLY_REPORT.blurbs} icons={ICONS} />
    </FeatureRow>
  );
}
