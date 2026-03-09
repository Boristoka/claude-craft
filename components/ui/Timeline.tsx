"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";

/**
 * Timeline - Vertical timeline with scroll-triggered animations
 * Premium version with animated line drawing, glowing dots, and hover effects
 */

interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  company?: string;
  description?: string;
  current?: boolean;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: "default" | "alternating" | "compact" | "glow";
  className?: string;
}

export function Timeline({
  items,
  variant = "default",
  className,
}: TimelineProps) {
  if (variant === "compact") {
    return <CompactTimeline items={items} className={className} />;
  }

  if (variant === "alternating") {
    return <AlternatingTimeline items={items} className={className} />;
  }

  if (variant === "glow") {
    return <GlowTimeline items={items} className={className} />;
  }

  return <DefaultTimeline items={items} className={className} />;
}

/**
 * DefaultTimeline - With scroll-triggered line animation
 */
function DefaultTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Animated vertical line */}
      <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary-500 via-primary-500 to-transparent"
          style={{ scaleY: springProgress, transformOrigin: "top" }}
        />
      </div>

      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineEntry
            key={index}
            item={item}
            index={index}
            totalItems={items.length}
            progress={springProgress}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineEntry({
  item,
  index,
  totalItems,
  progress,
}: {
  item: TimelineItem;
  index: number;
  totalItems: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const itemProgress = useTransform(
    progress,
    [index / totalItems, (index + 1) / totalItems],
    [0, 1]
  );
  const isActive = useTransform(itemProgress, (v) => v > 0.1);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = isActive.on("change", setActive);
    return () => unsubscribe();
  }, [isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pl-8 md:pl-20"
    >
      {/* Animated Dot */}
      <motion.div
        className={cn(
          "absolute left-0 md:left-8 w-4 h-4 rounded-full -translate-x-1/2 mt-1 transition-all duration-300",
          item.current || active
            ? "bg-primary-500"
            : "bg-neutral-400 dark:bg-neutral-600"
        )}
        animate={{
          scale: isHovered || item.current ? 1.3 : 1,
          boxShadow: item.current
            ? "0 0 20px rgba(var(--color-primary-500), 0.6)"
            : isHovered
            ? "0 0 15px rgba(var(--color-primary-500), 0.4)"
            : "none",
        }}
      >
        {/* Pulse ring for current */}
        {item.current && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-500"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Year badge */}
      <motion.div
        className="absolute left-0 md:left-0 -translate-x-full pr-4 hidden md:block"
        animate={{ opacity: active ? 1 : 0.5 }}
      >
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {item.year}
        </span>
      </motion.div>

      {/* Content card */}
      <motion.div
        className={cn(
          "relative p-4 -ml-4 rounded-xl transition-all duration-300",
          isHovered && "bg-neutral-50 dark:bg-neutral-900/50"
        )}
        whileHover={{ x: 4 }}
      >
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 md:hidden">
          {item.year}
        </span>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {item.title}
        </h3>
        {(item.subtitle || item.company) && (
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            {item.subtitle || item.company}
          </p>
        )}
        {item.description && (
          <motion.p
            className="text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {item.description}
          </motion.p>
        )}
        {item.current && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mt-3 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full"
          >
            Current
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

function CompactTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ x: 4, backgroundColor: "var(--neutral-100)" }}
          className="group flex items-start gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 transition-all duration-200"
        >
          <div className="flex-shrink-0 w-16 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {item.year}
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {item.title}
            </h3>
            {item.company && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {item.company}
              </p>
            )}
          </div>
          {item.current && (
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs font-medium text-primary-600 dark:text-primary-400"
            >
              Now
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function AlternatingTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Animated center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary-500 via-primary-500 to-transparent"
          style={{ scaleY: springProgress, transformOrigin: "top" }}
        />
      </div>

      <div className="space-y-16">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative grid grid-cols-2 gap-8"
            >
              {/* Content */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow",
                  isLeft ? "text-right pr-8" : "order-2 text-left pl-8"
                )}
              >
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {item.year}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mt-1">
                  {item.title}
                </h3>
                {item.company && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {item.company}
                  </p>
                )}
                {item.description && (
                  <p className="text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.div>

              {/* Animated Dot with glow */}
              <motion.div
                className={cn(
                  "absolute left-1/2 top-6 w-5 h-5 rounded-full -translate-x-1/2 border-4 border-white dark:border-neutral-950 z-10",
                  item.current
                    ? "bg-primary-500"
                    : "bg-neutral-300 dark:bg-neutral-700"
                )}
                whileInView={{
                  boxShadow: item.current
                    ? "0 0 25px rgba(var(--color-primary-500), 0.6)"
                    : "none",
                }}
              >
                {item.current && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary-500"
                    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Empty space for other side */}
              <div className={!isLeft ? "order-1" : ""} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * GlowTimeline - Premium timeline with neon glow effects
 */
function GlowTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* Glowing line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 blur-sm" />
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500" />

      <div className="space-y-10">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-16"
          >
            {/* Glowing dot */}
            <motion.div
              className="absolute left-4 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
              whileHover={{ scale: 1.3 }}
              animate={{
                boxShadow: [
                  "0 0 10px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 10px rgba(139, 92, 246, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </motion.div>

            {/* Year */}
            <motion.span
              className="text-xs font-medium text-purple-400 uppercase tracking-wider"
              whileInView={{ opacity: [0, 1] }}
            >
              {item.year}
            </motion.span>

            {/* Content */}
            <motion.div
              whileHover={{ x: 8 }}
              className="mt-1"
            >
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>
              {item.company && (
                <p className="text-neutral-400">{item.company}</p>
              )}
              {item.description && (
                <p className="text-neutral-500 mt-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * ProcessSteps - Horizontal or vertical process/how-it-works with premium animations
 */

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  variant?: "horizontal" | "vertical" | "cards" | "connected";
  className?: string;
}

export function ProcessSteps({
  steps,
  variant = "horizontal",
  className,
}: ProcessStepsProps) {
  if (variant === "vertical") {
    return (
      <div className={cn("space-y-8", className)}>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 8 }}
            className="group flex gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-semibold group-hover:bg-primary-500 dark:group-hover:bg-primary-500 group-hover:text-white transition-colors"
            >
              {step.number}
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className={cn("grid md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
        {steps.map((step, index) => (
          <ProcessCard key={index} step={step} index={index} />
        ))}
      </div>
    );
  }

  if (variant === "connected") {
    return (
      <div className={cn("relative", className)}>
        {/* Connecting line */}
        <div className="absolute top-6 left-0 right-0 h-px bg-neutral-200 dark:bg-neutral-800 hidden md:block" />

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white flex items-center justify-center font-bold mx-auto mb-4"
              >
                {step.number}
              </motion.div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Horizontal (default)
  return (
    <div className={cn("grid md:grid-cols-4 gap-8", className)}>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8 }}
          className="text-center group"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-14 h-14 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold mx-auto mb-4 group-hover:bg-primary-500 dark:group-hover:bg-primary-500 group-hover:text-white transition-all"
          >
            {step.number}
          </motion.div>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {step.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: ProcessStep;
  index: number;
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
      250px circle at ${mouseX}px ${mouseY}px,
      rgba(120, 119, 198, 0.1),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl transition-all"
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlightBackground }}
      />

      <motion.div
        className="relative text-4xl font-serif text-neutral-200 dark:text-neutral-700 mb-4"
        animate={{ scale: isHovered ? 1.1 : 1 }}
      >
        {step.number}
      </motion.div>
      <h3 className="relative text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {step.title}
      </h3>
      <p className="relative text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
        {step.description}
      </p>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
          transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 0.7s ease-in-out",
        }}
      />
    </motion.div>
  );
}
