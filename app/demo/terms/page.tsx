"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

/**
 * Terms of Service Page
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
    title: "1. Agreement to Terms",
    content: `By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.

These Terms of Service apply to all visitors, users, and others who access or use our services.`,
  },
  {
    title: "2. Services",
    content: `Acme Studio provides digital design and development services, including but not limited to:

• Website design and development
• Brand identity and visual design
• User experience (UX) design
• Digital marketing consultation
• Ongoing maintenance and support

The specific scope of services will be defined in individual project agreements or proposals.`,
  },
  {
    title: "3. Intellectual Property",
    content: `Upon full payment, clients receive ownership rights to the final deliverables as specified in the project agreement. However:

• We retain the right to display work in our portfolio unless otherwise agreed
• Third-party assets (stock photos, fonts, plugins) are subject to their respective licenses
• Preliminary concepts and unused designs remain our property
• Our proprietary tools, processes, and methodologies remain our property

You may not reproduce, distribute, or create derivative works from our proprietary materials without written permission.`,
  },
  {
    title: "4. Payment Terms",
    content: `• A deposit is required before work begins (typically 50%)
• Final payment is due upon project completion, before delivery of final files
• Invoices are payable within 14 days unless otherwise agreed
• Late payments may incur interest at 1.5% per month
• We reserve the right to pause work on overdue accounts

All prices are exclusive of applicable taxes unless stated otherwise.`,
  },
  {
    title: "5. Project Timeline",
    content: `We commit to delivering projects within agreed timelines. However:

• Timelines depend on timely client feedback and approvals
• Delays caused by client response times may extend the project timeline
• Significant scope changes may require timeline adjustments
• Force majeure events may affect delivery dates

We will communicate proactively about any anticipated delays.`,
  },
  {
    title: "6. Revisions and Changes",
    content: `Each project includes a specified number of revision rounds as defined in the project proposal. Additional revisions or scope changes:

• Will be quoted separately before work begins
• May affect the project timeline
• Require written approval before implementation

"Revisions" refer to modifications within the agreed scope; "changes" refer to additions or alterations to the original scope.`,
  },
  {
    title: "7. Client Responsibilities",
    content: `To ensure successful project delivery, clients agree to:

• Provide accurate and complete information and materials
• Respond to requests for feedback within agreed timeframes
• Designate a single point of contact for project communications
• Ensure they have rights to all materials provided to us
• Make payments according to agreed terms

Failure to meet these responsibilities may result in project delays or additional costs.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by law:

• Our total liability is limited to the fees paid for the specific service
• We are not liable for indirect, incidental, or consequential damages
• We are not liable for third-party services, hosting, or platform issues
• We are not responsible for results of marketing or business decisions

We provide services "as is" without warranties of specific outcomes.`,
  },
  {
    title: "9. Confidentiality",
    content: `Both parties agree to keep confidential any proprietary information shared during the project, including:

• Business strategies and plans
• Customer data and lists
• Financial information
• Technical specifications
• Trade secrets

This obligation survives the termination of any agreement.`,
  },
  {
    title: "10. Termination",
    content: `Either party may terminate the agreement:

• With 14 days written notice for convenience
• Immediately for material breach that remains uncured after 7 days notice

Upon termination:
• Client pays for all work completed to date
• We deliver all completed work upon payment
• Both parties return confidential materials`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms of Service are governed by and construed in accordance with the laws of the State of California, United States.

Any disputes arising from these terms or our services shall be resolved through binding arbitration in San Francisco, California, unless both parties agree to court proceedings.`,
  },
  {
    title: "12. Changes to Terms",
    content: `We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes by posting a notice on our website.

Your continued use of our services after changes are posted constitutes acceptance of the modified terms.`,
  },
  {
    title: "13. Contact Information",
    content: `For questions about these Terms of Service, please contact us:

• Email: hello@acmestudio.com
• Phone: +1 (555) 123-4567
• Address: 123 Main Street, San Francisco, CA 94102`,
  },
];

export default function TermsPage() {
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
              Terms of <em className="italic">Service</em>
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
                  Please read these Terms of Service ("Terms") carefully before using the website
                  and services operated by Acme Studio ("we", "our", or "us"). Your access to and
                  use of our services is conditioned on your acceptance of and compliance with
                  these Terms.
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
