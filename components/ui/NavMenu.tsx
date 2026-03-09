"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

/**
 * NavMenu - Multiple navigation menu designs
 *
 * @example
 * <NavMenuMinimal logo="Brand" items={navItems} />
 * <NavMenuCentered logo={<Logo />} items={navItems} cta={{ label: "Get Started", href: "/signup" }} />
 * <NavMenuFloating items={navItems} />
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: React.ReactNode;
}

interface NavMenuBaseProps {
  items: NavItem[];
  logo?: React.ReactNode;
  cta?: {
    label: string;
    href: string;
  };
  className?: string;
}

// ============================================================================
// NavMenuMinimal - Clean, minimal navigation
// ============================================================================

interface NavMenuMinimalProps extends NavMenuBaseProps {
  variant?: "light" | "dark" | "transparent";
}

export function NavMenuMinimal({
  items,
  logo,
  cta,
  variant = "light",
  className,
}: NavMenuMinimalProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const variantClasses = {
    light: "bg-white border-b border-neutral-200",
    dark: "bg-neutral-900 text-white border-b border-neutral-800",
    transparent: "bg-transparent",
  };

  const textClasses = {
    light: "text-neutral-600 hover:text-neutral-900",
    dark: "text-neutral-400 hover:text-white",
    transparent: "text-white/80 hover:text-white",
  };

  return (
    <nav className={cn(variantClasses[variant], className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <Link href="/" className={cn("font-semibold text-lg", variant === "light" ? "text-neutral-900" : "text-white")}>
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn("text-sm font-medium transition-colors", textClasses[variant])}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            {cta && (
              <Link
                href={cta.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  variant === "light"
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "bg-white text-neutral-900 hover:bg-neutral-100"
                )}
              >
                {cta.label}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 dark:border-neutral-800"
            >
              <div className="py-4 space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn("block py-2 text-sm font-medium", textClasses[variant])}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {cta && (
                  <Link
                    href={cta.href}
                    className={cn(
                      "block mt-4 px-4 py-2 rounded-full text-sm font-medium text-center",
                      variant === "light"
                        ? "bg-neutral-900 text-white"
                        : "bg-white text-neutral-900"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {cta.label}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ============================================================================
// NavMenuCentered - Logo in center, nav items on sides
// ============================================================================

export function NavMenuCentered({
  items,
  logo,
  cta,
  className,
}: NavMenuBaseProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const leftItems = items.slice(0, Math.ceil(items.length / 2));
  const rightItems = items.slice(Math.ceil(items.length / 2));

  return (
    <nav className={cn("bg-white border-b border-neutral-200", className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {leftItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex-shrink-0 mx-8">
            {typeof logo === "string" ? (
              <Link href="/" className="font-serif text-2xl text-neutral-900">
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
            {rightItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {cta && (
              <Link
                href={cta.href}
                className="px-4 py-2 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                {cta.label}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 py-4"
            >
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ============================================================================
// NavMenuFloating - Floating pill navigation (modern style)
// ============================================================================

interface NavMenuFloatingProps extends NavMenuBaseProps {
  position?: "top" | "bottom";
}

export function NavMenuFloating({
  items,
  logo,
  cta,
  position = "top",
  className,
}: NavMenuFloatingProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (position === "top") {
      // Hide on scroll down, show on scroll up
      if (latest > lastScrollY && latest > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(latest);
    }
  });

  return (
    <motion.nav
      initial={{ y: position === "top" ? -100 : 100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : position === "top" ? -100 : 100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50",
        position === "top" ? "top-4" : "bottom-4",
        className
      )}
    >
      <div className="flex items-center gap-1 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-full px-2 py-2 shadow-lg border border-neutral-200/50 dark:border-neutral-700/50">
        {/* Logo */}
        {logo && (
          <div className="px-3">
            {typeof logo === "string" ? (
              <Link href="/" className="font-semibold text-neutral-900 dark:text-white">
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>
        )}

        {/* Separator */}
        {logo && <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />}

        {/* Navigation Items */}
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
          >
            {item.label}
          </Link>
        ))}

        {/* CTA */}
        {cta && (
          <Link
            href={cta.href}
            className="ml-1 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </motion.nav>
  );
}

// ============================================================================
// NavMenuSplit - Logo left, CTA right, nav in middle
// ============================================================================

export function NavMenuSplit({
  items,
  logo,
  cta,
  className,
}: NavMenuBaseProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav className={cn("bg-white border-b border-neutral-100", className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <Link href="/" className="font-semibold text-xl text-neutral-900">
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-1">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            {cta && (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Log in
                </Link>
                <Link
                  href={cta.href}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  {cta.label}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-100 py-4"
            >
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-neutral-600"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ============================================================================
// NavMenuTransparent - For hero overlays
// ============================================================================

interface NavMenuTransparentProps extends NavMenuBaseProps {
  scrollThreshold?: number;
}

export function NavMenuTransparent({
  items,
  logo,
  cta,
  scrollThreshold = 100,
  className,
}: NavMenuTransparentProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > scrollThreshold);
  });

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <Link
                href="/"
                className={cn(
                  "font-semibold text-xl transition-colors",
                  scrolled ? "text-neutral-900" : "text-white"
                )}
              >
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-neutral-600 hover:text-neutral-900"
                    : "text-white/80 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {cta && (
              <Link
                href={cta.href}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  scrolled
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/30"
                )}
              >
                {cta.label}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors",
              scrolled ? "text-neutral-900" : "text-white"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white rounded-2xl shadow-lg mb-4 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block py-2 px-4 text-sm font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {cta && (
                  <Link
                    href={cta.href}
                    className="block mt-2 py-2 px-4 bg-neutral-900 text-white text-center rounded-lg text-sm font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cta.label}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// ============================================================================
// NavMenuWithDropdown - Navigation with dropdown menus
// ============================================================================

export function NavMenuWithDropdown({
  items,
  logo,
  cta,
  className,
}: NavMenuBaseProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  return (
    <nav className={cn("bg-white border-b border-neutral-200", className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <Link href="/" className="font-semibold text-lg text-neutral-900">
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  {item.label}
                  {item.children && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-50"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {cta && (
              <Link
                href={cta.href}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                {cta.label}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 py-4"
            >
              {items.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-2 text-sm font-medium text-neutral-600"
                    onClick={() => !item.children && setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block py-1 text-sm text-neutral-500"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ============================================================================
// NavMenuDark - Dark themed navigation
// ============================================================================

export function NavMenuDark({
  items,
  logo,
  cta,
  className,
}: NavMenuBaseProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav className={cn("bg-neutral-950", className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <Link href="/" className="font-semibold text-lg text-white">
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {cta && (
              <Link
                href={cta.href}
                className="px-4 py-2 bg-white text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors"
              >
                {cta.label}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-800 py-4"
            >
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-neutral-400 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ============================================================================
// PREMIUM VARIANTS
// ============================================================================

// ============================================================================
// NavMenuVercel - Sliding pill indicator (Vercel-style)
// ============================================================================

export function NavMenuVercel({
  items,
  logo,
  cta,
  className,
}: NavMenuBaseProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <nav className={cn("bg-white border-b border-neutral-200", className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <Link href="/" className="font-semibold text-neutral-900">
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Navigation with sliding indicator */}
          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {items.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors z-10"
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                {item.label}
              </Link>
            ))}

            {/* Sliding pill indicator */}
            <motion.div
              className="absolute inset-y-0 bg-neutral-100 rounded-lg -z-0"
              initial={false}
              animate={{
                x: `${(hoveredIndex ?? activeIndex) * 100}%`,
                width: `${100 / items.length}%`,
                opacity: hoveredIndex !== null ? 1 : 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
              style={{
                left: 0,
                width: `calc(100% / ${items.length})`,
              }}
            />
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {cta && (
              <Link
                href={cta.href}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// NavMenuGlass - Glassmorphism navigation
// ============================================================================

export function NavMenuGlass({
  items,
  logo,
  cta,
  className,
}: NavMenuBaseProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <nav className={cn("relative", className)}>
      <div className="mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          <motion.div
            className="flex items-center gap-1 px-2 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            {logo && (
              <>
                <div className="px-3">
                  {typeof logo === "string" ? (
                    <Link href="/" className="font-semibold text-white">
                      {logo}
                    </Link>
                  ) : (
                    logo
                  )}
                </div>
                <div className="w-px h-6 bg-white/20" />
              </>
            )}

            {/* Navigation Items */}
            <div
              className="flex items-center relative"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {items.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors z-10"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Glow effect on hover */}
              <AnimatePresence>
                {hoveredIndex !== null && (
                  <motion.div
                    className="absolute inset-y-0 bg-white/10 rounded-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    layoutId="glass-hover"
                    style={{
                      left: `${(hoveredIndex / items.length) * 100}%`,
                      width: `${100 / items.length}%`,
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            {cta && (
              <>
                <div className="w-px h-6 bg-white/20" />
                <Link
                  href={cta.href}
                  className="ml-1 px-4 py-2 bg-white text-neutral-900 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  {cta.label}
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// NavMenuMagnetic - Magnetic hover effect
// ============================================================================

function MagneticLink({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.a>
  );
}

export function NavMenuMagnetic({
  items,
  logo,
  cta,
  className,
}: NavMenuBaseProps) {
  return (
    <nav className={cn("bg-neutral-950", className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <MagneticLink href="/" className="font-semibold text-xl text-white inline-block">
                {logo}
              </MagneticLink>
            ) : (
              logo
            )}
          </div>

          {/* Navigation Items with magnetic effect */}
          <div className="hidden md:flex items-center gap-2">
            {items.map((item) => (
              <MagneticLink
                key={item.label}
                href={item.href}
                className="group relative px-5 py-3 text-sm font-medium text-neutral-400 hover:text-white transition-colors inline-block"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.span
                  className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100"
                  layoutId="magnetic-bg"
                  transition={{ duration: 0.2 }}
                />
              </MagneticLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {cta && (
              <MagneticLink
                href={cta.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors"
              >
                {cta.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// NavMenuStripe - Morphing dropdown (Stripe-style)
// ============================================================================

interface StripeDropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavMenuStripeProps {
  items: {
    label: string;
    href: string;
    children?: StripeDropdownItem[];
  }[];
  logo?: React.ReactNode;
  cta?: { label: string; href: string };
  className?: string;
}

export function NavMenuStripe({
  items,
  logo,
  cta,
  className,
}: NavMenuStripeProps) {
  const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);
  const [dropdownDimensions, setDropdownDimensions] = React.useState({ width: 0, height: 0 });
  const dropdownRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (activeDropdown !== null && dropdownRefs.current[activeDropdown]) {
      const el = dropdownRefs.current[activeDropdown];
      if (el) {
        setDropdownDimensions({
          width: el.offsetWidth,
          height: el.offsetHeight,
        });
      }
    }
  }, [activeDropdown]);

  const activeItem = activeDropdown !== null ? items[activeDropdown] : null;

  return (
    <nav className={cn("bg-white border-b border-neutral-100", className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <Link href="/" className="font-bold text-xl text-neutral-900">
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Navigation */}
          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {items.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(index)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    activeDropdown === index
                      ? "text-neutral-900 bg-neutral-100"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  )}
                </Link>
              </div>
            ))}

            {/* Morphing dropdown container */}
            <AnimatePresence>
              {activeDropdown !== null && activeItem?.children && (
                <motion.div
                  className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    width: dropdownDimensions.width || "auto",
                    height: dropdownDimensions.height || "auto",
                  }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{
                    duration: 0.2,
                    width: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                    height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                  }}
                  style={{ transformOrigin: "top left" }}
                >
                  {items.map((item, index) => (
                    <div
                      key={item.label}
                      ref={(el) => { dropdownRefs.current[index] = el; }}
                      className={cn(
                        "p-4",
                        activeDropdown !== index && "hidden"
                      )}
                    >
                      {item.children && (
                        <div className="grid gap-2 min-w-[280px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                            >
                              {child.icon && (
                                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-200 transition-colors">
                                  {child.icon}
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-neutral-900 text-sm">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div className="text-xs text-neutral-500 mt-0.5">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {cta && (
              <Link
                href={cta.href}
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/25"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// NavMenuUnderline - Animated underline effect
// ============================================================================

export function NavMenuUnderline({
  items,
  logo,
  cta,
  className,
}: NavMenuBaseProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <nav className={cn("bg-white", className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20 border-b border-neutral-100">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <Link href="/" className="font-serif text-2xl text-neutral-900">
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>

          {/* Navigation with animated underline */}
          <div
            className="hidden md:flex items-center gap-10"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {items.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-neutral-900"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIndex === index ? "100%" : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {cta && (
              <Link
                href={cta.href}
                className="px-6 py-2.5 border-2 border-neutral-900 text-neutral-900 text-sm font-medium hover:bg-neutral-900 hover:text-white transition-colors"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
