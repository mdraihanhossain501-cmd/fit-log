"use client";

import { useEffect, useState, use } from "react";
import { usePlan, Workout } from "@/context/PlanContext";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Plus, Bookmark } from "lucide-react";

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToPlan, addToSaved, planItems } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        if (!res.ok) throw new Error("Primary detail API failed");
        const data = await res.json();
        
        if (!data || (!data.name && !data.id)) {
          setWorkout(null);
        } else {
          setWorkout(data);
        }
      } catch (err) {
        try {
          const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`);
          if (!res.ok) throw new Error("Fallback detail API failed");
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

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden h-[400px] md:h-[500px]">
          <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <div className="flex gap-2 mb-3">
            {workout.category?.map((cat) => (
              <span key={cat} className="text-xs bg-[#CCFF00] text-black font-extrabold px-3 py-1 rounded-full uppercase">
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold uppercase font-display mb-3">{workout.name}</h1>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            {workout.description || "A compound exercise designed to target and build muscle groups efficiently."}
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 text-sm grid grid-cols-2 gap-y-3 gap-x-4">
            <div><span className="text-zinc-500 uppercase block text-xs">Equipment</span> <strong className="text-white">{workout.equipment}</strong></div>
            <div><span className="text-zinc-500 uppercase block text-xs">Duration</span> <strong className="text-white">{workout.duration} min</strong></div>
            <div><span className="text-zinc-500 uppercase block text-xs">Calories</span> <strong className="text-white">{workout.calories} kcal</strong></div>
            <div><span className="text-zinc-500 uppercase block text-xs">Rating</span> <strong className="text-white">{workout.rating} / 5.0</strong></div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold uppercase font-display mb-3 text-lg">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-300 text-sm">
              <li>Position body and lock stance before unracking or grasping weights.</li>
              <li>Maintain tight core engagement and control movement on the eccentric phase.</li>
              <li>Explode with controlled power through the concentric path.</li>
              <li>Complete full range of motion without sacrificing proper form.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddPlan}
              disabled={isPlanFull}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-extrabold uppercase rounded-lg transition ${
                isPlanFull ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-[#CCFF00] text-black hover:bg-[#b3e600]"
              }`}
            >
              <Plus className="w-4 h-4" /> {isPlanFull ? "Plan Full (Max 5)" : "Add to today's plan"}
            </button>
            <button
              onClick={handleSaveLater}
              className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-white font-extrabold uppercase px-6 py-3.5 rounded-lg transition"
            >
              <Bookmark className="w-4 h-4" /> Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}