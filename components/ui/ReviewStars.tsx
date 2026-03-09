"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * ReviewStars - Animated star rating display and input
 * E-commerce component for ratings and reviews
 *
 * @example
 * // Display only
 * <ReviewStars rating={4.5} />
 *
 * @example
 * // Interactive input
 * <ReviewStars rating={rating} onChange={setRating} interactive />
 */

interface ReviewStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  onChange?: (rating: number) => void;
  allowHalf?: boolean;
  color?: string;
  emptyColor?: string;
  className?: string;
}

export function ReviewStars({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  showValue = false,
  showCount = false,
  count = 0,
  onChange,
  allowHalf = true,
  color = "#fbbf24",
  emptyColor = "#d1d5db",
  className,
}: ReviewStarsProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const displayRating = hoverRating ?? rating;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const handleClick = (index: number, isHalf: boolean) => {
    if (!interactive || !onChange) return;
    const newRating = isHalf && allowHalf ? index + 0.5 : index + 1;
    onChange(newRating);
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    setHoverRating(isHalf && allowHalf ? index + 0.5 : index + 1);
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, index) => {
          const filled = displayRating >= index + 1;
          const halfFilled = !filled && displayRating > index && displayRating < index + 1;

          return (
            <motion.button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const isHalf = e.clientX - rect.left < rect.width / 2;
                handleClick(index, isHalf);
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoverRating(null)}
              whileHover={interactive ? { scale: 1.2 } : undefined}
              whileTap={interactive ? { scale: 0.9 } : undefined}
              className={cn(
                "relative",
                interactive && "cursor-pointer",
                !interactive && "cursor-default"
              )}
            >
              {/* Empty star (background) */}
              <Star className={sizeClasses[size]} fill={emptyColor} stroke="none" />

              {/* Filled star (overlay) */}
              {(filled || halfFilled) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: halfFilled ? "50%" : "100%" }}
                >
                  <Star className={sizeClasses[size]} fill={color} stroke="none" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {showValue && (
        <span className={cn("font-medium text-neutral-900 dark:text-white ml-1", textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}

      {showCount && count > 0 && (
        <span className={cn("text-neutral-500 dark:text-neutral-400 ml-1", textSizes[size])}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}

/**
 * Star SVG component
 */
function Star({ className, fill, stroke }: { className?: string; fill?: string; stroke?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={stroke ? 2 : 0}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/**
 * RatingInput - Complete rating input with label
 */
interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  required?: boolean;
  className?: string;
}

export function RatingInput({
  value,
  onChange,
  label = "Your rating",
  required = false,
  className,
}: RatingInputProps) {
  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex items-center gap-3">
        <ReviewStars
          rating={value}
          onChange={onChange}
          interactive
          size="lg"
        />
        {value > 0 && (
          <motion.span
            key={value}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-neutral-600 dark:text-neutral-400"
          >
            {labels[Math.ceil(value) - 1]}
          </motion.span>
        )}
      </div>
    </div>
  );
}

/**
 * RatingSummary - Display rating distribution
 */
interface RatingSummaryProps {
  average: number;
  total: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  className?: string;
}

export function RatingSummary({
  average,
  total,
  distribution,
  className,
}: RatingSummaryProps) {
  const maxCount = Math.max(...Object.values(distribution));

  return (
    <div className={cn("flex gap-8", className)}>
      {/* Average */}
      <div className="text-center">
        <div className="text-5xl font-bold text-neutral-900 dark:text-white">
          {average.toFixed(1)}
        </div>
        <ReviewStars rating={average} size="md" className="justify-center mt-2" />
        <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {total.toLocaleString()} reviews
        </div>
      </div>

      {/* Distribution */}
      <div className="flex-1 space-y-2">
        {([5, 4, 3, 2, 1] as const).map((stars) => {
          const count = distribution[stars];
          const percentage = total > 0 ? (count / total) * 100 : 0;
          const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

          return (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm text-neutral-600 dark:text-neutral-400 w-8">
                {stars}
              </span>
              <Star className="w-4 h-4" fill="#fbbf24" stroke="none" />
              <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${barWidth}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (5 - stars) * 0.1 }}
                />
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 w-12 text-right">
                {percentage.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * SizeSelector - Visual size picker for e-commerce
 */
interface SizeOption {
  value: string;
  label: string;
  available?: boolean;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "default" | "pills" | "boxes";
  showAvailability?: boolean;
  className?: string;
}

export function SizeSelector({
  sizes,
  value,
  onChange,
  variant = "default",
  showAvailability = true,
  className,
}: SizeSelectorProps) {
  if (variant === "pills") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {sizes.map((size) => (
          <motion.button
            key={size.value}
            type="button"
            disabled={showAvailability && size.available === false}
            onClick={() => onChange(size.value)}
            whileHover={{ scale: size.available !== false ? 1.05 : 1 }}
            whileTap={{ scale: size.available !== false ? 0.95 : 1 }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              value === size.value
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700",
              showAvailability && size.available === false && "opacity-40 cursor-not-allowed line-through"
            )}
          >
            {size.label}
          </motion.button>
        ))}
      </div>
    );
  }

  if (variant === "boxes") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {sizes.map((size) => (
          <motion.button
            key={size.value}
            type="button"
            disabled={showAvailability && size.available === false}
            onClick={() => onChange(size.value)}
            whileHover={{ scale: size.available !== false ? 1.05 : 1 }}
            whileTap={{ scale: size.available !== false ? 0.95 : 1 }}
            className={cn(
              "w-14 h-14 rounded-xl text-sm font-medium transition-all flex items-center justify-center",
              value === size.value
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 ring-2 ring-offset-2 ring-neutral-900 dark:ring-white"
                : "border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white hover:border-neutral-400 dark:hover:border-neutral-500",
              showAvailability && size.available === false && "opacity-40 cursor-not-allowed"
            )}
          >
            {size.label}
            {showAvailability && size.available === false && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-neutral-400 rotate-45" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {sizes.map((size) => (
        <motion.button
          key={size.value}
          type="button"
          disabled={showAvailability && size.available === false}
          onClick={() => onChange(size.value)}
          whileHover={{ scale: size.available !== false ? 1.02 : 1 }}
          whileTap={{ scale: size.available !== false ? 0.98 : 1 }}
          className={cn(
            "min-w-[3rem] px-3 py-2 rounded-lg text-sm font-medium transition-all border-2",
            value === size.value
              ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
              : "border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white hover:border-neutral-400 dark:hover:border-neutral-500",
            showAvailability && size.available === false && "opacity-40 cursor-not-allowed line-through"
          )}
        >
          {size.label}
        </motion.button>
      ))}
    </div>
  );
}

/**
 * ColorSelector - Visual color picker for e-commerce
 */
interface ColorOption {
  value: string;
  label: string;
  color: string;
  available?: boolean;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function ColorSelector({
  colors,
  value,
  onChange,
  size = "md",
  showLabel = true,
  className,
}: ColorSelectorProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const selectedColor = colors.find((c) => c.value === value);

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {colors.map((color) => (
          <motion.button
            key={color.value}
            type="button"
            disabled={color.available === false}
            onClick={() => onChange(color.value)}
            whileHover={{ scale: color.available !== false ? 1.1 : 1 }}
            whileTap={{ scale: color.available !== false ? 0.9 : 1 }}
            className={cn(
              "relative rounded-full transition-all",
              sizeClasses[size],
              value === color.value && "ring-2 ring-offset-2 ring-neutral-900 dark:ring-white",
              color.available === false && "opacity-40 cursor-not-allowed"
            )}
            style={{ backgroundColor: color.color }}
            title={color.label}
          >
            {color.available === false && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-white/80 rotate-45 rounded-full" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
      {showLabel && selectedColor && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          {selectedColor.label}
        </p>
      )}
    </div>
  );
}
