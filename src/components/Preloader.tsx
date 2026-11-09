"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const portfolioImages = [
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=85",
  "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=800&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=85",
  "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&q=85",
  "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=85",
  "https://images.unsplash.com/photo-1551166708-41712a6f2382?w=800&q=85",
  "https://images.unsplash.com/photo-1520113110903-88bc114bd38b?w=800&q=85",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85",
];

type PreloaderProps = {
  onComplete: () => void;
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let completionTimer: number | undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const intervalDuration = reducedMotion ? 8 : 24;

    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(progressTimer);
          completionTimer = window.setTimeout(onComplete, reducedMotion ? 100 : 700);
          return 100;
        }

        return Math.min(current + 1, 100);
      });
    }, intervalDuration);

    return () => {
      window.clearInterval(progressTimer);
      if (completionTimer !== undefined) {
        window.clearTimeout(completionTimer);
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f8f9fa] text-[#0a0a0a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.035, filter: "blur(12px)" }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label={`Loading AHVAÉ Studios, ${progress} percent`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.09),transparent_56%)]" />

      <div className="relative flex h-[300px] w-[300px] items-center justify-center sm:h-[390px] sm:w-[390px]">
        <div className="absolute h-[230px] w-[230px] rounded-full border border-black/10 sm:h-[300px] sm:w-[300px]" />
        <div className="absolute h-[260px] w-[260px] rounded-full border border-[#d4af37]/25 sm:h-[340px] sm:w-[340px]" />

        <div className="absolute inset-0" style={{ perspective: "1100px" }}>
          <motion.div
            className="preloader-ring absolute inset-0"
            animate={{ rotateY: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {portfolioImages.map((src, index) => {
              const angle = (index / portfolioImages.length) * 360;

              return (
                <div
                  key={src}
                  className="preloader-ring-card grayscale"
                  role="img"
                  aria-label={`AHVAÉ portfolio image ${index + 1}`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(10,10,10,.08),rgba(10,10,10,.08)),url("${src}")`,
                    transform: `rotateY(${angle}deg) translateZ(clamp(190px, 25vw, 310px))`,
                  }}
                />
              );
            })}
          </motion.div>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <motion.p
            className="mb-2 text-[9px] font-medium uppercase tracking-[0.42em] text-[#9c7d28] sm:text-[10px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AHVAÉ Studios
          </motion.p>
          <motion.h1
            className="font-editorial text-[5.5rem] leading-none tracking-[-0.07em] text-[#0a0a0a] sm:text-[7.5rem]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {progress}
            <span className="ml-1 align-top font-sans text-[1.35rem] font-light tracking-normal text-[#9c7d28] sm:text-[1.7rem]">
              %
            </span>
          </motion.h1>
          <div className="mt-5 h-px w-24 overflow-hidden bg-black/10">
            <motion.div
              className="h-full origin-left bg-[#d4af37]"
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          </div>
          <p className="mt-4 text-[8px] uppercase tracking-[0.32em] text-black/45 sm:text-[9px]">
            A story is taking shape
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-7 right-7 flex items-center justify-between text-[8px] uppercase tracking-[0.25em] text-black/40 sm:bottom-10 sm:left-12 sm:right-12">
        <span>Film · Photography · Direction</span>
        <span>Ontario, Canada</span>
      </div>
    </motion.div>
  );
}
