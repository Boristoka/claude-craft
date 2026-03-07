import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * LogoCloud - Display partner/client logos
 *
 * @example
 * <LogoCloud
 *   title="Trusted by leading companies"
 *   logos={[
 *     { name: "Acme", src: "/logos/acme.svg" },
 *     { name: "Globex", src: "/logos/globex.svg" },
 *   ]}
 * />
 */

interface Logo {
  name: string;
  src: string;
  href?: string;
}

interface LogoCloudProps extends React.HTMLAttributes<HTMLElement> {
  logos: Logo[];
  title?: string;
  variant?: "default" | "minimal" | "dark" | "grid";
}

const LogoCloud = React.forwardRef<HTMLElement, LogoCloudProps>(
  ({
    className,
    logos,
    title,
    variant = "default",
    ...props
  }, ref) => {
    const isDark = variant === "dark";
    const isGrid = variant === "grid";

    const LogoWrapper = ({ logo, children }: { logo: Logo; children: React.ReactNode }) => {
      if (logo.href) {
        return (
          <a
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-opacity hover:opacity-70"
          >
            {children}
          </a>
        );
      }
      return <>{children}</>;
    };

    return (
      <section
        ref={ref}
        className={cn(
          "py-16 lg:py-20",
          variant === "default" && "bg-neutral-50 border-y border-neutral-100",
          variant === "minimal" && "bg-white",
          variant === "dark" && "bg-neutral-900",
          variant === "grid" && "bg-white",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-6">
          {title && (
            <p className={cn(
              "text-center text-sm font-medium uppercase tracking-wider mb-10",
              isDark ? "text-neutral-500" : "text-neutral-400"
            )}>
              {title}
            </p>
          )}

          {isGrid ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center justify-center"
                >
                  <LogoWrapper logo={logo}>
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className={cn(
                        "h-8 md:h-10 w-auto object-contain",
                        isDark ? "brightness-0 invert opacity-60" : "grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                      )}
                    />
                  </LogoWrapper>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {logos.map((logo) => (
                <LogoWrapper key={logo.name} logo={logo}>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={cn(
                      "h-8 md:h-10 w-auto object-contain transition-all",
                      isDark
                        ? "brightness-0 invert opacity-50 hover:opacity-80"
                        : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                    )}
                  />
                </LogoWrapper>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
);
LogoCloud.displayName = "LogoCloud";

export { LogoCloud };
