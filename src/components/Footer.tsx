import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/logo.png'
const Footer = () => {
  return (
    <footer className="border-t border-[#1d2026] bg-[#090a0c]">
      <div
        className="
          mx-auto flex min-h-[120px] max-w-[1600px]
          flex-col items-center justify-between
          gap-6 px-6 py-8
          sm:flex-row sm:px-8
          lg:px-10
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            flex items-center gap-3
            text-lg font-black tracking-wide text-white
          "
        >
          {/* Dumbbell icon */}
          <Image src={logo} alt="Fitlog logo" />

          <span>FITLOG</span>
        </Link>

        {/* Copyright */}
        <p
          className="
            text-center text-sm
            leading-6 text-[#737985]
            sm:text-right
          "
        >
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;