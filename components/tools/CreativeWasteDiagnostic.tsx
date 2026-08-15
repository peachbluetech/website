"use client";

import { useState } from "react";

/**
 * Creative waste diagnostic (V4).
 *
 * Design rules learned across three user-falsified iterations:
 * 1. Every slider is an independent lever; nothing moves unless the user
 *    moves it.
 * 2. There is NO spend slider: waste = launches x (1 - hit rate) x test
 *    spend per creative, and monthly spend is not in that formula. A spend
 *    slider can only mislead (silently move other sliders, or do nothing).
 *    Account size enters through explicit preset chips that seed typical
 *    launches + test budgets when clicked.
 *
 *   testing budget   = launched x test spend per creative   (displayed live)
 *   waste/mo         = launched x (1 - hit rate) x test spend per creative
 *   cost per winner  = test spend per creative / hit rate
 *
 * Hit-rate value (revenue-framed, assumptions stated in the page copy):
 *   extra winners/mo = launched x 0.10
 *   each winner scales to ~10x its test spend (SCALE_MULTIPLE)
 *   incremental ROAS vs the fatigued spend it replaces = winner ROAS x 30%
 *   revenue value    = extra winners x (10 x T) x ROAS x 0.30
 *   plus test savings = testing budget x (1 - h / (h + 0.1))
 */

const SCALE_MULTIPLE = 10; // scaled spend a winner absorbs, as a multiple of its test spend
const FATIGUE_DELTA = 0.3; // ROAS advantage of a fresh winner over the fatigued spend it replaces

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

const PRESETS = [
  { label: "~$50k/mo account", launched: 20, perCreative: 300 },
  { label: "~$250k/mo", launched: 40, perCreative: 1_000 },
  { label: "~$1M/mo", launched: 80, perCreative: 2_500 },
  { label: "$3M+/mo", launched: 150, perCreative: 4_000 },
];

export function CreativeWasteDiagnostic() {
  const [launched, setLaunched] = useState(40);
  const [perCreative, setPerCreative] = useState(500);
  const [hitRatePct, setHitRatePct] = useState(20);
  const [winnerRoas, setWinnerRoas] = useState(3);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const h = hitRatePct / 100;
  const testingBudget = launched * perCreative;
  const losersPerMonth = launched * (1 - h);
  const winnersPerMonth = launched * h;
  const wasteMonthly = losersPerMonth * perCreative;
  const costPerWinner = h > 0 ? perCreative / h : 0;

  const improvedH = Math.min(h + 0.1, 0.95);
  const extraWinners = launched * (improvedH - h);
  const scaledSpendPerWinner = perCreative * SCALE_MULTIPLE;
  const revenueValue = extraWinners * scaledSpendPerWinner * winnerRoas * FATIGUE_DELTA;
  const testSavings = testingBudget * (1 - h / improvedH);
  const totalHitRateValue = revenueValue + testSavings;

  const applyPreset = (i: number) => {
    setActivePreset(i);
    setLaunched(PRESETS[i].launched);
    setPerCreative(PRESETS[i].perCreative);
  };

  return (
    <div className="rounded-3xl border border-pb-border bg-pb-muted/40 p-6 md:p-8">
      <div className="mb-7">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-pb-fg-muted mb-2.5">
          Start from your account size
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(i)}
              className={`h-9 px-4 rounded-full text-[12.5px] font-semibold border transition-all ${
                activePreset === i
                  ? "pb-gradient-peach text-white border-transparent shadow-[0_4px_12px_rgba(242,119,73,0.3)]"
                  : "border-pb-border bg-pb-card text-pb-fg hover:shadow-pb-soft"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="text-[11.5px] text-pb-fg-muted mt-2">
          Presets set typical launches and test budgets for the account size; fine-tune below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        <div className="space-y-6">
          <Field
            label="New creatives launched per month"
            hint="A team testing daily typically launches 30 to 60; large accounts run hundreds."
            value={launched}
            onChange={(v) => {
              setActivePreset(null);
              setLaunched(v);
            }}
            min={4}
            max={400}
            step={2}
          />
          <Field
            label="Test spend per creative"
            hint="What each new creative spends before you call winner or loser. Bigger accounts test bigger."
            value={perCreative}
            onChange={(v) => {
              setActivePreset(null);
              setPerCreative(v);
            }}
            min={100}
            max={10_000}
            step={100}
            prefix="$"
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
          <p className="text-[12px] leading-relaxed text-pb-fg-muted">
            That is a testing budget of{" "}
            <span className="font-medium text-pb-fg tnum">{usd(testingBudget)}/mo</span>. Most
            high-volume teams run testing at 10 to 30 percent of total spend.
          </p>
        </div>

        <div className="space-y-4">
          <Result
            label="Spend going to losing creatives"
            value={`${usd(wasteMonthly)}/mo`}
            note={`${Math.round(losersPerMonth)} of your ${launched} monthly launches will not become winners at a ${hitRatePct}% hit rate, each burning its ${usd(perCreative)} test budget finding out. ${usd(wasteMonthly * 12)} a year.`}
          />
          <Result
            label="Cost per winning creative"
            value={usd(costPerWinner)}
            note={`Each of your ~${Math.max(1, Math.round(winnersPerMonth))} monthly winners carries the test spend of the losers it took to find it.`}
          />
          <Result
            label="What 10 points of hit rate is worth"
            value={`${usd(totalHitRateValue)}/mo`}
            note={`${Math.round(extraWinners)} more winners a month, each scaling to roughly ${SCALE_MULTIPLE}x its test spend. At ${winnerRoas}:1 winner ROAS against the fatigued spend it replaces, that is ${usd(revenueValue)}/mo in incremental revenue, plus ${usd(testSavings)}/mo saved in testing. ${usd(totalHitRateValue * 12)} a year.`}
          />
        </div>
      </div>
    </div>
  );
}
