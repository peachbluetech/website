// Web analytics for the marketing site. Cookieless: nothing is stored in the
// visitor's browser and no person profiles are created, so no consent banner
// is needed. No-ops until the project token is set.
//
// The library is fetched and started only after the page has loaded and the
// browser is idle, so it never competes with the first screen for the network
// or the main thread. The first pageview is still recorded when it starts.
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

function start() {
  if (!token) return;
  import("posthog-js").then(({ default: posthog }) => {
    posthog.init(token, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      defaults: "2026-05-30",
      cookieless_mode: "always",
      person_profiles: "never",
    });
  });
}

function whenIdle(run: () => void) {
  if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 1500);
}

if (token && typeof window !== "undefined") {
  if (document.readyState === "complete") whenIdle(start);
  else window.addEventListener("load", () => whenIdle(start), { once: true });
}
