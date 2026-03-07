import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * FeatureCard - Feature highlight with icon
 *
 * @example
 * <FeatureCard
 *   icon={<ZapIcon />}
 *   title="Lightning Fast"
 *   description="Built for speed and performance"
 * />
 */

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "default" | "centered" | "horizontal";
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon, title, description, variant = "default", ...props }, ref) => {
    if (variant === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex gap-4 p-6 rounded-2xl bg-white border border-neutral-200",
            "shadow-card hover:shadow-card-hover hover:-translate-y-1",
            "transition-all duration-200",
            className
          )}
          {...props}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/25">
            <span className="text-white">{icon}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">{title}</h3>
            <p className="text-neutral-600 leading-relaxed">{description}</p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "p-6 rounded-2xl bg-white border border-neutral-200",
          "shadow-card hover:shadow-card-hover hover:-translate-y-1",
          "transition-all duration-200",
          variant === "centered" && "text-center",
          className
        )}
        {...props}
      >
        <div className={cn(
          "w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-5 shadow-lg shadow-primary-500/25",
          variant === "centered" && "mx-auto"
        )}>
          <span className="text-white">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-600 leading-relaxed">{description}</p>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
