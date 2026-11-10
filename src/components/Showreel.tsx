"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const FPS = 24;
const REEL_SECONDS = 92;

function timecode(progress: number): string {
  const clamped = Math.min(1, Math.max(0, progress));
  const totalFrames = Math.floor(clamped * REEL_SECONDS * FPS);
  const frames = totalFrames % FPS;
  const totalSeconds = Math.floor(totalFrames / FPS);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

/**
 * A small framed image expands to fill the screen as the visitor scrolls,
 * while a running timecode ticks like a camera viewfinder.
 */
export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55], reduced ? [1, 1] : [0.5, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.55], reduced ? [0, 0] : [56, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.3, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.12, 0.5], reduced ? [1, 1] : [1, 0]);
  const titleY = useTransform(scrollYProgress, [0.12, 0.5], reduced ? ["0%", "0%"] : ["0%", "-30%"]);
  const detailOpacity = useTransform(scrollYProgress, [0.55, 0.8], reduced ? [1, 1] : [0, 1]);
  const detailY = useTransform(scrollYProgress, [0.55, 0.8], reduced ? ["0%", "0%"] : ["40%", "0%"]);
  const time = useTransform(scrollYProgress, (value) => timecode(value));

  return (
    <section
      id="reel"
      ref={sectionRef}
      className="relative h-[280svh] bg-[#0a0a0a]"
      aria-label="Showreel"
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
        <motion.div
          className="relative h-full w-full overflow-hidden bg-[#161616]"
          style={{ scale, borderRadius: radius }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{
              scale: imageScale,
              backgroundImage:
                "linear-gradient(rgba(10,10,10,0.35), rgba(10,10,10,0.35)), url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=2200&q=90')",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0),rgba(10,10,10,0.7))]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-transparent to-[#0a0a0a]/50" />

          {/* Viewfinder corners */}
          <span aria-hidden="true" className="absolute left-5 top-5 h-8 w-8 border-l border-t border-white/60 sm:left-10 sm:top-10" />
          <span aria-hidden="true" className="absolute right-5 top-5 h-8 w-8 border-r border-t border-white/60 sm:right-10 sm:top-10" />
          <span aria-hidden="true" className="absolute bottom-5 left-5 h-8 w-8 border-b border-l border-white/60 sm:bottom-10 sm:left-10" />
          <span aria-hidden="true" className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-white/60 sm:bottom-10 sm:right-10" />

          {/* Editorial frame markers — this is a visual study, not a claimed live reel. */}
          <div className="absolute left-9 top-9 text-[9px] uppercase tracking-[0.24em] text-white/75 sm:left-16 sm:top-16">
            AHVAÉ <span className="text-[#d4af37]">/</span> Visual notes
          </div>
          <span className="absolute right-9 top-9 font-mono text-[9px] tracking-[0.18em] text-white/65 sm:right-16 sm:top-16">
            FRAME STUDY — 01
          </span>

          {/* Title that departs as the frame opens */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <p className="gold-kicker mb-5 text-[9px] font-semibold">A visual study</p>
            <h2 className="font-editorial text-[clamp(3.5rem,14vw,13rem)] leading-[0.9] tracking-[-0.06em] text-[#f8f9fa]">
              Show<span className="italic text-[#d4af37]">reel</span>
            </h2>
          </motion.div>

          {/* Details that arrive once the frame is full */}
          <motion.div
            className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-6 px-9 pb-12 sm:flex-row sm:items-end sm:px-16 sm:pb-20"
            style={{ opacity: detailOpacity, y: detailY }}
          >
            <div>
              <p className="gold-kicker mb-4 text-[9px] font-semibold">
                Motion · Light · Feeling
              </p>
              <p className="font-editorial max-w-[640px] text-[clamp(1.8rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.04em] text-[#f8f9fa]">
                Light, movement, <span className="italic text-white/70">and the feeling between them.</span>
              </p>
            </div>
            <a
              href="#work"
              className="glass-panel group inline-flex w-fit items-center gap-5 rounded-full px-6 py-4 text-[9px] uppercase tracking-[0.19em] text-white transition-colors duration-300 hover:border-[#d4af37]/60"
            >
              See selected work
              <span className="text-lg text-[#d4af37] transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
