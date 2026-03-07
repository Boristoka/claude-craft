"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Tooltip Component - Hover tooltips
 *
 * @example
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 */

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = "top",
  delay = 200,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(true), delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const animationVariants = {
    top: { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 } },
    bottom: { initial: { opacity: 0, y: -5 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 5 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -5 }, animate: { opacity: 1, x: 0 } },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={animationVariants[side].initial}
            animate={animationVariants[side].animate}
            exit={animationVariants[side].initial}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 px-3 py-1.5 text-sm text-white bg-neutral-900 rounded-lg shadow-lg whitespace-nowrap",
              positionStyles[side]
            )}
          >
            {content}
            {/* Arrow */}
            <span
              className={cn(
                "absolute w-2 h-2 bg-neutral-900 transform rotate-45",
                side === "top" && "bottom-[-4px] left-1/2 -translate-x-1/2",
                side === "bottom" && "top-[-4px] left-1/2 -translate-x-1/2",
                side === "left" && "right-[-4px] top-1/2 -translate-y-1/2",
                side === "right" && "left-[-4px] top-1/2 -translate-y-1/2"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Tooltip };
