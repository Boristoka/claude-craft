"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectCard, ProjectGrid, FeaturedProject } from "@/components/ui/ProjectCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

/**
 * Portfolio Page - Showcase projects with modern grid layout
 */

const featuredProject = {
  title: "Meridian Brand Identity",
  category: "Branding & Strategy",
  description:
    "A complete brand transformation for a sustainable fashion company. We developed a visual identity system that reflects their commitment to ethical production and timeless design.",
  image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
  stats: [
    { label: "Brand Awareness", value: "+340%" },
    { label: "Social Growth", value: "85K" },
    { label: "Revenue Increase", value: "2.4x" },
  ],
};

const projects = [
  {
    title: "Horizon Dashboard",
    category: "Web Design",
    description: "Analytics platform with real-time data visualization",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["UI/UX", "Dashboard", "SaaS"],
    year: "2024",
  },
  {
    title: "Verdant Mobile App",
    category: "App Design",
    description: "Plant care companion app with smart watering reminders",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    tags: ["iOS", "Android", "Product"],
    year: "2024",
  },
  {
    title: "Atlas Travel Platform",
    category: "Web Development",
    description: "Immersive travel booking experience with 3D maps",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    tags: ["React", "Three.js", "Travel"],
    year: "2024",
  },
  {
    title: "Noma Restaurant",
    category: "Branding",
    description: "Visual identity for an award-winning Nordic restaurant",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tags: ["Identity", "Print", "Digital"],
    year: "2023",
  },
  {
    title: "Fintech Platform",
    category: "Product Design",
    description: "Secure payment processing with beautiful UX",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    tags: ["Fintech", "UX", "Security"],
    year: "2023",
  },
  {
    title: "Wellness Studio",
    category: "Web Design",
    description: "Booking platform for a luxury wellness retreat",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    tags: ["Wellness", "Booking", "Luxury"],
    year: "2023",
  },
];

const categories = ["All", "Web Design", "Branding", "App Design", "Product Design", "Web Development"];

export default function PortfolioPage() {
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
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden -mt-[88px]">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=85"
            alt="Our work"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/30 to-neutral-900/70" />
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
                  Our Work
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Selected <em className="italic">projects</em> that define our craft
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                We partner with ambitious brands to create digital experiences that
                captivate audiences and drive meaningful results.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800 sticky top-20 z-40">
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

      {/* Featured Project */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block w-8 h-px bg-primary-500" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                Featured Project
              </span>
            </div>
          </AnimateOnScroll>

          <FeaturedProject
            title={featuredProject.title}
            category={featuredProject.category}
            description={featuredProject.description}
            image={featuredProject.image}
            stats={featuredProject.stats}
            href="/demo/portfolio/meridian"
          />
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-3xl text-neutral-900 dark:text-white">
                More Projects
              </h2>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {projects.length} projects
              </span>
            </div>
          </AnimateOnScroll>

          <ProjectGrid columns={3}>
            {projects.map((project, index) => (
              <AnimateOnScroll key={project.title} animation="fadeInUp" delay={index * 0.1}>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  year={project.year}
                  href={`/demo/portfolio/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                />
              </AnimateOnScroll>
            ))}
          </ProjectGrid>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-neutral-900 dark:bg-black">
        <div className="container mx-auto px-6 text-center">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Have a project in <em className="italic">mind</em>?
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeInUp" delay={0.1}>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
              We&apos;re always looking for new challenges and exciting collaborations.
              Let&apos;s create something amazing together.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeInUp" delay={0.2}>
            <a
              href="/demo/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium rounded-full hover:bg-neutral-100 transition-colors"
            >
              Start a Project
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
