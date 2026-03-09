"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CodeBlock } from "./CodeBlock";

/**
 * ComponentPreview - Live preview with code toggle
 */

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
  description?: string;
  className?: string;
}

export function ComponentPreview({
  children,
  code,
  title,
  description,
  className,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden", className)}>
      {/* Header */}
      {(title || description) && (
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
          {title && (
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Preview */}
      <div className="p-6 bg-white dark:bg-neutral-900 min-h-[120px] flex items-center justify-center">
        <div className="w-full">
          {children}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              showCode
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code
          </button>
        </div>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code panel */}
      {showCode && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-neutral-200 dark:border-neutral-800"
        >
          <CodeBlock code={code} showLineNumbers />
        </motion.div>
      )}
    </div>
  );
}

/**
 * VariantShowcase - Display all variants of a component
 */
interface Variant {
  name: string;
  value: string;
  component: React.ReactNode;
}

interface VariantShowcaseProps {
  title?: string;
  variants: Variant[];
  className?: string;
}

export function VariantShowcase({
  title = "Variants",
  variants,
  className,
}: VariantShowcaseProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {title}
        </h3>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {variants.map((variant) => (
          <div
            key={variant.value}
            className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
          >
            <div className="mb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {variant.name}
            </div>
            <div className="flex items-center justify-center min-h-[60px]">
              {variant.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * DemoContainer - Container for component demos
 */
interface DemoContainerProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  background?: "white" | "gray" | "dark" | "gradient";
}

export function DemoContainer({
  children,
  className,
  centered = true,
  padding = "md",
  background = "white",
}: DemoContainerProps) {
  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-8",
    lg: "p-12",
  };

  const backgroundClasses = {
    white: "bg-white dark:bg-neutral-900",
    gray: "bg-neutral-50 dark:bg-neutral-800",
    dark: "bg-neutral-900 dark:bg-neutral-950",
    gradient: "bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900",
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden",
        paddingClasses[padding],
        backgroundClasses[background],
        centered && "flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
