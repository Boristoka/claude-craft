"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } from "@/components/ui";
import { CodeBlock, PropsTable, ComponentPreview } from "@/components/docs";

/**
 * Card Component Documentation
 */

export default function CardPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Card
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-400"
        >
          Displays content in a contained, elevated surface.
        </motion.p>
      </div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ComponentPreview
          code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/components/ui";

export default function Example() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your content here</p>
      </CardContent>
      <CardFooter>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}`}
        >
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-400">Your content here</p>
            </CardContent>
            <CardFooter>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
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
          code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui";`}
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
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardDescription>Default</CardDescription>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-400">
                The default card with subtle border and shadow.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardDescription>Elevated</CardDescription>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-400">
                More prominent shadow for emphasis.
              </p>
            </CardContent>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <CardDescription>Outlined</CardDescription>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-400">
                Border only, no shadow.
              </p>
            </CardContent>
          </Card>

          <Card variant="ghost">
            <CardHeader>
              <CardDescription>Ghost</CardDescription>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-400">
                Minimal styling for subtle grouping.
              </p>
            </CardContent>
          </Card>
        </div>

        <CodeBlock
          code={`<Card variant="default">...</Card>
<Card variant="elevated">...</Card>
<Card variant="outline">...</Card>
<Card variant="ghost">...</Card>`}
          language="tsx"
        />
      </motion.section>

      {/* Interactive */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Interactive Card
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Add hover effects with custom classes or use the <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">elevated</code> variant.
        </p>
        <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <Card variant="elevated" className="w-[300px] hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Hover me</CardTitle>
              <CardDescription>This card has hover effects</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <CodeBlock
          code={`<Card variant="elevated" className="hover:shadow-xl transition-shadow cursor-pointer">
  <CardHeader>
    <CardTitle>Hover me</CardTitle>
    <CardDescription>This card has hover effects</CardDescription>
  </CardHeader>
</Card>`}
          language="tsx"
        />
      </motion.section>

      {/* With Image */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          With Image
        </h2>
        <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <Card className="w-[350px] overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500" />
            <CardHeader>
              <Badge className="w-fit">New</Badge>
              <CardTitle>Featured Project</CardTitle>
              <CardDescription>A beautiful gradient header example</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full">View Project</Button>
            </CardFooter>
          </Card>
        </div>
      </motion.section>

      {/* Props */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Props
        </h2>
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"default" | "elevated" | "outline" | "ghost"',
              default: '"default"',
              description: "The visual style of the card",
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
