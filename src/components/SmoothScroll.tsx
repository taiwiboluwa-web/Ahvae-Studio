"use client";

import { useEffect, type PropsWithChildren } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.08,
      anchors: true,
    });

    let frameId = 0;
    let destroyed = false;

    const stop = () => {
      if (destroyed) return;
      destroyed = true;
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };

    const raf = (time: number) => {
      if (destroyed) return;
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) stop();
    };

    reducedMotion.addEventListener("change", onPreferenceChange);

    return () => {
      reducedMotion.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
