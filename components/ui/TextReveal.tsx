"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

/**
 * TextReveal - Premium text animation effects
 * Typewriter, word-by-word fade, character reveal, highlight animations
 *
 * @example
 * <TextReveal variant="typewriter" text="Hello World" />
 *
 * @example
 * <TextReveal variant="words" text="Each word fades in separately" />
 *
 * @example
 * <TextReveal variant="highlight" text="This gets highlighted" highlightColor="#fef08a" />
 */

interface TextRevealProps {
  text: string;
  variant?: "typewriter" | "words" | "chars" | "highlight" | "blur" | "slide" | "gradient" | "glitch";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  duration?: number;
  highlightColor?: string;
  cursor?: boolean;
  loop?: boolean;
  className?: string;
  onComplete?: () => void;
}

export function TextReveal({
  text,
  variant = "words",
  as: Component = "p",
  delay = 0,
  duration = 0.05,
  highlightColor = "#fef08a",
  cursor = true,
  loop = false,
  className,
  onComplete,
}: TextRevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: !loop, margin: "-100px" });

  if (variant === "typewriter") {
    return (
      <TypewriterText
        ref={ref}
        text={text}
        as={Component}
        delay={delay}
        duration={duration}
        cursor={cursor}
        isInView={isInView}
        loop={loop}
        className={className}
        onComplete={onComplete}
      />
    );
  }

  if (variant === "highlight") {
    return (
      <HighlightText
        ref={ref}
        text={text}
        as={Component}
        delay={delay}
        highlightColor={highlightColor}
        isInView={isInView}
        className={className}
      />
    );
  }

  if (variant === "blur") {
    return (
      <BlurText
        ref={ref}
        text={text}
        as={Component}
        delay={delay}
        duration={duration}
        isInView={isInView}
        className={className}
      />
    );
  }

  if (variant === "slide") {
    return (
      <SlideText
        ref={ref}
        text={text}
        as={Component}
        delay={delay}
        duration={duration}
        isInView={isInView}
        className={className}
      />
    );
  }

  if (variant === "gradient") {
    return (
      <GradientText
        ref={ref}
        text={text}
        as={Component}
        isInView={isInView}
        className={className}
      />
    );
  }

  if (variant === "glitch") {
    return (
      <GlitchText
        ref={ref}
        text={text}
        as={Component}
        isInView={isInView}
        className={className}
      />
    );
  }

  if (variant === "chars") {
    return (
      <CharsText
        ref={ref}
        text={text}
        as={Component}
        delay={delay}
        duration={duration}
        isInView={isInView}
        className={className}
      />
    );
  }

  // Default: words variant
  return (
    <WordsText
      ref={ref}
      text={text}
      as={Component}
      delay={delay}
      duration={duration}
      isInView={isInView}
      className={className}
    />
  );
}

/**
 * TypewriterText - Classic typewriter effect
 */
const TypewriterText = React.forwardRef<
  HTMLElement,
  {
    text: string;
    as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    delay: number;
    duration: number;
    cursor: boolean;
    isInView: boolean;
    loop: boolean;
    className?: string;
    onComplete?: () => void;
  }
>(({ text, as: Component, delay, duration, cursor, isInView, loop, className, onComplete }, ref) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    if (!isInView) return;

    setIsTyping(true);
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          onComplete?.();

          if (loop) {
            setTimeout(() => {
              setDisplayedText("");
              index = 0;
            }, 2000);
          }
        }
      }, duration * 1000);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, text, delay, duration, loop, onComplete]);

  return (
    <Component ref={ref as any} className={cn("inline", className)}>
      {displayedText}
      {cursor && (
        <motion.span
          className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
          animate={{ opacity: isTyping ? 1 : [1, 0] }}
          transition={{ duration: 0.5, repeat: isTyping ? 0 : Infinity }}
        />
      )}
    </Component>
  );
});
TypewriterText.displayName = "TypewriterText";

/**
 * WordsText - Word-by-word fade in
 */
const WordsText = React.forwardRef<
  HTMLElement,
  {
    text: string;
    as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    delay: number;
    duration: number;
    isInView: boolean;
    className?: string;
  }
>(({ text, as: Component, delay, duration, isInView, className }, ref) => {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: duration,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Component ref={ref as any} className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
});
WordsText.displayName = "WordsText";

/**
 * CharsText - Character-by-character reveal
 */
const CharsText = React.forwardRef<
  HTMLElement,
  {
    text: string;
    as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    delay: number;
    duration: number;
    isInView: boolean;
    className?: string;
  }
>(({ text, as: Component, delay, duration, isInView, className }, ref) => {
  const chars = text.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: duration,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <Component ref={ref as any} className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline"
      >
        {chars.map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
});
CharsText.displayName = "CharsText";

/**
 * HighlightText - Text with animated highlight/marker effect
 */
const HighlightText = React.forwardRef<
  HTMLElement,
  {
    text: string;
    as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    delay: number;
    highlightColor: string;
    isInView: boolean;
    className?: string;
  }
>(({ text, as: Component, delay, highlightColor, isInView, className }, ref) => {
  return (
    <Component ref={ref as any} className={cn("relative inline", className)}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute bottom-0 left-0 h-[40%] z-0"
        style={{ backgroundColor: highlightColor }}
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </Component>
  );
});
HighlightText.displayName = "HighlightText";

/**
 * BlurText - Words fade in with blur effect
 */
const BlurText = React.forwardRef<
  HTMLElement,
  {
    text: string;
    as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    delay: number;
    duration: number;
    isInView: boolean;
    className?: string;
  }
>(({ text, as: Component, delay, duration, isInView, className }, ref) => {
  const words = text.split(" ");

  return (
    <Component ref={ref as any} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, filter: "blur(20px)", y: 10 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + index * duration,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
});
BlurText.displayName = "BlurText";

/**
 * SlideText - Words slide up from below
 */
const SlideText = React.forwardRef<
  HTMLElement,
  {
    text: string;
    as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    delay: number;
    duration: number;
    isInView: boolean;
    className?: string;
  }
>(({ text, as: Component, delay, duration, isInView, className }, ref) => {
  const words = text.split(" ");

  return (
    <Component ref={ref as any} className={cn("overflow-hidden", className)}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.5,
              delay: delay + index * duration,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
});
SlideText.displayName = "SlideText";

/**
 * GradientText - Animated gradient moving through text
 */
const GradientText = React.forwardRef<
  HTMLElement,
  {
    text: string;
    as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    isInView: boolean;
    className?: string;
  }
>(({ text, as: Component, isInView, className }, ref) => {
  return (
    <Component
      ref={ref as any}
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-[length:200%_auto]",
        className
      )}
    >
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, backgroundPosition: "0% center" }}
        animate={
          isInView
            ? {
                opacity: 1,
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }
            : {}
        }
        transition={{
          opacity: { duration: 0.5 },
          backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
        }}
        style={{
          backgroundImage: "inherit",
          backgroundSize: "inherit",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </motion.span>
    </Component>
  );
});
GradientText.displayName = "GradientText";

/**
 * GlitchText - Glitch/distortion effect
 */
const GlitchText = React.forwardRef<
  HTMLElement,
  {
    text: string;
    as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    isInView: boolean;
    className?: string;
  }
>(({ text, as: Component, isInView, className }, ref) => {
  return (
    <Component
      ref={ref as any}
      className={cn("relative inline-block", className)}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {isInView && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-cyan-500 z-0"
            style={{ clipPath: "inset(0 0 50% 0)" }}
            animate={{
              x: [-2, 2, -1, 1, 0],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-red-500 z-0"
            style={{ clipPath: "inset(50% 0 0 0)" }}
            animate={{
              x: [2, -2, 1, -1, 0],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 3,
              delay: 0.1,
            }}
          >
            {text}
          </motion.span>
        </>
      )}
    </Component>
  );
});
GlitchText.displayName = "GlitchText";

/**
 * AnimatedCounter - Animated number counting
 */
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let start = 0;
      const increment = value / (duration * 60);
      const counter = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(start);
        }
      }, 1000 / 60);

      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}

/**
 * SplitText - Split text for custom animations
 */
interface SplitTextProps {
  text: string;
  type?: "words" | "chars" | "lines";
  className?: string;
  wordClassName?: string;
  charClassName?: string;
}

export function SplitText({
  text,
  type = "words",
  className,
  wordClassName,
  charClassName,
}: SplitTextProps) {
  if (type === "chars") {
    return (
      <span className={className}>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={cn("inline-block", charClassName)}
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {text.split(" ").map((word, index) => (
        <span key={index} className={cn("inline-block mr-[0.25em]", wordClassName)}>
          {word}
        </span>
      ))}
    </span>
  );
}
