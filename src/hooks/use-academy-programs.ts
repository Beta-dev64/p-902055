import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AcademyProgram {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  price: string | null;
  duration: string | null;
  level: string | null;
  image: string | null;
  syllabus: string[] | null;
  outcomes: string[] | null;
  tools: string[] | null;
  sort_order: number;
}

export function useAcademyPrograms() {
  const [programs, setPrograms] = useState<AcademyProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from("academy_programs")
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;
        if (active) setPrograms(data || []);
      } catch (error) {
        console.error("Error fetching academy programs:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPrograms();
    return () => {
      active = false;
    };
  }, []);

  return { programs, loading };
}
