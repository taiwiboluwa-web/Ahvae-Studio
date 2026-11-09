"use client";

import { motion, type Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(7px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="cinematic-grain relative flex min-h-[760px] h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-[#f8f9fa]"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 scale-[1.04] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?w=2200&q=90')",
          }}
          initial={{ scale: 1.12, opacity: 0.55 }}
          animate={{ scale: 1.02, opacity: 0.42 }}
          transition={{ duration: 12, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(36,35,31,0.10),rgba(10,10,10,0.82)_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-[#0a0a0a]" />
      </div>

      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-7 sm:px-10 lg:px-16">
        <a
          href="#home"
          aria-label="AHVAÉ Studios home"
          className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white"
        >
          AHVAÉ <span className="font-normal text-white/45">Studios</span>
        </a>
        <nav className="hidden items-center gap-9 text-[9px] uppercase tracking-[0.22em] text-white/65 md:flex">
          <a className="transition-colors hover:text-[#d4af37]" href="#approach">Approach</a>
          <a className="transition-colors hover:text-[#d4af37]" href="#work">Selected work</a>
          <a className="transition-colors hover:text-[#d4af37]" href="#contact">Contact</a>
        </nav>
        <a
          href="#contact"
          className="glass-panel rounded-full px-4 py-2.5 text-[9px] uppercase tracking-[0.18em] text-white/90 transition-colors hover:border-[#d4af37]/60 hover:text-[#d4af37] sm:px-5"
        >
          Start a project <span className="ml-2 text-[#d4af37]">↗</span>
        </a>
      </header>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 text-center sm:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="mb-7 flex items-center gap-3">
          <span className="h-px w-8 bg-[#d4af37]/80" />
          <p className="gold-kicker text-[9px] font-medium sm:text-[10px]">
            A visual production studio
          </p>
          <span className="h-px w-8 bg-[#d4af37]/80" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-editorial text-[clamp(3.25rem,8.3vw,7.6rem)] font-normal leading-[0.99] tracking-[-0.055em] text-balance"
        >
          Visual storytelling for
          <br />
          <span className="font-normal italic text-white/75">
            brands, businesses
            <br className="sm:hidden" /> &amp; events.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-9 max-w-[480px] text-[10px] leading-7 tracking-[0.15em] text-white/58 sm:text-[11px]"
        >
          FILM <span className="mx-3 text-[#d4af37]">/</span>
          PHOTOGRAPHY <span className="mx-3 text-[#d4af37]">/</span>
          CREATIVE DIRECTION
        </motion.p>

        <motion.a
          variants={itemVariants}
          href="#approach"
          className="mt-14 inline-flex items-center gap-4 text-[9px] uppercase tracking-[0.25em] text-white/65 transition-colors hover:text-[#d4af37]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-base">
            ↓
          </span>
          Explore the studio
        </motion.a>
      </motion.div>

      <div className="absolute bottom-8 left-7 right-7 z-10 flex items-end justify-between text-[8px] uppercase tracking-[0.22em] text-white/40 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
        <span>Ontario, Canada</span>
        <span className="text-right">Images with intention.<br className="sm:hidden" /> Stories with presence.</span>
      </div>
    </section>
  );
}
