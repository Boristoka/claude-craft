import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

/**
 * TeamSection - Team members grid with photos
 *
 * @example
 * <TeamSection
 *   badge="Our Team"
 *   title="Meet the people behind the product"
 *   members={[
 *     { name: "John", role: "CEO", imageSrc: "..." }
 *   ]}
 * />
 */

interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

interface TeamSectionProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  members: TeamMember[];
}

const TeamSection = React.forwardRef<HTMLElement, TeamSectionProps>(
  ({
    className,
    badge,
    title,
    titleHighlight,
    description,
    members,
    ...props
  }, ref) => {
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

          {/* Team Grid */}
          <div className={cn(
            "grid gap-8",
            members.length <= 3 && "md:grid-cols-3 max-w-4xl mx-auto",
            members.length === 4 && "md:grid-cols-2 lg:grid-cols-4",
            members.length > 4 && "md:grid-cols-3 lg:grid-cols-4"
          )}>
            {members.map((member, index) => (
              <div
                key={index}
                className="group text-center"
              >
                {/* Photo */}
                <div className="relative mb-4 rounded-2xl overflow-hidden aspect-square shadow-card group-hover:shadow-card-hover transition-all duration-200">
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover overlay with social links */}
                  {member.social && (
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-4">
                      <div className="flex gap-3">
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-neutral-900">{member.name}</h3>
                <p className="text-sm text-primary-500 font-medium">{member.role}</p>
                {member.bio && (
                  <p className="text-sm text-neutral-500 mt-2">{member.bio}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);
TeamSection.displayName = "TeamSection";

export { TeamSection };
