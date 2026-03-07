# Component Reference

Usage examples for all UI components.

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
