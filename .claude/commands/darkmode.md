# Enable Dark Mode

This command enables dark mode for the website.

## How to Apply Dark Mode

### Option 1: Manual Toggle (Recommended)
Add the `dark` class to the `<html>` element in `app/layout.tsx`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${fonts} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

### Option 2: Auto Dark Mode (System Preference)
Use `dark-auto` class to follow system preference:

```tsx
<html lang="en" className="dark-auto">
```

### Option 3: Toggle Component
Create a theme toggle for users to switch:

```tsx
// components/ui/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference on mount
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(saved === "dark" || (!saved && prefersDark));
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
```

## Dark Mode Color Changes

The dark mode automatically adjusts:

| Light Mode | Dark Mode |
|------------|-----------|
| `bg-white` | Dark background |
| `bg-neutral-50` | Darker surface |
| `text-neutral-900` | Light text |
| `text-neutral-600` | Lighter muted text |
| `border-neutral-200` | Darker borders |

## Using Dark-Aware Classes

For elements that need different styling:

```tsx
// Background
<div className="bg-white dark:bg-neutral-900">

// Text
<h1 className="text-neutral-900 dark:text-white">

// Borders
<div className="border-neutral-200 dark:border-neutral-700">

// Cards
<div className="bg-neutral-50 dark:bg-neutral-800">
```

## Full Implementation Steps

1. Add `dark` or `dark-auto` class to `<html>` in layout.tsx
2. (Optional) Add ThemeToggle component to navbar
3. Components will automatically adapt using CSS variables
4. For custom sections, add `dark:` variants as needed
