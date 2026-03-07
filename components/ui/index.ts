/**
 * Claude Craft - UI Components
 */

// Core Components
export { Button, buttonVariants, type ButtonProps } from "./Button";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
  cardVariants,
} from "./Card";
export { Badge, badgeVariants, type BadgeProps } from "./Badge";
export { Input, Textarea, Select, type InputProps, type SelectProps, type SelectOption } from "./Input";
export { Avatar, AvatarGroup, avatarVariants, type AvatarProps } from "./Avatar";

// Feedback Components
export { Modal, ConfirmModal } from "./Modal";
export { ToastProvider, useToast } from "./Toast";
export { Tooltip } from "./Tooltip";
export { Progress, CircularProgress } from "./Progress";
export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, SkeletonTable } from "./Skeleton";

// Navigation Components
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

// Form Components
export { Switch } from "./Switch";

// Card Components
export { TestimonialCard } from "./Testimonial";
export { FeatureCard } from "./FeatureCard";
export { PricingCard } from "./PricingCard";

// Animation Components
export { AnimateOnScroll, StaggerChildren, ParallaxScroll, CountUp } from "./AnimateOnScroll";
export { ParallaxImage, ParallaxSection, ParallaxText } from "./ParallaxImage";
