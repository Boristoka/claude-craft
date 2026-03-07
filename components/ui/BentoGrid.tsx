"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Bento Grid - Trendy asymmetric grid layout
 * Inspired by Apple, Linear, and modern SaaS landing pages
 *
 * @example
 * <BentoGrid>
 *   <BentoCard size="large" title="Feature" description="..." />
 *   <BentoCard size="small" title="Feature" description="..." />
 * </BentoGrid>
 */

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  size?: "small" | "medium" | "large" | "wide" | "tall";
  className?: string;
  gradient?: "none" | "subtle" | "vibrant";
  href?: string;
}

export function BentoCard({
  title,
  description,
  icon,
  children,
  size = "medium",
  className,
  gradient = "subtle",
  href,
}: BentoCardProps) {
  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-1 md:col-span-1",
    large: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
    wide: "col-span-1 md:col-span-2 row-span-1",
    tall: "col-span-1 row-span-1 md:row-span-2",
  };

  const gradientClasses = {
    none: "bg-neutral-50 dark:bg-neutral-900",
    subtle: "bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800",
    vibrant: "bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950 dark:via-neutral-900 dark:to-accent-950",
  };

  const Content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl md:rounded-3xl border border-neutral-200 dark:border-neutral-800",
        "p-6 md:p-8 h-full min-h-[200px]",
        "transition-shadow duration-300",
        "hover:shadow-xl hover:shadow-neutral-900/5 dark:hover:shadow-neutral-100/5",
        sizeClasses[size],
        gradientClasses[gradient],
        href && "cursor-pointer",
        className
      )}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
            {icon}
          </div>
        )}

        <h3 className="font-semibold text-lg md:text-xl text-neutral-900 dark:text-white mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed flex-grow">
            {description}
          </p>
        )}

        {children && (
          <div className="mt-4 flex-grow">
            {children}
          </div>
        )}

        {href && (
          <div className="mt-4 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
            Learn more
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        )}
      </div>

      {/* Corner decoration for large cards */}
      {size === "large" && (
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-3xl" />
      )}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{Content}</a>;
  }

  return Content;
}

// Pre-built icon components for common use cases
export const BentoIcons = {
  Zap: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Code: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};
