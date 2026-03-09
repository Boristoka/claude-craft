"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Textarea } from "@/components/ui/Input";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { FAQSchema, LocalBusinessSchema } from "@/components/seo/JsonLd";
import { Map } from "@/components/ui/Map";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "hello@acmestudio.com",
    href: "mailto:hello@acmestudio.com",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "San Francisco, CA",
    href: "https://maps.google.com/?q=San+Francisco",
  },
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "This depends on complexity. A simple website can go live within 4-6 weeks, while a complex web application may take 3-6 months.",
  },
  {
    question: "What are the costs?",
    answer: "Every project is unique. We work transparently with fixed prices or hourly rates. Request a free quote for an accurate estimate.",
  },
  {
    question: "Do you offer maintenance?",
    answer: "Yes, we offer various maintenance packages. From basic security updates to full management of your website or application.",
  },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormStatus("success");
  };

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <LocalBusinessSchema
        name="Acme Studio"
        description="We help ambitious businesses grow with thoughtful digital solutions."
        url="https://example.com"
        telephone="+1-555-123-4567"
        email="hello@acmestudio.com"
        priceRange="$$"
        address={{
          streetAddress: "123 Main Street",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94102",
          addressCountry: "US",
        }}
        sameAs={[
          "https://linkedin.com/company/acmestudio",
          "https://instagram.com/acmestudio",
        ]}
      />
      <FAQSchema items={faqs} />

      <div className="min-h-screen">
        {/* ========================================
            HERO
            ======================================== */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] overflow-hidden -mt-[88px]">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
            alt="Contact us"
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
                  Contact
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]"
              >
                Let's <em className="italic">talk</em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
              >
                Have a question or want to discuss a project?
                We typically respond within 24 hours.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========================================
          CONTACT FORM & INFO
          ======================================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <AnimateOnScroll animation="fadeInUp">
              {formStatus === "success" ? (
                <div className="bg-neutral-50 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-2xl text-neutral-900 mb-4">
                    Message sent
                  </h2>
                  <p className="text-neutral-600 mb-8">
                    Thank you for your message. We'll get back to you as soon as possible.
                  </p>
                  <Button variant="outline" onClick={() => setFormStatus("idle")}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-8">
                    Send us a message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Name"
                        placeholder="Your name"
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="you@email.com"
                        required
                      />
                    </div>
                    <Input
                      label="Company"
                      placeholder="Your company name (optional)"
                    />
                    <Input
                      label="Subject"
                      placeholder="How can we help you?"
                      required
                    />
                    <Textarea
                      label="Message"
                      placeholder="Tell us more about your project or question..."
                      rows={5}
                      required
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </AnimateOnScroll>

            {/* Contact Info */}
            <AnimateOnScroll animation="fadeInUp" delay={0.2}>
              <div className="lg:pl-8">
                <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-8">
                  Contact details
                </h2>

                <div className="space-y-6 mb-12">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">{info.label}</p>
                        <p className="text-neutral-900 font-medium group-hover:text-primary-600 transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Interactive Map */}
                <Map
                  latitude={37.7749}
                  longitude={-122.4194}
                  zoom={14}
                  height={300}
                  marker={{
                    title: "Acme Studio",
                    popup: "123 Main Street, San Francisco",
                  }}
                  tileStyle="light"
                  grayscale
                  className="aspect-[4/3]"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========================================
          FAQ
          ======================================== */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-neutral-600">
              Have other questions? Feel free to get in touch.
            </p>
          </AnimateOnScroll>

          <div className="max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <AnimateOnScroll
                key={faq.question}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <div className="bg-white rounded-2xl p-8 border border-neutral-100">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {faq.answer}
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
      <section className="py-24 bg-neutral-900">
        <div className="container mx-auto px-6">
          <AnimateOnScroll animation="fadeInUp" className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Prefer to call?
            </h2>
            <p className="text-lg text-neutral-400 mb-8">
              Call us on weekdays between 9am and 5pm.
            </p>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-3 text-2xl md:text-3xl font-serif text-white hover:text-primary-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (555) 123-4567
            </a>
          </AnimateOnScroll>
        </div>
      </section>
      </div>
    </>
  );
}
