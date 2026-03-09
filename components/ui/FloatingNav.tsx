"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

/**
 * FloatingNav - Navigation that appears on scroll
 * Smart navbar that hides on scroll down and shows on scroll up
 *
 * @example
 * <FloatingNav
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "About", href: "/about" },
 *   ]}
 * />
 */

interface FloatingNavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

interface FloatingNavProps {
  items: FloatingNavItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "default" | "pill" | "glass" | "minimal";
  position?: "top" | "bottom";
  showOnScrollUp?: boolean;
  hideThreshold?: number;
  className?: string;
}

export function FloatingNav({
  items,
  logo,
  actions,
  variant = "default",
  position = "top",
  showOnScrollUp = true,
  hideThreshold = 100,
  className,
}: FloatingNavProps) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [hasScrolled, setHasScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if we've scrolled past threshold
    if (latest > hideThreshold) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
      setIsVisible(true);
      setLastScrollY(latest);
      return;
    }

    // Show/hide based on scroll direction
    if (showOnScrollUp) {
      if (latest < lastScrollY) {
        setIsVisible(true);
      } else if (latest > lastScrollY && latest > hideThreshold) {
        setIsVisible(false);
      }
    }
    setLastScrollY(latest);
  });

  const variantClasses = {
    default: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg",
    pill: "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xl",
    glass: "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg",
    minimal: "bg-transparent",
  };

  const containerClasses = cn(
    "fixed left-1/2 -translate-x-1/2 z-50",
    position === "top" ? "top-4" : "bottom-4",
    className
  );

  return (
    <AnimatePresence>
      {(isVisible || !hasScrolled) && (
        <motion.nav
          initial={{ y: position === "top" ? -100 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: position === "top" ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={containerClasses}
        >
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-2 rounded-full",
              variantClasses[variant]
            )}
          >
            {/* Logo */}
            {logo && <div className="px-3">{logo}</div>}

            {/* Nav items */}
            <div className="flex items-center">
              {items.map((item) => (
                <FloatingNavLink
                  key={item.label}
                  item={item}
                  variant={variant}
                />
              ))}
            </div>

            {/* Actions */}
            {actions && <div className="pl-2">{actions}</div>}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/**
 * FloatingNavLink - Individual nav link
 */
function FloatingNavLink({
  item,
  variant,
}: {
  item: FloatingNavItem;
  variant: string;
}) {
  const activeClasses = {
    default: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white",
    pill: "bg-white/20 text-white dark:text-neutral-900",
    glass: "bg-neutral-900/10 dark:bg-white/10 text-neutral-900 dark:text-white",
    minimal: "text-neutral-900 dark:text-white",
  };

  const hoverClasses = {
    default: "hover:bg-neutral-100 dark:hover:bg-neutral-800",
    pill: "hover:bg-white/10",
    glass: "hover:bg-neutral-900/5 dark:hover:bg-white/5",
    minimal: "hover:text-neutral-900 dark:hover:text-white",
  };

  return (
    <motion.a
      href={item.href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
        item.isActive
          ? activeClasses[variant as keyof typeof activeClasses]
          : cn(
              variant === "pill"
                ? "text-white/70 dark:text-neutral-400"
                : "text-neutral-600 dark:text-neutral-400",
              hoverClasses[variant as keyof typeof hoverClasses]
            )
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {item.icon && <span className="w-4 h-4">{item.icon}</span>}
      {item.label}
    </motion.a>
  );
}

/**
 * StickyHeader - Header that becomes sticky after scrolling
 */
interface StickyHeaderProps {
  children: React.ReactNode;
  threshold?: number;
  stickyClassName?: string;
  className?: string;
}

export function StickyHeader({
  children,
  threshold = 100,
  stickyClassName,
  className,
}: StickyHeaderProps) {
  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsSticky(latest > threshold);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSticky && cn("shadow-lg", stickyClassName),
        className
      )}
      animate={{
        backgroundColor: isSticky ? "rgba(255, 255, 255, 0.95)" : "transparent",
        backdropFilter: isSticky ? "blur(8px)" : "none",
      }}
    >
      {children}
    </motion.header>
  );
}

/**
 * ScrollProgress - Progress bar showing scroll position
 */
interface ScrollProgressProps {
  position?: "top" | "bottom";
  color?: string;
  height?: number;
  className?: string;
}

export function ScrollProgress({
  position = "top",
  color = "rgb(23, 23, 23)",
  height = 3,
  className,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 z-50",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{
        height,
        scaleX: scrollYProgress,
        backgroundColor: color,
        transformOrigin: "left",
      }}
    />
  );
}

/**
 * BackToTop - Floating back to top button
 */
interface BackToTopProps {
  threshold?: number;
  position?: "left" | "right";
  variant?: "default" | "pill" | "circle";
  className?: string;
}

export function BackToTop({
  threshold = 400,
  position = "right",
  variant = "circle",
  className,
}: BackToTopProps) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > threshold);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const variantClasses = {
    default: "px-4 py-2 rounded-lg",
    pill: "px-4 py-2 rounded-full",
    circle: "w-12 h-12 rounded-full",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 z-40 flex items-center justify-center",
            "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900",
            "shadow-lg hover:shadow-xl transition-shadow",
            variantClasses[variant],
            position === "right" ? "right-6" : "left-6",
            className
          )}
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * TableOfContents - Floating TOC for long articles
 */
interface TOCItem {
  id: string;
  label: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  activeId?: string;
  position?: "left" | "right";
  className?: string;
}

export function TableOfContents({
  items,
  activeId,
  position = "right",
  className,
}: TableOfContentsProps) {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40",
        position === "right" ? "right-6" : "left-6",
        className
      )}
    >
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg p-4 max-w-[200px]">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
          On this page
        </h4>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToId(item.id)}
                className={cn(
                  "block text-left text-sm transition-colors w-full truncate",
                  item.level && item.level > 1 && "pl-3",
                  activeId === item.id
                    ? "text-neutral-900 dark:text-white font-medium"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/**
 * BottomNav - Mobile bottom navigation
 */
interface BottomNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
  badge?: number;
}

interface BottomNavProps {
  items: BottomNavItem[];
  className?: string;
}

export function BottomNav({ items, className }: BottomNavProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900",
        "border-t border-neutral-200 dark:border-neutral-800 safe-area-pb",
        className
      )}
    >
      <div className="flex items-center justify-around h-16">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full relative",
              "transition-colors",
              item.isActive
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-500 dark:text-neutral-400"
            )}
          >
            <span className="relative">
              {item.icon}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </span>
            <span className="text-xs mt-1">{item.label}</span>
            {item.isActive && (
              <motion.div
                layoutId="bottomNavIndicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-neutral-900 dark:bg-white rounded-full"
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
