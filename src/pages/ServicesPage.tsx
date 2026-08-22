import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export interface ServiceRow {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  image: string | null;
  highlights: string[] | null;
  deliverables: string[] | null;
  process: string[] | null;
  sort_order: number;
}

const ServicesPage = () => {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) console.error("Error fetching services:", error);
      if (active) {
        setServices((data as ServiceRow[]) || []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Services — Product, Web & AI Engineering | FuseLabs IO"
        description="Explore FuseLabs IO services: startup acceleration, product design, web and app engineering, growth and AI automation — delivered by a senior partner team."
        path="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: `https://fuselabsio.lovable.app/services/${service.slug}`,
          })),
        }}
      />
      <Navbar />

      <main className="pb-20 pt-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <header className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              What we do
            </p>
            <h1 className="mb-4 font-display text-3xl font-bold sm:text-5xl">
              Services built to move your product forward
            </h1>
            <p className="text-lg text-muted-foreground">
              From first prototype to scaled platform, pick the engagement that fits where you
              are today.
            </p>
          </header>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading services…
            </div>
          ) : services.length === 0 ? (
            <p className="text-muted-foreground">Services are being updated. Please check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50"
                >
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="mb-5 h-40 w-full rounded-xl object-cover"
                    />
                  )}
                  <h2 className="mb-2 font-display text-xl font-semibold">{service.title}</h2>
                  {service.tagline && (
                    <p className="mb-3 text-sm text-primary">{service.tagline}</p>
                  )}
                  {service.description && (
                    <p className="mb-5 line-clamp-4 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  )}
                  <span className="mt-auto inline-flex items-center text-sm font-medium text-foreground">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 text-center">
            <h2 className="mb-3 font-display text-2xl font-semibold">
              Not sure which one you need?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              Tell us about your project and we'll recommend the fastest path to launch.
            </p>
            <Button asChild size="lg">
              <Link to="/start-project">Start a project</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
