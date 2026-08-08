/**
 * Shared site config — single source of truth for the self-serve gate and
 * every cross-page CTA target.
 *
 * Self-serve signup is dark until the app-side Stripe launch ships. Until
 * NEXT_PUBLIC_SELF_SERVE_LIVE=1 is set (Vercel env + redeploy), every trial
 * CTA routes to the /demo page instead of app signup.
 */

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.peachblue.io";
export const SELF_SERVE = process.env.NEXT_PUBLIC_SELF_SERVE_LIVE === "1";

export const DEMO_HREF = "/demo";
export const SALES_HREF = "/demo?intent=agency";

export const TRIAL_LABEL = SELF_SERVE ? "Start 7-day trial" : "Get early access";
export const NAV_CTA_LABEL = SELF_SERVE ? "Start free trial" : "Get early access";

export const RISK_REVERSAL = SELF_SERVE
  ? "7-day trial · From $79/mo · Cancel anytime"
  : "From $79/mo · Cancel anytime";

export function signupHref(planId: string, billing: "monthly" | "annual"): string {
  if (!SELF_SERVE) return DEMO_HREF;
  return `${APP_URL}/auth/signup?plan=${planId}&billing=${billing}`;
}

export const TRIAL_HREF = signupHref("pro", "monthly");
export const STARTER_HREF = signupHref("starter", "monthly");
export const PRO_HREF = signupHref("pro", "monthly");
