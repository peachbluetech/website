import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { ANALYTICS_RELAY } from "./lib/site";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // PostHog's endpoints end in a slash (/i/v0/e/). Next's own trailing
  // slash redirect would bounce every relayed request once, so it is off
  // and the redirect below does the same job for every other URL.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: `/:path((?!${ANALYTICS_RELAY.slice(1)}/).+)/`,
        destination: "/:path",
        permanent: true,
      },
    ];
  },
  // Web analytics go through the site's own origin, so ad blockers that
  // drop requests to PostHog's hosts let them through. The script and
  // config files come from the assets host; those two rules must come
  // before the catch-all.
  async rewrites() {
    return [
      { source: `${ANALYTICS_RELAY}/static/:path*`, destination: "https://us-assets.i.posthog.com/static/:path*" },
      { source: `${ANALYTICS_RELAY}/array/:path*`, destination: "https://us-assets.i.posthog.com/array/:path*" },
      { source: `${ANALYTICS_RELAY}/:path*`, destination: "https://us.i.posthog.com/:path*" },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
