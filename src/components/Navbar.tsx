"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planItems, savedItems } = usePlan();

  return (
    <header className="w-full bg-[#09090b] border-b border-zinc-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Brand Text (No Icon) */}
        <Link href="/" className="font-extrabold text-lg uppercase tracking-wider font-display text-white">
          FITLOG
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-xs font-bold transition ${
              pathname === "/"
                ? "bg-[#CCFF00]/15 text-[#CCFF00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-2 rounded-full text-xs font-bold transition ${
              pathname === "/my-plan"
                ? "bg-[#CCFF00]/15 text-[#CCFF00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Counter Badges */}
        <div className="flex items-center gap-4 text-xs font-semibold text-zinc-300">
          <Link href="/my-plan" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-zinc-400">Plan</span>
            <span className="bg-[#CCFF00] text-black w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">
              {planItems.length}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-zinc-400">Saved</span>
            <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
              {savedItems.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}