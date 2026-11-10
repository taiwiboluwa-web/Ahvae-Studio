import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-center text-[#f8f9fa]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,175,55,0.16), rgba(10,10,10,0) 70%)",
        }}
      />

      <p className="gold-kicker relative mb-6 text-[9px] font-semibold">
        Error 404
      </p>
      <h1 className="font-editorial relative text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] tracking-[-0.06em]">
        Scene <span className="italic text-[#d4af37]">missing.</span>
      </h1>
      <p className="relative mt-8 max-w-[380px] text-[12px] leading-7 text-white/55">
        The page you are looking for was cut from the final edit. Let&rsquo;s get
        you back to the story.
      </p>
      <Link
        href="/"
        className="glass-panel relative mt-12 inline-flex items-center gap-4 rounded-full px-7 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-[#d4af37]/60 hover:text-[#d4af37]"
      >
        Return to the studio
      </Link>
    </main>
  );
}
