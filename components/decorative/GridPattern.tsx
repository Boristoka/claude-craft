"use client";

import { cn } from "@/lib/utils";

/**
 * GridPattern Component - Claude UI Kit
 *
 * Subtle background patterns for visual texture without distraction.
 * Works well behind sections to add depth.
 *
 * @example
 * // Dot pattern
 * <div className="relative">
 *   <GridPattern variant="dots" />
 *   <Content />
 * </div>
 *
 * // Grid lines
 * <GridPattern variant="lines" opacity={0.1} />
 */

interface GridPatternProps {
  /** Pattern type */
  variant?: "dots" | "lines" | "squares";
  /** Grid size in pixels */
  gridSize?: number;
  /** Pattern opacity (0-1) */
  opacity?: number;
  /** Whether pattern adapts to dark mode */
  adaptive?: boolean;
  /** Additional classes */
  className?: string;
}

export function GridPattern({
  variant = "dots",
  gridSize = 40,
  opacity = 0.15,
  adaptive = true,
  className,
}: GridPatternProps) {
  const patterns = {
    dots: getDotPattern(gridSize, adaptive),
    lines: getLinePattern(gridSize, adaptive),
    squares: getSquarePattern(gridSize, adaptive),
  };

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        className
      )}
      style={{
        opacity,
        backgroundImage: patterns[variant],
        backgroundSize: variant === "lines" ? `${gridSize}px ${gridSize}px` : undefined,
      }}
    />
  );
}

function getDotPattern(size: number, adaptive: boolean) {
  const lightColor = "rgba(0,0,0,0.2)";
  const darkColor = "rgba(255,255,255,0.2)";

  if (adaptive) {
    // Will use CSS variables or media queries
    return `radial-gradient(circle at 1px 1px, var(--grid-dot-color, ${lightColor}) 1px, transparent 0)`;
  }

  return `radial-gradient(circle at 1px 1px, ${lightColor} 1px, transparent 0)`;
}

function getLinePattern(size: number, adaptive: boolean) {
  const lightColor = "rgba(0,0,0,0.08)";

  return `
    linear-gradient(to right, ${lightColor} 1px, transparent 1px),
    linear-gradient(to bottom, ${lightColor} 1px, transparent 1px)
  `;
}

function getSquarePattern(size: number, adaptive: boolean) {
  const lightColor = "rgba(0,0,0,0.05)";

  return `
    linear-gradient(to right, ${lightColor} 1px, transparent 1px),
    linear-gradient(to bottom, ${lightColor} 1px, transparent 1px)
  `;
}

/**
 * NoiseTexture - Subtle grain overlay
 *
 * Adds a film-like grain texture for a more organic feel.
 * Very subtle by default.
 *
 * @example
 * <NoiseTexture opacity={0.03} />
 */
export function NoiseTexture({
  opacity = 0.02,
  className,
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        className
      )}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
