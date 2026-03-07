"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll, StaggerChildren, CountUp } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const features = [
  {
    title: "Beautiful by default",
    description: "Every component is crafted with attention to detail. No more generic AI aesthetics.",
  },
  {
    title: "Production ready",
    description: "Built with Next.js 16, Tailwind CSS 4, and Framer Motion. Ready to deploy.",
  },
  {
    title: "Claude Code optimized",
    description: "CLAUDE.md instructions help AI understand your design system perfectly.",
  },
  {
    title: "Fully customizable",
    description: "Design tokens make it easy to adapt colors, typography, and spacing.",
  },
];

const components = [
  "Button", "Card", "Badge", "Input", "Textarea", "Select", "Avatar",
  "Modal", "Tabs", "Accordion", "Toast", "Tooltip", "Progress",
  "Switch", "Skeleton", "ParallaxImage", "AnimateOnScroll",
  "CountUp", "Navbar", "Footer", "StatsSection", "FAQSection", "LogoCloud",
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* ========================================
          NAVBAR
          ======================================== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between h-14 px-6 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/60 shadow-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">UI</span>
              </div>
              <span className="font-semibold text-neutral-900">Claude UI Kit</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                Features
              </a>
              <a href="#components" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                Components
              </a>
              <Link href="/demo" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                Demo
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <Button size="sm" asChild>
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* ========================================
          HERO - Full bleed image with overlay
          ======================================== */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroImageY }}
        >
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=85"
            alt="Abstract gradient"
            className="w-full h-[120%] object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/30 to-neutral-900/70" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative h-full flex flex-col justify-end pb-20 md:pb-32"
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
                  Open Source UI Kit
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]"
              >
                Build websites that feel{" "}
                <em className="italic">crafted</em>, not generated
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed"
              >
                A thoughtfully designed component library for developers using Claude Code.
                Beautiful defaults, elegant typography, and smooth animations.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
                  <Link href="/demo">
                    Explore Demo
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
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

      {/* ========================================
          FEATURES - Clean grid with whitespace
          ======================================== */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mb-20">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              Designed for developers who care about{" "}
              <span className="text-gradient">aesthetics</span>
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Stop settling for generic templates. Build something you're proud to share.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
            {features.map((feature, index) => (
              <AnimateOnScroll
                key={feature.title}
                animation="fadeInUp"
                delay={index * 0.1}
                className="group"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                    <span className="font-serif text-lg">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          COMPONENTS - Minimal showcase
          ======================================== */}
      <section id="components" className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll animation="fadeInUp">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
                <CountUp end={20} />+ components, infinite possibilities
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                From buttons to complex animations. Everything you need to build
                professional websites that stand out.
              </p>
              <Button variant="outline" asChild>
                <Link href="/demo">
                  See all components
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {components.map((component, index) => (
                  <motion.span
                    key={component}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="px-4 py-2 bg-white rounded-full text-sm text-neutral-700 border border-neutral-200 hover:border-neutral-400 hover:shadow-sm transition-all cursor-default"
                  >
                    {component}
                  </motion.span>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========================================
          DEMO PREVIEW - Screenshot/visual
          ======================================== */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              See it in action
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A complete business website template showcasing all components working together.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeInUp" delay={0.2}>
            <Link href="/demo" className="block group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/50">
                {/* Browser chrome */}
                <div className="bg-neutral-100 px-4 py-3 flex items-center gap-2 border-b border-neutral-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-neutral-300" />
                    <div className="w-3 h-3 rounded-full bg-neutral-300" />
                    <div className="w-3 h-3 rounded-full bg-neutral-300" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-white rounded-md text-xs text-neutral-500 border border-neutral-200">
                      localhost:3000/demo
                    </div>
                  </div>
                </div>

                {/* Preview image */}
                <div className="aspect-[16/9] bg-gradient-to-br from-primary-50 via-white to-accent-50 relative">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
                    alt="Demo preview"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Overlay with CTA */}
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition-colors duration-500 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="px-6 py-3 bg-white rounded-full text-neutral-900 font-medium shadow-lg">
                        Explore Demo →
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========================================
          CTA - Clean and simple
          ======================================== */}
      <section className="py-32 bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Ready to build something{" "}
              <em className="italic">beautiful</em>?
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
              Clone the repository, open Claude Code, and start creating.
              It's that simple.
            </p>

            {/* Code snippet */}
            <div className="bg-neutral-800 rounded-xl p-6 mb-10 text-left max-w-lg mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <code className="text-sm text-neutral-300 font-mono">
                <span className="text-neutral-500">$</span> git clone github.com/claude-ui-kit
                <br />
                <span className="text-neutral-500">$</span> cd claude-ui-kit && npm install
                <br />
                <span className="text-neutral-500">$</span> npm run dev
              </code>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
                <Link href="/demo">
                  View Demo
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  Star on GitHub
                </a>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========================================
          FOOTER - Minimal
          ======================================== */}
      <footer className="py-8 bg-neutral-900 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">UI</span>
              </div>
              <span>Claude UI Kit</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/demo" className="hover:text-white transition-colors">Demo</Link>
              <a href="https://github.com" className="hover:text-white transition-colors">GitHub</a>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
