"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoCard, BentoIcons } from "@/components/ui/BentoGrid";
import { Marquee, TestimonialMarquee } from "@/components/ui/Marquee";
import { SpotlightCard, SpotlightFeatureCard, SpotlightCardGrid } from "@/components/ui/SpotlightCard";
import { PricingTable } from "@/components/ui/PricingTable";
import { CommandPalette, CommandIcons } from "@/components/ui/CommandPalette";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";
import { FeatureGrid, FeatureIcons } from "@/components/ui/FeatureGrid";
import { Timeline, ProcessSteps } from "@/components/ui/Timeline";
import { MenuSection, OpeningHours } from "@/components/ui/MenuSection";
import { ProductCard, ProductGrid } from "@/components/ui/ProductCard";
import { TrustBadges, TrustIcons } from "@/components/ui/LogoCloud";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import {
  NavMenuMinimal,
  NavMenuCentered,
  NavMenuFloating,
  NavMenuSplit,
  NavMenuTransparent,
  NavMenuDark,
  NavMenuWithDropdown,
} from "@/components/ui/NavMenu";

// Demo nav items for showcasing navigation menus
const demoNavItems = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
];

const demoNavItemsWithDropdown = [
  { label: "Home", href: "#" },
  {
    label: "Products",
    href: "#",
    children: [
      { label: "Analytics", href: "#" },
      { label: "Automation", href: "#" },
      { label: "Integrations", href: "#" },
    ]
  },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
];

export default function ComponentsShowcase() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6">Components</Badge>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-white mb-6">
            Premium <em className="italic">Components</em>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Beautifully crafted components that make your website stand out.
            All components support dark mode and are fully customizable.
          </p>
        </div>
      </section>

      {/* Navigation Menus Demo */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <Badge className="mb-4">Navigation</Badge>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Navigation Menus
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                7 premium navigation variants. Each with mobile support, animations, and dark mode.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid gap-8">
            {/* Minimal */}
            <AnimateOnScroll animation="fadeInUp" delay={0.1}>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">NavMenuMinimal</span>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-0">
                  <NavMenuMinimal
                    logo={<span className="font-semibold text-neutral-900 dark:text-white">Brand</span>}
                    items={demoNavItems}
                    cta={{ label: "Get Started", href: "#" }}
                  />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Centered */}
            <AnimateOnScroll animation="fadeInUp" delay={0.15}>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">NavMenuCentered</span>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-0">
                  <NavMenuCentered
                    logo={<span className="font-semibold text-neutral-900 dark:text-white">Brand</span>}
                    items={demoNavItems}
                    cta={{ label: "Sign Up", href: "#" }}
                  />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Floating */}
            <AnimateOnScroll animation="fadeInUp" delay={0.2}>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">NavMenuFloating</span>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 p-6">
                  <NavMenuFloating
                    logo={<span className="font-semibold text-neutral-900 dark:text-white">Brand</span>}
                    items={demoNavItems}
                    cta={{ label: "Contact", href: "#" }}
                  />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Split */}
            <AnimateOnScroll animation="fadeInUp" delay={0.25}>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">NavMenuSplit</span>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-0">
                  <NavMenuSplit
                    logo={<span className="font-semibold text-neutral-900 dark:text-white">Brand</span>}
                    items={demoNavItems}
                    cta={{ label: "Book Now", href: "#" }}
                  />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Transparent */}
            <AnimateOnScroll animation="fadeInUp" delay={0.3}>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">NavMenuTransparent</span>
                </div>
                <div
                  className="relative p-0 min-h-[80px]"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-neutral-900/40" />
                  <div className="relative">
                    <NavMenuTransparent
                      logo={<span className="font-semibold text-white">Brand</span>}
                      items={demoNavItems}
                      cta={{ label: "Get Started", href: "#" }}
                    />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Dark */}
            <AnimateOnScroll animation="fadeInUp" delay={0.35}>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">NavMenuDark</span>
                </div>
                <div className="bg-neutral-900 p-0">
                  <NavMenuDark
                    logo={<span className="font-semibold text-white">Brand</span>}
                    items={demoNavItems}
                    cta={{ label: "Sign Up", href: "#" }}
                  />
                </div>
              </div>
            </AnimateOnScroll>

            {/* With Dropdown */}
            <AnimateOnScroll animation="fadeInUp" delay={0.4}>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">NavMenuWithDropdown</span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-2">(hover "Products")</span>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-0">
                  <NavMenuWithDropdown
                    logo={<span className="font-semibold text-neutral-900 dark:text-white">Brand</span>}
                    items={demoNavItemsWithDropdown}
                    cta={{ label: "Get Started", href: "#" }}
                  />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Command Palette Demo */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Command Palette
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Cmd+K style search interface. Click the search bar or press ⌘K to open.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeInUp" delay={0.1}>
            <div className="max-w-md">
              <CommandPalette
                placeholder="Search or type a command..."
                commands={[
                  {
                    id: "home",
                    label: "Go to Home",
                    description: "Navigate to homepage",
                    icon: <CommandIcons.Home />,
                    shortcut: "⌘H",
                    href: "/",
                    category: "Navigation",
                  },
                  {
                    id: "demo",
                    label: "View Demo",
                    description: "See the demo website",
                    icon: <CommandIcons.Document />,
                    href: "/demo",
                    category: "Navigation",
                  },
                  {
                    id: "components",
                    label: "Components",
                    description: "Browse all components",
                    icon: <CommandIcons.Settings />,
                    href: "/components",
                    category: "Navigation",
                  },
                  {
                    id: "github",
                    label: "GitHub Repository",
                    description: "View source code",
                    icon: <CommandIcons.Document />,
                    shortcut: "⌘G",
                    href: "https://github.com/Boristoka/claude-craft",
                    category: "Navigation",
                  },
                  {
                    id: "search",
                    label: "Search components",
                    description: "Find what you need",
                    icon: <CommandIcons.Search />,
                    shortcut: "⌘/",
                    category: "Actions",
                  },
                ]}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Bento Grid Demo */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Bento Grid
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Asymmetric grid layout inspired by Apple and Linear. Perfect for feature showcases.
              </p>
            </div>
          </AnimateOnScroll>

          <BentoGrid>
            <BentoCard
              size="large"
              title="Analytics Dashboard"
              description="Track your performance with real-time analytics. Monitor key metrics, visualize trends, and make data-driven decisions."
              icon={<BentoIcons.Chart />}
              gradient="vibrant"
            />
            <BentoCard
              size="small"
              title="Lightning Fast"
              description="Optimized for speed and performance."
              icon={<BentoIcons.Zap />}
            />
            <BentoCard
              size="small"
              title="Secure by Default"
              description="Enterprise-grade security built in."
              icon={<BentoIcons.Shield />}
            />
            <BentoCard
              size="wide"
              title="Global Scale"
              description="Deploy worldwide with edge computing. Your content delivered from the nearest location."
              icon={<BentoIcons.Globe />}
            />
            <BentoCard
              size="small"
              title="Developer First"
              description="APIs and SDKs for every platform."
              icon={<BentoIcons.Code />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Spotlight Cards Demo */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Spotlight Cards
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Hover over the cards to see the spotlight effect follow your cursor.
              </p>
            </div>
          </AnimateOnScroll>

          <SpotlightCardGrid columns={3}>
            <SpotlightFeatureCard
              icon={<BentoIcons.Zap />}
              title="Blazing Fast"
              description="Built with performance in mind. Every millisecond counts for your users."
              spotlightColor="rgba(251, 191, 36, 0.1)"
            />
            <SpotlightFeatureCard
              icon={<BentoIcons.Shield />}
              title="Secure"
              description="Enterprise-grade security with SOC 2 compliance and end-to-end encryption."
              spotlightColor="rgba(34, 197, 94, 0.1)"
            />
            <SpotlightFeatureCard
              icon={<BentoIcons.Sparkles />}
              title="AI-Powered"
              description="Intelligent features that learn and adapt to your workflow automatically."
              spotlightColor="rgba(168, 85, 247, 0.1)"
            />
          </SpotlightCardGrid>
        </div>
      </section>

      {/* Marquee Demo */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Marquee
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Infinite scrolling content. Perfect for testimonials and logo clouds.
              </p>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Logo Marquee */}
        <div className="mb-12">
          <Marquee speed="slow">
            {["Vercel", "Stripe", "Linear", "Notion", "Figma", "Slack", "Discord", "GitHub"].map((name) => (
              <div
                key={name}
                className="flex items-center justify-center w-32 h-12 mx-4 text-2xl font-bold text-neutral-300 dark:text-neutral-600 grayscale hover:grayscale-0 hover:text-neutral-900 dark:hover:text-white transition-all"
              >
                {name}
              </div>
            ))}
          </Marquee>
        </div>

        {/* Testimonial Marquee */}
        <TestimonialMarquee
          direction="right"
          speed="slow"
          testimonials={[
            {
              quote: "This UI kit has completely transformed how we build websites. The components are beautiful and so easy to use.",
              author: "Sarah Chen",
              role: "Lead Designer at TechCorp",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
            },
            {
              quote: "Finally, a component library that doesn't look like every other AI-generated website. Highly recommend!",
              author: "Michael Torres",
              role: "Founder at StartupXYZ",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
            },
            {
              quote: "The attention to detail is incredible. Dark mode, animations, everything just works perfectly.",
              author: "Emily Watson",
              role: "Frontend Engineer",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
            },
            {
              quote: "We shipped our landing page in half the time thanks to these components. Our conversion rate doubled!",
              author: "David Kim",
              role: "CEO at GrowthLabs",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
            },
          ]}
        />
      </section>

      {/* Pricing Table Demo */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Pricing Table
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Beautiful pricing with monthly/yearly toggle and animated price transitions.
              </p>
            </div>
          </AnimateOnScroll>

          <PricingTable
            yearlyDiscount={20}
            plans={[
              {
                name: "Starter",
                description: "Perfect for side projects",
                price: { monthly: 0, yearly: 0 },
                features: [
                  "Up to 3 projects",
                  "Basic analytics",
                  "Community support",
                  "1GB storage",
                ],
                cta: "Get Started Free",
              },
              {
                name: "Pro",
                description: "For growing businesses",
                price: { monthly: 29, yearly: 278 },
                features: [
                  "Unlimited projects",
                  "Advanced analytics",
                  "Priority support",
                  "100GB storage",
                  "Custom domains",
                  "Team collaboration",
                ],
                featured: true,
                badge: "Most Popular",
                cta: "Start Free Trial",
              },
              {
                name: "Enterprise",
                description: "For large organizations",
                price: { monthly: 99, yearly: 950 },
                features: [
                  "Everything in Pro",
                  "Unlimited storage",
                  "Dedicated support",
                  "Custom integrations",
                  "SLA guarantee",
                  "Advanced security",
                ],
                cta: "Contact Sales",
              },
            ]}
          />
        </div>
      </section>

      {/* ============================================
          INDUSTRY-SPECIFIC COMPONENTS
          ============================================ */}

      {/* Feature Grid (SaaS) */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <Badge className="mb-4">SaaS</Badge>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Feature Grid
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Premium feature displays with cursor-following spotlight, glassmorphism, and animated icons.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-16">
            {/* Spotlight Variant (dark) */}
            <div className="bg-neutral-900 dark:bg-black rounded-3xl p-8 md:p-12">
              <h3 className="text-sm font-medium text-neutral-400 mb-8 uppercase tracking-wider">Spotlight Variant (cursor glow effect)</h3>
              <FeatureGrid
                features={[
                  { icon: <FeatureIcons.Zap />, title: "Lightning Fast", description: "Optimized for speed and performance across all devices." },
                  { icon: <FeatureIcons.Shield />, title: "Secure by Default", description: "Bank-level encryption protects your data 24/7." },
                  { icon: <FeatureIcons.Globe />, title: "Global CDN", description: "Deployed across 50+ regions for minimal latency." },
                ]}
                columns={3}
                variant="spotlight"
              />
            </div>

            {/* Cards Variant with shine effect */}
            <div>
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wider">Cards Variant (with shine effect)</h3>
              <FeatureGrid
                features={[
                  { icon: <FeatureIcons.Users />, title: "Team Collaboration", description: "Work together in real-time with your entire team." },
                  { icon: <FeatureIcons.Chart />, title: "Advanced Analytics", description: "Deep insights into user behavior and trends." },
                  { icon: <FeatureIcons.Code />, title: "Developer API", description: "Full REST API with comprehensive documentation." },
                ]}
                columns={3}
                variant="cards"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges (E-commerce) */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <Badge className="mb-4">E-commerce</Badge>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Trust Badges
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Build customer confidence with animated trust indicators and value counters.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wider">Cards Variant (with counters)</h3>
              <TrustBadges
                badges={[
                  { icon: <TrustIcons.Truck />, label: "Orders Shipped", value: 50000, suffix: "+" },
                  { icon: <TrustIcons.Star />, label: "5-Star Reviews", value: 4800, suffix: "" },
                  { icon: <TrustIcons.Shield />, label: "Secure Transactions", value: 100, suffix: "%" },
                  { icon: <TrustIcons.Clock />, label: "Support Response", description: "Under 2 hours" },
                ]}
                variant="cards"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wider">Horizontal Variant (hover to see animations)</h3>
              <TrustBadges
                badges={[
                  { icon: <TrustIcons.Truck />, label: "Free Shipping", description: "On orders over €50" },
                  { icon: <TrustIcons.Return />, label: "30-Day Returns", description: "No questions asked" },
                  { icon: <TrustIcons.Shield />, label: "Secure Payment", description: "SSL encrypted" },
                  { icon: <TrustIcons.Support />, label: "24/7 Support", description: "Always here to help" },
                ]}
                variant="horizontal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards (E-commerce) */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <Badge className="mb-4">E-commerce</Badge>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Product Cards
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Beautiful product displays with hover effects and quick-add functionality.
              </p>
            </div>
          </AnimateOnScroll>

          <ProductGrid columns={4}>
            <ProductCard
              name="Classic T-Shirt"
              price={45}
              image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"
              category="Apparel"
              badge="New"
              rating={5}
              reviews={128}
            />
            <ProductCard
              name="Leather Wallet"
              price={85}
              originalPrice={120}
              image="https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80"
              category="Accessories"
              badge="Sale"
              rating={4}
              reviews={64}
            />
            <ProductCard
              name="Canvas Backpack"
              price={129}
              image="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"
              category="Bags"
              badge="Bestseller"
              rating={5}
              reviews={256}
            />
            <ProductCard
              name="Wool Scarf"
              price={55}
              image="https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80"
              category="Accessories"
              rating={4}
              reviews={42}
            />
          </ProductGrid>
        </div>
      </section>

      {/* Menu Section (Restaurant) */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <Badge className="mb-4">Restaurant</Badge>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Menu Section
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Premium menu displays with spotlight effects, image previews, and elegant animations.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-16">
            {/* Spotlight Variant */}
            <div>
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wider">Spotlight Variant (hover for glow effect)</h3>
              <MenuSection
                categories={[
                  {
                    name: "Signature Dishes",
                    items: [
                      { name: "Truffle Risotto", price: "€26", description: "Arborio rice, black truffle, aged parmesan", tag: "Popular", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&q=80" },
                      { name: "Wagyu Beef Tataki", price: "€38", description: "A5 wagyu, ponzu, microgreens", tag: "New" },
                      { name: "Lobster Thermidor", price: "€45", description: "Whole Maine lobster, cognac cream", tag: "Popular" },
                    ],
                  },
                ]}
                variant="spotlight"
              />
            </div>

            {/* Elegant Variant with Opening Hours */}
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wider">Elegant Variant (animated dotted lines)</h3>
                <MenuSection
                  categories={[
                    {
                      name: "Starters",
                      items: [
                        { name: "Bruschetta", price: "€8", description: "Tomato, basil, garlic, olive oil", tag: "Popular" },
                        { name: "Burrata Caprese", price: "€14", description: "Fresh burrata, heirloom tomatoes, basil" },
                        { name: "Soup of the Day", price: "€7", description: "Ask your server for today's selection" },
                      ],
                    },
                    {
                      name: "Main Courses",
                      items: [
                        { name: "Grilled Sea Bass", price: "€28", description: "Mediterranean herbs, lemon butter", tag: "Popular" },
                        { name: "Beef Tenderloin", price: "€34", description: "Truffle mash, red wine jus" },
                        { name: "Wild Mushroom Risotto", price: "€22", description: "Porcini, parmesan, truffle oil", tag: "Vegetarian" },
                      ],
                    },
                  ]}
                  variant="elegant"
                />
              </div>
              <div>
                <OpeningHours
                  title="Opening Hours"
                  hours={[
                    { days: "Monday - Friday", hours: "12:00 - 22:30" },
                    { days: "Saturday", hours: "11:00 - 23:00" },
                    { days: "Sunday", hours: "11:00 - 21:00" },
                  ]}
                  variant="card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline & Process Steps (Portfolio/Agency) */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <Badge className="mb-4">Portfolio / Agency</Badge>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Timeline & Process Steps
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Scroll-triggered animations, glowing dots, and spotlight effects.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-20">
            {/* Default Timeline with scroll-triggered line */}
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wider">Default (scroll-triggered line)</h3>
                <Timeline
                  items={[
                    { year: "2024", title: "Lead Designer", company: "TechCorp", description: "Leading design for enterprise products", current: true },
                    { year: "2021", title: "Senior Designer", company: "StartupXYZ", description: "Built design system from scratch" },
                    { year: "2018", title: "Product Designer", company: "AgencyOne", description: "Worked on 20+ client projects" },
                  ]}
                  variant="default"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wider">Process Cards (with spotlight)</h3>
                <ProcessSteps
                  steps={[
                    { number: "01", title: "Discovery", description: "Understanding your goals and requirements" },
                    { number: "02", title: "Design", description: "Creating beautiful, functional solutions" },
                    { number: "03", title: "Develop", description: "Building with clean, scalable code" },
                    { number: "04", title: "Launch", description: "Deploying and supporting your project" },
                  ]}
                  variant="cards"
                />
              </div>
            </div>

            {/* Glow Variant (dark theme showcase) */}
            <div className="bg-neutral-900 dark:bg-black rounded-3xl p-8 md:p-12">
              <h3 className="text-sm font-medium text-neutral-400 mb-8 uppercase tracking-wider">Glow Variant (neon effect)</h3>
              <Timeline
                items={[
                  { year: "2024", title: "Series B Funding", company: "$50M raised", description: "Expanding to new markets and scaling the team" },
                  { year: "2022", title: "Product Launch", company: "v2.0 released", description: "Complete platform redesign with AI features" },
                  { year: "2020", title: "Company Founded", company: "Day 1", description: "Started with a vision to transform the industry" },
                ]}
                variant="glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mx-auto mb-12 text-center">
              <Badge className="mb-4">E-commerce / Blog</Badge>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                Newsletter Signup
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Premium email capture with animated gradient borders and confetti on success.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-12">
            {/* Gradient Variant */}
            <div className="max-w-xl mx-auto">
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wider text-center">Gradient Variant (animated border)</h3>
              <NewsletterSignup
                title="Join the waitlist"
                description="Be the first to know when we launch. Get early access and exclusive perks."
                variant="gradient"
              />
            </div>

            {/* Card Variant */}
            <div className="max-w-xl mx-auto">
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wider text-center">Card Variant</h3>
              <NewsletterSignup
                title="Stay in the loop"
                description="Get 10% off your first order plus early access to new releases."
                variant="card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-900 dark:bg-black">
        <div className="container mx-auto px-6 text-center">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Ready to build something <em className="italic">beautiful</em>?
            </h2>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
              All these components are included in Claude Craft. Clone the repo and start building.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/Boristoka/claude-craft"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 font-medium rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
