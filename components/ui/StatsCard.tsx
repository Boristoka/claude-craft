"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

/**
 * StatsCard - Metrics card with animated counters and sparklines
 * Perfect for dashboards and analytics displays
 *
 * @example
 * <StatsCard
 *   title="Revenue"
 *   value={45231}
 *   prefix="$"
 *   change={12.5}
 *   changeType="increase"
 * />
 */

interface StatsCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  changePeriod?: string;
  icon?: React.ReactNode;
  sparklineData?: number[];
  variant?: "default" | "gradient" | "bordered" | "minimal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatsCard({
  title,
  value,
  prefix = "",
  suffix = "",
  change,
  changeType = "neutral",
  changePeriod = "vs last period",
  icon,
  sparklineData,
  variant = "default",
  size = "md",
  className,
}: StatsCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = React.useState(0);

  // Animate counter
  React.useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, increment * step);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const valueSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  const changeColors = {
    increase: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
    decrease: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
    neutral: "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800",
  };

  const variantClasses = {
    default: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
    gradient: "bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-white dark:to-neutral-100 text-white dark:text-neutral-900",
    bordered: "bg-transparent border-2 border-neutral-900 dark:border-white",
    minimal: "bg-neutral-50 dark:bg-neutral-800/50",
  };

  const isGradient = variant === "gradient";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-2xl overflow-hidden",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title */}
          <p className={cn(
            "text-sm font-medium mb-2",
            isGradient ? "text-white/70 dark:text-neutral-600" : "text-neutral-600 dark:text-neutral-400"
          )}>
            {title}
          </p>

          {/* Value */}
          <div className={cn("font-bold", valueSizes[size], isGradient ? "" : "text-neutral-900 dark:text-white")}>
            {prefix}
            {displayValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            {suffix}
          </div>

          {/* Change indicator */}
          {change !== undefined && (
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                changeColors[changeType]
              )}>
                {changeType === "increase" && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {changeType === "decrease" && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {Math.abs(change)}%
              </span>
              <span className={cn(
                "text-xs",
                isGradient ? "text-white/50 dark:text-neutral-500" : "text-neutral-500 dark:text-neutral-400"
              )}>
                {changePeriod}
              </span>
            </div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            isGradient
              ? "bg-white/10 dark:bg-neutral-900/10"
              : "bg-neutral-100 dark:bg-neutral-800"
          )}>
            {icon}
          </div>
        )}
      </div>

      {/* Sparkline */}
      {sparklineData && sparklineData.length > 0 && (
        <div className="mt-4">
          <Sparkline
            data={sparklineData}
            color={changeType === "increase" ? "#22c55e" : changeType === "decrease" ? "#ef4444" : "#6b7280"}
            height={40}
          />
        </div>
      )}
    </motion.div>
  );
}

/**
 * Sparkline - Simple line chart
 */
interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  showArea?: boolean;
  className?: string;
}

export function Sparkline({
  data,
  color = "#3b82f6",
  height = 40,
  showArea = true,
  className,
}: SparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const areaD = `M 0,100 L ${points.join(" L ")} L 100,100 Z`;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      style={{ height }}
    >
      {showArea && (
        <motion.path
          d={areaD}
          fill={color}
          fillOpacity={0.1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

/**
 * StatsGrid - Grid layout for multiple stats
 */
interface StatsGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsGrid({
  children,
  columns = 4,
  className,
}: StatsGridProps) {
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4 md:gap-6", columnClasses[columns], className)}>
      {children}
    </div>
  );
}

/**
 * MiniChart - Compact chart for inline display
 */
interface MiniChartProps {
  data: number[];
  type?: "line" | "bar";
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function MiniChart({
  data,
  type = "line",
  color = "#3b82f6",
  width = 80,
  height = 32,
  className,
}: MiniChartProps) {
  const max = Math.max(...data);

  if (type === "bar") {
    return (
      <div
        className={cn("flex items-end gap-0.5", className)}
        style={{ width, height }}
      >
        {data.map((value, index) => (
          <motion.div
            key={index}
            className="flex-1 rounded-t"
            style={{ backgroundColor: color }}
            initial={{ height: 0 }}
            animate={{ height: `${(value / max) * 100}%` }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={className} style={{ width, height }}>
      <Sparkline data={data} color={color} height={height} showArea={false} />
    </div>
  );
}

/**
 * StatComparison - Compare two values with visual indicator
 */
interface StatComparisonProps {
  label: string;
  current: number;
  previous: number;
  format?: (value: number) => string;
  className?: string;
}

export function StatComparison({
  label,
  current,
  previous,
  format = (v) => v.toLocaleString(),
  className,
}: StatComparisonProps) {
  const change = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
  const isIncrease = current >= previous;

  return (
    <div className={cn("flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0", className)}>
      <span className="text-sm text-neutral-600 dark:text-neutral-400">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-neutral-900 dark:text-white">
          {format(current)}
        </span>
        <span className={cn(
          "flex items-center gap-1 text-xs font-medium",
          isIncrease ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        )}>
          {isIncrease ? (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
