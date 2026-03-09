# SEO Setup Guide (2026 Best Practices)

This kit includes everything for perfect technical SEO. Here's what's included and how to configure it.

---

## What's Already Set Up

✅ **Dynamic sitemap** (`/sitemap.xml`) - Auto-generated from your pages
✅ **Robots.txt** (`/robots.txt`) - Configured for optimal crawling
✅ **JSON-LD Schemas** - Structured data components for rich results
✅ **Metadata API** - Full OpenGraph and Twitter cards
✅ **Core Web Vitals** - Optimized fonts, images, and rendering

---

## Quick Configuration

### 1. Set Your Domain

Create `.env.local`:
```bash
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 2. (Optional) Add OG Image

For social media previews, create a 1200×630px image and save as `public/og-image.jpg`, then add it to your metadata.

### 3. Update Site Info

Edit `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: {
    default: "Your Company Name",
    template: "%s | Your Company Name",
  },
  description: "Your company description...",
  // ...
};
```

---

## Page-Level Metadata

### Static Pages

```tsx
// app/demo/about/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our company, mission, and team.",
  openGraph: {
    title: "About Us | Your Company",
    description: "Learn about our company, mission, and team.",
  },
};

export default function AboutPage() {
  // ...
}
```

### Dynamic Pages (Blog, Products)

```tsx
// app/demo/blog/[slug]/page.tsx
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch post data
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [post.image],
    },
  };
}
```

---

## JSON-LD Structured Data

Import from `@/components/seo/JsonLd`:

### Organization (Homepage)

```tsx
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <OrganizationSchema
        name="Your Company"
        description="What your company does"
        url="https://yourdomain.com"
        logo="https://yourdomain.com/logo.png"
        sameAs={[
          "https://linkedin.com/company/yourcompany",
          "https://instagram.com/yourcompany",
        ]}
        contactPoint={{
          telephone: "+1-555-123-4567",
          email: "hello@yourdomain.com",
        }}
        address={{
          streetAddress: "123 Main St",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94102",
          addressCountry: "US",
        }}
      />
      <WebsiteSchema
        name="Your Company"
        url="https://yourdomain.com"
        description="Your company description"
      />
      {/* Page content */}
    </>
  );
}
```

### Local Business (Contact Page)

```tsx
import { LocalBusinessSchema } from "@/components/seo/JsonLd";

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema
        name="Your Company"
        description="Professional services in San Francisco"
        url="https://yourdomain.com"
        telephone="+1-555-123-4567"
        email="hello@yourdomain.com"
        priceRange="$$"
        address={{
          streetAddress: "123 Main St",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94102",
          addressCountry: "US",
        }}
        geo={{
          latitude: 37.7749,
          longitude: -122.4194,
        }}
        openingHours={["Mo-Fr 09:00-17:00"]}
      />
      {/* Page content */}
    </>
  );
}
```

### Blog Article

```tsx
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function BlogPost({ post }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://yourdomain.com" },
          { name: "Blog", url: "https://yourdomain.com/blog" },
          { name: post.title, url: `https://yourdomain.com/blog/${post.slug}` },
        ]}
      />
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        image={post.image}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        author={{ name: post.author, url: post.authorUrl }}
        publisher={{ name: "Your Company", logo: "https://yourdomain.com/logo.png" }}
        url={`https://yourdomain.com/blog/${post.slug}`}
      />
      {/* Post content */}
    </>
  );
}
```

### FAQ Section

```tsx
import { FAQSchema } from "@/components/seo/JsonLd";

const faqs = [
  { question: "What services do you offer?", answer: "We offer..." },
  { question: "How much does it cost?", answer: "Our pricing starts at..." },
];

export default function FAQPage() {
  return (
    <>
      <FAQSchema items={faqs} />
      {/* FAQ content */}
    </>
  );
}
```

### Services

```tsx
import { ServiceSchema } from "@/components/seo/JsonLd";

export default function ServicesPage() {
  return (
    <>
      <ServiceSchema
        name="Web Design"
        description="Custom website design for businesses"
        provider={{ name: "Your Company", url: "https://yourdomain.com" }}
        serviceType="Web Design"
        areaServed={["United States", "Canada"]}
      />
      {/* Services content */}
    </>
  );
}
```

---

## Available Schema Components

| Component | Use For |
|-----------|---------|
| `OrganizationSchema` | Company info on homepage |
| `LocalBusinessSchema` | Physical location + contact |
| `WebsiteSchema` | Site-wide search action |
| `ArticleSchema` | Blog posts, news articles |
| `ServiceSchema` | Individual services |
| `FAQSchema` | FAQ sections |
| `BreadcrumbSchema` | Navigation breadcrumbs |
| `ProductSchema` | E-commerce products |
| `PersonSchema` | Team member pages |

---

## Core Web Vitals Optimization

Already implemented:

1. **Fonts**: Using `next/font` with `display: swap` - prevents layout shift
2. **Images**: Use `next/image` with `priority` for above-fold content
3. **Rendering**: Server Components by default - instant HTML delivery

### Image Best Practices

```tsx
import Image from "next/image";

// Hero image - add priority for LCP
<Image
  src="/hero.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  priority // Loads immediately
  className="object-cover"
/>

// Below-fold images - lazy load (default)
<Image
  src="/gallery.jpg"
  alt="Gallery item"
  width={600}
  height={400}
  // No priority = lazy loaded
/>
```

---

## Sitemap Configuration

Edit `app/sitemap.ts` to add dynamic pages:

```tsx
export default async function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [/* ... */];

  // Add dynamic pages from your CMS/database
  const posts = await fetchBlogPosts();
  const postRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
```

---

## Testing Your SEO

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Validator**: https://validator.schema.org/
3. **OpenGraph Debugger**: https://developers.facebook.com/tools/debug/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
5. **PageSpeed Insights**: https://pagespeed.web.dev/

---

## SEO Checklist

Before launch:

- [ ] Set `NEXT_PUBLIC_BASE_URL` in production
- [ ] Update metadata in `app/layout.tsx`
- [ ] Add page-specific metadata to each page
- [ ] Add JSON-LD schema to key pages (home, contact, services)
- [ ] Test with Google Rich Results Test
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Core Web Vitals pass in PageSpeed Insights
- [ ] (Optional) Add `og-image.jpg` (1200×630px) for social previews

---

## Further Reading

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Full Reference](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
