


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Suspense } from "react";

function NavbarContent() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workout");

  const isPlanActive = pathname === "/my-plan";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0d0f]/95 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl text-[#b6ff00]">🏋️</span>
            <span className="text-2xl font-black tracking-wide text-white">
              FIT<span className="text-[#b6ff00]">LOG</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center justify-center gap-8 sm:flex">
            <Link
              href="/"
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                isWorkoutActive
                  ? "bg-[#b6ff00]/10 text-[#b6ff00]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                isPlanActive
                  ? "bg-[#b6ff00]/10 text-[#b6ff00]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </nav>

          {/* Plan & Saved Badges */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
            >
              <span>Plan</span>
              <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#b6ff00] px-2 font-bold text-black">
                {plan.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
            >
              <span>Saved</span>
              <span className="flex h-8 min-w-8 items-center justify-center rounded-full border border-white/20 px-2 text-white">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/10 bg-[#151719] px-4 py-3 sm:hidden">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-xs font-semibold transition ${
            isWorkoutActive ? "text-[#b6ff00]" : "text-gray-400"
          }`}
        >
          <span className="text-lg">🏋️</span>
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className={`flex flex-col items-center gap-1 text-xs font-semibold transition ${
            isPlanActive ? "text-[#b6ff00]" : "text-gray-400"
          }`}
        >
          <span className="text-lg">📋</span>
          My Plan ({plan.length})
        </Link>
      </nav>
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <div className="h-[76px] border-b border-white/10 bg-[#0c0d0f]" />
      }
    >
      <NavbarContent />
    </Suspense>
  );
}

