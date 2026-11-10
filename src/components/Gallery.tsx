"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const projects = [
  {
    id: "form",
    index: "01",
    title: "The Human Form",
    category: "Portraiture",
    year: "Concept study",
    blurb: "Portraits shaped by soft light, restraint and presence.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1500&q=90",
    alt: "Editorial portrait in soft directional light",
  },
  {
    id: "arrival",
    index: "02",
    title: "The Art of Arrival",
    category: "Events",
    year: "Visual study",
    blurb: "The first moments of an evening, held in warm, quiet light.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1500&q=90",
    alt: "Elegant event setting with warm evening light",
  },
  {
    id: "still",
    index: "03",
    title: "A Study in Stillness",
    category: "Photography",
    year: "Visual study",
    blurb: "Minimal compositions where space does the storytelling.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1500&q=90",
    alt: "Minimal still life arrangement in a quiet interior",
  },
  {
    id: "motion",
    index: "04",
    title: "The Moving Image",
    category: "Film",
    year: "Visual study",
    blurb: "Cinematic frames built on rhythm, atmosphere and feeling.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1500&q=90",
    alt: "Camera operator working on a film production",
  },
];

export default function Gallery() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section id="work" className="bg-[#f8f9fa] px-6 pb-28 pt-24 sm:px-10 sm:pb-36 sm:pt-32 lg:px-16">
      <div className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">
        <div>
          <p className="gold-kicker mb-4 text-[9px] font-semibold">
            The visual language
          </p>
          <h2 className="font-editorial text-[clamp(3.25rem,7vw,6.6rem)] leading-[0.92] tracking-[-0.055em] text-[#0a0a0a]">
            <Reveal>
              Visual <span className="italic text-black/40">studies.</span>
            </Reveal>
          </h2>
        </div>
        <p className="max-w-[300px] text-[11px] leading-6 text-black/55 md:pb-2 md:text-right">
          A set of conceptual explorations showing the moods, compositions and visual direction AHVAÉ is building toward.
        </p>
      </div>

      {/* The row always fills its width. Hovering grows one card's flex-grow
          and dims the rest, so nothing wraps or shifts the page layout. */}
      <div
        className="flex flex-col gap-3 sm:gap-4 md:flex-row lg:gap-5"
        onMouseLeave={() => setActiveProject(null)}
      >
        {projects.map((project) => {
          const isActive = activeProject === project.id;
          const isDimmed = activeProject !== null && !isActive;

          return (
            <motion.button
              key={project.id}
              type="button"
              data-cursor="view"
              onMouseEnter={() => setActiveProject(project.id)}
              onFocus={() => setActiveProject(project.id)}
              onBlur={() =>
                setActiveProject((current) =>
                  current === project.id ? null : current,
                )
              }
              onClick={() =>
                setActiveProject((current) =>
                  current === project.id ? null : project.id,
                )
              }
              initial={false}
              animate={{
                flexGrow: isActive ? 2.8 : 1,
                opacity: isDimmed ? 0.42 : 1,
              }}
              transition={{
                flexGrow: { duration: 0.8, ease: EASE },
                opacity: { duration: 0.45 },
              }}
              className="project-card group relative h-[390px] min-w-0 basis-auto overflow-hidden bg-[#d8d5ce] text-left sm:h-[460px] md:basis-0 lg:h-[540px]"
              aria-label={`View ${project.title}, ${project.category}`}
            >
              <div
                role="img"
                aria-label={project.alt}
                className="project-image absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${project.image}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[8px] uppercase tracking-[0.22em] text-white/75 sm:left-7 sm:right-7 sm:top-7">
                <span>{project.index} / 04</span>
                <span className="text-[#e2c773]">{project.category}</span>
              </div>

              {/* Fixed-width text block so copy never reflows mid-expansion */}
              <div className="absolute bottom-6 left-5 w-[calc(100%-2.5rem)] text-white sm:bottom-8 sm:left-7 sm:w-[calc(100%-3.5rem)] md:w-[clamp(220px,22vw,380px)]">
                <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-white/55">
                  {project.year}
                </p>
                <h3 className="font-editorial text-[clamp(1.7rem,3vw,3.1rem)] leading-[0.98] tracking-[-0.035em]">
                  {project.title}
                </h3>
                <motion.p
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 14,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: isActive ? 0.15 : 0,
                  }}
                  className="mt-3 hidden max-w-[300px] text-[11px] leading-6 text-white/70 md:block"
                >
                  {project.blurb}
                </motion.p>
              </div>

              <span className="absolute bottom-6 right-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/45 text-sm text-white transition-all duration-500 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0a0a0a] sm:bottom-8 sm:right-7">
                ↗
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-black/15 pt-5">
        <span className="text-[8px] uppercase tracking-[0.22em] text-black/45">
          Conceptual imagery · Visual direction
        </span>
        <span className="text-[8px] uppercase tracking-[0.22em] text-black/45">
          AHVAÉ Studios
        </span>
      </div>
    </section>
  );
}
