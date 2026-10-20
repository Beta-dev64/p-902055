import { Reveal, SplitHeadline } from "@/components/motion";

const ImageShowcaseSection = () => {
  const services = [
    {
      title: "Custom Software Development",
      description:
        "Tailored solutions built from the ground up to meet your specific business requirements and scale with your growth.",
      image: "/showcase/software.jpg",
    },
    {
      title: "Cloud Architecture & DevOps",
      description:
        "Modern cloud-native solutions with automated CI/CD pipelines that ensure scalability, reliability, and performance.",
      image: "/showcase/cloud.jpg",
    },
    {
      title: "AI & Machine Learning",
      description:
        "Intelligent solutions that leverage machine learning and AI to automate processes and provide actionable insights.",
      image: "/showcase/ai.jpg",
    },
  ];

  return (
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-background" id="showcase">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
          <SplitHeadline
            text="Modern Solutions for Tomorrow"
            className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-3 sm:mb-4"
          />
          <p className="text-base sm:text-lg text-muted-foreground">
            Our development approach combines cutting-edge technology with
            proven methodologies to deliver software solutions that scale with
            your business.
          </p>
        </Reveal>

        <Reveal stagger={110}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-elegant transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elegant-hover sm:rounded-3xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <div className="bg-card p-4 sm:p-6">
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary sm:mb-3 sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
