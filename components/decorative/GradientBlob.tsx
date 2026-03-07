"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * GradientBlob Component - Claude UI Kit
 *
 * Animated background decoration that adds visual interest without overwhelming.
 * Uses the warm color palette for a cohesive look.
 *
 * @example
 * // Default blob in a section
 * <div className="relative">
 *   <GradientBlob position="top-right" />
 *   <Content />
 * </div>
 *
 * // Multiple blobs with custom colors
 * <GradientBlob position="top-left" color="primary" />
 * <GradientBlob position="bottom-right" color="secondary" />
 */

interface GradientBlobProps {
  /** Preset position for the blob */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  /** Color theme - uses CSS variables */
  color?: "primary" | "secondary" | "accent" | "custom";
  /** Custom color (HSL values or any valid CSS color) */
  customColor?: string;
  /** Size of the blob */
  size?: "sm" | "md" | "lg" | "xl";
  /** Opacity level */
  opacity?: number;
  /** Enable floating animation */
  animated?: boolean;
  /** Additional classes */
  className?: string;
}

export function GradientBlob({
  position = "top-right",
  color = "primary",
  customColor,
  size = "md",
  opacity = 0.3,
  animated = true,
  className,
}: GradientBlobProps) {
  const positions = {
    "top-left": "-top-20 -left-20",
    "top-right": "-top-20 -right-20",
    "bottom-left": "-bottom-20 -left-20",
    "bottom-right": "-bottom-20 -right-20",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const sizes = {
    sm: "w-48 h-48",
    md: "w-72 h-72",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };

  const colors = {
    primary: "from-primary to-primary-light",
    secondary: "from-secondary to-secondary-light",
    accent: "from-accent to-amber-300",
    custom: "",
  };

  const blobColor = color === "custom" && customColor ? customColor : undefined;

  const baseClasses = cn(
    "absolute rounded-full blur-3xl pointer-events-none",
    positions[position],
    sizes[size],
    color !== "custom" && `bg-gradient-to-br ${colors[color]}`,
    className
  );

  if (animated) {
    return (
      <motion.div
        className={baseClasses}
        style={{
          opacity,
          backgroundColor: blobColor,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [opacity, opacity * 1.3, opacity],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  return (
    <div
      className={baseClasses}
      style={{
        opacity,
        backgroundColor: blobColor,
      }}
    />
  );
}

/**
 * BlobContainer - Wrapper for multiple blobs
 *
 * @example
 * <BlobContainer>
 *   <GradientBlob position="top-left" color="primary" />
 *   <GradientBlob position="bottom-right" color="secondary" />
 *   <YourContent />
 * </BlobContainer>
 */
export function BlobContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}
