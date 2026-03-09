"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionTemplate, useSpring, AnimatePresence } from "framer-motion";
import { DietaryBadges, AllergenList, SpicyMeter, type DietaryType, type AllergenType } from "./DietaryBadges";

/**
 * MenuSection - Restaurant menu with categories and items
 * Premium version with hover effects, image previews, and elegant animations
 *
 * @example
 * const menuItems = [
 *   {
 *     name: "Pad Thai",
 *     price: "€16",
 *     description: "Classic Thai noodles with shrimp",
 *     dietary: ["gluten-free"],
 *     spicyLevel: 2,
 *     allergens: ["peanuts", "shellfish", "eggs"],
 *   }
 * ];
 */

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  tag?: string; // "Popular", "New", "Spicy", "Vegetarian" (legacy support)
  image?: string;
  // New dietary fields
  dietary?: DietaryType[];
  spicyLevel?: 0 | 1 | 2 | 3;
  allergens?: AllergenType[];
  calories?: number;
}

interface MenuCategory {
  name: string;
  description?: string;
  items: MenuItem[];
}

interface MenuSectionProps {
  categories: MenuCategory[];
  variant?: "default" | "cards" | "elegant" | "grid" | "spotlight";
  showImages?: boolean;
  showDietary?: boolean;
  showAllergens?: boolean;
  showCalories?: boolean;
  className?: string;
}

export function MenuSection({
  categories,
  variant = "default",
  showImages = false,
  showDietary = true,
  showAllergens = false,
  showCalories = false,
  className,
}: MenuSectionProps) {
  const itemProps = { showDietary, showAllergens, showCalories };

  return (
    <div className={cn("space-y-16", className)}>
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          {/* Category Header */}
          <div className="mb-8">
            <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 dark:text-white mb-2">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-neutral-600 dark:text-neutral-400">
                {category.description}
              </p>
            )}
          </div>

          {/* Items */}
          {variant === "spotlight" ? (
            <div className="grid md:grid-cols-2 gap-4">
              {category.items.map((item, itemIndex) => (
                <MenuItemSpotlight
                  key={item.name}
                  item={item}
                  index={itemIndex}
                  {...itemProps}
                />
              ))}
            </div>
          ) : variant === "grid" ? (
            <div className="grid md:grid-cols-2 gap-6">
              {category.items.map((item, itemIndex) => (
                <MenuItemCard
                  key={item.name}
                  item={item}
                  showImage={showImages}
                  index={itemIndex}
                  {...itemProps}
                />
              ))}
            </div>
          ) : variant === "cards" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <MenuItemCard
                  key={item.name}
                  item={item}
                  showImage={showImages}
                  index={itemIndex}
                  variant="card"
                  {...itemProps}
                />
              ))}
            </div>
          ) : variant === "elegant" ? (
            <div className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <MenuItemElegant key={item.name} item={item} index={itemIndex} {...itemProps} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <MenuItemDefault key={item.name} item={item} index={itemIndex} {...itemProps} />
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

interface MenuItemRenderProps {
  item: MenuItem;
  index: number;
  showDietary?: boolean;
  showAllergens?: boolean;
  showCalories?: boolean;
}

/**
 * MenuItemSpotlight - Premium card with cursor-following glow and image preview on hover
 */
function MenuItemSpotlight({
  item,
  index,
  showDietary = true,
  showAllergens = false,
  showCalories = false,
}: MenuItemRenderProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = React.useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      rgba(251, 146, 60, 0.1),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 transition-all duration-300 hover:border-orange-300 dark:hover:border-orange-700"
    >
      {/* Spotlight gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlightBackground }}
      />

      {/* Image preview popup */}
      <AnimatePresence>
        {isHovered && item.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -top-32 right-4 w-28 h-28 rounded-xl overflow-hidden shadow-2xl z-20 ring-4 ring-white dark:ring-neutral-800"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex justify-between items-start gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {item.name}
            </h4>
            {/* Legacy tag support */}
            {item.tag && !item.dietary && (
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  item.tag === "Popular" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400",
                  item.tag === "New" && "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400",
                  item.tag === "Spicy" && "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400",
                  item.tag === "Vegetarian" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400"
                )}
              >
                {item.tag}
              </motion.span>
            )}
            {/* New dietary badges */}
            {showDietary && item.dietary && item.dietary.length > 0 && (
              <DietaryBadges types={item.dietary} size="sm" variant="filled" />
            )}
            {/* Spicy level */}
            {showDietary && item.spicyLevel && item.spicyLevel > 0 && (
              <SpicyMeter level={item.spicyLevel} size="sm" />
            )}
            {/* Calories */}
            {showCalories && item.calories && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {item.calories} cal
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {item.description}
            </p>
          )}
          {/* Allergens */}
          {showAllergens && item.allergens && item.allergens.length > 0 && (
            <div className="mt-2">
              <AllergenList allergens={item.allergens} variant="icons-only" size="sm" />
            </div>
          )}
        </div>
        <motion.span
          whileHover={{ scale: 1.1 }}
          className="flex-shrink-0 font-semibold text-lg text-neutral-900 dark:text-white"
        >
          {item.price}
        </motion.span>
      </div>

      {/* Animated underline on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}

function MenuItemDefault({
  item,
  index,
  showDietary = true,
  showAllergens = false,
  showCalories = false,
}: MenuItemRenderProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex justify-between items-start gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
    >
      {/* Hover background */}
      <motion.div
        className="absolute inset-0 -mx-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative flex-grow">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {item.name}
          </h4>
          {/* Legacy tag support */}
          {item.tag && !item.dietary && (
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                item.tag === "Popular" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                item.tag === "New" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                item.tag === "Spicy" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                item.tag === "Vegetarian" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
              )}
            >
              {item.tag}
            </span>
          )}
          {/* New dietary badges */}
          {showDietary && item.dietary && item.dietary.length > 0 && (
            <DietaryBadges types={item.dietary} size="sm" variant="filled" />
          )}
          {showDietary && item.spicyLevel && item.spicyLevel > 0 && (
            <SpicyMeter level={item.spicyLevel} size="sm" />
          )}
          {showCalories && item.calories && (
            <span className="text-xs text-neutral-500">{item.calories} cal</span>
          )}
        </div>
        {item.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {item.description}
          </p>
        )}
        {showAllergens && item.allergens && item.allergens.length > 0 && (
          <div className="mt-1">
            <AllergenList allergens={item.allergens} variant="icons-only" size="sm" />
          </div>
        )}
      </div>
      <div className="relative flex-shrink-0 font-medium text-neutral-900 dark:text-white">
        {item.price}
      </div>
    </motion.div>
  );
}

function MenuItemElegant({
  item,
  index,
  showDietary = true,
  showAllergens = false,
  showCalories = false,
}: MenuItemRenderProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="flex items-baseline gap-2">
        <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {item.name}
        </h4>
        {/* Dietary badges inline */}
        {showDietary && item.dietary && item.dietary.length > 0 && (
          <DietaryBadges types={item.dietary} size="sm" variant="minimal" />
        )}
        {showDietary && item.spicyLevel && item.spicyLevel > 0 && (
          <SpicyMeter level={item.spicyLevel} size="sm" />
        )}
        {/* Animated dotted line */}
        <div className="flex-grow relative h-[1px] overflow-hidden">
          <motion.div
            className="absolute inset-0 border-b border-dotted border-neutral-300 dark:border-neutral-700"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
            style={{ transformOrigin: "left" }}
          />
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"
            animate={{
              x: isHovered ? ["0%", "200%"] : "0%",
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ width: "50%" }}
          />
        </div>
        <span className="font-medium text-neutral-900 dark:text-white">
          {item.price}
        </span>
        {showCalories && item.calories && (
          <span className="text-xs text-neutral-400 ml-1">({item.calories} cal)</span>
        )}
      </div>
      {item.description && (
        <motion.p
          className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 italic"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : -2 }}
          transition={{ duration: 0.2 }}
        >
          {item.description}
        </motion.p>
      )}
      {showAllergens && item.allergens && item.allergens.length > 0 && (
        <div className="mt-1">
          <AllergenList allergens={item.allergens} variant="icons-only" size="sm" showWarning={false} />
        </div>
      )}
    </motion.div>
  );
}

function MenuItemCard({
  item,
  showImage,
  index,
  variant = "default",
  showDietary = true,
  showAllergens = false,
  showCalories = false,
}: MenuItemRenderProps & { showImage: boolean; variant?: "default" | "card" }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden",
        variant === "card" &&
          "bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-800 transition-all duration-300"
      )}
    >
      {showImage && item.image && (
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Dietary badges on image */}
          {showDietary && item.dietary && item.dietary.length > 0 && (
            <div className="absolute top-3 left-3">
              <DietaryBadges types={item.dietary} size="sm" variant="filled" />
            </div>
          )}
          {/* Overlay gradient on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Price badge overlay */}
          <motion.div
            className="absolute bottom-3 right-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold text-neutral-900 dark:text-white"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.price}
          </motion.div>
        </div>
      )}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {item.name}
            </h4>
            {/* Legacy tag */}
            {item.tag && !item.dietary && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {item.tag}
              </span>
            )}
            {/* Dietary badges (if no image shown) */}
            {showDietary && !showImage && item.dietary && item.dietary.length > 0 && (
              <DietaryBadges types={item.dietary} size="sm" variant="filled" />
            )}
            {showDietary && item.spicyLevel && item.spicyLevel > 0 && (
              <SpicyMeter level={item.spicyLevel} size="sm" />
            )}
            {showCalories && item.calories && (
              <span className="text-xs text-neutral-500">{item.calories} cal</span>
            )}
          </div>
          {item.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              {item.description}
            </p>
          )}
          {showAllergens && item.allergens && item.allergens.length > 0 && (
            <div className="mt-2">
              <AllergenList allergens={item.allergens} variant="icons-only" size="sm" />
            </div>
          )}
        </div>
        {(!showImage || !item.image) && (
          <span className="font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
            {item.price}
          </span>
        )}
      </div>

      {/* Shine effect */}
      {variant === "card" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.7s ease-in-out",
          }}
        />
      )}
    </motion.div>
  );
}

/**
 * OpeningHours - Display business hours with animated indicators
 */

interface OpeningHoursItem {
  days: string;
  hours: string;
  closed?: boolean;
}

interface OpeningHoursProps {
  hours: OpeningHoursItem[];
  title?: string;
  variant?: "default" | "compact" | "card";
  className?: string;
}

export function OpeningHours({
  hours,
  title = "Opening Hours",
  variant = "default",
  className,
}: OpeningHoursProps) {
  // Check if currently open (simplified logic)
  const now = new Date();
  const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });

  const content = (
    <>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-semibold text-neutral-900 dark:text-white">
            {title}
          </h3>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Open Now
          </span>
        </div>
      )}
      <div className={cn("space-y-2", variant === "compact" && "space-y-1")}>
        {hours.map((item, index) => (
          <motion.div
            key={item.days}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={cn(
              "flex justify-between py-1.5 px-2 -mx-2 rounded-lg transition-colors",
              variant === "compact" && "text-sm",
              item.days.includes(currentDay) && "bg-neutral-100 dark:bg-neutral-800"
            )}
          >
            <span className="text-neutral-600 dark:text-neutral-400">
              {item.days}
            </span>
            <span
              className={cn(
                "font-medium",
                item.closed
                  ? "text-neutral-400 dark:text-neutral-500"
                  : "text-neutral-900 dark:text-white"
              )}
            >
              {item.hours}
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );

  if (variant === "card") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          "bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-shadow",
          className
        )}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={className}>{content}</div>;
}

/**
 * ReservationCTA - Call to action for restaurant reservations with premium styling
 */

interface ReservationCTAProps {
  phone?: string;
  email?: string;
  bookingUrl?: string;
  className?: string;
}

export function ReservationCTA({
  phone,
  email,
  bookingUrl,
  className,
}: ReservationCTAProps) {
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
      rgba(255, 255, 255, 0.05),
      transparent 80%
    )
  `;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative overflow-hidden bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl p-8 text-center",
        className
      )}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
      </div>

      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlightBackground }}
      />

      <div className="relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-2xl mb-4"
        >
          Make a Reservation
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-300 dark:text-neutral-600 mb-6"
        >
          Book your table for an unforgettable dining experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {bookingUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href={bookingUrl}
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-full font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Book Online
            </motion.a>
          )}
          {phone && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 dark:border-neutral-700 rounded-full font-medium hover:bg-white/10 dark:hover:bg-neutral-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phone}
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
