"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Button } from "./Button";

/**
 * NewsletterSignup - Premium email capture with animations
 * Features: animated gradient border, confetti on success, spotlight effects
 */

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: "default" | "minimal" | "card" | "banner" | "inline" | "gradient";
  onSubmit?: (email: string) => void | Promise<void>;
  className?: string;
}

export function NewsletterSignup({
  title = "Stay in the loop",
  description = "Subscribe to our newsletter for the latest updates.",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  variant = "default",
  onSubmit,
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showConfetti, setShowConfetti] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setStatus("success");
      setShowConfetti(true);
      setEmail("");
      setTimeout(() => setShowConfetti(false), 3000);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (variant === "gradient") {
    return <GradientNewsletter
      title={title}
      description={description}
      placeholder={placeholder}
      buttonText={buttonText}
      email={email}
      setEmail={setEmail}
      status={status}
      setStatus={setStatus}
      errorMessage={errorMessage}
      handleSubmit={handleSubmit}
      showConfetti={showConfetti}
      className={className}
    />;
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-grow px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow"
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "..." : buttonText}
        </Button>
      </form>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={className}>
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <SuccessMessage key="success" />
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-3"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus("idle");
                  }}
                  placeholder={placeholder}
                  className="flex-grow px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow"
                />
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <LoadingSpinner />
                  ) : (
                    buttonText
                  )}
                </Button>
              </div>
              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-600 dark:text-red-400"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          )}
        </AnimatePresence>
        {showConfetti && <Confetti />}
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-12",
          className
        )}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(45deg, #7c3aed, #3b82f6, #06b6d4, #7c3aed)",
              backgroundSize: "400% 400%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-semibold text-xl mb-1">{title}</h3>
              <p className="text-neutral-400 dark:text-neutral-600">{description}</p>
            </div>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-green-400 dark:text-green-600 font-medium"
                >
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                  Thanks for subscribing!
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex gap-2 flex-shrink-0"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setStatus("idle");
                    }}
                    placeholder={placeholder}
                    className="w-64 px-4 py-2.5 rounded-lg bg-white/10 dark:bg-neutral-100 border border-white/20 dark:border-neutral-300 text-white dark:text-neutral-900 placeholder:text-white/50 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow"
                  />
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-white text-neutral-900 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                  >
                    {status === "loading" ? "..." : buttonText}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
        {showConfetti && <Confetti />}
      </div>
    );
  }

  // Default and Card variants
  const isCard = variant === "card";

  return (
    <div
      className={cn(
        "relative",
        isCard &&
          "bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800",
        !isCard && "text-center",
        className
      )}
    >
      <h3
        className={cn(
          "font-semibold text-neutral-900 dark:text-white mb-2",
          isCard ? "text-xl" : "text-2xl"
        )}
      >
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">{description}</p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <SuccessMessage key="success" />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-3"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={cn("flex gap-2", !isCard && "max-w-md mx-auto")}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                placeholder={placeholder}
                className="flex-grow px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow"
              />
              <Button type="submit" size="lg" disabled={status === "loading"}>
                {status === "loading" ? (
                  <LoadingSpinner />
                ) : (
                  buttonText
                )}
              </Button>
            </div>
            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-red-600 dark:text-red-400"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              No spam. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
      {showConfetti && <Confetti />}
    </div>
  );
}

/**
 * GradientNewsletter - Premium variant with animated gradient border
 */
function GradientNewsletter({
  title,
  description,
  placeholder,
  buttonText,
  email,
  setEmail,
  status,
  setStatus,
  errorMessage,
  handleSubmit,
  showConfetti,
  className,
}: {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  email: string;
  setEmail: (email: string) => void;
  status: string;
  setStatus: (status: "idle" | "loading" | "success" | "error") => void;
  errorMessage: string;
  handleSubmit: (e: React.FormEvent) => void;
  showConfetti: boolean;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      rgba(120, 119, 198, 0.1),
      transparent 80%
    )
  `;

  return (
    <div
      className={cn("relative p-[2px] rounded-2xl overflow-hidden", className)}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(45deg, #7c3aed, #3b82f6, #06b6d4, #10b981, #7c3aed)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner content */}
      <div
        onMouseMove={handleMouseMove}
        className="relative bg-white dark:bg-neutral-900 rounded-[14px] p-8 text-center"
      >
        {/* Spotlight effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[14px]"
          style={{ background: spotlightBackground }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h3 className="font-semibold text-2xl text-neutral-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">{description}</p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <SuccessMessage key="success" />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-3"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setStatus("idle");
                    }}
                    placeholder={placeholder}
                    className="flex-grow px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
                  />
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <LoadingSpinner />
                    ) : (
                      buttonText
                    )}
                  </motion.button>
                </div>
                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-600 dark:text-red-400"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  No spam. Unsubscribe anytime.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
        {showConfetti && <Confetti />}
      </div>
    </div>
  );
}

/**
 * SuccessMessage - Animated success state
 */
function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-3 py-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
      >
        <motion.svg
          className="w-8 h-8 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-medium text-green-600 dark:text-green-400"
      >
        Thanks for subscribing!
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-neutral-500 dark:text-neutral-400"
      >
        Check your inbox for confirmation
      </motion.p>
    </motion.div>
  );
}

/**
 * LoadingSpinner - Animated loading indicator
 */
function LoadingSpinner() {
  return (
    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/**
 * Confetti - Celebration animation on success
 */
function Confetti() {
  const colors = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
  const confettiCount = 50;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: confettiCount }).map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 2;
        const size = 4 + Math.random() * 6;
        const rotation = Math.random() * 360;

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: `${startX}%`,
              y: "-10%",
              rotate: rotation,
              scale: 0,
            }}
            animate={{
              y: "110%",
              rotate: rotation + 720,
              scale: [0, 1, 1, 0.5],
            }}
            transition={{
              duration,
              delay,
              ease: "easeOut",
            }}
            style={{
              width: size,
              height: size * 1.5,
              backgroundColor: color,
              borderRadius: size > 7 ? "50%" : "2px",
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * AvailabilityBadge - Show availability status with pulse animation
 */

interface AvailabilityBadgeProps {
  available?: boolean;
  text?: string;
  className?: string;
}

export function AvailabilityBadge({
  available = true,
  text,
  className,
}: AvailabilityBadgeProps) {
  const defaultText = available ? "Available for projects" : "Currently unavailable";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
        available
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
        className
      )}
    >
      <span className="relative flex h-2.5 w-2.5">
        {available && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
            animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-2.5 w-2.5",
            available ? "bg-green-500" : "bg-neutral-400"
          )}
        />
      </span>
      {text || defaultText}
    </motion.div>
  );
}
