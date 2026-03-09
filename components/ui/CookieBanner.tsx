"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

/**
 * CookieBanner - GDPR-compliant cookie consent banner
 *
 * Features:
 * - Slides up from bottom
 * - Remembers choice in localStorage
 * - Customizable text and links
 * - Accept all / Reject / Customize options
 *
 * @example
 * ```tsx
 * // In your layout.tsx or page.tsx
 * <CookieBanner
 *   privacyUrl="/privacy"
 *   onAccept={() => console.log("Cookies accepted")}
 *   onReject={() => console.log("Cookies rejected")}
 * />
 * ```
 */

type CookieBannerProps = {
  /** URL to privacy policy page */
  privacyUrl?: string;
  /** Callback when user accepts cookies */
  onAccept?: () => void;
  /** Callback when user rejects cookies */
  onReject?: () => void;
  /** Custom message text */
  message?: string;
  /** Storage key for remembering choice */
  storageKey?: string;
  /** Position of the banner */
  position?: "bottom" | "bottom-left" | "bottom-right";
  /** Show customize button */
  showCustomize?: boolean;
  /** Custom class name */
  className?: string;
};

export function CookieBanner({
  privacyUrl = "/privacy",
  onAccept,
  onReject,
  message = "We use cookies to enhance your browsing experience and analyze our traffic. By clicking 'Accept', you consent to our use of cookies.",
  storageKey = "cookie-consent",
  position = "bottom",
  showCustomize = false,
  className,
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(storageKey);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const handleAccept = () => {
    localStorage.setItem(storageKey, "accepted");
    setIsVisible(false);
    onAccept?.();
  };

  const handleReject = () => {
    localStorage.setItem(storageKey, "rejected");
    setIsVisible(false);
    onReject?.();
  };

  const positionClasses = {
    bottom: "inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-4",
    "bottom-left": "left-4 bottom-4 max-w-md",
    "bottom-right": "right-4 bottom-4 max-w-md",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={cn(
            "fixed z-50",
            positionClasses[position],
            className
          )}
        >
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Icon */}
              <div className="hidden md:flex w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-neutral-600 dark:text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {message}{" "}
                  <a
                    href={privacyUrl}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 md:flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReject}
                  className="text-neutral-500"
                >
                  Reject
                </Button>
                {showCustomize && (
                  <Button variant="outline" size="sm">
                    Customize
                  </Button>
                )}
                <Button size="sm" onClick={handleAccept}>
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to check cookie consent status
 *
 * @example
 * ```tsx
 * const { hasConsent, consentStatus } = useCookieConsent();
 *
 * if (hasConsent) {
 *   // Load analytics, etc.
 * }
 * ```
 */
export function useCookieConsent(storageKey = "cookie-consent") {
  const [consentStatus, setConsentStatus] = React.useState<
    "pending" | "accepted" | "rejected"
  >("pending");

  React.useEffect(() => {
    const consent = localStorage.getItem(storageKey);
    if (consent === "accepted") {
      setConsentStatus("accepted");
    } else if (consent === "rejected") {
      setConsentStatus("rejected");
    }
  }, [storageKey]);

  return {
    hasConsent: consentStatus === "accepted",
    consentStatus,
  };
}
