import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { BlogPostRow, formatPostDate } from "./BlogPage";
import { ShareButtons } from "@/components/ShareButtons";
import { FollowUs } from "@/components/FollowUs";

export const BlogArticle = ({ post, related = [] }: { post: BlogPostRow; related?: BlogPostRow[] }) => (
  <article className="container mx-auto max-w-3xl px-4 sm:px-6">
    <Link to="/blog" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft className="mr-1 h-4 w-4" /> All articles
    </Link>
    {post.category && (
      <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
        {post.category}
      </Link>
    )}
    <p className="mb-3 text-sm text-muted-foreground">
      {formatPostDate(post)}
      {post.author ? ` · ${post.author}` : ""}
    </p>
    <h1 className="mb-4 font-display text-3xl font-bold sm:text-5xl">{post.title}</h1>
    {post.excerpt && <p className="mb-8 text-lg text-muted-foreground">{post.excerpt}</p>}
    {post.cover_image && (
      <img src={post.cover_image} alt={post.title} className="mb-10 w-full rounded-2xl object-cover" />
    )}
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-display prose-a:text-primary prose-img:rounded-xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ""}</ReactMarkdown>
    </div>
    <div className="mt-10 border-t border-border pt-6">
      <ShareButtons post={post} />
      <FollowUs />
    </div>
    {post.tags && post.tags.length > 0 && (
      <div className="mt-10 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
            #{tag}
          </Link>
        ))}
      </div>
    )}
    {related.length > 0 && (
      <section className="mt-16">
        <h2 className="mb-6 font-display text-2xl font-semibold">Related articles</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.id} to={`/blog/${r.slug}`} className="rounded-xl border border-border bg-card p-4 hover:border-primary/50">
              {r.category && <p className="mb-1 text-xs text-primary">{r.category}</p>}
              <p className="font-medium">{r.title}</p>
            </Link>
          ))}
        </div>
      </section>
    )}
    <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 text-center">
      <h2 className="mb-3 font-display text-2xl font-semibold">Have a project in mind?</h2>
      <p className="mx-auto mb-6 max-w-xl text-muted-foreground">Tell us what you're building and we'll help you ship it.</p>
      <Button asChild size="lg">
        <Link to="/start-project">Start a project</Link>
      </Button>
    </div>
  </article>
);

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<BlogPostRow[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await (supabase as any)
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) console.error(error);
      const current = data as BlogPostRow | null;
      if (current) {
        const { data: others } = await (supabase as any)
          .from("blog_posts")
          .select("id,slug,title,category,tags,published_at,created_at")
          .eq("published", true)
          .neq("id", current.id)
          .order("published_at", { ascending: false })
          .limit(30);
        const scored = ((others as BlogPostRow[]) || [])
          .map((o) => ({
            o,
            score:
              (o.category && o.category === current.category ? 2 : 0) +
              (o.tags || []).filter((t) => (current.tags || []).includes(t)).length,
          }))
          .filter((x) => x.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((x) => x.o);
        if (active) setRelated(scored);
      }
      if (active) {
        setPost(current);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {post && (
        <Seo
          title={`${post.title} | FuseLabs IO Blog`}
          description={post.excerpt || post.title}
          path={`/blog/${post.slug}`}
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || undefined,
            image: post.cover_image || undefined,
            datePublished: post.published_at || post.created_at,
            author: { "@type": "Person", name: post.author || "FuseLabs IO" },
          }}
        />
      )}
      <Navbar />
      <main className="pb-20 pt-24">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
          </div>
        ) : post ? (
          <BlogArticle post={post} related={related} />
        ) : (
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h1 className="mb-4 font-display text-3xl font-bold">Article not found</h1>
            <Button asChild variant="outline">
              <Link to="/blog">Back to blog</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
