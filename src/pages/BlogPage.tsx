import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author: string | null;
  tags: string[] | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export const formatPostDate = (post: BlogPostRow) =>
  new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await (supabase as any)
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });
      if (error) console.error("Error fetching posts:", error);
      if (active) {
        setPosts((data as BlogPostRow[]) || []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Blog — Insights on Product, Engineering & AI | FuseLabs IO"
        description="Articles from FuseLabs IO on building startups, web and app engineering, growth, AI and learning to code."
        path="/blog"
      />
      <Navbar />
      <main className="pb-20 pt-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <header className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Blog</p>
            <h1 className="mb-4 font-display text-3xl font-bold sm:text-5xl">Ideas, guides & lessons</h1>
            <p className="text-lg text-muted-foreground">
              Practical writing on building products, growing startups and learning tech.
            </p>
          </header>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading articles…
            </div>
          ) : posts.length === 0 ? (
            <p className="text-muted-foreground">No articles yet. Check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-colors hover:border-primary/50"
                >
                  {post.cover_image && (
                    <img src={post.cover_image} alt={post.title} loading="lazy" className="h-48 w-full object-cover" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-2 text-xs text-muted-foreground">
                      {formatPostDate(post)}
                      {post.author ? ` · ${post.author}` : ""}
                    </p>
                    <h2 className="mb-2 font-display text-xl font-semibold">{post.title}</h2>
                    {post.excerpt && (
                      <p className="mb-5 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                    )}
                    <span className="mt-auto inline-flex items-center text-sm font-medium">
                      Read article
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
