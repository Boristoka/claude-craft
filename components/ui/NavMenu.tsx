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
                key={item.href}
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
                    key={item.href}
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
                key={item.href}
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
                key={item.href}
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
                  key={item.href}
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
            key={item.href}
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
                key={item.href}
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
                  key={item.href}
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
                key={item.href}
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
                    key={item.href}
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
                key={item.href}
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
                          key={child.href}
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
                <div key={item.href}>
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
                          key={child.href}
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
                key={item.href}
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
                  key={item.href}
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
