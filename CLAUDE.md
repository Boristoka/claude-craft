# Claude Craft

A UI kit for building beautiful websites with Claude Code. Editorial design style inspired by Linear, Stripe, and Awwwards-winning sites.

## Commands

| Command | Description |
|---------|-------------|
| `/help` | Overview and getting started |
| `/website [description]` | Generate complete 4-page website |
| `/page [type]` | Add page: pricing, portfolio, blog, faq, team |
| `/patterns` | Section code patterns (hero, stats, CTA, etc.) |
| `/components` | Component usage examples |
| `/photos` | Stock photo URLs by category |
| `/darkmode` | Enable dark mode |
| `/theme` | Apply color theme presets |
| `/forms` | Form validation with Zod |

**Example:** `/website A bakery in Austin called "Golden Crust". Family business since 1952.`

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
├── globals.css           # Design tokens
└── demo/                 # Your website
    ├── layout.tsx        # Navbar + footer
    ├── page.tsx          # Homepage
    └── [page]/page.tsx   # Other pages

components/
├── ui/                   # Button, Badge, Card, Input, etc.
└── sections/             # Hero, Features, Testimonials, etc.
```

**Adding pages:** Create `app/demo/[name]/page.tsx` with `"use client"` directive.

---

## Checklist

- [ ] `"use client"` at top
- [ ] `font-serif` for headings
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
