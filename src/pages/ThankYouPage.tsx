import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThankYouPage = () => {
  const [params] = useSearchParams();
  const type = params.get("type") === "academy" ? "academy" : "project";

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Thank you — we've received your request | FuseLabs IO"
        description="Your request has reached the FuseLabs IO team. We reply to every inquiry within one business day."
        path="/thank-you"
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pulse-100 text-pulse-600 mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            {type === "academy"
              ? "Your application is in"
              : "Your inquiry is on its way"}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            {type === "academy"
              ? "Thanks for applying to the FuseLabs Academy. An admissions lead will contact you within 24 hours with next steps, payment options and your cohort start date."
              : "Thanks for reaching out. A FuseLabs strategist will review your brief and get back to you within one business day with next steps and a suggested scope."}
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-10">
            <h2 className="font-semibold mb-3">What happens next</h2>
            <ol className="space-y-2 text-gray-600 text-sm list-decimal list-inside">
              <li>We review your submission and check fit.</li>
              <li>
                {type === "academy"
                  ? "A short call to confirm your level and goals."
                  : "A 30-minute discovery call to unpack the details."}
              </li>
              <li>
                {type === "academy"
                  ? "You receive enrollment details and your onboarding pack."
                  : "You receive a scoped proposal with timeline and pricing."}
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-pulse-500 hover:bg-pulse-600 text-white">
              <Link to="/portfolio">
                See our work
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Back to homepage</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;