

"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import type { Workout } from "@/types";

type Params = Promise<{ id: string }>;

export default function WorkoutDetails({ params }: { params: Params }) {
  
  const { id } = use(params);

  const { plan, addToPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API থেকে workout fetch
  useEffect(() => {
    async function loadWorkout() {
      try {
        setLoading(true);
        setError("");

        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error("Error loading workout:", error);
        setError("Failed to load workout. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c0d0f]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#b6ff00]" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c0d0f] px-4 text-center text-white">
        <h2 className="text-2xl font-bold text-red-400">
          Something went wrong!
        </h2>

        <p className="mt-3 text-gray-400">{error}</p>

        <Link
          href="/"
          className="mt-6 rounded-lg bg-[#b6ff00] px-6 py-3 font-bold text-black"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  // Workout Not Found
  if (!workout) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c0d0f] px-4 text-center text-white">
        <h1 className="text-5xl font-black text-[#b6ff00]">404</h1>

        <h2 className="mt-4 text-2xl font-bold">WORKOUT NOT FOUND</h2>

        <p className="mt-3 text-gray-400">
          The workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 rounded-lg bg-[#b6ff00] px-6 py-3 font-bold text-black"
        >
          Browse Workouts
        </Link>
      </div>
    );
  }

  // Button Disabled Logic
  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);

  return (
    <main className="min-h-screen bg-[#0c0d0f] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-[#b6ff00]"
        >
          ← Back to Workouts
        </Link>

        {/* Workout Details */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <span className="absolute right-4 top-4 rounded-full border border-[#b6ff00]/30 bg-black/70 px-4 py-2 text-sm font-bold text-[#b6ff00] backdrop-blur-sm">
              {workout.difficulty}
            </span>
          </div>

          {/* Information */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold tracking-[0.25em] text-[#b6ff00]">
              WORKOUT DETAILS
            </p>

            <h1 className="mt-3 text-3xl font-black uppercase sm:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-gray-400">
                TARGET MUSCLES
              </p>

              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full border border-[#b6ff00]/20 bg-[#b6ff00]/5 px-4 py-2 text-sm font-medium text-[#b6ff00]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-white/10 bg-[#151719] p-4">
                <p className="text-xs text-gray-500">Duration</p>
                <h3 className="mt-2 text-xl font-bold">
                  {workout.duration}
                  <span className="ml-1 text-xs text-gray-400">min</span>
                </h3>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#151719] p-4">
                <p className="text-xs text-gray-500">Calories</p>
                <h3 className="mt-2 text-xl font-bold">
                  {workout.caloriesBurned}
                </h3>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#151719] p-4">
                <p className="text-xs text-gray-500">Sets</p>
                <h3 className="mt-2 text-xl font-bold">{workout.sets}</h3>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#151719] p-4">
                <p className="text-xs text-gray-500">Rating</p>
                <h3 className="mt-2 text-xl font-bold text-[#b6ff00]">
                  ★ {workout.rating}
                </h3>
              </div>
            </div>

            {/* Equipment & Reps */}
            <div className="mt-6 space-y-2 text-sm">
              <p>
                <span className="text-gray-500">Equipment:</span>{" "}
                {workout.equipment}
              </p>

              <p>
                <span className="text-gray-500">Reps:</span> {workout.reps}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => addToPlan(workout)}
                disabled={isPlanFull || isAlreadyInPlan}
                className="flex-1 rounded-lg bg-[#b6ff00] px-5 py-4 text-sm font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
              >
                {isAlreadyInPlan
                  ? "Already in Plan"
                  : isPlanFull
                    ? "Plan Full"
                    : "＋ Add to Today's Plan"}
              </button>

              <button
                onClick={() => addToSaved(workout)}
                className="flex-1 rounded-lg border border-white/20 px-5 py-4 text-sm font-bold transition hover:border-[#b6ff00] hover:text-[#b6ff00]"
              >
                ♡ Save for Later
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16">
          <p className="text-sm font-bold tracking-[0.25em] text-[#b6ff00]">
            STEP BY STEP
          </p>

          <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
            How to perform
          </h2>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {workout.instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border border-white/10 bg-[#151719] p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#b6ff00] font-black text-black">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm leading-7 text-gray-300">{instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
