import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#0c0d0f] px-5 py-20 text-white md:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 font-semibold tracking-[0.3em] text-[#b6ff00]">
            YOUR FITNESS. YOUR RULES.
          </p>

          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl leading-7 text-gray-400">
            Discover workouts, build your personal training plan,
            and keep track of every step of your fitness journey.
          </p>

          <Link
            href="#library"
            className="btn mt-8 border-none bg-[#b6ff00] px-8 font-bold text-black hover:bg-lime-400"
          >
            Explore Workouts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;