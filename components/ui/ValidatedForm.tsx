"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./Button";
import { useState } from "react";

// ===========================================
// FORM SCHEMAS - Define your validation rules
// ===========================================

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ===========================================
// FORM INPUT COMPONENT
// ===========================================

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, className = "", ...props }: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
        {props.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors
          bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-white
          placeholder:text-neutral-400 dark:placeholder:text-neutral-500
          ${error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-neutral-200 dark:border-neutral-700 focus:border-primary-500 focus:ring-primary-500/20"
          }
          focus:outline-none focus:ring-2
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ===========================================
// FORM TEXTAREA COMPONENT
// ===========================================

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function FormTextarea({ label, error, className = "", ...props }: FormTextareaProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
        {props.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors resize-none
          bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-white
          placeholder:text-neutral-400 dark:placeholder:text-neutral-500
          ${error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-neutral-200 dark:border-neutral-700 focus:border-primary-500 focus:ring-primary-500/20"
          }
          focus:outline-none focus:ring-2
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ===========================================
// FORM SELECT COMPONENT
// ===========================================

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormSelect({ label, error, children, className = "", ...props }: FormSelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
        {props.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors appearance-none
          bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-white
          ${error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-neutral-200 dark:border-neutral-700 focus:border-primary-500 focus:ring-primary-500/20"
          }
          focus:outline-none focus:ring-2
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ===========================================
// CONTACT FORM EXAMPLE
// ===========================================

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form submitted:", data);
      }
      setIsSuccess(true);
      reset();
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-1">
          Message Sent!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          We'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Name"
          placeholder="Your name"
          required
          {...register("name")}
          error={errors.name?.message}
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <FormSelect
          label="Subject"
          required
          {...register("subject")}
          error={errors.subject?.message}
        >
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="support">Support</option>
          <option value="sales">Sales</option>
          <option value="partnership">Partnership</option>
        </FormSelect>
      </div>

      <FormTextarea
        label="Message"
        placeholder="How can we help you?"
        rows={5}
        required
        {...register("message")}
        error={errors.message?.message}
      />

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

// ===========================================
// EXAMPLE: NEWSLETTER FORM
// ===========================================

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Newsletter signup:", data);
      setIsSuccess(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <p className="text-green-600 dark:text-green-400 font-medium">
        Thanks for subscribing!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1">
        <input
          type="email"
          placeholder="Enter your email"
          className={`
            w-full px-4 py-3 rounded-lg border transition-colors
            bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-white
            placeholder:text-neutral-400
            ${errors.email
              ? "border-red-500"
              : "border-neutral-200 dark:border-neutral-700 focus:border-primary-500"
            }
            focus:outline-none focus:ring-2 focus:ring-primary-500/20
          `}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "..." : "Subscribe"}
      </Button>
    </form>
  );
}
