import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getWorkoutById } from "@/utils/api";
import WorkoutActions from "@/components/WorkoutActions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const WorkoutDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0c0d0f] px-5 py-12 text-white md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Back button */}
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-gray-400 hover:text-[#b6ff00]"
        >
          ← Back to Workouts
        </Link>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">

          {/* Workout Image */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-[350px] w-full object-cover sm:h-[500px]"
            />
          </div>

          {/* Workout Information */}
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="badge border-[#b6ff00]/50 bg-[#b6ff00]/10 px-3 py-3 text-[#b6ff00]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-black md:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Workout Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <InfoCard
                label="Duration"
                value={`${workout.duration} min`}
              />

              <InfoCard
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <InfoCard
                label="Difficulty"
                value={workout.difficulty}
              />

              <InfoCard
                label="Equipment"
                value={workout.equipment}
              />

              <InfoCard
                label="Sets"
                value={String(workout.sets)}
              />

              <InfoCard
                label="Reps"
                value={workout.reps}
              />

              <InfoCard
                label="Rating"
                value={`★ ${workout.rating}`}
              />
            </div>

            {/* Action Buttons */}
            <WorkoutActions id={workout.id} />
          </div>
        </div>

        {/* Instructions */}
        <section className="mt-16">
          <h2 className="text-2xl font-black md:text-3xl">
            HOW TO <span className="text-[#b6ff00]">PERFORM</span>
          </h2>

          <div className="mt-8 space-y-4">
            {workout.instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border border-white/10 bg-[#151719] p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#b6ff00] font-bold text-black">
                  {index + 1}
                </span>

                <p className="leading-7 text-gray-300">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-xl border border-white/10 bg-[#151719] p-4">
      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-2 break-words font-bold text-white">
        {value}
      </p>
    </div>
  );
};

export default WorkoutDetailsPage;