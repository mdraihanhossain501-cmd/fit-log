"use client";

import { useState } from "react";
import { usePlan, getWorkoutCalories } from "@/context/PlanContext";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronDown, Clock, Flame, Star, X } from "lucide-react";

export default function MyPlanPage() {
  const { planItems, savedItems, removeFromPlan, markAsDone } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const totalExercises = planItems.length;
  const totalMinutes = planItems.reduce((acc, item) => acc + (Number(item.duration) || 0), 0);
  const totalCalories = planItems.reduce((acc, item) => acc + getWorkoutCalories(item), 0);

  const rawList = activeTab === "plan" ? planItems : savedItems;
  const currentList = [...rawList].sort((a, b) => {
    const valA = sortBy === "calories" ? getWorkoutCalories(a) : (Number(a[sortBy]) || 0);
    const valB = sortBy === "calories" ? getWorkoutCalories(b) : (Number(b[sortBy]) || 0);
    return valB - valA;
  });

  const handleMarkDone = (id: string, name: string) => {
    markAsDone(id);
    toast.success(`Completed ${name}!`);
  };

  const handleRemove = (id: string, name: string) => {
    removeFromPlan(id);
    toast.info(`Removed ${name} from plan`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold uppercase font-display tracking-tight mb-1">MY PLAN</h1>
        <p className="text-zinc-400 text-xs">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 grid grid-cols-3 divide-x divide-zinc-800 mb-8">
        <div className="pr-4">
          <span className="text-zinc-500 text-xs uppercase font-semibold block mb-2">Exercises</span>
          <span className="text-4xl font-extrabold font-display text-[#CCFF00]">{totalExercises} <span className="text-xl text-zinc-500">/ 5</span></span>
        </div>
        <div className="px-6">
          <span className="text-zinc-500 text-xs uppercase font-semibold block mb-2">Minutes</span>
          <span className="text-4xl font-extrabold font-display text-white">{totalMinutes} <span className="text-xl text-zinc-500">min</span></span>
        </div>
        <div className="pl-6">
          <span className="text-zinc-500 text-xs uppercase font-semibold block mb-2">Calories</span>
          <span className="text-4xl font-extrabold font-display text-white">{totalCalories} <span className="text-xl text-zinc-500">kcal</span></span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="bg-zinc-900/90 p-1 rounded-xl border border-zinc-800/80 inline-flex gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-2 rounded-lg transition ${
              activeTab === "plan" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({planItems.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg transition ${
              activeTab === "saved" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved ({savedItems.length})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 font-semibold">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
              className="bg-zinc-900 border border-zinc-800 text-white text-xs font-bold py-2 px-4 pr-8 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-[#CCFF00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Cards List / Empty State */}
      {currentList.length === 0 ? (
        <div className="border-2 border-dashed border-zinc-800/80 rounded-2xl py-20 text-center bg-zinc-950/40">
          <h2 className="text-2xl font-extrabold uppercase font-display mb-2 text-white">NOTHING HERE YET</h2>
          <p className="text-zinc-400 text-xs mb-6">Browse the library and add a lift to get today moving.</p>
          <Link
            href="/"
            className="inline-block bg-[#CCFF00] text-black font-extrabold uppercase px-6 py-2.5 rounded-xl hover:bg-[#b3e600] transition text-xs"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item) => (
            <div
              key={item.id}
              className={`bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between gap-4 ${
                item.isDone ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={`font-extrabold uppercase font-display text-base text-white ${item.isDone ? "line-through text-zinc-500" : ""}`}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mb-1">{item.equipment}</p>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-zinc-500" /> {item.duration} min</span>
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-zinc-500" /> {getWorkoutCalories(item)} kcal</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-zinc-500" /> {item.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/fitlog/${item.id}`}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase transition"
                >
                  View Details
                </Link>

                {activeTab === "plan" && (
                  <>
                    <button
                      onClick={() => handleMarkDone(item.id, item.name)}
                      disabled={item.isDone}
                      className={`px-5 py-2 rounded-xl text-xs font-extrabold uppercase transition ${
                        item.isDone
                          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                          : "bg-[#CCFF00] text-black hover:bg-[#b3e600]"
                      }`}
                    >
                      {item.isDone ? "Done" : "Mark as Done"}
                    </button>
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-zinc-500 hover:text-red-400 p-1.5 transition"
                      title="Remove exercise"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}