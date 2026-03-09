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
import { CookieBanner } from "@/components/ui/CookieBanner";

/**
 * Demo Layout - Separate layout for the business template demo
 */

const demoNavItems = [
  { label: "Home", href: "/demo" },
  { label: "Components", href: "/demo/components" },
  { label: "About", href: "/demo/about" },
  { label: "Services", href: "/demo/services" },
  { label: "Portfolio", href: "/demo/portfolio" },
  { label: "Blog", href: "/demo/blog" },
  { label: "Team", href: "/demo/team" },
  { label: "Pricing", href: "/demo/pricing" },
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

      {/* Demo Navbar - Floating Pill Style */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4">
        <nav className="container mx-auto px-4">
          <div
            className={cn(
              "flex items-center justify-between h-14 px-5 rounded-full transition-all duration-300",
              scrolled
                ? "bg-white/95 backdrop-blur-md border border-neutral-200/60 shadow-lg"
                : "bg-white/80 backdrop-blur-md border border-neutral-200/60 shadow-sm"
            )}
          >
            {/* Logo */}
            <Link href="/demo" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AC</span>
              </div>
              <span className="font-semibold text-neutral-900">
                Acme Studio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {demoNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-1",
                    pathname === item.href
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-900"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="demo-navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-neutral-900"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button + Theme Switcher */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeSwitcher />
              <Button size="sm" asChild>
                <Link href="/demo/contact">Contact</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden w-9 h-9 flex items-center justify-center rounded-full transition-colors",
                mobileMenuOpen
                  ? "bg-neutral-100"
                  : "hover:bg-neutral-100"
              )}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 text-neutral-600"
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

          {/* Mobile Menu - Dropdown under pill */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200/60 shadow-lg overflow-hidden"
              >
                <div className="p-3 space-y-1">
                  {demoNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block py-2.5 px-4 rounded-xl text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-neutral-100 text-neutral-900"
                          : "text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-2 mt-2 border-t border-neutral-100 flex items-center gap-3">
                    <ThemeSwitcher />
                    <Button asChild className="flex-1" size="sm">
                      <Link href="/demo/contact">Contact</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-[72px]" />

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
              { label: "Team", href: "/demo/team" },
              { label: "Blog", href: "/demo/blog" },
              { label: "Contact", href: "/demo/contact" },
            ],
          },
          {
            title: "Services",
            links: [
              { label: "Services", href: "/demo/services" },
              { label: "Portfolio", href: "/demo/portfolio" },
              { label: "Pricing", href: "/demo/pricing" },
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
          {
            title: "Legal",
            links: [
              { label: "Privacy Policy", href: "/demo/privacy" },
              { label: "Terms of Service", href: "/demo/terms" },
            ],
          },
        ]}
        socialLinks={{
          linkedin: "https://linkedin.com",
          instagram: "https://instagram.com",
        }}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner
        privacyUrl="/demo/privacy"
        position="bottom"
      />
    </>
  );
}
