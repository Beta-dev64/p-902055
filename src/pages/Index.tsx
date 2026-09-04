import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import Hero from "@/components/Hero";
import HumanoidSection from "@/components/HumanoidSection";
import DetailsSection from "@/components/DetailsSection";
import ImageShowcaseSection from "@/components/ImageShowcaseSection";
import Features from "@/components/Features";
import Portfolio from "@/components/Portfolio";
import PartnersScroll from "@/components/PartnersScroll";
import Testimonials from "@/components/Testimonials";
import ReviewForm from "@/components/ReviewForm";
import Team from "@/components/Team";
import Newsletter from "@/components/Newsletter";
import MadeByHumans from "@/components/MadeByHumans";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = (this as HTMLAnchorElement).getAttribute("href");
        const targetId = href?.substring(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        e.preventDefault();
        const offset = window.innerWidth < 768 ? 100 : 80;
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: "smooth",
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="FuseLabs IO — Software Development & Growth Agency"
        description="FuseLabs IO builds MVPs, scalable software and growth engines. Custom development, cloud, AI and SEO services for ambitious software businesses."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "FuseLabs IO",
            url: "https://fuselabsio.lovable.app/",
            logo: "https://fuselabsio.lovable.app/logo.svg",
            description:
              "Software agency building MVPs, scalable applications and growth engines.",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FuseLabs IO",
            url: "https://fuselabsio.lovable.app/",
          },
        ]}
      />
      <Navbar />
      <main className="bg-background">
        <Hero />
        <div className="reveal">
          <HumanoidSection />
        </div>
        <div className="reveal">
          <ImageShowcaseSection />
        </div>
        <div className="reveal">
          <Features />
        </div>
        <div className="reveal">
          <Portfolio />
        </div>
        <div className="reveal">
          <PartnersScroll />
        </div>
        <div className="reveal">
          <Testimonials />
        </div>
        <div className="reveal">
          <ReviewForm />
        </div>
        <div className="reveal">
          <Team />
        </div>
        <div className="reveal">
          <DetailsSection />
        </div>
        <div className="reveal">
          <Newsletter />
        </div>
        <div className="reveal">
          <MadeByHumans />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
