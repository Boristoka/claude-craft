# Restaurant Template

Complete content for a restaurant, café, bakery, or food business website.

---

## Company Info
```
Name: [RESTAURANT_NAME]
Cuisine: [CUISINE_TYPE]
Location: [CITY]
```

---

## Homepage Content

### Hero
```
Badge: "Est. [YEAR]" or "Award-winning cuisine"
Headline: "Where every dish tells a story"
Subline: "Experience authentic [CUISINE_TYPE] cuisine in the heart of [CITY]. Fresh ingredients, timeless recipes, unforgettable moments."
CTA Primary: "Reserve a table"
CTA Secondary: "View menu"
```

### Stats
```tsx
const stats = [
  { value: 25, suffix: "+", label: "Years of passion" },
  { value: 50000, suffix: "+", label: "Happy guests" },
  { value: 4.8, suffix: "/5", label: "Google rating" },
  { value: 100, suffix: "%", label: "Fresh ingredients" },
];
```

### Services (Menu Highlights)
```tsx
const services = [
  {
    number: "01",
    title: "Seasonal Menu",
    description: "Our menu changes with the seasons, showcasing the finest local ingredients at their peak. Each dish is crafted with care and creativity.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    number: "02",
    title: "Wine Selection",
    description: "An expertly curated wine list featuring over 100 labels from renowned vineyards. Our sommelier is happy to guide your selection.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
  },
  {
    number: "03",
    title: "Private Dining",
    description: "Host your special occasion in our intimate private dining room. Perfect for business dinners, celebrations, and memorable gatherings.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
];
```

### Testimonials
```tsx
const testimonials = [
  {
    quote: "An unforgettable dining experience. The flavors, the ambiance, the service — everything was absolutely perfect.",
    author: "Emma van der Berg",
    role: "Food Critic",
    company: "Culinair Magazine",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "We celebrate every special occasion here. The staff makes you feel like family, and the food is consistently outstanding.",
    author: "Thomas Bakker",
    role: "Regular Guest",
    company: "",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "Best Italian cuisine outside of Italy. The pasta is made fresh daily, and you can taste the difference.",
    author: "Sophie de Vries",
    role: "Local Food Blogger",
    company: "@sophieeats",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5 as const,
  },
];
```

---

## Photo URLs

```
Hero: https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85
Interior: https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85
Kitchen: https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80
Dish 1: https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80
Dish 2: https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80
Dish 3: https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80
Wine: https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80
Chef: https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80
Terrace: https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80
Bakery: https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80
Coffee: https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80
```

---

## About Page

### Story
```
Headline: "A passion for authentic flavors"
Story: "Our story began in [YEAR] when [FOUNDER_NAME] opened the doors with a simple dream: to share the authentic flavors of [CUISINE/REGION] with [CITY].

What started as a small family kitchen has grown into a beloved neighborhood institution. Three generations later, we still make everything from scratch, using recipes passed down through the family and ingredients sourced from local farmers and trusted suppliers.

Every dish that leaves our kitchen carries the love and dedication that has defined us for over [X] years."
```

### Values
```tsx
const values = [
  {
    title: "Fresh & Local",
    description: "We source ingredients from local farms and markets daily. No freezers, no shortcuts.",
  },
  {
    title: "Traditional Recipes",
    description: "Family recipes perfected over generations, prepared with respect for tradition.",
  },
  {
    title: "Warm Hospitality",
    description: "Every guest is treated like family. Your comfort and enjoyment are our priority.",
  },
  {
    title: "Sustainable Practices",
    description: "We minimize waste, support local producers, and care for our community.",
  },
];
```

---

## Services Page (Menu Categories)

```tsx
const menuCategories = [
  {
    title: "Starters",
    description: "Begin your culinary journey with our carefully crafted appetizers",
    items: [
      { name: "Burrata Caprese", price: "€14", description: "Fresh burrata, heirloom tomatoes, basil, aged balsamic" },
      { name: "Tuna Tartare", price: "€16", description: "Sashimi-grade tuna, avocado, sesame, crispy wonton" },
      { name: "Soup of the Day", price: "€9", description: "Ask your server for today's seasonal creation" },
    ],
  },
  {
    title: "Main Courses",
    description: "Heartfelt dishes made with passion and the finest ingredients",
    items: [
      { name: "Grilled Sea Bass", price: "€28", description: "Mediterranean sea bass, herb butter, seasonal vegetables" },
      { name: "Beef Tenderloin", price: "€34", description: "200g tenderloin, truffle mash, red wine jus" },
      { name: "Wild Mushroom Risotto", price: "€22", description: "Arborio rice, porcini, parmesan, truffle oil" },
    ],
  },
  {
    title: "Desserts",
    description: "End your meal on a sweet note with our homemade desserts",
    items: [
      { name: "Tiramisu", price: "€10", description: "Classic recipe with mascarpone and espresso" },
      { name: "Chocolate Fondant", price: "€12", description: "Warm chocolate cake, vanilla ice cream" },
      { name: "Cheese Selection", price: "€14", description: "Artisanal cheeses, honey, walnuts" },
    ],
  },
];
```

---

## Contact Page FAQs

```tsx
const faqs = [
  {
    question: "Do I need a reservation?",
    answer: "We recommend reservations, especially for weekends. Walk-ins are welcome but subject to availability.",
  },
  {
    question: "What are your opening hours?",
    answer: "Tuesday-Sunday: 12:00-15:00 (lunch) and 18:00-22:30 (dinner). Closed on Mondays.",
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer: "Absolutely! We offer vegetarian, vegan, and gluten-free options. Please inform us when booking.",
  },
  {
    question: "Is there parking available?",
    answer: "Street parking is available nearby. We also have a partnership with the parking garage on [STREET].",
  },
  {
    question: "Can you host private events?",
    answer: "Yes! Our private dining room seats up to 20 guests. Contact us for custom menus and arrangements.",
  },
];
```

---

## Navigation

```tsx
const demoNavItems = [
  { label: "Home", href: "/demo" },
  { label: "Menu", href: "/demo/services" },
  { label: "About", href: "/demo/about" },
  { label: "Gallery", href: "/demo/portfolio" },
  { label: "Reservations", href: "/demo/contact" },
];
```

---

## Special Sections for Restaurant

### Hours & Location Block
```tsx
<div className="grid md:grid-cols-2 gap-8">
  <div>
    <h3>Opening Hours</h3>
    <ul>
      <li>Tuesday - Friday: 12:00 - 15:00 / 18:00 - 22:30</li>
      <li>Saturday - Sunday: 12:00 - 23:00</li>
      <li>Monday: Closed</li>
    </ul>
  </div>
  <div>
    <h3>Location</h3>
    <p>[ADDRESS]</p>
    <p>[CITY], [POSTAL]</p>
    <p>Tel: [PHONE]</p>
  </div>
</div>
```
