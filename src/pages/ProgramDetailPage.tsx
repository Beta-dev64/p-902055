import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { AcademyProgram } from "@/hooks/use-academy-programs";

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
      </div>
    );
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
        image={program.image ?? undefined}
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

      <main className="pb-20 pt-24">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
            <Link to="/academic">
              <ArrowLeft className="mr-1 h-4 w-4" /> Academy
            </Link>
          </Button>

          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <div>
              <header className="mb-10 space-y-4">
                <h1 className="font-display text-3xl font-bold sm:text-5xl">{program.title}</h1>
                {program.tagline && <p className="text-lg text-primary">{program.tagline}</p>}
                {meta.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {meta.map((value) => (
                      <span
                        key={value}
                        className="rounded-full bg-muted px-3 py-1 text-sm text-foreground"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                )}
                {program.description && (
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                )}
              </header>

              {program.image && (
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  className="mb-12 w-full rounded-2xl border border-border object-cover"
                />
              )}

              <div className="space-y-12">
                <ListBlock title="Syllabus highlights" items={program.syllabus} />
                <ListBlock title="What you'll be able to do" items={program.outcomes} />
                <ListBlock title="Tools you'll use" items={program.tools} />
              </div>
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
                <Button asChild className="w-full">
                  <a href="#enroll">Enroll now</a>
                </Button>
              </div>
            </aside>
          </div>

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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramDetailPage;
