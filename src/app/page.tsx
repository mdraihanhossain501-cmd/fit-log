"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Link from "next/link";
import { Workout, getWorkoutCalories, getWorkoutCategories } from "@/context/PlanContext";
import { ChevronDown, Clock, Flame, Star } from "lucide-react";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Primary API failed");
        const data = await res.json();
        setWorkouts(data);
      } catch {
        try {
          const res = await fetch("https://api.api-store.workers.dev/api/fitlog");
          const data = await res.json();
          setWorkouts(data);
        } catch (fallbackErr) {
          console.error("Both APIs failed to load", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    const valA = sortBy === "calories" ? getWorkoutCalories(a) : (Number(a[sortBy]) || 0);
    const valB = sortBy === "calories" ? getWorkoutCalories(b) : (Number(b[sortBy]) || 0);
    return valB - valA;
  });

  return (
    <>
      <Hero />
      <section id="library" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold uppercase font-display text-white tracking-tight">THE LIBRARY</h2>
            <p className="text-zinc-400 text-xs">Twelve lifts covering every major muscle group.</p>
          </div>

          <div className="relative inline-block text-left">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase block mb-1">Sort By</span>
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

        {loading ? (
          <div className="text-center py-20 text-zinc-400">Loading workouts…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => {
              const calories = getWorkoutCalories(workout);
              const categories = getWorkoutCategories(workout);

              return (
                <Link
                  key={workout.id}
                  href={`/fitlog/${workout.id}`}
                  className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition flex flex-col justify-between group"
                >
                  <div className="relative h-48 w-full bg-zinc-800 overflow-hidden">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Neon Green Category Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {categories.map((cat) => (
                          <span
                            key={cat}
                            className="text-[10px] bg-[#CCFF00] text-black font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-extrabold text-lg uppercase font-display text-white mb-1 tracking-tight">
                        {workout.name}
                      </h3>
                      <p className="text-zinc-400 text-xs mb-4 font-medium">
                        {workout.equipment}
                      </p>
                    </div>

                    <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between text-xs text-zinc-300 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-zinc-500" />
                        {calories} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-zinc-500" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}