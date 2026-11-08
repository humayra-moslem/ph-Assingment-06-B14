"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const { planIds, savedIds } = usePlan();

  return (
    <nav className="navbar bg-[#0c0d0f] px-4 text-white md:px-10">
      <div className="flex-1">
        <Link
          href="/"
          className="text-2xl font-black tracking-wider"
        >
          FIT<span className="text-[#b6ff00]">LOG</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <Link
          href="/"
          className="text-sm font-medium hover:text-[#b6ff00]"
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className="text-sm font-medium hover:text-[#b6ff00]"
        >
          My Plan
          <span className="badge badge-sm ml-1 bg-[#b6ff00] text-black">
            {planIds.length}
          </span>
        </Link>

        <span className="hidden text-sm text-gray-400 sm:inline">
          Saved: {savedIds.length}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;