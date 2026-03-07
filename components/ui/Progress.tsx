"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Progress Component - Progress bars
 *
 * @example
 * <Progress value={75} />
 * <Progress value={50} variant="gradient" showValue />
 */

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: "default" | "gradient" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  animated?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = "default",
      size = "md",
      showValue = false,
      animated = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeStyles = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    };

    const variantStyles = {
      default: "bg-primary-500",
      gradient: "bg-gradient-to-r from-primary-500 to-secondary-500",
      success: "bg-green-500",
      warning: "bg-amber-500",
      error: "bg-red-500",
    };

    return (
      <div className={cn("w-full", className)} {...props}>
        {showValue && (
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-neutral-600">Progress</span>
            <span className="font-medium text-neutral-900">{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            "w-full bg-neutral-200 rounded-full overflow-hidden",
            sizeStyles[size]
          )}
        >
          <motion.div
            initial={animated ? { width: 0 } : false}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "h-full rounded-full",
              variantStyles[variant]
            )}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

/**
 * CircularProgress - Circular progress indicator
 *
 * @example
 * <CircularProgress value={75} />
 */

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  showValue = true,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-neutral-200"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-primary-500"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-neutral-900">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export { Progress, CircularProgress };
