# Claude Craft

A professional UI kit for building beautiful websites with Claude Code. No generic "AI-look" — only elegant, editorial designs that look like they were crafted by a design agency.

![Claude Craft Preview](https://raw.githubusercontent.com/Boristoka/claude-craft/main/.github/preview.jpg)

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-3178c6)
![Components](https://img.shields.io/badge/Components-70+-10b981)

---

## Why this kit?

| Problem | Solution |
|---------|----------|
| AI-generated websites look generic | Editorial design style like Linear & Stripe |
| Poor typography | Serif + Sans-serif combination (DM Serif Display + Plus Jakarta Sans) |
| No visual impact | Full-bleed photography with parallax |
| Cluttered layouts | Generous whitespace, minimalist design |
| Inconsistent styling | Complete design token system |

---

## Getting Started

```bash
git clone https://github.com/Boristoka/claude-craft.git
cd claude-craft
npm install
npm run dev
```

**Live Demo:** [https://claude-ui-kit.vercel.app](https://claude-ui-kit.vercel.app)

---

## How it works with Claude Code

1. **Clone this project**
2. **Open Claude Code** in the project folder
3. **Type `/website`** - that's it!

### The `/website` Wizard

```
You: /website

Claude: 🚀 Let's build your website!
        What industry are you in?
        SaaS / Restaurant / Agency / Portfolio / E-commerce

You: Restaurant

Claude: Great! Tell me about your restaurant:
        1. Name?
        2. Type of cuisine?
        3. Location?

You: Bella Italia, authentic Italian in Amsterdam.
     Family recipes, cozy atmosphere.

Claude: Building your website in app/bella-italia/...

        ✅ Homepage with hero
        ✅ Menu page with MenuSection component
        ✅ About page
        ✅ Contact with Map
        ✅ Navbar & Footer

        Done! View at: http://localhost:3000/bella-italia
```

**Each website gets its own folder** - no overwriting templates.

**Adding more pages later:**
```
/page pricing
/page blog
/page team
```

---

## All Commands

| Command | Description |
|---------|-------------|
| `/website` | **Start here!** Interactive wizard to build your website |
| `/page [type]` | Add a page: portfolio, blog, team, pricing, faq |
| `/components` | Component usage examples |
| `/patterns` | Section code templates |
| `/photos` | Stock photo URLs by category |
| `/seo` | SEO setup with JSON-LD structured data |
| `/darkmode` | Enable dark mode |
| `/theme` | Apply color theme presets |
| `/forms` | Form validation with Zod |
| `/help` | Overview and getting started |

---

## What's included?

### 70+ Components

**Layout & Navigation**
- `NavMenu` - 7 navigation variants (minimal, centered, floating, split, transparent, dropdown, dark)
- `Footer` - Multi-column footer with social links
- `SidebarNav`, `FloatingNav`, `Breadcrumb`, `MegaMenu`

**Content Display**
- `BentoGrid` - Asymmetric grid layout (Apple/Linear style)
- `SpotlightCard` - Cursor-following glow effect
- `ProjectCard` - Portfolio cards with 3D tilt
- `BlogCard` - Blog post cards
- `TeamCard` - Team member cards
- `TestimonialCard` - Customer reviews with grid/carousel layouts

**Business-Specific**
- `MenuSection` - Restaurant menus with dietary badges, allergens, calories
- `DietaryBadges` - Vegan, gluten-free, spicy indicators
- `PricingTable` - Monthly/yearly toggle pricing
- `ProductCard` - E-commerce product cards
- `OpeningHours`, `ReservationCTA` - Restaurant components

**Feedback & Notifications**
- `Alert` - Info, success, warning, error variants
- `Banner`, `TopBanner` - Promotional banners
- `Toast` - Notification toasts
- `CookieBanner` - GDPR-compliant cookie consent

**Interactive**
- `Map` - OpenStreetMap integration (no API key needed)
- `CommandPalette` - Cmd+K search interface
- `Marquee` - Infinite scrolling content
- `AnimateOnScroll` - Scroll-triggered animations
- `ThemeSwitcher` - Dark mode toggle

### SEO (2026 Best Practices)
- JSON-LD structured data (Organization, LocalBusiness, Article, FAQ)
- Dynamic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration
- Full OpenGraph and Twitter card support
- Core Web Vitals optimized

---

## Design Style

### Editorial Aesthetic

```tsx
// ✅ Good: Clean, lots of whitespace
<section className="py-32 bg-white">
  <h2 className="font-serif text-4xl text-neutral-900">
    Elegant heading
  </h2>
</section>

// ❌ Avoid: Overdone effects
<GradientMesh>
  <NeonText>
    <TypeWriter>...</TypeWriter>
  </NeonText>
</GradientMesh>
```

### Typography

```tsx
// Headings: Serif font
<h1 className="font-serif text-4xl md:text-6xl text-neutral-900">
  Title with <em className="italic">emphasis</em>
</h1>

// Body: Sans-serif
<p className="text-lg text-neutral-600 leading-relaxed">
  Paragraph text
</p>
```

---

## Project Structure

```
claude-craft/
├── app/
│   ├── page.tsx              # UI Kit landing
│   ├── components/           # Component gallery
│   ├── demo/                 # Example website template
│   └── [your-website]/       # Your generated website
├── components/ui/            # 70+ components
├── .claude/
│   ├── commands/             # 10 slash commands
│   ├── skills/               # Command implementations
│   └── COMPONENTS.md         # Component reference
└── CLAUDE.md                 # Design guidelines
```

---

## Tech Stack

- **Next.js 16** - App Router
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **TypeScript** - Type safety
- **DM Serif Display** - Heading font
- **Plus Jakarta Sans** - Body font

---

## License

MIT - Free to use for personal and commercial projects.

---

**Made for developers who want to build websites that don't look "AI-generated".**
