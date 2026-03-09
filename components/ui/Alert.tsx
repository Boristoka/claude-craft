"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Alert & Banner Components - Notifications and announcements
 *
 * @example
 * <Alert variant="info">We're closed on Mondays</Alert>
 * <Alert variant="success" dismissible>Your order has been placed!</Alert>
 * <Banner variant="promo">20% off this week!</Banner>
 * <TopBanner variant="announcement" dismissible>New menu available</TopBanner>
 */

// ============================================================================
// Alert - Inline alert messages
// ============================================================================

type AlertVariant = "info" | "success" | "warning" | "error" | "neutral";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const alertConfig: Record<
  AlertVariant,
  { icon: string; bg: string; border: string; text: string; iconColor: string }
> = {
  info: {
    icon: "ℹ️",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-800 dark:text-blue-200",
    iconColor: "text-blue-500",
  },
  success: {
    icon: "✓",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-800 dark:text-green-200",
    iconColor: "text-green-500",
  },
  warning: {
    icon: "⚠",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-800 dark:text-amber-200",
    iconColor: "text-amber-500",
  },
  error: {
    icon: "✕",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-800 dark:text-red-200",
    iconColor: "text-red-500",
  },
  neutral: {
    icon: "•",
    bg: "bg-neutral-100 dark:bg-neutral-800",
    border: "border-neutral-200 dark:border-neutral-700",
    text: "text-neutral-800 dark:text-neutral-200",
    iconColor: "text-neutral-500",
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  action,
  className,
}: AlertProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const config = alertConfig[variant];

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "relative flex gap-3 p-4 rounded-lg border",
            config.bg,
            config.border,
            className
          )}
        >
          {/* Icon */}
          <div className={cn("flex-shrink-0 text-lg", config.iconColor)}>
            {icon || (
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-current/10">
                {config.icon}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-grow min-w-0">
            {title && (
              <h4 className={cn("font-semibold mb-1", config.text)}>{title}</h4>
            )}
            <div className={cn("text-sm", config.text, !title && "py-0.5")}>
              {children}
            </div>
            {action && (
              <button
                onClick={action.onClick}
                className={cn(
                  "mt-2 text-sm font-medium underline underline-offset-2 hover:no-underline",
                  config.text
                )}
              >
                {action.label}
              </button>
            )}
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                config.text
              )}
              aria-label="Dismiss"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// Banner - Promotional banners (usually wider, more visual)
// ============================================================================

type BannerVariant = "promo" | "announcement" | "sale" | "info" | "dark";

interface BannerProps {
  variant?: BannerVariant;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

const bannerConfig: Record<
  BannerVariant,
  { bg: string; text: string; accent: string }
> = {
  promo: {
    bg: "bg-gradient-to-r from-purple-600 to-pink-600",
    text: "text-white",
    accent: "bg-white text-purple-600 hover:bg-purple-50",
  },
  announcement: {
    bg: "bg-gradient-to-r from-blue-600 to-cyan-600",
    text: "text-white",
    accent: "bg-white text-blue-600 hover:bg-blue-50",
  },
  sale: {
    bg: "bg-gradient-to-r from-red-600 to-orange-500",
    text: "text-white",
    accent: "bg-white text-red-600 hover:bg-red-50",
  },
  info: {
    bg: "bg-neutral-100 dark:bg-neutral-800",
    text: "text-neutral-800 dark:text-neutral-200",
    accent: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
  },
  dark: {
    bg: "bg-neutral-900 dark:bg-white",
    text: "text-white dark:text-neutral-900",
    accent: "bg-white text-neutral-900 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800",
  },
};

export function Banner({
  variant = "promo",
  children,
  dismissible = false,
  onDismiss,
  action,
  icon,
  className,
}: BannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const config = bannerConfig[variant];

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={cn(
            "relative overflow-hidden",
            config.bg,
            config.text,
            className
          )}
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-4 text-sm">
            {icon && <span className="flex-shrink-0">{icon}</span>}

            <p className="text-center">{children}</p>

            {action && (
              action.href ? (
                <a
                  href={action.href}
                  className={cn(
                    "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                    config.accent
                  )}
                >
                  {action.label}
                </a>
              ) : (
                <button
                  onClick={action.onClick}
                  className={cn(
                    "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                    config.accent
                  )}
                >
                  {action.label}
                </button>
              )
            )}

            {dismissible && (
              <button
                onClick={handleDismiss}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Dismiss"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// TopBanner - Sticky banner at top of page
// ============================================================================

interface TopBannerProps extends BannerProps {
  sticky?: boolean;
}

export function TopBanner({
  sticky = true,
  className,
  ...props
}: TopBannerProps) {
  return (
    <Banner
      {...props}
      className={cn(sticky && "sticky top-0 z-50", className)}
    />
  );
}

// ============================================================================
// FloatingAlert - Fixed position alert (bottom corner)
// ============================================================================

interface FloatingAlertProps extends Omit<AlertProps, "className"> {
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  autoClose?: number; // ms, 0 = no auto close
}

export function FloatingAlert({
  position = "bottom-right",
  autoClose = 0,
  onDismiss,
  ...props
}: FloatingAlertProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoClose > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onDismiss]);

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  if (!isVisible) return null;

  return (
    <div className={cn("fixed z-50 max-w-sm w-full", positionClasses[position])}>
      <Alert
        {...props}
        dismissible
        onDismiss={() => {
          setIsVisible(false);
          onDismiss?.();
        }}
        className="shadow-lg"
      />
    </div>
  );
}

// ============================================================================
// Callout - Content callout box (for documentation, tips)
// ============================================================================

type CalloutVariant = "note" | "tip" | "important" | "warning" | "caution";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig: Record<
  CalloutVariant,
  { icon: string; title: string; border: string; bg: string; iconColor: string }
> = {
  note: {
    icon: "📝",
    title: "Note",
    border: "border-l-blue-500",
    bg: "bg-blue-50/50 dark:bg-blue-950/20",
    iconColor: "text-blue-500",
  },
  tip: {
    icon: "💡",
    title: "Tip",
    border: "border-l-green-500",
    bg: "bg-green-50/50 dark:bg-green-950/20",
    iconColor: "text-green-500",
  },
  important: {
    icon: "❗",
    title: "Important",
    border: "border-l-purple-500",
    bg: "bg-purple-50/50 dark:bg-purple-950/20",
    iconColor: "text-purple-500",
  },
  warning: {
    icon: "⚠️",
    title: "Warning",
    border: "border-l-amber-500",
    bg: "bg-amber-50/50 dark:bg-amber-950/20",
    iconColor: "text-amber-500",
  },
  caution: {
    icon: "🚨",
    title: "Caution",
    border: "border-l-red-500",
    bg: "bg-red-50/50 dark:bg-red-950/20",
    iconColor: "text-red-500",
  },
};

export function Callout({
  variant = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[variant];

  return (
    <div
      className={cn(
        "border-l-4 rounded-r-lg p-4",
        config.border,
        config.bg,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className={cn("text-lg flex-shrink-0", config.iconColor)}>
          {config.icon}
        </span>
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
            {title || config.title}
          </h4>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
