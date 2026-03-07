"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ParallaxImage - Image with scroll-based parallax effect
 */

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // 0.5 = slow, 1 = normal, 2 = fast
  direction?: "up" | "down";
  scale?: boolean;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className,
  speed = 0.5,
  direction = "up",
  scale = true,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * factor, -100 * speed * factor]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const smoothScale = useSpring(scaleValue, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-2xl", className)}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y: smoothY,
          scale: scale ? smoothScale : 1,
        }}
        className="w-full h-[120%] object-cover"
      />
    </div>
  );
};

/**
 * ParallaxSection - Section with multiple parallax layers
 */

interface ParallaxLayer {
  content: React.ReactNode;
  speed: number;
  className?: string;
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  layers?: ParallaxLayer[];
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  layers = [],
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Parallax layers */}
      {layers.map((layer, index) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [100 * layer.speed, -100 * layer.speed]
        );

        return (
          <motion.div
            key={index}
            style={{ y }}
            className={cn("absolute inset-0", layer.className)}
          >
            {layer.content}
          </motion.div>
        );
      })}

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * ParallaxText - Text that moves on scroll (marquee-like effect)
 */

interface ParallaxTextProps {
  children: string;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
}

const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  className,
  speed = 1,
  direction = "left",
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = direction === "left" ? -1 : 1;
  const x = useTransform(scrollYProgress, [0, 1], [0, 500 * speed * factor]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {/* Repeat text for seamless scroll */}
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-8">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export { ParallaxImage, ParallaxSection, ParallaxText };
