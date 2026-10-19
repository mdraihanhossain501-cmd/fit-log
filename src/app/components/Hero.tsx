export default function Hero() {
  return (
    <section className="border-b border-zinc-800 py-16 md:py-24 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-[#ccff00] text-sm tracking-widest uppercase font-bold">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase my-4 font-display leading-none">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 text-lg mb-8 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 uppercase tracking-wide rounded hover:bg-[#b3e600] transition"
          >
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center">
          <p className="text-zinc-600 font-bold uppercase">Hero Banner Image</p>
        </div>
      </div>
    </section>
  );
}