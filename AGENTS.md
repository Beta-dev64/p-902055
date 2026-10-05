# Project Rules

- Render the supplied FuseLabs logo files through CDN asset pointers; this preserves the approved artwork unchanged and keeps binaries out of source control.- Admin login exchanges the ADMIN_PASSWORD for a real Supabase session of a dedicated admin-role account (admin-session function); this lets admin-only RLS policies authorize CMS writes and uploads without separate user accounts.
- Blog social preview cards come from static share/<slug>.html pages generated at build time (vite-plugins/blog-share-pages.ts); the SPA head can't be read by social crawlers and Supabase functions can't serve HTML.
- Default social preview artwork uses a CDN pointer shared by route metadata and generated share pages, with an absolute URL in the static head; academy and article-specific images override the default.
