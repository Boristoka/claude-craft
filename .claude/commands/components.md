# Component Reference

Usage examples for all UI components.

---

## Bento Grid

Trendy asymmetric grid layout inspired by Apple and Linear.

```tsx
import { BentoGrid, BentoCard, BentoIcons } from "@/components/ui/BentoGrid";

<BentoGrid>
  <BentoCard
    size="large"
    title="Main Feature"
    description="This is the main feature that spans 2 columns."
    icon={<BentoIcons.Sparkles />}
    gradient="vibrant"
  />
  <BentoCard
    size="small"
    title="Feature 2"
    description="A smaller feature card."
    icon={<BentoIcons.Zap />}
  />
  <BentoCard
    size="tall"
    title="Tall Card"
    description="Spans 2 rows vertically."
    icon={<BentoIcons.Shield />}
  />
  <BentoCard
    size="wide"
    title="Wide Card"
    description="Spans full width."
    icon={<BentoIcons.Globe />}
    href="/learn-more"
  />
</BentoGrid>

// Sizes: "small" | "medium" | "large" | "wide" | "tall"
// Gradients: "none" | "subtle" | "vibrant"
```

---

## Marquee

Infinite scrolling content for logos or testimonials.

```tsx
import { Marquee, LogoMarquee, TestimonialMarquee } from "@/components/ui/Marquee";

// Basic marquee
<Marquee speed="normal" direction="left">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Marquee>

// Logo cloud
<LogoMarquee
  logos={[
    { name: "Company 1", logo: <Logo1 /> },
    { name: "Company 2", logo: <Logo2 /> },
  ]}
/>

// Testimonials
<TestimonialMarquee
  testimonials={[
    { quote: "Amazing!", author: "John", role: "CEO" },
    { quote: "Love it!", author: "Jane", role: "Designer" },
  ]}
/>

// Speeds: "slow" | "normal" | "fast"
// Directions: "left" | "right"
```

---

## Spotlight Card

Cards with cursor-following glow effect.

```tsx
import { SpotlightCard, SpotlightFeatureCard, SpotlightCardGrid } from "@/components/ui/SpotlightCard";

// Basic spotlight card
<SpotlightCard>
  <h3>Feature Title</h3>
  <p>Description here</p>
</SpotlightCard>

// Pre-styled feature card
<SpotlightFeatureCard
  icon={<IconComponent />}
  title="Feature"
  description="Description"
  spotlightColor="rgba(99, 102, 241, 0.15)"
/>

// Grid of spotlight cards
<SpotlightCardGrid columns={3}>
  <SpotlightFeatureCard ... />
  <SpotlightFeatureCard ... />
  <SpotlightFeatureCard ... />
</SpotlightCardGrid>
```

---

## Pricing Table

Professional pricing with monthly/yearly toggle.

```tsx
import { PricingTable } from "@/components/ui/PricingTable";

<PricingTable
  yearlyDiscount={20}
  plans={[
    {
      name: "Starter",
      description: "For individuals",
      price: { monthly: 9, yearly: 86 },
      features: ["5 projects", "Basic support", "1GB storage"],
      cta: "Start Free",
      ctaLink: "/signup",
    },
    {
      name: "Pro",
      description: "For teams",
      price: { monthly: 29, yearly: 278 },
      features: ["Unlimited projects", "Priority support", "100GB storage"],
      featured: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      description: "For large orgs",
      price: { monthly: 99, yearly: 950 },
      features: ["Everything in Pro", "Custom integrations", "SLA"],
    },
  ]}
/>
```

---

## Command Palette

Cmd+K style search interface.

```tsx
import { CommandPalette, CommandIcons } from "@/components/ui/CommandPalette";

<CommandPalette
  placeholder="Search or type a command..."
  commands={[
    {
      id: "home",
      label: "Go to Home",
      description: "Navigate to homepage",
      icon: <CommandIcons.Home />,
      shortcut: "⌘H",
      href: "/",
      category: "Navigation",
    },
    {
      id: "settings",
      label: "Open Settings",
      icon: <CommandIcons.Settings />,
      action: () => openSettings(),
      category: "Actions",
    },
    {
      id: "search",
      label: "Search docs",
      icon: <CommandIcons.Search />,
      shortcut: "⌘/",
      category: "Search",
    },
  ]}
/>

// Opens with Cmd+K or click
// Navigate with ↑↓, select with Enter, close with Escape
```

---

## Button

```tsx
import { Button } from "@/components/ui/Button";

// Variants
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// As Link
<Button asChild>
  <Link href="/contact">Contact Us</Link>
</Button>

// On dark backgrounds
<Button className="bg-white text-neutral-900 hover:bg-neutral-100">
  Light button
</Button>
<Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800">
  Dark outline
</Button>

// With icon
<Button>
  Get Started
  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
</Button>
```

---

## Badge

```tsx
import { Badge } from "@/components/ui/Badge";

// Variants
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>

// On photos/dark backgrounds
<Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
  Featured
</Badge>

// With dot indicator
<Badge className="flex items-center gap-1.5">
  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
  Live
</Badge>
```

---

## Input & Textarea

```tsx
import { Input, Textarea, Select } from "@/components/ui/Input";

// Basic input
<Input label="Name" placeholder="Your name" />

// With validation
<Input
  label="Email"
  type="email"
  placeholder="you@email.com"
  required
/>

// Textarea
<Textarea
  label="Message"
  placeholder="Your message..."
  rows={5}
/>

// Select dropdown
<Select label="Country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</Select>
```

---

## Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Hover effect
<Card className="hover-lift">
  ...
</Card>
```

---

## AnimateOnScroll

```tsx
import { AnimateOnScroll, CountUp, StaggerChildren } from "@/components/ui/AnimateOnScroll";

// Basic fade up on scroll
<AnimateOnScroll animation="fadeInUp">
  <div>Content appears when scrolled into view</div>
</AnimateOnScroll>

// With delay (for staggering multiple items)
<AnimateOnScroll animation="fadeInUp" delay={0.1}>Item 1</AnimateOnScroll>
<AnimateOnScroll animation="fadeInUp" delay={0.2}>Item 2</AnimateOnScroll>
<AnimateOnScroll animation="fadeInUp" delay={0.3}>Item 3</AnimateOnScroll>

// Counting number animation
<p className="font-serif text-5xl">
  <CountUp end={150} />+
</p>

// With duration and suffix
<CountUp end={98} duration={2} />%
```

---

## Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for tab 1</TabsContent>
  <TabsContent value="tab2">Content for tab 2</TabsContent>
  <TabsContent value="tab3">Content for tab 3</TabsContent>
</Tabs>
```

---

## Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1?</AccordionTrigger>
    <AccordionContent>Answer to question 1.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Question 2?</AccordionTrigger>
    <AccordionContent>Answer to question 2.</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## Modal

```tsx
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/Modal";

<Modal>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalDescription>Modal description text.</ModalDescription>
    </ModalHeader>
    <div className="py-4">
      Modal body content
    </div>
    <ModalFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

---

## Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

<Avatar>
  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Sizes
<Avatar className="w-8 h-8">...</Avatar>   // Small
<Avatar className="w-12 h-12">...</Avatar>  // Default
<Avatar className="w-16 h-16">...</Avatar>  // Large
```

---

## Progress

```tsx
import { Progress } from "@/components/ui/Progress";

<Progress value={60} />
<Progress value={80} className="h-2" />
```

---

## Switch

```tsx
import { Switch } from "@/components/ui/Switch";

<Switch />
<Switch defaultChecked />

// With label
<label className="flex items-center gap-2">
  <Switch />
  <span>Enable notifications</span>
</label>
```

---

## Skeleton

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

// Loading placeholder
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-12 w-full" />
<Skeleton className="h-[200px] w-full rounded-xl" />

// Card loading state
<div className="space-y-4">
  <Skeleton className="h-8 w-1/3" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-2/3" />
</div>
```

---

## Toast

```tsx
import { useToast } from "@/components/ui/Toast";

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button onClick={() => toast({
      title: "Success!",
      description: "Your changes have been saved."
    })}>
      Show Toast
    </Button>
  );
}
```

---

## Tooltip

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      Tooltip content
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## ParallaxImage

```tsx
import { ParallaxImage } from "@/components/ui/ParallaxImage";

<ParallaxImage
  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
  alt="Hero image"
  className="h-[80vh]"
/>
```

---

## ProjectCard

Portfolio project cards with 3D tilt effect.

```tsx
import { ProjectCard, ProjectGrid, FeaturedProject } from "@/components/ui/ProjectCard";

// Basic project card
<ProjectCard
  title="Brand Identity"
  category="Branding"
  description="Complete visual identity system"
  image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800"
  tags={["Identity", "Print", "Digital"]}
  year="2024"
  href="/portfolio/brand-identity"
/>

// Grid of projects
<ProjectGrid columns={3}>
  <ProjectCard ... />
  <ProjectCard ... />
  <ProjectCard ... />
</ProjectGrid>

// Large featured project
<FeaturedProject
  title="Meridian Brand Identity"
  category="Branding & Strategy"
  description="A complete brand transformation..."
  image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200"
  stats={[
    { label: "Brand Awareness", value: "+340%" },
    { label: "Revenue", value: "2.4x" },
  ]}
  href="/portfolio/meridian"
/>

// Aspect ratios: "square" | "video" | "portrait"
// Grid columns: 2 | 3 | 4
```

---

## BlogCard

Clean, modern blog post cards.

```tsx
import { BlogCard, BlogGrid, BlogListItem } from "@/components/ui/BlogCard";

// Standard blog card
<BlogCard
  title="Design Systems at Scale"
  excerpt="How we built a design system..."
  image="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800"
  author={{ name: "Jane Doe", avatar: "/avatar.jpg", role: "Designer" }}
  date="Mar 15, 2024"
  readTime="6 min read"
  category="Design"
  href="/blog/design-systems"
/>

// Featured (large) blog card
<BlogCard featured ... />

// Grid of posts
<BlogGrid columns={3}>
  <BlogCard ... />
  <BlogCard ... />
</BlogGrid>

// Minimal list-style item
<BlogListItem
  title="Quick Tips for Better Typography"
  category="Design"
  date="Feb 18, 2024"
  readTime="3 min"
  href="/blog/typography-tips"
/>
```

---

## TeamCard

Team member cards with hover effects.

```tsx
import { TeamCard, TeamGrid } from "@/components/ui/TeamCard";

// Default style (grayscale hover effect)
<TeamCard
  name="Sarah Chen"
  role="Creative Director"
  image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"
  social={{
    linkedin: "https://linkedin.com/in/...",
    twitter: "https://twitter.com/...",
    dribbble: "https://dribbble.com/...",
  }}
/>

// Overlay variant (content over image)
<TeamCard
  variant="overlay"
  name="Sarah Chen"
  role="Creative Director"
  image="..."
  bio="Former design lead at Airbnb..."
  social={{ linkedin: "...", twitter: "..." }}
/>

// Minimal variant (circular avatar)
<TeamCard variant="minimal" name="..." role="..." image="..." />

// Team grid
<TeamGrid columns={4}>
  <TeamCard ... />
  <TeamCard ... />
</TeamGrid>

// Variants: "default" | "minimal" | "overlay"
// Grid columns: 2 | 3 | 4
```

---

## Map

Interactive OpenStreetMap with Leaflet. No API key required.

```tsx
import { Map } from "@/components/ui/Map";

// Basic map with marker
<Map
  latitude={52.3676}
  longitude={4.9041}
  zoom={14}
  marker={{
    title: "Our Office",
    popup: "123 Main Street, Amsterdam",
  }}
/>

// Dark theme map
<Map
  latitude={52.3676}
  longitude={4.9041}
  tileStyle="dark"
/>

// Grayscale with hover effect (elegant look)
<Map
  latitude={52.3676}
  longitude={4.9041}
  grayscale
  height={400}
/>

// Props:
// latitude, longitude: number (required)
// zoom: 1-18 (default: 14)
// height: number | string (default: 400)
// marker: { title?: string, popup?: string }
// tileStyle: "default" | "dark" | "light" | "watercolor"
// grayscale: boolean (elegant grayscale filter)
// scrollWheelZoom: boolean (default: false)
```

---

## CookieBanner

GDPR-compliant cookie consent banner. Auto-included in demo layout.

```tsx
import { CookieBanner, useCookieConsent } from "@/components/ui/CookieBanner";

// Basic usage (already in demo layout)
<CookieBanner
  privacyUrl="/privacy"
  onAccept={() => console.log("Accepted")}
  onReject={() => console.log("Rejected")}
/>

// Different positions
<CookieBanner position="bottom-left" />
<CookieBanner position="bottom-right" />

// Check consent status
function MyComponent() {
  const { hasConsent, consentStatus } = useCookieConsent();

  if (hasConsent) {
    // Load analytics, tracking, etc.
  }

  return <div>...</div>;
}

// Props:
// privacyUrl: string (link to privacy policy)
// position: "bottom" | "bottom-left" | "bottom-right"
// message: string (custom consent message)
// showCustomize: boolean (show customize button)
```

---

## Map

Interactive OpenStreetMap - no API key needed, free forever.

```tsx
import { Map } from "@/components/ui/Map";

// Basic map
<Map
  latitude={52.3676}
  longitude={4.9041}
  zoom={13}
  height={400}
/>

// With marker
<Map
  latitude={37.7749}
  longitude={-122.4194}
  zoom={14}
  marker={{
    title: "Our Office",
    popup: "123 Main Street, San Francisco"
  }}
/>

// Different styles
<Map tileStyle="light" />   // Clean light style
<Map tileStyle="dark" />    // Dark mode style
<Map tileStyle="watercolor" /> // Artistic watercolor

// Grayscale filter
<Map grayscale />

// Props:
// latitude: number (required)
// longitude: number (required)
// zoom: number (default: 13)
// height: number | string (default: 400)
// tileStyle: "default" | "light" | "dark" | "watercolor"
// grayscale: boolean (apply grayscale filter)
// marker: { title?: string, popup?: string }
```

---

## Testimonials

Display customer reviews and testimonials in various layouts.

```tsx
import { TestimonialCard, TestimonialGrid, TestimonialCarousel } from "@/components/ui/TestimonialCard";

// Single testimonial card
<TestimonialCard
  quote="Amazing work! They delivered beyond expectations."
  author="Sarah Johnson"
  role="CEO"
  company="TechCorp"
  avatar="https://images.unsplash.com/..."
  rating={5}
/>

// Variants
<TestimonialCard variant="default" ... />   // White card with border
<TestimonialCard variant="minimal" ... />   // No background
<TestimonialCard variant="featured" ... />  // Dark card (inverted)

// Grid of testimonials
const testimonials = [
  { quote: "...", author: "...", role: "...", company: "...", avatar: "...", rating: 5 },
  { quote: "...", author: "...", role: "...", company: "...", avatar: "...", rating: 5 },
  { quote: "...", author: "...", role: "...", company: "...", avatar: "...", rating: 5 },
];

<TestimonialGrid
  testimonials={testimonials}
  columns={3}  // 1, 2, or 3
/>

// Animated carousel with auto-play
<TestimonialCarousel
  testimonials={testimonials}
  autoPlay={true}
  interval={5000}
/>

// Props:
// rating: 1 | 2 | 3 | 4 | 5 (shows star rating)
// variant: "default" | "minimal" | "featured"
// columns: 1 | 2 | 3 (for grid)
// autoPlay: boolean (for carousel)
// interval: number (ms, for carousel)
```

---

## FeatureGrid

Display features, benefits, or services in a clean icon grid. Perfect for SaaS.

```tsx
import { FeatureGrid, FeatureIcons } from "@/components/ui/FeatureGrid";

<FeatureGrid
  features={[
    {
      icon: <FeatureIcons.Zap />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance",
    },
    {
      icon: <FeatureIcons.Shield />,
      title: "Secure",
      description: "Bank-level security for your data",
    },
    {
      icon: <FeatureIcons.Globe />,
      title: "Global CDN",
      description: "Deployed across 50+ regions worldwide",
    },
  ]}
  columns={3}
  variant="cards"
/>

// Available icons: Zap, Shield, Globe, Clock, Users, Chart, Code, Heart, Star, Check, Lock, Sparkles
// Variants: "default" | "cards" | "minimal" | "centered"
// Columns: 2 | 3 | 4
```

---

## LogoCloud & TrustBadges

Display client logos or trust indicators.

```tsx
import { LogoCloud, TrustBadges, TrustIcons } from "@/components/ui/LogoCloud";

// Client logos
<LogoCloud
  title="Trusted by industry leaders"
  logos={[
    { name: "Stripe" },
    { name: "Vercel" },
    { name: "Linear" },
  ]}
  columns={5}
  variant="grayscale"
/>

// Trust badges (e-commerce)
<TrustBadges
  badges={[
    { icon: <TrustIcons.Truck />, label: "Free Shipping" },
    { icon: <TrustIcons.Return />, label: "30-Day Returns" },
    { icon: <TrustIcons.Shield />, label: "Secure Payment" },
    { icon: <TrustIcons.Support />, label: "24/7 Support" },
  ]}
  variant="horizontal"
/>

// Available TrustIcons: Truck, Return, Shield, Support, CreditCard, Gift
```

---

## Timeline & ProcessSteps

Display experience history or step-by-step processes.

```tsx
import { Timeline, ProcessSteps } from "@/components/ui/Timeline";

// Experience timeline
<Timeline
  items={[
    { year: "2024", title: "Senior Designer", company: "TechCorp", current: true },
    { year: "2021", title: "Designer", company: "StartupXYZ" },
    { year: "2018", title: "Junior Designer", company: "Agency" },
  ]}
  variant="default"
/>

// Process steps
<ProcessSteps
  steps={[
    { number: "01", title: "Discovery", description: "We learn about your goals" },
    { number: "02", title: "Design", description: "We create the solution" },
    { number: "03", title: "Develop", description: "We build it" },
    { number: "04", title: "Launch", description: "We ship it" },
  ]}
  variant="cards"
/>

// Timeline variants: "default" | "alternating" | "compact"
// ProcessSteps variants: "horizontal" | "vertical" | "cards"
```

---

## MenuSection (Restaurant)

Restaurant menu with categories and pricing.

```tsx
import { MenuSection, OpeningHours, ReservationCTA } from "@/components/ui/MenuSection";

<MenuSection
  categories={[
    {
      name: "Starters",
      description: "Begin your culinary journey",
      items: [
        { name: "Bruschetta", price: "€8", description: "Tomato, basil, garlic", tag: "Popular" },
        { name: "Soup of the Day", price: "€7", description: "Ask your server" },
      ],
    },
    {
      name: "Main Courses",
      items: [
        { name: "Grilled Salmon", price: "€24", description: "With seasonal vegetables" },
        { name: "Beef Tenderloin", price: "€32", tag: "Popular" },
      ],
    },
  ]}
  variant="elegant"
/>

// Opening hours
<OpeningHours
  hours={[
    { days: "Monday - Friday", hours: "9:00 - 22:00" },
    { days: "Saturday", hours: "10:00 - 23:00" },
    { days: "Sunday", hours: "Closed", closed: true },
  ]}
  variant="card"
/>

// Reservation CTA
<ReservationCTA
  phone="+31 20 123 4567"
  bookingUrl="https://booking.example.com"
/>

// MenuSection variants: "default" | "cards" | "elegant" | "grid"
// Item tags: "Popular" | "New" | "Spicy" | "Vegetarian"
```

---

## ProductCard (E-commerce)

Product cards and grids for online stores.

```tsx
import { ProductCard, ProductGrid, CollectionCard } from "@/components/ui/ProductCard";

// Single product
<ProductCard
  name="Classic T-Shirt"
  price={45}
  originalPrice={60}  // Shows discount
  image="/product.jpg"
  category="Apparel"
  badge="Sale"
  rating={4.5}
  reviews={128}
  href="/products/classic-tshirt"
  onAddToCart={() => addToCart()}
/>

// Product grid
<ProductGrid columns={4}>
  <ProductCard ... />
  <ProductCard ... />
</ProductGrid>

// Collection card
<CollectionCard
  name="New Arrivals"
  description="Fresh styles for the season"
  image="/collection.jpg"
  itemCount={24}
  href="/collections/new"
  variant="overlay"
/>

// Badge options: "New" | "Sale" | "Bestseller"
// CollectionCard variants: "default" | "overlay" | "side"
```

---

## NewsletterSignup

Email capture form for building mailing lists.

```tsx
import { NewsletterSignup, AvailabilityBadge } from "@/components/ui/NewsletterSignup";

<NewsletterSignup
  title="Join our newsletter"
  description="Get 10% off your first order"
  buttonText="Subscribe"
  variant="card"
  onSubmit={(email) => subscribeUser(email)}
/>

// Variants: "default" | "minimal" | "card" | "banner" | "inline"

// Availability badge (for freelancers)
<AvailabilityBadge available={true} />
<AvailabilityBadge available={false} text="Booked until March" />
```
