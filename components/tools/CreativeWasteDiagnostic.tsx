"use client";

import { useState } from "react";

/**
 * Creative waste diagnostic (V2) — for teams launching new creative daily.
 *
 * Model (all derived, no hidden coupling between sliders):
 *   testing budget   = spend x testing share
 *   test per creative= testing budget / launched     (derived, displayed)
 *   waste/mo         = testing budget x (1 - hit rate)
 *   cost per winner  = testing budget / (launched x hit rate)
 *   +10pp hit rate   = testing budget x (1 - h / (h + 0.1))
 *
 * Waste is linear in spend at fixed creative count: a $1M account with 20
 * creatives wastes 10x what a $100k account with 20 creatives does, because
 * each loser burns 10x more before the verdict.
 * Scope: paid social testing volume. No DSP inputs by design.
 */

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

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
  const [testSharePct, setTestSharePct] = useState(20);

  const h = hitRatePct / 100;
  const testingBudget = spend * (testSharePct / 100);
  const testPerCreative = launched > 0 ? testingBudget / launched : 0;
  const losersPerMonth = launched * (1 - h);
  const winnersPerMonth = launched * h;
  const wasteMonthly = testingBudget * (1 - h);
  const wasteOfTotalPct = spend > 0 ? (wasteMonthly / spend) * 100 : 0;
  const costPerWinner = winnersPerMonth > 0 ? testingBudget / winnersPerMonth : 0;
  const improvedH = Math.min(h + 0.1, 0.95);
  const savingsMonthly = testingBudget * (1 - h / improvedH);
  const costPerWinnerImproved = launched > 0 ? testingBudget / (launched * improvedH) : 0;

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
            label="Share of budget in testing"
            hint="How much of your spend flows through unproven creatives. Most high-volume teams run 10 to 30 percent."
            value={testSharePct}
            onChange={setTestSharePct}
            min={5}
            max={50}
            step={1}
            suffix="%"
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
          <p className="text-[12px] text-pb-fg-muted leading-relaxed">
            That puts your testing budget at{" "}
            <span className="font-medium text-pb-fg tnum">{usd(testingBudget)}/mo</span>, which gives
            each new creative about{" "}
            <span className="font-medium text-pb-fg tnum">{usd(testPerCreative)}</span> to prove
            itself before the verdict.
          </p>
        </div>

        <div className="space-y-4">
          <Result
            label="Spend going to losing creatives"
            value={`${usd(wasteMonthly)}/mo`}
            note={`${Math.round(losersPerMonth)} of your ${launched} monthly launches will not become winners at a ${hitRatePct}% hit rate, and they burn their test budget finding out. That is ${wasteOfTotalPct.toFixed(1)}% of your total spend, ${usd(wasteMonthly * 12)} a year.`}
          />
          <Result
            label="Cost per winning creative"
            value={usd(costPerWinner)}
            note={`Each of your ~${Math.max(1, Math.round(winnersPerMonth))} monthly winners carries the test spend of the losers it took to find it.`}
          />
          <Result
            label="What 10 points of hit rate is worth"
            value={`${usd(savingsMonthly)}/mo`}
            note={`At a ${Math.round(improvedH * 100)}% hit rate, cost per winner drops from ${usd(costPerWinner)} to ${usd(costPerWinnerImproved)}. ${usd(savingsMonthly * 12)} a year in testing budget, or the same budget producing more winners.`}
          />
        </div>
      </div>
    </div>
  );
}
