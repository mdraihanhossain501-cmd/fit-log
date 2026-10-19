import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-lg uppercase font-display">
          <Dumbbell className="h-5 w-5 text-[#CCFF00]" />
          <span>FITLOG</span>
        </div>
        <p className="text-zinc-500 text-xs">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}