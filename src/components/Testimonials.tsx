import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Reveal, SplitHeadline } from "@/components/motion";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  backgroundImage?: string;
  avatar?: string;
}

const TestimonialSkeleton = () => (
  <div className="relative h-72 animate-pulse overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]">
    <div className="space-y-4 p-8">
      <div className="h-5 w-3/4 rounded-full bg-white/10" />
      <div className="h-5 w-2/3 rounded-full bg-white/10" />
      <div className="mt-10 flex items-center gap-4">
        <div className="h-16 w-16 rounded-lg bg-white/10" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded-full bg-white/10" />
          <div className="h-3 w-20 rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = "/background-section1.png",
  avatar,
}: TestimonialProps) => {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-8 text-white transition-transform duration-500 hover:-translate-y-1.5">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
      <div className="relative z-10">
        <p className="mb-8 text-lg font-medium leading-relaxed sm:text-xl">
          &ldquo;{content}&rdquo;
        </p>
        <div className="flex items-center space-x-4">
          {avatar ? (
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
              <img src={avatar} alt={author} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 text-lg font-semibold">
              {author?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
          <div>
            <h4 className="text-xl font-semibold">{author}</h4>
            <p className="text-white/70">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const format = (
      items: {
        content: string;
        author: string;
        role: string;
        background_image?: string | null;
        avatar?: string | null;
      }[]
    ) =>
      items.map((item) => ({
        content: item.content,
        author: item.author,
        role: item.role,
        backgroundImage: item.background_image || "/background-section1.png",
        avatar: item.avatar || undefined,
      }));

    (async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("status", "approved")
          .order("created_at", { ascending: false });

        if (error) {
          // Fallback for databases that have not applied the moderation migration yet
          const fallback = await supabase
            .from("testimonials")
            .select("*")
            .order("created_at", { ascending: false });
          if (!fallback.error) setTestimonials(format(fallback.data || []));
          return;
        }
        setTestimonials(format(data || []));
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="scroll-mt-24 py-16 bg-background relative sm:py-24" id="testimonials">
      <div className="section-container">
        <Reveal className="mb-12">
          <div className="mb-6 inline-flex items-center rounded-xl border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span>Client Success</span>
          </div>
          <SplitHeadline text="What clients say" className="text-5xl font-display font-bold text-left" />
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {loading ? (
            <>
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </>
          ) : testimonials.length === 0 ? null : (
            testimonials.map((testimonial, index) => (
              <Reveal key={index} delay={index * 90}>
                <TestimonialCard {...testimonial} />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
