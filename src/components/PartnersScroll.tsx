
import React, { useEffect, useState, useRef } from "react";

const PartnersScroll = () => {
  const [scrollDirection, setScrollDirection] = useState('left');
  const [isPaused, setIsPaused] = useState(false);
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

  const partners = [
    { name: "Microsoft", logo: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png" },
    { name: "Google", logo: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png" },
    { name: "Amazon", logo: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png" },
    { name: "Apple", logo: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png" },
    { name: "Meta", logo: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png" },
    { name: "Tesla", logo: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png" },
  ];

  // Triple the array for seamless infinite scroll
  const infinitePartners = [...partners, ...partners, ...partners];

  return (
    <section className="w-full py-8 bg-white overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-gray-600 font-medium">Trusted by industry leaders</p>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className={`flex space-x-16 ${isPaused ? '' : scrollDirection === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
          style={{
            width: 'calc(300% + 8rem)',
            animationDuration: '60s'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {infinitePartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
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
