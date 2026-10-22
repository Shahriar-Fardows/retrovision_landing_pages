import type { MetadataRoute } from "next";

// Absolute URLs need the production domain; without it the sitemap stays empty
// rather than advertising localhost.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl ? [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }] : [];
}
