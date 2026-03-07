# Claude Craft

A professional UI kit for building beautiful websites with Claude Code. No generic "AI-look" — only elegant, editorial designs that look like they were crafted by a design agency.

![Claude Craft Preview](.github/preview.png)

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-3178c6)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-✓-ff69b4)

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
git clone https://github.com/your-username/claude-craft.git
cd claude-craft
npm install
npm run dev
```

**URLs:**
- `http://localhost:3000` - UI Kit landing page
- `http://localhost:3000/demo` - Business website demo

---

## How it works with Claude Code

1. **Clone this project**
2. **Open Claude Code** in the project folder
3. **Use the slash commands** to get started quickly

### Slash Commands

| Command | What it does |
|---------|--------------|
| `/website` | Start an interactive wizard that builds your website |
| `/page [type]` | Add a page (pricing, portfolio, blog, faq) |

### How `/website` works

```
You: /website

Claude: I'm going to build a complete website for you. First, a few questions:
        Business name? Location? What do you do?

You: Golden Crust Bakery, Austin, artisan bread and pastries

Claude: What are your main products/services?

You: Sourdough bread, custom cakes, breakfast catering

Claude: What makes you unique?

You: Family business since 1952, everything handmade, local ingredients

Claude: [Generates complete 4-page website]
```

**Adding more pages:**
```
/page pricing
/page portfolio
/page blog
```

### Manual adjustments

You can also ask directly:
```
"Change the colors to blue"
"Add a testimonials section"
"Make the hero centered"
```

---

## What's included?

### Design System
- **Typography**: DM Serif Display (headings) + Plus Jakarta Sans (body)
- **Colors**: Sophisticated neutrals with subtle primary accents
- **Spacing**: Generous whitespace with `py-32` sections
- **Animations**: Subtle fade-ups and parallax effects

### Page Templates

| Route | Description |
|-------|-------------|
| `/` | UI Kit landing page |
| `/demo` | Business homepage |
| `/demo/about` | About page |
| `/demo/services` | Services overview |
| `/demo/contact` | Contact form |

### Components

**UI Basics**
- `Button` - Primary, outline, ghost variants
- `Badge` - Status labels
- `Input` / `Textarea` - Form elements
- `Card` - Content containers

**Animation**
- `AnimateOnScroll` - Scroll-triggered animations
- `CountUp` - Counting numbers

**Layout**
- `Footer` - Multi-column footer

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
  <TiltCard>
    <GradientText>
      <TypeWriter>...</TypeWriter>
    </GradientText>
  </TiltCard>
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

### Colors

```
Neutrals (most used):
- bg-white, bg-neutral-50, bg-neutral-900
- text-neutral-900 (headings)
- text-neutral-600 (body)
- text-neutral-400 (muted)

Accents (sparingly):
- bg-primary-500 (buttons)
- text-primary-600 (links)
```

---

## Project Structure

```
claude-craft/
├── app/
│   ├── page.tsx              # UI Kit landing
│   ├── layout.tsx            # Root layout (fonts)
│   ├── globals.css           # Design tokens
│   └── demo/                 # Business template
│       ├── layout.tsx        # Demo layout (navbar/footer)
│       ├── page.tsx          # Homepage
│       ├── about/page.tsx
│       ├── services/page.tsx
│       └── contact/page.tsx
├── components/
│   ├── ui/                   # UI components
│   └── layout/               # Layout components
├── .claude/
│   └── commands/             # Slash commands
│       ├── website.md
│       └── page.md
├── CLAUDE.md                 # Claude Code instructions
└── README.md
```

---

## Customization

### Changing colors

Edit `app/globals.css`:

```css
:root {
  /* Customize primary color */
  --color-primary-500: 239 84% 67%;  /* Indigo */
  --color-primary-600: 243 75% 59%;

  /* Or choose another color */
  --color-primary-500: 220 90% 56%;  /* Blue */
}
```

### Changing fonts

Edit `app/layout.tsx`:

```tsx
import { Playfair_Display } from "next/font/google";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
```

### Adding a new page

1. Create `app/demo/[pagename]/page.tsx`
2. Add `"use client"` directive
3. Follow the patterns from `CLAUDE.md`

---

## Tips for beautiful results

1. **Less is more** - Don't use all effects at once
2. **Quality photos** - Choose professional Unsplash photos
3. **Consistency** - Stick to the neutral color palette
4. **Whitespace** - Use `py-32` for sections, not `py-8`
5. **Serif headings** - Always use `font-serif` for h1/h2
6. **Subtle animations** - `fadeInUp` is often enough

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
