# Claude Craft - Help

Welcome to Claude Craft! This UI kit helps you build beautiful websites that don't look "AI-generated".

## Quick Start

Just type:
```
/website
```

This starts an interactive wizard that:
1. Asks about your business (name, what you do, location)
2. Lets you choose which pages you want
3. Builds everything automatically

**That's it!** Your complete website will be ready in seconds.

## All Commands

| Command | Description |
|---------|-------------|
| `/website` | **Start here!** Interactive website builder |
| `/page [type]` | Add a page: `portfolio`, `blog`, `team`, `pricing`, `faq` |
| `/seo` | SEO setup with JSON-LD structured data |
| `/components` | Component usage examples |
| `/patterns` | Section code templates |
| `/photos` | Stock photo URLs by category |
| `/darkmode` | Enable dark mode |
| `/theme` | Color theme presets |
| `/forms` | Form validation guide |

## After Building

Want to make changes? Just ask:
```
"Change the colors to blue"
"Add a pricing page"
"Make the headline shorter"
"Add more testimonials"
```

Want more pages?
```
/page portfolio
/page blog
/page team
```

## Design Philosophy

This kit uses an **editorial/magazine** aesthetic:
- **Serif headings** (DM Serif Display) + **sans-serif body** (Plus Jakarta Sans)
- **Full-bleed photography** with parallax effects
- **Generous whitespace** (`py-32` for sections)
- **Subtle animations** (fade-ups, not overdone effects)
- **Neutral colors** with sparse accents

## What to Avoid

- Gradient mesh backgrounds (too "AI-like")
- Neon colors or excessive gradients
- Too many animations at once
- Cluttered layouts
- Generic stock photos

## Project Structure

```
app/
├── page.tsx              # UI Kit landing (don't modify)
├── globals.css           # Design tokens
└── demo/                 # Your website
    ├── layout.tsx        # Navbar + footer
    ├── page.tsx          # Homepage
    ├── about/page.tsx
    ├── blog/page.tsx
    ├── components/page.tsx  # Component showcase
    ├── contact/page.tsx
    ├── portfolio/page.tsx
    ├── services/page.tsx
    └── team/page.tsx

components/
├── ui/                   # All UI components
│   ├── Button, Badge, Card, Input...
│   ├── BentoGrid, Marquee, SpotlightCard...
│   ├── ProjectCard, BlogCard, TeamCard...
│   └── PricingTable, CommandPalette...
└── sections/             # Page sections
```

## Need More Help?

- `/seo` - SEO setup with JSON-LD structured data
- `/patterns` - Code for common section layouts
- `/components` - How to use each UI component
- `/photos` - Stock photos organized by category
- `/darkmode` - Enable dark mode
- `/theme` - Apply color theme presets
- `/forms` - Form validation setup
- Check `app/demo/` for working examples
