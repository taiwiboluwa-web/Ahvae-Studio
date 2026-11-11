"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1800&q=90",
    alt: "Editorial portrait in soft directional light",
    note: "A closer study of expression, gesture and the quiet confidence of a portrait.",
  },
  {
    id: "arrival",
    index: "02",
    title: "The Art of Arrival",
    category: "Events",
    year: "Visual study",
    blurb: "The first moments of an evening, held in warm, quiet light.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=90",
    alt: "Elegant event setting with warm evening light",
    note: "An atmosphere-led event direction, where the details make the memory.",
  },
  {
    id: "still",
    index: "03",
    title: "A Study in Stillness",
    category: "Photography",
    year: "Visual study",
    blurb: "Minimal compositions where space does the storytelling.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1800&q=90",
    alt: "Minimal still life arrangement in a quiet interior",
    note: "A considered frame built around texture, negative space and natural light.",
  },
  {
    id: "motion",
    index: "04",
    title: "The Moving Image",
    category: "Film",
    year: "Visual study",
    blurb: "Cinematic frames built on rhythm, atmosphere and feeling.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1800&q=90",
    alt: "Camera operator working on a film production",
    note: "A cinematic language for stories that deserve to be seen and felt.",
  },
];

export default function Gallery() {
  const [hoverProject, setHoverProject] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null;
  const selectedIndex = projects.findIndex((project) => project.id === selectedProjectId);

  useEffect(() => {
    if (!selectedProjectId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProjectId(null);
      if (event.key === "ArrowRight") {
        setSelectedProjectId(projects[(selectedIndex + 1) % projects.length].id);
      }
      if (event.key === "ArrowLeft") {
        setSelectedProjectId(projects[(selectedIndex - 1 + projects.length) % projects.length].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProjectId, selectedIndex]);

  const moveProject = (direction: -1 | 1) => {
    const nextIndex = (selectedIndex + direction + projects.length) % projects.length;
    setSelectedProjectId(projects[nextIndex].id);
  };

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
          A set of conceptual explorations showing the moods, compositions and visual direction AHVAÉ is building toward. These are studio studies, not commissioned client projects.
        </p>
      </div>

      <div
        className="flex flex-col gap-3 sm:gap-4 md:flex-row lg:gap-5"
        onMouseLeave={() => setHoverProject(null)}
      >
        {projects.map((project) => {
          const isActive = hoverProject === project.id;
          const isDimmed = hoverProject !== null && !isActive;

          return (
            <motion.button
              key={project.id}
              type="button"
              data-cursor="view"
              onMouseEnter={() => setHoverProject(project.id)}
              onFocus={() => setHoverProject(project.id)}
              onBlur={() =>
                setHoverProject((current) =>
                  current === project.id ? null : current,
                )
              }
              onClick={() => setSelectedProjectId(project.id)}
              aria-haspopup="dialog"
              aria-expanded={selectedProjectId === project.id}
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
              aria-label={`Open ${project.title}, ${project.category} visual study`}
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
                <span className="mt-5 inline-flex items-center gap-3 text-[8px] uppercase tracking-[0.2em] text-white/80">
                  Open visual study
                  <span className="text-[#e2c773] transition-transform duration-500 group-hover:translate-x-1">↗</span>
                </span>
              </div>
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

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="visual-study-viewer"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} visual study`}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#080808]/95 p-4 text-white backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelectedProjectId(null);
            }}
          >
            <motion.div
              className="relative flex h-full max-h-[900px] w-full max-w-[1500px] flex-col overflow-hidden border border-white/15 bg-[#111]"
              initial={{ y: 28, scale: 0.975, clipPath: "inset(8% 4% 8% 4%)" }}
              animate={{ y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ y: 18, scale: 0.985, opacity: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <div className="relative flex items-center justify-between border-b border-white/15 px-5 py-4 sm:px-8">
                <span className="text-[8px] uppercase tracking-[0.25em] text-white/50">
                  AHVAÉ / Selected visual study
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProjectId(null)}
                  className="inline-flex items-center gap-3 text-[8px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-[#e2c773]"
                  aria-label="Close visual study"
                >
                  Close <span className="text-lg leading-none">×</span>
                </button>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden">
                <motion.div
                  key={selectedProject.id}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${selectedProject.image}")` }}
                  initial={{ scale: 1.08, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.1, ease: EASE }}
                  role="img"
                  aria-label={selectedProject.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/20" />
                <div className="absolute left-6 top-6 flex items-center gap-3 text-[8px] uppercase tracking-[0.22em] text-white/70 sm:left-10 sm:top-10">
                  <span className="text-[#e2c773]">{selectedProject.index}</span>
                  <span className="h-px w-8 bg-white/45" />
                  {selectedProject.category}
                </div>
                <div className="absolute inset-x-6 bottom-8 flex flex-col justify-between gap-8 sm:inset-x-10 sm:bottom-12 lg:flex-row lg:items-end">
                  <div className="max-w-[760px]">
                    <p className="gold-kicker mb-4 text-[8px] font-semibold">
                      {selectedProject.year}
                    </p>
                    <h3 className="font-editorial text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.055em]">
                      {selectedProject.title}
                    </h3>
                    <p className="mt-5 max-w-[520px] text-[11px] leading-7 text-white/75 sm:text-sm">
                      {selectedProject.note}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => moveProject(-1)}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 text-lg transition-colors hover:border-[#e2c773] hover:text-[#e2c773]"
                      aria-label="Previous visual study"
                    >
                      ←
                    </button>
                    <span className="min-w-[58px] text-center font-mono text-[9px] tracking-[0.18em] text-white/60">
                      {selectedProject.index} / 04
                    </span>
                    <button
                      type="button"
                      onClick={() => moveProject(1)}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 text-lg transition-colors hover:border-[#e2c773] hover:text-[#e2c773]"
                      aria-label="Next visual study"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
