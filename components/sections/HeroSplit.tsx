import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/**
 * HeroSplit - Hero section with image on the right
 *
 * @example
 * <HeroSplit
 *   badge="New Release"
 *   title="Build something amazing"
 *   description="Start your next project with our powerful tools"
 *   primaryButton={{ label: "Get Started", onClick: () => {} }}
 *   secondaryButton={{ label: "Learn More", onClick: () => {} }}
 *   imageSrc="https://images.unsplash.com/photo-..."
 * />
 */

interface HeroSplitProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryButton?: { label: string; onClick?: () => void };
  secondaryButton?: { label: string; onClick?: () => void };
  imageSrc: string;
  imageAlt?: string;
}

const HeroSplit = React.forwardRef<HTMLElement, HeroSplitProps>(
  ({
    className,
    badge,
    title,
    titleHighlight,
    description,
    primaryButton,
    secondaryButton,
    imageSrc,
    imageAlt = "Hero image",
    ...props
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("relative overflow-hidden bg-white", className)}
        {...props}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />

        <div className="relative container mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              {badge && (
                <Badge variant="secondary" dot className="mb-6">
                  {badge}
                </Badge>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight mb-6 leading-[1.1]">
                {title}{" "}
                {titleHighlight && (
                  <span className="text-gradient-primary">{titleHighlight}</span>
                )}
              </h1>

              <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-lg">
                {description}
              </p>

              <div className="flex flex-wrap gap-4">
                {primaryButton && (
                  <Button size="lg" onClick={primaryButton.onClick}>
                    {primaryButton.label}
                  </Button>
                )}
                {secondaryButton && (
                  <Button variant="outline" size="lg" onClick={secondaryButton.onClick}>
                    {secondaryButton.label}
                  </Button>
                )}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-8 -right-8 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }
);
HeroSplit.displayName = "HeroSplit";

export { HeroSplit };
