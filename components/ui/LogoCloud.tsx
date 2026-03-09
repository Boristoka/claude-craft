"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

/**
 * LogoCloud - Display client/partner logos with premium hover effects
 * Grayscale to color transitions, spotlight effects
 */

interface Logo {
  name: string;
  logo?: React.ReactNode;
  href?: string;
}

interface LogoCloudProps {
  logos: Logo[];
  title?: string;
  columns?: 3 | 4 | 5 | 6;
  variant?: "default" | "grayscale" | "bordered" | "spotlight";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LogoCloud({
  logos,
  title,
  columns = 5,
  variant = "grayscale",
  size = "md",
  className,
}: LogoCloudProps) {
  const gridCols = {
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const sizes = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  return (
    <div className={cn("text-center", className)}>
      {title && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 uppercase tracking-wider"
        >
          {title}
        </motion.p>
      )}
      <div className={cn("grid gap-8 md:gap-12 items-center", gridCols[columns])}>
        {logos.map((logo, index) => (
          <LogoItem
            key={logo.name}
            logo={logo}
            index={index}
            variant={variant}
            size={sizes[size]}
          />
        ))}
      </div>
    </div>
  );
}

function LogoItem({
  logo,
  index,
  variant,
  size,
}: {
  logo: Logo;
  index: number;
  variant: string;
  size: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = React.useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      120px circle at ${mouseX}px ${mouseY}px,
      rgba(120, 119, 198, 0.15),
      transparent 80%
    )
  `;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative flex items-center justify-center py-4 transition-all duration-300",
        variant === "bordered" &&
          "border border-neutral-200 dark:border-neutral-800 rounded-xl px-6 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg",
        variant === "spotlight" &&
          "border border-neutral-200 dark:border-neutral-800 rounded-xl px-6 overflow-hidden"
      )}
    >
      {/* Spotlight effect */}
      {variant === "spotlight" && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: spotlightBackground }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      )}

      <div
        className={cn(
          "relative transition-all duration-500",
          variant === "grayscale" && !isHovered && "opacity-50 grayscale",
          variant === "grayscale" && isHovered && "opacity-100 grayscale-0",
          variant !== "grayscale" && !isHovered && "opacity-70",
          variant !== "grayscale" && isHovered && "opacity-100"
        )}
      >
        <LogoContent logo={logo} size={size} />
      </div>
    </motion.div>
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        {content}
      </a>
    );
  }

  return <div className="group">{content}</div>;
}

function LogoContent({ logo, size }: { logo: Logo; size: string }) {
  if (logo.logo) {
    return <div className={size}>{logo.logo}</div>;
  }

  // Fallback: text-based logo
  return (
    <span className="text-lg font-semibold text-neutral-900 dark:text-white">
      {logo.name}
    </span>
  );
}

/**
 * TrustBadges - Row of animated trust indicators with counters
 * Premium version with icon animations and value counters
 */

interface TrustBadge {
  icon: React.ReactNode;
  label: string;
  description?: string;
  value?: number;
  suffix?: string;
}

interface TrustBadgesProps {
  badges: TrustBadge[];
  variant?: "horizontal" | "grid" | "cards";
  className?: string;
}

export function TrustBadges({
  badges,
  variant = "horizontal",
  className,
}: TrustBadgesProps) {
  if (variant === "cards") {
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
        {badges.map((badge, index) => (
          <TrustBadgeCard key={badge.label} badge={badge} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        variant === "horizontal"
          ? "flex flex-wrap justify-center gap-8 md:gap-12"
          : "grid grid-cols-2 md:grid-cols-4 gap-6",
        className
      )}
    >
      {badges.map((badge, index) => (
        <TrustBadgeItem key={badge.label} badge={badge} index={index} variant={variant} />
      ))}
    </div>
  );
}

function TrustBadgeItem({
  badge,
  index,
  variant,
}: {
  badge: TrustBadge;
  index: number;
  variant: string;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "flex items-center gap-3 group",
        variant === "grid" && "flex-col text-center"
      )}
    >
      {/* Animated icon container */}
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
      >
        {/* Pulse effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-500/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
        <motion.div
          animate={{
            y: isHovered ? [0, -2, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {badge.icon}
        </motion.div>
      </motion.div>
      <div>
        {badge.value !== undefined ? (
          <p className="font-bold text-lg text-neutral-900 dark:text-white">
            <CountUpValue value={badge.value} suffix={badge.suffix} />
          </p>
        ) : (
          <p className="font-medium text-neutral-900 dark:text-white text-sm">
            {badge.label}
          </p>
        )}
        {badge.description && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {badge.value !== undefined ? badge.label : badge.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function TrustBadgeCard({
  badge,
  index,
}: {
  badge: TrustBadge;
  index: number;
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      150px circle at ${mouseX}px ${mouseY}px,
      rgba(120, 119, 198, 0.1),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg transition-all text-center"
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlightBackground }}
      />

      {/* Animated icon */}
      <motion.div
        animate={{
          scale: isHovered ? 1.15 : 1,
          rotate: isHovered ? 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 mx-auto mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
      >
        {badge.icon}
      </motion.div>

      {badge.value !== undefined ? (
        <>
          <p className="font-bold text-2xl text-neutral-900 dark:text-white mb-1">
            <CountUpValue value={badge.value} suffix={badge.suffix} />
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {badge.label}
          </p>
        </>
      ) : (
        <>
          <p className="font-semibold text-neutral-900 dark:text-white mb-1">
            {badge.label}
          </p>
          {badge.description && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {badge.description}
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}

/**
 * CountUpValue - Animated counter
 */
function CountUpValue({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/**
 * TrustIcons - Animated icons for trust badges
 */
export const TrustIcons = {
  Truck: () => (
    <motion.svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      whileHover={{ x: [0, 3, 0] }}
      transition={{ duration: 0.5 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </motion.svg>
  ),
  Return: () => (
    <motion.svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      whileHover={{ rotate: [0, -15, 15, 0] }}
      transition={{ duration: 0.5 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
    </motion.svg>
  ),
  Shield: () => (
    <motion.svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      whileHover={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.4 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </motion.svg>
  ),
  Support: () => (
    <motion.svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </motion.svg>
  ),
  CreditCard: () => (
    <motion.svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      whileHover={{ y: [0, -2, 0] }}
      transition={{ duration: 0.3 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </motion.svg>
  ),
  Gift: () => (
    <motion.svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      whileHover={{ rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.4 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </motion.svg>
  ),
  Star: () => (
    <motion.svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      whileHover={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
      transition={{ duration: 0.4 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </motion.svg>
  ),
  Clock: () => (
    <motion.svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </motion.svg>
  ),
};
