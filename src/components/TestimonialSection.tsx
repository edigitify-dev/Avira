"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { transitionPremium } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "Avira didn't just handle our restructuring — they anticipated every question the board would ask before we did. That kind of foresight is rare.",
    name: "Priya Nair",
    role: "CFO, Nimbus Retail",
    photo: "https://images.pexels.com/photos/34381970/pexels-photo-34381970.jpeg",
  },
  {
    quote:
      "What stood out was how little we had to manage them. Deadlines were kept, risks were flagged early, and we were never the ones chasing an update.",
    name: "Rohan Verma",
    role: "Founder, Aster Foods",
    photo: "https://images.pexels.com/photos/7841788/pexels-photo-7841788.jpeg",
  },
  {
    quote:
      "They translated a genuinely messy dispute into a plan our whole leadership team could actually follow. That clarity alone was worth the engagement.",
    name: "Kavita Iyer",
    role: "COO, Meridian Logistics",
    photo: "https://images.pexels.com/photos/27086758/pexels-photo-27086758.jpeg",
  },
];

const ROTATE_MS = 5000;

export function TestimonialSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, ROTATE_MS);
    return () => clearTimeout(id);
  }, [active]);

  const current = testimonials[active];

  return (
    <Section
      theme="dark"
      stagger
      staggerChildren={0.15}
      className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20"
    >
      <StaggerItem variant="slideInLeft" className="lg:col-span-4">
        <div className="relative aspect-4/5 w-full max-w-sm overflow-hidden rounded-2xl">
          <AnimatePresence>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitionPremium}
            >
              <Image
                src={current.photo}
                alt={current.name}
                fill
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </StaggerItem>

      <StaggerItem className="relative lg:col-span-8">
        <span className="pointer-events-none absolute -left-4 -top-16 select-none font-serif text-[14rem] leading-none text-cream/5 sm:-top-20 sm:text-[18rem]">
          &rdquo;
        </span>

        <div className="relative min-h-56 sm:min-h-48">
          <AnimatePresence>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={transitionPremium}
            >
              <p className="max-w-2xl font-serif text-3xl leading-snug text-cream sm:text-4xl">
                {current.quote}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-rust" />
            <div>
              <p className="font-serif text-base text-cream">{current.name}</p>
              <p className="font-sans text-xs uppercase tracking-[0.15em] text-cream/55">
                {current.role}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.name}
                type="button"
                aria-label={`Show testimonial from ${testimonial.name}`}
                onClick={() => setActive(i)}
                className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${
                  i === active ? "bg-rust" : "bg-cream/20 hover:bg-cream/35"
                }`}
              />
            ))}
          </div>
        </div>
      </StaggerItem>
    </Section>
  );
}
