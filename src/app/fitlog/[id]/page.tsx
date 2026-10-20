"use client";

import { useEffect, useState, use } from "react";
import { usePlan, Workout, getWorkoutCalories, getWorkoutCategories } from "@/context/PlanContext";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Bookmark, Plus } from "lucide-react";

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToPlan, addToSaved, planItems } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        if (!res.ok) throw new Error("Primary API failed");
        const data = await res.json();
        if (!data || (!data.name && !data.id)) {
          setWorkout(null);
        } else {
          setWorkout(data);
        }
      } catch {
        try {
          const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`);
          if (!res.ok) throw new Error("Fallback API failed");
          const data = await res.json();
          if (!data || (!data.name && !data.id)) {
            setWorkout(null);
          } else {
            setWorkout(data);
          }
        } catch {
          setWorkout(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-zinc-400">Loading workout details…</div>;
  }

  if (!workout) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-8xl font-extrabold text-[#CCFF00] font-display mb-2">404</h1>
        <h2 className="text-2xl font-bold uppercase font-display mb-4">WORKOUT NOT FOUND</h2>
        <p className="text-zinc-400 mb-8 max-w-md">
          The lift or route you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="bg-[#CCFF00] text-black font-extrabold uppercase px-6 py-3 rounded-lg hover:bg-[#b3e600] transition text-sm"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const isPlanFull = planItems.length >= 5;
  const categories = getWorkoutCategories(workout);

  const handleAddPlan = () => {
    const success = addToPlan(workout);
    if (success) {
      toast.success("Added to today's plan");
    } else {
      toast.error("Cap reached: Maximum 5 lifts allowed for today.");
    }
  };

  const handleSaveLater = () => {
    addToSaved(workout);
    toast.success("Saved for later");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Workouts
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Visual Column */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden h-112.5 md:h-135">
          <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
        </div>

        {/* Right Info Column */}
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase font-display mb-3 tracking-tight">
            {workout.name}
          </h1>
          <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
            {workout.description || "The king of lower-body lifts: quads, glutes, and spinal stability under a loaded bar."}
          </p>

          {/* Category Chips */}
          <div className="flex gap-2 mb-6">
            {categories.map((cat) => (
              <span key={cat} className="text-xs bg-[#CCFF00] text-black font-extrabold px-3 py-1 rounded-full uppercase">
                {cat}
              </span>
            ))}
          </div>

          {/* Specification Table Box */}
          <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl overflow-hidden mb-8 text-xs font-medium divide-y divide-zinc-800/60">
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-zinc-500 uppercase font-bold">Equipment</span>
              <span className="text-white font-bold">{workout.equipment || "Barbell, Rack"}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-zinc-500 uppercase font-bold">Difficulty</span>
              <span className="text-white font-bold">Intermediate</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-zinc-500 uppercase font-bold">Sets</span>
              <span className="text-white font-bold">4</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-zinc-500 uppercase font-bold">Reps</span>
              <span className="text-white font-bold">6-8</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-zinc-500 uppercase font-bold">Duration</span>
              <span className="text-white font-bold">{workout.duration} min</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-zinc-500 uppercase font-bold">Calories</span>
              <span className="text-white font-bold">{getWorkoutCalories(workout)} kcal</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-zinc-500 uppercase font-bold">Rating</span>
              <span className="text-white font-bold">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="font-extrabold uppercase font-display text-base mb-3 tracking-wide">INSTRUCTIONS</h3>
            <ol className="space-y-2 text-zinc-300 text-xs leading-relaxed">
              <li>1. Position body and lock stance before unracking or grasping weights.</li>
              <li>2. Maintain tight core engagement and control movement on the eccentric phase.</li>
              <li>3. Explode with controlled power through the concentric path.</li>
              <li>4. Complete full range of motion without sacrificing proper form.</li>
            </ol>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddPlan}
              disabled={isPlanFull}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wide transition ${
                isPlanFull
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-[#CCFF00] text-black hover:bg-[#b3e600]"
              }`}
            >
              <Plus className="w-4 h-4 stroke-3" />
              {isPlanFull ? "Plan Full (Max 5)" : "Add to today's plan"}
            </button>
            <button
              onClick={handleSaveLater}
              className="flex items-center gap-2 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wide transition"
            >
              <Bookmark className="w-3.5 h-3.5" /> Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}