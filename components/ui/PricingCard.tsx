import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Badge } from "./Badge";

/**
 * PricingCard - Pricing tier display
 *
 * @example
 * <PricingCard
 *   name="Pro"
 *   price={29}
 *   period="month"
 *   description="For growing teams"
 *   features={["Unlimited projects", "Priority support"]}
 *   featured
 * />
 */

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: number | string;
  period?: string;
  description?: string;
  features: string[];
  buttonText?: string;
  onButtonClick?: () => void;
  featured?: boolean;
  badge?: string;
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({
    className,
    name,
    price,
    period = "month",
    description,
    features,
    buttonText = "Get Started",
    onButtonClick,
    featured = false,
    badge,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl p-8 transition-all duration-200",
          featured
            ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-xl scale-105 z-10"
            : "bg-white border border-neutral-200 shadow-card hover:shadow-card-hover",
          className
        )}
        {...props}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge variant={featured ? "secondary" : "default"} className={featured ? "bg-white text-primary-600" : ""}>
              {badge}
            </Badge>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className={cn(
            "text-xl font-semibold mb-2",
            featured ? "text-white" : "text-neutral-900"
          )}>
            {name}
          </h3>
          {description && (
            <p className={cn(
              "text-sm",
              featured ? "text-white/80" : "text-neutral-500"
            )}>
              {description}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-1">
            <span className={cn(
              "text-4xl font-bold",
              featured ? "text-white" : "text-neutral-900"
            )}>
              {typeof price === "number" ? `€${price}` : price}
            </span>
            {typeof price === "number" && (
              <span className={cn(
                "text-sm",
                featured ? "text-white/70" : "text-neutral-500"
              )}>
                /{period}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className={cn(
                  "w-5 h-5 flex-shrink-0 mt-0.5",
                  featured ? "text-white" : "text-primary-500"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className={cn(
                "text-sm",
                featured ? "text-white/90" : "text-neutral-600"
              )}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <Button
          className={cn(
            "w-full",
            featured && "bg-white text-primary-600 hover:bg-neutral-100 shadow-lg"
          )}
          variant={featured ? "default" : "outline"}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    );
  }
);
PricingCard.displayName = "PricingCard";

export { PricingCard };
