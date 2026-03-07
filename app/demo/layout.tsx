"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Footer } from "@/components/layout/Footer";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

/**
 * Demo Layout - Separate layout for the business template demo
 */

const demoNavItems = [
  { label: "Home", href: "/demo" },
  { label: "Components", href: "/demo/components" },
  { label: "Services", href: "/demo/services" },
  { label: "About", href: "/demo/about" },
  { label: "Contact", href: "/demo/contact" },
];

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Demo Banner */}
      <div className="bg-neutral-900 text-white text-center py-2.5 px-4 text-sm">
        <span className="opacity-70">This is a </span>
        <strong className="font-medium">demo template</strong>
        <span className="opacity-70"> — </span>
        <Link href="/" className="underline underline-offset-2 hover:no-underline opacity-70 hover:opacity-100 transition-opacity">
          Back to UI Kit
        </Link>
      </div>

      {/* Demo Navbar */}
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/demo" className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                scrolled ? "bg-neutral-900" : "bg-white/20 backdrop-blur-sm"
              )}>
                <span className="text-white font-semibold text-sm">AC</span>
              </div>
              <span className={cn(
                "font-semibold text-lg transition-colors",
                scrolled ? "text-neutral-900" : "text-white"
              )}>
                Acme Studio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {demoNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-2",
                    scrolled
                      ? pathname === item.href
                        ? "text-primary-500"
                        : "text-neutral-600 hover:text-neutral-900"
                      : pathname === item.href
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="demo-navbar-indicator"
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                        scrolled ? "bg-primary-500" : "bg-white"
                      )}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button + Theme Switcher */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeSwitcher />
              <Button className={cn(
                "transition-colors",
                !scrolled && "bg-white text-neutral-900 hover:bg-white/90"
              )} asChild>
                <Link href="/demo/contact">Contact</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-neutral-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-neutral-100 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 space-y-2">
                {demoNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block py-3 px-4 rounded-xl text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary-50 text-primary-500"
                        : "text-neutral-600 hover:bg-neutral-50"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2 flex items-center gap-3">
                  <ThemeSwitcher />
                  <Button asChild className="flex-1">
                    <Link href="/demo/contact">Contact</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer
        companyName="Acme Studio"
        description="We help ambitious businesses grow with thoughtful digital solutions."
        sections={[
          {
            title: "Company",
            links: [
              { label: "About", href: "/demo/about" },
              { label: "Services", href: "/demo/services" },
              { label: "Contact", href: "/demo/contact" },
            ],
          },
          {
            title: "Services",
            links: [
              { label: "Web Design", href: "/demo/services#webdesign" },
              { label: "Development", href: "/demo/services#development" },
              { label: "Strategy", href: "/demo/services#strategy" },
            ],
          },
          {
            title: "Contact",
            links: [
              { label: "hello@acmestudio.com", href: "mailto:hello@acmestudio.com" },
              { label: "+1 (555) 123-4567", href: "tel:+15551234567" },
              { label: "San Francisco, CA", href: "/demo/contact" },
            ],
          },
        ]}
        socialLinks={{
          linkedin: "https://linkedin.com",
          instagram: "https://instagram.com",
        }}
      />
    </>
  );
}
