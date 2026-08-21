import collabPhoto from "@/assets/academy/academy-memory-collab.jpg";
import demoDayPhoto from "@/assets/academy/academy-memory-demoday.jpg";
import pairPhoto from "@/assets/academy/academy-memory-pair.jpg";
import cohortPhoto from "@/assets/academy/academy-memory-cohort.jpg";

const MEMORIES = [
  {
    image: collabPhoto,
    caption: "Whiteboarding the data model, take three",
    className: "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto",
  },
  {
    image: demoDayPhoto,
    caption: "Demo day — Cohort 04",
    className: "aspect-square sm:aspect-[4/3]",
  },
  {
    image: pairPhoto,
    caption: "The bug that took all afternoon",
    className: "aspect-square",
  },
  {
    image: cohortPhoto,
    caption: "Graduation morning, still in disbelief",
    className: "sm:col-span-2 aspect-[16/9] sm:aspect-[16/7]",
  },
];

const AcademyMemories = () => {
  return (
    <section id="memories" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Academy life
          </span>
          <h2 className="mt-4 font-academy text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.01em] text-foreground">
            A few of our favourite memories.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/65 sm:text-lg">
            The whiteboard sessions, the demo-day nerves, the group photo
            nobody was ready for — this is what a cohort actually feels like.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-5">
          {MEMORIES.map((memory) => (
            <figure
              key={memory.caption}
              className={`group relative overflow-hidden rounded-2xl ${memory.className}`}
            >
              <img
                src={memory.image}
                alt={memory.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b16]/70 via-[#1e1b16]/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-medium text-[#F7F3EC] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {memory.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyMemories;
