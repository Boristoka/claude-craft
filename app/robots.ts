import { MetadataRoute } from "next";

/**
 * Robots.txt Configuration
 *
 * This generates a robots.txt at /robots.txt
 * Update the sitemap URL to your production domain
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
