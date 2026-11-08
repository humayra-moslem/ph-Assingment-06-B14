"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import toast from "react-hot-toast";
import type {
  Workout,
  PlanWorkout,
  PlanContextType,
} from "@/types";


const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  
  useEffect(() => {
  try {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      const parsedPlan = JSON.parse(storedPlan);

      setPlan(
        parsedPlan.map((item: PlanWorkout) => ({
          ...item,
          muscleGroups: Array.isArray(item.muscleGroups)
            ? item.muscleGroups
            : [],
          instructions: Array.isArray(item.instructions)
            ? item.instructions
            : [],
        }))
      );

    }

    if (storedSaved) {
      const parsedSaved = JSON.parse(storedSaved);

      setSaved(
        parsedSaved.map((item: Workout) => ({
          ...item,
          muscleGroups: Array.isArray(item.muscleGroups)
            ? item.muscleGroups
            : [],
          instructions: Array.isArray(item.instructions)
            ? item.instructions
            : [],
        }))
      );
    }
  } catch (error) {
    console.error("Error loading localStorage:", error);
  } finally {
    setIsHydrated(true);
  }
}, []);

  // ─── 2. Save plan to localStorage ───
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, isHydrated]);

  // ─── 3. Save saved workouts to localStorage ───
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, isHydrated]);
  

  // ─── 4. Add workout to plan ───
  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      toast.error("Today's plan is full! (Max 5)");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }

    setPlan((prev) => [
      ...prev,
      { ...workout, isDone: false },
    ]);

    toast.success(`${workout.name} added to plan! 💪`);
  };

  // ─── 5. Add workout to saved ───
  const addToSaved = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved!");
      return;
    }

    setSaved((prev) => [...prev, workout]);

    toast.success(`${workout.name} saved for later!`);
  };

  // ─── 6. Remove from plan ───
  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));

    toast.success("Removed from plan");
  };

  // ─── 7. Remove from saved ───
  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));

    toast.success("Removed from saved");
  };

  // ─── 8. Mark workout as done ───
  const markAsDone = (id: number) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isDone: true }
          : item
      )
    );

    toast.success("Workout done! Great job! 🎉");
  };


  // ─── 9. Calculate metrics ───
  const metrics = {
    exercises: plan.length,

    minutes: plan.reduce(
      (total, item) => total + item.duration,
      0
    ),

    calories: plan.reduce(
      (total, item) => total + item.caloriesBurned,
      0
    ),
  };

  const value: PlanContextType = {
    plan,
    saved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    metrics,
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

// ─── Custom Hook ───
export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }

  return context;
}
