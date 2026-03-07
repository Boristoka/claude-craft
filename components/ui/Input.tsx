import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input Component - Large touch targets, focus states
 *
 * @example
 * <Input label="Email" placeholder="you@example.com" />
 * <Input label="Password" type="password" error="Required" />
 */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helper, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              // Base
              "w-full h-12 bg-white border border-neutral-300 rounded-xl",
              "text-neutral-900 placeholder:text-neutral-400",
              // Focus
              "focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
              // Transition
              "transition-all duration-150",
              // Disabled
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100",
              // Padding
              icon ? "pl-12 pr-4" : "px-4",
              // Error state
              error && "border-error focus:border-error focus:ring-error/20",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <div className="flex items-center gap-2 text-sm text-error">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {helper && !error && (
          <p className="text-sm text-neutral-500">{helper}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

/**
 * Textarea Component
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helper, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            // Base
            "w-full min-h-[120px] bg-white border border-neutral-300 rounded-xl",
            "text-neutral-900 placeholder:text-neutral-400",
            "py-3 px-4",
            // Focus
            "focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
            // Transition
            "transition-all duration-150",
            // Disabled
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100",
            // Resize
            "resize-y",
            // Error state
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div className="flex items-center gap-2 text-sm text-error">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {helper && !error && (
          <p className="text-sm text-neutral-500">{helper}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

/**
 * Select Component - Native select with consistent styling
 *
 * @example
 * <Select
 *   label="Country"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 * />
 */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  helper?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helper, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              // Base
              "w-full h-12 bg-white border border-neutral-300 rounded-xl",
              "text-neutral-900 appearance-none cursor-pointer",
              "px-4 pr-10",
              // Focus
              "focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
              // Transition
              "transition-all duration-150",
              // Disabled
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100",
              // Error state
              error && "border-error focus:border-error focus:ring-error/20",
              // Placeholder styling
              !props.value && placeholder && "text-neutral-400",
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          {/* Dropdown arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-sm text-error">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {helper && !error && (
          <p className="text-sm text-neutral-500">{helper}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Input, Textarea, Select };
