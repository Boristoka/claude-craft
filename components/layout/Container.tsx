"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Container Component - Claude UI Kit
 *
 * Centers content with responsive max-width and horizontal padding.
 *
 * @example
 * <Container>
 *   <h1>Your content here</h1>
 * </Container>
 *
 * // Narrower container for text content
 * <Container size="sm">
 *   <article>...</article>
 * </Container>
 */

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max-width preset */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Horizontal padding */
  padding?: "none" | "sm" | "md" | "lg";
  /** Center content horizontally */
  centered?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = "lg",
      padding = "md",
      centered = true,
      children,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: "max-w-2xl", // 672px - ideal for articles
      md: "max-w-4xl", // 896px - balanced content
      lg: "max-w-6xl", // 1152px - spacious layouts
      xl: "max-w-7xl", // 1280px - wide layouts
      full: "max-w-full", // No max-width
    };

    const paddings = {
      none: "",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          sizes[size],
          paddings[padding],
          centered && "mx-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";

export { Container };
