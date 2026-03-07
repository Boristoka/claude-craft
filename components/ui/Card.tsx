import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card Component - Professional styling with hover lift
 *
 * @example
 * <Card>Basic card</Card>
 * <Card variant="interactive">Lifts on hover</Card>
 */

const cardVariants = cva(
  "rounded-2xl border border-neutral-200 bg-white text-neutral-900 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "shadow-card",
        elevated: "shadow-lg border-0",
        outline: "shadow-none",
        ghost: "bg-neutral-50 border-0 shadow-none",
        interactive:
          "shadow-card hover:shadow-card-hover hover:-translate-y-1 cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-tight tracking-tight text-neutral-900", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-600", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/**
 * StatCard - For KPI/metrics display
 *
 * @example
 * <StatCard
 *   icon={<ZapIcon />}
 *   value="12+"
 *   label="Components"
 * />
 */
interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  value: React.ReactNode;
  label: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, icon, value, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group bg-white rounded-2xl p-6 border border-neutral-200",
          "shadow-card hover:shadow-card-hover",
          "hover:-translate-y-1",
          "transition-all duration-200",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 shadow-lg shadow-primary-500/25">
            <span className="text-white">{icon}</span>
          </div>
        )}
        <p className="text-2xl font-bold text-neutral-900">{value}</p>
        <p className="text-sm text-neutral-500 mt-1">{label}</p>
      </div>
    );
  }
);
StatCard.displayName = "StatCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  StatCard,
  cardVariants,
};
