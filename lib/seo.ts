import { Metadata } from "next";

/**
 * SEO Utilities for Next.js
 *
 * 2026 Best Practices:
 * - Every page needs unique title and description
 * - OpenGraph and Twitter cards for social sharing
 * - Proper canonical URLs to avoid duplicate content
 * - Dynamic metadata via generateMetadata for personalized pages
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

type SeoConfig = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
};

/**
 * Generate complete metadata for a page
 *
 * @example
 * ```tsx
 * // In your page.tsx
 * export const metadata = generateMetadata({
 *   title: "About Us",
 *   description: "Learn about our company and mission",
 *   path: "/about",
 * });
 * ```
 */
export function generateSeoMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: SeoConfig): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    authors: authors?.map((name) => ({ name })),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Your Company Name", // Update this
      type: type === "article" ? "article" : "website",
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image && { images: [image] }),
      // creator: "@yourhandle", // Add your Twitter handle
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Generate metadata for blog posts
 */
export function generateArticleMetadata({
  title,
  description,
  slug,
  image,
  publishedTime,
  modifiedTime,
  author,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
}): Metadata {
  return generateSeoMetadata({
    title: `${title} | Blog`,
    description,
    path: `/blog/${slug}`,
    image,
    type: "article",
    publishedTime,
    modifiedTime,
    authors: [author],
  });
}

/**
 * Default metadata template
 * Use this as a starting point for your site
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Your Company Name",
    template: "%s | Your Company Name",
  },
  description: "Your company description here",
  keywords: ["keyword1", "keyword2", "keyword3"],
  authors: [{ name: "Your Name" }],
  creator: "Your Company",
  publisher: "Your Company",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Your Company Name",
  },
  twitter: {
    card: "summary_large_image",
    // creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};
