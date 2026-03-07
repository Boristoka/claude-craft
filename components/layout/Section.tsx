"use client";

import { forwardRef, HTMLAttributes, ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Section Component - Claude UI Kit
 *
 * Page section with consistent vertical spacing and optional background.
 * Pairs well with Container for centered content.
 *
 * @example
 * // Basic section
 * <Section>
 *   <Container>
 *     <h2>Features</h2>
 *   </Container>
 * </Section>
 *
 * // Colored background section
 * <Section background="muted" spacing="lg">
 *   <Container>
 *     <h2>Testimonials</h2>
 *   </Container>
 * </Section>
 */

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Vertical padding preset */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  /** Background style */
  background?: "none" | "muted" | "primary" | "dark" | "gradient";
  /** Full viewport height */
  fullHeight?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing = "lg",
      background = "none",
      fullHeight = false,
      children,
      ...props
    },
    ref
  ) => {
    const spacings = {
      none: "",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-24 md:py-32",
    };

    const backgrounds = {
      none: "",
      muted: "bg-muted",
      primary: "bg-primary text-white",
      dark: "bg-gray-900 text-white",
      gradient: "bg-gradient-to-br from-primary/5 via-transparent to-secondary/5",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "relative",
          spacings[spacing],
          backgrounds[background],
          fullHeight && "min-h-screen flex flex-col justify-center",
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section };
