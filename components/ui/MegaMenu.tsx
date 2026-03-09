"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * MegaMenu - Large dropdown navigation with categories and featured content
 * Enterprise-grade navigation for complex sites
 *
 * @example
 * <MegaMenu
 *   items={[
 *     {
 *       label: "Products",
 *       columns: [
 *         { title: "Solutions", links: [...] },
 *         { title: "Features", links: [...] },
 *       ]
 *     }
 *   ]}
 * />
 */

interface MegaMenuLink {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface MegaMenuColumn {
  title?: string;
  links: MegaMenuLink[];
}

interface MegaMenuFeatured {
  title: string;
  description: string;
  image?: string;
  href: string;
  badge?: string;
}

interface MegaMenuItem {
  label: string;
  href?: string;
  columns?: MegaMenuColumn[];
  featured?: MegaMenuFeatured;
}

interface MegaMenuProps {
  items: MegaMenuItem[];
  variant?: "default" | "minimal" | "bordered";
  className?: string;
}

export function MegaMenu({
  items,
  variant = "default",
  className,
}: MegaMenuProps) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveItem(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 150);
  };

  return (
    <nav className={cn("relative", className)}>
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const isActive = activeItem === item.label;
          const hasDropdown = item.columns && item.columns.length > 0;

          return (
            <li
              key={item.label}
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <a
                href={item.href || "#"}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                )}
              >
                {item.label}
                {hasDropdown && (
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                )}
              </a>

              {/* Dropdown */}
              <AnimatePresence>
                {isActive && hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "absolute left-0 top-full pt-2 z-50",
                      variant === "minimal" && "-left-4"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl shadow-xl overflow-hidden",
                        variant === "default" && "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
                        variant === "minimal" && "bg-white dark:bg-neutral-900 shadow-2xl",
                        variant === "bordered" && "bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-white"
                      )}
                    >
                      <div className="flex">
                        {/* Columns */}
                        <div className="flex p-6 gap-8">
                          {item.columns?.map((column, colIndex) => (
                            <div key={colIndex} className="min-w-[200px]">
                              {column.title && (
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                                  {column.title}
                                </h3>
                              )}
                              <ul className="space-y-1">
                                {column.links.map((link) => (
                                  <li key={link.label}>
                                    <MegaMenuLinkItem link={link} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Featured */}
                        {item.featured && (
                          <div className="w-72 bg-neutral-50 dark:bg-neutral-800/50 p-6">
                            <MegaMenuFeaturedCard featured={item.featured} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * MegaMenuLinkItem - Individual link in mega menu
 */
function MegaMenuLinkItem({ link }: { link: MegaMenuLink }) {
  return (
    <a
      href={link.href}
      className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      {link.icon && (
        <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 transition-colors">
          {link.icon}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-900 dark:text-white">
            {link.label}
          </span>
          {link.badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              {link.badge}
            </span>
          )}
        </div>
        {link.description && (
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
            {link.description}
          </p>
        )}
      </div>
    </a>
  );
}

/**
 * MegaMenuFeaturedCard - Featured content card
 */
function MegaMenuFeaturedCard({ featured }: { featured: MegaMenuFeatured }) {
  return (
    <a href={featured.href} className="block group">
      {featured.image && (
        <div className="relative rounded-xl overflow-hidden mb-4 aspect-video">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {featured.badge && (
            <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full bg-white/90 text-neutral-900">
              {featured.badge}
            </span>
          )}
        </div>
      )}
      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:underline">
        {featured.title}
      </h4>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        {featured.description}
      </p>
    </a>
  );
}

/**
 * MobileMenu - Mobile-friendly version of mega menu
 */
interface MobileMenuProps {
  items: MegaMenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-neutral-900 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                Menu
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="p-4 space-y-1">
              {items.map((item) => {
                const hasDropdown = item.columns && item.columns.length > 0;
                const isExpanded = expandedItem === item.label;

                return (
                  <div key={item.label}>
                    <button
                      onClick={() => {
                        if (hasDropdown) {
                          setExpandedItem(isExpanded ? null : item.label);
                        }
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {item.label}
                      </span>
                      {hasDropdown && (
                        <motion.svg
                          className="w-5 h-5 text-neutral-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && hasDropdown && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-2 space-y-4">
                            {item.columns?.map((column, colIndex) => (
                              <div key={colIndex}>
                                {column.title && (
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                                    {column.title}
                                  </h4>
                                )}
                                <ul className="space-y-1">
                                  {column.links.map((link) => (
                                    <li key={link.label}>
                                      <a
                                        href={link.href}
                                        className="block p-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                      >
                                        {link.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * NavbarWithMegaMenu - Complete navbar with mega menu
 */
interface NavbarWithMegaMenuProps {
  logo: React.ReactNode;
  items: MegaMenuItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function NavbarWithMegaMenu({
  logo,
  items,
  actions,
  className,
}: NavbarWithMegaMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className={cn("relative", className)}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">{logo}</div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <MegaMenu items={items} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {actions}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        items={items}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
