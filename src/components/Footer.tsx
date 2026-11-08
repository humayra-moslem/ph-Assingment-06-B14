const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0c0d0f] px-5 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-xl font-black">
          FIT<span className="text-[#b6ff00]">LOG</span>
        </h2>

        <p className="text-center text-sm text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;