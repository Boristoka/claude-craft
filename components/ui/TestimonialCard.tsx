"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * TestimonialCard - Display a single testimonial/review
 *
 * @example
 * <TestimonialCard
 *   quote="Amazing work! They delivered beyond expectations."
 *   author="Sarah Johnson"
 *   role="CEO"
 *   company="TechCorp"
 *   avatar="https://..."
 * />
 */

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  variant?: "default" | "minimal" | "featured";
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  rating,
  variant = "default",
  className,
}: TestimonialCardProps) {
  const variants = {
    default: "bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800",
    minimal: "bg-transparent",
    featured: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
  };

  const quoteColor = {
    default: "text-neutral-700 dark:text-neutral-300",
    minimal: "text-neutral-700 dark:text-neutral-300",
    featured: "text-neutral-100 dark:text-neutral-800",
  };

  const authorColor = {
    default: "text-neutral-900 dark:text-white",
    minimal: "text-neutral-900 dark:text-white",
    featured: "text-white dark:text-neutral-900",
  };

  const metaColor = {
    default: "text-neutral-500 dark:text-neutral-400",
    minimal: "text-neutral-500 dark:text-neutral-400",
    featured: "text-neutral-400 dark:text-neutral-500",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-8",
        variants[variant],
        className
      )}
    >
      {/* Rating Stars */}
      {rating && (
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={cn(
                "w-5 h-5",
                star <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-neutral-300 dark:text-neutral-600"
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className={cn("text-lg leading-relaxed mb-6", quoteColor[variant])}>
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className={cn("font-semibold", authorColor[variant])}>{author}</p>
          {(role || company) && (
            <p className={cn("text-sm", metaColor[variant])}>
              {role}
              {role && company && " at "}
              {company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * TestimonialGrid - Display multiple testimonials in a grid
 *
 * @example
 * <TestimonialGrid testimonials={[...]} columns={3} />
 */

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
  columns?: 1 | 2 | 3;
  variant?: "default" | "minimal" | "featured";
  className?: string;
}

export function TestimonialGrid({
  testimonials,
  columns = 3,
  variant = "default",
  className,
}: TestimonialGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TestimonialCard {...testimonial} variant={variant} />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * TestimonialCarousel - Animated testimonial slider
 *
 * @example
 * <TestimonialCarousel testimonials={[...]} autoPlay />
 */

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((current + 1) % testimonials.length);

  return (
    <div className={cn("relative", className)}>
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${current * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <TestimonialCard {...testimonial} variant="default" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
        aria-label="Previous testimonial"
      >
        <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
        aria-label="Next testimonial"
      >
        <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === current
                ? "bg-neutral-900 dark:bg-white w-6"
                : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
