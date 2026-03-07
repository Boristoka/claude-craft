import { Variants, Transition } from "framer-motion";

/**
 * Animation Presets for Framer Motion
 *
 * @example
 * <motion.div variants={fadeInUp} initial="initial" animate="animate">
 *   Content
 * </motion.div>
 */

// ============================================
// TRANSITIONS
// ============================================

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 17,
};

export const easeOutSmooth: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1],
};

export const easeOutFast: Transition = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1],
};

// ============================================
// FADE VARIANTS
// ============================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: easeOutSmooth },
  exit: { opacity: 0, transition: easeOutFast },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: easeOutSmooth },
  exit: { opacity: 0, y: 20, transition: easeOutFast },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: easeOutSmooth },
  exit: { opacity: 0, y: -20, transition: easeOutFast },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: easeOutSmooth },
  exit: { opacity: 0, x: -20, transition: easeOutFast },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: easeOutSmooth },
  exit: { opacity: 0, x: 20, transition: easeOutFast },
};

// ============================================
// SCALE VARIANTS
// ============================================

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: springSmooth },
  exit: { opacity: 0, scale: 0.95, transition: easeOutFast },
};

export const scaleInBounce: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: springBouncy },
  exit: { opacity: 0, scale: 0.8, transition: easeOutFast },
};

// ============================================
// STAGGER CONTAINERS
// ============================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ============================================
// STAGGER CHILDREN
// ============================================

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: easeOutSmooth },
};

export const staggerItemScale: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: springSmooth },
};

// ============================================
// HOVER & TAP EFFECTS
// ============================================

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

export const tapScale = {
  scale: 0.98,
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};
