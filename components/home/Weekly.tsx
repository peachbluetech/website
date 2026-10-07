import "./Weekly.css";
import { DigestEmail, SlackDigest } from "@/components/product/digest";
import { money } from "@/components/product/digest/data";
import { ACCOUNT } from "@/components/product/sample";
import { WEEKLY_REPORT } from "./content";
import { Cell, Cells, Eyebrow, Fluid, Inner, Shot, T, TONE, cx } from "@/components/site/parts";

/* The weekly report: the second row of "For performance teams",
   rendered by Performance.tsx inside its section between two
   rules that carry a centre mark.

   A ruled split row with a centre rail from 1024. Left half, 48px in:
   the eyebrow, the h2 at Inter 24/32, the subhead in smoke, and the three
   places the report shows up as a two column mini list (one column where
   the half is narrow), each an h3 over its sentence. All three sentences
   are visible: this row has no "More".
   Right half, 16px from the centre rail, the right rail and both rules:
   two white inner cards, 16px apart. The first is the top of the Monday
   email, the second the same report as it posts to the team's channel.
   Neither is cropped: each ends in the fragment's own white. From 1024
   the two cards share what is left of the row's height.

   On a phone the halves stack and the right one holds the channel post
   alone (the email cannot be laid out that narrow).

   One Shot holds both fragments, so the picture has one text
   alternative. */

const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(0)}%`;

const DIGEST_LABEL = `The weekly digest for a sample account, ${ACCOUNT.window}, as it arrives by email and as it posts to the team's channel: ${money(ACCOUNT.spend7d)} spent (${pct(ACCOUNT.spendDeltaPct)} against the week before), ${ACCOUNT.roas7d.toFixed(2)}x ROAS (${pct(ACCOUNT.roasDeltaPct)}) and ${ACCOUNT.results7d.toLocaleString("en-US")} results (${pct(ACCOUNT.resultsDeltaPct)}).`;

/* ── The email, windowed ────────────────────────────────────────── */

/* The product's digest email (digest/DigestEmail), seen through a window
   on the inside of its own white card: from the line "Your week." down
   to the white under the three tiles. The email's warm ground, its logo
   and its card's own border are outside the window, so the inner card is
   the email's card: white on white.

   In the email's units: the inside of its card starts EMAIL_TOP px under
   the email's top and EMAIL_SIDE px in from each side, and is EMAIL_W
   wide at its widest. From its first line the headline and the date take
   69.2px and the three tiles 92px; the window adds 8px of the card's
   white, which with the inner card's own 16px is the white the headline
   has over its capitals. Painted at the width of its slot (1.05 at 1440)
   and never over one and a quarter (Weekly.css). */
const EMAIL_TOP = 151;
const EMAIL_SIDE = 48;
const EMAIL_W = 498;
const EMAIL_H = 69.2 + 92 + 8;

/* ── The channel post, windowed ─────────────────────────────────── */

/* The same report as it posts to the team's channel (digest/SlackDigest,
   in the chat's own sans, with no channel line and no card of its own):
   from the sender line to the end of its first paragraph, the week in one
   sentence. The cut is in the white under that paragraph, over the
   worklist's first line.

   It is the page's .bp-fit with its numbers set in Weekly.css, so the
   one render has two layouts: from 600 of viewport it is laid out as
   wide as its slot and never under 528 (painted down to fit under that:
   0.83 at 1024), where the sentence takes one line; under 600 it is laid
   out 332 wide, where the sentence takes two. */

export function Weekly() {
  return (
    <div className="el-weekly">
      <Cells cols={2} ruled={false}>
        <Cell>
          <Eyebrow>{WEEKLY_REPORT.eyebrow}</Eyebrow>
          <h2 className={cx(T.titleLg, "el-weekly-title")}>{WEEKLY_REPORT.headline}</h2>
          <p className={cx(T.body, TONE.smoke, "el-pretty el-weekly-sub")}>{WEEKLY_REPORT.subhead}</p>
          <div className="el-weekly-list">
            {WEEKLY_REPORT.blurbs.map((blurb) => (
              <div key={blurb.title}>
                <h3 className={T.bodySm}>{blurb.title}</h3>
                <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-weekly-line")}>{blurb.text}</p>
              </div>
            ))}
          </div>
        </Cell>

        <Cell pad="none" className="el-weekly-media">
          <Shot label={DIGEST_LABEL} ground={false} className="el-weekly-stage">
            <Inner className="el-weekly-email el-from-md">
              <div className="el-weekly-email-box">
                <Fluid width={EMAIL_W} height={EMAIL_H}>
                  <div className="el-weekly-email-in" style={{ top: -EMAIL_TOP, left: -EMAIL_SIDE, right: -EMAIL_SIDE }}>
                    <DigestEmail header={false} />
                  </div>
                </Fluid>
              </div>
            </Inner>
            <Inner flush className="el-weekly-slack">
              <div className="bp-fit el-weekly-post">
                <div>
                  <div className="el-weekly-post-in">
                    <SlackDigest channel={null} figures="plain" />
                  </div>
                </div>
              </div>
            </Inner>
          </Shot>
        </Cell>
      </Cells>
    </div>
  );
}
