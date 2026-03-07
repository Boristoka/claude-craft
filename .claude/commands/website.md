# /website - Build a complete website

You're going to build a complete website for the user. But first, ask a few short questions to understand what they need.

## STEP 1: Ask questions

Ask these questions one by one (or in small groups). Wait for answers before proceeding.

### Question 1: Basics
```
I'm going to build a complete website for you. First, a few questions:

**Business name:** What's your business called?
**Location:** Where is it located?
**In short:** What do you do in 1 sentence?
```

### Question 2: Services
```
**Services:** What are your 3-4 main services or products?

(For example: "Web design, SEO, Branding" or "Fresh breads, Cakes, Catering")
```

### Question 3: Unique selling points
```
**What makes you unique?** Think about:
- Years of experience
- Team size
- Specialization
- Approach or methodology
- Certifications or awards

(You can mention multiple things)
```

### Question 4: Tone of voice (optional)
```
**How do you want to come across?** Choose what fits best:

1. Professional & business-like
2. Warm & personal
3. Modern & innovative
4. Artisanal & traditional
5. Other (describe)

(Or skip, and I'll choose something fitting)
```

## STEP 2: Confirm the plan

After the questions, give a brief summary:

```
**I'm going to build the following:**

🏢 [Business name] - [Type of business]
📍 [Location]
💼 Services: [Service 1], [Service 2], [Service 3]
✨ USPs: [Unique points]
🎨 Style: [Chosen tone]

**Pages I'll create:**
- Homepage (hero, stats, services preview, testimonials, CTA)
- About (story, team, values)
- Services (all services detailed)
- Contact (form, contact details, FAQ)

Should I begin?
```

Wait for confirmation before generating.

---

## STEP 3: Generate the website

After confirmation, generate all 4 pages.

### Choosing photos per industry

**Tech / Digital / Marketing / IT:**
```
Hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
Team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85"
Office: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&q=85"
Work: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85"
Meeting: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85"
```

**Creative / Design / Architecture / Photography:**
```
Hero: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=85"
Studio: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
Work: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=85"
```

**Business services / Consultancy / Finance / Legal:**
```
Hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85"
Office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
Meeting: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85"
```

**Food / Hospitality / Bakery / Restaurant:**
```
Hero: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85"
Interior: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85"
Product: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=85"
```

**Health / Wellness / Sports / Fitness:**
```
Hero: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=85"
Space: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1920&q=85"
```

**Construction / Real Estate / Interior:**
```
Hero: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85"
Project: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85"
```

**Team photos (all industries):**
```
"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
```

---

## PAGE TEMPLATES

Generate these 4 files plus update the layout:

1. `app/demo/page.tsx` - Homepage
2. `app/demo/about/page.tsx` - About
3. `app/demo/services/page.tsx` - Services
4. `app/demo/contact/page.tsx` - Contact
5. Update `app/demo/layout.tsx` - Business name in navbar

---

### Homepage Template (`app/demo/page.tsx`)

```tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll, CountUp } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const services = [
  {
    number: "01",
    title: "[SERVICE 1]",
    description: "[DESCRIPTION]",
    image: "[PHOTO URL]",
  },
  {
    number: "02",
    title: "[SERVICE 2]",
    description: "[DESCRIPTION]",
    image: "[PHOTO URL]",
  },
  {
    number: "03",
    title: "[SERVICE 3]",
    description: "[DESCRIPTION]",
    image: "[PHOTO URL]",
  },
];

const testimonials = [
  {
    quote: "[REALISTIC QUOTE]",
    author: "[NAME]",
    role: "[TITLE, COMPANY]",
    image: "[PORTRAIT URL]",
  },
  {
    quote: "[REALISTIC QUOTE]",
    author: "[NAME]",
    role: "[TITLE, COMPANY]",
    image: "[PORTRAIT URL]",
  },
  {
    quote: "[REALISTIC QUOTE]",
    author: "[NAME]",
    role: "[TITLE, COMPANY]",
    image: "[PORTRAIT URL]",
  },
];

const stats = [
  { value: [X], suffix: "+", label: "[LABEL]" },
  { value: [X], suffix: "%", label: "[LABEL]" },
  { value: [X], suffix: "", label: "[LABEL]" },
  { value: [X], suffix: "", label: "[LABEL]" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden -mt-20">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="[HERO PHOTO]"
            alt="[BUSINESS NAME]"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 via-neutral-900/20 to-neutral-900/60" />
        </motion.div>

        <motion.div
          className="relative h-full flex flex-col justify-end pb-20 md:pb-32 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp}>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-6">
                  [BADGE - e.g. "Welcome to Business Name"]
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]"
              >
                [HEADLINE with <em className="italic">emphasis</em>]
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed"
              >
                [SUBLINE - what they do and for whom]
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
                  <Link href="/demo/contact">
                    [CTA - e.g. "Start a project"]
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link href="/demo/services">[SECONDARY CTA]</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <AnimateOnScroll key={stat.label} animation="fadeInUp" delay={index * 0.1} className="text-center">
                <p className="font-serif text-4xl md:text-5xl text-neutral-900 mb-2">
                  <CountUp end={stat.value} />{stat.suffix}
                </p>
                <p className="text-sm text-neutral-500">{stat.label}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mb-20">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              [SECTION TITLE]
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              [SECTION INTRO]
            </p>
          </AnimateOnScroll>

          <div className="space-y-32">
            {services.map((service, index) => (
              <AnimateOnScroll
                key={service.number}
                animation="fadeInUp"
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-neutral-900 rounded-2xl flex items-center justify-center text-white font-serif text-2xl">
                    {service.number}
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <h3 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">{service.title}</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-6">{service.description}</p>
                  <Button variant="outline" asChild>
                    <Link href="/demo/services">
                      Learn more
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img src="[TEAM PHOTO]" alt="[BUSINESS NAME]" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-neutral-900/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimateOnScroll animation="fadeInUp" className="text-center px-6">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white max-w-3xl leading-tight">
              "[INSPIRING QUOTE]"
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              What clients say
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <AnimateOnScroll key={t.author} animation="fadeInUp" delay={index * 0.1}>
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
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              [CTA HEADLINE]
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
              [CTA TEXT]
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
                <Link href="/demo/contact">
                  [BUTTON TEXT]
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800" asChild>
                <Link href="/demo/about">[SECONDARY]</Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
```

---

### About, Services, Contact

Use the same structure as the current demo pages in `app/demo/about/page.tsx`, `app/demo/services/page.tsx`, and `app/demo/contact/page.tsx`. Adapt the content based on the user's answers.

**Key elements per page:**

**About:**
- Hero with team/office photo
- Story section (how it started, growth, vision)
- Values grid (4 values)
- Team photos with grayscale effect
- Stats section
- CTA

**Services:**
- Hero with relevant photo
- Services detailed with alternating layout
- Per service: title, description, 6 features
- Process/methodology grid (6 steps)
- CTA

**Contact:**
- Compact hero
- Form + contact details side by side
- FAQ section (3 questions relevant to industry)
- "Call us" CTA

---

### Layout Update

Update `app/demo/layout.tsx` - find the navbar and replace business name:

```tsx
<Link href="/demo" className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center">
    <span className="text-white font-semibold text-sm">[INITIALS]</span>
  </div>
  <span className="font-semibold text-neutral-900 text-lg">
    [BUSINESS NAME]
  </span>
</Link>
```

---

## STEP 4: Finish up

After generating all pages:

```
✅ **Website generated!**

I've created the following pages:
- `/demo` - Homepage
- `/demo/about` - About
- `/demo/services` - Services
- `/demo/contact` - Contact

**View:** Open http://localhost:3000/demo

**Want to adjust anything?** You can ask for:
- Different colors
- Additional pages (`/page pricing`, `/page portfolio`)
- Add or remove sections
- Modify text
```

---

## IMPORTANT

1. **Ask questions FIRST** - only generate after confirmation
2. **Wait for answers** - don't fill in yourself
3. **Be conversational** - not too formal
4. **Use the exact code structure** above
5. **All imports must be correct**
6. **No lorem ipsum** - real, fitting content
7. **Consistent business name** across all pages
