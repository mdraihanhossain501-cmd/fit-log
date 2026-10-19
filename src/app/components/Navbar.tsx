"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { planItems, savedItems } = usePlan();

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wider uppercase font-display">
          <Dumbbell className="h-6 w-6 text-[#ccff00]" />
          <span>FITLOG</span>
        </Link>

        {/* Links */}
        <nav className="flex gap-6 font-medium text-sm">
          <Link
            href="/"
            className={pathname === "/" ? "text-[#ccff00] underline underline-offset-8" : "text-zinc-400 hover:text-white"}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={pathname === "/my-plan" ? "text-[#ccff00] underline underline-offset-8" : "text-zinc-400 hover:text-white"}
          >
            My Plan
          </Link>
        </nav>

        {/* Badges */}
        <div className="flex items-center gap-3">
          <Link href="/my-plan" className="bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
            Plan ({planItems.length})
          </Link>
          <Link href="/my-plan" className="border border-zinc-700 text-white px-3 py-1 rounded-full text-xs font-bold uppercase hover:border-zinc-500">
            Saved ({savedItems.length})
          </Link>
        </div>
      </div>
    </header>
  );
}