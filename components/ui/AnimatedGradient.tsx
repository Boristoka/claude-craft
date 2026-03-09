"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * AnimatedGradientText - Text with animated gradient effect
 * Inspired by Apple and Vercel's hero text animations
 *
 * @example
 * <AnimatedGradientText>
 *   Build something amazing
 * </AnimatedGradientText>
 *
 * @example
 * <AnimatedGradientText
 *   colors={["#ff6b6b", "#feca57", "#48dbfb"]}
 *   animationSpeed={3}
 * >
 *   Colorful gradient text
 * </AnimatedGradientText>
 */

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  direction?: "horizontal" | "diagonal" | "radial";
  className?: string;
}

export function AnimatedGradientText({
  children,
  colors = ["#7c3aed", "#ec4899", "#3b82f6", "#06b6d4", "#7c3aed"],
  animationSpeed = 5,
  direction = "horizontal",
  className,
}: AnimatedGradientTextProps) {
  const gradientStyle = React.useMemo(() => {
    const colorString = colors.join(", ");

    if (direction === "radial") {
      return {
        backgroundImage: `radial-gradient(circle, ${colorString})`,
        backgroundSize: "200% 200%",
      };
    }

    if (direction === "diagonal") {
      return {
        backgroundImage: `linear-gradient(135deg, ${colorString})`,
        backgroundSize: "300% 300%",
      };
    }

    return {
      backgroundImage: `linear-gradient(90deg, ${colorString})`,
      backgroundSize: "300% 100%",
    };
  }, [colors, direction]);

  const animationKeyframes = React.useMemo(() => {
    if (direction === "radial") {
      return {
        backgroundPosition: [
          "0% 0%",
          "100% 100%",
          "0% 100%",
          "100% 0%",
          "0% 0%",
        ],
      };
    }
    return {
      backgroundPosition: ["0% center", "100% center", "0% center"],
    };
  }, [direction]);

  return (
    <motion.span
      className={cn(
        "bg-clip-text text-transparent inline-block",
        className
      )}
      style={gradientStyle}
      animate={animationKeyframes}
      transition={{
        duration: animationSpeed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * AnimatedGradientBorder - Element with animated gradient border
 *
 * @example
 * <AnimatedGradientBorder>
 *   <div className="p-6">Content inside</div>
 * </AnimatedGradientBorder>
 */

interface AnimatedGradientBorderProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  borderWidth?: number;
  borderRadius?: string;
  className?: string;
  containerClassName?: string;
}

export function AnimatedGradientBorder({
  children,
  colors = ["#7c3aed", "#ec4899", "#3b82f6", "#06b6d4", "#7c3aed"],
  animationSpeed = 3,
  borderWidth = 2,
  borderRadius = "1rem",
  className,
  containerClassName,
}: AnimatedGradientBorderProps) {
  return (
    <div
      className={cn("relative p-[2px] overflow-hidden", containerClassName)}
      style={{ borderRadius }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: "300% 100%",
          borderRadius,
        }}
        animate={{
          backgroundPosition: ["0% center", "100% center", "0% center"],
        }}
        transition={{
          duration: animationSpeed,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content container */}
      <div
        className={cn("relative bg-white dark:bg-neutral-900", className)}
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * AnimatedGradientButton - Button with animated gradient
 *
 * @example
 * <AnimatedGradientButton>
 *   Click me
 * </AnimatedGradientButton>
 */

interface AnimatedGradientButtonProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function AnimatedGradientButton({
  children,
  colors = ["#7c3aed", "#ec4899", "#3b82f6", "#7c3aed"],
  animationSpeed = 3,
  onClick,
  disabled,
  className,
}: AnimatedGradientButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative px-6 py-3 rounded-full font-medium text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      style={{
        background: `linear-gradient(90deg, ${colors.join(", ")})`,
        backgroundSize: "300% 100%",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: "300% 100%",
        }}
        animate={{
          backgroundPosition: ["0% center", "100% center", "0% center"],
        }}
        transition={{
          duration: animationSpeed,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

/**
 * ShimmerText - Text with shimmer/shine effect
 *
 * @example
 * <ShimmerText>Shimmering text</ShimmerText>
 */

interface ShimmerTextProps {
  children: React.ReactNode;
  shimmerColor?: string;
  duration?: number;
  className?: string;
}

export function ShimmerText({
  children,
  shimmerColor = "rgba(255, 255, 255, 0.5)",
  duration = 2,
  className,
}: ShimmerTextProps) {
  return (
    <span className={cn("relative inline-block overflow-hidden", className)}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 z-20"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["-100% center", "200% center"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      />
    </span>
  );
}

/**
 * GlowText - Text with animated glow effect
 *
 * @example
 * <GlowText color="#7c3aed">Glowing text</GlowText>
 */

interface GlowTextProps {
  children: React.ReactNode;
  color?: string;
  intensity?: "subtle" | "medium" | "strong";
  pulse?: boolean;
  className?: string;
}

export function GlowText({
  children,
  color = "#7c3aed",
  intensity = "medium",
  pulse = true,
  className,
}: GlowTextProps) {
  const glowSizes = {
    subtle: "0 0 10px",
    medium: "0 0 20px",
    strong: "0 0 40px",
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={{ color }}
      animate={
        pulse
          ? {
              textShadow: [
                `${glowSizes[intensity]} ${color}40`,
                `${glowSizes[intensity]} ${color}80`,
                `${glowSizes[intensity]} ${color}40`,
              ],
            }
          : { textShadow: `${glowSizes[intensity]} ${color}60` }
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * MorphText - Text that morphs between different words
 *
 * @example
 * <MorphText words={["Fast", "Simple", "Powerful"]} />
 */

interface MorphTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function MorphText({
  words,
  interval = 3,
  className,
}: MorphTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={cn("relative inline-block", className)}>
      {words.map((word, index) => (
        <motion.span
          key={word}
          className="absolute left-0 top-0"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{
            opacity: currentIndex === index ? 1 : 0,
            y: currentIndex === index ? 0 : -20,
            filter: currentIndex === index ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
      {/* Invisible placeholder for width */}
      <span className="invisible">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
    </span>
  );
}

/**
 * Preset gradient colors
 */
export const GradientTextPresets = {
  sunset: ["#f97316", "#ef4444", "#ec4899", "#f97316"],
  ocean: ["#0ea5e9", "#3b82f6", "#8b5cf6", "#0ea5e9"],
  forest: ["#22c55e", "#10b981", "#06b6d4", "#22c55e"],
  fire: ["#ef4444", "#f97316", "#fbbf24", "#ef4444"],
  cosmic: ["#8b5cf6", "#ec4899", "#f43f5e", "#8b5cf6"],
  aurora: ["#06b6d4", "#8b5cf6", "#ec4899", "#06b6d4"],
  gold: ["#fbbf24", "#f59e0b", "#d97706", "#fbbf24"],
  silver: ["#9ca3af", "#d1d5db", "#e5e7eb", "#9ca3af"],
};
