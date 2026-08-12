
-- 1. Function search_path hardening
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 2. Remove public write policies, restrict writes to authenticated users
DROP POLICY IF EXISTS "Anyone can manage partners" ON public.partners;
DROP POLICY IF EXISTS "Anyone can manage portfolios" ON public.portfolios;
DROP POLICY IF EXISTS "Anyone can manage team members" ON public.team_members;
DROP POLICY IF EXISTS "Anyone can manage testimonials" ON public.testimonials;

CREATE POLICY "Authenticated users can manage partners" ON public.partners
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage portfolios" ON public.portfolios
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage team members" ON public.team_members
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

GRANT SELECT ON public.partners TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;
GRANT SELECT ON public.portfolios TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolios TO authenticated;
GRANT ALL ON public.portfolios TO service_role;
GRANT SELECT ON public.team_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;

-- 3. Testimonials moderation columns
ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS rating integer,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'approved',
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'admin';

DROP POLICY IF EXISTS "Anyone can view testimonials" ON public.testimonials;
CREATE POLICY "Anyone can view approved testimonials" ON public.testimonials
  FOR SELECT USING (status = 'approved');
CREATE POLICY "Authenticated users can view all testimonials" ON public.testimonials
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Visitors can submit a review" ON public.testimonials
  FOR INSERT TO anon, authenticated
  WITH CHECK (source = 'visitor' AND status = 'pending');
CREATE POLICY "Authenticated users can manage testimonials" ON public.testimonials
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete testimonials" ON public.testimonials
  FOR DELETE TO authenticated USING (true);

GRANT SELECT, INSERT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;

-- 4. Project inquiries table
CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  company_website text,
  services text,
  budget text,
  project_details text,
  status text NOT NULL DEFAULT 'new',
  source text NOT NULL DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.project_inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_inquiries TO authenticated;
GRANT ALL ON public.project_inquiries TO service_role;

ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry" ON public.project_inquiries
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can view inquiries" ON public.project_inquiries
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update inquiries" ON public.project_inquiries
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete inquiries" ON public.project_inquiries
  FOR DELETE TO authenticated USING (true);

DROP TRIGGER IF EXISTS update_project_inquiries_updated_at ON public.project_inquiries;
CREATE TRIGGER update_project_inquiries_updated_at
  BEFORE UPDATE ON public.project_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Hide write-only lead tables from the anon/authenticated GraphQL + Data API surface
REVOKE SELECT ON public.leads FROM anon;
REVOKE SELECT ON public.leads FROM authenticated;
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
REVOKE SELECT ON public.project_inquiries FROM anon;

-- 6. Storage: public read, authenticated writes only
DROP POLICY IF EXISTS "Anyone can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete files" ON storage.objects;

CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'uploads');
CREATE POLICY "Authenticated users can update files" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'uploads') WITH CHECK (bucket_id = 'uploads');
CREATE POLICY "Authenticated users can delete files" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'uploads');
