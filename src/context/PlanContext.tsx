"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { PlanContextType } from "@/types";

const PlanContext = createContext<PlanContextType | undefined>(
  undefined,
);

export const PlanProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const plan = localStorage.getItem("fitlog-plan");
      const saved = localStorage.getItem("fitlog-saved");
      const done = localStorage.getItem("fitlog-done");

      if (plan) setPlanIds(JSON.parse(plan));
      if (saved) setSavedIds(JSON.parse(saved));
      if (done) setDoneIds(JSON.parse(done));
    } catch (error) {
      console.error("Error loading FitLog data:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist data
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(planIds));
    localStorage.setItem("fitlog-saved", JSON.stringify(savedIds));
    localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
  }, [planIds, savedIds, doneIds, hydrated]);

  // Add to Today's Plan (maximum 5)
  const addToPlan = (id: number) => {
    setPlanIds((prev) => {
      if (prev.includes(id) || prev.length >= 5) return prev;
      return [...prev, id];
    });

    // If added again, mark as not done
    setDoneIds((prev) => prev.filter((item) => item !== id));
  };

  // Remove from Today's Plan
  const removeFromPlan = (id: number) => {
    setPlanIds((prev) => prev.filter((item) => item !== id));
    setDoneIds((prev) => prev.filter((item) => item !== id));
  };

  // Save or unsave
  const toggleSaved = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );
  };

  // Remove from Saved
  const removeFromSaved = (id: number) => {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  };

  // Mark workout as completed
  const markAsDone = (id: number) => {
    setDoneIds((prev) =>
      prev.includes(id) ? prev : [...prev, id],
    );
  };

  const isInPlan = (id: number) => planIds.includes(id);
  const isSaved = (id: number) => savedIds.includes(id);
  const isDone = (id: number) => doneIds.includes(id);

  return (
    <PlanContext.Provider
      value={{
        planIds,
        savedIds,
        doneIds,
        addToPlan,
        removeFromPlan,
        toggleSaved,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isSaved,
        isDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};