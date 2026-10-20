export default function Hero() {
  return (
    <section className="py-6 md:py-10 px-4 max-w-7xl mx-auto">
      <div className="bg-[#121215] border border-zinc-800/80 rounded-[28px] p-8 md:p-14 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
        {/* Left Text Block */}
        <div className="max-w-xl">
          <span className="text-[#CCFF00] text-[11px] font-black tracking-widest uppercase block mb-4">
            WORKOUT LIBRARY
          </span>

          <h1 className="text-4xl md:text-[52px] lg:text-[56px] font-black uppercase font-display leading-[0.95] tracking-tight text-white mb-6 max-w-125">
            TRAIN WITH INTENT. LOG<br />
            EVERY SET.
          </h1>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 font-normal max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center justify-center bg-[#CCFF00] text-black font-extrabold text-xs px-7 py-3.5 uppercase tracking-wide rounded-2xl hover:bg-[#b3e600] transition duration-200"
          >
            BROWSE WORKOUTS
          </a>
        </div>

        {/* Right Illustration */}
        <div className="relative h-64 md:h-80 flex items-center justify-center">
          <img
            src="/assets/banner.png"
            alt="Preacher Curl Machine Illustration"
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}