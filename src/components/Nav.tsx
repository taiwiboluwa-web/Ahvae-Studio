"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";

const links = [
  { label: "Approach", href: "#approach" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Book", href: "#book" },
];

/**
 * A gold reading-progress line is always present. The glass navigation bar
 * slides in once the visitor has scrolled past most of the hero.
 */
export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > window.innerHeight * 0.7;
    setVisible((current) => (current === next ? current : next));
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[#d4af37]"
        style={{ scaleX: progress }}
      />

      <motion.nav
        aria-label="Primary"
        inert={!visible}
        initial={false}
        animate={{ y: visible ? 0 : -96, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 top-4 z-[60] -ml-[min(46vw,340px)] w-[min(92vw,680px)] sm:top-5"
      >
        <div className="glass-panel flex items-center justify-between rounded-full bg-[#0a0a0a]/55 py-2.5 pl-6 pr-2.5 sm:pl-7">
          <a
            href="#home"
            aria-label="AHVAÉ Studios, back to top"
            className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white"
          >
            AHVAÉ
          </a>

          <ul className="hidden items-center gap-7 text-[9px] uppercase tracking-[0.2em] text-white/65 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors duration-300 hover:text-[#d4af37]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#book"
            className="rounded-full bg-[#d4af37] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a] transition-colors duration-300 hover:bg-[#f0d278]"
          >
            Book now
          </a>
        </div>
      </motion.nav>
    </>
  );
}
