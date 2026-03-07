import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge Component - Status indicators
 *
 * @example
 * <Badge>Default</Badge>
 * <Badge variant="success" dot>Online</Badge>
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-700",
        secondary: "bg-secondary-100 text-secondary-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
        error: "bg-red-100 text-red-700",
        outline: "border border-neutral-300 text-neutral-600 bg-transparent",
        ghost: "bg-neutral-100 text-neutral-600",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-md",
        default: "px-3 py-1 text-xs rounded-full",
        lg: "px-4 py-1.5 text-sm rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    const dotColors: Record<string, string> = {
      default: "bg-primary-500",
      secondary: "bg-secondary-500",
      success: "bg-green-500",
      warning: "bg-amber-500",
      error: "bg-red-500",
      outline: "bg-neutral-400",
      ghost: "bg-neutral-400",
    };

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              dotColors[variant || "default"]
            )}
          />
        )}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
