DROP POLICY IF EXISTS "Public can read settings" ON public.site_settings;
CREATE POLICY "Public can read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (id = 1);

DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
CREATE POLICY "Authenticated users can upload files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'uploads'::text AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;
CREATE POLICY "Authenticated users can update files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'uploads'::text AND public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (bucket_id = 'uploads'::text AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
CREATE POLICY "Authenticated users can delete files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'uploads'::text AND public.has_role(auth.uid(), 'admin'::public.app_role));