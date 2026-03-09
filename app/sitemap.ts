import { MetadataRoute } from "next";

/**
 * Dynamic Sitemap Generation
 *
 * This generates a sitemap.xml at /sitemap.xml
 * Update the BASE_URL to your production domain
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages - update these based on your actual pages
  const staticPages = [
    "",
    "/demo",
    "/demo/about",
    "/demo/services",
    "/demo/portfolio",
    "/demo/blog",
    "/demo/team",
    "/demo/pricing",
    "/demo/contact",
    "/demo/privacy",
    "/demo/terms",
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" || route === "/demo" ? 1 : 0.8,
  }));

  // For dynamic content (blog posts, portfolio items), you would fetch from CMS/DB:
  // const posts = await fetchBlogPosts();
  // const dynamicRoutes = posts.map((post) => ({
  //   url: `${BASE_URL}/demo/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: "monthly" as const,
  //   priority: 0.6,
  // }));

  return [...staticRoutes];
}
