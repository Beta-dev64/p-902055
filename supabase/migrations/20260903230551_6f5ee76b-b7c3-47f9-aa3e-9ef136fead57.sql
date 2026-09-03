DROP POLICY IF EXISTS "Anyone can manage services" ON public.services;
DROP POLICY IF EXISTS "Anyone can manage academy programs" ON public.academy_programs;

DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (published = true);
DROP POLICY IF EXISTS "Authenticated can manage services" ON public.services;
CREATE POLICY "Authenticated can manage services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view published programs" ON public.academy_programs;
CREATE POLICY "Public can view published programs" ON public.academy_programs FOR SELECT USING (published = true);
DROP POLICY IF EXISTS "Authenticated can manage programs" ON public.academy_programs;
CREATE POLICY "Authenticated can manage programs" ON public.academy_programs FOR ALL TO authenticated USING (true) WITH CHECK (true);

GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
GRANT SELECT ON public.academy_programs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academy_programs TO authenticated;
GRANT ALL ON public.academy_programs TO service_role;