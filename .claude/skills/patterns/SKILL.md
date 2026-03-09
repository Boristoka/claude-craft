---
name: patterns
description: Section code templates and copy-paste ready patterns for websites.
---

# Section Patterns

Copy-paste ready code for common website sections.

---

## Hero with Full-Bleed Photo

```tsx
const heroRef = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end start"],
});
const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);

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
    <div className="container mx-auto px-6 max-w-3xl">
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
```

---

## Stats Section

```tsx
<section className="py-20 bg-white border-b border-neutral-100">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { value: 150, suffix: "+", label: "Projects" },
        { value: 98, suffix: "%", label: "Happy clients" },
        { value: 12, suffix: "", label: "Years experience" },
        { value: 24, suffix: "/7", label: "Support" },
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

---

## Features with Alternating Layout

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

---

## Full-Width Quote/Image Break

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

---

## Testimonials Grid

```tsx
<section className="py-32 bg-neutral-50">
  <div className="container mx-auto px-6">
    <AnimateOnScroll animation="fadeInUp" className="text-center mb-16">
      <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">
        What our clients say
      </h2>
    </AnimateOnScroll>

    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <AnimateOnScroll key={t.author} animation="fadeInUp" delay={i * 0.1}>
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
```

---

## Dark CTA Section

```tsx
<section className="py-32 bg-neutral-900">
  <div className="container mx-auto px-6">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
        Ready to get started?
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

---

## Team Grid with Grayscale Effect

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {team.map((member, i) => (
    <AnimateOnScroll key={member.name} animation="fadeInUp" delay={i * 0.1}>
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
    </AnimateOnScroll>
  ))}
</div>
```

---

## FAQ Section

```tsx
<section className="py-32 bg-white">
  <div className="container mx-auto px-6 max-w-3xl">
    <AnimateOnScroll animation="fadeInUp" className="text-center mb-16">
      <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">
        Frequently asked questions
      </h2>
    </AnimateOnScroll>

    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <AnimateOnScroll key={i} animation="fadeInUp" delay={i * 0.05}>
          <details className="group bg-neutral-50 rounded-xl">
            <summary className="flex items-center justify-between p-6 cursor-pointer">
              <span className="font-medium text-neutral-900">{faq.question}</span>
              <svg className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-neutral-600">
              {faq.answer}
            </div>
          </details>
        </AnimateOnScroll>
      ))}
    </div>
  </div>
</section>
```

---

## Required Imports

Add these at the top of your page:

```tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll, CountUp } from "@/components/ui/AnimateOnScroll";
```
