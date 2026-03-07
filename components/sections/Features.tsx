"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

/**
 * Features Component - Claude UI Kit
 *
 * Display product features in an engaging grid layout.
 * Includes scroll-triggered animations for visual interest.
 *
 * @example
 * <Features
 *   badge="Features"
 *   title="Everything you need"
 *   subtitle="Built for developers who care about design."
 *   features={[
 *     { icon: "zap", title: "Fast", description: "Lightning quick." },
 *     { icon: "code", title: "Modern", description: "Clean code." },
 *   ]}
 * />
 */

// Icon name type - all available icons
type IconName = "zap" | "shield" | "code" | "sparkles" | "heart" | "globe" | "check" | "star";

interface Feature {
  /** Icon name (use preset icons) or emoji string */
  icon?: IconName | string;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional link */
  href?: string;
}

interface FeaturesProps {
  /** Small label above the title */
  badge?: string;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Array of features to display */
  features: Feature[];
  /** Layout variant */
  variant?: "grid" | "cards" | "simple";
  /** Number of columns (for grid variant) */
  columns?: 2 | 3 | 4;
  /** Background style */
  background?: "none" | "muted" | "gradient";
  /** Additional className */
  className?: string;
}

export function Features({
  badge,
  title,
  subtitle,
  features,
  variant = "cards",
  columns = 3,
  background = "none",
  className,
}: FeaturesProps) {
  const columnClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <Section background={background} className={className}>
      <Container>
        {/* Section header */}
        {(badge || title || subtitle) && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            {badge && (
              <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Features grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={cn("grid gap-6 lg:gap-8", columnClasses[columns])}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={staggerItem}>
              {variant === "cards" ? (
                <FeatureCard feature={feature} />
              ) : variant === "simple" ? (
                <FeatureSimple feature={feature} />
              ) : (
                <FeatureGrid feature={feature} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

// =============================================================================
// ICON RENDERER
// =============================================================================

function FeatureIcon({ name }: { name?: string }) {
  if (!name) return null;

  // Check if it's an emoji (simple check)
  if (name.length <= 2 && /\p{Emoji}/u.test(name)) {
    return <span className="text-2xl">{name}</span>;
  }

  // Render preset icon
  const icons: Record<string, ReactNode> = {
    zap: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    shield: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    code: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    sparkles: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    heart: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    globe: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    check: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    star: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  };

  return icons[name] || <span className="text-2xl">{name}</span>;
}

// =============================================================================
// FEATURE CARD - Full card with hover effect
// =============================================================================

function FeatureCard({ feature }: { feature: Feature }) {
  const content = (
    <Card className="h-full">
      <CardHeader>
        {feature.icon && (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary mb-4">
            <FeatureIcon name={feature.icon} />
          </div>
        )}
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  );

  if (feature.href) {
    return (
      <a href={feature.href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}

// =============================================================================
// FEATURE GRID - Icon + text, no card background
// =============================================================================

function FeatureGrid({ feature }: { feature: Feature }) {
  return (
    <div className="flex gap-4">
      {feature.icon && (
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <FeatureIcon name={feature.icon} />
        </div>
      )}
      <div>
        <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>
    </div>
  );
}

// =============================================================================
// FEATURE SIMPLE - Centered, minimal
// =============================================================================

function FeatureSimple({ feature }: { feature: Feature }) {
  return (
    <div className="text-center">
      {feature.icon && (
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary mx-auto mb-4">
          <FeatureIcon name={feature.icon} />
        </div>
      )}
      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground">{feature.description}</p>
    </div>
  );
}
