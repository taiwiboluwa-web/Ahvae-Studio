"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Reveal from "@/components/Reveal";

const disciplines = [
  {
    number: "01",
    name: "Film",
    descriptor: "Stories that move.",
    copy: "From the first frame to the final cut, we shape cinematic films with atmosphere, rhythm and feeling.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1500&q=90",
    imageAlt: "Cinematic film camera in a dark production environment",
    note: "Motion · Sound · Narrative",
  },
  {
    number: "02",
    name: "Photography",
    descriptor: "Moments, made lasting.",
    copy: "Portraits, campaigns and event imagery created with an instinct for light, detail and human connection.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1500&q=90",
    imageAlt: "Sunlit landscape photographed with a cinematic composition",
    note: "Portraits · Campaigns · Events",
  },
  {
    number: "03",
    name: "Creative Direction",
    descriptor: "A vision, made clear.",
    copy: "We bring the pieces together: visual identity, art direction and a cohesive creative point of view.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1500&q=90",
    imageAlt: "Considered creative workspace with natural light",
    note: "Concept · Identity · Direction",
  },
];

export default function Scrollytelling() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      disciplines.length - 1,
      Math.max(0, Math.floor(value * disciplines.length)),
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  const horizontalX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -travelDistance],
  );
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.25,
  });

  /* Images drift against the track so each card feels layered in depth. */
  const imageX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return;

    const measure = () => {
      setTravelDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative h-[290vh] bg-[#f8f9fa] md:h-[320vh]"
      aria-label="Our creative disciplines"
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[650px] flex-col justify-center overflow-hidden py-14 sm:py-16">
        <div className="mb-8 flex items-end justify-between px-6 sm:mb-10 sm:px-10 lg:px-16">
          <div className="max-w-[620px]">
            <p className="gold-kicker mb-4 text-[9px] font-semibold">
              The way we see it
            </p>
            <h2 className="font-editorial text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.045em] text-[#0a0a0a]">
              <Reveal>Different disciplines.</Reveal>
              <Reveal delay={0.12}>
                <span className="italic text-black/45">One point of view.</span>
              </Reveal>
            </h2>
          </div>
          <p className="hidden max-w-[210px] pb-2 text-right text-[9px] leading-6 tracking-[0.12em] text-black/45 lg:block">
            MOVE THROUGH THE STORY
            <br />
            EACH FRAME HAS A PURPOSE
          </p>
        </div>

        <div ref={viewportRef} className="scrollbar-hidden w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x: horizontalX }}
            className="flex w-max items-stretch gap-4 px-6 pr-[12vw] sm:gap-6 sm:px-10 sm:pr-[14vw] lg:gap-8 lg:px-16"
          >
            {disciplines.map((item) => (
              <article
                key={item.number}
                className="group relative w-[82vw] max-w-[680px] shrink-0 sm:w-[58vw] lg:w-[43vw] xl:w-[39vw]"
              >
                <div className="relative h-[min(51svh,470px)] min-h-[300px] overflow-hidden bg-[#d7d5d0]">
                  <motion.div
                    className="absolute -inset-x-[10%] inset-y-0"
                    style={{ x: imageX }}
                  >
                    <div
                      role="img"
                      aria-label={item.imageAlt}
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                      style={{ backgroundImage: `url("${item.image}")` }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />
                  <div className="absolute left-5 top-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/80 sm:left-7 sm:top-7">
                    <span className="text-[#e1c46e]">{item.number}</span>
                    <span className="h-px w-7 bg-white/55" />
                    <span>AHVAÉ / Studio practice</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8 sm:right-8">
                    <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-[#e1c46e]">
                      {item.note}
                    </p>
                    <h3 className="font-editorial text-[clamp(2.4rem,5vw,4.5rem)] leading-none tracking-[-0.04em]">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-[11px] text-white/75">
                      {item.descriptor}
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-5 border-b border-black/15 py-5">
                  <p className="max-w-[410px] text-[11px] leading-6 text-black/60 sm:text-xs">
                    {item.copy}
                  </p>
                  <span className="mt-1 shrink-0 text-lg text-[#b08c31]">↗</span>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-between px-6 sm:px-10 lg:px-16">
          <span className="text-[8px] uppercase tracking-[0.24em] text-black/40">
            Scroll to discover
          </span>
          <div className="h-px w-28 overflow-hidden bg-black/10 sm:w-44">
            <motion.div
              className="h-full origin-left bg-[#d4af37]"
              style={{ scaleX: progressScale }}
            />
          </div>
          <span className="text-[8px] uppercase tracking-[0.24em] text-black/40">
            {String(activeIndex + 1).padStart(2, "0")} —{" "}
            {String(disciplines.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
