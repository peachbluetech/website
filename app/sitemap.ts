import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { publishedArticles } from "@/lib/blog";
import { publishedDocs } from "@/lib/docs";
import { INTEGRATION_PAGES } from "@/content/integrations/manifest";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/demo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tools/creative-waste`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const postEntries: MetadataRoute.Sitemap = publishedArticles().map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: new Date(`${a.dateUpdated ?? a.datePublished}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const docEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/docs`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...publishedDocs().map((d) => ({
      url: `${SITE_URL}/docs/${d.slug}`,
      lastModified: new Date(`${d.updated}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const integrationEntries: MetadataRoute.Sitemap = INTEGRATION_PAGES.map((p) => ({
    url: `${SITE_URL}/integrations/${p.slug}`,
    lastModified: new Date(`${p.updated}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...postEntries, ...docEntries, ...integrationEntries];
}
