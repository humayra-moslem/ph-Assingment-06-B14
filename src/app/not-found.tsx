import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0c0d0f] px-5 text-center text-white">
      <h1 className="text-7xl font-black text-[#b6ff00]">
        404
      </h1>

      <h2 className="mt-5 text-2xl font-bold">
        Workout Not Found
      </h2>

      <p className="mt-3 text-gray-400">
        Sorry, the workout you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="btn mt-7 border-none bg-[#b6ff00] text-black hover:bg-lime-400"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;