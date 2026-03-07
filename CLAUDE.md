# Claude Craft - Instructions for Claude Code

A professional UI kit for building beautiful websites that don't look generic or "AI-generated". This kit follows an **editorial design style** inspired by premium brands like Linear, Stripe, and Awwwards-winning websites.

## Slash Commands

| Command | Usage |
|---------|-------|
| `/website [description]` | Generate complete website (4 pages) based on description |
| `/page [type]` | Add page: `pricing`, `portfolio`, `blog`, `faq`, `team` |

**Example:**
```
/website A bakery in Austin called "Golden Crust". Family business since 1952, specialty sourdough bread.
```

---

## Design Philosophy

### The Editorial Style
This kit uses an **editorial/magazine** aesthetic:
- **Full-bleed photography** - Large, impactful images
- **Serif + Sans-serif** - DM Serif Display for headings, Plus Jakarta Sans for body
- **Generous whitespace** - Let the content breathe
- **Subtle animations** - Fade-ups and parallax, no overdone effects
- **Neutral colors** - Sophisticated grays with subtle accents

### What to avoid
- ❌ Gradient mesh backgrounds (too "AI-like")
- ❌ Neon colors or excessive gradients
- ❌ Too many animations at once
- ❌ Cluttered layouts without whitespace
- ❌ Generic stock photos (choose quality Unsplash images)

---

## Quick Start

### Basic page structure
```tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export default function PageName() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="min-h-screen">
      {/* Hero with parallax photo */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden -mt-20">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
            alt="Hero"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/30 to-neutral-900/70" />
        </motion.div>

        <div className="relative h-full flex flex-col justify-end pb-20 pt-20">
          <div className="container mx-auto px-6">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-6">
              Label
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]">
              Title with <em className="italic">emphasis</em>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Subtitle text here.
            </p>
            <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
              <Link href="/contact">Call to action</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              Section title
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Content here...
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
```

---

## Typography

### Headings (Serif)
Use `font-serif` class for elegant headings:
```tsx
<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-neutral-900 leading-[1.1]">
  Heading with <em className="italic">emphasis</em>
</h1>

<h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
  Section heading
</h2>

<h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-4">
  Subheading
</h3>
```

### Body text (Sans-serif)
```tsx
<p className="text-lg text-neutral-600 leading-relaxed">
  Normal paragraph text
</p>

<p className="text-sm text-neutral-500">
  Small text / labels
</p>
```

### Emphasis patterns
```tsx
// Italic emphasis in headings
<em className="italic">word</em>

// Muted subtitles
<p className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">
  Subtitle label
</p>
```

---

## Color Palette

### Neutrals (Most used)
```
bg-white              - Primary background
bg-neutral-50         - Subtle background
bg-neutral-100        - Cards, inputs
bg-neutral-900        - Dark sections, text
text-neutral-900      - Headings
text-neutral-600      - Body text
text-neutral-500      - Muted text
text-neutral-400      - Labels, placeholders
```

### Accents (Use sparingly)
```
bg-primary-500        - Primary buttons
text-primary-600      - Links, accents
bg-neutral-900        - Dark buttons (often better than primary)
```

### On dark backgrounds
```
text-white            - Headings
text-white/80         - Body text
text-white/60         - Muted text
text-neutral-400      - Very muted
border-white/30       - Borders
bg-white/20           - Badges, overlays
```

---

## Components

### Button
```tsx
import { Button } from "@/components/ui/Button";

// Primary (dark)
<Button size="lg">Label</Button>

// On dark background (white)
<Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100">
  Label
</Button>

// Outline
<Button variant="outline" size="lg">Label</Button>

// Outline on dark
<Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800">
  Label
</Button>

// As Link
<Button asChild>
  <Link href="/contact">Contact</Link>
</Button>
```

### Badge
```tsx
import { Badge } from "@/components/ui/Badge";

// On light background
<Badge>Label</Badge>
<Badge variant="secondary">Label</Badge>

// On dark/photo background
<Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
  Label
</Badge>
```

### AnimateOnScroll
```tsx
import { AnimateOnScroll, CountUp } from "@/components/ui/AnimateOnScroll";

// Fade in on scroll
<AnimateOnScroll animation="fadeInUp">
  <div>Content</div>
</AnimateOnScroll>

// With delay for staggered effect
<AnimateOnScroll animation="fadeInUp" delay={0.1}>
  <div>Item 1</div>
</AnimateOnScroll>
<AnimateOnScroll animation="fadeInUp" delay={0.2}>
  <div>Item 2</div>
</AnimateOnScroll>

// Counting numbers
<p className="font-serif text-5xl">
  <CountUp end={150} />+
</p>
```

### Input & Textarea
```tsx
import { Input, Textarea } from "@/components/ui/Input";

<Input label="Name" placeholder="Your name" required />
<Input label="Email" type="email" placeholder="you@email.com" required />
<Textarea label="Message" placeholder="Your message..." rows={5} required />
```

---

## Section Patterns

### Hero with full-bleed photo
```tsx
<section className="relative h-[80vh] min-h-[600px] overflow-hidden -mt-20">
  <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
    <img
      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
      alt="Hero"
      className="w-full h-[120%] object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/30 to-neutral-900/70" />
  </motion.div>

  <div className="relative h-full flex flex-col justify-end pb-20 pt-20">
    <div className="container mx-auto px-6 max-w-3xl">
      {/* Content */}
    </div>
  </div>
</section>
```

### Stats section
```tsx
<section className="py-20 bg-white border-b border-neutral-100">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { value: 150, suffix: "+", label: "Projects" },
        { value: 98, suffix: "%", label: "Happy clients" },
        { value: 12, suffix: "", label: "Years experience" },
      ].map((stat, i) => (
        <AnimateOnScroll key={stat.label} animation="fadeInUp" delay={i * 0.1} className="text-center">
          <p className="font-serif text-4xl md:text-5xl text-neutral-900 mb-2">
            <CountUp end={stat.value} />{stat.suffix}
          </p>
          <p className="text-sm text-neutral-500">{stat.label}</p>
        </AnimateOnScroll>
      ))}
    </div>
  </div>
</section>
```

### Features with alternating layout
```tsx
{services.map((service, index) => (
  <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
    {/* Image */}
    <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
      <div className="aspect-[4/3] rounded-2xl overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
      </div>
    </div>

    {/* Content */}
    <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
      <h3 className="font-serif text-3xl text-neutral-900 mb-4">{service.title}</h3>
      <p className="text-lg text-neutral-600 leading-relaxed mb-6">{service.description}</p>
      <Button variant="outline" asChild>
        <Link href="/services">Learn more</Link>
      </Button>
    </div>
  </div>
))}
```

### Full-width quote/image break
```tsx
<section className="relative h-[60vh] min-h-[400px]">
  <img
    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85"
    alt="Team"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-neutral-900/40" />
  <div className="absolute inset-0 flex items-center justify-center">
    <p className="font-serif text-3xl md:text-4xl text-white max-w-3xl text-center px-6">
      "Quote text here with <em className="italic">emphasis</em>."
    </p>
  </div>
</section>
```

### Testimonials grid
```tsx
<div className="grid md:grid-cols-3 gap-8">
  {testimonials.map((t) => (
    <div className="bg-white rounded-2xl p-8 h-full flex flex-col">
      <svg className="w-10 h-10 text-neutral-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-neutral-600 leading-relaxed mb-6 flex-grow">{t.quote}</p>
      <div className="flex items-center gap-4">
        <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-neutral-900">{t.author}</p>
          <p className="text-sm text-neutral-500">{t.role}</p>
        </div>
      </div>
    </div>
  ))}
</div>
```

### Dark CTA section
```tsx
<section className="py-32 bg-neutral-900">
  <div className="container mx-auto px-6">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
        Call to action title
      </h2>
      <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
        Subtitle text here.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
          <Link href="/contact">Primary action</Link>
        </Button>
        <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800" asChild>
          <Link href="/about">Secondary action</Link>
        </Button>
      </div>
    </div>
  </div>
</section>
```

### Team grid with grayscale effect
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {team.map((member) => (
    <div className="group">
      <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900">{member.name}</h3>
      <p className="text-sm text-neutral-500">{member.role}</p>
    </div>
  ))}
</div>
```

---

## Stock Photos (Unsplash)

### Quality photo URLs
```tsx
// Office/workspace (heroes)
"https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
"https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&q=85"

// Team/collaboration
"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85"
"https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85"

// Portrait photos
"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"

// Abstract/minimal
"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=85"
"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85"
```

### Tips for photo selection
- Choose photos with **neutral colors** (no bright tones)
- Use **professional** settings (office, meetings)
- Avoid **cliché stock photos** (people pointing at laptops, etc.)
- Consistent **lighting and mood** throughout the site

---

## Project Structure

```
app/
├── page.tsx              # UI Kit landing (don't modify)
├── layout.tsx            # Root layout with fonts
├── globals.css           # Design tokens
└── demo/                 # Business template
    ├── layout.tsx        # Demo layout with navbar/footer
    ├── page.tsx          # Homepage
    ├── about/page.tsx    # About
    ├── services/page.tsx # Services
    └── contact/page.tsx  # Contact

components/
├── ui/                   # UI components
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── AnimateOnScroll.tsx
└── layout/
    └── Footer.tsx
```

### Adding a new page
1. Create `app/demo/[pagename]/page.tsx`
2. Use `"use client"` directive
3. The layout automatically adds navbar and footer

---

## Checklist for new pages

- [ ] `"use client"` directive added
- [ ] Hero with full-bleed photo or compact variant
- [ ] `font-serif` for all headings
- [ ] Sufficient whitespace (`py-32` for sections)
- [ ] `AnimateOnScroll` for scroll animations
- [ ] Responsive: `md:` and `lg:` breakpoints
- [ ] Quality Unsplash photos
- [ ] Dark CTA section at bottom (optional)
- [ ] Consistent Button styling

---

## Common mistakes

### ❌ Too busy
```tsx
// Wrong: too many effects
<GradientMesh />
<FloatingElement />
<TiltCard>
  <GradientText>
    <TypeWriter>...</TypeWriter>
  </GradientText>
</TiltCard>
```

### ✅ Clean and elegant
```tsx
// Good: focus on content
<section className="py-32 bg-white">
  <AnimateOnScroll animation="fadeInUp">
    <h2 className="font-serif text-4xl text-neutral-900 mb-6">
      Simple, elegant heading
    </h2>
    <p className="text-neutral-600">Content here.</p>
  </AnimateOnScroll>
</section>
```

### ❌ Inconsistent colors
```tsx
// Wrong: random colors
<div className="bg-blue-500">
<span className="text-purple-600">
<Button className="bg-green-500">
```

### ✅ Consistent palette
```tsx
// Good: neutral + primary accent
<div className="bg-neutral-900">
<span className="text-neutral-600">
<Button> // default primary
```
