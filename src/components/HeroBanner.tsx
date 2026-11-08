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


// import Link from "next/link";
// import Image from "next/image";
// import banner from "@/assets/banner.png"
// export default function HeroBanner() {
//   return (
//     <section className="px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-16">
//       <div className="mx-auto max-w-[1540px] overflow-hidden rounded-2xl border border-[#252a32] bg-[#15171c]">
//         <div className="grid min-h-[560px] grid-cols-1 items-center gap-8 px-6 py-12 sm:px-10 sm:py-14 md:min-h-[500px] md:px-12 lg:grid-cols-[1fr_0.8fr] lg:gap-4 lg:px-[70px] lg:py-16">
          
//           {/* Text Section */}
//           <div className="max-w-2xl">
//             <p className="mb-6 text-xs font-bold uppercase tracking-[0.12em] text-[#b6ff00] sm:text-sm">
//               Workout Library
//             </p>

//             <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[76px]">
//               Train with intent. Log every set.
//             </h1>

//             <p className="mt-7 max-w-xl text-base leading-7 text-[#9ca3af] sm:text-lg sm:leading-8">
//               FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
//               into today&apos;s plan, and watch the week&apos;s work add up.
//             </p>

//             <Link
//               href="/workouts"
//               className="btn mt-8 h-12 min-h-12 rounded-lg border-none bg-[#b6ff00] px-7 text-sm font-bold uppercase text-black hover:bg-[#c8ff42]"
//             >
//               Browse Workouts
//             </Link>
//           </div>

//           {/* Image Section */}
//           <div className="relative flex min-h-[260px] items-center justify-center md:min-h-[300px] lg:min-h-[420px]">
//             <div className="relative h-[280px] w-full sm:h-[340px] md:h-[380px] lg:h-[440px]">
//               <Image
//                 src="{banner}"
//                 alt="Workout illustration"
//                 fill
//                 priority
//                 className="object-contain"
//                 sizes="(max-width: 768px) 100vw, 50vw"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }