"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * GradientBlob - Animated floating gradient blobs for premium backgrounds
 * Inspired by Stripe, Linear, and Vercel's aesthetic
 *
 * @example
 * // As page background
 * <GradientBlob variant="aurora" className="fixed inset-0 -z-10" />
 *
 * @example
 * // Behind hero section
 * <div className="relative">
 *   <GradientBlob variant="spotlight" />
 *   <YourHeroContent />
 * </div>
 */

interface GradientBlobProps {
  variant?: "default" | "aurora" | "spotlight" | "mesh" | "orbs" | "waves";
  colors?: string[];
  intensity?: "subtle" | "medium" | "vibrant";
  speed?: "slow" | "medium" | "fast";
  interactive?: boolean;
  className?: string;
}

export function GradientBlob({
  variant = "default",
  colors,
  intensity = "medium",
  speed = "medium",
  interactive = false,
  className,
}: GradientBlobProps) {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);
  const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });

  React.useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX / window.innerWidth;
      mouseY.current = e.clientY / window.innerHeight;
      setMousePos({ x: mouseX.current, y: mouseY.current });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  const opacityMap = {
    subtle: 0.3,
    medium: 0.5,
    vibrant: 0.7,
  };

  const durationMap = {
    slow: 20,
    medium: 12,
    fast: 6,
  };

  const baseOpacity = opacityMap[intensity];
  const duration = durationMap[speed];

  if (variant === "aurora") {
    return (
      <AuroraBlob
        colors={colors}
        opacity={baseOpacity}
        duration={duration}
        className={className}
      />
    );
  }

  if (variant === "spotlight") {
    return (
      <SpotlightBlob
        colors={colors}
        opacity={baseOpacity}
        mousePos={interactive ? mousePos : undefined}
        className={className}
      />
    );
  }

  if (variant === "mesh") {
    return (
      <MeshBlob
        colors={colors}
        opacity={baseOpacity}
        duration={duration}
        className={className}
      />
    );
  }

  if (variant === "orbs") {
    return (
      <OrbsBlob
        colors={colors}
        opacity={baseOpacity}
        duration={duration}
        className={className}
      />
    );
  }

  if (variant === "waves") {
    return (
      <WavesBlob
        colors={colors}
        opacity={baseOpacity}
        duration={duration}
        className={className}
      />
    );
  }

  // Default variant
  return (
    <DefaultBlob
      colors={colors}
      opacity={baseOpacity}
      duration={duration}
      className={className}
    />
  );
}

/**
 * DefaultBlob - Simple floating gradient circles
 */
function DefaultBlob({
  colors = ["#7c3aed", "#3b82f6", "#06b6d4"],
  opacity,
  duration,
  className,
}: {
  colors?: string[];
  opacity: number;
  duration: number;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
          opacity,
          top: "10%",
          left: "10%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, ${colors[1]} 0%, transparent 70%)`,
          opacity,
          top: "40%",
          right: "10%",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: duration * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${colors[2]} 0%, transparent 70%)`,
          opacity,
          bottom: "10%",
          left: "30%",
        }}
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: duration * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/**
 * AuroraBlob - Northern lights style gradient waves
 */
function AuroraBlob({
  colors = ["#7c3aed", "#3b82f6", "#10b981", "#06b6d4"],
  opacity,
  duration,
  className,
}: {
  colors?: string[];
  opacity: number;
  duration: number;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)`,
        }}
      />

      {/* Aurora bands */}
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute w-full h-[50%] blur-[100px]"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`,
            opacity: opacity * 0.6,
            top: `${index * 15}%`,
          }}
          animate={{
            x: ["-20%", "20%", "-20%"],
            skewX: [-5, 5, -5],
            scaleY: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: duration + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />
      ))}

      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)`,
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: duration * 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

/**
 * SpotlightBlob - Gradient that follows cursor or animates
 */
function SpotlightBlob({
  colors = ["#7c3aed", "#3b82f6"],
  opacity,
  mousePos,
  className,
}: {
  colors?: string[];
  opacity: number;
  mousePos?: { x: number; y: number };
  className?: string;
}) {
  const x = mousePos ? `${mousePos.x * 100}%` : "50%";
  const y = mousePos ? `${mousePos.y * 100}%` : "50%";

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute w-full h-full"
        style={{
          background: `radial-gradient(800px circle at ${x} ${y}, ${colors[0]}40 0%, ${colors[1]}20 25%, transparent 60%)`,
          opacity,
        }}
        animate={!mousePos ? {
          background: [
            `radial-gradient(800px circle at 30% 30%, ${colors[0]}40 0%, ${colors[1]}20 25%, transparent 60%)`,
            `radial-gradient(800px circle at 70% 60%, ${colors[0]}40 0%, ${colors[1]}20 25%, transparent 60%)`,
            `radial-gradient(800px circle at 40% 80%, ${colors[0]}40 0%, ${colors[1]}20 25%, transparent 60%)`,
            `radial-gradient(800px circle at 30% 30%, ${colors[0]}40 0%, ${colors[1]}20 25%, transparent 60%)`,
          ],
        } : undefined}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/**
 * MeshBlob - CSS mesh gradient with animation
 */
function MeshBlob({
  colors = ["#7c3aed", "#ec4899", "#3b82f6", "#06b6d4"],
  opacity,
  duration,
  className,
}: {
  colors?: string[];
  opacity: number;
  duration: number;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        style={{
          opacity,
          background: `
            radial-gradient(at 40% 20%, ${colors[0]} 0px, transparent 50%),
            radial-gradient(at 80% 0%, ${colors[1]} 0px, transparent 50%),
            radial-gradient(at 0% 50%, ${colors[2]} 0px, transparent 50%),
            radial-gradient(at 80% 50%, ${colors[3]} 0px, transparent 50%),
            radial-gradient(at 0% 100%, ${colors[0]} 0px, transparent 50%),
            radial-gradient(at 80% 100%, ${colors[1]} 0px, transparent 50%)
          `,
          filter: "blur(80px)",
        }}
        animate={{
          backgroundPosition: [
            "0% 0%, 100% 0%, 0% 100%, 100% 100%, 0% 0%, 100% 0%",
            "100% 100%, 0% 100%, 100% 0%, 0% 0%, 100% 100%, 0% 100%",
          ],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

/**
 * OrbsBlob - Multiple animated orbs/circles
 */
function OrbsBlob({
  colors = ["#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"],
  opacity,
  duration,
  className,
}: {
  colors?: string[];
  opacity: number;
  duration: number;
  className?: string;
}) {
  const orbs = [
    { size: 300, x: "20%", y: "20%", delay: 0 },
    { size: 250, x: "70%", y: "30%", delay: 1 },
    { size: 200, x: "30%", y: "70%", delay: 2 },
    { size: 350, x: "80%", y: "80%", delay: 0.5 },
    { size: 180, x: "50%", y: "50%", delay: 1.5 },
  ];

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-[60px]"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${colors[index % colors.length]} 0%, transparent 70%)`,
            opacity: opacity * 0.8,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: duration + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

/**
 * WavesBlob - Layered gradient waves
 */
function WavesBlob({
  colors = ["#7c3aed", "#3b82f6", "#06b6d4"],
  opacity,
  duration,
  className,
}: {
  colors?: string[];
  opacity: number;
  duration: number;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute inset-x-0 h-[60%]"
          style={{
            bottom: `${index * -10}%`,
            background: `linear-gradient(180deg, transparent 0%, ${color}80 30%, ${color} 100%)`,
            opacity: opacity * (0.3 + index * 0.2),
            borderRadius: "50% 50% 0 0",
          }}
          animate={{
            y: [0, -20, 0],
            scaleX: [1, 1.02, 1],
          }}
          transition={{
            duration: duration / 2 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Preset color palettes for quick use
 */
export const GradientPresets = {
  purple: ["#7c3aed", "#a855f7", "#c084fc"],
  blue: ["#3b82f6", "#0ea5e9", "#06b6d4"],
  green: ["#10b981", "#34d399", "#6ee7b7"],
  sunset: ["#f59e0b", "#f97316", "#ef4444"],
  pink: ["#ec4899", "#f472b6", "#fb7185"],
  ocean: ["#0369a1", "#0891b2", "#06b6d4"],
  forest: ["#15803d", "#16a34a", "#22c55e"],
  fire: ["#dc2626", "#f97316", "#fbbf24"],
  cosmic: ["#7c3aed", "#ec4899", "#3b82f6"],
  monochrome: ["#404040", "#525252", "#737373"],
};
