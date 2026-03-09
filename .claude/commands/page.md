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
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO - Full bleed with parallax */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[400px] overflow-hidden -mt-20">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="[HERO IMAGE - professional/business themed]"
            alt="Pricing"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900/80" />
        </motion.div>

        <motion.div
          className="relative h-full flex flex-col justify-end pb-16 md:pb-24 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={fadeUp}>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-6">
                  Pricing
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Transparent <em className="italic">pricing</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed"
              >
                [PRICING INTRO - no hidden costs, etc.]
              </motion.p>
            </motion.div>
          </div>
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

Use the `ProjectCard` component for a premium look:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ProjectCard, ProjectGrid, FeaturedProject } from "@/components/ui/ProjectCard";
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
    description: "[SHORT DESCRIPTION]",
    image: "[UNSPLASH URL]",
    tags: ["[TAG1]", "[TAG2]"],
    year: "2024",
  },
  // ... more projects (6-9 items)
];

export default function PortfolioPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO - Full bleed with parallax */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden -mt-20">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="[HERO IMAGE - relevant to portfolio]"
            alt="Our work"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/30 to-neutral-900/70" />
        </motion.div>

        <motion.div
          className="relative h-full flex flex-col justify-end pb-16 md:pb-24 pt-20"
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
                  Portfolio
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Our <em className="italic">work</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                [PORTFOLIO INTRO]
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS GRID - using ProjectCard component */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <ProjectGrid columns={3}>
            {projects.map((project, index) => (
              <AnimateOnScroll key={project.title} animation="fadeInUp" delay={index * 0.1}>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  year={project.year}
                  href={`/demo/portfolio/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                />
              </AnimateOnScroll>
            ))}
          </ProjectGrid>
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

Use the `BlogCard` component for a premium look:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlogCard, BlogGrid } from "@/components/ui/BlogCard";
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
    readTime: "[X min read]",
    category: "[CATEGORY]",
    author: { name: "[AUTHOR]", avatar: "[AVATAR URL]" },
  },
  // ... more articles (6-9 items)
];

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO - Full bleed with parallax */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] overflow-hidden -mt-20">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="[HERO IMAGE - editorial/writing themed]"
            alt="Blog"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900/80" />
        </motion.div>

        <motion.div
          className="relative h-full flex flex-col justify-end pb-16 md:pb-24 pt-20"
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
                  Blog
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Insights & <em className="italic">stories</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                [BLOG INTRO]
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FEATURED POST - using BlogCard with featured prop */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <BlogCard
            featured
            title={posts[0].title}
            excerpt={posts[0].excerpt}
            image={posts[0].image}
            author={posts[0].author}
            date={posts[0].date}
            readTime={posts[0].readTime}
            category={posts[0].category}
            href="/demo/blog/[slug]"
          />
        </div>
      </section>

      {/* ALL POSTS - using BlogGrid */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-neutral-900">
              All articles
            </h2>
          </AnimateOnScroll>

          <BlogGrid columns={3}>
            {posts.slice(1).map((post) => (
              <BlogCard
                key={post.title}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                category={post.category}
                href="/demo/blog/[slug]"
              />
            ))}
          </BlogGrid>
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
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO - Full bleed with parallax */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[400px] overflow-hidden -mt-20">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="[HERO IMAGE - helpful/support themed]"
            alt="FAQ"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900/80" />
        </motion.div>

        <motion.div
          className="relative h-full flex flex-col justify-end pb-16 md:pb-24 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={fadeUp}>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-6">
                  FAQ
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Frequently asked <em className="italic">questions</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed"
              >
                [FAQ INTRO - answers to the most common questions]
              </motion.p>
            </motion.div>
          </div>
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

### Team (`/page team`)

Use the `TeamCard` component for team member displays:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { TeamCard, TeamGrid } from "@/components/ui/TeamCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll, CountUp } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const team = [
  {
    name: "[NAME]",
    role: "[ROLE]",
    image: "[PORTRAIT PHOTO]",
    bio: "[SHORT BIO - optional]",
    social: {
      linkedin: "[URL]",
      twitter: "[URL]",
    },
  },
  // ... more team members
];

export default function TeamPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* HERO - Full bleed with parallax */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] overflow-hidden -mt-20">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="[HERO IMAGE - team/collaboration themed]"
            alt="Our team"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/30 to-neutral-900/70" />
        </motion.div>

        <motion.div
          className="relative h-full flex flex-col justify-end pb-16 md:pb-24 pt-20"
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
                  Our Team
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Meet the <em className="italic">people</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                [TEAM INTRO]
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* TEAM GRID - using TeamCard component */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <TeamGrid columns={4}>
            {team.map((member) => (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
                social={member.social}
              />
            ))}
          </TeamGrid>
        </div>
      </section>

      {/* For leadership, use variant="overlay" */}
      {/* <TeamCard variant="overlay" bio={member.bio} ... /> */}

      {/* CTA */}
      <section className="py-24 bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Join our <em className="italic">team</em>
            </h2>
            <p className="text-neutral-400 mb-8">
              We're always looking for talented people.
            </p>
            <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
              <Link href="/demo/contact">View open positions</Link>
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
