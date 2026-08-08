-- Project build requests (Let's Build Together form)
CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_website TEXT,
  services TEXT,
  budget TEXT,
  project_details TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  source TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_project_inquiries_status ON public.project_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_project_inquiries_created_at ON public.project_inquiries(created_at DESC);

ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert project inquiries" ON public.project_inquiries;
CREATE POLICY "Anyone can insert project inquiries"
  ON public.project_inquiries FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view project inquiries" ON public.project_inquiries;
CREATE POLICY "Anyone can view project inquiries"
  ON public.project_inquiries FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Anyone can update project inquiries" ON public.project_inquiries;
CREATE POLICY "Anyone can update project inquiries"
  ON public.project_inquiries FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Anyone can delete project inquiries" ON public.project_inquiries;
CREATE POLICY "Anyone can delete project inquiries"
  ON public.project_inquiries FOR DELETE
  USING (true);

DROP TRIGGER IF EXISTS update_project_inquiries_updated_at ON public.project_inquiries;
CREATE TRIGGER update_project_inquiries_updated_at
  BEFORE UPDATE ON public.project_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Review moderation on testimonials
ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'approved'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'admin'
    CHECK (source IN ('admin', 'visitor')),
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5));

-- Existing rows stay visible on the site
UPDATE public.testimonials
SET status = 'approved', source = 'admin'
WHERE status IS NULL OR source IS NULL;

CREATE INDEX IF NOT EXISTS idx_testimonials_status ON public.testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_source ON public.testimonials(source);
