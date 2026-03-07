"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Tabs Component - Tabbed navigation
 *
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 */

interface TabsContextType {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const setValue = React.useCallback(
    (newValue: string) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "pills" | "underline";
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-1",
          variant === "default" && "p-1 bg-neutral-100 rounded-xl",
          variant === "pills" && "gap-2",
          variant === "underline" && "border-b border-neutral-200 gap-0",
          className
        )}
        role="tablist"
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, setValue } = useTabs();
    const isSelected = selectedValue === value;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        onClick={() => setValue(value)}
        className={cn(
          "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
          isSelected
            ? "text-neutral-900"
            : "text-neutral-500 hover:text-neutral-700",
          className
        )}
        {...props}
      >
        {isSelected && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-white rounded-lg shadow-sm"
            transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children }, ref) => {
    const { value: selectedValue } = useTabs();

    if (selectedValue !== value) return null;

    return (
      <motion.div
        ref={ref}
        role="tabpanel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn("mt-4", className)}
      >
        {children}
      </motion.div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
