"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll, CountUp } from "@/components/ui/AnimateOnScroll";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const team = [
  {
    name: "Thomas Berg",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "15+ years experience in digital strategy and design",
  },
  {
    name: "Lisa Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Full-stack expert with a passion for clean code",
  },
  {
    name: "Peter Smith",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Creates intuitive and user-friendly interfaces",
  },
  {
    name: "Emma Wilson",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Keeps projects on track and clients happy",
  },
];

const values = [
  {
    number: "01",
    title: "Quality over quantity",
    description: "We take the time to do each project right. No rushed work, but thoughtful solutions that actually work.",
  },
  {
    number: "02",
    title: "Transparent communication",
    description: "Open and honest. We keep you informed about progress and are always available for questions.",
  },
  {
    number: "03",
    title: "Long-term thinking",
    description: "We don't build for today, but for the future. Scalable, maintainable solutions.",
  },
  {
    number: "04",
    title: "Success together",
    description: "Your success is our success. We think along as a partner, not just as a vendor.",
  },
];

export default function AboutPage() {
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
          HERO - Full bleed
          ======================================== */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden -mt-20">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85"
            alt="Team collaboration"
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
                  About us
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]"
              >
                A team of <em className="italic">makers</em> and thinkers
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                For over 12 years, we've been building digital solutions
                for ambitious businesses across the country.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========================================
          STORY - Editorial text
          ======================================== */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <AnimateOnScroll animation="fadeInUp">
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-6">
                Our story
              </h2>
              <div className="space-y-6 text-neutral-600 leading-relaxed">
                <p className="text-lg">
                  Acme Studio started in 2012 as a small design agency with a big dream:
                  to make the web more beautiful and user-friendly.
                </p>
                <p>
                  What started as a solo venture has grown into a team of passionate
                  professionals who work daily to realize digital ambitions.
                </p>
                <p>
                  We believe that good design and strong technology go hand in hand. That's why
                  we combine creativity with technical expertise to build solutions
                  that are not only beautiful, but actually work.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={0.2}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Our office"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========================================
          VALUES - Grid
          ======================================== */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mb-20">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              What we stand for
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Our core values form the foundation of everything we do.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
            {values.map((value, index) => (
              <AnimateOnScroll
                key={value.number}
                animation="fadeInUp"
                delay={index * 0.1}
                className="group"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300 border border-neutral-200 group-hover:border-neutral-900">
                    <span className="font-serif text-lg">{value.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          TEAM - Photo grid
          ======================================== */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              Meet our team
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The people behind the projects. Each with their own expertise and passion.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimateOnScroll
                key={member.name}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <div className="group">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">{member.name}</h3>
                  <p className="text-sm text-neutral-500 mb-2">{member.role}</p>
                  <p className="text-sm text-neutral-600">{member.bio}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          STATS
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&q=85"
          alt="Office space"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/80" />

        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 150, suffix: "+", label: "Projects" },
              { value: 50, suffix: "+", label: "Clients" },
              { value: 12, suffix: "", label: "Years experience" },
              { value: 8, suffix: "", label: "Team members" },
            ].map((stat, index) => (
              <AnimateOnScroll
                key={stat.label}
                animation="fadeInUp"
                delay={index * 0.1}
                className="text-center"
              >
                <p className="font-serif text-4xl md:text-5xl text-white mb-2">
                  <CountUp end={stat.value} />{stat.suffix}
                </p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          CTA
          ======================================== */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6">
              Curious what we can do for you?
            </h2>
            <p className="text-lg text-neutral-600 mb-10 max-w-xl mx-auto">
              We'd love to tell you more about our approach and how we can
              help you achieve your digital goals.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/demo/contact">
                  Get in touch
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo/services">View services</Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
