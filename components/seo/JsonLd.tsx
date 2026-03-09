/**
 * JSON-LD Structured Data Components
 *
 * These components add Schema.org markup for better SEO and rich results.
 * Use them in your page components to help search engines understand your content.
 *
 * 2026 Best Practices:
 * - Always validate with Google's Rich Results Test
 * - Use server-side rendering (these work in Server Components)
 * - Include only accurate, verifiable information
 * - Update structured data when content changes
 */

type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Base JSON-LD component - renders structured data as script tag
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============================================
// Organization Schema
// ============================================

type OrganizationSchemaProps = {
  name: string;
  description: string;
  url: string;
  logo?: string;
  sameAs?: string[]; // Social media links
  contactPoint?: {
    telephone: string;
    email?: string;
    contactType?: string;
  };
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
};

export function OrganizationSchema({
  name,
  description,
  url,
  logo,
  sameAs,
  contactPoint,
  address,
}: OrganizationSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url,
  };

  if (logo) data.logo = logo;
  if (sameAs && sameAs.length > 0) data.sameAs = sameAs;

  if (contactPoint) {
    data.contactPoint = {
      "@type": "ContactPoint",
      telephone: contactPoint.telephone,
      contactType: contactPoint.contactType || "customer service",
      ...(contactPoint.email && { email: contactPoint.email }),
    };
  }

  if (address) {
    data.address = {
      "@type": "PostalAddress",
      ...address,
    };
  }

  return <JsonLd data={data} />;
}

// ============================================
// Local Business Schema
// ============================================

type LocalBusinessSchemaProps = {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email?: string;
  image?: string;
  priceRange?: string; // e.g., "$$" or "€€€"
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[]; // e.g., ["Mo-Fr 09:00-17:00", "Sa 10:00-14:00"]
  sameAs?: string[];
};

export function LocalBusinessSchema({
  name,
  description,
  url,
  telephone,
  email,
  image,
  priceRange,
  address,
  geo,
  openingHours,
  sameAs,
}: LocalBusinessSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
  };

  if (email) data.email = email;
  if (image) data.image = image;
  if (priceRange) data.priceRange = priceRange;
  if (sameAs && sameAs.length > 0) data.sameAs = sameAs;
  if (openingHours) data.openingHoursSpecification = openingHours;

  if (geo) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    };
  }

  return <JsonLd data={data} />;
}

// ============================================
// Website Schema (with Search Action)
// ============================================

type WebsiteSchemaProps = {
  name: string;
  url: string;
  description?: string;
  searchUrl?: string; // e.g., "https://example.com/search?q={search_term_string}"
};

export function WebsiteSchema({
  name,
  url,
  description,
  searchUrl,
}: WebsiteSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  };

  if (description) data.description = description;

  if (searchUrl) {
    data.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: searchUrl,
      },
      "query-input": "required name=search_term_string",
    };
  }

  return <JsonLd data={data} />;
}

// ============================================
// Article / Blog Post Schema
// ============================================

type ArticleSchemaProps = {
  headline: string;
  description: string;
  image: string;
  datePublished: string; // ISO 8601 format
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo?: string;
  };
  url: string;
};

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
  url,
}: ArticleSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      ...(publisher.logo && {
        logo: {
          "@type": "ImageObject",
          url: publisher.logo,
        },
      }),
    },
  };

  return <JsonLd data={data} />;
}

// ============================================
// Service Schema
// ============================================

type ServiceSchemaProps = {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  serviceType?: string;
  areaServed?: string | string[];
  url?: string;
};

export function ServiceSchema({
  name,
  description,
  provider,
  serviceType,
  areaServed,
  url,
}: ServiceSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider.name,
      url: provider.url,
    },
  };

  if (serviceType) data.serviceType = serviceType;
  if (areaServed) data.areaServed = areaServed;
  if (url) data.url = url;

  return <JsonLd data={data} />;
}

// ============================================
// FAQ Schema
// ============================================

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSchemaProps = {
  items: FAQItem[];
};

export function FAQSchema({ items }: FAQSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

// ============================================
// Breadcrumb Schema
// ============================================

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

// ============================================
// Product Schema (for e-commerce)
// ============================================

type ProductSchemaProps = {
  name: string;
  description: string;
  image: string;
  sku?: string;
  brand?: string;
  price: number;
  priceCurrency: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  url: string;
  reviewCount?: number;
  ratingValue?: number;
};

export function ProductSchema({
  name,
  description,
  image,
  sku,
  brand,
  price,
  priceCurrency,
  availability = "InStock",
  url,
  reviewCount,
  ratingValue,
}: ProductSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
      availability: `https://schema.org/${availability}`,
      url,
    },
  };

  if (sku) data.sku = sku;
  if (brand) {
    data.brand = {
      "@type": "Brand",
      name: brand,
    };
  }

  if (reviewCount && ratingValue) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
    };
  }

  return <JsonLd data={data} />;
}

// ============================================
// Person Schema (for team pages)
// ============================================

type PersonSchemaProps = {
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url: string;
  };
};

export function PersonSchema({
  name,
  jobTitle,
  description,
  image,
  url,
  sameAs,
  worksFor,
}: PersonSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
  };

  if (jobTitle) data.jobTitle = jobTitle;
  if (description) data.description = description;
  if (image) data.image = image;
  if (url) data.url = url;
  if (sameAs && sameAs.length > 0) data.sameAs = sameAs;

  if (worksFor) {
    data.worksFor = {
      "@type": "Organization",
      name: worksFor.name,
      url: worksFor.url,
    };
  }

  return <JsonLd data={data} />;
}
