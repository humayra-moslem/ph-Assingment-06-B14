
export default function WorkoutDetailsLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#0c0d0f] px-5 py-12 text-white md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Back Button Skeleton */}
        <div className="mb-8 h-5 w-32 rounded bg-gray-700/50" />

        {/* Workout Details */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* Image Skeleton */}
          <div className="h-[300px] rounded-3xl bg-gray-700/50 sm:h-[450px]" />

          {/* Content Skeleton */}
          <div className="flex flex-col justify-center">

            {/* Difficulty */}
            <div className="mb-5 h-7 w-28 rounded-full bg-gray-700/50" />

            {/* Title */}
            <div className="mb-4 h-10 w-3/4 rounded-lg bg-gray-700/50" />
            <div className="mb-6 h-10 w-1/2 rounded-lg bg-gray-700/50" />

            {/* Muscle Groups */}
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="h-7 w-20 rounded-full bg-gray-700/50" />
              <div className="h-7 w-24 rounded-full bg-gray-700/50" />
              <div className="h-7 w-20 rounded-full bg-gray-700/50" />
            </div>

            {/* Description */}
            <div className="mb-3 h-4 w-full rounded bg-gray-700/50" />
            <div className="mb-3 h-4 w-full rounded bg-gray-700/50" />
            <div className="mb-8 h-4 w-2/3 rounded bg-gray-700/50" />

            {/* Stats */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="h-20 rounded-xl bg-gray-700/50" />
              <div className="h-20 rounded-xl bg-gray-700/50" />
              <div className="h-20 rounded-xl bg-gray-700/50" />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <div className="h-12 w-40 rounded-full bg-gray-700/50" />
              <div className="h-12 w-40 rounded-full bg-gray-700/50" />
            </div>

          </div>
        </div>

        {/* Instructions Skeleton */}
        <div className="mt-16">
          <div className="mb-8 h-8 w-48 rounded bg-gray-700/50" />

          <div className="space-y-5">
            <div className="h-16 w-full rounded-xl bg-gray-700/50" />
            <div className="h-16 w-full rounded-xl bg-gray-700/50" />
            <div className="h-16 w-full rounded-xl bg-gray-700/50" />
          </div>
        </div>

      </div>
    </main>
  );
}
