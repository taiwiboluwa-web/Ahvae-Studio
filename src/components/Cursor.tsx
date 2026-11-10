"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorMode = "idle" | "link" | "view";

const SCALE: Record<CursorMode, number> = {
  idle: 0.32,
  link: 1.25,
  view: 2.3,
};

const FILL: Record<CursorMode, string> = {
  idle: "rgba(212,175,55,1)",
  link: "rgba(212,175,55,0)",
  view: "rgba(212,175,55,1)",
};

/**
 * A refined gold cursor for fine-pointer devices. It is not rendered on
 * touch screens or for visitors who prefer reduced motion.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("idle");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.35 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    setEnabled(true);

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      const interactive = target?.closest?.("[data-cursor], a, button");

      if (!interactive) {
        setMode("idle");
        return;
      }

      setMode(
        interactive.getAttribute("data-cursor") === "view" ? "view" : "link",
      );
    };

    const handleLeave = () => setVisible(false);

    document.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-[#d4af37]"
        animate={{ scale: SCALE[mode], backgroundColor: FILL[mode] }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
      <span
        className="absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center text-[7px] font-semibold uppercase tracking-[0.18em] text-[#0a0a0a] transition-opacity duration-300"
        style={{ opacity: mode === "view" ? 1 : 0 }}
      >
        View
      </span>
    </motion.div>
  );
}
