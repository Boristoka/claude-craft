import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { PricingCard } from "@/components/ui/PricingCard";

/**
 * PricingSection - Pricing tiers display
 *
 * @example
 * <PricingSection
 *   badge="Pricing"
 *   title="Simple, transparent pricing"
 *   plans={[
 *     { name: "Starter", price: 9, features: ["..."] }
 *   ]}
 * />
 */

interface PricingPlan {
  name: string;
  price: number | string;
  period?: string;
  description?: string;
  features: string[];
  buttonText?: string;
  featured?: boolean;
  badge?: string;
}

interface PricingSectionProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  plans: PricingPlan[];
}

const PricingSection = React.forwardRef<HTMLElement, PricingSectionProps>(
  ({
    className,
    badge,
    title,
    titleHighlight,
    description,
    plans,
    ...props
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("py-20 lg:py-28 bg-neutral-50", className)}
        {...props}
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            {badge && (
              <Badge className="mb-4">{badge}</Badge>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {title}{" "}
              {titleHighlight && (
                <span className="text-gradient-primary">{titleHighlight}</span>
              )}
            </h2>
            {description && (
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          {/* Pricing Cards */}
          <div className={cn(
            "grid gap-8 items-center justify-center",
            plans.length === 2 && "md:grid-cols-2 max-w-3xl mx-auto",
            plans.length === 3 && "md:grid-cols-3 max-w-5xl mx-auto",
            plans.length >= 4 && "md:grid-cols-2 lg:grid-cols-4"
          )}>
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                buttonText={plan.buttonText}
                featured={plan.featured}
                badge={plan.badge}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
);
PricingSection.displayName = "PricingSection";

export { PricingSection };
