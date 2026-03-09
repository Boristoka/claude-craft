# Portfolio Template

Complete content for a personal portfolio, freelancer, or creative professional website.

---

## Personal Info
```
Name: [FULL_NAME]
Title: [PROFESSION] (e.g., "Product Designer", "Full-Stack Developer", "Brand Strategist")
Location: [CITY]
Tagline: [PERSONAL_TAGLINE]
```

---

## Homepage Content

### Hero
```
Badge: "Available for projects" or "Freelance [TITLE]"
Headline: "I design experiences that people love"
Subline: "Hi, I'm [FIRST_NAME]. A [PROFESSION] based in [CITY], helping brands create meaningful digital experiences that connect with their audience."
CTA Primary: "View my work"
CTA Secondary: "Get in touch"
```

### Stats
```tsx
const stats = [
  { value: 8, suffix: "+", label: "Years experience" },
  { value: 50, suffix: "+", label: "Projects completed" },
  { value: 15, suffix: "+", label: "Happy clients" },
  { value: 3, suffix: "", label: "Awards won" },
];
```

### Services
```tsx
const services = [
  {
    number: "01",
    title: "Brand Identity",
    description: "From logo design to complete visual systems. I help brands find their unique voice and visual language that resonates with their audience.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    number: "02",
    title: "Web Design",
    description: "Beautiful, conversion-focused websites that tell your story. I design experiences that engage visitors and drive results.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
  {
    number: "03",
    title: "Product Design",
    description: "User-centered design for digital products. From concept to launch, I create intuitive interfaces that users love.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
  },
];
```

### Testimonials
```tsx
const testimonials = [
  {
    quote: "Working with [NAME] was an absolute pleasure. They understood our vision immediately and delivered beyond our expectations.",
    author: "Lisa Anderson",
    role: "Founder",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "The attention to detail and creative solutions were outstanding. Our new brand identity has transformed how customers perceive us.",
    author: "Michael Torres",
    role: "Marketing Director",
    company: "TechBrand Co",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "Professional, creative, and incredibly easy to work with. Highly recommended for anyone looking for top-quality design work.",
    author: "Sarah Kim",
    role: "CEO",
    company: "DesignFirst",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5 as const,
  },
];
```

---

## Photo URLs

```
Hero/Portrait: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80
Workspace: https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=85
Project 1: https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80
Project 2: https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80
Project 3: https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80
Project 4: https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80
Creative: https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80
```

---

## About Page

### Bio
```
Headline: "A bit about me"
Story: "I'm [FULL_NAME], a [PROFESSION] with [X] years of experience creating [SPECIALTY].

My journey started [BACKGROUND_STORY]. Since then, I've had the pleasure of working with [TYPE_OF_CLIENTS] — from ambitious startups to established brands.

When I'm not designing, you'll find me [HOBBY_1], [HOBBY_2], or [HOBBY_3]. I believe that diverse experiences fuel creativity and bring fresh perspectives to every project.

I'm currently [AVAILABILITY_STATUS] — let's create something amazing together."
```

### Skills
```tsx
const skills = [
  { category: "Design", items: ["Figma", "Adobe Creative Suite", "Sketch", "Framer"] },
  { category: "Development", items: ["HTML/CSS", "JavaScript", "React", "Webflow"] },
  { category: "Strategy", items: ["User Research", "Brand Strategy", "Design Systems", "Prototyping"] },
];
```

### Experience
```tsx
const experience = [
  {
    period: "2021 - Present",
    role: "Freelance Designer",
    company: "Independent",
    description: "Working with startups and agencies worldwide on brand and digital projects.",
  },
  {
    period: "2018 - 2021",
    role: "Senior Designer",
    company: "Creative Agency",
    description: "Led design for major brand campaigns and digital products.",
  },
  {
    period: "2015 - 2018",
    role: "Junior Designer",
    company: "Design Studio",
    description: "Started my career creating visual identities and web designs.",
  },
];
```

---

## Portfolio Page (Projects)

```tsx
const projects = [
  {
    title: "Meridian Brand Identity",
    category: "Branding",
    description: "Complete visual identity system for a sustainable fashion brand",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    tags: ["Identity", "Print", "Digital"],
    year: "2024",
  },
  {
    title: "FinTech Dashboard",
    category: "Product Design",
    description: "Intuitive dashboard design for a financial analytics platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    tags: ["UI/UX", "Dashboard", "SaaS"],
    year: "2024",
  },
  {
    title: "Organic Café Website",
    category: "Web Design",
    description: "E-commerce website for an organic café and bakery",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    tags: ["Web", "E-commerce", "Branding"],
    year: "2023",
  },
  {
    title: "Health App Redesign",
    category: "Product Design",
    description: "Mobile app redesign focused on improving user engagement",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80",
    tags: ["Mobile", "UI/UX", "Health"],
    year: "2023",
  },
];
```

---

## Services/Process Page

```tsx
const process = [
  {
    step: "01",
    title: "Discovery",
    description: "We start with a deep dive into your goals, audience, and competitors. I'll ask lots of questions to understand what success looks like for you.",
    duration: "1-2 weeks",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Based on our findings, I'll develop a strategic direction that aligns with your goals and resonates with your audience.",
    duration: "1 week",
  },
  {
    step: "03",
    title: "Design",
    description: "This is where ideas come to life. You'll see concepts, iterations, and refinements until we land on something perfect.",
    duration: "2-4 weeks",
  },
  {
    step: "04",
    title: "Delivery",
    description: "Final files, guidelines, and everything you need to implement and maintain your new design system.",
    duration: "1 week",
  },
];
```

---

## Pricing Page

```tsx
const packages = [
  {
    name: "Brand Sprint",
    description: "Perfect for startups and small projects",
    price: "€2,500",
    includes: [
      "Logo design (3 concepts)",
      "Color palette",
      "Typography selection",
      "Basic brand guidelines",
      "Social media templates",
    ],
    timeline: "2 weeks",
  },
  {
    name: "Full Identity",
    description: "Complete brand identity package",
    price: "€5,000",
    popular: true,
    includes: [
      "Everything in Brand Sprint",
      "Extended logo system",
      "Comprehensive guidelines",
      "Business card design",
      "Email signature",
      "Presentation template",
      "2 revision rounds",
    ],
    timeline: "4 weeks",
  },
  {
    name: "Brand + Web",
    description: "Identity plus a stunning website",
    price: "€8,000+",
    includes: [
      "Everything in Full Identity",
      "5-page website design",
      "Mobile responsive",
      "Basic animations",
      "CMS setup (Webflow)",
      "SEO optimization",
    ],
    timeline: "6-8 weeks",
  },
];
```

---

## Contact Page FAQs

```tsx
const faqs = [
  {
    question: "What's your typical process?",
    answer: "Every project starts with a discovery call to understand your needs. From there, I'll send a proposal with timeline and pricing. Once approved, we kick off with a strategy phase before moving into design.",
  },
  {
    question: "How much do you charge?",
    answer: "Pricing depends on scope and complexity. Brand identity projects typically start at €2,500, websites from €4,000. I'm happy to provide a custom quote after our initial call.",
  },
  {
    question: "What's your availability?",
    answer: "I typically book 4-6 weeks in advance. For urgent projects, reach out and I'll see what I can do.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely! I've worked with clients across Europe, the US, and Asia. Remote collaboration works seamlessly with the right tools.",
  },
  {
    question: "What do you need from me to get started?",
    answer: "Just a clear idea of what you're looking for and some inspiration. I'll guide you through everything else during our discovery phase.",
  },
];
```

---

## Navigation

```tsx
const demoNavItems = [
  { label: "Home", href: "/demo" },
  { label: "Work", href: "/demo/portfolio" },
  { label: "Services", href: "/demo/services" },
  { label: "About", href: "/demo/about" },
  { label: "Contact", href: "/demo/contact" },
];
```
