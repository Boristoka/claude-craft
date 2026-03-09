"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "./Button";
import { Badge } from "./Badge";

/**
 * ProductCard - Premium e-commerce product display
 * Features: 3D tilt, image zoom, quick-add animation, color swatches
 */

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category?: string;
  description?: string;
  badge?: string;
  rating?: number;
  reviews?: number;
  colors?: { name: string; value: string }[];
  href?: string;
  variant?: "default" | "minimal" | "detailed" | "luxury";
  onAddToCart?: () => void;
  className?: string;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  images,
  category,
  description,
  badge,
  rating,
  reviews,
  colors,
  href,
  variant = "default",
  onAddToCart,
  className,
}: ProductCardProps) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [addedToCart, setAddedToCart] = React.useState(false);
  const allImages = images || [image];

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    onAddToCart?.();
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const content = (
    <motion.div
      className={cn("group relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: variant === "luxury" ? rotateX : 0,
        rotateY: variant === "luxury" ? rotateY : 0,
      }}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden mb-4",
        variant === "luxury" ? "rounded-3xl" : "rounded-xl",
        "aspect-[3/4] bg-neutral-100 dark:bg-neutral-800"
      )}>
        {/* Main Image with Zoom Effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <img
            src={allImages[isHovered && allImages.length > 1 ? 1 : currentImage]}
            alt={name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Badge */}
        <AnimatePresence>
          {badge && (
            <motion.div
              className="absolute top-3 left-3 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span
                className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
                  badge === "Sale" && "bg-red-500 text-white",
                  badge === "New" && "bg-emerald-500 text-white",
                  badge === "Bestseller" && "bg-amber-500 text-white",
                  !["Sale", "New", "Bestseller"].includes(badge) && "bg-neutral-900 text-white"
                )}
              >
                {badge === "Sale" && (
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-white mr-1.5"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
                {badge}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishlist Button */}
        <motion.button
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>

        {/* Quick Add Button */}
        {onAddToCart && (
          <motion.div
            className="absolute bottom-3 left-3 right-3 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={handleAddToCart}
              className={cn(
                "w-full py-3 rounded-xl font-medium text-sm transition-all",
                addedToCart
                  ? "bg-emerald-500 text-white"
                  : "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {addedToCart ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                    Added!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Quick Add
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}

        {/* Image dots */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImage(index);
                }}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  index === currentImage
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {category && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {category}
          </p>
        )}

        <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {name}
        </h3>

        {variant === "detailed" && description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {description}
          </p>
        )}

        {/* Color Swatches */}
        {colors && colors.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            {colors.map((color, index) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(index);
                }}
                className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all",
                  selectedColor === index
                    ? "border-neutral-900 dark:border-white scale-110"
                    : "border-transparent hover:scale-110"
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={cn(
                    "w-4 h-4",
                    star <= rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-neutral-300 dark:text-neutral-600"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {reviews && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                ({reviews})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="font-semibold text-lg text-neutral-900 dark:text-white">
            €{price}
          </span>
          {originalPrice && (
            <>
              <span className="text-sm text-neutral-400 line-through">
                €{originalPrice}
              </span>
              <motion.span
                className="text-sm font-medium text-red-600 dark:text-red-400"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                -{discount}%
              </motion.span>
            </>
          )}
        </div>
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
        }}
        animate={{
          x: isHovered ? ["0%", "200%"] : "0%",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}

/**
 * ProductGrid - Grid layout for products
 */
interface ProductGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({ children, columns = 4, className }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6 md:gap-8", gridCols[columns], className)}>
      {children}
    </div>
  );
}

/**
 * CollectionCard - Feature a collection/category
 */
interface CollectionCardProps {
  name: string;
  description?: string;
  image: string;
  itemCount?: number;
  href: string;
  variant?: "default" | "overlay" | "side";
  className?: string;
}

export function CollectionCard({
  name,
  description,
  image,
  itemCount,
  href,
  variant = "overlay",
  className,
}: CollectionCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  if (variant === "overlay") {
    return (
      <motion.a
        href={href}
        className={cn(
          "group relative block aspect-[4/5] rounded-3xl overflow-hidden",
          className
        )}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-2">{name}</h3>
            {description && (
              <p className="text-white/70 text-sm mb-3">{description}</p>
            )}
            <motion.div
              className="flex items-center gap-2 text-white/80 text-sm font-medium"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              {itemCount && <span>{itemCount} items</span>}
              <span>→</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
          }}
          animate={{
            x: isHovered ? ["0%", "200%"] : "0%",
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.a>
    );
  }

  // Default and side variants...
  return (
    <a href={href} className={cn("group block", className)}>
      <motion.div
        className="aspect-square rounded-2xl overflow-hidden mb-4"
        whileHover={{ scale: 1.02 }}
      >
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {name}
      </h3>
      {itemCount && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {itemCount} items
        </p>
      )}
    </a>
  );
}
