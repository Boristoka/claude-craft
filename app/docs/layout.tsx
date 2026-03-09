"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Documentation Layout
 * Professional docs layout with sidebar, search, and responsive design
 */

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
  isNew?: boolean;
  isUpdated?: boolean;
}

const navigation: NavItem[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Dark Mode", href: "/docs/dark-mode" },
    ],
  },
  {
    title: "Core Components",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Avatar", href: "/docs/components/avatar" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { title: "Modal", href: "/docs/components/modal" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb", isNew: true },
      { title: "Pagination", href: "/docs/components/pagination", isNew: true },
      { title: "Sidebar Nav", href: "/docs/components/sidebar-nav", isNew: true },
      { title: "Floating Nav", href: "/docs/components/floating-nav", isNew: true },
      { title: "Mega Menu", href: "/docs/components/mega-menu", isNew: true },
      { title: "Command Palette", href: "/docs/components/command-palette" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { title: "Data Table", href: "/docs/components/data-table", isNew: true },
      { title: "Stats Card", href: "/docs/components/stats-card", isNew: true },
      { title: "Comparison Slider", href: "/docs/components/comparison-slider", isNew: true },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Validated Form", href: "/docs/components/validated-form" },
      { title: "File Upload", href: "/docs/components/file-upload", isNew: true },
      { title: "Stepper", href: "/docs/components/stepper", isNew: true },
    ],
  },
  {
    title: "E-commerce",
    items: [
      { title: "Product Card", href: "/docs/components/product-card" },
      { title: "Cart Drawer", href: "/docs/components/cart-drawer", isNew: true },
      { title: "Review Stars", href: "/docs/components/review-stars", isNew: true },
      { title: "Image Gallery", href: "/docs/components/image-gallery", isNew: true },
      { title: "Pricing Table", href: "/docs/components/pricing-table" },
    ],
  },
  {
    title: "Visual Effects",
    items: [
      { title: "Gradient Blob", href: "/docs/components/gradient-blob", isNew: true },
      { title: "Text Reveal", href: "/docs/components/text-reveal", isNew: true },
      { title: "Animated Gradient", href: "/docs/components/animated-gradient", isNew: true },
      { title: "Particle Field", href: "/docs/components/particle-field", isNew: true },
      { title: "Dock", href: "/docs/components/dock", isNew: true },
    ],
  },
  {
    title: "Layout",
    items: [
      { title: "Bento Grid", href: "/docs/components/bento-grid" },
      { title: "Marquee", href: "/docs/components/marquee" },
      { title: "Spotlight Card", href: "/docs/components/spotlight-card" },
      { title: "Timeline", href: "/docs/components/timeline" },
    ],
  },
  {
    title: "Content",
    items: [
      { title: "Blog Card", href: "/docs/components/blog-card" },
      { title: "Team Card", href: "/docs/components/team-card" },
      { title: "Project Card", href: "/docs/components/project-card" },
      { title: "Testimonial", href: "/docs/components/testimonial" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<NavItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  // Flatten navigation for search
  const allItems = React.useMemo(() => {
    const items: NavItem[] = [];
    navigation.forEach((section) => {
      section.items?.forEach((item) => {
        items.push({ ...item, title: `${section.title} / ${item.title}` });
      });
    });
    return items;
  }, []);

  // Search handler
  React.useEffect(() => {
    if (searchQuery) {
      const results = allItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allItems]);

  // Keyboard shortcut for search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center px-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/docs" className="flex items-center gap-2 mr-6">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center">
              <span className="text-white dark:text-neutral-900 font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-neutral-900 dark:text-white hidden sm:block">
              Claude Craft
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/docs"
              className={cn(
                "transition-colors hover:text-neutral-900 dark:hover:text-white",
                pathname === "/docs" ? "text-neutral-900 dark:text-white" : "text-neutral-500"
              )}
            >
              Docs
            </Link>
            <Link
              href="/docs/components/button"
              className={cn(
                "transition-colors hover:text-neutral-900 dark:hover:text-white",
                pathname.includes("/components") ? "text-neutral-900 dark:text-white" : "text-neutral-500"
              )}
            >
              Components
            </Link>
            <Link
              href="/demo"
              className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Demo
            </Link>
          </nav>

          {/* Search */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-500 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-neutral-200 dark:bg-neutral-700 rounded">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* GitHub link */}
            <a
              href="https://github.com/Boristoka/claude-craft"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed top-16 z-30 -ml-2 h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 md:sticky md:block",
            isSidebarOpen ? "block" : "hidden md:block"
          )}
        >
          <div className="py-6 pr-6 lg:py-8">
            {navigation.map((section) => (
              <div key={section.title} className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-neutral-900 dark:text-white">
                  {section.title}
                </h4>
                {section.items && (
                  <div className="grid grid-flow-row auto-rows-max text-sm">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href || "#"}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                          pathname === item.href
                            ? "bg-neutral-100 dark:bg-neutral-800 font-medium text-neutral-900 dark:text-white"
                            : "text-neutral-600 dark:text-neutral-400"
                        )}
                      >
                        {item.title}
                        {item.isNew && (
                          <span className="ml-2 rounded-full bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-400">
                            New
                          </span>
                        )}
                        {item.isUpdated && (
                          <span className="ml-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-400">
                            Updated
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px]">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
            >
              <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-4">
                <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search components..."
                  className="flex-1 px-4 py-4 bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs font-mono bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-500">
                  ESC
                </kbd>
              </div>
              {searchResults.length > 0 && (
                <div className="max-h-[300px] overflow-y-auto p-2">
                  {searchResults.map((result) => (
                    <Link
                      key={result.href}
                      href={result.href || "#"}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-neutral-900 dark:text-white">
                        {result.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
              {searchQuery && searchResults.length === 0 && (
                <div className="p-8 text-center text-neutral-500">
                  No results found for "{searchQuery}"
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
