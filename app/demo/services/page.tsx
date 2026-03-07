"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const services = [
  {
    id: "webdesign",
    number: "01",
    title: "Web Design",
    subtitle: "Visually compelling, strategically sound",
    description: "We design websites that are not only beautiful, but also convert. Every design is custom-made, tailored to your brand and target audience.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=85",
    features: [
      "Custom UI/UX design",
      "Responsive design for all devices",
      "Brand identity integration",
      "Conversion-optimized layouts",
      "Interactive prototypes",
      "Design systems",
    ],
  },
  {
    id: "development",
    number: "02",
    title: "Development",
    subtitle: "Robust, scalable, future-proof",
    description: "From simple websites to complex web applications. We build with the latest technologies for optimal performance and maintainability.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85",
    features: [
      "Modern frontend (React, Next.js)",
      "Backend development",
      "API integrations",
      "E-commerce solutions",
      "CMS implementation",
      "Performance optimization",
    ],
  },
  {
    id: "strategy",
    number: "03",
    title: "Digital Strategy",
    subtitle: "Data-driven decisions",
    description: "A strong digital strategy is the foundation of online success. We help you make the right choices based on data and market insights.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85",
    features: [
      "Digital roadmaps",
      "Competitive analysis",
      "User research",
      "Conversion optimization",
      "Analytics & reporting",
      "Growth strategy",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "We start with a conversation to understand your business, goals, and challenges.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Based on our findings, we create a plan with clear goals and deliverables.",
  },
  {
    step: "03",
    title: "Design",
    description: "We create designs that strengthen your brand and engage users.",
  },
  {
    step: "04",
    title: "Development",
    description: "The design is transformed into a working, optimized website or application.",
  },
  {
    step: "05",
    title: "Launch",
    description: "After thorough testing, your project goes live. We ensure a smooth transition.",
  },
  {
    step: "06",
    title: "Growth",
    description: "After launch, we continue to optimize based on data and user feedback.",
  },
];

export default function ServicesPage() {
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
          HERO
          ======================================== */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden -mt-20">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=85"
            alt="Team working"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/30 to-neutral-900/70" />
        </motion.div>

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
                  Services
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]"
              >
                Everything you need for digital <em className="italic">success</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                From concept to launch and beyond. We offer a complete
                package of services to realize your digital ambitions.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========================================
          SERVICES - Editorial sections
          ======================================== */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`${index > 0 ? "pt-32 border-t border-neutral-100" : ""}`}
            >
              <AnimateOnScroll
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
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-neutral-900 rounded-2xl flex items-center justify-center text-white font-serif text-xl">
                    {service.number}
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <p className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">
                    {service.subtitle}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-neutral-600">
                        <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button asChild>
                    <Link href="/demo/contact">
                      Request a quote
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </AnimateOnScroll>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PROCESS - Clean timeline
          ======================================== */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-20">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              Our process
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A proven methodology that ensures successful projects.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <AnimateOnScroll
                key={step.step}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <div className="bg-white rounded-2xl p-8 h-full border border-neutral-100">
                  <span className="font-serif text-4xl text-neutral-200 block mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">
                    {step.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CTA
          ======================================== */}
      <section className="py-32 bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
              Tell us about your project and we'll get back to you within 24 hours
              for a free consultation.
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
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
