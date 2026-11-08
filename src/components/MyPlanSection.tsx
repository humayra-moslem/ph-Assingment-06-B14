"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { Workout } from "@/types";
import { usePlan } from "@/context/PlanContext";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const MyPlanSection = ({
  workouts,
}: {
  workouts: Workout[];
}) => {
  const {
    planIds,
    savedIds,
    doneIds,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  // Get complete workout objects from API data
  const plan = workouts.filter((item) =>
    planIds.includes(item.id),
  );

  const saved = workouts.filter((item) =>
    savedIds.includes(item.id),
  );

  // Hide completed workouts from Today's Plan
  const activePlan = plan.filter(
    (item) => !doneIds.includes(item.id),
  );

  // Select list according to active tab
  const currentList = activeTab === "plan" ? activePlan : saved;

  // Sort without mutating the original array
  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [currentList, sortBy]);

  // Metrics for Today's Plan
  const metrics = {
    exercises: activePlan.length,

    minutes: activePlan.reduce(
      (total, item) => total + item.duration,
      0,
    ),

    calories: activePlan.reduce(
      (total, item) => total + item.caloriesBurned,
      0,
    ),
  };

  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
  };

  return (
    <section className="min-h-screen bg-[#0c0d0f] px-5 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div>
          <h1 className="text-3xl font-black uppercase">
            My Plan
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary */}
        <div className="mt-7 grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-[#14161b] p-5 sm:grid-cols-3 sm:gap-0">

          <MetricCard
            label="Exercises"
            value={metrics.exercises}
            highlight
          />

          <MetricCard
            label="Minutes"
            value={metrics.minutes}
          />

          <MetricCard
            label="Calories"
            value={metrics.calories}
          />

        </div>

        {/* Tabs and Sort */}
        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          {/* Tabs */}
          <div className="flex w-fit rounded-lg border border-white/10 bg-[#15171c] p-1">

            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                activeTab === "plan"
                  ? "bg-[#252932] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Today's Plan
              <span className="ml-2 text-[#b6ff00]">
                {activePlan.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                activeTab === "saved"
                  ? "bg-[#252932] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Saved
              <span className="ml-2 text-[#b6ff00]">
                {saved.length}
              </span>
            </button>

          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-workouts"
              className="text-sm text-gray-500"
            >
              Sort By
            </label>

            <select
              id="sort-workouts"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="select select-sm w-32 border border-white/10 bg-[#15171c] text-white"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>

        </div>

        {/* Workout List */}
        <div className="mt-5 space-y-3">

          {sortedList.length === 0 ? (

            /* Empty State */
            <div className="rounded-xl border border-white/10 bg-[#14161b] px-5 py-16 text-center">

              <div className="text-4xl">🏋️</div>

              <h2 className="mt-5 text-2xl font-black">
                NOTHING HERE YET
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                {activeTab === "plan"
                  ? "Browse the library and add workouts to today's plan."
                  : "You haven't saved any workouts yet. Find one you like in the library."}
              </p>

              <Link
                href="/#library"
                className="btn mt-6 border-none bg-[#b6ff00] font-bold text-black hover:bg-lime-400"
              >
                Browse the Library
              </Link>

            </div>

          ) : (

            /* Workout Rows */
            sortedList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#14161b] p-3 transition hover:border-white/20 sm:flex-row sm:items-center sm:justify-between sm:p-4"
              >

                {/* Workout Information */}
                <div className="flex min-w-0 items-center gap-3">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-24 shrink-0 rounded-lg object-cover sm:h-16 sm:w-28"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black uppercase sm:text-base">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.muscleGroups.join(" · ")}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-300">

                      <span>
                        <span className="text-[#b6ff00]">◷</span>{" "}
                        {item.duration} min
                      </span>

                      <span>
                        <span className="text-[#b6ff00]">♨</span>{" "}
                        {item.caloriesBurned} kcal
                      </span>

                      <span>
                        <span className="text-[#b6ff00]">☆</span>{" "}
                        {item.rating}
                      </span>

                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">

                  {/* View Details */}
                  <Link
                    href={`/workout/${item.id}`}
                    className="btn btn-sm rounded-full border border-white/15 bg-transparent text-xs font-normal text-white hover:border-[#b6ff00] hover:bg-transparent"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done - Only Plan Tab */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      className="btn btn-sm rounded-full border-none bg-[#b6ff00] px-4 text-xs font-bold text-black hover:bg-lime-400"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="btn btn-sm btn-circle border-none bg-transparent text-gray-500 hover:bg-white/10 hover:text-red-400"
                  >
                    ✕
                  </button>

                </div>

              </div>
            ))

          )}

        </div>
      </div>
    </section>
  );
};

// Reusable Metric Card
const MetricCard = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) => {
  return (
    <div className="px-3 py-2 sm:border-r sm:border-white/10 sm:px-6 sm:last:border-r-0">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p
        className={`mt-1 text-3xl font-black ${
          highlight ? "text-[#b6ff00]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default MyPlanSection;