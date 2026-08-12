
ALTER TABLE public.portfolios
  ADD COLUMN IF NOT EXISTS published boolean NOT NULL DEFAULT true;

-- Public visitors see only published content
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
CREATE POLICY "Anyone can view published services" ON public.services
  FOR SELECT USING (published = true);
CREATE POLICY "Authenticated users can view all services" ON public.services
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Anyone can view academy programs" ON public.academy_programs;
CREATE POLICY "Anyone can view published programs" ON public.academy_programs
  FOR SELECT USING (published = true);
CREATE POLICY "Authenticated users can view all programs" ON public.academy_programs
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Anyone can view portfolios" ON public.portfolios;
CREATE POLICY "Anyone can view published portfolios" ON public.portfolios
  FOR SELECT USING (published = true);
CREATE POLICY "Authenticated users can view all portfolios" ON public.portfolios
  FOR SELECT TO authenticated USING (true);

-- Rate limiting log (backend only)
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  form text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.form_submissions TO service_role;

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages submission log" ON public.form_submissions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS form_submissions_ip_created_idx
  ON public.form_submissions (ip_hash, created_at DESC);
