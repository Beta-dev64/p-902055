import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";

const ThankYouPage = () => {
  const [params] = useSearchParams();
  const isEnrollment = params.get("type") === "enrollment";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Thank you — FuseLabs IO"
        description="Your request has been received. Our team will get back to you within one business day."
        path="/thank-you"
      />
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-xl text-center">
          <CheckCircle2 className="mx-auto mb-6 h-14 w-14 text-primary" />
          <h1 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
            {isEnrollment ? "Application received" : "Request received"}
          </h1>
          <p className="mb-8 text-muted-foreground">
            {isEnrollment
              ? "Thanks for applying to the FuseLabs Academy. An advisor will reach out with next steps, payment details and your cohort start date."
              : "Thanks for reaching out. We'll review your project and reply within one business day with next steps and a suggested scope."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={isEnrollment ? "/academic" : "/services"}>
                {isEnrollment ? "Browse programs" : "Explore services"}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;