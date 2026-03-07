import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/**
 * CTASection - Call to action section
 *
 * @example
 * <CTASection
 *   title="Ready to get started?"
 *   description="Join thousands of happy customers"
 *   primaryButton={{ label: "Start Free Trial" }}
 * />
 */

interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  primaryButton?: { label: string; onClick?: () => void };
  secondaryButton?: { label: string; onClick?: () => void };
  variant?: "default" | "gradient" | "dark";
}

const CTASection = React.forwardRef<HTMLElement, CTASectionProps>(
  ({
    className,
    title,
    description,
    primaryButton,
    secondaryButton,
    variant = "gradient",
    ...props
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative py-20 lg:py-28 overflow-hidden",
          variant === "default" && "bg-white",
          variant === "gradient" && "bg-gradient-to-br from-primary-500 to-primary-600",
          variant === "dark" && "bg-neutral-900",
          className
        )}
        {...props}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {variant === "gradient" && (
            <>
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            </>
          )}
          {variant === "dark" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-500/20 rounded-full blur-3xl" />
          )}
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
            variant === "default" && "text-neutral-900",
            (variant === "gradient" || variant === "dark") && "text-white"
          )}>
            {title}
          </h2>

          {description && (
            <p className={cn(
              "text-lg mb-10 max-w-2xl mx-auto",
              variant === "default" && "text-neutral-600",
              variant === "gradient" && "text-white/90",
              variant === "dark" && "text-neutral-400"
            )}>
              {description}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            {primaryButton && (
              <Button
                size="lg"
                onClick={primaryButton.onClick}
                className={cn(
                  variant === "gradient" && "bg-white text-primary-600 hover:bg-neutral-100 shadow-xl",
                  variant === "dark" && "bg-primary-500 hover:bg-primary-600"
                )}
              >
                {primaryButton.label}
              </Button>
            )}
            {secondaryButton && (
              <Button
                size="lg"
                variant="outline"
                onClick={secondaryButton.onClick}
                className={cn(
                  (variant === "gradient" || variant === "dark") && "border-white/30 text-white hover:bg-white/10"
                )}
              >
                {secondaryButton.label}
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }
);
CTASection.displayName = "CTASection";

export { CTASection };
