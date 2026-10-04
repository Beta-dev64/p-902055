// Public share page: serves Open Graph / Twitter card tags for a blog post so
// X, LinkedIn, Facebook, WhatsApp show the cover image, title and summary,
// then redirects real visitors to the article on the website.
import { createClient } from "npm:@supabase/supabase-js@2";

const SITE = "https://fuselabsio.lovable.app";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const plain = (md: string) =>
  md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

Deno.serve(async (req) => {
  const slug = new URL(req.url).searchParams.get("slug") || "";
  if (!/^[a-z0-9-]{1,200}$/i.test(slug)) return Response.redirect(`${SITE}/blog`, 302);

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data: post } = await supabase
    .from("blog_posts")
    .select("slug,title,excerpt,content,cover_image,author,published_at")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!post) return Response.redirect(`${SITE}/blog`, 302);

  const url = `${SITE}/blog/${post.slug}`;
  const desc = (post.excerpt || plain(post.content || "")).slice(0, 200);
  const image = post.cover_image
    ? post.cover_image.startsWith("http") ? post.cover_image : `${SITE}${post.cover_image}`
    : "";
  const t = esc(post.title);
  const d = esc(desc);

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${t} | FuseLabs IO</title>
<meta name="description" content="${d}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="FuseLabs IO">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${url}">
${image ? `<meta property="og:image" content="${esc(image)}"><meta name="twitter:image" content="${esc(image)}">` : ""}
<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
${post.published_at ? `<meta property="article:published_time" content="${post.published_at}">` : ""}
<meta http-equiv="refresh" content="0;url=${url}">
</head><body><p><a href="${url}">${t}</a></p><script>location.replace(${JSON.stringify(url)})</script></body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
});
