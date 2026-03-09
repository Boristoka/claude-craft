/**
 * Claude Craft - UI Components
 * 70+ production-ready components with premium visual effects
 */

// ============================================
// CORE COMPONENTS
// ============================================
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

// ============================================
// FEEDBACK COMPONENTS
// ============================================
export { Modal, ConfirmModal } from "./Modal";
export { ToastProvider, useToast } from "./Toast";
export { Tooltip } from "./Tooltip";
export { Progress, CircularProgress } from "./Progress";
export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, SkeletonTable } from "./Skeleton";

// ============================================
// NAVIGATION COMPONENTS
// ============================================
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";
export { CommandPalette, useCommandPalette, CommandIcons } from "./CommandPalette";

// ============================================
// FORM COMPONENTS
// ============================================
export { Switch } from "./Switch";
export {
  ContactForm,
  FormInput,
  FormTextarea,
  FormSelect,
  NewsletterForm,
} from "./ValidatedForm";

// ============================================
// CARD COMPONENTS
// ============================================
export { TestimonialCard } from "./Testimonial";
export { TestimonialCard as TestimonialCardNew, TestimonialGrid, TestimonialCarousel } from "./TestimonialCard";
export { FeatureCard } from "./FeatureCard";
export { PricingCard } from "./PricingCard";
export { PricingTable, PricingFeatureComparison } from "./PricingTable";
export { BlogCard, BlogGrid, BlogListItem } from "./BlogCard";
export { TeamCard, TeamGrid } from "./TeamCard";
export { ProjectCard, ProjectGrid, FeaturedProject } from "./ProjectCard";
export { SpotlightCard, SpotlightFeatureCard, SpotlightCardGrid, SpotlightBorderCard, GlowingOrb } from "./SpotlightCard";

// ============================================
// LAYOUT COMPONENTS
// ============================================
export { BentoGrid, BentoCard, BentoIcons } from "./BentoGrid";
export { Marquee, LogoMarquee, TestimonialMarquee, VerticalMarquee } from "./Marquee";

// ============================================
// ANIMATION COMPONENTS
// ============================================
export { AnimateOnScroll, StaggerChildren, ParallaxScroll, CountUp } from "./AnimateOnScroll";
export { ParallaxImage, ParallaxSection, ParallaxText } from "./ParallaxImage";

// ============================================
// VISUAL EFFECTS (Premium)
// ============================================
export { GradientBlob as AnimatedGradientBlob, GradientPresets } from "./GradientBlob";
export { TextReveal, AnimatedCounter, SplitText } from "./TextReveal";
export {
  AnimatedGradientText,
  AnimatedGradientBorder,
  AnimatedGradientButton,
  ShimmerText,
  GlowText,
  MorphText,
  GradientTextPresets,
} from "./AnimatedGradient";
export { Dock, DockItem, DockDivider, FloatingDock, DockIcons } from "./Dock";
export { ParticleField, GridPattern as AnimatedGridPattern, DotPattern } from "./ParticleField";

// ============================================
// FEATURE COMPONENTS (SaaS/Agency)
// ============================================
export { FeatureGrid, FeatureIcons } from "./FeatureGrid";
export { LogoCloud as LogoCloudGrid, TrustBadges, TrustIcons } from "./LogoCloud";
export { Timeline, ProcessSteps } from "./Timeline";

// ============================================
// RESTAURANT COMPONENTS
// ============================================
export { MenuSection, OpeningHours, ReservationCTA } from "./MenuSection";

// ============================================
// E-COMMERCE COMPONENTS
// ============================================
export { ProductCard, ProductGrid, CollectionCard } from "./ProductCard";
export { NewsletterSignup, AvailabilityBadge } from "./NewsletterSignup";
export {
  ImageGallery,
  ProductImageZoom,
} from "./ImageGallery";
export {
  CartDrawer,
  QuantitySelector,
  CartIcon,
} from "./CartDrawer";
export {
  ReviewStars,
  RatingInput,
  RatingSummary,
  SizeSelector,
  ColorSelector,
} from "./ReviewStars";

// ============================================
// DATA DISPLAY COMPONENTS (Dashboard)
// ============================================
export {
  DataTable,
  StatusBadge,
} from "./DataTable";
export {
  StatsCard,
  Sparkline,
  StatsGrid,
  MiniChart,
  StatComparison,
} from "./StatsCard";
export {
  ComparisonSlider,
  ComparisonCard,
  FeatureHighlight,
} from "./ComparisonSlider";

// ============================================
// FORM WIZARD COMPONENTS
// ============================================
export {
  Stepper,
  StepperContent,
  StepperNavigation,
  Wizard,
} from "./Stepper";
export {
  FileUpload,
  ImageUploadGrid,
} from "./FileUpload";

// ============================================
// ADVANCED NAVIGATION COMPONENTS
// ============================================
export {
  MegaMenu,
  MobileMenu,
  NavbarWithMegaMenu,
} from "./MegaMenu";
export {
  Breadcrumb,
  BreadcrumbWithDropdown,
  PageHeader,
} from "./Breadcrumb";
export {
  Pagination,
  SimplePagination,
  CursorPagination,
  PaginationInfo,
} from "./Pagination";
export {
  SidebarNav,
  SidebarSection,
  SidebarUserCard,
  DashboardLayout,
} from "./SidebarNav";
export {
  FloatingNav,
  StickyHeader,
  ScrollProgress,
  BackToTop,
  TableOfContents,
  BottomNav,
} from "./FloatingNav";

// ============================================
// UTILITY COMPONENTS
// ============================================
export { Map } from "./Map";
export { CookieBanner, useCookieConsent } from "./CookieBanner";
export { ThemeSwitcher } from "./ThemeSwitcher";
