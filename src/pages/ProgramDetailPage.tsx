import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { PageHero, Reveal, Magnetic } from "@/components/motion";
import type { AcademyProgram } from "@/hooks/use-academy-programs";
import { trackCtaClick } from "@/lib/analytics";

const ListBlock = ({ title, items }: { title: string; items?: string[] | null }) => {
  if (!items || items.length === 0) return null;
  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-semibold">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const ProgramDetailSkeleton = () => (
  <div className="min-h-screen animate-pulse bg-background">
    <div className="bg-[#070605] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
      <div className="mx-auto w-full max-w-6xl">
        <div className="h-6 w-24 rounded-full bg-white/10" />
        <div className="mt-6 h-10 w-3/4 rounded-full bg-white/10" />
        <div className="mt-3 h-10 w-1/2 rounded-full bg-white/10" />
        <div className="mt-6 flex gap-2">
          <div className="h-7 w-20 rounded-full bg-white/[0.08]" />
          <div className="h-7 w-24 rounded-full bg-white/[0.08]" />
          <div className="h-7 w-16 rounded-full bg-white/[0.08]" />
        </div>
        <div className="mt-6 h-4 w-2/3 rounded-full bg-white/[0.06]" />
      </div>
    </div>
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          <div className="h-64 w-full rounded-2xl bg-muted" />
          <div className="mt-8 h-7 w-44 rounded-full bg-muted" />
          <div className="h-4 w-full rounded-full bg-muted/70" />
          <div className="h-4 w-5/6 rounded-full bg-muted/70" />
          <div className="h-4 w-4/6 rounded-full bg-muted/50" />
        </div>
        <div className="h-56 rounded-2xl border border-border bg-muted/40" />
      </div>
    </div>
  </div>
);

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [program, setProgram] = useState<AcademyProgram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("academy_programs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) console.error("Error fetching program:", error);
      if (active) {
        setProgram((data as AcademyProgram) || null);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return <ProgramDetailSkeleton />;
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-4 pb-20 pt-32 text-center">
          <h1 className="mb-4 font-display text-3xl font-bold">Program not found</h1>
          <p className="mb-6 text-muted-foreground">
            This program may have been unpublished or renamed.
          </p>
          <Button asChild>
            <Link to="/academic">See all programs</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const meta = [program.price, program.duration, program.level].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={`${program.title} Program | FuseLabs Academy`}
        description={
          program.description?.slice(0, 155) ??
          `${program.title} at FuseLabs Academy — ${program.duration ?? "hands-on"} mentor-led training with real projects.`
        }
        path={`/academic/${program.slug}`}
        image={program.image ?? "https://fuselabsio.lovable.app/og-academy.jpg"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: program.title,
          description: program.description ?? undefined,
          timeRequired: program.duration ?? undefined,
          educationalLevel: program.level ?? undefined,
          provider: {
            "@type": "Organization",
            name: "FuseLabs IO",
            sameAs: "https://fuselabsio.lovable.app/",
          },
        }}
      />
      <Navbar />

      <PageHero
        eyebrow="Program"
        title={program.title}
        description={
          <>
            {program.tagline && <span className="block text-primary">{program.tagline}</span>}
            {program.description}
          </>
        }
      >
        {meta.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {meta.map((value) => (
              <span
                key={value}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-sm text-white/80"
              >
                {value}
              </span>
            ))}
          </div>
        )}
      </PageHero>

      <main className="pb-20">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2">
            <Link to="/academic">
              <ArrowLeft className="mr-1 h-4 w-4" /> Academy
            </Link>
          </Button>

          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <div>
              {program.image && (
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  className="mb-12 w-full rounded-2xl border border-border object-cover"
                />
              )}

              <Reveal stagger={80}>
                <div className="space-y-12">
                  <ListBlock title="Syllabus highlights" items={program.syllabus} />
                  <ListBlock title="What you'll be able to do" items={program.outcomes} />
                  <ListBlock title="Tools you'll use" items={program.tools} />
                </div>
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Tuition</p>
                <p className="mb-4 font-display text-3xl font-bold">
                  {program.price ?? "Talk to us"}
                </p>
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  {program.duration && <li>Duration: {program.duration}</li>}
                  {program.level && <li>Level: {program.level}</li>}
                </ul>
                <Magnetic strength={0.2} className="w-full">
                  <Button asChild className="w-full">
                    <a
                      href="#enroll"
                      onClick={() => trackCtaClick("program", program.slug, "pricing_card")}
                    >
                      Enroll now
                    </a>
                  </Button>
                </Magnetic>
              </div>
            </aside>
          </div>

          <Reveal>
            <section
              id="enroll"
              className="mt-16 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              <h2 className="mb-2 font-display text-2xl font-semibold">
                Apply for {program.title}
              </h2>
              <p className="mb-6 text-muted-foreground">
                Send your details and an advisor will share cohort dates and payment options.
              </p>
              <LeadForm
                type="enrollment"
                programSlug={program.slug}
                submitLabel="Submit application"
              />
            </section>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramDetailPage;
