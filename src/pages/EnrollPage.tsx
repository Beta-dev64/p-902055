import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";

const EnrollPage = () => {
  const [params] = useSearchParams();
  const program = params.get("program") ?? undefined;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Enroll at FuseLabs Academy"
        description="Apply for a FuseLabs Academy program in frontend, backend or AI/ML engineering and get cohort details from an advisor."
        path="/enroll"
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="mb-3 font-display text-3xl font-bold sm:text-4xl">
            Academy enrollment
          </h1>
          <p className="mb-8 text-muted-foreground">
            {program
              ? `You're applying for the ${program.replace(/-/g, " ")} program.`
              : "Tell us where you are today and which track you want to join."}
          </p>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <LeadForm type="enrollment" programSlug={program} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnrollPage;