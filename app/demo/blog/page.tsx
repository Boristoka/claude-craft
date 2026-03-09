"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlogCard, BlogGrid, BlogListItem } from "@/components/ui/BlogCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

/**
 * Blog Page - Clean, editorial blog layout
 */

const featuredPost = {
  title: "The Art of Designing for Emotion: Creating Connections Through UI",
  excerpt:
    "Discover how thoughtful design choices can create emotional connections with your users. From color psychology to micro-interactions, learn the principles that make interfaces feel human.",
  image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
  author: {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    role: "Creative Director",
  },
  date: "Mar 15, 2024",
  readTime: "8 min read",
  category: "Design",
};

const posts = [
  {
    title: "Building Scalable Design Systems: A Practical Guide",
    excerpt: "How to create a design system that grows with your organization without becoming a maintenance nightmare.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    author: {
      name: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    date: "Mar 12, 2024",
    readTime: "6 min read",
    category: "Engineering",
  },
  {
    title: "The Future of Web Animation: Beyond the Basics",
    excerpt: "Exploring advanced animation techniques that create memorable user experiences without sacrificing performance.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    author: {
      name: "Emily Watson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    date: "Mar 8, 2024",
    readTime: "5 min read",
    category: "Motion",
  },
  {
    title: "Accessible Design is Better Design",
    excerpt: "Why designing for accessibility improves the experience for everyone, not just users with disabilities.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    date: "Mar 5, 2024",
    readTime: "7 min read",
    category: "Accessibility",
  },
  {
    title: "From Figma to Code: Bridging the Gap",
    excerpt: "Strategies for creating designs that translate beautifully to code, every time.",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    date: "Mar 1, 2024",
    readTime: "4 min read",
    category: "Workflow",
  },
  {
    title: "Color Theory for Digital Designers",
    excerpt: "Understanding color psychology and how to apply it effectively in your digital products.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    author: {
      name: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    date: "Feb 25, 2024",
    readTime: "6 min read",
    category: "Design",
  },
  {
    title: "The Psychology of Loading States",
    excerpt: "How perceived performance impacts user satisfaction and engagement with your product.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    author: {
      name: "Emily Watson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    date: "Feb 20, 2024",
    readTime: "5 min read",
    category: "UX",
  },
];

const recentPosts = [
  { title: "Quick Tips for Better Typography", category: "Design", date: "Feb 18, 2024", readTime: "3 min" },
  { title: "Why We Switched to Tailwind CSS", category: "Engineering", date: "Feb 15, 2024", readTime: "4 min" },
  { title: "Our Design Process Explained", category: "Process", date: "Feb 12, 2024", readTime: "5 min" },
  { title: "Interview: Design at Scale", category: "Interview", date: "Feb 10, 2024", readTime: "8 min" },
];

const categories = ["All", "Design", "Engineering", "Motion", "UX", "Accessibility", "Process"];

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] overflow-hidden -mt-[88px]">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=85"
            alt="Blog"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900/80" />
        </motion.div>

        <motion.div
          className="relative h-full flex flex-col justify-end pb-16 md:pb-24 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp}>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-6">
                  Blog
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Insights & <em className="italic">stories</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                Thoughts on design, development, and building products that people love.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="relative max-w-md">
            <Input
              placeholder="Search articles..."
              className="pl-12"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  index === 0
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block w-8 h-px bg-primary-500" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                Featured Article
              </span>
            </div>
          </AnimateOnScroll>

          <BlogCard
            featured
            title={featuredPost.title}
            excerpt={featuredPost.excerpt}
            image={featuredPost.image}
            author={featuredPost.author}
            date={featuredPost.date}
            readTime={featuredPost.readTime}
            category={featuredPost.category}
            href="/demo/blog/designing-for-emotion"
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="font-serif text-3xl text-neutral-900 dark:text-white mb-12">
              Latest Articles
            </h2>
          </AnimateOnScroll>

          <BlogGrid columns={3}>
            {posts.map((post, index) => (
              <BlogCard
                key={post.title}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                category={post.category}
                href={`/demo/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
              />
            ))}
          </BlogGrid>
        </div>
      </section>

      {/* Recent Posts List */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Recent Articles */}
            <div className="lg:col-span-2">
              <AnimateOnScroll animation="fadeInUp">
                <h2 className="font-serif text-2xl text-neutral-900 dark:text-white mb-6">
                  More from the Blog
                </h2>
              </AnimateOnScroll>

              <div>
                {recentPosts.map((post) => (
                  <BlogListItem
                    key={post.title}
                    title={post.title}
                    category={post.category}
                    date={post.date}
                    readTime={post.readTime}
                    href={`/demo/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter */}
              <AnimateOnScroll animation="fadeInUp">
                <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
                  <h3 className="font-serif text-xl text-neutral-900 dark:text-white mb-2">
                    Subscribe to our newsletter
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Get the latest articles delivered straight to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input placeholder="Your email" type="email" />
                    <button className="w-full px-4 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Popular Tags */}
              <AnimateOnScroll animation="fadeInUp" delay={0.1}>
                <div>
                  <h3 className="font-serif text-xl text-neutral-900 dark:text-white mb-4">
                    Popular Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["UI Design", "React", "Typography", "Animation", "Accessibility", "CSS", "Figma"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
