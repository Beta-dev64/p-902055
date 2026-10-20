import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { PageHero, Reveal } from "@/components/motion";

const StartProjectPage = () => {
  const [params] = useSearchParams();
  const service = params.get("service") ?? undefined;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Start a project with FuseLabs IO"
        description="Tell us what you're building. Share your goals, budget and timeline and our team replies within one business day."
        path="/start-project"
      />
      <Navbar />
      <main className="pb-16">
        <PageHero
          eyebrow="New project"
          title="Start your project"
          description="A few details is all we need to scope the work and come back with a plan."
        />
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <LeadForm type="project" serviceSlug={service} />
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartProjectPage;