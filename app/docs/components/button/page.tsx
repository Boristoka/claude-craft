"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { CodeBlock, PropsTable, ComponentPreview, VariantShowcase } from "@/components/docs";

/**
 * Button Component Documentation
 */

export default function ButtonPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Button
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-400"
        >
          Displays a button or a component that looks like a button.
        </motion.p>
      </div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ComponentPreview
          code={`import { Button } from "@/components/ui";

export default function Example() {
  return <Button>Click me</Button>;
}`}
        >
          <Button>Click me</Button>
        </ComponentPreview>
      </motion.div>

      {/* Installation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Installation
        </h2>
        <CodeBlock
          code={`import { Button } from "@/components/ui";`}
          language="tsx"
        />
      </motion.section>

      {/* Variants */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Variants
        </h2>
        <VariantShowcase
          title=""
          variants={[
            { name: "Default", value: "default", component: <Button>Default</Button> },
            { name: "Secondary", value: "secondary", component: <Button variant="secondary">Secondary</Button> },
            { name: "Outline", value: "outline", component: <Button variant="outline">Outline</Button> },
            { name: "Ghost", value: "ghost", component: <Button variant="ghost">Ghost</Button> },
            { name: "Destructive", value: "destructive", component: <Button variant="destructive">Destructive</Button> },
            { name: "Link", value: "link", component: <Button variant="link">Link</Button> },
          ]}
        />
        <CodeBlock
          code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
          language="tsx"
        />
      </motion.section>

      {/* Sizes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </div>
        <CodeBlock
          code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <PlusIcon />
</Button>`}
          language="tsx"
        />
      </motion.section>

      {/* With Icons */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          With Icons
        </h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
          </Button>
          <Button variant="outline">
            Continue
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
        <CodeBlock
          code={`<Button>
  <UploadIcon className="w-4 h-4 mr-2" />
  Upload
</Button>

<Button variant="outline">
  Continue
  <ArrowRightIcon className="w-4 h-4 ml-2" />
</Button>`}
          language="tsx"
        />
      </motion.section>

      {/* Loading State */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Loading State
        </h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <Button isLoading>Loading</Button>
          <Button isLoading variant="outline">Processing</Button>
        </div>
        <CodeBlock
          code={`<Button isLoading>Loading</Button>
<Button isLoading variant="outline">Processing</Button>`}
          language="tsx"
        />
      </motion.section>

      {/* Disabled */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Disabled
        </h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <Button disabled>Disabled</Button>
          <Button disabled variant="outline">Disabled</Button>
        </div>
      </motion.section>

      {/* As Link */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          As Link
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Use the <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">asChild</code> prop to render as a different element.
        </p>
        <CodeBlock
          code={`import Link from "next/link";

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>`}
          language="tsx"
        />
      </motion.section>

      {/* Props */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Props
        </h2>
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
              default: '"default"',
              description: "The visual style of the button",
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg" | "icon"',
              default: '"default"',
              description: "The size of the button",
            },
            {
              name: "isLoading",
              type: "boolean",
              default: "false",
              description: "Shows a isLoading spinner and disables the button",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the button",
            },
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description: "Render as a child component (for links)",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes",
            },
          ]}
        />
      </motion.section>
    </div>
  );
}
