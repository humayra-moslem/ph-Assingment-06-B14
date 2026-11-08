

"use client";

import { useState, useEffect } from "react";

import type { Workout } from "@/types";
import { getWorkouts } from "@/utils/api";

import WorkoutCard from "./WorkoutCard";

export default function LibrarySection() {
  

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getWorkouts();

        setWorkouts(data);
      } catch (error) {
        console.error("Error loading workouts:", error);
        setError("Failed to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);


  if (loading) {
    return (
      <section
        id="library"
        className="bg-[#0c0d0f] px-5 py-16 text-white md:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black">WORKOUT LIBRARY</h2>

          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <span className="loading loading-spinner loading-lg text-[#b6ff00]"></span>

            <p className="mt-4 text-sm text-gray-400">Loading workouts...</p>
          </div>
        </div>
      </section>
    );
  }


  if (error) {
    return (
      <section
        id="library"
        className="bg-[#0c0d0f] px-5 py-16 text-white md:px-12"
      >
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black">WORKOUT LIBRARY</h2>

          <p className="mt-8 text-red-400">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="btn mt-5 border-none bg-[#b6ff00] text-black"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="library"
      className="bg-[#0c0d0f] px-5 py-16 text-white md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10">
          <p className="font-semibold tracking-[0.3em] text-[#b6ff00]">
            WORKOUT LIBRARY
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Find Your Next Challenge
          </h2>

          <p className="mt-3 text-gray-400">
            Explore workouts and build your perfect training plan.
          </p>
        </div>

        {/* Empty State */}
        {workouts.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="text-xl font-bold">No Workouts Found</h3>

            <p className="mt-3 text-gray-400">
              No workouts are available right now.
            </p>
          </div>
        ) : (
          /* Workout Cards Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
