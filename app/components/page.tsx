"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, StatCard } from "@/components/ui/Card";
import { Alert, Banner, Callout } from "@/components/ui/Alert";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { Tooltip } from "@/components/ui/Tooltip";
import { Modal, ConfirmModal } from "@/components/ui/Modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { Progress, CircularProgress } from "@/components/ui/Progress";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar } from "@/components/ui/Skeleton";
import { DataTable, StatusBadge } from "@/components/ui/DataTable";
import { FileUpload } from "@/components/ui/FileUpload";
import { Stepper, StepperContent, StepperNavigation } from "@/components/ui/Stepper";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { TextReveal, AnimatedCounter } from "@/components/ui/TextReveal";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Pagination, SimplePagination } from "@/components/ui/Pagination";
import { FloatingNav, BackToTop, ScrollProgress } from "@/components/ui/FloatingNav";
import { SidebarNav, SidebarUserCard } from "@/components/ui/SidebarNav";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BentoGrid, BentoCard, BentoIcons } from "@/components/ui/BentoGrid";
import { Marquee, TestimonialMarquee } from "@/components/ui/Marquee";
import { SpotlightCard, SpotlightFeatureCard, SpotlightCardGrid } from "@/components/ui/SpotlightCard";
import { PricingTable } from "@/components/ui/PricingTable";
import { CommandPalette, CommandIcons } from "@/components/ui/CommandPalette";
import { FeatureGrid, FeatureIcons } from "@/components/ui/FeatureGrid";
import { Timeline, ProcessSteps } from "@/components/ui/Timeline";
import { MenuSection, OpeningHours } from "@/components/ui/MenuSection";
import { ProductCard, ProductGrid } from "@/components/ui/ProductCard";
import { TrustBadges, TrustIcons } from "@/components/ui/LogoCloud";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import {
  NavMenuVercel,
  NavMenuStripe,
  NavMenuGlass,
  NavMenuMagnetic,
  NavMenuUnderline,
} from "@/components/ui/NavMenu";

// ============================================================================
// COMPONENT CATEGORIES
// ============================================================================

const categories = [
  { id: "navigation", label: "Navigation", icon: "compass" },
  { id: "forms", label: "Forms & Input", icon: "form" },
  { id: "feedback", label: "Feedback", icon: "bell" },
  { id: "data", label: "Data Display", icon: "chart" },
  { id: "cards", label: "Content Cards", icon: "layout" },
  { id: "media", label: "Media", icon: "image" },
  { id: "animation", label: "Animation", icon: "sparkle" },
  { id: "layout", label: "Layout", icon: "grid" },
  { id: "industry", label: "Industry", icon: "building" },
];

// Demo data
const demoNavItems = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
];

const stripeNavItems = [
  { label: "Home", href: "#" },
  {
    label: "Products",
    href: "#",
    children: [
      {
        label: "Analytics",
        href: "#",
        description: "Track performance metrics",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
      {
        label: "Automation",
        href: "#",
        description: "Streamline your workflows",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ),
      },
    ],
  },
  { label: "Pricing", href: "#" },
];

const tableData = [
  { id: "1", name: "John Doe", email: "john@example.com", status: "Active", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", status: "Active", role: "User" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", status: "Inactive", role: "User" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", status: "Active", role: "Editor" },
  { id: "5", name: "Charlie Wilson", email: "charlie@example.com", status: "Pending", role: "User" },
];

const tableColumns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  {
    key: "status",
    label: "Status",
    render: (value: string) => (
      <StatusBadge
        status={value}
        variant={value === "Active" ? "success" : value === "Inactive" ? "error" : "warning"}
      />
    ),
  },
  { key: "role", label: "Role" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ComponentsShowcase() {
  const [activeCategory, setActiveCategory] = React.useState("navigation");

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        {/* Scroll Progress */}
        <ScrollProgress />

        {/* Back to Top */}
        <BackToTop />

        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
          <div className="container mx-auto px-6 text-center">
            <Badge className="mb-6">45+ Components</Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-white mb-6">
              Premium <em className="italic">Components</em>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
              Beautifully crafted components for building modern websites.
              All components support dark mode and are fully customizable.
            </p>

            {/* Quick Navigation Pills */}
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 pb-32">
          {/* ============================================
              NAVIGATION COMPONENTS
              ============================================ */}
          <section id="navigation" className="py-20 scroll-mt-20">
            <SectionHeader
              title="Navigation"
              description="Premium navigation components including menus, breadcrumbs, pagination, and sidebar navigation."
            />

            {/* Premium Nav Menus */}
            <div className="space-y-8 mb-16">
              <ComponentCard title="NavMenuVercel" description="Sliding pill indicator on hover">
                <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden">
                  <NavMenuVercel
                    logo={<span className="font-semibold text-neutral-900 dark:text-white">Vercel</span>}
                    items={demoNavItems}
                    cta={{ label: "Deploy", href: "#" }}
                  />
                </div>
              </ComponentCard>

              <ComponentCard title="NavMenuStripe" description="Morphing dropdown with rich content">
                <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden min-h-[200px]">
                  <NavMenuStripe
                    logo={<span className="font-bold text-neutral-900 dark:text-white">Stripe</span>}
                    items={stripeNavItems}
                    cta={{ label: "Start now", href: "#" }}
                  />
                </div>
              </ComponentCard>

              <ComponentCard title="NavMenuGlass" description="Glassmorphism with blur effect">
                <div
                  className="relative py-8 rounded-xl"
                  style={{ backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                >
                  <NavMenuGlass
                    logo={<span className="font-semibold text-white">Glass</span>}
                    items={demoNavItems}
                    cta={{ label: "Get Started", href: "#" }}
                  />
                </div>
              </ComponentCard>

              <ComponentCard title="NavMenuMagnetic" description="Items pull towards cursor">
                <div className="bg-neutral-950 rounded-xl overflow-hidden">
                  <NavMenuMagnetic
                    logo={<span className="font-bold text-white">Magnetic</span>}
                    items={demoNavItems}
                    cta={{ label: "Let's talk", href: "#" }}
                  />
                </div>
              </ComponentCard>

              <ComponentCard title="NavMenuUnderline" description="Elegant expanding underline">
                <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden">
                  <NavMenuUnderline
                    logo={<span className="font-serif text-xl text-neutral-900 dark:text-white">Editorial</span>}
                    items={demoNavItems}
                    cta={{ label: "Subscribe", href: "#" }}
                  />
                </div>
              </ComponentCard>
            </div>

            {/* Breadcrumb */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <ComponentCard title="Breadcrumb" description="Multiple variants available">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Default</p>
                    <Breadcrumb
                      items={[
                        { label: "Home", href: "#" },
                        { label: "Products", href: "#" },
                        { label: "Shoes" },
                      ]}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Pills</p>
                    <Breadcrumb
                      items={[
                        { label: "Home", href: "#" },
                        { label: "Products", href: "#" },
                        { label: "Shoes" },
                      ]}
                      variant="pills"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Minimal</p>
                    <Breadcrumb
                      items={[
                        { label: "Home", href: "#" },
                        { label: "Products", href: "#" },
                        { label: "Shoes" },
                      ]}
                      variant="minimal"
                    />
                  </div>
                </div>
              </ComponentCard>

              <ComponentCard title="Pagination" description="Multiple styles and sizes">
                <PaginationDemo />
              </ComponentCard>
            </div>

            {/* Floating Nav Preview */}
            <ComponentCard title="FloatingNav & BackToTop" description="Smart navigation that responds to scroll">
              <div className="text-center py-8">
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Scroll up and down to see the FloatingNav and BackToTop button in action.
                </p>
                <p className="text-sm text-neutral-500">
                  These components are active on this page - look at the top and bottom right!
                </p>
              </div>
            </ComponentCard>
          </section>

          {/* ============================================
              FORMS & INPUT COMPONENTS
              ============================================ */}
          <section id="forms" className="py-20 scroll-mt-20">
            <SectionHeader
              title="Forms & Input"
              description="Form components with validation, loading states, and accessibility built-in."
            />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Buttons */}
              <ComponentCard title="Button" description="Multiple variants and sizes with loading state">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button isLoading>Loading</Button>
                  </div>
                </div>
              </ComponentCard>

              {/* Input */}
              <ComponentCard title="Input & Textarea" description="With labels, icons, and error states">
                <div className="space-y-4">
                  <Input label="Email" placeholder="you@example.com" />
                  <Input
                    label="Password"
                    type="password"
                    error="Password must be at least 8 characters"
                  />
                  <Input
                    label="Search"
                    placeholder="Search..."
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  />
                </div>
              </ComponentCard>

              {/* Select */}
              <ComponentCard title="Select" description="Dropdown select with custom styling">
                <Select
                  label="Country"
                  placeholder="Select a country"
                  options={[
                    { value: "us", label: "United States" },
                    { value: "uk", label: "United Kingdom" },
                    { value: "de", label: "Germany" },
                    { value: "fr", label: "France" },
                  ]}
                />
              </ComponentCard>

              {/* Switch */}
              <ComponentCard title="Switch" description="Toggle switches with labels">
                <div className="space-y-4">
                  <Switch label="Enable notifications" description="Get notified about updates" />
                  <Switch label="Dark mode" defaultChecked />
                  <div className="flex gap-4">
                    <Switch size="sm" defaultChecked />
                    <Switch size="md" defaultChecked />
                    <Switch size="lg" defaultChecked />
                  </div>
                </div>
              </ComponentCard>

              {/* File Upload */}
              <ComponentCard title="FileUpload" description="Drag & drop with progress">
                <FileUpload accept="image/*" maxSize={5} />
              </ComponentCard>

              {/* Stepper */}
              <ComponentCard title="Stepper" description="Multi-step wizard progress">
                <StepperDemo />
              </ComponentCard>
            </div>
          </section>

          {/* ============================================
              FEEDBACK COMPONENTS
              ============================================ */}
          <section id="feedback" className="py-20 scroll-mt-20">
            <SectionHeader
              title="Feedback"
              description="Alerts, toasts, tooltips, and modals for user feedback."
            />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Alert */}
              <ComponentCard title="Alert" description="Inline alerts with variants">
                <div className="space-y-4">
                  <Alert variant="info">This is an informational message.</Alert>
                  <Alert variant="success" title="Success!">Your changes have been saved.</Alert>
                  <Alert variant="warning" dismissible>This action cannot be undone.</Alert>
                  <Alert variant="error">Something went wrong. Please try again.</Alert>
                </div>
              </ComponentCard>

              {/* Callout */}
              <ComponentCard title="Callout" description="Content callouts for documentation">
                <div className="space-y-4">
                  <Callout variant="note">This is a helpful note for users.</Callout>
                  <Callout variant="tip">Pro tip: Use keyboard shortcuts!</Callout>
                  <Callout variant="warning">Be careful with this action.</Callout>
                </div>
              </ComponentCard>

              {/* Toast */}
              <ComponentCard title="Toast" description="Notification popups">
                <ToastDemo />
              </ComponentCard>

              {/* Tooltip */}
              <ComponentCard title="Tooltip" description="Hover tooltips with positions">
                <div className="flex flex-wrap gap-4">
                  <Tooltip content="Top tooltip" side="top">
                    <Button variant="outline">Top</Button>
                  </Tooltip>
                  <Tooltip content="Right tooltip" side="right">
                    <Button variant="outline">Right</Button>
                  </Tooltip>
                  <Tooltip content="Bottom tooltip" side="bottom">
                    <Button variant="outline">Bottom</Button>
                  </Tooltip>
                  <Tooltip content="Left tooltip" side="left">
                    <Button variant="outline">Left</Button>
                  </Tooltip>
                </div>
              </ComponentCard>

              {/* Modal */}
              <ComponentCard title="Modal" description="Dialog with backdrop">
                <ModalDemo />
              </ComponentCard>

              {/* Banner */}
              <ComponentCard title="Banner" description="Promotional banners">
                <div className="space-y-4">
                  <Banner variant="promo">Limited time offer: 20% off!</Banner>
                  <Banner variant="announcement" dismissible>
                    New features released
                  </Banner>
                </div>
              </ComponentCard>
            </div>
          </section>

          {/* ============================================
              DATA DISPLAY COMPONENTS
              ============================================ */}
          <section id="data" className="py-20 scroll-mt-20">
            <SectionHeader
              title="Data Display"
              description="Components for displaying data, statistics, and loading states."
            />

            <div className="space-y-8">
              {/* DataTable */}
              <ComponentCard title="DataTable" description="Sortable, searchable data table">
                <DataTable
                  columns={tableColumns}
                  data={tableData}
                  pageSize={5}
                />
              </ComponentCard>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Progress */}
                <ComponentCard title="Progress" description="Linear and circular progress">
                  <div className="space-y-6">
                    <Progress value={75} showValue />
                    <Progress value={50} variant="gradient" />
                    <div className="flex gap-8">
                      <CircularProgress value={75} />
                      <CircularProgress value={45} size={60} />
                    </div>
                  </div>
                </ComponentCard>

                {/* Badge */}
                <ComponentCard title="Badge" description="Labels and tags">
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge className="bg-green-100 text-green-800">Success</Badge>
                    <Badge className="bg-red-100 text-red-800">Error</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                  </div>
                </ComponentCard>

                {/* Avatar */}
                <ComponentCard title="Avatar" description="User avatars with status">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                        alt="User"
                        status="online"
                      />
                      <Avatar fallback="JD" status="busy" />
                      <Avatar fallback="AB" status="away" />
                      <Avatar fallback="?" status="offline" />
                    </div>
                    <AvatarGroup max={4}>
                      <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" />
                      <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" />
                      <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" />
                      <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" />
                      <Avatar fallback="JD" />
                      <Avatar fallback="AB" />
                    </AvatarGroup>
                  </div>
                </ComponentCard>

                {/* Skeleton */}
                <ComponentCard title="Skeleton" description="Loading placeholders">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <SkeletonAvatar size="lg" />
                      <div className="flex-1">
                        <SkeletonText lines={2} />
                      </div>
                    </div>
                    <SkeletonCard />
                  </div>
                </ComponentCard>

                {/* StatCard */}
                <ComponentCard title="StatCard" description="KPI and metrics display">
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard
                      icon={<BentoIcons.Chart />}
                      value="12.5K"
                      label="Total Users"
                    />
                    <StatCard
                      icon={<BentoIcons.Zap />}
                      value="98%"
                      label="Uptime"
                    />
                  </div>
                </ComponentCard>

                {/* AnimatedCounter */}
                <ComponentCard title="AnimatedCounter" description="Animated number counting">
                  <div className="flex gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-neutral-900 dark:text-white">
                        <AnimatedCounter value={12500} duration={2} suffix="+" />
                      </div>
                      <p className="text-sm text-neutral-500">Users</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-neutral-900 dark:text-white">
                        $<AnimatedCounter value={2500000} duration={2.5} />
                      </div>
                      <p className="text-sm text-neutral-500">Revenue</p>
                    </div>
                  </div>
                </ComponentCard>
              </div>
            </div>
          </section>

          {/* ============================================
              CONTENT CARDS
              ============================================ */}
          <section id="cards" className="py-20 scroll-mt-20">
            <SectionHeader
              title="Content Cards"
              description="Card components for features, pricing, testimonials, and more."
            />

            {/* Card Variants */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Basic card with shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Card content goes here.
                  </p>
                </CardContent>
              </Card>

              <Card variant="interactive">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Lifts on hover</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Hover to see the effect.
                  </p>
                </CardContent>
              </Card>

              <Card variant="ghost">
                <CardHeader>
                  <CardTitle>Ghost Card</CardTitle>
                  <CardDescription>Subtle background</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Minimal styling.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Bento Grid */}
            <ComponentCard title="BentoGrid" description="Asymmetric grid layout">
              <BentoGrid>
                <BentoCard
                  size="large"
                  title="Analytics Dashboard"
                  description="Track your performance with real-time analytics."
                  icon={<BentoIcons.Chart />}
                  gradient="vibrant"
                />
                <BentoCard
                  size="small"
                  title="Lightning Fast"
                  description="Optimized for speed."
                  icon={<BentoIcons.Zap />}
                />
                <BentoCard
                  size="small"
                  title="Secure"
                  description="Enterprise-grade security."
                  icon={<BentoIcons.Shield />}
                />
                <BentoCard
                  size="wide"
                  title="Global Scale"
                  description="Deploy worldwide with edge computing."
                  icon={<BentoIcons.Globe />}
                />
              </BentoGrid>
            </ComponentCard>

            {/* Spotlight Cards */}
            <ComponentCard title="SpotlightCard" description="Cursor-following spotlight effect">
              <SpotlightCardGrid columns={3}>
                <SpotlightFeatureCard
                  icon={<BentoIcons.Zap />}
                  title="Blazing Fast"
                  description="Built with performance in mind."
                  spotlightColor="rgba(251, 191, 36, 0.1)"
                />
                <SpotlightFeatureCard
                  icon={<BentoIcons.Shield />}
                  title="Secure"
                  description="SOC 2 compliant and encrypted."
                  spotlightColor="rgba(34, 197, 94, 0.1)"
                />
                <SpotlightFeatureCard
                  icon={<BentoIcons.Sparkles />}
                  title="AI-Powered"
                  description="Intelligent automation."
                  spotlightColor="rgba(168, 85, 247, 0.1)"
                />
              </SpotlightCardGrid>
            </ComponentCard>

            {/* Pricing Table */}
            <ComponentCard title="PricingTable" description="With monthly/yearly toggle">
              <PricingTable
                yearlyDiscount={20}
                plans={[
                  {
                    name: "Starter",
                    description: "For side projects",
                    price: { monthly: 0, yearly: 0 },
                    features: ["Up to 3 projects", "Basic analytics", "Community support"],
                    cta: "Get Started Free",
                  },
                  {
                    name: "Pro",
                    description: "For growing businesses",
                    price: { monthly: 29, yearly: 278 },
                    features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domains"],
                    featured: true,
                    badge: "Most Popular",
                    cta: "Start Free Trial",
                  },
                  {
                    name: "Enterprise",
                    description: "For large organizations",
                    price: { monthly: 99, yearly: 950 },
                    features: ["Everything in Pro", "Unlimited storage", "Dedicated support", "SLA guarantee"],
                    cta: "Contact Sales",
                  },
                ]}
              />
            </ComponentCard>
          </section>

          {/* ============================================
              MEDIA COMPONENTS
              ============================================ */}
          <section id="media" className="py-20 scroll-mt-20">
            <SectionHeader
              title="Media"
              description="Image galleries, comparison sliders, and media components."
            />

            <ComponentCard title="ImageGallery" description="With lightbox and zoom">
              <ImageGallery
                images={[
                  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", alt: "Mountain" },
                  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80", alt: "Valley" },
                  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", alt: "Lake" },
                  { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80", alt: "Nature" },
                ]}
                variant="default"
                aspectRatio="video"
              />
            </ComponentCard>
          </section>

          {/* ============================================
              ANIMATION COMPONENTS
              ============================================ */}
          <section id="animation" className="py-20 scroll-mt-20">
            <SectionHeader
              title="Animation"
              description="Text reveals, scroll animations, and motion effects."
            />

            <div className="grid md:grid-cols-2 gap-8">
              {/* TextReveal */}
              <ComponentCard title="TextReveal" description="Animated text effects">
                <div className="space-y-8">
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Typewriter</p>
                    <TextReveal
                      text="Hello, I'm a typewriter effect."
                      variant="typewriter"
                      className="text-xl font-medium text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Word by Word</p>
                    <TextReveal
                      text="Each word fades in separately with blur."
                      variant="words"
                      className="text-xl font-medium text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Highlight</p>
                    <TextReveal
                      text="This text gets highlighted"
                      variant="highlight"
                      as="span"
                      className="text-xl font-medium text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>
              </ComponentCard>

              {/* Marquee */}
              <ComponentCard title="Marquee" description="Infinite scrolling content">
                <div className="space-y-6 overflow-hidden">
                  <Marquee speed="slow">
                    {["Vercel", "Stripe", "Linear", "Notion", "Figma"].map((name) => (
                      <div
                        key={name}
                        className="flex items-center justify-center w-24 h-10 mx-3 text-lg font-bold text-neutral-300 dark:text-neutral-600"
                      >
                        {name}
                      </div>
                    ))}
                  </Marquee>
                </div>
              </ComponentCard>
            </div>

            {/* Testimonial Marquee */}
            <ComponentCard title="TestimonialMarquee" description="Auto-scrolling testimonials" className="mt-8 overflow-hidden">
              <div className="-mx-6">
                <TestimonialMarquee
                  direction="left"
                  speed="slow"
                  testimonials={[
                    {
                      quote: "This UI kit has completely transformed how we build websites.",
                      author: "Sarah Chen",
                      role: "Lead Designer at TechCorp",
                      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                    },
                    {
                      quote: "The attention to detail is incredible. Everything just works.",
                      author: "Michael Torres",
                      role: "Founder at StartupXYZ",
                      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                    },
                    {
                      quote: "We shipped our landing page in half the time. Highly recommend!",
                      author: "Emily Watson",
                      role: "Frontend Engineer",
                      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
                    },
                  ]}
                />
              </div>
            </ComponentCard>
          </section>

          {/* ============================================
              LAYOUT COMPONENTS
              ============================================ */}
          <section id="layout" className="py-20 scroll-mt-20">
            <SectionHeader
              title="Layout"
              description="Tabs, accordions, steppers, and content organization."
            />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tabs */}
              <ComponentCard title="Tabs" description="Tabbed navigation with animation">
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Account</TabsTrigger>
                    <TabsTrigger value="tab2">Security</TabsTrigger>
                    <TabsTrigger value="tab3">Billing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Manage your account settings and preferences.
                    </p>
                  </TabsContent>
                  <TabsContent value="tab2">
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Update your security settings and two-factor authentication.
                    </p>
                  </TabsContent>
                  <TabsContent value="tab3">
                    <p className="text-neutral-600 dark:text-neutral-400">
                      View your billing history and manage payment methods.
                    </p>
                  </TabsContent>
                </Tabs>
              </ComponentCard>

              {/* Accordion */}
              <ComponentCard title="Accordion" description="Expandable content sections">
                <Accordion type="single" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is Claude Craft?</AccordionTrigger>
                    <AccordionContent>
                      Claude Craft is a premium UI kit for building beautiful websites with Claude Code.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it customizable?</AccordionTrigger>
                    <AccordionContent>
                      Yes! All components are fully customizable with Tailwind CSS classes.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
                    <AccordionContent>
                      Absolutely! Every component has been designed with dark mode support.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentCard>

              {/* Command Palette */}
              <ComponentCard title="CommandPalette" description="Cmd+K style search interface">
                <div className="max-w-md">
                  <CommandPalette
                    placeholder="Search or type a command..."
                    commands={[
                      {
                        id: "home",
                        label: "Go to Home",
                        description: "Navigate to homepage",
                        icon: <CommandIcons.Home />,
                        shortcut: "G H",
                        href: "/",
                        category: "Navigation",
                      },
                      {
                        id: "search",
                        label: "Search",
                        description: "Search for anything",
                        icon: <CommandIcons.Search />,
                        shortcut: "/",
                        category: "Actions",
                      },
                      {
                        id: "settings",
                        label: "Settings",
                        description: "Open settings",
                        icon: <CommandIcons.Settings />,
                        shortcut: "G S",
                        category: "Navigation",
                      },
                    ]}
                  />
                </div>
              </ComponentCard>

              {/* SidebarNav Preview */}
              <ComponentCard title="SidebarNav" description="Collapsible dashboard navigation">
                <div className="h-64 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                  <SidebarNav
                    header={
                      <SidebarUserCard
                        name="John Doe"
                        email="john@example.com"
                        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                      />
                    }
                    items={[
                      {
                        label: "Dashboard",
                        href: "#",
                        isActive: true,
                        icon: (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        ),
                      },
                      {
                        label: "Analytics",
                        href: "#",
                        badge: "New",
                        badgeVariant: "primary",
                        icon: (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        ),
                      },
                      {
                        label: "Settings",
                        href: "#",
                        icon: (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        ),
                      },
                    ]}
                    showCollapseButton={false}
                  />
                </div>
              </ComponentCard>
            </div>
          </section>

          {/* ============================================
              INDUSTRY COMPONENTS
              ============================================ */}
          <section id="industry" className="py-20 scroll-mt-20">
            <SectionHeader
              title="Industry-Specific"
              description="Specialized components for SaaS, E-commerce, Restaurant, and more."
            />

            {/* Feature Grid */}
            <ComponentCard title="FeatureGrid" description="For SaaS feature showcases">
              <div className="bg-neutral-900 dark:bg-black rounded-2xl p-8">
                <FeatureGrid
                  features={[
                    { icon: <FeatureIcons.Zap />, title: "Lightning Fast", description: "Optimized for speed across all devices." },
                    { icon: <FeatureIcons.Shield />, title: "Secure", description: "Bank-level encryption protects your data." },
                    { icon: <FeatureIcons.Globe />, title: "Global CDN", description: "Deployed across 50+ regions." },
                  ]}
                  columns={3}
                  variant="spotlight"
                />
              </div>
            </ComponentCard>

            {/* Trust Badges */}
            <ComponentCard title="TrustBadges" description="E-commerce trust indicators">
              <TrustBadges
                badges={[
                  { icon: <TrustIcons.Truck />, label: "Free Shipping", description: "On orders over $50" },
                  { icon: <TrustIcons.Return />, label: "30-Day Returns", description: "No questions asked" },
                  { icon: <TrustIcons.Shield />, label: "Secure Payment", description: "SSL encrypted" },
                  { icon: <TrustIcons.Support />, label: "24/7 Support", description: "Always here to help" },
                ]}
                variant="horizontal"
              />
            </ComponentCard>

            {/* Product Cards */}
            <ComponentCard title="ProductCard" description="E-commerce product displays">
              <ProductGrid columns={4}>
                <ProductCard
                  name="Classic T-Shirt"
                  price={45}
                  image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"
                  category="Apparel"
                  badge="New"
                  rating={5}
                  reviews={128}
                />
                <ProductCard
                  name="Leather Wallet"
                  price={85}
                  originalPrice={120}
                  image="https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80"
                  category="Accessories"
                  badge="Sale"
                  rating={4}
                  reviews={64}
                />
                <ProductCard
                  name="Canvas Backpack"
                  price={129}
                  image="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"
                  category="Bags"
                  badge="Bestseller"
                  rating={5}
                  reviews={256}
                />
                <ProductCard
                  name="Wool Scarf"
                  price={55}
                  image="https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80"
                  category="Accessories"
                  rating={4}
                  reviews={42}
                />
              </ProductGrid>
            </ComponentCard>

            {/* Menu Section */}
            <ComponentCard title="MenuSection" description="Restaurant menu displays">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <MenuSection
                    categories={[
                      {
                        name: "Signature Dishes",
                        items: [
                          { name: "Truffle Risotto", price: "26", description: "Arborio rice, black truffle, aged parmesan", tag: "Popular" },
                          { name: "Wagyu Beef Tataki", price: "38", description: "A5 wagyu, ponzu, microgreens", tag: "New" },
                          { name: "Lobster Thermidor", price: "45", description: "Whole Maine lobster, cognac cream" },
                        ],
                      },
                    ]}
                    variant="elegant"
                  />
                </div>
                <OpeningHours
                  title="Opening Hours"
                  hours={[
                    { days: "Monday - Friday", hours: "12:00 - 22:30" },
                    { days: "Saturday", hours: "11:00 - 23:00" },
                    { days: "Sunday", hours: "11:00 - 21:00" },
                  ]}
                  variant="card"
                />
              </div>
            </ComponentCard>

            {/* Timeline */}
            <ComponentCard title="Timeline & ProcessSteps" description="Experience and process displays">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <p className="text-sm text-neutral-500 mb-4">Timeline</p>
                  <Timeline
                    items={[
                      { year: "2024", title: "Lead Designer", company: "TechCorp", description: "Leading design for enterprise products", current: true },
                      { year: "2021", title: "Senior Designer", company: "StartupXYZ", description: "Built design system from scratch" },
                      { year: "2018", title: "Product Designer", company: "AgencyOne", description: "Worked on 20+ client projects" },
                    ]}
                    variant="default"
                  />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-4">Process Steps</p>
                  <ProcessSteps
                    steps={[
                      { number: "01", title: "Discovery", description: "Understanding your goals" },
                      { number: "02", title: "Design", description: "Creating solutions" },
                      { number: "03", title: "Develop", description: "Building with code" },
                      { number: "04", title: "Launch", description: "Deploying your project" },
                    ]}
                    variant="cards"
                  />
                </div>
              </div>
            </ComponentCard>

            {/* Newsletter */}
            <ComponentCard title="NewsletterSignup" description="Email capture with animations">
              <div className="max-w-xl mx-auto">
                <NewsletterSignup
                  title="Join the waitlist"
                  description="Be the first to know when we launch."
                  variant="gradient"
                />
              </div>
            </ComponentCard>
          </section>

          {/* ============================================
              CTA SECTION
              ============================================ */}
          <section className="py-20">
            <div className="bg-neutral-900 dark:bg-black rounded-3xl p-12 text-center">
              <AnimateOnScroll animation="fadeInUp">
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                  Ready to build something <em className="italic">beautiful</em>?
                </h2>
                <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                  All these components are included in Claude Craft. Clone the repo and start building.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://github.com/Boristoka/claude-craft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 font-medium rounded-xl hover:bg-neutral-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    View on GitHub
                  </a>
                  <a
                    href="/demo"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
                  >
                    View Demo
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        </div>
      </div>
    </ToastProvider>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <AnimateOnScroll animation="fadeInUp">
      <div className="mb-12">
        <Badge className="mb-4">{title}</Badge>
        <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
          {title} Components
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
          {description}
        </p>
      </div>
    </AnimateOnScroll>
  );
}

function ComponentCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimateOnScroll animation="fadeInUp">
      <div className={`rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden ${className || ""}`}>
        <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
        <div className="p-6 bg-white dark:bg-neutral-950">{children}</div>
      </div>
    </AnimateOnScroll>
  );
}

// Demo components with state

function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-neutral-500 mb-2">Default</p>
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-2">Pills</p>
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} variant="pills" />
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-2">Simple</p>
        <SimplePagination currentPage={page} totalPages={10} onPageChange={setPage} />
      </div>
    </div>
  );
}

function StepperDemo() {
  const [step, setStep] = React.useState(1);
  return (
    <div className="space-y-4">
      <Stepper
        steps={["Account", "Profile", "Confirm"]}
        currentStep={step}
        onStepClick={setStep}
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
        >
          Previous
        </Button>
        <Button
          size="sm"
          onClick={() => setStep(Math.min(2, step + 1))}
          disabled={step === 2}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() => toast({ title: "Default toast", description: "This is a notification." })}
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast({ title: "Success!", description: "Action completed.", variant: "success" })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "error" })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast({ title: "Warning", description: "Please be careful.", variant: "warning" })}
      >
        Warning
      </Button>
    </div>
  );
}

function ModalDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Button variant="outline" onClick={() => setIsConfirmOpen(true)}>
        Confirm Dialog
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        description="This is a description of the modal."
      >
        <p className="text-neutral-600 dark:text-neutral-400">
          Modal content goes here. You can put any content inside.
        </p>
        <div className="flex gap-3 mt-6">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </div>
      </Modal>

      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => setIsConfirmOpen(false)}
        title="Delete item?"
        description="This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
