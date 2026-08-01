"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const steps = [
  {
    number: "01",
    title: "Consultation",
    body: "We begin with a deep analysis of your legal landscape, identifying critical risks and strategic opportunities.",
  },
  {
    number: "02",
    title: "Strategy",
    body: "Developing a bespoke legal framework designed for precision, resilience, and long-term success.",
  },
  {
    number: "03",
    title: "Execution",
    body: "Implementing our strategy with meticulous attention to detail, ensuring every action serves the objective.",
  },
  {
    number: "04",
    title: "Resolution",
    body: "Achieving high-stakes results while providing ongoing protection and strategic advisory.",
  },
];

function StepsFallback() {
  return (
    <div className="flex flex-col divide-y divide-cream/15 border-t border-cream/15">
      {steps.map((step) => (
        <div key={step.number} className="flex gap-6 py-8">
          <span className="font-serif text-2xl text-rust">{step.number}</span>
          <div>
            <p className="font-serif text-2xl text-cream">{step.title}</p>
            <p className="mt-2 max-w-md font-sans text-base leading-7 text-cream/65">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PinnedSteps() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(steps.length - 1) * 100}%`]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  return (
    <div
      ref={pinRef}
      className="relative -mx-6 hidden sm:-mx-16 lg:block"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        <motion.div style={{ x }} className="flex h-full">
          {steps.map((step) => (
            <div key={step.number} className="relative flex h-full w-screen shrink-0 items-center px-6 sm:px-16 lg:px-24">
              <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 select-none font-serif text-[16rem] leading-none text-cream/5 sm:left-16 lg:left-24">
                {step.number}
              </span>
              <div className="relative max-w-xl">
                <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">
                  Step {step.number}
                </p>
                <h3 className="mt-6 font-serif text-5xl leading-tight text-cream sm:text-6xl">
                  {step.title}
                </h3>
                <p className="mt-6 max-w-md font-sans text-lg leading-8 text-cream/70">{step.body}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute right-6 top-10 font-sans text-xs uppercase tracking-[0.2em] text-cream/40 sm:right-16 lg:right-24">
          {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </div>

        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-3">
          {steps.map((step, i) => (
            <span
              key={step.number}
              className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${
                i === active ? "bg-rust" : "bg-cream/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProcessSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section theme="dark" stagger staggerChildren={0.12} className="flex flex-col gap-20 lg:pb-0">
      <StaggerItem className="max-w-2xl">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-rust">Our process</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Our expertise & process</h2>
        <p className="mt-5 font-sans text-base leading-7 text-cream/70">
          Strategic legal guidance tailored to ensure compliance, strengthen businesses, and resolve
          complex corporate challenges.
        </p>
      </StaggerItem>

      <div className={shouldReduceMotion ? "" : "lg:hidden"}>
        <StepsFallback />
      </div>
      {!shouldReduceMotion && <PinnedSteps />}
    </Section>
  );
}
