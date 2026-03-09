# E-commerce Template

Complete content for a product-based business, online store, or D2C brand website.

---

## Company Info
```
Name: [BRAND_NAME]
Product: [PRODUCT_TYPE] (e.g., "Sustainable fashion", "Artisan coffee", "Skincare")
Location: [CITY/COUNTRY]
Founded: [YEAR]
```

---

## Homepage Content

### Hero
```
Badge: "Free shipping over €50" or "New collection out now"
Headline: "Crafted for those who care"
Subline: "Thoughtfully designed [PRODUCT_TYPE] made with premium materials and sustainable practices. Because you deserve better than fast fashion/mass production."
CTA Primary: "Shop now"
CTA Secondary: "Our story"
```

### Stats
```tsx
const stats = [
  { value: 50000, suffix: "+", label: "Happy customers" },
  { value: 100, suffix: "%", label: "Sustainable materials" },
  { value: 4.9, suffix: "/5", label: "Customer rating" },
  { value: 30, suffix: "-day", label: "Free returns" },
];
```

### Featured Categories/Services
```tsx
const services = [
  {
    number: "01",
    title: "New Arrivals",
    description: "Discover our latest collection. Fresh designs, premium quality, ready to ship.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  },
  {
    number: "02",
    title: "Best Sellers",
    description: "Our most-loved pieces. Customer favorites that keep coming back.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  },
  {
    number: "03",
    title: "Limited Edition",
    description: "Exclusive drops in limited quantities. Once they're gone, they're gone.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
];
```

### Testimonials
```tsx
const testimonials = [
  {
    quote: "Finally, a brand that actually delivers on quality. The attention to detail is incredible, and everything feels so luxurious.",
    author: "Emma Johnson",
    role: "Verified Customer",
    company: "Amsterdam, NL",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "I've replaced half my wardrobe with their pieces. Sustainable, beautiful, and actually lasts. Worth every penny.",
    author: "Michael Chen",
    role: "Verified Customer",
    company: "London, UK",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "The packaging, the product, the whole experience — everything exceeded my expectations. Already planning my next order.",
    author: "Sophie Williams",
    role: "Verified Customer",
    company: "Berlin, DE",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5 as const,
  },
];
```

---

## Photo URLs

### Fashion/Apparel
```
Hero: https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=85
Product 1: https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80
Product 2: https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1200&q=80
Lifestyle: https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80
Detail: https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80
```

### Skincare/Beauty
```
Hero: https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1920&q=85
Product: https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80
Texture: https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80
Lifestyle: https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=80
```

### Home/Lifestyle
```
Hero: https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=85
Product: https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80
Detail: https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80
Lifestyle: https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80
```

### Food/Coffee
```
Hero: https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=85
Product: https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&q=80
Process: https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&q=80
Lifestyle: https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80
```

---

## About Page

### Story
```
Headline: "Why we exist"
Story: "We started [BRAND_NAME] because we were tired of the status quo. Too many brands cutting corners, using cheap materials, and treating customers like transactions.

We believed there was a better way — to create [PRODUCTS] that are built to last, made responsibly, and designed with intention. Every piece we make is the result of obsessive attention to quality and a genuine love for craft.

From our workshop in [LOCATION] to your doorstep, we're committed to making [PRODUCTS] you'll be proud to own for years to come."
```

### Values
```tsx
const values = [
  {
    title: "Quality First",
    description: "Premium materials, expert craftsmanship, and rigorous quality control. We don't cut corners.",
  },
  {
    title: "Sustainable Always",
    description: "From materials to packaging, every choice we make considers our environmental impact.",
  },
  {
    title: "Transparent Pricing",
    description: "No inflated markups. We share exactly what goes into our products and why they cost what they do.",
  },
  {
    title: "Customer Obsessed",
    description: "Your satisfaction drives every decision. Real humans, real support, real care.",
  },
];
```

### Sustainability/Process
```tsx
const process = [
  {
    step: "01",
    title: "Ethical Sourcing",
    description: "We work directly with suppliers who share our values. Every material is traceable and sustainably sourced.",
  },
  {
    step: "02",
    title: "Thoughtful Design",
    description: "Our design process focuses on timeless style and maximum utility. Pieces you'll reach for again and again.",
  },
  {
    step: "03",
    title: "Expert Craftsmanship",
    description: "Made by skilled artisans who take pride in their work. Quality you can see and feel.",
  },
  {
    step: "04",
    title: "Minimal Packaging",
    description: "Plastic-free, recyclable packaging that protects your order without harming the planet.",
  },
];
```

---

## Services Page (Products/Collections)

```tsx
const collections = [
  {
    title: "The Essentials",
    description: "Foundational pieces that form the backbone of any wardrobe. Classic, versatile, timeless.",
    products: [
      { name: "Classic T-Shirt", price: "€45", image: "..." },
      { name: "Essential Hoodie", price: "€95", image: "..." },
      { name: "Perfect Fit Jeans", price: "€120", image: "..." },
    ],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
  },
  {
    title: "New Season",
    description: "Fresh arrivals for the current season. Limited quantities, unique pieces.",
    products: [
      { name: "Linen Shirt", price: "€85", image: "..." },
      { name: "Summer Shorts", price: "€75", image: "..." },
      { name: "Canvas Bag", price: "€65", image: "..." },
    ],
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1200&q=80",
  },
  {
    title: "Accessories",
    description: "The finishing touches that elevate any outfit. Small details, big impact.",
    products: [
      { name: "Leather Belt", price: "€55", image: "..." },
      { name: "Wool Scarf", price: "€45", image: "..." },
      { name: "Weekender Bag", price: "€195", image: "..." },
    ],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
  },
];
```

---

## Pricing Page (Transparency)

```tsx
const costBreakdown = {
  title: "What you're paying for",
  description: "We believe in transparent pricing. Here's exactly where your money goes.",
  items: [
    { label: "Materials", percentage: 35, description: "Premium, sustainable fabrics" },
    { label: "Production", percentage: 25, description: "Fair wages, ethical factories" },
    { label: "Design & Development", percentage: 15, description: "Our in-house team" },
    { label: "Operations", percentage: 15, description: "Warehouse, shipping, team" },
    { label: "Our Margin", percentage: 10, description: "What keeps us running" },
  ],
  comparison: {
    traditional: "5-8x markup",
    ours: "2x markup",
  },
};
```

---

## Contact Page FAQs

```tsx
const faqs = [
  {
    question: "What's your shipping policy?",
    answer: "Free shipping on orders over €50. Standard delivery (3-5 days) is €4.95. Express (1-2 days) is €9.95. We ship to all EU countries.",
  },
  {
    question: "What's your return policy?",
    answer: "30-day returns, no questions asked. If you're not happy, neither are we. Returns are free for your first order.",
  },
  {
    question: "How do I know my size?",
    answer: "Check our detailed size guide on each product page. Still unsure? Our team is happy to help — just send us your measurements.",
  },
  {
    question: "Are your products really sustainable?",
    answer: "Yes! We use organic, recycled, and certified materials. Our factories are audited for fair labor practices. We're B-Corp certified and carbon neutral.",
  },
  {
    question: "How do I care for my products?",
    answer: "Each product comes with specific care instructions. Generally: wash cold, hang dry, and your pieces will last for years.",
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes! Digital gift cards are available from €25-€200. They never expire and can be used on any product.",
  },
];
```

---

## Navigation

```tsx
const demoNavItems = [
  { label: "Shop", href: "/demo/services" },
  { label: "Collections", href: "/demo/portfolio" },
  { label: "Our Story", href: "/demo/about" },
  { label: "Journal", href: "/demo/blog" },
  { label: "Contact", href: "/demo/contact" },
];
```

---

## Special E-commerce Elements

### Trust Badges
```tsx
const trustBadges = [
  { icon: "🚚", label: "Free Shipping 50+" },
  { icon: "↩️", label: "30-Day Returns" },
  { icon: "🔒", label: "Secure Payment" },
  { icon: "💬", label: "24/7 Support" },
];
```

### Newsletter Signup
```
Headline: "Join the family"
Description: "Subscribe for 10% off your first order, plus early access to new releases and exclusive offers."
CTA: "Subscribe"
```

### Instagram Feed Section
```
Headline: "Follow @[BRAND]"
Description: "Tag us in your photos for a chance to be featured"
```
