"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TeamCard, TeamGrid } from "@/components/ui/TeamCard";
import { AnimateOnScroll, CountUp } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

/**
 * Team Page - Meet the team with hover interactions
 */

const leadership = [
  {
    name: "Sarah Chen",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    bio: "Former design lead at Airbnb. 12+ years crafting digital experiences that connect brands with their audiences.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      dribbble: "https://dribbble.com",
    },
  },
  {
    name: "Michael Torres",
    role: "Technical Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "Ex-Google engineer. Passionate about building scalable systems and mentoring the next generation of developers.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Emily Watson",
    role: "Strategy Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    bio: "Brand strategist with a background in psychology. Helps businesses find their authentic voice.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
];

const team = [
  {
    name: "David Kim",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    social: { linkedin: "https://linkedin.com", dribbble: "https://dribbble.com" },
  },
  {
    name: "Lisa Park",
    role: "UX Researcher",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    social: { linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
  },
  {
    name: "James Wilson",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    social: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Anna Martinez",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
    social: { linkedin: "https://linkedin.com" },
  },
  {
    name: "Ryan Cooper",
    role: "Motion Designer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    social: { linkedin: "https://linkedin.com", dribbble: "https://dribbble.com" },
  },
  {
    name: "Sophie Turner",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    social: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    name: "Alex Chen",
    role: "UI Designer",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80",
    social: { linkedin: "https://linkedin.com", dribbble: "https://dribbble.com" },
  },
  {
    name: "Maria Garcia",
    role: "Content Strategist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    social: { linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
  },
];

const stats = [
  { value: 15, suffix: "+", label: "Team Members" },
  { value: 8, suffix: "", label: "Countries" },
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const values = [
  {
    title: "Craft",
    description: "We obsess over the details. Every pixel, every interaction, every word matters.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description: "Great work happens when diverse perspectives come together toward a common goal.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Growth",
    description: "We invest in our people and create space for everyone to develop and thrive.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Impact",
    description: "We measure success by the positive change we create for our clients and their users.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function TeamPage() {
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
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85"
            alt="Our team"
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
                  Our Team
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Meet the <em className="italic">people</em> behind the work
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                We&apos;re a diverse team of designers, engineers, and strategists
                united by our passion for creating exceptional digital experiences.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-neutral-950 border-y border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimateOnScroll key={stat.label} animation="fadeInUp" delay={index * 0.1}>
                <div className="text-center">
                  <div className="font-serif text-4xl md:text-5xl text-neutral-900 dark:text-white mb-2">
                    <CountUp end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="flex items-center gap-3 mb-12">
              <span className="inline-block w-8 h-px bg-primary-500" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                Leadership
              </span>
            </div>
          </AnimateOnScroll>

          <TeamGrid columns={3}>
            {leadership.map((member) => (
              <TeamCard
                key={member.name}
                variant="overlay"
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
                social={member.social}
              />
            ))}
          </TeamGrid>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="font-serif text-3xl text-neutral-900 dark:text-white mb-12">
              The Team
            </h2>
          </AnimateOnScroll>

          <TeamGrid columns={4}>
            {team.map((member) => (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
                social={member.social}
              />
            ))}
          </TeamGrid>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp">
            <div className="max-w-2xl mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
                What we stand for
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Our values guide everything we do, from how we work together to
                how we approach each project.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimateOnScroll key={value.title} animation="fadeInUp" delay={index * 0.1}>
                <div className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-serif text-xl text-neutral-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {value.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-32 bg-neutral-900 dark:bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Join our <em className="italic">team</em>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeInUp" delay={0.1}>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
              We&apos;re always looking for talented people who share our passion
              for great design and meaningful work. Get in touch to explore opportunities.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeInUp" delay={0.2}>
            <a
              href="/demo/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium rounded-full hover:bg-neutral-100 transition-colors"
            >
              Get in Touch
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
