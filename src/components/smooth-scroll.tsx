"use client";

import { useEffect, type PropsWithChildren } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      anchors: true,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        window.cancelAnimationFrame(frameId);
        lenis.destroy();
      }
    };

    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      motionPreference.removeEventListener("change", handleMotionChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
