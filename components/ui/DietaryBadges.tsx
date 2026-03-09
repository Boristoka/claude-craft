"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * DietaryBadges - Dietary restriction and allergen indicators for restaurants
 *
 * @example
 * <DietaryBadge type="vegan" />
 * <DietaryBadge type="spicy" level={2} />
 * <DietaryBadges types={["vegan", "gluten-free"]} />
 * <AllergenList allergens={["nuts", "dairy", "gluten"]} />
 */

export type DietaryType =
  | "vegan"
  | "vegetarian"
  | "gluten-free"
  | "dairy-free"
  | "nut-free"
  | "spicy"
  | "halal"
  | "kosher"
  | "organic"
  | "local"
  | "seasonal"
  | "house-special"
  | "new"
  | "popular";

export type AllergenType =
  | "gluten"
  | "dairy"
  | "nuts"
  | "peanuts"
  | "eggs"
  | "fish"
  | "shellfish"
  | "soy"
  | "sesame"
  | "celery"
  | "mustard"
  | "sulphites";

interface DietaryConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
}

const dietaryConfig: Record<DietaryType, DietaryConfig> = {
  vegan: {
    label: "Vegan",
    icon: "🌱",
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-100",
    darkBgColor: "dark:bg-green-900/40",
  },
  vegetarian: {
    label: "Vegetarian",
    icon: "🥬",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-100",
    darkBgColor: "dark:bg-emerald-900/40",
  },
  "gluten-free": {
    label: "Gluten-Free",
    icon: "🌾",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-100",
    darkBgColor: "dark:bg-amber-900/40",
  },
  "dairy-free": {
    label: "Dairy-Free",
    icon: "🥛",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100",
    darkBgColor: "dark:bg-blue-900/40",
  },
  "nut-free": {
    label: "Nut-Free",
    icon: "🥜",
    color: "text-orange-700 dark:text-orange-400",
    bgColor: "bg-orange-100",
    darkBgColor: "dark:bg-orange-900/40",
  },
  spicy: {
    label: "Spicy",
    icon: "🌶️",
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-100",
    darkBgColor: "dark:bg-red-900/40",
  },
  halal: {
    label: "Halal",
    icon: "☪️",
    color: "text-teal-700 dark:text-teal-400",
    bgColor: "bg-teal-100",
    darkBgColor: "dark:bg-teal-900/40",
  },
  kosher: {
    label: "Kosher",
    icon: "✡️",
    color: "text-indigo-700 dark:text-indigo-400",
    bgColor: "bg-indigo-100",
    darkBgColor: "dark:bg-indigo-900/40",
  },
  organic: {
    label: "Organic",
    icon: "🍃",
    color: "text-lime-700 dark:text-lime-400",
    bgColor: "bg-lime-100",
    darkBgColor: "dark:bg-lime-900/40",
  },
  local: {
    label: "Local",
    icon: "📍",
    color: "text-sky-700 dark:text-sky-400",
    bgColor: "bg-sky-100",
    darkBgColor: "dark:bg-sky-900/40",
  },
  seasonal: {
    label: "Seasonal",
    icon: "🍂",
    color: "text-orange-700 dark:text-orange-400",
    bgColor: "bg-orange-100",
    darkBgColor: "dark:bg-orange-900/40",
  },
  "house-special": {
    label: "Chef's Special",
    icon: "⭐",
    color: "text-yellow-700 dark:text-yellow-400",
    bgColor: "bg-yellow-100",
    darkBgColor: "dark:bg-yellow-900/40",
  },
  new: {
    label: "New",
    icon: "✨",
    color: "text-purple-700 dark:text-purple-400",
    bgColor: "bg-purple-100",
    darkBgColor: "dark:bg-purple-900/40",
  },
  popular: {
    label: "Popular",
    icon: "🔥",
    color: "text-orange-700 dark:text-orange-400",
    bgColor: "bg-orange-100",
    darkBgColor: "dark:bg-orange-900/40",
  },
};

const allergenConfig: Record<AllergenType, { label: string; icon: string }> = {
  gluten: { label: "Gluten", icon: "🌾" },
  dairy: { label: "Dairy", icon: "🥛" },
  nuts: { label: "Tree Nuts", icon: "🌰" },
  peanuts: { label: "Peanuts", icon: "🥜" },
  eggs: { label: "Eggs", icon: "🥚" },
  fish: { label: "Fish", icon: "🐟" },
  shellfish: { label: "Shellfish", icon: "🦐" },
  soy: { label: "Soy", icon: "🫘" },
  sesame: { label: "Sesame", icon: "🌱" },
  celery: { label: "Celery", icon: "🥬" },
  mustard: { label: "Mustard", icon: "🟡" },
  sulphites: { label: "Sulphites", icon: "🍷" },
};

// ============================================================================
// DietaryBadge - Single badge
// ============================================================================

interface DietaryBadgeProps {
  type: DietaryType;
  level?: 1 | 2 | 3; // For spicy levels
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outline" | "minimal";
  className?: string;
}

export function DietaryBadge({
  type,
  level,
  showLabel = true,
  size = "md",
  variant = "filled",
  className,
}: DietaryBadgeProps) {
  const config = dietaryConfig[type];

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5 gap-1",
    md: "text-xs px-2 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  const variantClasses = {
    filled: cn(config.bgColor, config.darkBgColor, config.color),
    outline: cn(
      "border",
      config.color,
      "border-current bg-transparent"
    ),
    minimal: cn(config.color, "bg-transparent"),
  };

  // For spicy, show multiple peppers based on level
  const icon =
    type === "spicy" && level
      ? config.icon.repeat(level)
      : config.icon;

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center rounded-full font-medium whitespace-nowrap",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
      {showLabel && (
        <span>
          {type === "spicy" && level ? `Spicy ${level}/3` : config.label}
        </span>
      )}
    </motion.span>
  );
}

// ============================================================================
// DietaryBadges - Multiple badges in a row
// ============================================================================

interface DietaryBadgesProps {
  types: (DietaryType | { type: DietaryType; level?: 1 | 2 | 3 })[];
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outline" | "minimal";
  className?: string;
}

export function DietaryBadges({
  types,
  showLabels = false,
  size = "sm",
  variant = "filled",
  className,
}: DietaryBadgesProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {types.map((item, index) => {
        const type = typeof item === "string" ? item : item.type;
        const level = typeof item === "string" ? undefined : item.level;

        return (
          <DietaryBadge
            key={`${type}-${index}`}
            type={type}
            level={level}
            showLabel={showLabels}
            size={size}
            variant={variant}
          />
        );
      })}
    </div>
  );
}

// ============================================================================
// SpicyMeter - Visual spicy level indicator
// ============================================================================

interface SpicyMeterProps {
  level: 0 | 1 | 2 | 3;
  maxLevel?: 3 | 5;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function SpicyMeter({
  level,
  maxLevel = 3,
  size = "md",
  showLabel = false,
  className,
}: SpicyMeterProps) {
  const sizeClasses = {
    sm: "text-sm gap-0.5",
    md: "text-base gap-1",
    lg: "text-lg gap-1.5",
  };

  const labels = ["Mild", "Medium", "Hot", "Very Hot", "Extreme"];

  return (
    <div className={cn("inline-flex items-center", sizeClasses[size], className)}>
      {Array.from({ length: maxLevel }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className={cn(
            "transition-opacity",
            i < level ? "opacity-100" : "opacity-20"
          )}
        >
          🌶️
        </motion.span>
      ))}
      {showLabel && level > 0 && (
        <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
          {labels[level - 1]}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// AllergenList - List of allergens with icons
// ============================================================================

interface AllergenListProps {
  allergens: AllergenType[];
  variant?: "list" | "inline" | "icons-only";
  showWarning?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function AllergenList({
  allergens,
  variant = "inline",
  showWarning = true,
  size = "sm",
  className,
}: AllergenListProps) {
  if (allergens.length === 0) return null;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
  };

  if (variant === "icons-only") {
    return (
      <div className={cn("flex items-center gap-1", sizeClasses[size], className)}>
        {showWarning && (
          <span className="text-amber-600 dark:text-amber-400 mr-1">⚠️</span>
        )}
        {allergens.map((allergen) => (
          <span
            key={allergen}
            title={allergenConfig[allergen].label}
            className="cursor-help"
          >
            {allergenConfig[allergen].icon}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-1", className)}>
        {showWarning && (
          <p className={cn("font-medium text-amber-700 dark:text-amber-400", sizeClasses[size])}>
            ⚠️ Contains allergens:
          </p>
        )}
        <ul className={cn("space-y-0.5 text-neutral-600 dark:text-neutral-400", sizeClasses[size])}>
          {allergens.map((allergen) => (
            <li key={allergen} className="flex items-center gap-2">
              <span>{allergenConfig[allergen].icon}</span>
              <span>{allergenConfig[allergen].label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Inline variant (default)
  return (
    <div className={cn("flex items-center gap-1 flex-wrap", sizeClasses[size], className)}>
      {showWarning && (
        <span className="text-amber-600 dark:text-amber-400">Contains:</span>
      )}
      {allergens.map((allergen, index) => (
        <span
          key={allergen}
          className="text-neutral-600 dark:text-neutral-400"
        >
          {allergenConfig[allergen].icon} {allergenConfig[allergen].label}
          {index < allergens.length - 1 && ","}
        </span>
      ))}
    </div>
  );
}

// ============================================================================
// DietaryLegend - Full legend showing all dietary options
// ============================================================================

interface DietaryLegendProps {
  types?: DietaryType[];
  columns?: 2 | 3 | 4;
  variant?: "compact" | "detailed";
  className?: string;
}

export function DietaryLegend({
  types,
  columns = 3,
  variant = "compact",
  className,
}: DietaryLegendProps) {
  const displayTypes = types || (Object.keys(dietaryConfig) as DietaryType[]);

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-3", gridCols[columns], className)}>
      {displayTypes.map((type) => {
        const config = dietaryConfig[type];
        return (
          <div
            key={type}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg",
              variant === "detailed" && "bg-neutral-50 dark:bg-neutral-800/50"
            )}
          >
            <span className="text-lg">{config.icon}</span>
            <span className={cn("text-sm", config.color)}>{config.label}</span>
          </div>
        );
      })}
    </div>
  );
}
