import { PrimaryLink } from "@/components/site/Button";
import { RISK_REVERSAL, SALES_HREF, TRIAL_HREF, TRIAL_LABEL } from "@/lib/site";

/**
 * End-of-post CTA card. All copy and targets come from lib/site.ts so the
 * self-serve gate flips blog CTAs together with the rest of the site.
 * `agency` adds the secondary agency-demo link for DSP/agency posts.
 */
export function TrialCta({ agency = false }: { agency?: boolean }) {
  return (
    <aside className="mt-14 rounded-[10px] border border-pb-border bg-pb-card p-6 md:p-8">
      <div>
        <div className="text-[13px] font-semibold text-pb-peach-700 mb-2">
          Peachblue
        </div>
        <p className="font-display text-[22px] md:text-[24px] font-medium tracking-[-0.015em] text-pb-ink mb-2">
          Know what ads work and why.
        </p>
        <p className="text-[15px] text-pb-fg-secondary leading-relaxed mb-5 max-w-[480px]">
          AI creative analysis across Meta, TikTok, Google Ads, and Amazon DSP.
          Your creatives, scored and explained.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryLink href={TRIAL_HREF}>{TRIAL_LABEL}</PrimaryLink>
          {agency && (
            <a
              href={SALES_HREF}
              className="text-[14px] rounded-sm font-semibold text-pb-fg underline underline-offset-4 decoration-pb-border-control hover:text-pb-peach-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-peach-500 focus-visible:ring-offset-2"
            >
              Talk to us about agency plans
            </a>
          )}
        </div>
        <p className="mt-4 text-[12.5px] text-pb-fg-muted">{RISK_REVERSAL}</p>
      </div>
    </aside>
  );
}
