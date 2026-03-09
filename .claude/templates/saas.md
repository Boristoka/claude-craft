# SaaS Template

Complete content for a SaaS/Software product landing page.

---

## Company Info
```
Name: [PRODUCT_NAME]
Tagline: [ONE_LINE_VALUE_PROP]
```

---

## Homepage Content

### Hero
```
Badge: "Trusted by 10,000+ teams"
Headline: "The smarter way to [MAIN_BENEFIT]"
Subline: "Stop wasting time on [PAIN_POINT]. [PRODUCT_NAME] helps teams [KEY_BENEFIT] — so you can focus on what matters."
CTA Primary: "Start free trial"
CTA Secondary: "Watch demo"
```

### Stats
```tsx
const stats = [
  { value: 10000, suffix: "+", label: "Active users" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
  { value: 4.9, suffix: "/5", label: "Customer rating" },
  { value: 24, suffix: "/7", label: "Support" },
];
```

### Features/Services
```tsx
const services = [
  {
    number: "01",
    title: "Powerful Dashboard",
    description: "Get a real-time overview of everything that matters. Custom widgets, smart filters, and instant insights at your fingertips.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    number: "02",
    title: "Team Collaboration",
    description: "Work together seamlessly. Share projects, assign tasks, and keep everyone aligned with built-in collaboration tools.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
  {
    number: "03",
    title: "Smart Automation",
    description: "Automate repetitive tasks and workflows. Set triggers, create rules, and let the software do the heavy lifting.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
  },
];
```

### Testimonials
```tsx
const testimonials = [
  {
    quote: "We cut our project delivery time by 40% in the first month. This tool has completely transformed how our team works.",
    author: "Sarah Chen",
    role: "Head of Operations",
    company: "TechFlow Inc",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "Finally, a tool that actually delivers on its promises. The automation features alone saved us 20 hours per week.",
    author: "Marcus Johnson",
    role: "CTO",
    company: "ScaleUp Labs",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "The onboarding was seamless and support is incredibly responsive. Best investment we've made this year.",
    author: "Emma Williams",
    role: "Product Manager",
    company: "InnovateCo",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5 as const,
  },
];
```

---

## Photo URLs

```
Hero: https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=85
Dashboard: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80
Team: https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80
Office: https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85
Meeting: https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80
Code: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80
Analytics: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80
```

---

## About Page

### Story
```
Headline: "Building the future of [INDUSTRY]"
Story: "We started [PRODUCT_NAME] in [YEAR] with a simple belief: [CORE_BELIEF]. After years of experiencing [PAIN_POINT] firsthand, we knew there had to be a better way.

Today, [PRODUCT_NAME] powers [NUMBER]+ teams worldwide, from ambitious startups to Fortune 500 companies. But our mission remains the same: make [BENEFIT] accessible to everyone."
```

### Values
```tsx
const values = [
  {
    title: "Customer Obsession",
    description: "Every feature, every decision, every line of code starts with our customers' needs.",
  },
  {
    title: "Radical Simplicity",
    description: "We believe powerful doesn't have to mean complicated. Simple solutions that just work.",
  },
  {
    title: "Continuous Innovation",
    description: "We ship weekly improvements because standing still means falling behind.",
  },
  {
    title: "Transparency First",
    description: "Open pricing, clear communication, and honest relationships with our users.",
  },
];
```

---

## Pricing Page

```tsx
const pricingPlans = [
  {
    name: "Starter",
    description: "For individuals and small teams getting started",
    price: { monthly: 19, yearly: 15 },
    features: [
      "Up to 5 team members",
      "10 projects",
      "Basic analytics",
      "Email support",
      "1GB storage",
    ],
  },
  {
    name: "Professional",
    description: "For growing teams that need more power",
    price: { monthly: 49, yearly: 39 },
    popular: true,
    features: [
      "Up to 20 team members",
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Custom integrations",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: { monthly: 99, yearly: 79 },
    features: [
      "Unlimited team members",
      "Unlimited everything",
      "Custom analytics",
      "24/7 phone support",
      "Unlimited storage",
      "SSO & SAML",
      "Dedicated account manager",
      "Custom contracts",
    ],
  },
];
```

---

## Contact Page FAQs

```tsx
const faqs = [
  {
    question: "Is there a free trial?",
    answer: "Yes! Start with a 14-day free trial of our Professional plan. No credit card required.",
  },
  {
    question: "Can I change plans later?",
    answer: "Absolutely. Upgrade or downgrade anytime. Changes take effect on your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and wire transfer for Enterprise plans.",
  },
  {
    question: "Is my data secure?",
    answer: "Security is our top priority. We use bank-level encryption, are SOC 2 compliant, and your data is backed up daily.",
  },
  {
    question: "Do you offer discounts for nonprofits?",
    answer: "Yes! Nonprofits and educational institutions get 50% off. Contact us to learn more.",
  },
];
```

---

## Navigation

```tsx
const demoNavItems = [
  { label: "Home", href: "/demo" },
  { label: "Features", href: "/demo/services" },
  { label: "Pricing", href: "/demo/pricing" },
  { label: "About", href: "/demo/about" },
  { label: "Blog", href: "/demo/blog" },
  { label: "Contact", href: "/demo/contact" },
];
```
