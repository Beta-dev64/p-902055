import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { PageHero, Reveal, Magnetic } from "@/components/motion";
import { SITE_URL } from "@/lib/social";

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

const ServiceSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-border bg-card p-6">
    <div className="mb-5 h-40 w-full rounded-xl bg-muted" />
    <div className="mb-3 h-5 w-2/3 rounded-full bg-muted" />
    <div className="mb-2 h-4 w-1/2 rounded-full bg-muted/70" />
    <div className="h-4 w-full rounded-full bg-muted/50" />
  </div>
);

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
            url: `${SITE_URL}/services/${service.slug}`,
          })),
        }}
      />
      <Navbar />

      <main className="pb-20">
        <PageHero
          eyebrow="What we do"
          title="Services built to move your product forward"
          description="From first prototype to scaled platform, pick the engagement that fits where you are today."
        />

        <div className="container mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceSkeleton />
              <ServiceSkeleton />
              <ServiceSkeleton />
            </div>
          ) : services.length === 0 ? (
            <p className="text-muted-foreground">Services are being updated. Please check back soon.</p>
          ) : (
            <Reveal stagger={80}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant"
                  >
                    {service.image && (
                      <div className="-m-6 mb-5 overflow-hidden rounded-t-2xl">
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          className="h-40 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                    )}
                    <h2 className="mb-2 font-display text-xl font-semibold">
                      {service.title}
                    </h2>
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
            </Reveal>
          )}

          <Reveal className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 text-center">
            <h2 className="mb-3 font-display text-2xl font-semibold">
              Not sure which one you need?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              Tell us about your project and we&apos;ll recommend the fastest path to launch.
            </p>
            <Magnetic strength={0.2} className="inline-block">
              <Button asChild size="lg">
                <Link to="/start-project">Start a project</Link>
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
