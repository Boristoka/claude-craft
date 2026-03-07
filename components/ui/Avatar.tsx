"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Avatar Component - Profile pictures with fallback
 *
 * @example
 * <Avatar src="/photo.jpg" alt="John Doe" />
 * <Avatar fallback="JD" />
 * <Avatar src="/photo.jpg" status="online" />
 */

const avatarVariants = cva(
  "relative inline-flex items-center justify-center rounded-full bg-neutral-200 overflow-hidden",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-lg",
        "2xl": "w-20 h-20 text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const statusVariants = cva(
  "absolute rounded-full border-2 border-white",
  {
    variants: {
      status: {
        online: "bg-green-500",
        offline: "bg-neutral-400",
        busy: "bg-red-500",
        away: "bg-amber-500",
      },
      size: {
        xs: "w-1.5 h-1.5 -bottom-0 -right-0",
        sm: "w-2 h-2 -bottom-0 -right-0",
        md: "w-2.5 h-2.5 bottom-0 right-0",
        lg: "w-3 h-3 bottom-0 right-0",
        xl: "w-3.5 h-3.5 bottom-0.5 right-0.5",
        "2xl": "w-4 h-4 bottom-1 right-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: "online" | "offline" | "busy" | "away";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, status, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);

    const showFallback = !src || imgError;

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        {showFallback ? (
          <span className="font-medium text-neutral-600 select-none">
            {fallback || "?"}
          </span>
        ) : (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {status && (
          <span className={cn(statusVariants({ status, size }))} />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

/**
 * AvatarGroup - Stack multiple avatars
 */
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 4, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-3", className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="ring-2 ring-white rounded-full">
            {child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="w-10 h-10 rounded-full bg-neutral-100 ring-2 ring-white flex items-center justify-center">
            <span className="text-sm font-medium text-neutral-600">
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
