"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Link from "next/link";
import { Workout } from "@/context/PlanContext";
import { ChevronDown, Clock, Flame, Star } from "lucide-react";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        // Fallback API
        const res = await fetch("https://api.api-store.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <>
      <Hero />
      <section id="library" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold uppercase font-display">THE LIBRARY</h2>
            <p className="text-zinc-400">Twelve lifts covering every major muscle group.</p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative inline-block text-left">
            <span className="text-xs text-zinc-500 uppercase block mb-1">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-700 text-white py-2 px-4 pr-8 rounded appearance-none cursor-pointer focus:outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-2 bottom-3 pointer-events-none" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-400">Loading workouts…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/fitlog/${workout.id}`}
                className="bg-zinc-900 border border-zinc-800 rounded p-4 hover:border-zinc-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 bg-zinc-800 rounded mb-4 overflow-hidden flex items-center justify-center">
                    <img src={workout.image} alt={workout.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex gap-2 mb-2">
                    {workout.category?.map((cat) => (
                      <span key={cat} className="text-[10px] bg-zinc-800 text-zinc-300 font-bold px-2 py-0.5 rounded uppercase">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-lg uppercase font-display mb-1">{workout.name}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{workout.equipment}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800 pt-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {workout.duration} min</span>
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> {workout.calories} kcal</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {workout.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}