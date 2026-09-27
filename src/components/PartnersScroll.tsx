import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Marquee } from "@/components/ui/marquee";

interface Partner {
  id?: string;
  name: string;
  logo: string;
}

const PartnersScroll = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  if (partners.length === 0) return null;

  return (
    <section className="w-full overflow-hidden bg-muted py-10 dark:bg-primary sm:py-12">
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground dark:text-primary-foreground/80">
        Trusted by industry leaders
      </p>

      <Marquee
        pauseOnHover
        className="[--duration:36s] [--gap:2.5rem] sm:[--gap:3.5rem]"
      >
        {partners.map((partner, index) => (
          <div
            key={partner.id ?? `${partner.name}-${index}`}
            className="flex h-16 w-32 shrink-0 items-center justify-center rounded-xl bg-white px-4 shadow-sm"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-10 max-w-full object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default PartnersScroll;
