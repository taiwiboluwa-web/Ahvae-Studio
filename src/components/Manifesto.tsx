"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const statement =
  "We are not here to make more content. We are here to make the frame you remember, the image you return to, the feeling that outlives the scroll.";

const words = statement.split(" ");
const accents = new Set(["remember", "image", "feeling"]);

type WordProps = {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  reduced: boolean;
};

function Word({ word, range, progress, reduced }: WordProps) {
  const opacity = useTransform(
    progress,
    range,
    reduced ? [1, 1] : [0.12, 1],
  );
  const accent = accents.has(word.replace(/[^a-zA-Z]/g, "").toLowerCase());

  return (
    <span className="mr-[0.26em] inline-block">
      <motion.span
        style={{ opacity }}
        className={
          accent
            ? "inline-block italic text-[#d4af37]"
            : "inline-block text-[#f8f9fa]"
        }
      >
        {word}
      </motion.span>
    </span>
  );
}

/** Pinned statement. Each word lights up as the visitor scrolls. */
export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const lineScale = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.25,
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.5]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative h-[240svh] bg-[#0a0a0a]"
      aria-label="Our belief"
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[560px] items-center overflow-hidden px-6 sm:px-10 lg:px-16">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: glowOpacity,
            background:
              "radial-gradient(closest-side, rgba(212,175,55,0.16), rgba(10,10,10,0) 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1200px]">
          <p className="gold-kicker mb-8 flex items-center gap-4 text-[9px] font-semibold sm:mb-10">
            <span className="h-px w-10 bg-[#d4af37]/80" aria-hidden="true" />
            What we believe
          </p>

          <p className="font-editorial text-[clamp(2rem,5.4vw,5rem)] leading-[1.08] tracking-[-0.04em]">
            {words.map((word, index) => {
              const start = (index / words.length) * 0.86;
              const end = ((index + 1) / words.length) * 0.86;

              return (
                <Word
                  key={`${word}-${index}`}
                  word={word}
                  range={[start, end]}
                  progress={scrollYProgress}
                  reduced={reduced}
                />
              );
            })}
          </p>

          <div className="mt-12 flex items-center gap-6 sm:mt-16">
            <div className="h-px w-40 overflow-hidden bg-white/15 sm:w-64">
              <motion.div
                className="h-full origin-left bg-[#d4af37]"
                style={{ scaleX: lineScale }}
              />
            </div>
            <span className="text-[8px] uppercase tracking-[0.24em] text-white/40">
              AHVAÉ Studios
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
