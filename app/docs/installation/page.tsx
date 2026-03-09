"use client";

import { motion } from "framer-motion";
import { CodeBlock, CodeTabs } from "@/components/docs";

/**
 * Installation Guide
 */

export default function InstallationPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Installation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-400"
        >
          Get started with Claude Craft in your Next.js project.
        </motion.p>
      </div>

      {/* Option 1: Clone */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Option 1: Clone the Repository
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          The fastest way to get started. Clone the entire project and start building.
        </p>
        <CodeBlock
          code={`git clone https://github.com/Boristoka/claude-craft.git my-project
cd my-project
npm install
npm run dev`}
          language="bash"
          filename="Terminal"
        />
      </motion.section>

      {/* Option 2: Copy Components */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Option 2: Copy Components
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Already have a Next.js project? Copy individual components as needed.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-white mb-3">
              1. Install dependencies
            </h3>
            <CodeTabs
              tabs={[
                { label: "npm", code: "npm install framer-motion clsx tailwind-merge", language: "bash" },
                { label: "yarn", code: "yarn add framer-motion clsx tailwind-merge", language: "bash" },
                { label: "pnpm", code: "pnpm add framer-motion clsx tailwind-merge", language: "bash" },
              ]}
            />
          </div>

          <div>
            <h3 className="font-medium text-neutral-900 dark:text-white mb-3">
              2. Add the utility function
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Create <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">lib/utils.ts</code>:
            </p>
            <CodeBlock
              code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
              language="tsx"
              filename="lib/utils.ts"
            />
          </div>

          <div>
            <h3 className="font-medium text-neutral-900 dark:text-white mb-3">
              3. Copy components
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Copy the components you need from <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">components/ui/</code> into your project.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Project Structure */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Project Structure
        </h2>
        <CodeBlock
          code={`├── app/
│   ├── globals.css          # Global styles & design tokens
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── demo/                # Demo pages
│   │   ├── layout.tsx       # Demo layout with nav
│   │   ├── page.tsx         # Demo homepage
│   │   └── [pages]/         # Feature pages
│   └── docs/                # Documentation
│
├── components/
│   ├── ui/                  # 70+ UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── ...
│   └── docs/                # Doc components
│
├── lib/
│   └── utils.ts             # Utility functions
│
└── public/                  # Static assets`}
          language="bash"
          filename="Project Structure"
        />
      </motion.section>

      {/* Tailwind Config */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Tailwind Configuration
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          We use Tailwind CSS v4 with custom design tokens. Here's the configuration:
        </p>
        <CodeBlock
          code={`@import "tailwindcss";

@theme {
  /* Typography */
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-serif: "DM Serif Display", Georgia, serif;

  /* Colors */
  --color-primary-500: #f97316;
  --color-primary-600: #ea580c;

  /* Spacing */
  --spacing-section: 8rem;

  /* Animations */
  --animate-fade-up: fade-up 0.5s ease-out;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}
          language="css"
          filename="app/globals.css"
        />
      </motion.section>

      {/* Next Steps */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 p-6"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          Next Steps
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-neutral-600 dark:text-neutral-400">
              <a href="/docs/theming" className="text-neutral-900 dark:text-white font-medium hover:underline">
                Customize your theme
              </a>
              {" "}— colors, fonts, and spacing
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-neutral-600 dark:text-neutral-400">
              <a href="/docs/components/button" className="text-neutral-900 dark:text-white font-medium hover:underline">
                Browse components
              </a>
              {" "}— find what you need
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-neutral-600 dark:text-neutral-400">
              <a href="/demo" className="text-neutral-900 dark:text-white font-medium hover:underline">
                Explore the demo
              </a>
              {" "}— see components in action
            </span>
          </li>
        </ul>
      </motion.section>
    </div>
  );
}
