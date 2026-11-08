"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";

type SortOption = "duration" | "calories" | "rating";
type TabOption = "plan" | "saved";

export default function MyPlanSection() {
  const [activeTab, setActiveTab] = useState<TabOption>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const { plan, saved, metrics, markAsDone, removeFromPlan, removeFromSaved } =
    usePlan();

  const visibleList = activeTab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    return [...visibleList].sort((a, b) => {
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
  }, [visibleList, sortBy]);

  return (
    <section className="min-h-screen bg-[#0c0d0f] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold tracking-[0.25em] text-[#b6ff00]">
            YOUR FITNESS JOURNEY
          </p>

          <h1 className="text-3xl font-black uppercase sm:text-5xl">
            My <span className="text-[#b6ff00]">Plan</span>
          </h1>

          <p className="mt-3 text-gray-400">
            Track your workouts, monitor progress, and stay consistent.
          </p>
        </div>

        {/* 1. Metrics Summary */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#151719] p-6">
            <p className="text-sm text-gray-400">Total Exercises</p>
            <h2 className="mt-2 text-3xl font-black text-[#b6ff00]">
              {metrics.exercises}
            </h2>
            <p className="mt-1 text-xs text-gray-500">Workouts in your plan</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#151719] p-6">
            <p className="text-sm text-gray-400">Total Duration</p>
            <h2 className="mt-2 text-3xl font-black text-[#b6ff00]">
              {metrics.minutes}
              <span className="ml-1 text-base">min</span>
            </h2>
            <p className="mt-1 text-xs text-gray-500">Estimated workout time</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#151719] p-6">
            <p className="text-sm text-gray-400">Calories Burn</p>
            <h2 className="mt-2 text-3xl font-black text-[#b6ff00]">
              {metrics.calories}
            </h2>
            <p className="mt-1 text-xs text-gray-500">Estimated calories</p>
          </div>
        </div>

        {/* 2. Tabs + 3. Sort Dropdown */}
        <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-lg px-5 py-3 text-sm font-bold transition ${
                activeTab === "plan"
                  ? "bg-[#b6ff00] text-black"
                  : "border border-white/10 bg-[#151719] text-gray-400 hover:text-white"
              }`}
            >
              Today's Plan ({plan.length})
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-5 py-3 text-sm font-bold transition ${
                activeTab === "saved"
                  ? "bg-[#b6ff00] text-black"
                  : "border border-white/10 bg-[#151719] text-gray-400 hover:text-white"
              }`}
            >
              Saved ({saved.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm text-gray-400">
              Sort by:
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-white/10 bg-[#151719] px-4 py-3 text-sm text-white outline-none focus:border-[#b6ff00]"
            >
              <option value="duration">Duration: Low to High</option>
              <option value="calories">Calories: High to Low</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {sortedList.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 bg-[#151719] px-5 py-20 text-center">
            <div className="mb-5 text-5xl">🏋️</div>

            <h2 className="text-2xl font-black tracking-wide">
              NOTHING HERE YET
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
              {activeTab === "plan"
                ? "You haven't added any workouts to your plan yet. Browse the library and start building your workout routine."
                : "You haven't saved any workouts yet. Browse the library and save your favorite workouts for later."}
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-lg bg-[#b6ff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
            >
              Browse Workouts →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {sortedList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#242832] bg-[#151719] p-4 transition duration-300 hover:border-[#b6ff00]/30 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
              >
                {/* Workout Image */}
                <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-44">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Workout Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-black uppercase text-white">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">{item.equipment}</p>

                  {/* Workout Stats */}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <span>
                      <span className="text-[#b6ff00]">◷</span> {item.duration}{" "}
                      min
                    </span>

                    <span>
                      <span className="text-[#b6ff00]">♨</span>{" "}
                      {item.caloriesBurned} kcal
                    </span>

                    <span>
                      <span className="text-[#b6ff00]">☆</span> {item.rating}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                  {/* View Details */}
                  <Link
                    href={`/workouts/${item.id}`}
                    className="rounded-full border border-gray-600 px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-[#b6ff00] hover:text-[#b6ff00]"
                  >
                    View Details
                  </Link>

                  {/* Done Button - Only Plan Tab */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      disabled={item.isDone}
                      className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                        item.isDone
                          ? "cursor-not-allowed bg-gray-500 text-white"
                          : "bg-[#b6ff00] text-black hover:bg-white"
                      }`}
                    >
                      {item.isDone ? "✓ Done" : "Mark as Done"}
                    </button>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    title="Remove workout"
                    className="rounded-full px-3 py-2 text-lg text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
