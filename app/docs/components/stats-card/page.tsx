"use client";

import { motion } from "framer-motion";
import { StatsCard, StatsGrid, Sparkline, MiniChart, Badge } from "@/components/ui";
import { CodeBlock, PropsTable, ComponentPreview } from "@/components/docs";

/**
 * StatsCard Component Documentation
 */

const sparklineData = [10, 25, 15, 30, 20, 45, 35, 50, 40, 60];

export default function StatsCardPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            Stats Card
          </motion.h1>
          <Badge variant="success">New</Badge>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-400"
        >
          Metrics cards with animated counters, sparklines, and trend indicators.
        </motion.p>
      </div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ComponentPreview
          code={`import { StatsCard } from "@/components/ui";

<StatsCard
  title="Revenue"
  value={45231}
  prefix="$"
  change={12.5}
  changeType="increase"
  sparklineData={[10, 25, 15, 30, 20, 45]}
/>`}
        >
          <StatsCard
            title="Revenue"
            value={45231}
            prefix="$"
            change={12.5}
            changeType="increase"
            sparklineData={sparklineData}
          />
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
          code={`import { StatsCard, StatsGrid, Sparkline, MiniChart } from "@/components/ui";`}
          language="tsx"
        />
      </motion.section>

      {/* Grid Layout */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Grid Layout
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Use <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm">StatsGrid</code> for
          responsive dashboard layouts.
        </p>
        <StatsGrid columns={4}>
          <StatsCard
            title="Total Revenue"
            value={45231}
            prefix="$"
            change={12.5}
            changeType="increase"
          />
          <StatsCard
            title="Subscriptions"
            value={2350}
            change={-2.1}
            changeType="decrease"
          />
          <StatsCard
            title="Active Users"
            value={12345}
            change={8.2}
            changeType="increase"
          />
          <StatsCard
            title="Conversion Rate"
            value={3.2}
            suffix="%"
            changeType="neutral"
          />
        </StatsGrid>
        <CodeBlock
          code={`<StatsGrid columns={4}>
  <StatsCard title="Revenue" value={45231} prefix="$" />
  <StatsCard title="Subscriptions" value={2350} />
  <StatsCard title="Active Users" value={12345} />
  <StatsCard title="Conversion" value={3.2} suffix="%" />
</StatsGrid>`}
          language="tsx"
        />
      </motion.section>

      {/* Variants */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Variants
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <StatsCard
            title="Default"
            value={1234}
            change={5.2}
            changeType="increase"
            variant="default"
          />
          <StatsCard
            title="Gradient"
            value={1234}
            change={5.2}
            changeType="increase"
            variant="gradient"
          />
          <StatsCard
            title="Bordered"
            value={1234}
            change={5.2}
            changeType="increase"
            variant="bordered"
          />
          <StatsCard
            title="Minimal"
            value={1234}
            change={5.2}
            changeType="increase"
            variant="minimal"
          />
        </div>
      </motion.section>

      {/* With Icon */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          With Icon
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <StatsCard
            title="Total Sales"
            value={23456}
            prefix="$"
            change={15.3}
            changeType="increase"
            icon={
              <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="New Users"
            value={567}
            change={8.1}
            changeType="increase"
            icon={
              <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </div>
      </motion.section>

      {/* Sparkline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Sparkline Component
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Use the standalone Sparkline component for inline charts.
        </p>
        <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-8">
            <div>
              <Sparkline data={sparklineData} color="#22c55e" height={40} />
              <p className="text-sm text-neutral-500 mt-2">Green (success)</p>
            </div>
            <div>
              <Sparkline data={sparklineData} color="#ef4444" height={40} />
              <p className="text-sm text-neutral-500 mt-2">Red (error)</p>
            </div>
            <div>
              <Sparkline data={sparklineData} color="#3b82f6" height={40} />
              <p className="text-sm text-neutral-500 mt-2">Blue (info)</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* MiniChart */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Mini Chart
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Compact charts for inline display with line or bar types.
        </p>
        <div className="flex items-center gap-8 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div>
            <MiniChart data={sparklineData} type="line" />
            <p className="text-sm text-neutral-500 mt-2">Line</p>
          </div>
          <div>
            <MiniChart data={sparklineData} type="bar" />
            <p className="text-sm text-neutral-500 mt-2">Bar</p>
          </div>
        </div>
      </motion.section>

      {/* Props */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Props
        </h2>
        <PropsTable
          props={[
            {
              name: "title",
              type: "string",
              required: true,
              description: "The metric label",
            },
            {
              name: "value",
              type: "number",
              required: true,
              description: "The numeric value to display",
            },
            {
              name: "prefix",
              type: "string",
              description: "Text before the value (e.g., $)",
            },
            {
              name: "suffix",
              type: "string",
              description: "Text after the value (e.g., %)",
            },
            {
              name: "change",
              type: "number",
              description: "Percentage change value",
            },
            {
              name: "changeType",
              type: '"increase" | "decrease" | "neutral"',
              default: '"neutral"',
              description: "Type of change for styling",
            },
            {
              name: "changePeriod",
              type: "string",
              default: '"vs last period"',
              description: "Description of the comparison period",
            },
            {
              name: "icon",
              type: "React.ReactNode",
              description: "Icon to display",
            },
            {
              name: "sparklineData",
              type: "number[]",
              description: "Data points for sparkline chart",
            },
            {
              name: "variant",
              type: '"default" | "gradient" | "bordered" | "minimal"',
              default: '"default"',
              description: "Visual style variant",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Size of the card",
            },
          ]}
        />
      </motion.section>
    </div>
  );
}
