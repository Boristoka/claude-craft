"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoCard, BentoIcons } from "@/components/ui/BentoGrid";
import { Marquee, TestimonialMarquee } from "@/components/ui/Marquee";
import { SpotlightCard, SpotlightFeatureCard, SpotlightCardGrid } from "@/components/ui/SpotlightCard";
import { PricingTable } from "@/components/ui/PricingTable";
import { CommandPalette, CommandIcons } from "@/components/ui/CommandPalette";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";

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

      {/* Command Palette Demo */}
      <section className="py-20 bg-white dark:bg-neutral-950">
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
                    href: "/demo",
                    category: "Navigation",
                  },
                  {
                    id: "about",
                    label: "About Us",
                    description: "Learn more about our company",
                    icon: <CommandIcons.User />,
                    href: "/demo/about",
                    category: "Navigation",
                  },
                  {
                    id: "services",
                    label: "Our Services",
                    description: "View all services",
                    icon: <CommandIcons.Document />,
                    href: "/demo/services",
                    category: "Navigation",
                  },
                  {
                    id: "contact",
                    label: "Contact",
                    description: "Get in touch",
                    icon: <CommandIcons.Mail />,
                    shortcut: "⌘C",
                    href: "/demo/contact",
                    category: "Navigation",
                  },
                  {
                    id: "search",
                    label: "Search documentation",
                    description: "Find what you need",
                    icon: <CommandIcons.Search />,
                    shortcut: "⌘/",
                    category: "Actions",
                  },
                  {
                    id: "settings",
                    label: "Open Settings",
                    description: "Configure your preferences",
                    icon: <CommandIcons.Settings />,
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
