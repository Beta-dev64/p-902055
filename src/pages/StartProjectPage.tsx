import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";

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
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="mb-3 font-display text-3xl font-bold sm:text-4xl">
            Start your project
          </h1>
          <p className="mb-8 text-muted-foreground">
            A few details is all we need to scope the work and come back with a plan.
          </p>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <LeadForm type="project" serviceSlug={service} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartProjectPage;