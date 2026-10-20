import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { PageHero, Reveal } from "@/components/motion";

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
      <main className="pb-16">
        <PageHero
          eyebrow="Academy"
          title="Academy enrollment"
          description={
            program
              ? `You're applying for the ${program.replace(/-/g, " ")} program.`
              : "Tell us where you are today and which track you want to join."
          }
        />
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <LeadForm type="enrollment" programSlug={program} />
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnrollPage;