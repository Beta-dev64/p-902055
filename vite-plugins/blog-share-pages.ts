import type { Plugin } from "vite";

// At build time, emit static /share/<slug>.html pages for every published blog
// post. Each page carries Open Graph / Twitter card tags (cover image, title,
// summary) so social networks render a rich preview, then sends visitors to
// the real article.
const SITE = "https://fuselabsio.lovable.app";
const SUPABASE_URL = "https://zbpqiccicmmpfzzjimny.supabase.co";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicHFpY2NpY21tcGZ6emppbW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5Njg1NjgsImV4cCI6MjA2NzU0NDU2OH0.xhuewIdsy5OnhzqR9soXdG24DM9kstGoDpgYN8UYLTc";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const plain = (md: string) =>
  md.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~]+/g, " ").replace(/\s+/g, " ").trim();

type Post = { slug: string; title: string; excerpt: string | null; content: string | null; cover_image: string | null; published_at: string | null };

export function sharePageHtml(post: Post) {
  const url = `${SITE}/blog/${post.slug}`;
  const shareUrl = `${SITE}/share/${post.slug}.html`;
  const desc = (post.excerpt || plain(post.content || "")).slice(0, 200);
  const img = post.cover_image ? (post.cover_image.startsWith("http") ? post.cover_image : SITE + post.cover_image) : `${SITE}/og-fuselabs.jpg`;
  const t = esc(post.title), d = esc(desc), i = esc(img);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${t} | FuseLabs IO</title>
<meta name="description" content="${d}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="FuseLabs IO">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${shareUrl}">
<meta property="og:image" content="${i}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${i}">
${post.published_at ? `<meta property="article:published_time" content="${post.published_at}">` : ""}
<meta name="robots" content="noindex, follow">
<script>location.replace(${JSON.stringify(url)})</script>
</head><body><p><a href="${url}">${t}</a></p></body></html>`;
}

export function blogSharePages(): Plugin {
  return {
    name: "blog-share-pages",
    apply: "build",
    async generateBundle() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,title,excerpt,content,cover_image,published_at&published=eq.true`,
          { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const posts = (await res.json()) as Post[];
        for (const p of posts) {
          if (!/^[a-z0-9-]+$/i.test(p.slug)) continue;
          this.emitFile({ type: "asset", fileName: `share/${p.slug}.html`, source: sharePageHtml(p) });
        }
      } catch (e) {
        this.warn(`blog share pages skipped: ${(e as Error).message}`);
      }
    },
  };
}
