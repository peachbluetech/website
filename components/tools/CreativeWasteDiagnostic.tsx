"use client";

import { useState } from "react";

/**
 * Creative waste diagnostic (V5).
 *
 * The resolution of four falsified iterations: monthly spend IS the primary
 * slider, and test spend per creative is a DERIVED, displayed assumption
 * (0.5% of monthly spend, floored/capped), not a slider. That makes both
 * user intuitions hold at once with zero hidden slider motion:
 *   spend up    -> each creative tests bigger -> waste up
 *   launches up -> waste up, linearly
 * A customize override pins test spend for accounts that differ; pinning is
 * explicit and labeled, and clears via the reset link.
 *
 *   T(S)             = clamp(0.5% x spend, $200, $10,000)  [unless pinned]
 *   waste/mo         = launched x (1 - hit rate) x T
 *   cost per winner  = T / hit rate
 *
 * Hit-rate value is scarcity-based (v5.1): +10pp means a share of your
 * future winner supply is new — refreshShare = 0.1 / (h + 0.1) — and that
 * share of the SCALE budget (spend - testing budget) gets carried by fresh
 * winners instead of fatigued spend, credited at ROAS x FATIGUE_DELTA.
 * Lower current hit rate -> bigger share -> each point worth more.
 *   hit-rate value   = scaleBudget x refreshShare x ROAS x 0.30 + savings
 */

const SCALE_MULTIPLE = 10; // scaled spend a winner absorbs, as a multiple of its test spend
const FATIGUE_DELTA = 0.3; // ROAS advantage of a fresh winner over the fatigued spend it replaces
const TEST_SPEND_RATE = 0.005; // test spend per creative as a share of monthly spend
const TEST_SPEND_MIN = 200;
const TEST_SPEND_MAX = 10_000;

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const derivedTestSpend = (spend: number) =>
  Math.min(TEST_SPEND_MAX, Math.max(TEST_SPEND_MIN, Math.round((spend * TEST_SPEND_RATE) / 100) * 100));

function Field({
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
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <span className="text-[13.5px] font-semibold text-pb-fg">{label}</span>
        <span className="text-[14px] font-medium text-pb-fg tnum whitespace-nowrap">
          {prefix}
          {value.toLocaleString("en-US")}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#F27749]"
        aria-label={label}
      />
      <div className="text-[11.5px] text-pb-fg-muted mt-1">{hint}</div>
    </label>
  );
}

function Result({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-pb-border bg-pb-card shadow-pb-soft p-5">
      <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-pb-fg-muted mb-1.5">
        {label}
      </div>
      <div className="font-display text-[30px] font-medium tracking-tight text-pb-fg tnum leading-none mb-2">
        {value}
      </div>
      <div className="text-[12.5px] text-pb-fg-muted leading-relaxed">{note}</div>
    </div>
  );
}

export function CreativeWasteDiagnostic() {
  const [spend, setSpend] = useState(100_000);
  const [launched, setLaunched] = useState(40);
  const [hitRatePct, setHitRatePct] = useState(20);
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

  return (
    <div className="rounded-3xl border border-pb-border bg-pb-muted/40 p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        <div className="space-y-6">
          <Field
            label="Monthly ad spend"
            hint="Across your paid social accounts."
            value={spend}
            onChange={setSpend}
            min={10_000}
            max={5_000_000}
            step={10_000}
            prefix="$"
          />
          <Field
            label="New creatives launched per month"
            hint="A team testing daily typically launches 30 to 60; large accounts run hundreds."
            value={launched}
            onChange={setLaunched}
            min={4}
            max={400}
            step={2}
          />
          <Field
            label="Hit rate"
            hint="Share of new creatives that become scalable winners. Most teams sit between 10 and 30 percent."
            value={hitRatePct}
            onChange={setHitRatePct}
            min={5}
            max={60}
            step={1}
            suffix="%"
          />
          <Field
            label="Winner ROAS"
            hint="What a winning creative returns on its scaled spend."
            value={winnerRoas}
            onChange={setWinnerRoas}
            min={1}
            max={8}
            step={0.5}
            suffix=":1"
          />

          <div className="rounded-xl border border-pb-border bg-pb-card p-4">
            <p className="text-[12.5px] leading-relaxed text-pb-fg">
              At this account size, each creative tests with{" "}
              <span className="font-semibold tnum">{usd(perCreative)}</span> before the verdict
              {pinnedTestSpend === null ? (
                <span className="text-pb-fg-muted">
                  {" "}
                  ({perCreative >= TEST_SPEND_MAX
                    ? "at our $10,000 cap for very large accounts; pin your own number below if you test bigger"
                    : "0.5% of monthly spend, the typical pattern: bigger accounts test bigger"}
                  ).
                </span>
              ) : (
                <span className="text-pb-fg-muted"> (set by you).</span>
              )}{" "}
              Testing budget: <span className="font-semibold tnum">{usd(testingBudget)}/mo</span>,{" "}
              <span className="tnum">{testingSharePct.toFixed(1)}%</span> of spend.
            </p>
            {customizing ? (
              <div className="mt-3">
                <Field
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
                  <button
                    type="button"
                    className="mt-2 text-[11.5px] font-medium text-pb-peach-600 underline underline-offset-2"
                    onClick={() => {
                      setPinnedTestSpend(null);
                      setCustomizing(false);
                    }}
                  >
                    Reset to the account-size default
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="mt-2 text-[11.5px] font-medium text-pb-fg-muted underline underline-offset-2 hover:text-pb-fg"
                onClick={() => setCustomizing(true)}
              >
                My account tests differently
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Result
            label="Spend going to losing creatives"
            value={`${usd(wasteMonthly)}/mo`}
            note={`${Math.round(losersPerMonth)} of your ${launched} monthly launches will not become winners at a ${hitRatePct}% hit rate, each burning its ${usd(perCreative)} test budget finding out. ${wasteOfTotalPct.toFixed(1)}% of total spend, ${usd(wasteMonthly * 12)} a year.`}
          />
          <Result
            label="Cost per winning creative"
            value={usd(costPerWinner)}
            note={`Each of your ~${Math.max(1, Math.round(winnersPerMonth))} monthly winners carries the test spend of the losers it took to find it.`}
          />
          <Result
            label="What 10 points of hit rate is worth"
            value={`${usd(totalHitRateValue)}/mo`}
            note={`${Math.round(extraWinners)} more winners a month means ${Math.round(refreshShare * 100)}% of your winner supply is new, refreshing that share of your ${usd(scaleBudget)} scale budget with fresh winners instead of fatigued spend. At ${winnerRoas}:1 that is ${usd(revenueValue)}/mo in incremental revenue, plus ${usd(testSavings)}/mo saved in testing. ${usd(totalHitRateValue * 12)} a year. The lower your hit rate today, the more each point is worth.`}
          />
        </div>
      </div>
    </div>
  );
}
