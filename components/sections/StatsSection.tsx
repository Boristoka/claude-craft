"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/ui/AnimateOnScroll";

/**
 * StatsSection - Display key metrics and statistics
 *
 * @example
 * <StatsSection
 *   stats={[
 *     { value: 150, suffix: "+", label: "Projects Completed" },
 *     { value: 98, suffix: "%", label: "Client Satisfaction" },
 *     { value: 12, suffix: "", label: "Years Experience" },
 *     { value: 24, suffix: "/7", label: "Support Available" },
 *   ]}
 * />
 */

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

interface StatsSectionProps extends React.HTMLAttributes<HTMLElement> {
  stats: Stat[];
  title?: string;
  description?: string;
  variant?: "default" | "cards" | "minimal" | "dark";
  columns?: 2 | 3 | 4;
}

const StatsSection = React.forwardRef<HTMLElement, StatsSectionProps>(
  ({
    className,
    stats,
    title,
    description,
    variant = "default",
    columns = 4,
    ...props
  }, ref) => {
    const gridCols = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "py-20 lg:py-28",
          variant === "default" && "bg-white border-y border-neutral-100",
          variant === "cards" && "bg-neutral-50",
          variant === "minimal" && "bg-white",
          variant === "dark" && "bg-neutral-900",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          {(title || description) && (
            <div className="text-center mb-16">
              {title && (
                <h2 className={cn(
                  "font-serif text-3xl md:text-4xl mb-4",
                  variant === "dark" ? "text-white" : "text-neutral-900"
                )}>
                  {title}
                </h2>
              )}
              {description && (
                <p className={cn(
                  "text-lg max-w-2xl mx-auto",
                  variant === "dark" ? "text-neutral-400" : "text-neutral-600"
                )}>
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Stats Grid */}
          <div className={cn("grid gap-8 lg:gap-12", gridCols[columns])}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "text-center",
                  variant === "cards" && "bg-white rounded-2xl p-8 shadow-sm"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className={cn(
                  "font-serif text-4xl md:text-5xl lg:text-6xl mb-2",
                  variant === "dark" ? "text-white" : "text-neutral-900"
                )}>
                  {stat.prefix}
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </p>
                <p className={cn(
                  "text-sm font-medium uppercase tracking-wider",
                  variant === "dark" ? "text-neutral-400" : "text-neutral-500"
                )}>
                  {stat.label}
                </p>
                {stat.description && (
                  <p className={cn(
                    "mt-2 text-sm",
                    variant === "dark" ? "text-neutral-500" : "text-neutral-400"
                  )}>
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);
StatsSection.displayName = "StatsSection";

export { StatsSection };
