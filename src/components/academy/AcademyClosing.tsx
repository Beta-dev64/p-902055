import lateNightPhoto from "@/assets/academy/academy-memory-latenight.jpg";

const AcademyClosing = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#14110d] py-28 sm:py-36">
      <img
        src={lateNightPhoto}
        alt="A FuseLabs Academy student working late on a project, lit by a warm desk lamp"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14110d]/40 via-[#14110d]/75 to-[#14110d]" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F3E7CE]/80">
          By the graduates who built it
        </span>
        <p className="mt-6 font-academy text-[clamp(1.9rem,5vw,3.5rem)] font-medium italic leading-[1.15] text-[#FBF6EC]">
          Careers move faster when the work feels real.
        </p>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#F3E7CE]/70">
          FuseLabs Academy
        </p>
      </div>
    </section>
  );
};

export default AcademyClosing;
