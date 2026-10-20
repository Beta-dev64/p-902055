import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Rocket, Code, Users, TrendingUp, Settings, Server } from "lucide-react";
import { Reveal, SplitHeadline } from "@/components/motion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

const FeatureCard = ({ icon, title, description, href }: FeatureCardProps) => {
  const card = (
    <div
      className={
        "feature-card glass-card group h-full p-4 sm:p-6 " +
        "lg:hover:bg-gradient-to-br lg:hover:from-card lg:hover:to-muted " +
        "transition-all duration-300"
      }
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110 sm:mb-5 sm:h-12 sm:w-12">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[inherit]">
        {card}
      </Link>
    );
  }
  return card;
};

const FEATURES = [
  {
    icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Startup Acceleration",
    description:
      "From idea to MVP in 60 days. We help startups validate fast, build lean, and launch investor-ready with strategy, design, and growth loops baked in.",
    href: "/services/startup-acceleration",
  },
  {
    icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Product Development",
    description:
      "We craft scalable, high-performance web and mobile apps—custom-built to drive efficiency, revenue, and market differentiation.",
    href: "/services/product-development",
  },
  {
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Team Extension",
    description:
      "Access an elite, cross-functional tech squad on-demand. We integrate seamlessly with your team or operate independently to deliver results fast.",
    href: "/services/team-extension",
  },
  {
    icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Growth Engineering",
    description:
      "We don't just build—we grow. Our growth team aligns tech with marketing to optimize funnels, drive SEO, and boost retention.",
    href: "/services/growth-engineering",
  },
  {
    icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Systems Integration",
    description:
      "Connect your platform to payments, logistics, messaging, and more—building intelligent workflows that scale across your stack.",
    href: "/services/systems-integration",
  },
  {
    icon: <Server className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "DevOps Support",
    description:
      "Speed, uptime, and security you can trust. We manage deployments, monitor performance, and ensure your product is stable, secure, and scalable.",
    href: "/services/devops-support",
  },
];

const Features = () => {
  return (
    <section className="scroll-mt-24 py-12 sm:py-16 md:py-20 pb-0 relative bg-muted" id="features">
      <div className="section-container">
        <Reveal className="mb-10 text-center sm:mb-16">
          <div className="pulse-chip mx-auto mb-3 sm:mb-4">
            <span>Services</span>
          </div>
          <SplitHeadline
            text="Full-stack Execution,"
            as="h2"
            className="section-title mb-3 sm:mb-4"
            extra={
              <>
                <br className="hidden sm:block" />
                Strategic Solutions
              </>
            }
          />
          <p className="section-subtitle mx-auto">
            From concept to deployment, we deliver comprehensive software solutions that drive your business forward.
          </p>
        </Reveal>

        <Reveal stagger={90}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Features;
