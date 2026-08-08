-- SERVICES
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  tagline text,
  description text,
  icon text,
  image text,
  highlights text[] DEFAULT '{}'::text[],
  deliverables text[] DEFAULT '{}'::text[],
  process text[] DEFAULT '{}'::text[],
  faq jsonb DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
-- existing site content is publicly managed via the admin dashboard
GRANT INSERT, UPDATE, DELETE ON public.services TO anon;

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Anyone can manage services" ON public.services FOR ALL USING (true) WITH CHECK (true);

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ACADEMY PROGRAMS
CREATE TABLE public.academy_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  tagline text,
  description text,
  price text,
  duration text,
  level text,
  image text,
  syllabus text[] DEFAULT '{}'::text[],
  outcomes text[] DEFAULT '{}'::text[],
  tools text[] DEFAULT '{}'::text[],
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.academy_programs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academy_programs TO authenticated;
GRANT ALL ON public.academy_programs TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.academy_programs TO anon;

ALTER TABLE public.academy_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view academy programs" ON public.academy_programs FOR SELECT USING (true);
CREATE POLICY "Anyone can manage academy programs" ON public.academy_programs FOR ALL USING (true) WITH CHECK (true);

CREATE TRIGGER update_academy_programs_updated_at
BEFORE UPDATE ON public.academy_programs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- LEADS (contains personal data: insert-only for the public)
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'project',
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  budget text,
  timeline text,
  service_slug text,
  program_slug text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon;
GRANT INSERT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT WITH CHECK (true);

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
