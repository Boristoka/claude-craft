"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

/**
 * Privacy Policy Page
 *
 * Template with common sections. Replace [COMPANY] and customize as needed.
 * Last updated date is shown automatically.
 */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you:

• Create an account or fill out a form
• Make a purchase or request a quote
• Contact us via email, phone, or contact form
• Subscribe to our newsletter
• Participate in surveys or promotions

This information may include your name, email address, phone number, company name, and any other information you choose to provide.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send you technical notices and support messages
• Respond to your comments, questions, and requests
• Send promotional communications (with your consent)
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent transactions`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:

• To trusted third parties who assist us in operating our website and conducting our business
• When required by law or to protect our rights
• In connection with a merger, acquisition, or sale of assets
• With your explicit consent

All third parties are obligated to keep your information confidential.`,
  },
  {
    title: "4. Cookies and Tracking",
    content: `We use cookies and similar tracking technologies to:

• Remember your preferences and settings
• Understand how you use our website
• Improve your browsing experience
• Analyze website traffic and trends

You can control cookies through your browser settings. Disabling cookies may affect some website functionality.

We use the following types of cookies:
• Essential cookies: Required for basic website functionality
• Analytics cookies: Help us understand how visitors use our site
• Marketing cookies: Used to deliver relevant advertisements (only with consent)`,
  },
  {
    title: "5. Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.`,
  },
  {
    title: "6. Your Rights (GDPR)",
    content: `If you are in the European Economic Area (EEA), you have the right to:

• Access the personal data we hold about you
• Correct inaccurate personal data
• Request deletion of your personal data
• Object to processing of your personal data
• Request restriction of processing
• Data portability
• Withdraw consent at any time

To exercise these rights, please contact us using the information below.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.

When we no longer need your personal information, we will securely delete or anonymize it.`,
  },
  {
    title: "8. Children's Privacy",
    content: `Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.

We encourage you to review this Privacy Policy periodically for any changes.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have any questions about this Privacy Policy, please contact us:

• Email: hello@acmestudio.com
• Phone: +1 (555) 123-4567
• Address: 123 Main Street, San Francisco, CA 94102

For GDPR-related inquiries, you may also contact your local data protection authority.`,
  },
];

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <section className="pt-32 pb-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-6">Legal</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl text-neutral-900 dark:text-white mb-6"
            >
              Privacy <em className="italic">Policy</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-neutral-600 dark:text-neutral-400"
            >
              Last updated: {lastUpdated}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            {/* Introduction */}
            <AnimateOnScroll animation="fadeInUp">
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  At Acme Studio ("we", "our", or "us"), we respect your privacy and are committed
                  to protecting your personal data. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit our website or use
                  our services.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <AnimateOnScroll
                  key={section.title}
                  animation="fadeInUp"
                  delay={index * 0.05}
                >
                  <div className="border-b border-neutral-100 dark:border-neutral-800 pb-12 last:border-0">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Back Link */}
            <AnimateOnScroll animation="fadeInUp" className="mt-16">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to home
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
