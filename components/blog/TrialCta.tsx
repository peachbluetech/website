import { RISK_REVERSAL, SALES_HREF, TRIAL_HREF, TRIAL_LABEL } from "@/lib/site";

/**
 * End-of-post CTA card. All copy and targets come from lib/site.ts so the
 * self-serve gate flips blog CTAs together with the rest of the site.
 * `agency` adds the secondary agency-demo link for DSP/agency posts.
 */
export function TrialCta({ agency = false }: { agency?: boolean }) {
  return (
    <aside className="mt-14 rounded-3xl border border-pb-border bg-pb-card shadow-pb-soft p-7 md:p-9 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 100% 0%, rgba(255,210,187,0.5) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-2">
          Peachblue
        </div>
        <p className="font-display text-[22px] md:text-[24px] font-medium tracking-[-0.015em] text-pb-fg mb-2">
          Know what ads work <span className="italic">and why.</span>
        </p>
        <p className="text-[14.5px] text-pb-fg-muted leading-relaxed mb-5 max-w-[480px]">
          AI creative analysis across Meta, TikTok, Google Ads, and Amazon DSP.
          Your creatives, scored and explained.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={TRIAL_HREF}
            className="inline-flex items-center h-10 px-6 rounded-full pb-gradient-peach text-white text-[13.5px] font-semibold shadow-[0_4px_16px_rgba(242,119,73,0.35)] hover:brightness-105 transition"
          >
            {TRIAL_LABEL}
          </a>
          {agency && (
            <a
              href={SALES_HREF}
              className="text-[13.5px] font-medium text-pb-fg underline underline-offset-4 decoration-pb-border hover:decoration-pb-fg transition"
            >
              Talk to us about agency plans
            </a>
          )}
        </div>
        <p className="mt-3 text-[12px] text-pb-fg-muted">{RISK_REVERSAL}</p>
      </div>
    </aside>
  );
}
