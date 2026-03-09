"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * TeamCard - Modern team member card with hover effects
 * Inspired by premium agency sites with personality
 *
 * @example
 * <TeamCard
 *   name="Jane Doe"
 *   role="Creative Director"
 *   image="/team/jane.jpg"
 *   social={{ linkedin: "...", twitter: "..." }}
 * />
 */

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  dribbble?: string;
  email?: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  social?: SocialLinks;
}

interface TeamCardProps extends TeamMember {
  variant?: "default" | "minimal" | "overlay";
  className?: string;
}

export function TeamCard({
  name,
  role,
  image,
  bio,
  social,
  variant = "default",
  className,
}: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "minimal") {
    return <TeamCardMinimal name={name} role={role} image={image} className={className} />;
  }

  if (variant === "overlay") {
    return (
      <TeamCardOverlay
        name={name}
        role={role}
        image={image}
        bio={bio}
        social={social}
        className={className}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("group", className)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={name}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              isHovered ? "grayscale-0" : "grayscale-[30%]"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
        />

        {/* Social Links on Hover */}
        {social && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex justify-center gap-3"
          >
            {social.linkedin && (
              <SocialIcon href={social.linkedin} type="linkedin" />
            )}
            {social.twitter && (
              <SocialIcon href={social.twitter} type="twitter" />
            )}
            {social.github && (
              <SocialIcon href={social.github} type="github" />
            )}
            {social.dribbble && (
              <SocialIcon href={social.dribbble} type="dribbble" />
            )}
            {social.email && (
              <SocialIcon href={`mailto:${social.email}`} type="email" />
            )}
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-serif text-xl text-neutral-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{role}</p>
      </div>
    </motion.div>
  );
}

/**
 * TeamCardMinimal - Simple, clean team member display
 */
function TeamCardMinimal({
  name,
  role,
  image,
  className,
}: Pick<TeamCardProps, "name" | "role" | "image" | "className">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("text-center", className)}
    >
      <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>
      <h3 className="font-serif text-lg text-neutral-900 dark:text-white">
        {name}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{role}</p>
    </motion.div>
  );
}

/**
 * TeamCardOverlay - Full overlay style with bio
 */
function TeamCardOverlay({
  name,
  role,
  image,
  bio,
  social,
  className,
}: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("group relative aspect-[3/4] overflow-hidden rounded-2xl", className)}
    >
      {/* Image */}
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </motion.div>

      {/* Gradient Overlay - Always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content - Always at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <motion.div
          animate={{ y: isHovered && bio ? -20 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-serif text-xl text-white mb-1">{name}</h3>
          <p className="text-sm text-white/70">{role}</p>
        </motion.div>

        {/* Bio on hover */}
        {bio && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-white/80 mt-3 line-clamp-3"
          >
            {bio}
          </motion.p>
        )}

        {/* Social Links */}
        {social && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex gap-3 mt-4"
          >
            {social.linkedin && (
              <SocialIcon href={social.linkedin} type="linkedin" light />
            )}
            {social.twitter && (
              <SocialIcon href={social.twitter} type="twitter" light />
            )}
            {social.github && (
              <SocialIcon href={social.github} type="github" light />
            )}
            {social.email && (
              <SocialIcon href={`mailto:${social.email}`} type="email" light />
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * SocialIcon - Reusable social media icon link
 */
interface SocialIconProps {
  href: string;
  type: "linkedin" | "twitter" | "github" | "dribbble" | "email";
  light?: boolean;
}

function SocialIcon({ href, type, light }: SocialIconProps) {
  const icons = {
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    twitter: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    github: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
    dribbble: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
        />
      </svg>
    ),
    email: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
        light
          ? "bg-white/20 text-white hover:bg-white/30"
          : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-md"
      )}
    >
      {icons[type]}
    </Link>
  );
}

/**
 * TeamGrid - Responsive grid for team cards
 */
interface TeamGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function TeamGrid({ children, columns = 4, className }: TeamGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-6 md:gap-8", gridCols, className)}>
      {children}
    </div>
  );
}
