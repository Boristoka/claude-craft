"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * ProjectCard - Premium portfolio card with 3D tilt effect
 * Inspired by Awwwards winners and modern portfolio sites
 *
 * @example
 * <ProjectCard
 *   title="Brand Identity"
 *   category="Branding"
 *   image="/project.jpg"
 *   href="/projects/brand-identity"
 * />
 */

interface ProjectCardProps {
  title: string;
  category?: string;
  description?: string;
  image: string;
  href?: string;
  tags?: string[];
  year?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait";
}

export function ProjectCard({
  title,
  category,
  description,
  image,
  href = "#",
  tags,
  year,
  className,
  aspectRatio = "video",
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  }[aspectRatio];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("group relative", className)}
    >
      <Link href={href} className="block">
        {/* Card Container */}
        <div
          className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Image */}
          <div className={cn("relative w-full overflow-hidden", aspectRatioClass)}>
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            />

            {/* Category Badge */}
            {category && (
              <div className="absolute top-4 left-4">
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block px-3 py-1 text-xs font-medium bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-neutral-900 dark:text-white rounded-full"
                >
                  {category}
                </motion.span>
              </div>
            )}

            {/* Year Badge */}
            {year && (
              <div className="absolute top-4 right-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-black/30 backdrop-blur-sm text-white rounded-full">
                  {year}
                </span>
              </div>
            )}

            {/* View Project Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 right-4"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm font-medium rounded-full shadow-lg">
                View Project
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <motion.h3
            className="font-serif text-xl text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
            style={{ transform: "translateZ(20px)" }}
          >
            {title}
          </motion.h3>

          {description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
              {description}
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-neutral-500 dark:text-neutral-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * ProjectGrid - Responsive grid for project cards
 */
interface ProjectGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProjectGrid({
  children,
  columns = 3,
  className,
}: ProjectGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-6 md:gap-8", gridCols, className)}>
      {children}
    </div>
  );
}

/**
 * FeaturedProject - Large featured project card
 */
interface FeaturedProjectProps {
  title: string;
  category?: string;
  description?: string;
  image: string;
  href?: string;
  stats?: { label: string; value: string }[];
  className?: string;
}

export function FeaturedProject({
  title,
  category,
  description,
  image,
  href = "#",
  stats,
  className,
}: FeaturedProjectProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="relative aspect-square md:aspect-auto overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            {category && (
              <span className="inline-block w-fit px-3 py-1 mb-4 text-xs font-medium bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full">
                {category}
              </span>
            )}

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {title}
            </h2>

            {description && (
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">
                {description}
              </p>
            )}

            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-8 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium group-hover:gap-4 transition-all">
              <span>View Case Study</span>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
