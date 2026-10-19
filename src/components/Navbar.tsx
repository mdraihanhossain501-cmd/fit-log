"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planItems, savedItems } = usePlan();

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wider uppercase font-display">
          <img src="/assets/logo.png" alt="FitLog Logo" className="h-7 w-auto object-contain" />
          <span>FITLOG</span>
        </Link>

        <nav className="flex gap-6 font-medium text-sm">
          <Link
            href="/"
            className={pathname === "/" ? "text-[#CCFF00] underline underline-offset-8 font-bold" : "text-zinc-400 hover:text-white"}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={pathname === "/my-plan" ? "text-[#CCFF00] underline underline-offset-8 font-bold" : "text-zinc-400 hover:text-white"}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/my-plan" className="bg-[#CCFF00] text-black px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Plan ({planItems.length})
          </Link>
          <Link href="/my-plan" className="border border-zinc-700 text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide hover:border-zinc-500">
            Saved ({savedItems.length})
          </Link>
        </div>
      </div>
    </header>
  );
}