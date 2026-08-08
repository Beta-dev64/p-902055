
import React, { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const PartnersScroll = () => {
  const [scrollDirection, setScrollDirection] = useState('left');
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('left');
      } else {
        setScrollDirection('right');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  // Triple the array for seamless infinite scroll
  const infinitePartners = [...partners, ...partners, ...partners];

  return (
    <section className="w-full py-8 bg-background overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-muted-foreground font-medium">Trusted by industry leaders</p>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className={`flex space-x-16 ${scrollDirection === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
          style={{
            width: 'calc(300% + 8rem)',
            animationDuration: '60s'
          }}
        >
          {infinitePartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersScroll;
