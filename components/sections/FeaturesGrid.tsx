import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { FeatureCard } from "@/components/ui/FeatureCard";

/**
 * FeaturesGrid - Features section with icon grid
 *
 * @example
 * <FeaturesGrid
 *   badge="Features"
 *   title="Everything you need"
 *   description="All the tools to build amazing products"
 *   features={[
 *     { icon: <ZapIcon />, title: "Fast", description: "Lightning speed" }
 *   ]}
 * />
 */

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesGridProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "centered";
}

const FeaturesGrid = React.forwardRef<HTMLElement, FeaturesGridProps>(
  ({
    className,
    badge,
    title,
    titleHighlight,
    description,
    features,
    columns = 3,
    variant = "default",
    ...props
  }, ref) => {
    const gridCols = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <section
        ref={ref}
        className={cn("py-20 lg:py-28 bg-neutral-50", className)}
        {...props}
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className={cn(
            "mb-16",
            variant === "centered" && "text-center"
          )}>
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
              <p className={cn(
                "text-lg text-neutral-600",
                variant === "centered" && "max-w-2xl mx-auto"
              )}>
                {description}
              </p>
            )}
          </div>

          {/* Features Grid */}
          <div className={cn("grid gap-6", gridCols[columns])}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                variant={variant}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
);
FeaturesGrid.displayName = "FeaturesGrid";

export { FeaturesGrid };
