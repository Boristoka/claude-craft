"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * ComparisonSlider - Before/after image comparison with draggable slider
 * Perfect for showcasing transformations, edits, and design changes
 *
 * @example
 * <ComparisonSlider
 *   beforeImage="/before.jpg"
 *   afterImage="/after.jpg"
 *   beforeLabel="Before"
 *   afterLabel="After"
 * />
 */

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  orientation?: "horizontal" | "vertical";
  showLabels?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  className?: string;
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  initialPosition = 50,
  orientation = "horizontal",
  showLabels = true,
  aspectRatio = "video",
  className,
}: ComparisonSliderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "",
  }[aspectRatio];

  const handleMove = React.useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (orientation === "horizontal") {
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPosition(percentage);
      } else {
        const y = clientY - rect.top;
        const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
        setPosition(percentage);
      }
    },
    [orientation]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl select-none cursor-ew-resize",
        aspectRatioClass,
        className
      )}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{ cursor: isHorizontal ? "ew-resize" : "ns-resize" }}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          isHorizontal
            ? { width: `${position}%` }
            : { height: `${position}%` }
        }
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={
            isHorizontal
              ? { width: `${containerRef.current?.offsetWidth || 0}px` }
              : { height: `${containerRef.current?.offsetHeight || 0}px` }
          }
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div
        className={cn(
          "absolute z-10",
          isHorizontal
            ? "top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
            : "left-0 right-0 h-1 bg-white shadow-lg cursor-ns-resize"
        )}
        style={
          isHorizontal
            ? { left: `${position}%`, transform: "translateX(-50%)" }
            : { top: `${position}%`, transform: "translateY(-50%)" }
        }
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Handle Circle */}
        <motion.div
          className={cn(
            "absolute bg-white rounded-full shadow-xl flex items-center justify-center",
            isHorizontal
              ? "w-10 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : "w-10 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isHorizontal ? (
            <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-neutral-600 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          )}
        </motion.div>
      </div>

      {/* Labels */}
      {showLabels && (
        <>
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm font-medium backdrop-blur-sm">
            {beforeLabel}
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm font-medium backdrop-blur-sm">
            {afterLabel}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * ComparisonCard - Card wrapper for comparison with text
 */
interface ComparisonCardProps {
  title: string;
  description?: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function ComparisonCard({
  title,
  description,
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  className,
}: ComparisonCardProps) {
  return (
    <div className={cn("rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800", className)}>
      <ComparisonSlider
        beforeImage={beforeImage}
        afterImage={afterImage}
        beforeLabel={beforeLabel}
        afterLabel={afterLabel}
        aspectRatio="video"
        showLabels
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * FeatureHighlight - Highlight specific areas with comparison
 */
interface HighlightPoint {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
}

interface FeatureHighlightProps {
  image: string;
  points: HighlightPoint[];
  className?: string;
}

export function FeatureHighlight({
  image,
  points,
  className,
}: FeatureHighlightProps) {
  const [activePoint, setActivePoint] = React.useState<number | null>(null);

  return (
    <div className={cn("relative rounded-2xl overflow-hidden", className)}>
      <img
        src={image}
        alt="Feature highlight"
        className="w-full h-full object-cover"
      />

      {points.map((point, index) => (
        <React.Fragment key={index}>
          {/* Pulse ring */}
          <motion.div
            className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full bg-white/50" />
          </motion.div>

          {/* Point button */}
          <motion.button
            className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-bold text-neutral-900"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActivePoint(activePoint === index ? null : index)}
          >
            {index + 1}
          </motion.button>

          {/* Tooltip */}
          {activePoint === index && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-20 px-3 py-2 bg-neutral-900 text-white text-sm rounded-lg shadow-xl max-w-[200px]"
              style={{
                left: `${point.x}%`,
                top: `${point.y + 5}%`,
                transform: "translateX(-50%)",
              }}
            >
              {point.label}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45" />
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
