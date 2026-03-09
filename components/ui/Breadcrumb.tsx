"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Breadcrumb - Animated breadcrumb navigation
 * Essential navigation component for multi-level sites
 *
 * @example
 * <Breadcrumb
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Products", href: "/products" },
 *     { label: "Shoes", href: "/products/shoes" },
 *   ]}
 * />
 */

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "slash" | "chevron" | "arrow" | "dot";
  variant?: "default" | "pills" | "underline" | "minimal";
  size?: "sm" | "md" | "lg";
  showHomeIcon?: boolean;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = "chevron",
  variant = "default",
  size = "md",
  showHomeIcon = true,
  className,
}: BreadcrumbProps) {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const getSeparator = () => {
    switch (separator) {
      case "slash":
        return <span className="mx-2 text-neutral-400">/</span>;
      case "arrow":
        return (
          <svg className="w-4 h-4 mx-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        );
      case "dot":
        return <span className="mx-2 w-1 h-1 rounded-full bg-neutral-400" />;
      default:
        return (
          <svg className="w-4 h-4 mx-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
    }
  };

  const HomeIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  if (variant === "pills") {
    return (
      <nav aria-label="Breadcrumb" className={cn("flex items-center flex-wrap gap-2", sizeClasses[size], className)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              {index > 0 && getSeparator()}
              {isLast ? (
                <span className="px-3 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium">
                  {isFirst && showHomeIcon ? (
                    <span className="flex items-center gap-1.5">
                      <HomeIcon />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {isFirst && showHomeIcon ? (
                    <span className="flex items-center gap-1.5">
                      <HomeIcon />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </a>
              )}
            </motion.div>
          );
        })}
      </nav>
    );
  }

  if (variant === "underline") {
    return (
      <nav aria-label="Breadcrumb" className={cn("flex items-center flex-wrap", sizeClasses[size], className)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              {index > 0 && getSeparator()}
              {isLast ? (
                <span className="font-medium text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white pb-0.5">
                  {item.icon || (isFirst && showHomeIcon && <HomeIcon />)}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-b-2 hover:border-neutral-300 dark:hover:border-neutral-600 pb-0.5 transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon || (isFirst && showHomeIcon && <HomeIcon />)}
                    {item.label}
                  </span>
                </a>
              )}
            </motion.div>
          );
        })}
      </nav>
    );
  }

  if (variant === "minimal") {
    return (
      <nav aria-label="Breadcrumb" className={cn("flex items-center", sizeClasses[size], className)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <motion.span
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center"
            >
              {index > 0 && <span className="mx-1.5 text-neutral-300 dark:text-neutral-600">/</span>}
              {isLast ? (
                <span className="text-neutral-900 dark:text-white">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  {isFirst && showHomeIcon ? (
                    <HomeIcon />
                  ) : (
                    item.label
                  )}
                </a>
              )}
            </motion.span>
          );
        })}
      </nav>
    );
  }

  // Default variant
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center flex-wrap", sizeClasses[size], className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            {index > 0 && getSeparator()}
            {isLast ? (
              <span className="font-medium text-neutral-900 dark:text-white">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  {item.icon || (isFirst && showHomeIcon && <HomeIcon />)}
                  {item.label}
                </span>
              </a>
            )}
          </motion.div>
        );
      })}
    </nav>
  );
}

/**
 * BreadcrumbWithDropdown - Breadcrumb that collapses middle items
 */
interface BreadcrumbWithDropdownProps {
  items: BreadcrumbItem[];
  maxVisible?: number;
  className?: string;
}

export function BreadcrumbWithDropdown({
  items,
  maxVisible = 3,
  className,
}: BreadcrumbWithDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (items.length <= maxVisible) {
    return <Breadcrumb items={items} className={className} />;
  }

  const firstItem = items[0];
  const lastItems = items.slice(-maxVisible + 1);
  const hiddenItems = items.slice(1, -maxVisible + 1);

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      {/* First item */}
      <a
        href={firstItem.href}
        className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </a>

      <svg className="w-4 h-4 mx-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>

      {/* Dropdown for hidden items */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-1 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          •••
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 top-full mt-2 py-2 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 z-50 min-w-[160px]"
            >
              {hiddenItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Last items */}
      {lastItems.map((item, index) => {
        const isLast = index === lastItems.length - 1;

        return (
          <React.Fragment key={item.label}>
            <svg className="w-4 h-4 mx-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {isLast ? (
              <span className="font-medium text-neutral-900 dark:text-white">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

/**
 * PageHeader - Header with breadcrumb and title
 */
interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  breadcrumbs,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Breadcrumb items={breadcrumbs} variant="minimal" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-neutral-900 dark:text-white"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-neutral-600 dark:text-neutral-400"
            >
              {description}
            </motion.p>
          )}
        </div>

        {actions && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            {actions}
          </motion.div>
        )}
      </div>
    </div>
  );
}
