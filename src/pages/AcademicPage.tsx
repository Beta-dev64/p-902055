import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useAcademyPrograms } from "@/hooks/use-academy-programs";
import AcademyHero from "@/components/academy/AcademyHero";
import AcademyMission from "@/components/academy/AcademyMission";
import AcademyTracks from "@/components/academy/AcademyTracks";
import AcademyQuote from "@/components/academy/AcademyQuote";
import AcademyStory from "@/components/academy/AcademyStory";
import AcademyMemories from "@/components/academy/AcademyMemories";
import AcademyInsights from "@/components/academy/AcademyInsights";
import AcademyEnroll from "@/components/academy/AcademyEnroll";
import AcademyClosing from "@/components/academy/AcademyClosing";

const AcademicPage = () => {
  const { programs, loading } = useAcademyPrograms();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Academy — Frontend, Backend & AI Courses | FuseLabs IO"
        description="FuseLabs Academy: hands-on, mentor-led training programs in frontend, backend and AI/ML development, with real projects, a demo day, and a certificate that means something."
        path="/academic"
        jsonLd={programs.map((program) => ({
          "@context": "https://schema.org",
          "@type": "Course",
          name: program.title,
          description:
            program.description ??
            `${program.title} program — ${program.duration ?? "3 months"} of hands-on training with FuseLabs Academy.`,
          timeRequired: program.duration ?? undefined,
          provider: {
            "@type": "Organization",
            name: "FuseLabs IO",
            sameAs: "https://fuselabsio.lovable.app/",
          },
        }))}
      />
      <Navbar />

      <main className="academy-scope bg-background">
        <AcademyHero />

        <div className="reveal">
          <AcademyMission />
        </div>

        <div className="reveal">
          <AcademyTracks
            programs={programs}
            loading={loading}
            selectedSlug={selectedSlug}
            onSelectSlug={setSelectedSlug}
          />
        </div>

        <div className="reveal">
          <AcademyQuote />
        </div>

        <div className="reveal">
          <AcademyStory />
        </div>

        <div className="reveal">
          <AcademyMemories />
        </div>

        <div className="reveal">
          <AcademyInsights programs={programs} onSelectSlug={setSelectedSlug} />
        </div>

        <div className="reveal">
          <AcademyEnroll programs={programs} selectedSlug={selectedSlug} />
        </div>

        <div className="reveal">
          <AcademyClosing />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AcademicPage;
