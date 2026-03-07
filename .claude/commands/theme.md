# Theme Presets

Apply a pre-made color theme to your website.

## Available Themes

| Theme | Primary | Accent | Vibe |
|-------|---------|--------|------|
| **default** | Indigo | Rose | Professional, trustworthy |
| **ocean** | Cyan | Teal | Fresh, modern, tech |
| **forest** | Green | Gold | Natural, eco-friendly |
| **sunset** | Coral | Orange | Warm, friendly, creative |
| **minimal** | Grayscale | Gray | Clean, editorial, luxury |
| **royal** | Purple | Pink | Bold, creative, premium |

## How to Apply a Theme

Add the theme class to `<html>` in `app/layout.tsx`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="theme-ocean">
      <body className={`${fonts} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

## Theme + Dark Mode

Combine theme with dark mode:

```tsx
<html lang="en" className="theme-ocean dark">
```

Or with auto dark mode:

```tsx
<html lang="en" className="theme-forest dark-auto">
```

## Theme Previews

### Default (Indigo + Rose)
- Primary buttons: Deep indigo
- Accents: Soft rose/coral
- Best for: Business, SaaS, professional services

### Ocean (Cyan + Teal)
```tsx
<html lang="en" className="theme-ocean">
```
- Primary buttons: Bright cyan
- Accents: Teal green
- Best for: Tech startups, apps, modern brands

### Forest (Green + Gold)
```tsx
<html lang="en" className="theme-forest">
```
- Primary buttons: Natural green
- Accents: Warm gold
- Best for: Eco brands, wellness, organic products

### Sunset (Coral + Orange)
```tsx
<html lang="en" className="theme-sunset">
```
- Primary buttons: Warm coral
- Accents: Vibrant orange
- Best for: Creative agencies, food, hospitality

### Minimal (Grayscale)
```tsx
<html lang="en" className="theme-minimal">
```
- Primary buttons: Pure black
- Accents: Medium gray
- Best for: Luxury brands, editorial, photography

### Royal (Purple + Pink)
```tsx
<html lang="en" className="theme-royal">
```
- Primary buttons: Rich purple
- Accents: Vibrant pink
- Best for: Creative studios, beauty, entertainment

## Custom Theme

Create your own by adding to `globals.css`:

```css
.theme-custom {
  --color-primary-500: 210 100% 50%;  /* Your primary HSL */
  --color-primary-600: 212 100% 45%;
  --color-primary-700: 214 100% 40%;
  --color-accent-500: 45 100% 50%;    /* Your accent HSL */
  --color-accent-600: 43 100% 45%;
}
```

Then apply:
```tsx
<html lang="en" className="theme-custom">
```

## Finding HSL Colors

1. Pick a color from any color picker
2. Convert to HSL format
3. Remove "hsl()" and commas: `210 100% 50%`
4. Create 500 (base), 600 (darker), 700 (darkest) variants
