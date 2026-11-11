"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Scrollytelling from "@/components/Scrollytelling";
import Gallery from "@/components/Gallery";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Process from "@/components/Process";
import Booking from "@/components/Booking";
import Showreel from "@/components/Showreel";
import Magnetic from "@/components/Magnetic";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const lenis = useLenis();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  /* Keep the page still while the preloader is on screen. Lenis is paused
     when it is active, and native overflow is locked as a fallback for
     visitors who prefer reduced motion (where Lenis is not mounted). */
  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    if (isLoading) {
      root.style.overflow = "hidden";
      lenis?.stop();
    } else {
      root.style.overflow = previousOverflow;
      lenis?.start();
    }

    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [isLoading, lenis]);

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

      {/* Fixed layers live outside the animated wrapper so transforms on it
          can never break their positioning. */}
      <Cursor />
      {!isLoading && <Nav />}

      <motion.div
        animate={{
          opacity: isLoading ? 0 : 1,
          y: isLoading ? 16 : 0,
        }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        aria-hidden={isLoading}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        <Hero ready={!isLoading} />
        <Marquee />
        <Manifesto />
        <Scrollytelling />
        <Showreel />
        <Gallery />
        <Process />
        <Booking />

        <footer
          id="contact"
          className="relative overflow-hidden bg-[#0a0a0a] px-6 pb-9 pt-24 text-[#f8f9fa] sm:px-10 sm:pt-32 lg:px-16"
        >
          <div className="absolute -right-28 -top-32 h-[420px] w-[420px] rounded-full bg-[#d4af37]/[0.08] blur-[100px]" />
          <div className="relative z-10 mx-auto max-w-[1500px]">
            <div className="mb-16 flex flex-col justify-between gap-8 border-b border-white/15 pb-12 md:flex-row md:items-end">
              <div>
                <p className="gold-kicker mb-5 text-[9px] font-semibold">
                  Got something worth feeling?
                </p>
                <h2 className="font-editorial text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.055em]">
                  Have something
                  <br />
                  <span className="italic text-white/45">worth feeling?</span>
                </h2>
              </div>
              <Magnetic className="inline-block w-fit">
                <a
                  href="mailto:ahvaestudios@gmail.com?subject=Project%20enquiry%20%E2%80%94%20AHVA%C3%89%20Studios"
                  className="glass-panel group inline-flex w-fit items-center gap-6 rounded-full px-6 py-4 text-[9px] uppercase tracking-[0.19em] transition-colors hover:border-[#d4af37]/60"
                >
                  <span>Start a conversation</span>
                </a>
              </Magnetic>
            </div>

            <div className="mb-16 grid gap-6 border-b border-white/15 pb-12 md:grid-cols-[minmax(0,220px)_1fr] md:gap-12">
              <p className="gold-kicker text-[9px] font-semibold">
                The studio point of view
              </p>
              <p className="font-editorial max-w-[860px] text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.18] tracking-[-0.03em] text-white/85">
                We make films and photographs with a clear point of view: thoughtful in the planning, alive in the moment, and impossible to mistake for filler.
              </p>
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
                  <a className="transition-colors hover:text-[#d4af37]" href="#process">How we work</a>
                  <a className="transition-colors hover:text-[#d4af37]" href="#book">Book the studio</a>
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
                  Instagram
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

            <p
              aria-hidden="true"
              className="font-editorial mb-10 select-none text-center text-[clamp(4.5rem,22vw,20rem)] leading-[0.82] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(212,175,55,0.35)]"
            >
              AHVAÉ
            </p>

            <div className="flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-[8px] uppercase tracking-[0.18em] text-white/35 sm:flex-row">
              <span>© {new Date().getFullYear()} AHVAÉ Studios. All rights reserved.</span>
              <span>Independent by design.</span>
            </div>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
