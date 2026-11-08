import Image from "next/image";

import banner from "@/assets/banner.png";
export default function HeroBanner() {
  return (
    <section className="mx-4 mt-8 sm:mx-4 my-4 lg:mx-8 my-8">
      <div
        className="
          overflow-hidden rounded-2xl border border-[#242832]
          bg-[#15171c]
          px-6 py-10
          sm:px-10 sm:py-12
          lg:px-16 lg:py-16
        "
      >
        <div
          className="
            flex flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:gap-10
          "
        >
          {/* LEFT CONTENT */}
          <div className="w-full lg:max-w-3xl">
            {/* Eyebrow */}
            <p
              className="
                mb-5 text-sm font-bold uppercase tracking-widest
                text-[#b6ff00]
                sm:mb-6
              "
            >
              Workout Library
            </p>

            {/* Heading */}
            <h1
              className="
                max-w-3xl
                text-4xl font-black uppercase leading-[0.9]
                tracking-tight text-white
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-[82px]
              "
            >
              Train With Intent.
              <br />
              Log Every Set.
            </h1>

            {/* Description */}
            <p
              className="
                mt-6 max-w-2xl
                text-base leading-7 text-[#9ca3af]
                sm:mt-7 sm:text-lg
                sm:leading-8
              "
            >
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* Button */}
            <div className="mt-8 sm:mt-10">
              <a
                href="/LibrarySection"
                className="
                  btn
                  h-12 min-h-12
                  rounded-lg
                  border-none
                  bg-[#b6ff00]
                  px-7
                  text-sm font-bold uppercase
                  text-black
                  shadow-none
                  hover:bg-[#c4ff33]
                "
              >
                Browse Workouts
              </a>
            </div>
          </div>

          {/* IMAGE AREA */}
          {/* IMAGE AREA */}
<div
  className="
    relative
    mt-10
    flex
    w-full
    items-center
    justify-center
    lg:mt-0
    lg:w-[48%]
    lg:flex-shrink-0
  "
>
  <Image
    src={banner}
    alt="Workout exercise"
    width={1200}
    height={1000}
    priority
    className="
      h-auto
      w-full
      max-w-[600px]
      object-contain
      lg:max-w-[650px]
      xl:max-w-[700px]
    "
  />
</div>
        </div>
      </div>
    </section>
  );
}

