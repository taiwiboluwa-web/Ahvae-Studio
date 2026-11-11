const items = [
  "Film with feeling",
  "Images that linger",
  "Creative direction",
  "Good light. Better stories.",
  "No filler. All feeling.",
  "Made with intention.",
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={item} className="flex items-center">
          <span
            className={`font-editorial whitespace-nowrap text-[clamp(2rem,5.2vw,4.6rem)] leading-none tracking-[-0.04em] ${
              index % 2 === 0 ? "text-[#f8f9fa]" : "italic text-[#d4af37]"
            }`}
          >
            {item}
          </span>
          <span className="mx-7 text-sm text-[#d4af37]/70 sm:mx-10" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/** A slow, endless ribbon of disciplines. Pauses on hover. */
export default function Marquee() {
  return (
    <section
      aria-label="Disciplines"
      className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-8 sm:py-10"
    >
      <div className="marquee-track flex w-max items-center">
        <Group />
        <Group hidden />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent sm:w-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent sm:w-40"
      />
    </section>
  );
}
