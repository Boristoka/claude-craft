# Claude Craft - Help

Welcome to Claude Craft! This UI kit helps you build beautiful websites that don't look "AI-generated".

## Available Commands

| Command | Description |
|---------|-------------|
| `/website [description]` | Generate a complete 4-page website |
| `/page [type]` | Add a page: `pricing`, `portfolio`, `blog`, `faq`, `team` |
| `/patterns` | View section patterns (hero, stats, testimonials, etc.) |
| `/components` | View component usage examples |
| `/photos` | Get quality stock photo URLs by category |

## Quick Start

**Option 1: Generate a complete website**
```
/website A bakery in Austin called "Golden Crust". Family business since 1952.
```

**Option 2: Start from the demo**
The `/demo` folder contains a complete business website. Modify it to fit your needs:
```
"Change the business name to 'Acme Corp' and make it a tech consulting company"
```

**Option 3: Add pages incrementally**
```
/page pricing
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
    ├── services/page.tsx
    └── contact/page.tsx

components/
├── ui/                   # Button, Badge, Card, Input, etc.
└── sections/             # Hero, Features, Testimonials, etc.
```

## Need More Help?

- `/patterns` - Code for common section layouts
- `/components` - How to use each UI component
- `/photos` - Stock photos organized by category
- Check `app/demo/` for working examples
