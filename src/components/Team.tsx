import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Linkedin, Twitter, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Reveal, SplitHeadline } from "@/components/motion";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  portfolio?: string | null;
}

const TeamSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card">
    <div className="aspect-[4/5] animate-pulse bg-muted" />
    <div className="space-y-2 p-6">
      <div className="h-5 w-2/3 animate-pulse rounded-full bg-muted" />
      <div className="h-4 w-1/2 animate-pulse rounded-full bg-muted/60" />
    </div>
  </div>
);

const socialHover =
  "p-2 rounded-full bg-background text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setTeamMembers(data || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!loading && teamMembers.length === 0) return null;

  return (
    <section className="w-full py-12 md:py-20 bg-muted" id="team">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <SplitHeadline
            text="Meet Our Team"
            className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
          />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Talented professionals dedicated to bringing your vision to life
          </p>
        </Reveal>

        <div className="relative mx-auto max-w-6xl">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <TeamSkeleton />
              <TeamSkeleton />
              <TeamSkeleton />
            </div>
          ) : (
            <Reveal y={48}>
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {teamMembers.map((member) => (
                    <CarouselItem
                      key={member.id}
                      className="basis-full pl-2 sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-elegant-hover">
                        <div className="relative aspect-[4/5] overflow-hidden">
                          {member.image && (
                            <img
                              src={member.image}
                              alt={member.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="flex space-x-4">
                              {member.linkedin && (
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${member.name} on LinkedIn`}
                                  className={socialHover}
                                >
                                  <Linkedin size={20} />
                                </a>
                              )}
                              {member.twitter && (
                                <a
                                  href={member.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${member.name} on X`}
                                  className={socialHover}
                                >
                                  <Twitter size={20} />
                                </a>
                              )}
                              {member.portfolio && (
                                <a
                                  href={member.portfolio}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${member.name} portfolio`}
                                  className={socialHover}
                                >
                                  <ExternalLink size={20} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                            {member.name}
                          </h3>
                          <p className="font-medium text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
