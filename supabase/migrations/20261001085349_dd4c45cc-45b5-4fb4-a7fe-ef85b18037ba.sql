ALTER TABLE public.blog_posts ADD COLUMN category text;
CREATE INDEX blog_posts_category_idx ON public.blog_posts (category);