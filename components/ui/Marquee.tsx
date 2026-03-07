"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Marquee - Infinite scrolling content
 * Perfect for logo clouds, testimonials, or any repeating content
 *
 * @example
 * <Marquee>
 *   <Logo1 />
 *   <Logo2 />
 * </Marquee>
 *
 * <Marquee direction="right" speed="slow">
 *   <TestimonialCard />
 * </Marquee>
 */

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
  repeat?: number;
}

export function Marquee({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  repeat = 4,
}: MarqueeProps) {
  const speedMap = {
    slow: "40s",
    normal: "25s",
    fast: "15s",
  };

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      {[...Array(repeat)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 items-center gap-8 md:gap-12",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{
            animation: `marquee ${speedMap[speed]} linear infinite`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * MarqueeItem - Wrapper for individual marquee items
 */
interface MarqueeItemProps {
  children: ReactNode;
  className?: string;
}

export function MarqueeItem({ children, className }: MarqueeItemProps) {
  return (
    <div className={cn("flex-shrink-0", className)}>
      {children}
    </div>
  );
}

/**
 * LogoMarquee - Pre-styled logo cloud with marquee
 */
interface LogoMarqueeProps {
  logos: {
    name: string;
    logo: ReactNode;
  }[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function LogoMarquee({ logos, speed = "normal", className }: LogoMarqueeProps) {
  return (
    <div className={cn("py-12", className)}>
      <Marquee speed={speed}>
        {logos.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-32 md:w-40 h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            {logo.logo}
          </div>
        ))}
      </Marquee>
    </div>
  );
}

/**
 * TestimonialMarquee - Pre-styled testimonial cards with marquee
 */
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface TestimonialMarqueeProps {
  testimonials: Testimonial[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function TestimonialMarquee({
  testimonials,
  direction = "left",
  speed = "slow",
  className,
}: TestimonialMarqueeProps) {
  return (
    <div className={cn("py-8", className)}>
      <Marquee direction={direction} speed={speed}>
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="w-[350px] md:w-[400px] flex-shrink-0 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
          >
            <div className="flex items-start gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <svg
                  key={j}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-3">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white text-sm">
                  {testimonial.author}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

/**
 * VerticalMarquee - Vertical scrolling content
 */
interface VerticalMarqueeProps {
  children: ReactNode;
  direction?: "up" | "down";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
  repeat?: number;
}

export function VerticalMarquee({
  children,
  direction = "up",
  speed = "normal",
  pauseOnHover = true,
  className,
  repeat = 4,
}: VerticalMarqueeProps) {
  const speedMap = {
    slow: "40s",
    normal: "25s",
    fast: "15s",
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden",
        "[mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      {[...Array(repeat)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col shrink-0 gap-4",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{
            animation: `marquee-vertical ${speedMap[speed]} linear infinite`,
            animationDirection: direction === "down" ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}

      <style jsx>{`
        @keyframes marquee-vertical {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  );
}
