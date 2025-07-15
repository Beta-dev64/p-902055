-- Add rich text fields to portfolios table for case study content
ALTER TABLE public.portfolios 
ADD COLUMN challenge TEXT,
ADD COLUMN solution TEXT,
ADD COLUMN results TEXT,
ADD COLUMN live_url TEXT,
ADD COLUMN project_images TEXT[],
ADD COLUMN technologies TEXT[];

-- Update existing portfolios with some default content if needed
UPDATE public.portfolios SET 
  challenge = 'Challenge content will be added here',
  solution = 'Solution content will be added here', 
  results = 'Results content will be added here',
  technologies = ARRAY['React', 'Node.js'],
  project_images = ARRAY[]::TEXT[]
WHERE challenge IS NULL;