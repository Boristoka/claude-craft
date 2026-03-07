"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

/**
 * PricingTable - Professional pricing component with billing toggle
 *
 * @example
 * <PricingTable
 *   plans={[
 *     { name: "Starter", price: { monthly: 9, yearly: 90 }, features: [...] },
 *     { name: "Pro", price: { monthly: 29, yearly: 290 }, featured: true },
 *   ]}
 * />
 */

interface PricingPlan {
  name: string;
  description?: string;
  price: {
    monthly: number;
    yearly: number;
  };
  currency?: string;
  features: string[];
  cta?: string;
  ctaLink?: string;
  featured?: boolean;
  badge?: string;
}

interface PricingTableProps {
  plans: PricingPlan[];
  className?: string;
  defaultBilling?: "monthly" | "yearly";
  yearlyDiscount?: number; // e.g., 20 for 20% off
}

export function PricingTable({
  plans,
  className,
  defaultBilling = "monthly",
  yearlyDiscount,
}: PricingTableProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">(defaultBilling);

  return (
    <div className={cn("w-full", className)}>
      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
              billing === "monthly"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={cn(
              "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-2",
              billing === "yearly"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            Yearly
            {yearlyDiscount && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full">
                -{yearlyDiscount}%
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            billing={billing}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

interface PricingCardProps {
  plan: PricingPlan;
  billing: "monthly" | "yearly";
  index: number;
}

function PricingCard({ plan, billing, index }: PricingCardProps) {
  const price = billing === "monthly" ? plan.price.monthly : plan.price.yearly;
  const currency = plan.currency || "$";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col p-6 md:p-8 rounded-2xl md:rounded-3xl border h-full",
        plan.featured
          ? "bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white"
          : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
      )}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 text-xs font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full shadow-lg">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3
          className={cn(
            "text-xl font-semibold mb-2",
            plan.featured
              ? "text-white dark:text-neutral-900"
              : "text-neutral-900 dark:text-white"
          )}
        >
          {plan.name}
        </h3>
        {plan.description && (
          <p
            className={cn(
              "text-sm",
              plan.featured
                ? "text-neutral-400 dark:text-neutral-600"
                : "text-neutral-600 dark:text-neutral-400"
            )}
          >
            {plan.description}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              "text-4xl md:text-5xl font-bold",
              plan.featured
                ? "text-white dark:text-neutral-900"
                : "text-neutral-900 dark:text-white"
            )}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={billing}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {currency}
                {price}
              </motion.span>
            </AnimatePresence>
          </span>
          <span
            className={cn(
              "text-sm",
              plan.featured
                ? "text-neutral-400 dark:text-neutral-600"
                : "text-neutral-500 dark:text-neutral-400"
            )}
          >
            /{billing === "monthly" ? "mo" : "yr"}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg
              className={cn(
                "w-5 h-5 flex-shrink-0 mt-0.5",
                plan.featured
                  ? "text-green-400 dark:text-green-600"
                  : "text-green-500 dark:text-green-400"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span
              className={cn(
                "text-sm",
                plan.featured
                  ? "text-neutral-300 dark:text-neutral-700"
                  : "text-neutral-600 dark:text-neutral-400"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        className={cn(
          "w-full",
          plan.featured
            ? "bg-white text-neutral-900 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
            : ""
        )}
        variant={plan.featured ? "default" : "outline"}
        size="lg"
        asChild={!!plan.ctaLink}
      >
        {plan.ctaLink ? (
          <a href={plan.ctaLink}>{plan.cta || "Get Started"}</a>
        ) : (
          <span>{plan.cta || "Get Started"}</span>
        )}
      </Button>
    </motion.div>
  );
}

/**
 * PricingFeatureComparison - Detailed feature comparison table
 */
interface FeatureCategory {
  name: string;
  features: {
    name: string;
    plans: (boolean | string)[];
  }[];
}

interface PricingFeatureComparisonProps {
  planNames: string[];
  categories: FeatureCategory[];
  className?: string;
}

export function PricingFeatureComparison({
  planNames,
  categories,
  className,
}: PricingFeatureComparisonProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="text-left p-4 font-semibold text-neutral-900 dark:text-white">
              Features
            </th>
            {planNames.map((name) => (
              <th
                key={name}
                className="text-center p-4 font-semibold text-neutral-900 dark:text-white"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <>
              <tr key={category.name}>
                <td
                  colSpan={planNames.length + 1}
                  className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 font-medium text-sm text-neutral-700 dark:text-neutral-300"
                >
                  {category.name}
                </td>
              </tr>
              {category.features.map((feature, i) => (
                <tr
                  key={feature.name}
                  className="border-b border-neutral-100 dark:border-neutral-800"
                >
                  <td className="p-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {feature.name}
                  </td>
                  {feature.plans.map((value, j) => (
                    <td key={j} className="p-4 text-center">
                      {typeof value === "boolean" ? (
                        value ? (
                          <svg
                            className="w-5 h-5 text-green-500 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-neutral-300 dark:text-neutral-600 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )
                      ) : (
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          {value}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
