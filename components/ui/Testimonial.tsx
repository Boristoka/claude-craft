import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";

/**
 * TestimonialCard - Customer testimonial with photo
 *
 * @example
 * <TestimonialCard
 *   quote="This product changed my life!"
 *   author="Jane Smith"
 *   role="CEO at TechCorp"
 *   avatarSrc="/jane.jpg"
 *   rating={5}
 * />
 */

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  variant?: "default" | "featured";
}

const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ className, quote, author, role, company, avatarSrc, rating, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6 transition-all duration-200",
          variant === "default" && "bg-white border border-neutral-200 shadow-card hover:shadow-card-hover",
          variant === "featured" && "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-xl",
          className
        )}
        {...props}
      >
        {/* Rating stars */}
        {rating && (
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={cn(
                  "w-5 h-5",
                  star <= rating
                    ? variant === "featured" ? "text-white" : "text-amber-400"
                    : variant === "featured" ? "text-white/30" : "text-neutral-200"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        {/* Quote */}
        <blockquote className={cn(
          "text-lg leading-relaxed mb-6",
          variant === "featured" ? "text-white" : "text-neutral-700"
        )}>
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar
            src={avatarSrc}
            fallback={author.split(" ").map(n => n[0]).join("")}
            size="lg"
          />
          <div>
            <p className={cn(
              "font-semibold",
              variant === "featured" ? "text-white" : "text-neutral-900"
            )}>
              {author}
            </p>
            {(role || company) && (
              <p className={cn(
                "text-sm",
                variant === "featured" ? "text-white/80" : "text-neutral-500"
              )}>
                {role}{role && company && " at "}{company}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
TestimonialCard.displayName = "TestimonialCard";

export { TestimonialCard };
