"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { PricingTable } from "@/components/ui/PricingTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const plans = [
  {
    name: "Starter",
    description: "Perfect for small projects",
    price: { monthly: 499, yearly: 4790 },
    features: [
      "Single page website",
      "Mobile responsive",
      "Contact form",
      "Basic SEO setup",
      "2 revision rounds",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    description: "For growing businesses",
    price: { monthly: 1499, yearly: 14390 },
    features: [
      "Up to 5 pages",
      "Custom design",
      "CMS integration",
      "Advanced SEO",
      "Analytics setup",
      "3 months support",
      "Unlimited revisions",
    ],
    featured: true,
    badge: "Most Popular",
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: { monthly: 3999, yearly: 38390 },
    features: [
      "Unlimited pages",
      "Custom functionality",
      "E-commerce ready",
      "Priority support",
      "Performance optimization",
      "Security hardening",
      "12 months support",
      "Dedicated account manager",
    ],
    cta: "Contact Us",
  },
];

const faqs = [
  {
    question: "What's included in the price?",
    answer:
      "All packages include design, development, testing, and launch. We also provide training on how to manage your website content.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Starter projects typically take 2-3 weeks. Professional projects take 4-6 weeks. Enterprise projects vary based on scope.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes! We offer flexible payment options. Typically 50% upfront and 50% on completion, or monthly installments for larger projects.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "All packages include post-launch support. After that, we offer maintenance packages or hourly rates for updates.",
  },
];

export default function PricingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-[50vh] min-h-[400px] overflow-hidden -mt-[88px]"
      >
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=85"
            alt="Pricing"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900/80" />
        </motion.div>

        <motion.div
          className="relative h-full flex flex-col justify-end pb-16 md:pb-24 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={fadeUp}>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-6">
                  Pricing
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Transparent <em className="italic">pricing</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed"
              >
                No hidden fees. Choose a package that fits your needs and
                budget.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <PricingTable yearlyDiscount={20} plans={plans} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Everything you need to know about our pricing
            </p>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <AnimateOnScroll
                key={faq.question}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-100 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-900 dark:bg-black">
        <div className="container mx-auto px-6">
          <AnimateOnScroll
            animation="fadeInUp"
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Ready to get <em className="italic">started</em>?
            </h2>
            <p className="text-neutral-400 mb-8">
              Let&apos;s discuss your project and find the perfect solution for
              your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100"
                asChild
              >
                <Link href="/demo/contact">
                  Book a free consultation
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
