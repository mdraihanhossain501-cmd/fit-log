"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Workout {
  id: string;
  name: string;
  equipment: string;
  duration: number | string;
  calories?: number | string;
  rating: number | string;
  image: string;
  category?: string[];
  description?: string;
  isDone?: boolean;
}

// Single Source of Truth for Calories
export function getWorkoutCalories(workout: { name?: string; calories?: number | string }): number {
  if (workout.calories && Number(workout.calories) > 0) {
    return Number(workout.calories);
  }

  const calorieMap: Record<string, number> = {
    "back squat": 280,
    "conventional deadlift": 290,
    "barbell bench press": 180,
    "overhead press": 160,
    "walking lunge": 170,
    "kettlebell swing": 150,
    "pull-up": 120,
    "dumbbell bicep curl": 90,
    "burpee": 200,
    "hollow-body plank": 80,
    "push-up": 90,
    "russian twist": 70,
  };

  const key = workout.name?.toLowerCase().trim() || "";
  return calorieMap[key] || 180;
}

// Single Source of Truth for Category Badges
export function getWorkoutCategories(workout: { name?: string; category?: string[] }): string[] {
  if (workout.category && workout.category.length > 0) {
    return workout.category;
  }

  const categoryMap: Record<string, string[]> = {
    "back squat": ["Legs", "Quads"],
    "conventional deadlift": ["Back", "Legs"],
    "barbell bench press": ["Chest", "Push"],
    "overhead press": ["Shoulders", "Push"],
    "walking lunge": ["Legs", "Glutes"],
    "kettlebell swing": ["Full Body", "Hips"],
    "pull-up": ["Back", "Pull"],
    "dumbbell bicep curl": ["Arms", "Biceps"],
    "burpee": ["Cardio", "Full Body"],
    "hollow-body plank": ["Core", "Abs"],
    "push-up": ["Chest", "Push"],
    "russian twist": ["Core", "Abs"],
  };

  const key = workout.name?.toLowerCase().trim() || "";
  return categoryMap[key] || ["Fitness"];
}

interface PlanContextType {
  planItems: Workout[];
  savedItems: Workout[];
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  markAsDone: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [planItems, setPlanItems] = useState<Workout[]>([]);
  const [savedItems, setSavedItems] = useState<Workout[]>([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedList = localStorage.getItem("fitlog_saved");
    if (savedPlan) setPlanItems(JSON.parse(savedPlan));
    if (savedList) setSavedItems(JSON.parse(savedList));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(planItems));
  }, [planItems]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(savedItems));
  }, [savedItems]);

  const addToPlan = (workout: Workout): boolean => {
    if (planItems.length >= 5) return false;
    if (!planItems.some((item) => item.id === workout.id)) {
      setPlanItems([...planItems, { ...workout, isDone: false }]);
    }
    return true;
  };

  const addToSaved = (workout: Workout) => {
    if (!savedItems.some((item) => item.id === workout.id)) {
      setSavedItems([...savedItems, workout]);
    }
  };

  const removeFromPlan = (id: string) => {
    setPlanItems(planItems.filter((item) => item.id !== id));
  };

  const markAsDone = (id: string) => {
    setPlanItems(planItems.map((item) => (item.id === id ? { ...item, isDone: true } : item)));
  };

  return (
    <PlanContext.Provider value={{ planItems, savedItems, addToPlan, addToSaved, removeFromPlan, markAsDone }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
}