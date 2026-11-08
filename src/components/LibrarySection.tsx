import { Workout } from "@/types";
import WorkoutCard from "./WorkoutCard";

const LibrarySection = ({
  workouts,
}: {
  workouts: Workout[];
}) => {
  return (
    <section
      id="library"
      className="min-h-screen bg-[#0c0d0f] px-5 py-16 text-white md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="font-semibold tracking-widest text-[#b6ff00]">
            WORKOUT LIBRARY
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Find Your Next Challenge
          </h2>

          <p className="mt-3 text-gray-400">
            Explore workouts and build your perfect training plan.
          </p>
        </div>

        {workouts.length === 0 ? (
          <p className="text-gray-400">
            No workouts available right now. Please try again later.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LibrarySection;