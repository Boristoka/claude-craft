"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/docs";

/**
 * Theming Guide
 */

export default function ThemingPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Theming
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-400"
        >
          Customize colors, fonts, and design tokens to match your brand.
        </motion.p>
      </div>

      {/* Color Palette */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Color System
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          We use a neutral-based color system with customizable accent colors.
        </p>

        {/* Color swatches */}
        <div className="grid grid-cols-10 gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
            <div key={shade} className="space-y-1.5">
              <div
                className={`h-12 rounded-lg bg-neutral-${shade}`}
                style={{
                  backgroundColor: shade === 50 ? '#fafafa' :
                    shade === 100 ? '#f5f5f5' :
                    shade === 200 ? '#e5e5e5' :
                    shade === 300 ? '#d4d4d4' :
                    shade === 400 ? '#a3a3a3' :
                    shade === 500 ? '#737373' :
                    shade === 600 ? '#525252' :
                    shade === 700 ? '#404040' :
                    shade === 800 ? '#262626' :
                    shade === 900 ? '#171717' :
                    '#0a0a0a'
                }}
              />
              <p className="text-xs text-center text-neutral-500">{shade}</p>
            </div>
          ))}
        </div>

        <CodeBlock
          code={`/* Customize colors in globals.css */
@theme {
  /* Primary accent color */
  --color-primary-500: #f97316;  /* Orange */
  --color-primary-600: #ea580c;

  /* Or use a different palette */
  --color-primary-500: #3b82f6;  /* Blue */
  --color-primary-500: #8b5cf6;  /* Purple */
  --color-primary-500: #10b981;  /* Green */
}`}
          language="css"
          filename="app/globals.css"
        />
      </motion.section>

      {/* Typography */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Typography
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          We use a two-font system: serif for headings, sans-serif for body text.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <p className="text-sm text-neutral-500 mb-2">Headings</p>
            <p className="font-serif text-3xl text-neutral-900 dark:text-white">
              DM Serif Display
            </p>
          </div>
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <p className="text-sm text-neutral-500 mb-2">Body Text</p>
            <p className="text-xl text-neutral-900 dark:text-white">
              Plus Jakarta Sans
            </p>
          </div>
        </div>

        <CodeBlock
          code={`/* Font configuration */
@theme {
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-serif: "DM Serif Display", Georgia, serif;
}

/* Usage in components */
<h1 className="font-serif text-4xl">Heading</h1>
<p className="font-sans text-base">Body text</p>`}
          language="css"
          filename="Typography Setup"
        />
      </motion.section>

      {/* Spacing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Spacing Scale
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Consistent spacing creates visual rhythm. We use generous whitespace.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-2 text-left font-medium text-neutral-900 dark:text-white">Class</th>
                <th className="py-2 text-left font-medium text-neutral-900 dark:text-white">Size</th>
                <th className="py-2 text-left font-medium text-neutral-900 dark:text-white">Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {[
                { class: "gap-4", size: "1rem (16px)", use: "Between small elements" },
                { class: "gap-6", size: "1.5rem (24px)", use: "Between cards" },
                { class: "gap-8", size: "2rem (32px)", use: "Between sections in cards" },
                { class: "py-16", size: "4rem (64px)", use: "Small section padding" },
                { class: "py-24", size: "6rem (96px)", use: "Medium section padding" },
                { class: "py-32", size: "8rem (128px)", use: "Large section padding" },
              ].map((row) => (
                <tr key={row.class}>
                  <td className="py-2">
                    <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">
                      {row.class}
                    </code>
                  </td>
                  <td className="py-2 text-neutral-600 dark:text-neutral-400">{row.size}</td>
                  <td className="py-2 text-neutral-600 dark:text-neutral-400">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Border Radius */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Border Radius
        </h2>

        <div className="flex flex-wrap gap-4">
          {[
            { class: "rounded", label: "4px" },
            { class: "rounded-md", label: "6px" },
            { class: "rounded-lg", label: "8px" },
            { class: "rounded-xl", label: "12px" },
            { class: "rounded-2xl", label: "16px" },
            { class: "rounded-full", label: "9999px" },
          ].map((item) => (
            <div key={item.class} className="text-center">
              <div
                className={`w-16 h-16 bg-neutral-900 dark:bg-white ${item.class}`}
              />
              <p className="mt-2 text-xs text-neutral-500">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Shadows */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Shadows
        </h2>

        <div className="flex flex-wrap gap-6">
          {[
            { class: "shadow-sm", label: "sm" },
            { class: "shadow", label: "default" },
            { class: "shadow-md", label: "md" },
            { class: "shadow-lg", label: "lg" },
            { class: "shadow-xl", label: "xl" },
            { class: "shadow-2xl", label: "2xl" },
          ].map((item) => (
            <div key={item.class} className="text-center">
              <div
                className={`w-20 h-20 bg-white dark:bg-neutral-800 rounded-xl ${item.class}`}
              />
              <p className="mt-2 text-xs text-neutral-500">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CSS Variables */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Custom CSS Variables
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Define your own design tokens in <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">globals.css</code>:
        </p>

        <CodeBlock
          code={`@theme {
  /* Brand Colors */
  --color-brand: #f97316;
  --color-brand-dark: #ea580c;

  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-serif: "Playfair Display", Georgia, serif;
  --font-mono: "JetBrains Mono", monospace;

  /* Custom Animations */
  --animate-slide-up: slide-up 0.3s ease-out;
  --animate-fade-in: fade-in 0.2s ease-out;
}

@keyframes slide-up {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}`}
          language="css"
          filename="app/globals.css"
        />
      </motion.section>
    </div>
  );
}
