export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-lg uppercase font-display">
          <img src="/assets/logo.png" alt="FitLog Logo" className="h-6 w-auto object-contain" />
          <span>FITLOG</span>
        </div>
        <p className="text-zinc-500 text-xs">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}