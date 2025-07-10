
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Linkedin, Twitter, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  portfolio?: string | null;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 md:py-16 bg-gray-50" id="team">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Talented professionals dedicated to bringing your vision to life
          </p>
        </div>

        {/* Team Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No team members available yet.</p>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {teamMembers.map((member) => (
                  <CarouselItem key={member.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                      {/* Image */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        {member.image && (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                        {/* Social Icons Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                          <div className="flex space-x-4">
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                              >
                                <Linkedin size={20} />
                              </a>
                            )}
                            {member.twitter && (
                              <a
                                href={member.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-400 hover:text-white transition-colors duration-200"
                              >
                                <Twitter size={20} />
                              </a>
                            )}
                            {member.portfolio && (
                              <a
                                href={member.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white rounded-full text-gray-900 hover:bg-pulse-500 hover:text-white transition-colors duration-200"
                              >
                                <ExternalLink size={20} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pulse-600 transition-colors duration-200">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 font-medium">
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
