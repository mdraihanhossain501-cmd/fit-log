export default function Hero() {
  return (
    <section className="border-b border-zinc-800 py-16 md:py-24 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-[#CCFF00] text-xs font-extrabold tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase my-4 font-display leading-none tracking-tight">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#CCFF00] text-black font-extrabold px-6 py-3.5 uppercase tracking-wide rounded-md hover:bg-[#b3e600] transition"
          >
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center">
          <p className="text-zinc-600 font-bold uppercase tracking-wider">Hero Banner Image</p>
        </div>
      </div>
    </section>
  );
}