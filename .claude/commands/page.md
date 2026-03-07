# /page - Add a page

Add a new page to the existing website. The page will be generated in the same style as the rest of the site.

## Usage

```
/page pricing
/page portfolio
/page blog
/page team
/page faq
```

## Step 1: Read existing context

First read `app/demo/page.tsx` to understand:
- Business name
- Industry/type of business
- Current services
- Tone of voice

## Step 2: Generate the page

Create `app/demo/[pagename]/page.tsx` with exactly the same style.

---

## PAGE TEMPLATES

### Pricing (`/page pricing`)

```tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const plans = [
  {
    name: "[BASIC PLAN]",
    description: "[SHORT DESCRIPTION]",
    price: "[PRICE]",
    period: "per month",
    features: [
      "[FEATURE 1]",
      "[FEATURE 2]",
      "[FEATURE 3]",
      "[FEATURE 4]",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "[POPULAR PLAN]",
    description: "[SHORT DESCRIPTION]",
    price: "[PRICE]",
    period: "per month",
    features: [
      "[FEATURE 1]",
      "[FEATURE 2]",
      "[FEATURE 3]",
      "[FEATURE 4]",
      "[FEATURE 5]",
      "[FEATURE 6]",
    ],
    cta: "Get started",
    popular: true,
  },
  {
    name: "[PREMIUM PLAN]",
    description: "[SHORT DESCRIPTION]",
    price: "[PRICE]",
    period: "per month",
    features: [
      "[FEATURE 1]",
      "[FEATURE 2]",
      "[FEATURE 3]",
      "[FEATURE 4]",
      "[FEATURE 5]",
      "[FEATURE 6]",
      "[FEATURE 7]",
      "[FEATURE 8]",
    ],
    cta: "Contact us",
    popular: false,
  },
];

export default function PricingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section ref={heroRef} className="relative pt-32 pb-20 bg-neutral-50 -mt-20">
        <motion.div
          className="container mx-auto px-6 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-6">Pricing</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6 leading-[1.1]"
            >
              Transparent <em className="italic">pricing</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-neutral-600 max-w-xl mx-auto leading-relaxed"
            >
              [PRICING INTRO - no hidden costs, etc.]
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* PRICING CARDS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <AnimateOnScroll
                key={plan.name}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <div
                  className={`relative rounded-2xl p-8 h-full flex flex-col ${
                    plan.popular
                      ? "bg-neutral-900 text-white"
                      : "bg-white border border-neutral-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-white text-neutral-900">Most popular</Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? "text-white" : "text-neutral-900"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.popular ? "text-white/70" : "text-neutral-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className={`font-serif text-4xl ${plan.popular ? "text-white" : "text-neutral-900"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ml-2 ${plan.popular ? "text-white/70" : "text-neutral-500"}`}>
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-white" : "text-neutral-400"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`text-sm ${plan.popular ? "text-white/90" : "text-neutral-600"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={plan.popular ? "bg-white text-neutral-900 hover:bg-neutral-100 w-full" : "w-full"}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/demo/contact">{plan.cta}</Link>
                  </Button>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-6">
              Questions about pricing?
            </h2>
          </AnimateOnScroll>

          <div className="max-w-2xl mx-auto space-y-6">
            {[
              { q: "[QUESTION 1]", a: "[ANSWER 1]" },
              { q: "[QUESTION 2]", a: "[ANSWER 2]" },
              { q: "[QUESTION 3]", a: "[ANSWER 3]" },
            ].map((faq, index) => (
              <AnimateOnScroll key={faq.q} animation="fadeInUp" delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-neutral-100">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">{faq.q}</h3>
                  <p className="text-neutral-600">{faq.a}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Still have questions?
            </h2>
            <p className="text-neutral-400 mb-8">
              Get in touch for a free consultation.
            </p>
            <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
              <Link href="/demo/contact">Contact us</Link>
            </Button>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
```

---

### Portfolio (`/page portfolio`)

```tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const projects = [
  {
    title: "[PROJECT NAME]",
    category: "[CATEGORY]",
    description: "[SHORT DESCRIPTION - 1-2 sentences]",
    image: "[UNSPLASH PROJECT PHOTO]",
    tags: ["[TAG1]", "[TAG2]", "[TAG3]"],
  },
  // ... more projects (6-9 items)
];

export default function PortfolioPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section ref={heroRef} className="relative pt-32 pb-20 bg-neutral-50 -mt-20">
        <motion.div
          className="container mx-auto px-6 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-6">Portfolio</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6 leading-[1.1]"
            >
              Our <em className="italic">work</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-neutral-600 max-w-xl leading-relaxed"
            >
              [PORTFOLIO INTRO - projects we're proud of]
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimateOnScroll
                key={project.title}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-sm text-neutral-500 mb-2">{project.category}</p>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Ready for your project?
            </h2>
            <p className="text-neutral-400 mb-8">
              Let's discuss how we can work together.
            </p>
            <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
              <Link href="/demo/contact">Start a project</Link>
            </Button>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
```

---

### Blog (`/page blog`)

```tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const posts = [
  {
    title: "[ARTICLE TITLE]",
    excerpt: "[EXCERPT - 2-3 sentence summary]",
    image: "[UNSPLASH PHOTO]",
    date: "[DATE]",
    category: "[CATEGORY]",
    slug: "[slug]",
  },
  // ... more articles (6-9 items)
];

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section ref={heroRef} className="relative pt-32 pb-20 bg-neutral-50 -mt-20">
        <motion.div
          className="container mx-auto px-6 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-6">Blog</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6 leading-[1.1]"
            >
              Insights & <em className="italic">news</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-neutral-600 max-w-xl leading-relaxed"
            >
              [BLOG INTRO - sharing knowledge, trends, tips]
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURED POST */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary">{posts[0].category}</Badge>
                  <span className="text-sm text-neutral-500">{posts[0].date}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">
                  {posts[0].title}
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  {posts[0].excerpt}
                </p>
                <Link
                  href={`/demo/blog/${posts[0].slug}`}
                  className="inline-flex items-center text-neutral-900 font-medium hover:text-primary-600 transition-colors"
                >
                  Read more
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ALL POSTS */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-neutral-900">
              All articles
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <AnimateOnScroll
                key={post.title}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <Link href={`/demo/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs px-2 py-1 bg-neutral-200 text-neutral-600 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-neutral-500">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

### FAQ (`/page faq`)

```tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const categories = [
  {
    name: "[CATEGORY 1]",
    faqs: [
      { question: "[QUESTION]", answer: "[ANSWER]" },
      { question: "[QUESTION]", answer: "[ANSWER]" },
      { question: "[QUESTION]", answer: "[ANSWER]" },
    ],
  },
  {
    name: "[CATEGORY 2]",
    faqs: [
      { question: "[QUESTION]", answer: "[ANSWER]" },
      { question: "[QUESTION]", answer: "[ANSWER]" },
    ],
  },
  {
    name: "[CATEGORY 3]",
    faqs: [
      { question: "[QUESTION]", answer: "[ANSWER]" },
      { question: "[QUESTION]", answer: "[ANSWER]" },
      { question: "[QUESTION]", answer: "[ANSWER]" },
    ],
  },
];

export default function FAQPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section ref={heroRef} className="relative pt-32 pb-20 bg-neutral-50 -mt-20">
        <motion.div
          className="container mx-auto px-6 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-6">FAQ</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6 leading-[1.1]"
            >
              Frequently asked <em className="italic">questions</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-neutral-600 max-w-xl mx-auto leading-relaxed"
            >
              [FAQ INTRO - answers to the most common questions]
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ SECTIONS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            {categories.map((category, catIndex) => (
              <AnimateOnScroll key={category.name} animation="fadeInUp" delay={catIndex * 0.1}>
                <div>
                  <h2 className="font-serif text-2xl text-neutral-900 mb-8">
                    {category.name}
                  </h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, index) => (
                      <div
                        key={faq.question}
                        className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100"
                      >
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Question not answered?
            </h2>
            <p className="text-neutral-400 mb-8">
              Feel free to get in touch with us.
            </p>
            <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
              <Link href="/demo/contact">Contact us</Link>
            </Button>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
```

---

## Available page types

| Command | Page |
|---------|------|
| `/page pricing` | Pricing with 3 tiers |
| `/page portfolio` | Project showcase grid |
| `/page blog` | Blog overview |
| `/page faq` | FAQ per category |
| `/page team` | Extended team page |
| `/page careers` | Jobs/careers page |

## Instructions

1. First read the existing homepage to understand context
2. Use EXACTLY the same imports and code patterns
3. Adapt content to the business
4. Choose fitting photos for the industry
5. Maintain the same tone of voice

## IMPORTANT

- All pages go in `app/demo/[name]/page.tsx`
- Always use `"use client"` directive
- Imports must be exactly correct
- No lorem ipsum - real content
- Consistent style with rest of the site
