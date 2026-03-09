"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/docs";
import { Button } from "@/components/ui";

/**
 * Dark Mode Documentation
 */

export default function DarkModePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Dark Mode
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-400"
        >
          All components support dark mode out of the box using Tailwind CSS.
        </motion.p>
      </div>

      {/* How it works */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Claude Craft uses the <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">class</code> strategy
          for dark mode. When the <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">dark</code> class
          is present on the <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">html</code> element,
          dark mode styles are applied.
        </p>

        <CodeBlock
          code={`<!-- Light mode -->
<html>
  <body>...</body>
</html>

<!-- Dark mode -->
<html class="dark">
  <body>...</body>
</html>`}
          language="html"
        />
      </motion.section>

      {/* Theme Switcher */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Theme Switcher Component
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          We include a ready-to-use theme switcher component:
        </p>

        <CodeBlock
          code={`import { ThemeSwitcher } from "@/components/ui";

export function Header() {
  return (
    <header>
      <nav>...</nav>
      <ThemeSwitcher />
    </header>
  );
}`}
          language="tsx"
        />
      </motion.section>

      {/* Manual Implementation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Manual Implementation
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Or build your own theme toggle:
        </p>

        <CodeBlock
          code={`"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check system preference
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("theme");

    if (stored) {
      setTheme(stored as "light" | "dark");
    } else if (isDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return { theme, toggle };
}`}
          language="tsx"
          filename="hooks/useTheme.ts"
        />
      </motion.section>

      {/* Dark Mode Classes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Using Dark Mode Classes
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Use the <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">dark:</code> prefix
          for dark mode styles:
        </p>

        <CodeBlock
          code={`<div className="bg-white dark:bg-neutral-900">
  <h1 className="text-neutral-900 dark:text-white">
    Heading
  </h1>
  <p className="text-neutral-600 dark:text-neutral-400">
    Body text
  </p>
</div>`}
          language="tsx"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-3 text-left font-medium text-neutral-900 dark:text-white">Element</th>
                <th className="py-3 text-left font-medium text-neutral-900 dark:text-white">Light</th>
                <th className="py-3 text-left font-medium text-neutral-900 dark:text-white">Dark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {[
                { element: "Background", light: "bg-white", dark: "dark:bg-neutral-900" },
                { element: "Card", light: "bg-neutral-50", dark: "dark:bg-neutral-800" },
                { element: "Heading", light: "text-neutral-900", dark: "dark:text-white" },
                { element: "Body text", light: "text-neutral-600", dark: "dark:text-neutral-400" },
                { element: "Muted text", light: "text-neutral-400", dark: "dark:text-neutral-500" },
                { element: "Border", light: "border-neutral-200", dark: "dark:border-neutral-800" },
              ].map((row) => (
                <tr key={row.element}>
                  <td className="py-3 text-neutral-900 dark:text-white">{row.element}</td>
                  <td className="py-3">
                    <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">
                      {row.light}
                    </code>
                  </td>
                  <td className="py-3">
                    <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">
                      {row.dark}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Preview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Preview
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-white border border-neutral-200">
            <p className="text-sm text-neutral-500 mb-4">Light Mode</p>
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-900">Card Title</h3>
              <p className="text-neutral-600">This is how text looks in light mode.</p>
              <Button>Click me</Button>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
            <p className="text-sm text-neutral-500 mb-4">Dark Mode</p>
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Card Title</h3>
              <p className="text-neutral-400">This is how text looks in dark mode.</p>
              <Button>Click me</Button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
