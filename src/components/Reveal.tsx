"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealProps = {
  children: ReactNode;
  delay?: number;
};

/**
 * One line of a heading that rises out of a mask when it scrolls into view.
 * Use one <Reveal> per visual line.
 */
export default function Reveal({ children, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <motion.span
        className="block"
        initial={reduced ? false : { y: "112%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
