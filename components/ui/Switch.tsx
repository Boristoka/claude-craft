"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Switch Component - Toggle switch
 *
 * @example
 * <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
 * <Switch label="Enable notifications" />
 */

interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const checked = controlledChecked ?? internalChecked;

    const handleToggle = () => {
      if (disabled) return;
      const newValue = !checked;
      setInternalChecked(newValue);
      onCheckedChange?.(newValue);
    };

    const sizeStyles = {
      sm: { track: "w-8 h-5", thumb: "w-3.5 h-3.5", translate: "translateX(12px)" },
      md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translateX(20px)" },
      lg: { track: "w-14 h-8", thumb: "w-6 h-6", translate: "translateX(24px)" },
    };

    const styles = sizeStyles[size];

    const switchElement = (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center rounded-full transition-colors duration-200",
          styles.track,
          checked ? "bg-primary-500" : "bg-neutral-300",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          className
        )}
        {...props}
      >
        <motion.span
          animate={{ x: checked ? (size === "sm" ? 12 : size === "md" ? 20 : 24) : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "absolute rounded-full bg-white shadow-sm",
            styles.thumb
          )}
          style={{ left: 2 }}
        />
      </button>
    );

    if (label || description) {
      return (
        <label className="flex items-start gap-3 cursor-pointer">
          {switchElement}
          <div className="flex-1">
            {label && (
              <span className="text-sm font-medium text-neutral-900">{label}</span>
            )}
            {description && (
              <p className="text-sm text-neutral-500 mt-0.5">{description}</p>
            )}
          </div>
        </label>
      );
    }

    return switchElement;
  }
);
Switch.displayName = "Switch";

export { Switch };
