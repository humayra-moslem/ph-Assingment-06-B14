"use client";

import Link from "next/link";
import { Workout } from "@/types";
import { usePlan } from "@/context/PlanContext";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
  const { addToPlan, isInPlan } = usePlan();

  const added = isInPlan(workout.id);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#151719] text-white transition hover:-translate-y-1 hover:border-[#b6ff00]/50">

      <Link href={`/workout/${workout.id}`}>
        <div className="h-52 overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="badge badge-outline border-[#b6ff00]/50 text-[#b6ff00]"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold">
            {workout.name}
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {workout.difficulty} · {workout.duration} min
          </p>

          <div className="mt-3 flex justify-between text-sm text-gray-400">
            <span>{workout.caloriesBurned} kcal</span>
            <span>★ {workout.rating}</span>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          onClick={() => addToPlan(workout.id)}
          disabled={added}
          className="btn btn-sm w-full border-none bg-[#b6ff00] font-bold text-black hover:bg-lime-400 disabled:bg-gray-600 disabled:text-white"
        >
          {added ? "Added to Plan ✓" : "Add to My Plan"}
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;