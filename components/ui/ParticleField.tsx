"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * ParticleField - Animated particle background effect
 * Subtle particles that can react to cursor movement
 *
 * @example
 * <ParticleField variant="floating" />
 *
 * @example
 * <ParticleField variant="connections" interactive />
 */

interface ParticleFieldProps {
  variant?: "floating" | "connections" | "stars" | "snow" | "fireflies" | "confetti";
  particleCount?: number;
  color?: string;
  interactive?: boolean;
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

export function ParticleField({
  variant = "floating",
  particleCount = 50,
  color = "#7c3aed",
  interactive = false,
  speed = "medium",
  className,
}: ParticleFieldProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  React.useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  const speedMultiplier = {
    slow: 2,
    medium: 1,
    fast: 0.5,
  }[speed];

  if (variant === "connections") {
    return (
      <ConnectionsParticles
        ref={containerRef}
        particleCount={particleCount}
        color={color}
        interactive={interactive}
        mouseX={springX}
        mouseY={springY}
        speedMultiplier={speedMultiplier}
        className={className}
      />
    );
  }

  if (variant === "stars") {
    return (
      <StarsParticles
        ref={containerRef}
        particleCount={particleCount}
        className={className}
      />
    );
  }

  if (variant === "snow") {
    return (
      <SnowParticles
        ref={containerRef}
        particleCount={particleCount}
        speedMultiplier={speedMultiplier}
        className={className}
      />
    );
  }

  if (variant === "fireflies") {
    return (
      <FirefliesParticles
        ref={containerRef}
        particleCount={Math.min(particleCount, 30)}
        color={color}
        speedMultiplier={speedMultiplier}
        className={className}
      />
    );
  }

  if (variant === "confetti") {
    return (
      <ConfettiParticles
        ref={containerRef}
        particleCount={particleCount}
        speedMultiplier={speedMultiplier}
        className={className}
      />
    );
  }

  // Default: floating particles
  return (
    <FloatingParticles
      ref={containerRef}
      particleCount={particleCount}
      color={color}
      interactive={interactive}
      mouseX={springX}
      mouseY={springY}
      speedMultiplier={speedMultiplier}
      className={className}
    />
  );
}

/**
 * FloatingParticles - Simple floating dots
 */
const FloatingParticles = React.forwardRef<
  HTMLDivElement,
  {
    particleCount: number;
    color: string;
    interactive: boolean;
    mouseX: ReturnType<typeof useSpring>;
    mouseY: ReturnType<typeof useSpring>;
    speedMultiplier: number;
    className?: string;
  }
>(({ particleCount, color, interactive, mouseX, mouseY, speedMultiplier, className }, ref) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: (10 + Math.random() * 20) * speedMultiplier,
      delay: Math.random() * 5,
    }));
  }, [particleCount, speedMultiplier]);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
});
FloatingParticles.displayName = "FloatingParticles";

/**
 * ConnectionsParticles - Particles with connecting lines
 */
const ConnectionsParticles = React.forwardRef<
  HTMLDivElement,
  {
    particleCount: number;
    color: string;
    interactive: boolean;
    mouseX: ReturnType<typeof useSpring>;
    mouseY: ReturnType<typeof useSpring>;
    speedMultiplier: number;
    className?: string;
  }
>(({ particleCount, color, speedMultiplier, className }, ref) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const particlesRef = React.useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
  }>>([]);
  const animationRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (0.5 / speedMultiplier),
      vy: (Math.random() - 0.5) * (0.5 / speedMultiplier),
      size: 2 + Math.random() * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.2 * (1 - dist / 120);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, color, speedMultiplier]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
});
ConnectionsParticles.displayName = "ConnectionsParticles";

/**
 * StarsParticles - Twinkling stars effect
 */
const StarsParticles = React.forwardRef<
  HTMLDivElement,
  {
    particleCount: number;
    className?: string;
  }
>(({ particleCount, className }, ref) => {
  const stars = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 1 + Math.random() * 3,
      delay: Math.random() * 3,
    }));
  }, [particleCount]);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none bg-neutral-950", className)}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
});
StarsParticles.displayName = "StarsParticles";

/**
 * SnowParticles - Falling snow effect
 */
const SnowParticles = React.forwardRef<
  HTMLDivElement,
  {
    particleCount: number;
    speedMultiplier: number;
    className?: string;
  }
>(({ particleCount, speedMultiplier, className }, ref) => {
  const snowflakes = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 2 + Math.random() * 6,
      duration: (5 + Math.random() * 10) * speedMultiplier,
      delay: Math.random() * 5,
      drift: (Math.random() - 0.5) * 50,
    }));
  }, [particleCount, speedMultiplier]);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            width: flake.size,
            height: flake.size,
            left: `${flake.x}%`,
            opacity: 0.5 + Math.random() * 0.5,
          }}
          initial={{ y: "-10%", x: 0 }}
          animate={{
            y: "110vh",
            x: [0, flake.drift, 0],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            ease: "linear",
            delay: flake.delay,
          }}
        />
      ))}
    </div>
  );
});
SnowParticles.displayName = "SnowParticles";

/**
 * FirefliesParticles - Glowing firefly effect
 */
const FirefliesParticles = React.forwardRef<
  HTMLDivElement,
  {
    particleCount: number;
    color: string;
    speedMultiplier: number;
    className?: string;
  }
>(({ particleCount, color, speedMultiplier, className }, ref) => {
  const fireflies = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 4 + Math.random() * 6,
      duration: (8 + Math.random() * 12) * speedMultiplier,
      delay: Math.random() * 5,
      glowDuration: 1 + Math.random() * 2,
    }));
  }, [particleCount, speedMultiplier]);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      {fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute rounded-full"
          style={{
            width: fly.size,
            height: fly.size,
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            backgroundColor: color,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 10, -30, 0],
            opacity: [0.2, 0.8, 0.3, 0.9, 0.2],
            boxShadow: [
              `0 0 5px ${color}`,
              `0 0 20px ${color}`,
              `0 0 5px ${color}`,
            ],
          }}
          transition={{
            duration: fly.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: fly.delay,
          }}
        />
      ))}
    </div>
  );
});
FirefliesParticles.displayName = "FirefliesParticles";

/**
 * ConfettiParticles - Falling confetti
 */
const ConfettiParticles = React.forwardRef<
  HTMLDivElement,
  {
    particleCount: number;
    speedMultiplier: number;
    className?: string;
  }
>(({ particleCount, speedMultiplier, className }, ref) => {
  const colors = ["#7c3aed", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  const confetti = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 8,
      duration: (3 + Math.random() * 5) * speedMultiplier,
      delay: Math.random() * 3,
      rotation: Math.random() * 360,
      shape: Math.random() > 0.5 ? "square" : "circle",
    }));
  }, [particleCount, speedMultiplier]);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className={piece.shape === "circle" ? "rounded-full" : ""}
          style={{
            position: "absolute",
            width: piece.size,
            height: piece.size * 0.6,
            left: `${piece.x}%`,
            backgroundColor: piece.color,
          }}
          initial={{ y: "-10%", rotate: piece.rotation }}
          animate={{
            y: "110vh",
            rotate: piece.rotation + 720,
            x: [0, 20, -20, 10, 0],
          }}
          transition={{
            duration: piece.duration,
            repeat: Infinity,
            ease: "linear",
            delay: piece.delay,
          }}
        />
      ))}
    </div>
  );
});
ConfettiParticles.displayName = "ConfettiParticles";

/**
 * GridPattern - Animated grid background
 */
interface GridPatternProps {
  size?: number;
  color?: string;
  fade?: boolean;
  className?: string;
}

export function GridPattern({
  size = 40,
  color = "rgba(0, 0, 0, 0.1)",
  fade = true,
  className,
}: GridPatternProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        maskImage: fade
          ? "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)"
          : undefined,
        WebkitMaskImage: fade
          ? "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)"
          : undefined,
      }}
    />
  );
}

/**
 * DotPattern - Animated dot grid background
 */
interface DotPatternProps {
  size?: number;
  spacing?: number;
  color?: string;
  fade?: boolean;
  className?: string;
}

export function DotPattern({
  size = 2,
  spacing = 20,
  color = "rgba(0, 0, 0, 0.2)",
  fade = true,
  className,
}: DotPatternProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        maskImage: fade
          ? "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)"
          : undefined,
        WebkitMaskImage: fade
          ? "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)"
          : undefined,
      }}
    />
  );
}
