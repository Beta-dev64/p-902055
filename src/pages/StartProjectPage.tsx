import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";

const StartProjectPage = () => {
  const [params] = useSearchParams();
  const [options, setOptions] = useState<{ slug: string; title: string }[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("services")
        .select("slug,title")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      setOptions(data || []);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Start a project with FuseLabs IO"
        description="Share your product brief with FuseLabs IO. We reply within one business day with a recommended scope, timeline and price."
        path="/start-project"
      />
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="pulse-chip mb-4">
            <span>Project inquiry</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Let's scope your project
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            A few details is all we need to come back with a plan. Everything you
            send stays confidential.
          </p>
          <div className="rounded-3xl border border-gray-200 p-6 sm:p-10">
            <LeadForm
              type="project"
              options={options}
              defaultSelection={params.get("service") || ""}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartProjectPage;