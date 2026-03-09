"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

/**
 * CartDrawer - Slide-out shopping cart with animations
 * E-commerce component with quantity controls and checkout flow
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 * <CartDrawer
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   items={cartItems}
 * />
 */

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  maxQuantity?: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
  currency?: string;
  shippingThreshold?: number;
  shippingCost?: number;
  position?: "right" | "left";
  className?: string;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency = "€",
  shippingThreshold = 50,
  shippingCost = 5.99,
  position = "right",
  className,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= shippingThreshold;
  const total = subtotal + (isFreeShipping ? 0 : shippingCost);
  const progressToFreeShipping = Math.min((subtotal / shippingThreshold) * 100, 100);

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: position === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: position === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed top-0 bottom-0 w-full max-w-md bg-white dark:bg-neutral-900 z-50 flex flex-col shadow-2xl",
              position === "right" ? "right-0" : "left-0",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Shopping Cart
                </h2>
                <span className="px-2 py-0.5 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Free Shipping Progress */}
            {!isFreeShipping && shippingThreshold > 0 && (
              <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {currency}{(shippingThreshold - subtotal).toFixed(2)} away from free shipping
                  </span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {currency}{shippingThreshold}
                  </span>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToFreeShipping}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {isFreeShipping && (
              <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                You qualify for free shipping!
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">Your cart is empty</p>
                  <Button onClick={onClose}>Continue Shopping</Button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      currency={currency}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemove={onRemoveItem}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-200 dark:border-neutral-800 p-4 space-y-4">
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                    <span className="text-neutral-900 dark:text-white">{currency}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                    <span className={cn(
                      isFreeShipping ? "text-green-600 dark:text-green-400" : "text-neutral-900 dark:text-white"
                    )}>
                      {isFreeShipping ? "Free" : `${currency}${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <span className="text-neutral-900 dark:text-white">Total</span>
                    <span className="text-neutral-900 dark:text-white">{currency}{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button onClick={onCheckout} className="w-full" size="lg">
                  Checkout
                </Button>

                <button
                  onClick={onClose}
                  className="w-full text-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * CartItemCard - Individual cart item
 */
function CartItemCard({
  item,
  currency,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  currency: string;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-4 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50"
    >
      {/* Image */}
      {item.image && (
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-neutral-800">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-neutral-900 dark:text-white truncate">
          {item.name}
        </h3>
        {item.variant && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.variant}</p>
        )}
        <p className="font-semibold text-neutral-900 dark:text-white mt-1">
          {currency}{item.price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            value={item.quantity}
            min={1}
            max={item.maxQuantity || 99}
            onChange={(qty) => onUpdateQuantity?.(item.id, qty)}
            size="sm"
          />
          <button
            onClick={() => onRemove?.(item.id)}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * QuantitySelector - Stylish quantity input with +/- buttons
 */
interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10",
    lg: "h-12 text-lg",
  };

  const buttonSizeClasses = {
    sm: "w-8",
    md: "w-10",
    lg: "w-12",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={decrease}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
          buttonSizeClasses[size],
          sizeClasses[size]
        )}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </motion.button>

      <motion.span
        key={value}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="w-12 text-center font-medium text-neutral-900 dark:text-white"
      >
        {value}
      </motion.span>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={increase}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
          buttonSizeClasses[size],
          sizeClasses[size]
        )}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    </div>
  );
}

/**
 * CartIcon - Floating cart button with item count
 */
interface CartIconProps {
  itemCount: number;
  onClick: () => void;
  className?: string;
}

export function CartIcon({ itemCount, onClick, className }: CartIconProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-lg",
        className
      )}
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>

      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
