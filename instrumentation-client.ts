// Web analytics for the marketing site. Cookieless: nothing is stored in the
// visitor's browser and no person profiles are created, so no consent banner
// is needed. No-ops until the project token is set.
//
// The library is fetched and started only after the page has loaded and the
// browser is idle, so it never competes with the first screen for the network
// or the main thread. The first pageview is still recorded when it starts.
//
// Events go to the site's own origin (ANALYTICS_RELAY, relayed to PostHog by
// the rewrites in next.config.ts), so ad blockers do not drop them.
import type { PostHog } from "posthog-js";
import { ANALYTICS_RELAY, APP_URL } from "@/lib/site";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
let analytics: PostHog | undefined;

function start() {
  if (!token) return;
  import("posthog-js").then(({ default: posthog }) => {
    posthog.init(token, {
      api_host: ANALYTICS_RELAY,
      ui_host: "https://us.posthog.com",
      defaults: "2026-05-30",
      cookieless_mode: "always",
      person_profiles: "never",
    });
    analytics = posthog;
  });
}

function whenIdle(run: () => void) {
  if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 1500);
}

// Where this visit came from, read once when the site loads in a tab: the
// page it landed on, the site that sent it and the campaign tags in the
// landing URL (ChatGPT adds utm_source=chatgpt.com to its links). Kept in
// memory only, so it lasts through the site's own navigation and is gone
// after a reload or a link that loads a fresh page.
const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

function landingSource(): Record<string, string> {
  const site = (host: string) => host.replace(/^www\./, "");
  let from = "";
  try {
    from = document.referrer ? site(new URL(document.referrer).hostname) : "";
  } catch {}
  // Sent here by another page of this site that loaded fresh: the visit
  // began on a page this one knows nothing about, so there is nothing true
  // to pass on.
  if (from === site(location.hostname)) return {};
  const source: Record<string, string> = { landing: location.pathname.slice(0, 200) };
  if (from) source.referrer = from.slice(0, 100);
  const params = new URLSearchParams(location.search);
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key);
    if (value) source[key] = value.slice(0, 100);
  }
  return source;
}

// Signup links (lib/site.ts signupHref) carry the visit's source to the app,
// so a trial can be traced to the page and the site it came from, and each
// one followed is recorded as signup_clicked. The source is added just
// before the link is followed: on pointerdown (mouse, touch, a middle or
// right click for a new tab) and on click (the keyboard). Tags the link
// already has are kept.
const SIGNUP = `${APP_URL}/auth/signup`;

function onSignupLink(source: Record<string, string>, event: Event) {
  const link = event.target instanceof Element ? event.target.closest("a") : null;
  if (!link || !link.href.startsWith(SIGNUP)) return;
  const url = new URL(link.href);
  for (const [key, value] of Object.entries(source)) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  link.href = url.toString();

  const followed = event.type === "click" || (event.type === "auxclick" && (event as MouseEvent).button === 1);
  if (!followed || !analytics) return;
  // Sent at once, not batched: the page is about to go to the app.
  analytics.capture(
    "signup_clicked",
    {
      plan: url.searchParams.get("plan"),
      billing: url.searchParams.get("billing"),
      cta: link.textContent?.trim().slice(0, 80),
      ...source,
    },
    { send_instantly: true },
  );
}

if (typeof window !== "undefined") {
  const source = landingSource();
  for (const type of ["pointerdown", "click", "auxclick"]) {
    document.addEventListener(type, (event) => onSignupLink(source, event), true);
  }

  if (token) {
    if (document.readyState === "complete") whenIdle(start);
    else window.addEventListener("load", () => whenIdle(start), { once: true });
  }
}
