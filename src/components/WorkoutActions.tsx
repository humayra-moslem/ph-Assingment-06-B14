"use client";

import { usePlan } from "@/context/PlanContext";

const WorkoutActions = ({ id }: { id: number }) => {
  const {
    addToPlan,
    removeFromPlan,
    toggleSaved,
    isInPlan,
    isSaved,
  } = usePlan();

  const added = isInPlan(id);
  const saved = isSaved(id);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={() =>
          added ? removeFromPlan(id) : addToPlan(id)
        }
        className="btn border-none bg-[#b6ff00] px-6 font-bold text-black hover:bg-lime-400"
      >
        {added ? "Remove from My Plan" : "Add to Today's Plan"}
      </button>

      <button
        onClick={() => toggleSaved(id)}
        className="btn btn-outline border-white/20 text-white hover:border-[#b6ff00] hover:bg-transparent hover:text-[#b6ff00]"
      >
        {saved ? "Saved ✓" : "Save for Later"}
      </button>
    </div>
  );
};

export default WorkoutActions;