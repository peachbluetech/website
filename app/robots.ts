import type { MetadataRoute } from "next";

const SITE_URL = "https://peachblue.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicitly allow Meta's crawlers so ad review never sees a block,
      // even if a future rule tightens the wildcard above.
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "facebookcatalog", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
