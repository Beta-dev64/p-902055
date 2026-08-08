import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Clock, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { AcademyProgram } from "@/lib/cms";

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [program, setProgram] = useState<AcademyProgram | null>(null);
  const [allPrograms, setAllPrograms] = useState<AcademyProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [{ data: one }, { data: all }] = await Promise.all([
        supabase.from("academy_programs").select("*").eq("slug", slug).maybeSingle(),
        supabase
          .from("academy_programs")
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true }),
      ]);
      setProgram((one as AcademyProgram) || null);
      setAllPrograms((all as AcademyProgram[]) || []);
      setLoading(false);
    };
    if (slug) load();
  }, [slug]);

  const options = useMemo(
    () => allPrograms.map((p) => ({ slug: p.slug, title: p.title })),
    [allPrograms],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Loading program…</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-white">Program not found</h1>
        <Link to="/academic" className="text-emerald-400 hover:underline">
          Back to the Academy
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Seo
        title={`${program.title} Course — FuseLabs Academy`}
        description={
          program.tagline ||
          program.description?.slice(0, 155) ||
          `${program.title} program at FuseLabs Academy.`
        }
        path={`/academic/${program.slug}`}
        image={program.image || undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: program.title,
          description: program.description,
          timeRequired: program.duration,
          educationalLevel: program.level,
          provider: { "@type": "Organization", name: "FuseLabs IO" },
        }}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Link
            to="/academic"
            className="inline-flex items-center text-sm text-gray-400 hover:text-emerald-400 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All programs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                {program.title}
              </h1>
              {program.tagline && (
                <p className="text-xl text-emerald-400 mb-6">{program.tagline}</p>
              )}
              <p className="text-lg text-gray-300 mb-8">{program.description}</p>

              {program.image && (
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover max-h-[360px] mb-10"
                />
              )}

              {program.syllabus && program.syllabus.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-display font-bold text-white mb-6">
                    Syllabus highlights
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {program.syllabus.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-gray-300 bg-gray-800/60 rounded-xl p-4"
                      >
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {program.outcomes && program.outcomes.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-display font-bold text-white mb-6">
                    What you'll be able to do
                  </h2>
                  <ul className="space-y-3">
                    {program.outcomes.map((item) => (
                      <li key={item} className="flex gap-3 text-gray-300">
                        <GraduationCap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {program.tools && program.tools.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-4">
                    Tools you'll master
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {program.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing card */}
            <aside className="lg:sticky lg:top-28 h-fit rounded-3xl bg-gray-800 p-8 border border-gray-700">
              <div className="text-4xl font-bold text-white mb-2">
                {program.price}
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Full program fee. Installment plans available.
              </p>
              <div className="space-y-3 text-gray-300 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  {program.duration}
                </div>
                {program.level && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    {program.level}
                  </div>
                )}
              </div>
              <Button
                asChild
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <a href="#enroll">
                  Enroll now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </aside>
          </div>
        </section>

        <section id="enroll" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-3xl mx-auto rounded-3xl bg-gray-800 border border-gray-700 p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Enroll in {program.title}
            </h2>
            <p className="text-gray-400 mb-8">
              Apply below and admissions will contact you within 24 hours.
            </p>
            <LeadForm
              type="academy"
              options={options}
              defaultSelection={program.slug}
              variant="dark"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramDetailPage;