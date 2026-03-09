"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll, CountUp } from "@/components/ui/AnimateOnScroll";
import { TestimonialGrid } from "@/components/ui/TestimonialCard";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const services = [
  {
    number: "01",
    title: "Web Design",
    description: "Beautiful, custom-made websites that perfectly reflect your brand and convert visitors into customers.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    number: "02",
    title: "Development",
    description: "Robust web applications built with modern technologies for optimal performance and scalability.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    number: "03",
    title: "Strategy",
    description: "Data-driven digital strategies that translate your business goals into measurable online results.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
];

const testimonials = [
  {
    quote: "The collaboration was excellent. They truly understand what a business needs and always deliver quality.",
    author: "Sarah Mitchell",
    role: "CEO",
    company: "TechStart",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "Our new website has completely transformed our online presence. The results speak for themselves.",
    author: "Michael Chen",
    role: "Founder",
    company: "GrowthLab",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5 as const,
  },
  {
    quote: "Professional, creative, and reliable. Exactly what we were looking for in our digital transformation.",
    author: "Emily Johnson",
    role: "Marketing Director",
    company: "Bloom",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5 as const,
  },
];

const stats = [
  { value: 150, suffix: "+", label: "Projects completed" },
  { value: 98, suffix: "%", label: "Happy clients" },
  { value: 12, suffix: "", label: "Years experience" },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function DemoHome() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* ========================================
          HERO - Full bleed with parallax
          ======================================== */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden -mt-[88px]">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
            alt="Modern workspace"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 via-neutral-900/20 to-neutral-900/60" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative h-full flex flex-col justify-end pb-20 md:pb-32 pt-20"
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
                  Welcome to Acme Studio
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]"
              >
                We build digital experiences that{" "}
                <em className="italic">inspire</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed"
              >
                From strategy to execution. We help ambitious businesses
                grow with thoughtful digital solutions.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
                  <Link href="/demo/contact">
                    Start a project
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link href="/demo/services">View services</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================
          STATS - Clean row
          ======================================== */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <AnimateOnScroll
                key={stat.label}
                animation="fadeInUp"
                delay={index * 0.1}
                className="text-center"
              >
                <p className="font-serif text-4xl md:text-5xl text-neutral-900 mb-2">
                  <CountUp end={stat.value} />{stat.suffix}
                </p>
                <p className="text-sm text-neutral-500">{stat.label}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SERVICES - Editorial layout
          ======================================== */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mb-20">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              What we do
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              With passion and expertise, we help businesses realize their digital ambitions.
            </p>
          </AnimateOnScroll>

          <div className="space-y-32">
            {services.map((service, index) => (
              <AnimateOnScroll
                key={service.number}
                animation="fadeInUp"
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-neutral-900 rounded-2xl flex items-center justify-center text-white font-serif text-2xl">
                    {service.number}
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <h3 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/demo/services">
                      Learn more
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          FULL-WIDTH IMAGE BREAK
          ======================================== */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85"
          alt="Team at work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimateOnScroll animation="fadeInUp" className="text-center px-6">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white max-w-3xl leading-tight">
              "Design is not just what it looks like. Design is how it{" "}
              <em className="italic">works</em>."
            </p>
            <p className="text-white/60 mt-6">— Steve Jobs</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========================================
          TESTIMONIALS - Using TestimonialGrid component
          ======================================== */}
      <section className="py-32 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 dark:text-white mb-6">
              What clients say
            </h2>
          </AnimateOnScroll>

          <TestimonialGrid testimonials={testimonials} columns={3} />
        </div>
      </section>

      {/* ========================================
          CTA - Dark elegant
          ======================================== */}
      <section className="py-32 bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
              Let's bring your next project to life together.
              Get in touch for a free consultation.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100" asChild>
                <Link href="/demo/contact">
                  Get in touch
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800" asChild>
                <Link href="/demo/about">About us</Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
