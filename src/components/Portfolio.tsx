import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Reveal, SplitHeadline, Magnetic } from "@/components/motion";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  tags: string[] | null;
}

const PortfolioSkeleton = () => (
  <div className="h-80 animate-pulse overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]">
    <div className="h-1/2 bg-white/5" />
    <div className="space-y-3 p-6">
      <div className="h-4 w-24 rounded-full bg-white/10" />
      <div className="h-5 w-3/4 rounded-full bg-white/10" />
      <div className="h-3 w-full rounded-full bg-white/5" />
    </div>
  </div>
);

const Portfolio = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("portfolios")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(3);
        if (error) throw error;
        setCaseStudies(data || []);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="w-full py-16 sm:py-24 bg-muted" id="portfolio">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center sm:mb-16">
          <div className="mb-6 inline-flex items-center rounded-xl border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span>Portfolio</span>
          </div>
          <SplitHeadline
            text="Our Success Stories"
            className="section-title mb-4"
          />
          <p className="section-subtitle mx-auto">
            Explore how we&apos;ve helped businesses transform their digital
            presence with cutting-edge software solutions.
          </p>
        </Reveal>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <>
              <PortfolioSkeleton />
              <PortfolioSkeleton />
              <PortfolioSkeleton />
            </>
          ) : (
            caseStudies.map((study, i) => (
              <Reveal key={study.id} delay={i * 90} y={48}>
                <Link
                  to={`/case-study/${study.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elegant transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elegant-hover"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {study.image ? (
                      <img
                        src={study.image}
                        alt={study.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {study.title}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {study.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/15 px-2 py-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-3 font-display text-xl font-semibold transition-colors group-hover:text-primary">
                      {study.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {study.description || "No description available"}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                      View Case Study
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))
          )}
        </div>

        {caseStudies.length > 0 && (
          <div className="text-center">
            <Magnetic strength={0.2}>
              <Link
                to="/portfolio"
                className="btn-motion inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground"
              >
                See All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
