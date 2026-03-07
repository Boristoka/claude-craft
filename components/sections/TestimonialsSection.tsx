import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { TestimonialCard } from "@/components/ui/Testimonial";

/**
 * TestimonialsSection - Customer testimonials grid
 *
 * @example
 * <TestimonialsSection
 *   badge="Testimonials"
 *   title="What our customers say"
 *   testimonials={[
 *     { quote: "Amazing!", author: "John", role: "CEO" }
 *   ]}
 * />
 */

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

interface TestimonialsSectionProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  testimonials: Testimonial[];
}

const TestimonialsSection = React.forwardRef<HTMLElement, TestimonialsSectionProps>(
  ({
    className,
    badge,
    title,
    titleHighlight,
    description,
    testimonials,
    ...props
  }, ref) => {
    // Determine layout based on number of testimonials
    const featuredIndex = testimonials.length === 3 ? 1 : 0;

    return (
      <section
        ref={ref}
        className={cn("py-20 lg:py-28 bg-white", className)}
        {...props}
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            {badge && (
              <Badge className="mb-4">{badge}</Badge>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {title}{" "}
              {titleHighlight && (
                <span className="text-gradient-primary">{titleHighlight}</span>
              )}
            </h2>
            {description && (
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
                avatarSrc={testimonial.avatarSrc}
                rating={testimonial.rating}
                variant={index === featuredIndex ? "featured" : "default"}
                className={index === featuredIndex ? "lg:scale-105" : ""}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
);
TestimonialsSection.displayName = "TestimonialsSection";

export { TestimonialsSection };
