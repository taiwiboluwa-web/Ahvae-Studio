"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Scrollytelling from "@/components/Scrollytelling";
import Gallery from "@/components/Gallery";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="relative min-h-screen overflow-clip bg-[#f8f9fa]">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            key="ahvae-preloader"
            onComplete={handlePreloaderComplete}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          opacity: isLoading ? 0 : 1,
          y: isLoading ? 16 : 0,
        }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        aria-hidden={isLoading}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        <Hero />
        <Scrollytelling />
        <Gallery />

        <footer
          id="contact"
          className="relative overflow-hidden bg-[#0a0a0a] px-6 pb-9 pt-24 text-[#f8f9fa] sm:px-10 sm:pt-32 lg:px-16"
        >
          <div className="absolute -right-28 -top-32 h-[420px] w-[420px] rounded-full bg-[#d4af37]/[0.08] blur-[100px]" />
          <div className="relative z-10 mx-auto max-w-[1500px]">
            <div className="mb-16 flex flex-col justify-between gap-8 border-b border-white/15 pb-12 md:flex-row md:items-end">
              <div>
                <p className="gold-kicker mb-5 text-[9px] font-semibold">
                  The next frame begins here
                </p>
                <h2 className="font-editorial text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.055em]">
                  Have a story
                  <br />
                  <span className="italic text-white/45">to tell?</span>
                </h2>
              </div>
              <a
                href="mailto:ahvaestudios@gmail.com?subject=Project%20enquiry%20%E2%80%94%20AHVA%C3%89%20Studios"
                className="glass-panel group inline-flex w-fit items-center gap-6 rounded-full px-6 py-4 text-[9px] uppercase tracking-[0.19em] transition-colors hover:border-[#d4af37]/60"
              >
                <span>Start a conversation</span>
                <span className="text-lg text-[#d4af37] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>

            <div className="grid gap-10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-4 text-[8px] uppercase tracking-[0.25em] text-white/35">
                  Studio
                </p>
                <p className="font-editorial text-2xl">AHVAÉ Studios</p>
                <p className="mt-2 text-[10px] text-white/50">
                  Visual storytelling with intention.
                </p>
              </div>
              <div>
                <p className="mb-4 text-[8px] uppercase tracking-[0.25em] text-white/35">
                  Explore
                </p>
                <div className="flex flex-col items-start gap-3 text-[10px] text-white/65">
                  <a className="transition-colors hover:text-[#d4af37]" href="#approach">Our approach</a>
                  <a className="transition-colors hover:text-[#d4af37]" href="#work">Selected work</a>
                  <a className="transition-colors hover:text-[#d4af37]" href="#home">Back to top ↑</a>
                </div>
              </div>
              <div>
                <p className="mb-4 text-[8px] uppercase tracking-[0.25em] text-white/35">
                  Get in touch
                </p>
                <a
                  href="mailto:ahvaestudios@gmail.com"
                  className="text-[10px] text-white/70 transition-colors hover:text-[#d4af37]"
                >
                  ahvaestudios@gmail.com
                </a>
                <a
                  href="https://www.instagram.com/ahvaestudios/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block text-[10px] text-white/50 transition-colors hover:text-[#d4af37]"
                >
                  Instagram ↗
                </a>
              </div>
              <div>
                <p className="mb-4 text-[8px] uppercase tracking-[0.25em] text-white/35">
                  Based in
                </p>
                <p className="text-[10px] text-white/70">Ontario, Canada</p>
                <p className="mt-2 text-[10px] text-white/40">
                  Available for selected projects.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-[8px] uppercase tracking-[0.18em] text-white/35 sm:flex-row">
              <span>© {new Date().getFullYear()} AHVAÉ Studios. All rights reserved.</span>
              <span>Made with intention.</span>
            </div>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
