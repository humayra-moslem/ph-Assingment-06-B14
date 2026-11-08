import Link from "next/link";
import type { Workout } from "@/types";
import Image from "next/image";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-[#151719] transition-all duration-300 hover:-translate-y-1 hover:border-[#b6ff00]/50 hover:shadow-lg hover:shadow-[#b6ff00]/5"
    >
      {/* Workout Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          height={800}
          width={600}
        />

        {/* Difficulty Badge */}
        <span className="absolute right-3 top-3 rounded-full border border-[#b6ff00]/30 bg-black/70 px-3 py-1 text-xs font-semibold text-[#b6ff00] backdrop-blur-sm">
          {workout.difficulty}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Muscle Groups */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-[#b6ff00]/20 bg-[#b6ff00]/5 px-3 py-1 text-xs font-medium text-[#b6ff00]"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#b6ff00]">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-gray-500">{workout.equipment}</p>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Workout Stats */}
        <div className="flex items-center justify-between gap-2 text-sm">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <span className="text-[#b6ff00]">◷</span>
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <span className="text-[#b6ff00]">♨</span>
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <span className="text-[#b6ff00]">★</span>
            <span>{workout.rating}</span>
          </div>
        </div>

        {/* View Details */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-400 transition-colors group-hover:text-[#b6ff00]">
            View Details
          </span>

          <span className="text-lg text-[#b6ff00] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
