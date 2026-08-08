import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Service } from "@/lib/cms";

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) console.error("Error loading services:", error);
      setServices((data as Service[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Software Development Services | FuseLabs IO"
        description="Startup acceleration, product development, team extension, growth engineering, systems integration and DevOps support from the FuseLabs IO team."
        path="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "FuseLabs IO Services",
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: `https://fuselabsio.lovable.app/services/${service.slug}`,
          })),
        }}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="pulse-chip mb-4">
              <span>Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Full-stack execution for teams that need to ship
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We plug into your business as the technical partner that plans,
              builds, launches and grows the product. Pick the engagement that
              matches where you are today.
            </p>
            <Button asChild size="lg" className="bg-pulse-500 hover:bg-pulse-600 text-white">
              <Link to="/start-project">
                Start a project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          {loading ? (
            <p className="text-gray-500">Loading services…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.slug}`}
                  className="group block rounded-2xl border border-gray-200 p-6 hover:border-pulse-300 hover:shadow-elegant transition-all"
                >
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-pulse-600 transition-colors">
                    {service.title}
                  </h2>
                  {service.tagline && (
                    <p className="text-sm text-pulse-600 mb-3">{service.tagline}</p>
                  )}
                  <p className="text-gray-600 text-sm mb-5 line-clamp-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-pulse-600">
                    Explore this service
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="rounded-3xl bg-gray-50 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
              Not sure which engagement fits?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Send us the problem you're solving. We'll come back with a
              recommended scope, timeline and price.
            </p>
            <Button asChild size="lg" className="bg-pulse-500 hover:bg-pulse-600 text-white">
              <Link to="/start-project">
                Tell us about your project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;