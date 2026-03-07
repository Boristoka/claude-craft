"use client";

import * as React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnimateOnScroll - Animate elements when they enter the viewport
 *
 * @example
 * <AnimateOnScroll animation="fadeInUp">
 *   <Card>Content</Card>
 * </AnimateOnScroll>
 *
 * <AnimateOnScroll animation="scaleIn" delay={0.2}>
 *   <Card>Delayed content</Card>
 * </AnimateOnScroll>
 */

type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "slideInLeft"
  | "slideInRight";

const animations: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  },
  slideInRight: {
    hidden: { x: "100%" },
    visible: { x: 0 },
  },
};

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      variants={animations[animation]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerChildren - Animate children with stagger effect
 *
 * @example
 * <StaggerChildren>
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 *   <Card>Card 3</Card>
 * </StaggerChildren>
 */

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  animation?: AnimationType;
  className?: string;
  once?: boolean;
}

const StaggerChildren: React.FC<StaggerChildrenProps> = ({
  children,
  staggerDelay = 0.1,
  animation = "fadeInUp",
  className,
  once = true,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={animations[animation]}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * ParallaxScroll - Parallax effect on scroll
 *
 * @example
 * <ParallaxScroll speed={0.5}>
 *   <img src="..." />
 * </ParallaxScroll>
 */

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  speed = 0.5,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * speed;
        setOffsetY(rate);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y: offsetY }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

/**
 * CountUp - Animate number counting up
 *
 * @example
 * <CountUp end={1000} duration={2} suffix="+" />
 */

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function (ease out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}{count}{suffix}
    </span>
  );
};

export { AnimateOnScroll, StaggerChildren, ParallaxScroll, CountUp };
