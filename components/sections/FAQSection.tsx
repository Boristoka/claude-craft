"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";

/**
 * FAQSection - Frequently Asked Questions section
 *
 * @example
 * <FAQSection
 *   title="Frequently Asked Questions"
 *   faqs={[
 *     { question: "How does it work?", answer: "It's simple..." },
 *     { question: "What's the pricing?", answer: "We offer..." },
 *   ]}
 * />
 */

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps extends React.HTMLAttributes<HTMLElement> {
  faqs: FAQ[];
  title?: string;
  description?: string;
  variant?: "default" | "centered" | "split" | "dark";
}

const FAQSection = React.forwardRef<HTMLElement, FAQSectionProps>(
  ({
    className,
    faqs,
    title = "Frequently Asked Questions",
    description,
    variant = "default",
    ...props
  }, ref) => {
    const isDark = variant === "dark";
    const isSplit = variant === "split";
    const isCentered = variant === "centered";

    return (
      <section
        ref={ref}
        className={cn(
          "py-20 lg:py-28",
          isDark ? "bg-neutral-900" : "bg-white",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-6">
          {isSplit ? (
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: Header */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <h2 className={cn(
                  "font-serif text-3xl md:text-4xl lg:text-5xl mb-4",
                  isDark ? "text-white" : "text-neutral-900"
                )}>
                  {title}
                </h2>
                {description && (
                  <p className={cn(
                    "text-lg",
                    isDark ? "text-neutral-400" : "text-neutral-600"
                  )}>
                    {description}
                  </p>
                )}
              </div>

              {/* Right: FAQs */}
              <div>
                <Accordion type="single" className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className={cn(
                        "border-b",
                        isDark ? "border-neutral-800" : "border-neutral-200"
                      )}
                    >
                      <AccordionTrigger className={cn(
                        "text-left text-lg font-medium py-5",
                        isDark ? "text-white hover:text-white/80" : "text-neutral-900 hover:text-neutral-600"
                      )}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className={cn(
                        "pb-5",
                        isDark ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ) : (
            <>
              {/* Centered Header */}
              <div className={cn(
                "mb-12",
                isCentered && "text-center"
              )}>
                <h2 className={cn(
                  "font-serif text-3xl md:text-4xl lg:text-5xl mb-4",
                  isDark ? "text-white" : "text-neutral-900"
                )}>
                  {title}
                </h2>
                {description && (
                  <p className={cn(
                    "text-lg max-w-2xl",
                    isCentered && "mx-auto",
                    isDark ? "text-neutral-400" : "text-neutral-600"
                  )}>
                    {description}
                  </p>
                )}
              </div>

              {/* FAQs */}
              <div className={cn(
                "max-w-3xl",
                isCentered && "mx-auto"
              )}>
                <Accordion type="single" className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className={cn(
                        "border-b",
                        isDark ? "border-neutral-800" : "border-neutral-200"
                      )}
                    >
                      <AccordionTrigger className={cn(
                        "text-left text-lg font-medium py-5",
                        isDark ? "text-white hover:text-white/80" : "text-neutral-900 hover:text-neutral-600"
                      )}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className={cn(
                        "pb-5",
                        isDark ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
);
FAQSection.displayName = "FAQSection";

export { FAQSection };
