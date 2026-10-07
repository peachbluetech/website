"use client";

import { useId, useState, type CSSProperties } from "react";
import { Range } from "@/components/site/kit";
import { Card, Inner, T, TONE, TextButton, cx } from "@/components/site/parts";
import "./CreativeWasteDiagnostic.css";

/* The creative waste diagnostic: four sliders in, four figures out.

   The arithmetic, which the tool's page also states in words:

     test spend per creative = 0.5% of monthly spend, at least $200 and
                               at most $10,000, unless the reader pins
                               a figure of their own
     waste per month         = launches x (1 - hit rate) x test spend
     cost per winner         = test spend / hit rate

   Ten more points of hit rate make a share of the winner supply new
   (0.1 / (hit rate + 0.1)); that share of the scale budget (spend less
   the testing budget) is credited at winner ROAS x 0.30, and the
   testing budget no longer spent on losers is added to it. Half a
   point of winner ROAS is valued on the whole scale budget.

   The look. One taupe card, whole: the sliders on the taupe, and the
   answers on a white inner card as rows on dotted separators. The
   first answer is the page's figure, in the display face, with the one
   data bar under it: a hairline track whose navy share is the share of
   monthly spend going to losing creatives (the figure its own sentence
   states). The bar is decoration; the sentence says all of it.

   The card is a container, so it has two columns only where it is wide
   enough for them, whether it stands across a page or in a column of
   running text. The root carries .el-embed, so the rules of running
   text stop at its edge. Every label, hint and sentence is the
   published one. */

const SCALE_MULTIPLE = 10; // scaled spend a winner absorbs, as a multiple of its test spend
const FATIGUE_DELTA = 0.3; // ROAS advantage of a fresh winner over the fatigued spend it replaces
const TEST_SPEND_RATE = 0.005; // test spend per creative as a share of monthly spend
const TEST_SPEND_MIN = 200;
const TEST_SPEND_MAX = 10_000;

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const derivedTestSpend = (spend: number) =>
  Math.min(TEST_SPEND_MAX, Math.max(TEST_SPEND_MIN, Math.round((spend * TEST_SPEND_RATE) / 100) * 100));

/* One slider: its label and its value on one line, the track, and the
   line under it. The track's filled part runs to the thumb; how far
   that is comes in as a number from 0 to 1. */
function Slider({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  const id = useId();
  const at = max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0;
  return (
    <div className="el-field">
      <div className="el-waste-top">
        <label htmlFor={id} className="el-label">
          {label}
        </label>
        <span className="el-waste-value el-tnum">
          {prefix}
          {value.toLocaleString("en-US")}
          {suffix}
        </span>
      </div>
      <Range
        id={id}
        className="el-waste-range"
        style={{ "--el-waste-at": at } as CSSProperties}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-describedby={`${id}-note`}
      />
      <p id={`${id}-note`} className="el-help">
        {hint}
      </p>
    </div>
  );
}

/* One answer: what it is, the figure, the sentence that explains it.
   `lead` is the page's figure, in the display face; `share` (0 to 100)
   draws the data bar under it. The other figures are Inter with
   tabular figures, so they hold their width as the sliders move. The
   display face's own tabular figures are a different, typewriter-like
   set (a slashed zero, a footed one), so the page's figure keeps the
   face's ordinary ones and only its tail moves. `per` is the period a
   figure is for ("/mo"): it follows the figure with no space, as it is
   published, set small and quiet as the period of a price is. */
function Result({ label, value, per, note, lead = false, share }: { label: string; value: string; per?: string; note: string; lead?: boolean; share?: number }) {
  return (
    <div className="el-waste-result">
      <p className={cx(T.eyebrow, "el-balance")}>{label}</p>
      <p className={lead ? T.heading : cx(T.titleLg, "el-tnum")}>
        {value}
        {per && <span className="el-waste-per">{per}</span>}
      </p>
      {share !== undefined && (
        <span aria-hidden="true" className="el-waste-bar" style={{ "--el-waste-share": `${share}%` } as CSSProperties}>
          <span className="el-waste-fill" />
        </span>
      )}
      <p className={cx(T.bodySm, TONE.smoke, "el-pretty")}>{note}</p>
    </div>
  );
}

export function CreativeWasteDiagnostic() {
  const [spend, setSpend] = useState(500_000);
  const [launched, setLaunched] = useState(50);
  const [hitRatePct, setHitRatePct] = useState(10);
  const [winnerRoas, setWinnerRoas] = useState(3);
  const [pinnedTestSpend, setPinnedTestSpend] = useState<number | null>(null);
  const [customizing, setCustomizing] = useState(false);

  const perCreative = pinnedTestSpend ?? derivedTestSpend(spend);
  const h = hitRatePct / 100;
  const testingBudget = launched * perCreative;
  const testingSharePct = spend > 0 ? (testingBudget / spend) * 100 : 0;
  const losersPerMonth = launched * (1 - h);
  const winnersPerMonth = launched * h;
  const wasteMonthly = losersPerMonth * perCreative;
  const wasteOfTotalPct = spend > 0 ? (wasteMonthly / spend) * 100 : 0;
  const costPerWinner = h > 0 ? perCreative / h : 0;

  const improvedH = Math.min(h + 0.1, 0.95);
  const extraWinners = launched * (improvedH - h);
  const scaleBudget = Math.max(0, spend - testingBudget);
  const refreshShare = (improvedH - h) / improvedH;
  const revenueValue = scaleBudget * refreshShare * winnerRoas * FATIGUE_DELTA;
  const testSavings = testingBudget * (1 - h / improvedH);
  const totalHitRateValue = revenueValue + testSavings;

  // Fixed better-winners scenario, symmetric with the fixed +10pp: a ROAS
  // lift pays on every dollar of scaled spend, at any hit rate.
  const ROAS_LIFT = 0.5;
  const roasLiftValue = scaleBudget * ROAS_LIFT;

  return (
    <Card variant="bare" className="el-embed el-waste">
      <div className="el-waste-grid">
        <div className="el-dotted el-waste-inputs">
          <div className="el-waste-fields">
            <Slider
              label="Monthly ad spend"
              hint="Across your paid social accounts."
              value={spend}
              onChange={setSpend}
              min={10_000}
              max={5_000_000}
              step={10_000}
              prefix="$"
            />
            <Slider
              label="New creatives launched per month"
              hint="A team testing daily typically launches 30 to 60; large accounts run hundreds."
              value={launched}
              onChange={setLaunched}
              min={4}
              max={400}
              step={2}
            />
            <Slider
              label="Hit rate"
              hint="Share of new creatives that become scalable winners. Most teams sit between 10 and 30 percent."
              value={hitRatePct}
              onChange={setHitRatePct}
              min={5}
              max={60}
              step={1}
              suffix="%"
            />
            <Slider
              label="Winner ROAS"
              hint="What a winning creative returns on its scaled spend."
              value={winnerRoas}
              onChange={setWinnerRoas}
              min={1}
              max={8}
              step={0.5}
              suffix=":1"
            />
          </div>

          <div className="el-waste-assume">
            <p className={cx(T.ui, TONE.earth, "el-pretty")}>
              At this account size, each creative tests with{" "}
              <span className="el-waste-figure el-tnum">{usd(perCreative)}</span> before the verdict
              {pinnedTestSpend === null ? (
                <span>
                  {" "}
                  ({perCreative >= TEST_SPEND_MAX
                    ? "at our $10,000 cap for very large accounts; pin your own number below if you test bigger"
                    : "0.5% of monthly spend, the typical pattern: bigger accounts test bigger"}
                  ).
                </span>
              ) : (
                <span> (set by you).</span>
              )}{" "}
              Testing budget: <span className="el-waste-figure el-tnum">{usd(testingBudget)}/mo</span>,{" "}
              <span className="el-tnum">{testingSharePct.toFixed(1)}%</span> of spend.
            </p>
            {customizing ? (
              <>
                <Slider
                  label="Test spend per creative"
                  hint="Pinned: this value now stays fixed when you move monthly spend."
                  value={perCreative}
                  onChange={(v) => setPinnedTestSpend(v)}
                  min={100}
                  max={10_000}
                  step={100}
                  prefix="$"
                />
                {pinnedTestSpend !== null && (
                  <p className={T.ui}>
                    <TextButton
                      className="el-ui"
                      onClick={() => {
                        setPinnedTestSpend(null);
                        setCustomizing(false);
                      }}
                    >
                      Reset to the account-size default
                    </TextButton>
                  </p>
                )}
              </>
            ) : (
              <p className={T.ui}>
                <TextButton className="el-ui" onClick={() => setCustomizing(true)}>
                  My account tests differently
                </TextButton>
              </p>
            )}
          </div>
        </div>

        <Inner className="el-waste-results">
          <div className="el-dotted">
            <Result
              lead
              share={Math.min(100, Math.max(0, wasteOfTotalPct))}
              label="Spend going to losing creatives"
              value={usd(wasteMonthly)}
              per="/mo"
              note={`${Math.round(losersPerMonth)} of your ${launched} monthly launches will not become winners at a ${hitRatePct}% hit rate, each burning its ${usd(perCreative)} test budget finding out. ${wasteOfTotalPct.toFixed(1)}% of total spend, ${usd(wasteMonthly * 12)} a year.`}
            />
            <Result
              label="Cost per winning creative"
              value={usd(costPerWinner)}
              note={`Each of your ~${Math.max(1, Math.round(winnersPerMonth))} monthly winners carries the test spend of the losers it took to find it.`}
            />
            <Result
              label="What 10 points of hit rate is worth"
              value={usd(totalHitRateValue)}
              per="/mo"
              note={`${Math.round(extraWinners)} more winners a month means ${Math.round(refreshShare * 100)}% of your winner supply is new, refreshing that share of your ${usd(scaleBudget)} scale budget with fresh winners instead of fatigued spend. At ${winnerRoas}:1 that is ${usd(revenueValue)}/mo in incremental revenue, plus ${usd(testSavings)}/mo saved in testing. ${usd(totalHitRateValue * 12)} a year. The lower your hit rate today, the more each point is worth.`}
            />
            <Result
              label="What half a point of winner ROAS is worth"
              value={usd(roasLiftValue)}
              per="/mo"
              note={`Better creative does not just win more often, it wins bigger. Going from ${winnerRoas}:1 to ${winnerRoas + ROAS_LIFT}:1 pays on every dollar of your ${usd(scaleBudget)} scaled budget: ${usd(roasLiftValue * 12)} a year in revenue, at any hit rate. Each improvement is valued in isolation; improving both compounds.`}
            />
          </div>
        </Inner>
      </div>
    </Card>
  );
}
