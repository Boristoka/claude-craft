---
name: website
description: Interactive wizard to build a complete website. Asks about your business and generates all pages automatically.
---

# /website - Build Your Website

You are building a website in a NEW folder based on the business name. The `/demo` folder stays intact as a reference example. Follow these steps EXACTLY.

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

## STEP 3: Create Project Folder

Based on the business name, create a URL-friendly slug:
- "Bella Italia" → `bella-italia`
- "FlowMetrics" → `flowmetrics`
- "De Haan & Partners" → `de-haan-partners`

**Create the folder structure:**
```
app/[slug]/
├── layout.tsx
├── page.tsx
├── about/page.tsx
├── services/page.tsx (or menu/, products/, features/ based on industry)
├── contact/page.tsx
└── pricing/page.tsx (if applicable)
```

**Copy `app/demo/layout.tsx` as your starting point** for the layout, then customize it.

The website will be available at `localhost:3000/[slug]`

---

## STEP 4: Component Discovery (REQUIRED)

**Before building, you MUST explore the component library and decide what to use.**

### 4a. Read the Component Reference
Read `.claude/COMPONENTS.md` to see all available specialized components.

### 4b. Choose Components for This Business
Based on the industry and business info, decide which components best fit this specific website.

**Think about:**
- What is the main thing visitors need to see? (menu, products, features, portfolio)
- What actions should visitors take? (reserve, buy, contact, subscribe)
- What builds trust? (reviews, client logos, badges, timeline)

### 4c. State Your Plan
Before editing any files, output your component plan:

```
**Component Plan for [BUSINESS_NAME]:**

Homepage sections:
- Hero with [description]
- [Component] for [purpose]
- [Component] for [purpose]
- ...

I will replace the default services grid with [Component] because [reason].
```

**IMPORTANT:** Do NOT just copy the demo template structure. Choose components that actually fit this business type.

---

## STEP 5: Load Template & Build

After stating your component plan, say:
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
- **Other (6):** Read `.claude/COMPONENTS.md` and build based on business type

Use the template for:
- Copy/messaging style and tone
- Photo URLs
- Stats and testimonials examples

**But use YOUR component plan for the structure.** The template provides content, not layout.

---

## FILE CREATION INSTRUCTIONS

**Use `app/demo/` files as reference**, but create NEW files in `app/[slug]/`.

### File 1: `app/[slug]/layout.tsx`

**Read `app/demo/layout.tsx` first** as reference, then create a new layout with:

- **Navigation items** customized for this business type:
  - Restaurant: Home, Menu, About, Gallery, Reservations
  - SaaS: Home, Features, Pricing, About, Contact
  - E-commerce: Home, Products, About, Contact
- **Logo initials** → their business initials
- **Company name** → their business name
- **Footer** with their contact info, description, etc.

**IMPORTANT:** Update all internal links to use `/[slug]/` paths:
```tsx
const navItems = [
  { label: "Home", href: "/[slug]" },
  { label: "About", href: "/[slug]/about" },
  // etc.
];
```

---

### File 2: `app/[slug]/page.tsx` (Homepage)

**Read `app/demo/page.tsx` first** as reference, then create based on YOUR COMPONENT PLAN.

Include:
- **Imports** for the components you chose in Step 4
- **Hero section** with business-specific content
- **Main content sections** using industry-appropriate components:
  - Restaurant → `<MenuSection>` with menu categories
  - SaaS → `<FeatureGrid>` with feature icons
  - E-commerce → `<ProductGrid>` with products
- **Industry-specific sections** like:
  - `<OpeningHours>` and `<ReservationCTA>` for restaurants
  - `<LogoCloud>` for agencies/SaaS
  - `<TrustBadges>` for e-commerce
- **Stats** with industry-appropriate metrics
- **Testimonials** with locale-appropriate names

---

### File 3: `app/[slug]/about/page.tsx`

Create about page with:
- Hero headline (e.g., "Over [Business Name]" or "Our Story")
- Story section using template structure
- Values section
- Industry-appropriate photos from template

---

### File 4: `app/[slug]/[services-or-menu-or-products]/page.tsx`

Create the main offerings page. Name it appropriately:
- Restaurant → `menu/page.tsx`
- SaaS → `features/page.tsx`
- E-commerce → `products/page.tsx`
- Agency → `services/page.tsx`

---

### File 5: `app/[slug]/contact/page.tsx`

Create contact page with:
- Contact info (email, phone, address)
- FAQ section customized for the business
- LocalBusinessSchema structured data
- Map with correct coordinates

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

### File 6: `app/[slug]/pricing/page.tsx` (if applicable)

For SaaS, Agency, or subscription services:
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

## STEP 6: Completion Message

After ALL files are created, send:

```
✅ **Your website is ready!**

I've built a complete [INDUSTRY] website for [BUSINESS_NAME]:
- ✓ Homepage with [COMPONENTS_USED]
- ✓ About page (story, values)
- ✓ [SERVICES/MENU/PRODUCTS] page
- ✓ Contact page (info, FAQ, map)
[+ any other pages]

🌐 **View it:** http://localhost:3000/[slug]

📁 **Your files:** `app/[slug]/`

**The demo at /demo is still available as a reference.**

**Want changes?** Just ask:
- "Change the headline to..."
- "Use different photos"
- "Add more testimonials"
- "Make the colors warmer"
```

---

## CRITICAL RULES

1. **Create new folder** - Build in `app/[slug]/`, don't modify `/demo`
2. **Component discovery first** - Read COMPONENTS.md and choose components BEFORE creating files
3. **Use demo as reference** - Read demo files for patterns, but create fresh files
4. **Don't copy demo structure blindly** - Each business type needs different components
5. **Use correct paths** - All internal links must use `/[slug]/` prefix
6. **Customize everything** - Replace ALL placeholders with real content
7. **No lorem ipsum** - Write real, believable content
8. **Match locale** - Dutch business = Dutch names in testimonials
9. **One question round** - Never ask follow-up questions after step 2

---

## IF SOMETHING FAILS

If file creation fails:
1. Check if the folder exists, create it if needed
2. Read the demo reference file again for correct patterns
3. Continue with other files
4. Report any issues at the end
