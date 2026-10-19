"use client";

import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import { toast } from "sonner";
import { Check, X, Eye, Dumbbell, Clock, Flame } from "lucide-react";

export default function MyPlanPage() {
  const { planItems, savedItems, removeFromPlan, markAsDone } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const totalExercises = planItems.length;
  const totalMinutes = planItems.reduce((acc, item) => acc + (item.duration || 0), 0);
  const totalCalories = planItems.reduce((acc, item) => acc + (item.calories || 0), 0);

  const currentList = activeTab === "plan" ? planItems : savedItems;

  const handleMarkDone = (id: string, name: string) => {
    markAsDone(id);
    toast.success(`Completed ${name}!`);
  };

  const handleRemove = (id: string, name: string) => {
    removeFromPlan(id);
    toast.info(`Removed ${name} from plan`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold uppercase font-display">MY PLAN</h1>
        <p className="text-zinc-400">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center gap-4">
          <Dumbbell className="w-8 h-8 text-[#CCFF00]" />
          <div>
            <span className="text-zinc-500 text-xs uppercase block font-bold">Exercises</span>
            <span className="text-2xl font-extrabold font-display">{totalExercises} / 5</span>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center gap-4">
          <Clock className="w-8 h-8 text-[#CCFF00]" />
          <div>
            <span className="text-zinc-500 text-xs uppercase block font-bold">Minutes</span>
            <span className="text-2xl font-extrabold font-display">{totalMinutes} min</span>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center gap-4">
          <Flame className="w-8 h-8 text-[#CCFF00]" />
          <div>
            <span className="text-zinc-500 text-xs uppercase block font-bold">Calories</span>
            <span className="text-2xl font-extrabold font-display">{totalCalories} kcal</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-800 mb-8">
        <button
          onClick={() => setActiveTab("plan")}
          className={`py-3 px-6 font-bold uppercase text-sm transition ${
            activeTab === "plan"
              ? "border-b-2 border-[#CCFF00] text-[#CCFF00]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Today&apos;s Plan ({planItems.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`py-3 px-6 font-bold uppercase text-sm transition ${
            activeTab === "saved"
              ? "border-b-2 border-[#CCFF00] text-[#CCFF00]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Saved ({savedItems.length})
        </button>
      </div>

      {/* List / Empty State */}
      {currentList.length === 0 ? (
        <div className="text-center py-16 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <h2 className="text-2xl font-bold uppercase font-display mb-2">NOTHING HERE YET</h2>
          <p className="text-zinc-400 mb-6">Browse the library and add a lift to get today moving.</p>
          <Link
            href="/"
            className="inline-block bg-[#CCFF00] text-black font-extrabold uppercase px-6 py-3 rounded-lg hover:bg-[#b3e600] transition text-sm"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item) => (
            <div
              key={item.id}
              className={`bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 ${
                item.isDone ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-16 h-16 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={`font-bold uppercase font-display text-lg ${item.isDone ? "line-through text-zinc-400" : ""}`}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400">{item.equipment}</p>
                  <div className="flex gap-4 text-xs text-zinc-400 mt-1 font-medium">
                    <span>{item.duration} min</span>
                    <span>{item.calories} kcal</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-zinc-800 pt-3 md:pt-0">
                <Link
                  href={`/fitlog/${item.id}`}
                  className="flex items-center gap-1 text-xs border border-zinc-700 px-3 py-2 rounded-lg hover:border-zinc-500 uppercase font-bold"
                >
                  <Eye className="w-3.5 h-3.5" /> View Details
                </Link>

                {activeTab === "plan" && (
                  <>
                    <button
                      onClick={() => handleMarkDone(item.id, item.name)}
                      disabled={item.isDone}
                      className={`flex items-center gap-1 text-xs px-3 py-2 rounded-lg uppercase font-bold ${
                        item.isDone
                          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                          : "bg-[#CCFF00] text-black hover:bg-[#b3e600]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" /> {item.isDone ? "Done" : "Mark as Done"}
                    </button>
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-zinc-400 hover:text-red-500 p-2 rounded-lg"
                      title="Remove"
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