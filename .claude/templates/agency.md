# Agency Template

Complete content for a creative agency, digital agency, or marketing agency website.

---

## Company Info
```
Name: [AGENCY_NAME]
Type: [CREATIVE/DIGITAL/MARKETING] Agency
Location: [CITY]
Founded: [YEAR]
```

---

## Homepage Content

### Hero
```
Badge: "Award-winning [TYPE] agency"
Headline: "We craft brands that make an impact"
Subline: "We're a team of strategists, designers, and developers who help ambitious brands stand out in a crowded world. From strategy to execution, we're with you every step of the way."
CTA Primary: "Start a project"
CTA Secondary: "View our work"
```

### Stats
```tsx
const stats = [
  { value: 150, suffix: "+", label: "Projects delivered" },
  { value: 12, suffix: "", label: "Years experience" },
  { value: 40, suffix: "+", label: "Team members" },
  { value: 15, suffix: "", label: "Industry awards" },
];
```

### Services
```tsx
const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description: "We dig deep to understand your business, audience, and competition. Then we craft a strategic foundation that guides every decision.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    number: "02",
    title: "Creative Design",
    description: "From visual identity to campaign creative, we design experiences that capture attention and communicate your unique value.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    number: "03",
    title: "Digital Development",
    description: "We build fast, scalable digital products that look beautiful and perform flawlessly across every device and platform.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
];
```

### Testimonials
```tsx
const testimonials = [
  {
    quote: "They completely transformed our brand. The strategic thinking combined with beautiful execution exceeded all our expectations.",
    author: "Jennifer Walsh",
    role: "CMO",
    company: "TechVentures",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "Working with this team felt like having an extension of our own. They truly understood our vision and brought it to life brilliantly.",
    author: "David Park",
    role: "Founder",
    company: "Innovate Labs",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "Professional, creative, and incredibly responsive. The results speak for themselves — our conversions are up 200% since launch.",
    author: "Amanda Foster",
    role: "Head of Marketing",
    company: "GrowthCo",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5 as const,
  },
];
```

### Client Logos
```tsx
const clients = [
  "TechCorp",
  "Innovate Inc",
  "StartupXYZ",
  "BrandCo",
  "DigitalFirst",
  "GrowthLabs",
];
```

---

## Photo URLs

```
Hero: https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85
Team: https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85
Office: https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80
Meeting: https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80
Creative: https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80
Project: https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80
Workshop: https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80
Brainstorm: https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80
```

---

## About Page

### Story
```
Headline: "Building brands since [YEAR]"
Story: "We started [AGENCY_NAME] with a simple belief: great brands are built on truth. In a world of noise, authenticity cuts through.

Over the past [X] years, we've helped [NUMBER]+ brands find their voice, tell their story, and connect with the people who matter most. From scrappy startups to Fortune 500 companies, we bring the same passion and rigor to every project.

Today, our team of [NUMBER] strategists, designers, and developers works with brands across [INDUSTRIES/REGIONS]. We're proud to be independently owned and endlessly curious."
```

### Values
```tsx
const values = [
  {
    title: "Strategic Thinking",
    description: "Every pixel has a purpose. We start with strategy and let it guide every creative decision.",
  },
  {
    title: "Collaborative Spirit",
    description: "Your brand is a partnership. We work alongside you, not in a silo.",
  },
  {
    title: "Craft & Quality",
    description: "We sweat the details because we know they matter. Excellence is non-negotiable.",
  },
  {
    title: "Results-Driven",
    description: "Beautiful work that doesn't perform isn't enough. We measure success by your success.",
  },
];
```

---

## Services Page

```tsx
const serviceDetails = [
  {
    title: "Brand Strategy",
    description: "The foundation of everything we do. We help you understand who you are, who you're for, and how to win.",
    features: [
      "Brand positioning & messaging",
      "Audience research & personas",
      "Competitive analysis",
      "Brand architecture",
      "Naming & verbal identity",
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  },
  {
    title: "Visual Identity",
    description: "Your brand made visible. We create distinctive visual systems that work everywhere.",
    features: [
      "Logo & mark design",
      "Color & typography systems",
      "Visual language & style",
      "Brand guidelines",
      "Asset library",
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
  },
  {
    title: "Digital Design",
    description: "Websites and apps that look stunning and perform flawlessly.",
    features: [
      "UX strategy & research",
      "UI design & prototyping",
      "Design systems",
      "Mobile & responsive design",
      "Motion & interaction design",
    ],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80",
  },
  {
    title: "Development",
    description: "Code that's as clean as our designs. Built for performance and scale.",
    features: [
      "Frontend development",
      "CMS integration",
      "E-commerce solutions",
      "Performance optimization",
      "Ongoing maintenance",
    ],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
  },
  {
    title: "Campaign & Content",
    description: "Creative campaigns that capture attention and drive action.",
    features: [
      "Campaign strategy",
      "Content creation",
      "Social media assets",
      "Video & motion",
      "Photography direction",
    ],
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80",
  },
];
```

---

## Portfolio Page

```tsx
const projects = [
  {
    title: "TechVentures Rebrand",
    category: "Brand Strategy + Identity",
    description: "Complete brand transformation for a leading venture capital firm",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    tags: ["Strategy", "Identity", "Digital"],
    year: "2024",
    stats: [
      { label: "Brand Recognition", value: "+340%" },
      { label: "Website Traffic", value: "+180%" },
    ],
  },
  {
    title: "Bloom E-commerce",
    category: "Digital Design + Development",
    description: "A fresh digital experience for an organic beauty brand",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80",
    tags: ["E-commerce", "UX/UI", "Development"],
    year: "2024",
    stats: [
      { label: "Conversion Rate", value: "+85%" },
      { label: "Revenue", value: "2.4x" },
    ],
  },
  {
    title: "HealthFirst App",
    category: "Product Design",
    description: "Redesigning healthcare for the digital age",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    tags: ["Mobile", "UX Research", "UI Design"],
    year: "2023",
    stats: [
      { label: "User Satisfaction", value: "94%" },
      { label: "Daily Active Users", value: "+250%" },
    ],
  },
];
```

---

## Team Page

```tsx
const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & Creative Director",
    bio: "15+ years crafting brands that matter. Previously at Pentagram and IDEO.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "James Chen",
    role: "Head of Strategy",
    bio: "Brand strategist with a background in behavioral psychology and business consulting.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    name: "Emma Rodriguez",
    role: "Design Director",
    bio: "Award-winning designer passionate about creating meaningful digital experiences.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    social: { linkedin: "#", dribbble: "#" },
  },
  {
    name: "Marcus Johnson",
    role: "Tech Lead",
    bio: "Full-stack developer who believes in clean code and pixel-perfect implementation.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    social: { linkedin: "#", github: "#" },
  },
];
```

---

## Contact Page FAQs

```tsx
const faqs = [
  {
    question: "How much does a typical project cost?",
    answer: "Projects vary widely based on scope. Brand identity projects typically start at €15,000, while website projects range from €20,000-€75,000. We're happy to provide a detailed estimate after understanding your needs.",
  },
  {
    question: "How long does a project take?",
    answer: "Brand identity projects typically take 8-12 weeks. Website projects range from 10-16 weeks depending on complexity. We'll provide a detailed timeline in our proposal.",
  },
  {
    question: "Do you work with startups?",
    answer: "Absolutely! We love working with ambitious startups. We offer flexible engagement models to fit different budgets and stages.",
  },
  {
    question: "What's your process like?",
    answer: "We follow a proven 4-phase process: Discovery (research & strategy), Define (concepts & direction), Design (execution & refinement), and Deliver (launch & support).",
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes! Many clients choose our retainer packages for ongoing design, development, and marketing support after the initial project.",
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
  { label: "Team", href: "/demo/team" },
  { label: "Blog", href: "/demo/blog" },
  { label: "Contact", href: "/demo/contact" },
];
```
