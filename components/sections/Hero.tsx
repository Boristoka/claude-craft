"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Hero Component - Claude UI Kit
 *
 * A distinctive, editorial-style hero that showcases the UI kit.
 * Features asymmetric layout, serif headlines, and live component previews.
 */

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen overflow-hidden bg-cream",
        className
      )}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--gray-400) 1px, transparent 1px),
            linear-gradient(90deg, var(--gray-400) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-40">
        <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
          <circle cx="600" cy="0" r="400" fill="url(#hero-gradient)" />
          <defs>
            <radialGradient id="hero-gradient" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="hsl(var(--primary-h) var(--primary-s) var(--primary-l) / 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="pt-24 pb-12 lg:pt-32 lg:pb-20">

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wide uppercase rounded-full bg-secondary/10 text-secondary-dark border border-secondary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Open Source UI Kit
            </span>
          </motion.div>

          {/* Main headline - editorial style */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] tracking-tight text-gray-900 mb-6">
                Components that{" "}
                <span className="relative">
                  <span className="gradient-text">developers</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0 8 Q50 0, 100 8 T200 8" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
                {" "}actually want to use
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl text-balance">
                Stop building the same UI from scratch. A thoughtfully crafted component library that makes Claude Code output look{" "}
                <em className="font-display not-italic text-gray-900">genuinely good</em>.
              </p>
            </motion.div>

            {/* Right side info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:pt-8"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Warm, Not Generic</p>
                    <p className="text-gray-600 text-sm">No more blue/purple AI gradients. A palette that feels human.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Claude-Native</p>
                    <p className="text-gray-600 text-sm">TypeScript interfaces that AI understands perfectly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Motion Built-In</p>
                    <p className="text-gray-600 text-sm">Framer Motion animations that feel natural, not forced.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mt-12"
          >
            <a
              href="#components"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
            >
              Explore Components
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
          </motion.div>
        </div>

        {/* Component showcase area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pb-24"
        >
          <ComponentShowcase />
        </motion.div>
      </div>
    </section>
  );
}

// Live component preview - shows actual UI kit components
function ComponentShowcase() {
  return (
    <div className="relative">
      {/* Background card */}
      <div className="absolute inset-0 bg-white rounded-2xl shadow-xl shadow-gray-900/5 border border-gray-100" />

      {/* Content */}
      <div className="relative p-6 lg:p-8">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-gray-100">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-gray-50 rounded-md text-sm text-gray-500 font-mono">
              localhost:3000
            </div>
          </div>
        </div>

        {/* Component grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Buttons preview */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Buttons</p>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-shadow">
                Primary
              </button>
              <button className="px-4 py-2 bg-secondary text-white font-medium rounded-lg text-sm">
                Secondary
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 font-medium rounded-lg text-sm border border-gray-200">
                Outline
              </button>
            </div>
          </div>

          {/* Card preview */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Cards</p>
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 mb-3" />
              <p className="font-semibold text-gray-900 text-sm">Feature Card</p>
              <p className="text-xs text-gray-500 mt-1">With hover animations</p>
            </div>
          </div>

          {/* Badges preview */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Badges</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-primary/10 text-primary-dark text-xs font-medium rounded-full">
                New
              </span>
              <span className="px-2.5 py-1 bg-secondary/10 text-secondary-dark text-xs font-medium rounded-full">
                Updated
              </span>
              <span className="px-2.5 py-1 bg-accent/15 text-accent-dark text-xs font-medium rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Live
              </span>
            </div>
          </div>
        </div>

        {/* Code snippet teaser */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Quick Start</p>
            <button className="text-xs text-primary hover:text-primary-dark font-medium">
              Copy code
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-gray-300">
              <span className="text-purple-400">import</span>
              <span className="text-white">{" { "}</span>
              <span className="text-amber-300">Button</span>
              <span className="text-white">{", "}</span>
              <span className="text-amber-300">Card</span>
              <span className="text-white">{" } "}</span>
              <span className="text-purple-400">from</span>
              <span className="text-green-400">{" '@/components'"}</span>
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
