// Style: Proof rail — quiet monochrome partner marks become color only when attention is intentionally placed on them.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Partner = { id: string; name: string; logo: string | null };

const PartnersScroll = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("partners")
      .select("id, name, logo")
      .not("logo", "is", null)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (active) {
          setPartners((data as Partner[]) || []);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  if (!loading && partners.length === 0) return null;

  const items = [...partners, ...partners];

  return (
    <section className="partner-rail border-y border-[#3A2A1E] bg-[#17130F] py-7 text-[#F7F1E8] sm:py-9" aria-label="Brands that have partnered with FuseLabs">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-5 flex items-center justify-between gap-6">
          <p className="eyebrow text-[#9E9285]">Built with / trusted by</p>
          <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#6F6358] sm:block">Partner signal / 01</span>
        </div>
      </div>
      <div className="partner-marquee overflow-hidden">
        <div className="partner-track flex w-max items-center gap-8 pl-5 sm:gap-14 sm:pl-8 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
          {items.map((partner, index) => (
            <div className="partner-logo group flex h-14 w-32 shrink-0 items-center justify-center rounded-sm border border-[#3A2A1E] px-4 transition-colors hover:border-[#6F6358] focus-visible:border-[#DE8321] sm:h-16 sm:w-40" key={`${partner.id}-${index}`} tabIndex={0} title={`${partner.name} — partner logo`}>
              <img src={partner.logo || undefined} alt={partner.name} className="max-h-9 max-w-full object-contain grayscale opacity-55 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersScroll;
