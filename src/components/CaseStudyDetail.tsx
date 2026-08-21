import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  tags: string[];
  challenge: string;
  solution: string;
  results: string;
  live_url: string;
  project_images: string[];
  technologies: string[];
}

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from("portfolios")
          .select("*")
          .eq('published', true)
          .eq("slug", slug)
          .single();

        if (error) {
          console.error("Error fetching case study:", error);
          return;
        }

        setCaseStudy(data);
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-primary" />
          <p className="text-muted-foreground">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Case Study Not Found</h1>
          <Link to="/portfolio" className="text-primary transition-colors hover:text-primary/80">
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={`${caseStudy.title} — FuseLabs IO Case Study`}
        description={
          caseStudy.description?.slice(0, 155) || `Case study: ${caseStudy.title} by FuseLabs IO.`
        }
        path={`/case-study/${caseStudy.slug}`}
        type="article"
        image={caseStudy.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: caseStudy.title,
          description: caseStudy.description,
          image: caseStudy.image,
          keywords: caseStudy.technologies?.join(", "),
          author: { "@type": "Organization", name: "FuseLabs IO" },
          publisher: { "@type": "Organization", name: "FuseLabs IO" },
        }}
      />

      {/* Hero — top padding clears fixed header so banner content is never covered */}
      <section className="relative min-h-[28rem] overflow-hidden md:min-h-[34rem]">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40" />
        <div className="relative flex min-h-[28rem] items-start md:min-h-[34rem]">
          <div className="container mx-auto px-4 pb-14 pt-[7.5rem] sm:px-6 sm:pt-36 lg:px-8">
            <Link
              to="/portfolio"
              className="group mb-6 inline-flex items-center text-sm font-medium uppercase tracking-[0.12em] text-white/90 transition-transform duration-300 hover:translate-x-2 hover:text-primary-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
            <h1 className="mb-4 max-w-4xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {caseStudy.title}
            </h1>
            <p className="max-w-2xl text-lg text-white/90">{caseStudy.description}</p>
            {caseStudy.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {caseStudy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wider text-white/90 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="space-y-12 lg:col-span-2">
              <Reveal>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">The Challenge</h2>
                <div
                  className="prose max-w-none text-muted-foreground dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: caseStudy.challenge || "" }}
                />
              </Reveal>

              <Reveal delay={80}>
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Solution</h2>
                <div
                  className="prose max-w-none text-muted-foreground dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: caseStudy.solution || "" }}
                />
              </Reveal>

              {caseStudy.project_images && caseStudy.project_images.length > 0 && (
                <Reveal delay={120}>
                  <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Project Gallery</h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {caseStudy.project_images.map((image, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant-hover"
                      >
                        <img
                          src={image}
                          alt={`${caseStudy.title} image ${index + 1}`}
                          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            <div className="space-y-8">
              <Reveal delay={100}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-display text-xl font-bold text-foreground">Key Results</h3>
                  <div
                    className="prose max-w-none text-muted-foreground dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: caseStudy.results || "" }}
                  />
                </div>
              </Reveal>

              {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                <Reveal delay={140}>
                  <h3 className="mb-4 font-display text-xl font-bold text-foreground">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary transition-transform duration-200 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}

              {caseStudy.live_url && (
                <Reveal delay={180}>
                  <a
                    href={caseStudy.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-motion inline-flex w-full items-center justify-center rounded-sm bg-primary px-6 py-3 font-medium text-primary-foreground"
                  >
                    View Live Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;
