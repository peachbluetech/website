import type { Metadata } from "next";
import { AskedChip, CardGrid, MCP_RANKED, ToolCall } from "@/components/product/mcp";
import { ACCOUNT } from "@/components/product/sample";
import { CtaBand, LEAD, PageHeader, PeekBox, PeekPanel, Stack } from "@/components/site/kit";
import { Block, Cell, Cells, Dotted, Frame, Pill, Rule, Side, T, TONE, TextLink, cx } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";
import { RISK_REVERSAL, TRIAL_HREF, TRIAL_LABEL } from "@/lib/site";
import "./mcp.css";

export const metadata: Metadata = {
  title: "Your ad data in Claude (MCP)",
  description:
    "Connect Peachblue to Claude, Cursor, or any MCP client. The only creative analytics MCP that serves your own cross-platform performance data, including Amazon DSP.",
  alternates: { canonical: "/mcp" },
};

/* Your data in Claude (/mcp): the page that explains connecting
   Peachblue to an MCP client, built in the design system from the
   inner-page kit. The words, the heading levels and the links are the
   published ones: restyle freely, do not reword, and do not add a claim.

   Top to bottom:
   1. The header, split as the homepage's hero is: the eyebrow, the h1,
      the two pills and the risk line on the left, the two paragraphs on
      the right. Under it one picture in a taupe panel: a question, the
      Peachblue tool that answered it and the creative card it returned
      (components/product/mcp), cut by the panel's foot under the ads'
      names.
   2. Ask in plain language: the h2 and its paragraph in the narrow
      column, the five example questions as rows in the wide one.
   3. Connected in three steps: a header cell, then three ruled cells,
      then the line about access.
   4. 23 tools, five jobs: the h2 in the narrow column, the five jobs as
      rows on dotted separators in the wide one, then the line that
      points at the tool reference.
   5. The closing band.

   Truth rules. Claude is named only as the client, in the page's own
   words. The picture is Peachblue's own tool row and card on a plain
   white window: no client's interface is drawn and no client's mark is
   shown. A server component: every word is in the HTML the server
   sends. */

const EXAMPLE_QUESTIONS = [
  "What were my top 5 creatives by composite score last month?",
  "Compare our two hero videos head to head.",
  "Which hooks drove the most ROAS on Meta this quarter?",
  "Where is spend concentrated right now, and what looks fatigued?",
  "How did last week compare to the week before, and what moved?",
];

const STEPS = [
  {
    num: "1",
    title: "Copy your connection URL",
    desc: "In Peachblue, open Settings and go to the MCP tab. Your workspace's connection URL is right there.",
  },
  {
    num: "2",
    title: "Add it to your client",
    desc: "Claude Desktop, claude.ai, Cursor, Claude Code, or any client that speaks the Model Context Protocol. Paste the URL as a custom connector.",
  },
  {
    num: "3",
    title: "Approve with OAuth",
    desc: "The first connection opens a sign-in where you approve access with your Peachblue account. No API keys to create, rotate, or leak.",
  },
];

const TOOL_GROUPS = [
  {
    title: "Performance and rankings",
    desc: "Account summaries, ranked creatives, deep dives, and head-to-head comparisons decided by composite score.",
  },
  {
    title: "Patterns and dimensions",
    desc: "Creative archetypes, 31-dimension tag analysis, and copy variant performance across every ad.",
  },
  {
    title: "Time and risk",
    desc: "Daily trends, period-over-period change attribution, spend concentration, and fatigue candidates.",
  },
  {
    title: "Audience and brand",
    desc: "Demographics, placements, keyword search across your library, and Reddit brand sentiment.",
  },
  {
    title: "Pacing and reporting",
    desc: "Amazon DSP flight pacing against budget, supplier breakdowns, daily spend, and client-by-client comparison for agencies.",
  },
];

/* ── The picture ────────────────────────────────────────────────── */

/* A question, the Peachblue tool row that answered it and the creative
   card the tool returned: the product's own three pieces, in the order
   and at the distances its own turn has them (mcp/Turn.tsx). The card is
   given the width its panel has room for and lays itself out from it
   (five ads across, four, three or two); mcp.css holds those widths and
   where the panel's foot cuts each. */
const [FIRST, SECOND] = MCP_RANKED.creatives;
const PICTURE_LABEL = `A question asked of a sample account through Peachblue's MCP server, "${MCP_RANKED.question}": the Peachblue tool call that answered it, get_creatives with limit ${MCP_RANKED.call.args.limit} over the last 7 days, and Peachblue's creative card, a ranked grid of ${MCP_RANKED.creatives.length} creatives led by #1 ${FIRST.name} at score ${FIRST.score} and #2 ${SECOND.name} at ${SECOND.score}.`;

function Picture() {
  return (
    <PeekPanel bleed className="el-mcp-peek" label={PICTURE_LABEL} caption={`Sample account: ${ACCOUNT.brand}`}>
      <PeekBox>
        <div className="el-mcp-turn">
          <div className="el-mcp-asked">
            <AskedChip question={MCP_RANKED.question} />
          </div>
          <ToolCall call={MCP_RANKED.call} />
          <CardGrid ground={false} className="el-mcp-host" />
        </div>
      </PeekBox>
    </PeekPanel>
  );
}

export default function McpPage() {
  return (
    <SitePage>
      <PageHeader
        eyebrow="MCP integration"
        title="Bring your ad performance into Claude."
        leadAt="top"
        lead={
          <>
            <p className={LEAD}>
              Peachblue&apos;s MCP server exposes the same 23 tools that power Agent Peach to any MCP
              client: Claude Desktop, claude.ai, Cursor, and Claude Code. Rankings, comparisons,
              patterns, fatigue, and risk, over your Meta, TikTok, Google Ads, and Amazon DSP data.
            </p>
            <p className={cx(T.bodySm, TONE.smoke, "el-pretty")}>
              Other ad tools ship MCP servers for inspiration libraries or competitor research.
              Peachblue&apos;s is the only creative analytics MCP that serves your own cross-platform
              performance data, including Amazon DSP.
            </p>
          </>
        }
        actions={
          <>
            <Pill href={TRIAL_HREF}>{TRIAL_LABEL}</Pill>
            <Pill href="/docs/mcp" variant="outline">
              Setup docs
            </Pill>
          </>
        }
        note={
          <>
            {RISK_REVERSAL} &middot; <span className="el-keep">MCP included on Pro and up</span>
          </>
        }
      >
        <Picture />
      </PageHeader>

      <Frame>
        <Rule />

        {/* What you can ask */}
        <section>
          <Block top="top" bottom="pad">
            <Side className="el-mcp-ask">
              <h2 className={cx(T.heading, "el-mcp-ask-title")}>Ask in plain language.</h2>
              <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-mcp-ask-sub")}>
                Claude calls Peachblue&apos;s tools and reasons over the results. Answers match the app,
                because they run on the same engine, and every number states the time window it
                came from.
              </p>
              <Dotted as="div" className="el-mcp-asks">
                {EXAMPLE_QUESTIONS.map((q) => (
                  <div key={q} className="el-mcp-asks-row">
                    <span className={cx(T.bodyLg, "el-pretty")}>{q}</span>
                  </div>
                ))}
              </Dotted>
            </Side>
          </Block>
        </section>

        <Rule />

        {/* Setup steps */}
        <section>
          <Block top="top" bottom="gap">
            <h2 className={T.heading}>Connected in three steps.</h2>
          </Block>
          <Rule marks="thirds" />
          <Cells cols={3}>
            {STEPS.map((s) => (
              <Cell key={s.num}>
                <Stack gap={24}>
                  <div className={cx(T.eyebrow, "el-tnum")}>{s.num}</div>
                  <Stack gap={16}>
                    <h3 className={cx(T.subhead, "el-balance")}>{s.title}</h3>
                    <p className={cx(T.bodySm, TONE.smoke, "el-pretty")}>{s.desc}</p>
                  </Stack>
                </Stack>
              </Cell>
            ))}
          </Cells>
          <Rule marks="thirds" />
          <Block top="gap" bottom="gap">
            <p className={cx(T.bodySm, "el-pretty el-mcp-line")}>
              Access follows your Peachblue login: workspace scoping, tier gating, and instant
              revocation from the same Settings tab. Full client-by-client instructions are in
              the{" "}
              <TextLink href="/docs/mcp" underline>
                setup docs
              </TextLink>
              .
            </p>
          </Block>
        </section>

        <Rule />

        {/* Tool groups */}
        <section>
          <Block top="top" bottom="pad">
            <Side>
              <h2 className={cx(T.heading, "el-mcp-jobs-title")}>23 tools, five jobs.</h2>
              <div>
                <Dotted as="div" className="el-mcp-jobs">
                  {TOOL_GROUPS.map((g) => (
                    <div key={g.title} className="el-mcp-job">
                      <div className={T.body}>{g.title}</div>
                      <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-mcp-job-desc")}>{g.desc}</p>
                    </div>
                  ))}
                </Dotted>
                <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-mcp-jobs-note")}>
                  Every tool is read-only and scoped to your workspace. See the full list in the{" "}
                  <TextLink href="/docs/mcp-tools" underline>
                    MCP tool reference
                  </TextLink>
                  .
                </p>
              </div>
            </Side>
          </Block>
        </section>

        <Rule />

        {/* CTA */}
        <CtaBand
          title="Your data, wherever you think."
          lead="MCP access is included on Pro and up. Connect a platform, let the first sync land, and ask Claude about your own ads."
          actions={<Pill href={TRIAL_HREF}>{TRIAL_LABEL}</Pill>}
          note={RISK_REVERSAL}
        />

        <Rule />
      </Frame>
    </SitePage>
  );
}
