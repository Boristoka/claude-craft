import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button Component - Professional styling with glow shadows
 *
 * @example
 * <Button>Primary</Button>
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="outline">Outline</Button>
 * <Button size="lg" isLoading>Loading</Button>
 */

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary - Indigo with glow shadow
        default: [
          "bg-primary-500 text-white",
          "hover:bg-primary-600",
          "shadow-lg shadow-primary-500/25",
          "hover:shadow-xl hover:shadow-primary-500/30",
          "active:scale-[0.98]",
          "focus-visible:ring-primary-500",
        ],
        // Secondary - Teal with glow
        secondary: [
          "bg-secondary-500 text-white",
          "hover:bg-secondary-600",
          "shadow-lg shadow-secondary-500/25",
          "hover:shadow-xl hover:shadow-secondary-500/30",
          "active:scale-[0.98]",
          "focus-visible:ring-secondary-500",
        ],
        // Destructive
        destructive: [
          "bg-error text-white",
          "hover:bg-red-600",
          "shadow-lg shadow-error/25",
          "hover:shadow-xl hover:shadow-error/30",
          "active:scale-[0.98]",
          "focus-visible:ring-error",
        ],
        // Outline
        outline: [
          "border-2 border-primary-500 text-primary-500 bg-transparent",
          "hover:bg-primary-50",
          "active:bg-primary-100",
          "focus-visible:ring-primary-500",
        ],
        // Ghost
        ghost: [
          "text-neutral-700 bg-transparent",
          "hover:bg-neutral-100",
          "active:bg-neutral-200",
          "focus-visible:ring-neutral-500",
        ],
        // Link
        link: [
          "text-primary-500 bg-transparent",
          "underline-offset-4 hover:underline",
          "focus-visible:ring-primary-500",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, asChild = false, children, disabled, ...props }, ref) => {
    // When asChild is true, Slot requires exactly one child element
    // So we skip the loading spinner and just pass children through
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
