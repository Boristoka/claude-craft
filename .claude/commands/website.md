# /website - Build Your Website

You are building a website by modifying existing demo files. Follow these steps EXACTLY.

---

## STEP 1: Industry Selection

Send this EXACT message:

```
🚀 **Let's build your website!**

**Which type of website are you building?**

1. 🖥️ **SaaS** — Software product, app, or tech startup
2. 🍽️ **Restaurant** — Restaurant, café, bakery, or food business
3. 🎨 **Agency** — Creative, digital, or marketing agency
4. 👤 **Portfolio** — Personal portfolio or freelancer
5. 🛍️ **E-commerce** — Online store or product brand
6. 📋 **Other** — I'll describe my business

**Reply with a number (1-6)**
```

Wait for their response.

---

## STEP 2: Collect Business Info

Based on their choice, send the appropriate follow-up:

**For options 1-5:**
```
Great choice! Now tell me about your business:

1. **Name:** Your business/brand name
2. **What you do:** One sentence description
3. **Location:** City or "Remote/Online"
4. **Key differentiator:** What makes you special?

**Example:** "FlowMetrics, project management SaaS that uses AI to predict deadlines, San Francisco, founded by ex-Google engineers"
```

**For option 6 (Other):**
```
Tell me about your business:

1. **Name:** Your business name
2. **Industry:** What type of business
3. **What you do:** One sentence description
4. **Location:** City or region
5. **Services/Products:** 3-4 main offerings

**Example:** "HealthFirst Clinic, medical practice, family healthcare services in Rotterdam, Services: General Practice, Pediatrics, Preventive Care"
```

Wait for their response. Do NOT ask follow-up questions.

---

## STEP 3: Load Template & Build

After they respond, say:
```
**Building your website now...** ⏳
```

### Load the appropriate template:

Based on their industry choice, read the corresponding template file:

- **SaaS (1):** Read `.claude/templates/saas.md`
- **Restaurant (2):** Read `.claude/templates/restaurant.md`
- **Agency (3):** Read `.claude/templates/agency.md`
- **Portfolio (4):** Read `.claude/templates/portfolio.md`
- **E-commerce (5):** Read `.claude/templates/ecommerce.md`
- **Other (6):** Use the generic instructions below

Use the template content as your guide for:
- Copy/messaging style
- Section structure
- Photo URLs
- Navigation items
- Stats and testimonials

**IMPORTANT:** Replace all placeholder text with the user's actual business info. Combine template content with their specific details.

---

## INDUSTRY-SPECIFIC COMPONENTS

Based on the industry, import and use these components on the homepage:

### SaaS (1)
```tsx
import { FeatureGrid, FeatureIcons } from "@/components/ui/FeatureGrid";
import { LogoCloud } from "@/components/ui/LogoCloud";
import { TestimonialGrid } from "@/components/ui/TestimonialCard";

// Use on homepage:
// - FeatureGrid with icons for features section (replace services)
// - LogoCloud for "Trusted by" section
// - TestimonialGrid for social proof
// - Link to /demo/pricing prominently
```

### Restaurant (2)
```tsx
import { MenuSection, OpeningHours, ReservationCTA } from "@/components/ui/MenuSection";
import { Map } from "@/components/ui/Map";
import { TestimonialGrid } from "@/components/ui/TestimonialCard";

// Use on homepage:
// - MenuSection for menu highlights (replace services)
// - OpeningHours block
// - ReservationCTA for booking
// - Map with restaurant location
// - TestimonialGrid for reviews
```

### Agency (3)
```tsx
import { LogoCloud } from "@/components/ui/LogoCloud";
import { ProcessSteps } from "@/components/ui/Timeline";
import { TestimonialGrid } from "@/components/ui/TestimonialCard";
import { Marquee } from "@/components/ui/Marquee";

// Use on homepage:
// - LogoCloud or Marquee for client logos
// - ProcessSteps for "How we work" section
// - TestimonialGrid for client testimonials
// - Keep services section with portfolio link
```

### Portfolio (4)
```tsx
import { Timeline, ProcessSteps } from "@/components/ui/Timeline";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { TestimonialGrid } from "@/components/ui/TestimonialCard";
import { AvailabilityBadge } from "@/components/ui/NewsletterSignup";

// Use on homepage:
// - AvailabilityBadge in hero
// - FeatureGrid for services/skills
// - Timeline on about page for experience
// - ProcessSteps for "How I work"
// - TestimonialGrid for client reviews
```

### E-commerce (5)
```tsx
import { ProductCard, ProductGrid, CollectionCard } from "@/components/ui/ProductCard";
import { TrustBadges, TrustIcons } from "@/components/ui/LogoCloud";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { TestimonialGrid } from "@/components/ui/TestimonialCard";

// Use on homepage:
// - TrustBadges row (shipping, returns, secure)
// - ProductGrid for featured products or CollectionCard for categories
// - TestimonialGrid for customer reviews
// - NewsletterSignup for email capture
```

---

## EDITING INSTRUCTIONS

### File 1: `app/demo/layout.tsx`

**Read the file first**, then make these edits:

**Edit 1a - Navigation items:**
Find the `demoNavItems` array and replace it based on the template's recommended navigation.

**Edit 1b - Logo initials:**
Find `<span className="text-white font-semibold text-sm">` and change to their business initials.

**Edit 1c - Company name:**
Find `Acme Studio` in the header and replace with their business name.

**Edit 1d - Footer:**
Update the `<Footer` component:
- `companyName` → their name
- `description` → their tagline/description
- `sections` array → their contact info
- Update email, phone, location

---

### File 2: `app/demo/page.tsx` (Homepage)

**Read the file first**, then make these edits:

**Edit 2a - Hero badge:**
Change `<Badge>` text to match template style (e.g., "Trusted by 10,000+ teams" for SaaS, "Est. 1998" for Restaurant).

**Edit 2b - Hero headline:**
Change the `<h1>` text. Keep the `<em className="italic">` pattern for emphasis.

**Edit 2c - Hero subline:**
Change the paragraph after h1 to their value proposition.

**Edit 2d - Hero image:**
Change `<img src="..."` to the appropriate template photo URL.

**Edit 2e - Services array:**
Replace `const services = [...]` with their services, using template structure and photo URLs.

**Edit 2f - Stats:**
Replace `const stats = [...]` with template-appropriate stats, customized with realistic numbers.

**Edit 2g - Testimonials:**
Replace `const testimonials = [...]` with template testimonials, updating names/companies to fit their locale.

---

### File 3: `app/demo/about/page.tsx`

**Edit 3a - Hero headline:** e.g., "Over [Business Name]" or "Our Story"
**Edit 3b - Story section:** Use template story structure with their details
**Edit 3c - Values:** Use template values or customize
**Edit 3d - Photos:** Industry-appropriate images from template

---

### File 4: `app/demo/services/page.tsx`

**Edit 4a - Page title:** Match industry (e.g., "Menu" for restaurant, "Features" for SaaS)
**Edit 4b - Services list:** Their actual services with template descriptions as inspiration
**Edit 4c - Photos:** Industry-appropriate images

---

### File 5: `app/demo/contact/page.tsx`

**Edit 5a - Contact info:** Their email, phone, address
**Edit 5b - FAQ:** Use template FAQs customized to their business
**Edit 5c - LocalBusinessSchema:** Update structured data
**Edit 5d - Map coordinates:** Use Google Maps to find their city's lat/long

```tsx
<Map
  latitude={52.3676}   // Their city
  longitude={4.9041}
  zoom={14}
  marker={{
    title: "BUSINESS_NAME",
    popup: "ADDRESS",
  }}
/>
```

---

### File 6: `app/demo/pricing/page.tsx` (if applicable)

For SaaS, Agency, Portfolio, or E-commerce, update pricing:
- Plan names and descriptions
- Price points (realistic for their industry)
- Feature lists
- Popular plan indicator

---

## CITY COORDINATES (Common)

```
Amsterdam: 52.3676, 4.9041
Rotterdam: 51.9244, 4.4777
Utrecht: 52.0907, 5.1214
Den Haag: 52.0705, 4.3007
London: 51.5074, -0.1278
Paris: 48.8566, 2.3522
Berlin: 52.5200, 13.4050
New York: 40.7128, -74.0060
San Francisco: 37.7749, -122.4194
Los Angeles: 34.0522, -118.2437
```

---

## STEP 4: Completion Message

After ALL edits are done, send:

```
✅ **Your website is ready!**

I've built a complete [INDUSTRY] website with:
- ✓ Homepage (hero, features, testimonials, stats)
- ✓ About page (story, values)
- ✓ Services/[RELEVANT] page
- ✓ Contact page (info, FAQ, map)
[+ any other pages]

🌐 **View it:** http://localhost:3000/demo

**Want changes?** Just ask:
- "Change the headline to..."
- "Use different photos"
- "Add more testimonials"
- "Make the colors warmer"
```

---

## CRITICAL RULES

1. **Read before edit** - Always read a file before editing
2. **Use Edit tool** - Never rewrite entire files, use targeted edits
3. **Follow template** - Use template content as your guide
4. **Customize everything** - Replace ALL placeholders with real content
5. **No lorem ipsum** - Write real, believable content
6. **Consistent naming** - Use same business name everywhere
7. **Match locale** - Dutch business = Dutch names in testimonials
8. **One question round** - Never ask follow-up questions after step 2

---

## IF SOMETHING FAILS

If an edit fails:
1. Read the file again to see current state
2. Try a smaller, more specific edit
3. Continue with other files
4. Report any issues at the end
