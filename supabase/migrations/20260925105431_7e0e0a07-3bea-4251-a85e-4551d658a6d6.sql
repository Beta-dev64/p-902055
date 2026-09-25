DO $$ BEGIN CREATE TYPE public.app_role AS ENUM ('admin','user'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

-- Existing accounts are the site admins
INSERT INTO public.user_roles (user_id, role) SELECT id, 'admin' FROM auth.users ON CONFLICT DO NOTHING;

-- project_inquiries
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON public.project_inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.project_inquiries;
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.project_inquiries;
DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.project_inquiries;
CREATE POLICY "Admins can view inquiries" ON public.project_inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update inquiries" ON public.project_inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete inquiries" ON public.project_inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Anyone can submit an inquiry" ON public.project_inquiries FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new' AND source = 'website' AND length(email) BETWEEN 3 AND 255 AND length(first_name) BETWEEN 1 AND 100 AND length(last_name) BETWEEN 1 AND 100 AND coalesce(length(project_details),0) <= 5000);

-- leads: inserted only via backend function
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

-- team_members
DROP POLICY IF EXISTS "Authenticated users can manage team members" ON public.team_members;
CREATE POLICY "Admins can manage team members" ON public.team_members FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- partners
DROP POLICY IF EXISTS "Authenticated users can manage partners" ON public.partners;
CREATE POLICY "Admins can manage partners" ON public.partners FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- portfolios
DROP POLICY IF EXISTS "Authenticated users can manage portfolios" ON public.portfolios;
DROP POLICY IF EXISTS "Authenticated users can view all portfolios" ON public.portfolios;
CREATE POLICY "Admins can manage portfolios" ON public.portfolios FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- academy_programs
DROP POLICY IF EXISTS "Authenticated can manage programs" ON public.academy_programs;
DROP POLICY IF EXISTS "Authenticated users can view all programs" ON public.academy_programs;
DROP POLICY IF EXISTS "Public can view published programs" ON public.academy_programs;
CREATE POLICY "Admins can manage programs" ON public.academy_programs FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- services
DROP POLICY IF EXISTS "Authenticated can manage services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can view all services" ON public.services;
DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- testimonials
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can view all testimonials" ON public.testimonials;
CREATE POLICY "Admins can view all testimonials" ON public.testimonials FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));