import posthog from "posthog-js";

// Web analytics for the marketing site. Cookieless: nothing is stored in the
// visitor's browser and no person profiles are created, so no consent banner
// is needed. No-ops until the project token is set.
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    defaults: "2026-05-30",
    cookieless_mode: "always",
    person_profiles: "never",
  });
}
