"use client";

import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  {
    number: "01",
    title: "Discover",
    copy: "We begin by listening. Your brand, your audience and the feeling you want people to leave with shape everything that follows.",
    detail: "Brief · Research · References",
  },
  {
    number: "02",
    title: "Direct",
    copy: "Concept, mood, locations and a clear visual language are set before a single frame is captured, so every choice has a purpose.",
    detail: "Concept · Treatment · Planning",
  },
  {
    number: "03",
    title: "Capture",
    copy: "On set and on location we work quietly and precisely, giving your story the light, movement and presence it deserves.",
    detail: "Film · Photography · Events",
  },
  {
    number: "04",
    title: "Deliver",
    copy: "Editing, colour and finishing are handled with care, then delivered in the formats you need, ready for every platform.",
    detail: "Edit · Grade · Delivery",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-28 text-[#f8f9fa] sm:px-10 sm:py-36 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[#d4af37]/[0.07] blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1500px]">
        <motion.div
          className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div>
            <p className="gold-kicker mb-5 text-[9px] font-semibold">
              How we work
            </p>
            <h2 className="font-editorial text-[clamp(3rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.055em]">
              <Reveal>From first idea</Reveal>
              <Reveal delay={0.12}>
                <span className="italic text-white/45">to final frame.</span>
              </Reveal>
            </h2>
          </div>
          <p className="max-w-[300px] text-[11px] leading-6 text-white/50 md:pb-2 md:text-right">
            A calm, considered process that keeps you informed and keeps the
            work moving.
          </p>
        </motion.div>

        <ol className="border-b border-white/15">
          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              className="group grid gap-4 border-t border-white/15 py-9 md:grid-cols-[110px_1.1fr_1fr_220px] md:items-start md:gap-10 md:py-12"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: index * 0.05 }}
            >
              <span className="font-editorial text-xl italic text-[#d4af37]">
                {step.number}
              </span>
              <h3 className="font-editorial text-[clamp(2.3rem,4.8vw,4.4rem)] leading-none tracking-[-0.045em] transition-transform duration-700 ease-out group-hover:translate-x-3">
                {step.title}
              </h3>
              <p className="max-w-[430px] text-[12px] leading-7 text-white/60">
                {step.copy}
              </p>
              <p className="text-[8px] uppercase tracking-[0.22em] text-white/35 md:text-right">
                {step.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
