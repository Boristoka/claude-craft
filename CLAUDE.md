# Claude Craft

A UI kit for building beautiful websites with Claude Code. Editorial design style inspired by Linear, Stripe, and Awwwards-winning sites.

## Quick Start

```
/website
```

This starts an interactive wizard that:
1. Asks your industry (SaaS, Restaurant, Agency, Portfolio, E-commerce)
2. Collects your business info
3. Creates a new folder for your website (e.g., `app/bella-italia/`)
4. Builds a complete, customized website automatically

**Industry Templates** — Pre-built content, photos, and structure for your specific niche. No lorem ipsum.

## All Commands

| Command | Description |
|---------|-------------|
| `/website` | **Start here!** Interactive wizard to build your website |
| `/page [type]` | Add a page: portfolio, blog, team, pricing, faq |
| `/seo` | SEO setup guide with JSON-LD structured data |
| `/help` | Overview and getting started |
| `/components` | Component usage examples |
| `/patterns` | Section code templates |
| `/photos` | Stock photo URLs by category |
| `/darkmode` | Enable dark mode |
| `/theme` | Apply color theme presets |
| `/forms` | Form validation with Zod |

---

## Design Philosophy

**Editorial aesthetic:**
- Serif headings (DM Serif Display) + sans-serif body (Plus Jakarta Sans)
- Full-bleed photography with parallax
- Generous whitespace (`py-32` for sections)
- Subtle animations (fade-ups only)
- Neutral colors with sparse accents

**Avoid:**
- Gradient mesh backgrounds
- Neon/excessive gradients
- Too many animations
- Cluttered layouts
- Generic stock photos

---

## Quick Reference

### Typography
```tsx
// Headings - always serif
<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-neutral-900">
  Title with <em className="italic">emphasis</em>
</h1>

// Body - sans-serif
<p className="text-lg text-neutral-600 leading-relaxed">
```

### Colors
```
Light backgrounds:     bg-white, bg-neutral-50
Dark sections:         bg-neutral-900
Headings:              text-neutral-900
Body text:             text-neutral-600
Muted:                 text-neutral-400

On dark/photos:
  Headings:            text-white
  Body:                text-white/80
  Borders:             border-white/30
```

### Spacing
```
Sections:              py-32
Cards gap:             gap-8
Container:             container mx-auto px-6
```

---

## Project Structure

```
app/
├── page.tsx              # UI Kit landing (don't modify)
├── components/           # Component gallery
├── globals.css           # Design tokens
└── demo/                 # Example website template

components/ui/            # 70+ components
├── Button, Badge, Card, Input, Tabs, Modal...
├── BentoGrid, Marquee, SpotlightCard, PricingTable...
├── ProjectCard, BlogCard, TeamCard, CommandPalette...
├── AnimateOnScroll, ThemeSwitcher, ValidatedForm...
├── TestimonialCard, TestimonialGrid, TestimonialCarousel
├── FeatureGrid (icons + grid for SaaS/services)
├── LogoCloud, TrustBadges (client logos, trust indicators)
├── Timeline, ProcessSteps (experience, how-it-works)
├── MenuSection, OpeningHours, ReservationCTA (restaurant)
├── ProductCard, ProductGrid, CollectionCard (e-commerce)
├── NewsletterSignup, AvailabilityBadge (email capture)
├── NavMenu (7 navigation variants)
├── Alert, Banner, TopBanner, Callout (notifications)
├── DietaryBadges (restaurant dietary indicators)
├── CookieBanner (GDPR-compliant, auto-included)
└── Map (OpenStreetMap, no API key needed)

.claude/
├── COMPONENTS.md         # Component reference for website building
└── skills/               # Slash command implementations
```

---

## Hero Pattern

All pages use full-bleed hero with parallax:
```tsx
<section className="relative h-[60vh] min-h-[450px] overflow-hidden -mt-20">
  <motion.div style={{ y: heroImageY }}>
    <img src="..." className="w-full h-[120%] object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 ... to-neutral-900/70" />
  </motion.div>
  {/* Content at bottom with white text */}
  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm" />
  <h1 className="text-white">...</h1>
</section>
```

## Checklist

- [ ] `"use client"` at top
- [ ] `font-serif` for headings
- [ ] Full-bleed hero with parallax photo
- [ ] `py-32` section spacing
- [ ] `AnimateOnScroll` for reveals
- [ ] Responsive: `md:` and `lg:` breakpoints
- [ ] Quality Unsplash photos (use `/photos`)

---

## More Help

Type `/help` for getting started guide, or:
- `/patterns` - Section code templates
- `/components` - Component examples
- `/photos` - Stock photo library
