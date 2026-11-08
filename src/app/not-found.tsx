
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#0c0d0f] px-4 py-16 text-white">
      <div className="mx-auto max-w-xl text-center">

        {/* 404 Number */}
        <h1 className="text-8xl font-black tracking-tighter text-[#b6ff00] sm:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl font-black uppercase sm:text-4xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          Looks like you've wandered off track! The page you're looking
          for doesn't exist or may have been moved.
          Don't worry, your fitness journey is still on track.
        </p>

        {/* Icon */}
        <div className="my-8 text-6xl">
          🏋️
        </div>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#b6ff00] px-8 py-4 text-sm font-black uppercase text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
        >
          ← Back to Workouts
        </Link>

        {/* Footer Text */}
        <p className="mt-10 text-xs tracking-widest text-gray-600">
          FITLOG — TRAIN WITH INTENT. LOG EVERY SET.
        </p>

      </div>
    </main>
  );
}
