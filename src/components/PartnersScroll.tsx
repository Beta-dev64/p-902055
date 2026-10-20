import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Marquee } from "@/components/motion";

interface Partner {
  id?: string;
  name: string;
  logo: string;
}

const PartnersScroll = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from("partners")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error("Error fetching partners:", error);
        setPartners((data as Partner[]) || []);
        setLoaded(true);
      });
  }, []);

  if (!loaded) return null;
  if (partners.length === 0) return null;

  return (
    <section className="w-full py-10 bg-background overflow-hidden" id="partners">
      <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        Trusted by industry leaders
      </p>

      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Marquee speed={45}>
          {partners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="mx-10 flex h-16 w-32 flex-shrink-0 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersScroll;
