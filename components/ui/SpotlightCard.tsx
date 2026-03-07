"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SpotlightCard - Card with cursor-following glow effect
 * Inspired by Stripe, Raycast, and premium SaaS interfaces
 *
 * @example
 * <SpotlightCard>
 *   <h3>Feature Title</h3>
 *   <p>Description</p>
 * </SpotlightCard>
 */

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(120, 119, 198, 0.15)",
  borderColor,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl md:rounded-3xl",
        "bg-white dark:bg-neutral-900",
        "border border-neutral-200 dark:border-neutral-800",
        "p-6 md:p-8",
        className
      )}
      style={{
        borderColor: borderColor,
      }}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/**
 * SpotlightCardGrid - Grid of spotlight cards
 */
interface SpotlightCardGridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function SpotlightCardGrid({
  children,
  className,
  columns = 3,
}: SpotlightCardGridProps) {
  const colsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4 md:gap-6", colsClass[columns], className)}>
      {children}
    </div>
  );
}

/**
 * SpotlightFeatureCard - Pre-styled feature card with spotlight
 */
interface SpotlightFeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightFeatureCard({
  icon,
  title,
  description,
  className,
  spotlightColor,
}: SpotlightFeatureCardProps) {
  return (
    <SpotlightCard className={className} spotlightColor={spotlightColor}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/50 dark:to-accent-900/50 flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
        {description}
      </p>
    </SpotlightCard>
  );
}

/**
 * SpotlightBorderCard - Card with animated gradient border on hover
 */
interface SpotlightBorderCardProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightBorderCard({
  children,
  className,
}: SpotlightBorderCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("relative p-[1px] rounded-2xl md:rounded-3xl group", className)}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl md:rounded-3xl transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, hsl(var(--color-primary-500)), hsl(var(--color-accent-500)), transparent 60%)`,
        }}
      />

      {/* Static border for non-hover state */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-neutral-200 dark:border-neutral-800 transition-opacity duration-500 group-hover:opacity-0" />

      {/* Card content */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl md:rounded-3xl p-6 md:p-8 h-full">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * GlowingOrb - Decorative glowing orb for backgrounds
 */
interface GlowingOrbProps {
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

export function GlowingOrb({
  color = "hsl(var(--color-primary-500))",
  size = "md",
  className,
  animate = true,
}: GlowingOrbProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };

  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl opacity-30",
        sizeClasses[size],
        animate && "animate-pulse",
        className
      )}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
