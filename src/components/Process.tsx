"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  {
    number: "01",
    title: "Discover",
    copy: "First, we get curious. The people, the place, the brief—and the little detail that makes this story yours.",
    detail: "Brief · Research · References",
  },
  {
    number: "02",
    title: "Direct",
    copy: "We find the angle, build the visual language and make a plan that gives the idea room to breathe.",
    detail: "Concept · Treatment · Planning",
  },
  {
    number: "03",
    title: "Capture",
    copy: "On the day, we pay attention: to light, to timing, and to the moments that happen between the planned ones.",
    detail: "Film · Photography · Events",
  },
  {
    number: "04",
    title: "Deliver",
    copy: "We shape the strongest frames, finish every detail and hand over work made to travel well.",
    detail: "Edit · Grade · Delivery",
  },
];

export default function Process() {
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = stepsRef.current;
    if (!list) return;

    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-process-step]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animate(items, {
          opacity: [0, 1],
          y: [34, 0],
          delay: stagger(115, { from: "first" }),
          duration: 950,
          ease: "outExpo",
        });

        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(list);
    return () => observer.disconnect();
  }, []);

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

        <ol ref={stepsRef} className="border-b border-white/15">
          {steps.map((step) => (
            <li
              key={step.number}
              data-process-step
              className="group grid gap-4 border-t border-white/15 py-9 md:grid-cols-[110px_1.1fr_1fr_220px] md:items-start md:gap-10 md:py-12"
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
