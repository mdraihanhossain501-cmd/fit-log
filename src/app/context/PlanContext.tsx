"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Workout {
  id: string;
  name: string;
  category: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
  description?: string;
  instructions?: string[];
  isDone?: boolean;
}

interface PlanContextType {
  planItems: Workout[];
  savedItems: Workout[];
  addToPlan: (item: Workout) => boolean;
  addToSaved: (item: Workout) => void;
  removeFromPlan: (id: string) => void;
  markAsDone: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [planItems, setPlanItems] = useState<Workout[]>([]);
  const [savedItems, setSavedItems] = useState<Workout[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");
    if (localPlan) setPlanItems(JSON.parse(localPlan));
    if (localSaved) setSavedItems(JSON.parse(localSaved));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(planItems));
    localStorage.setItem("fitlog_saved", JSON.stringify(savedItems));
  }, [planItems, savedItems]);

  const addToPlan = (item: Workout) => {
    if (planItems.length >= 5) return false; // 5 lifts cap
    if (!planItems.some((i) => i.id === item.id)) {
      setPlanItems([...planItems, { ...item, isDone: false }]);
    }
    return true;
  };

  const addToSaved = (item: Workout) => {
    if (!savedItems.some((i) => i.id === item.id)) {
      setSavedItems([...savedItems, item]);
    }
  };

  const removeFromPlan = (id: string) => {
    setPlanItems(planItems.filter((i) => i.id !== id));
  };

  const markAsDone = (id: string) => {
    setPlanItems(
      planItems.map((i) => (i.id === id ? { ...i, isDone: true } : i))
    );
  };

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        addToPlan,
        addToSaved,
        removeFromPlan,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within PlanProvider");
  return context;
};