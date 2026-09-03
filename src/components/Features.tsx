
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Rocket, Code, Users, TrendingUp, Settings, Server } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "feature-card glass-card group opacity-0 p-4 sm:p-6",
        "lg:hover:bg-gradient-to-br lg:hover:from-card lg:hover:to-muted",
        "transition-all duration-300"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110 sm:mb-5 sm:h-12 sm:w-12">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-12 sm:py-16 md:py-20 pb-0 relative bg-muted" id="features" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <div className="pulse-chip mx-auto mb-3 sm:mb-4 opacity-0 fade-in-element">
            <span>Services</span>
          </div>
          <h2 className="section-title mb-3 sm:mb-4 opacity-0 fade-in-element">
            Full-stack Execution, <br className="hidden sm:block" />Strategic Solutions
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            From concept to deployment, we deliver comprehensive software solutions that drive your business forward.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <FeatureCard
            icon={<Rocket className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Startup Acceleration"
            description="From idea to MVP in 60 days. We help startups validate fast, build lean, and launch investor-ready with strategy, design, and growth loops baked in."
            index={0}
          />
          <FeatureCard
            icon={<Code className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Product Development"
            description="We craft scalable, high-performance web and mobile apps—custom-built to drive efficiency, revenue, and market differentiation."
            index={1}
          />
          <FeatureCard
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Team Extension"
            description="Access an elite, cross-functional tech squad on-demand. We integrate seamlessly with your team or operate independently to deliver results fast."
            index={2}
          />
          <FeatureCard
            icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Growth Engineering"
            description="We don't just build—we grow. Our growth team aligns tech with marketing to optimize funnels, drive SEO, and boost retention."
            index={3}
          />
          <FeatureCard
            icon={<Settings className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Systems Integration"
            description="Connect your platform to payments, logistics, messaging, and more—building intelligent workflows that scale across your stack."
            index={4}
          />
          <FeatureCard
            icon={<Server className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="DevOps Support"
            description="Speed, uptime, and security you can trust. We manage deployments, monitor performance, and ensure your product is stable, secure, and scalable."
            index={5}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
