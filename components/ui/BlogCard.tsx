"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * BlogCard - Clean, modern blog post card
 * Inspired by Medium, Notion, and modern editorial sites
 *
 * @example
 * <BlogCard
 *   title="Design Systems at Scale"
 *   excerpt="How we built a design system..."
 *   image="/blog/post.jpg"
 *   author={{ name: "Jane Doe", avatar: "/avatar.jpg" }}
 *   date="Mar 15, 2024"
 *   href="/blog/design-systems"
 * />
 */

interface Author {
  name: string;
  avatar?: string;
  role?: string;
}

interface BlogCardProps {
  title: string;
  excerpt?: string;
  image?: string;
  author?: Author;
  date?: string;
  readTime?: string;
  category?: string;
  href?: string;
  featured?: boolean;
  className?: string;
}

export function BlogCard({
  title,
  excerpt,
  image,
  author,
  date,
  readTime,
  category,
  href = "#",
  featured = false,
  className,
}: BlogCardProps) {
  if (featured) {
    return (
      <FeaturedBlogCard
        title={title}
        excerpt={excerpt}
        image={image}
        author={author}
        date={date}
        readTime={readTime}
        category={category}
        href={href}
        className={className}
      />
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("group", className)}
    >
      <Link href={href} className="block">
        {/* Image */}
        {image && (
          <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm">
            {category && (
              <span className="px-2.5 py-0.5 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                {category}
              </span>
            )}
            {date && (
              <span className="text-neutral-500 dark:text-neutral-400">
                {date}
              </span>
            )}
            {readTime && (
              <>
                <span className="text-neutral-300 dark:text-neutral-600">·</span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  {readTime}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2 text-sm">
              {excerpt}
            </p>
          )}

          {/* Author */}
          {author && (
            <div className="flex items-center gap-3 pt-2">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {author.name}
                </p>
                {author.role && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {author.role}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

/**
 * FeaturedBlogCard - Large featured blog post card
 */
function FeaturedBlogCard({
  title,
  excerpt,
  image,
  author,
  date,
  readTime,
  category,
  href = "#",
  className,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("group", className)}
    >
      <Link href={href} className="block">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Image */}
          {image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          )}

          {/* Content */}
          <div className="space-y-4">
            {/* Meta */}
            <div className="flex items-center gap-3 text-sm">
              {category && (
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                  {category}
                </span>
              )}
              {date && (
                <span className="text-neutral-500 dark:text-neutral-400">
                  {date}
                </span>
              )}
              {readTime && (
                <>
                  <span className="text-neutral-300 dark:text-neutral-600">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {readTime}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {title}
            </h2>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-neutral-600 dark:text-neutral-400 text-lg line-clamp-3">
                {excerpt}
              </p>
            )}

            {/* Author & Read More */}
            <div className="flex items-center justify-between pt-2">
              {author && (
                <div className="flex items-center gap-3">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                        {author.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">
                      {author.name}
                    </p>
                    {author.role && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {author.role}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <span className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium group-hover:gap-3 transition-all">
                Read more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/**
 * BlogGrid - Responsive grid for blog cards
 */
interface BlogGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
  className?: string;
}

export function BlogGrid({ children, columns = 3, className }: BlogGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <div className={cn("grid gap-8 md:gap-10", gridCols, className)}>
      {children}
    </div>
  );
}

/**
 * BlogListItem - Minimal list-style blog card
 */
interface BlogListItemProps {
  title: string;
  date?: string;
  readTime?: string;
  category?: string;
  href?: string;
  className?: string;
}

export function BlogListItem({
  title,
  date,
  readTime,
  category,
  href = "#",
  className,
}: BlogListItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group py-6 border-b border-neutral-200 dark:border-neutral-800 last:border-0",
        className
      )}
    >
      <Link href={href} className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <h3 className="font-serif text-lg md:text-xl text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {category && <span>{category}</span>}
            {category && date && (
              <span className="text-neutral-300 dark:text-neutral-600">·</span>
            )}
            {date && <span>{date}</span>}
            {readTime && (
              <>
                <span className="text-neutral-300 dark:text-neutral-600">·</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </div>
        <svg
          className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </motion.article>
  );
}
