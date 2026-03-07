import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton Component - Loading placeholders
 *
 * @example
 * <Skeleton className="w-32 h-4" />
 * <Skeleton variant="circular" className="w-12 h-12" />
 * <SkeletonCard />
 */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangular" | "circular" | "text";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rectangular", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse bg-neutral-200",
          variant === "rectangular" && "rounded-lg",
          variant === "circular" && "rounded-full",
          variant === "text" && "rounded h-4",
          className
        )}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

/**
 * SkeletonText - Multiple lines of skeleton text
 */
interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 3, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            "h-4",
            i === lines - 1 && "w-3/4" // Last line is shorter
          )}
        />
      ))}
    </div>
  );
};

/**
 * SkeletonCard - Card-shaped skeleton
 */
interface SkeletonCardProps {
  hasImage?: boolean;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ hasImage = true, className }) => {
  return (
    <div className={cn("rounded-2xl border border-neutral-200 bg-white p-6", className)}>
      {hasImage && (
        <Skeleton className="w-12 h-12 rounded-xl mb-4" />
      )}
      <Skeleton className="h-5 w-3/4 mb-3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
};

/**
 * SkeletonAvatar - Avatar-shaped skeleton
 */
interface SkeletonAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ size = "md", className }) => {
  const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <Skeleton variant="circular" className={cn(sizeStyles[size], className)} />
  );
};

/**
 * SkeletonTable - Table rows skeleton
 */
interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  className,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-neutral-200">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 py-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, SkeletonTable };
