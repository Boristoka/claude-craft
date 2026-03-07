# Form Validation

This kit includes form validation using Zod + React Hook Form.

## Quick Start

```tsx
import { ContactForm } from "@/components/ui/ValidatedForm";

// Use the pre-built contact form
<ContactForm onSubmit={async (data) => {
  // Send to your API
  await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}} />
```

## Available Components

### Pre-built Forms
- `ContactForm` - Full contact form with name, email, phone, subject, message
- `NewsletterForm` - Simple email subscription form

### Form Elements
- `FormInput` - Text input with label and error state
- `FormTextarea` - Textarea with label and error state
- `FormSelect` - Select dropdown with label and error state

## Building Custom Forms

### 1. Define Your Schema

```tsx
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
```

### 2. Create Your Form

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/ValidatedForm";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
        {...register("email")}
        error={errors.email?.message}
      />

      <FormInput
        label="Password"
        type="password"
        placeholder="••••••••"
        required
        {...register("password")}
        error={errors.password?.message}
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("remember")} />
        <span className="text-sm">Remember me</span>
      </label>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
```

## Common Validation Rules

```tsx
const schema = z.object({
  // Required string
  name: z.string().min(1, "Name is required"),

  // Email
  email: z.string().email("Invalid email"),

  // Password with requirements
  password: z.string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[0-9]/, "At least one number"),

  // Confirm password
  confirmPassword: z.string(),

  // Phone (optional)
  phone: z.string().optional(),

  // Number
  age: z.number().min(18, "Must be 18 or older"),

  // Select/enum
  role: z.enum(["admin", "user", "guest"]),

  // Checkbox
  terms: z.boolean().refine(val => val === true, "You must accept the terms"),

  // URL
  website: z.string().url("Invalid URL").optional(),

  // Date
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

## Form States

### Loading State

```tsx
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? (
    <span className="flex items-center gap-2">
      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Submitting...
    </span>
  ) : (
    "Submit"
  )}
</Button>
```

### Success State

```tsx
const [isSuccess, setIsSuccess] = useState(false);

const onSubmit = async (data) => {
  await submitForm(data);
  setIsSuccess(true);
  reset(); // Clear form
};

if (isSuccess) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
      <h3 className="text-green-900 font-semibold">Success!</h3>
      <p className="text-green-700">Your message has been sent.</p>
    </div>
  );
}
```

### Error State

```tsx
const [serverError, setServerError] = useState<string | null>(null);

const onSubmit = async (data) => {
  try {
    await submitForm(data);
  } catch (error) {
    setServerError("Something went wrong. Please try again.");
  }
};

{serverError && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
    {serverError}
  </div>
)}
```

## API Integration

```tsx
const onSubmit = async (data: ContactFormData) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit");
  }

  return response.json();
};
```

## Imports Reference

```tsx
// Form validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Pre-built components
import {
  ContactForm,
  NewsletterForm,
  FormInput,
  FormTextarea,
  FormSelect,
  contactFormSchema,
  type ContactFormData,
} from "@/components/ui/ValidatedForm";

// Button
import { Button } from "@/components/ui/Button";
```
