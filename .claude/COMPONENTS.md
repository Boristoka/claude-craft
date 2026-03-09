# Component Library Reference

This UI kit includes 45+ components. Before building a website, review this guide to choose the right components for the business type.

---

## Displaying Products, Services, or Offerings

### MenuSection
**Best for:** Restaurants, cafés, bakeries, food businesses
```tsx
import { MenuSection, OpeningHours, ReservationCTA } from "@/components/ui/MenuSection";
```
- Displays menu items with prices, descriptions, and tags (Popular, Spicy, Vegetarian, New)
- Multiple variants: `default`, `cards`, `elegant`, `grid`, `spotlight`
- Includes hover effects and optional images
- **Use instead of generic services grid for any food business**

### ProductGrid / ProductCard
**Best for:** E-commerce, online stores, product brands
```tsx
import { ProductCard, ProductGrid, CollectionCard } from "@/components/ui/ProductCard";
```
- Product cards with images, prices, and add-to-cart
- Collection cards for product categories
- Grid layouts for product listings

### FeatureGrid
**Best for:** SaaS, tech startups, software products
```tsx
import { FeatureGrid, FeatureIcons } from "@/components/ui/FeatureGrid";
```
- Features with icons in a grid layout
- Great for "Why choose us" or "Features" sections
- Clean, modern look for tech products

### PricingTable
**Best for:** SaaS, agencies, subscription services
```tsx
import { PricingTable } from "@/components/ui/PricingTable";
```
- Compare pricing plans side by side
- Highlight recommended/popular plan
- Feature comparison lists

---

## Location & Contact

### Map
**Best for:** Any local business (restaurants, stores, clinics, offices)
```tsx
import { Map } from "@/components/ui/Map";
```
- Interactive OpenStreetMap (no API key needed)
- Custom markers with popups
- **Essential for any business with a physical location**

### OpeningHours
**Best for:** Restaurants, retail, clinics, any business with hours
```tsx
import { OpeningHours } from "@/components/ui/MenuSection";
```
- Displays business hours by day
- Shows "Open Now" indicator with pulsing badge
- Variants: `default`, `compact`, `card`

### ReservationCTA
**Best for:** Restaurants, salons, clinics, appointment-based businesses
```tsx
import { ReservationCTA } from "@/components/ui/MenuSection";
```
- Dark call-to-action block for bookings
- Phone + online booking buttons
- Spotlight hover effect

---

## Social Proof & Trust

### TestimonialGrid / TestimonialCarousel
**Best for:** All business types
```tsx
import { TestimonialGrid, TestimonialCarousel } from "@/components/ui/TestimonialCard";
```
- Customer reviews with avatars and ratings
- Grid layout or auto-scrolling carousel
- Works for any industry

### LogoCloud
**Best for:** Agencies, SaaS, B2B businesses
```tsx
import { LogoCloud } from "@/components/ui/LogoCloud";
```
- "Trusted by" client logo section
- Clean grid of company logos
- Builds credibility for B2B

### TrustBadges
**Best for:** E-commerce, online stores
```tsx
import { TrustBadges, TrustIcons } from "@/components/ui/LogoCloud";
```
- Shipping, returns, secure payment badges
- Icons for free shipping, money-back guarantee, etc.
- Builds trust for online purchases

### Marquee
**Best for:** Agencies, portfolios with many clients
```tsx
import { Marquee } from "@/components/ui/Marquee";
```
- Auto-scrolling horizontal content
- Great for client logos, testimonials, or press mentions

---

## Process & Experience

### Timeline
**Best for:** Portfolios, about pages, company history
```tsx
import { Timeline } from "@/components/ui/Timeline";
```
- Vertical timeline with dates and descriptions
- Great for work experience or company milestones

### ProcessSteps
**Best for:** Agencies, service businesses, "how it works"
```tsx
import { ProcessSteps } from "@/components/ui/Timeline";
```
- Numbered steps showing your process
- "How we work" or "Our approach" sections

---

## Engagement & Conversion

### NewsletterSignup
**Best for:** E-commerce, blogs, content businesses
```tsx
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
```
- Email capture form
- Clean design with submit button

### AvailabilityBadge
**Best for:** Freelancers, consultants, portfolios
```tsx
import { AvailabilityBadge } from "@/components/ui/NewsletterSignup";
```
- "Available for work" indicator
- Place in hero section

---

## Visual Elements

### BentoGrid
**Best for:** Modern landing pages, feature showcases
```tsx
import { BentoGrid } from "@/components/ui/BentoGrid";
```
- Asymmetric grid layout (Apple-style)
- Mix of large and small cards

### SpotlightCard
**Best for:** Featured content, hover effects
```tsx
import { SpotlightCard } from "@/components/ui/SpotlightCard";
```
- Card with cursor-following spotlight effect
- Premium feel for important content

### ImageGallery
**Best for:** Portfolios, restaurants, real estate
```tsx
import { ImageGallery } from "@/components/ui/ImageGallery";
```
- Grid of images with lightbox
- Great for showcasing work or spaces

### ProjectCard / BlogCard / TeamCard
**Best for:** Portfolios, blogs, team pages
```tsx
import { ProjectCard } from "@/components/ui/ProjectCard";
import { BlogCard } from "@/components/ui/BlogCard";
import { TeamCard } from "@/components/ui/TeamCard";
```
- Specialized cards for different content types

---

## Component Selection by Industry

Use this as a starting point, but think about what THIS specific business needs:

| Industry | Primary Components | Consider Adding |
|----------|-------------------|-----------------|
| **Restaurant** | MenuSection, OpeningHours, ReservationCTA, Map | ImageGallery, TestimonialGrid |
| **SaaS** | FeatureGrid, PricingTable, LogoCloud | TestimonialCarousel, ProcessSteps |
| **Agency** | ProcessSteps, LogoCloud, ProjectCard | Marquee, TestimonialGrid, Timeline |
| **Portfolio** | AvailabilityBadge, Timeline, ProjectCard | TestimonialGrid, ProcessSteps |
| **E-commerce** | ProductGrid, TrustBadges, NewsletterSignup | TestimonialGrid, Marquee |
| **Clinic/Medical** | OpeningHours, Map, ProcessSteps | TestimonialGrid, TeamCard |
| **Salon/Spa** | MenuSection (for services), ReservationCTA | ImageGallery, TestimonialGrid |

---

## Key Principle

**Don't just edit text in the demo template. Choose components that match the business.**

A restaurant website should feel different from a SaaS website. The component library exists so you can build unique, appropriate experiences for each business type.
