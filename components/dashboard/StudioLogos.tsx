import Link from "next/link";

const studios = ["MARVEL", "PIXAR", "WARNER BROS.", "NETFLIX", "A24", "DC"];

const StudioLogos = () => (
  <section aria-label="Studios and franchises" className="mt-5">
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
      {studios.map((studio) => (
        <Link key={studio} href={`/search?q=${encodeURIComponent(studio)}`} className="flex h-14 min-w-[112px] items-center justify-center rounded-xl border border-white/[0.07] bg-dashboard-card px-5 text-center text-[10px] font-bold tracking-[0.16em] text-slate-400 transition hover:-translate-y-0.5 hover:border-dashboard-accent/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent">
          {studio}
        </Link>
      ))}
    </div>
  </section>
);

export default StudioLogos;
