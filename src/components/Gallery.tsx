"use client";

import { useState } from "react";
import { motion } from "motion/react";

const projects = [
  {
    id: "form",
    index: "01",
    title: "The Human Form",
    category: "Portraiture",
    year: "Visual study",
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
            A considered collection
          </p>
          <h2 className="font-editorial text-[clamp(3.25rem,7vw,6.6rem)] leading-[0.92] tracking-[-0.055em] text-[#0a0a0a]">
            Selected <span className="italic text-black/40">work.</span>
          </h2>
        </div>
        <p className="max-w-[300px] text-[11px] leading-6 text-black/55 md:pb-2 md:text-right">
          A glimpse into the imagery, atmosphere and stories that shape our
          creative practice.
        </p>
      </div>

      <div
        className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-5"
        onMouseLeave={() => setActiveProject(null)}
      >
        {projects.map((project) => {
          const isActive = activeProject === project.id;
          const isDimmed = activeProject !== null && !isActive;

          return (
            <motion.button
              key={project.id}
              type="button"
              layout
              onMouseEnter={() => setActiveProject(project.id)}
              onFocus={() => setActiveProject(project.id)}
              onBlur={() => setActiveProject(null)}
              onClick={() =>
                setActiveProject((current) =>
                  current === project.id ? null : project.id,
                )
              }
              animate={{ opacity: isDimmed ? 0.48 : 1 }}
              transition={{
                layout: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.45 },
              }}
              className={`project-card group relative col-span-12 h-[390px] overflow-hidden bg-[#d8d5ce] text-left sm:h-[460px] lg:h-[540px] ${isActive ? "md:col-span-6" : "md:col-span-2"} `}
              aria-label={`View ${project.title}, ${project.category}`}
            >
              <div
                role="img"
                aria-label={project.alt}
                className="project-image absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${project.image}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/10 transition-opacity duration-700 group-hover:from-black/80" />
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[8px] uppercase tracking-[0.22em] text-white/75 sm:left-7 sm:right-7 sm:top-7">
                <span>{project.index} / 04</span>
                <span className="text-[#e2c773]">{project.category}</span>
              </div>
              <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between gap-3 text-white sm:bottom-8 sm:left-7 sm:right-7">
                <div>
                  <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-white/55">
                    {project.year}
                  </p>
                  <h3 className="font-editorial text-[clamp(1.7rem,3vw,3.1rem)] leading-[0.98] tracking-[-0.035em]">
                    {project.title}
                  </h3>
                </div>
                <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/45 text-sm transition-all duration-500 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0a0a0a]">
                  ↗
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-black/15 pt-5">
        <span className="text-[8px] uppercase tracking-[0.22em] text-black/45">
          Film · Photography · Creative direction
        </span>
        <span className="text-[8px] uppercase tracking-[0.22em] text-black/45">
          AHVAÉ Studios
        </span>
      </div>
    </section>
  );
}
