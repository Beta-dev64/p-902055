import React, { useEffect, useState } from "react";
import { Edit, Eye, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { callAdminFunction } from "@/lib/admin-session";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PublishSwitch, StatusBadge } from "./DraftControls";
import { BlogArticle } from "@/pages/BlogPostPage";
import type { BlogPostRow } from "@/pages/BlogPage";

const db = supabase as any;

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  author: "",
  category: "",
  tags: "",
  published: false,
};

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [ai, setAi] = useState({ topic: "", keyPoints: "", audience: "", tone: "" });
  const [drafting, setDrafting] = useState(false);

  const generateDraft = async () => {
    if (ai.topic.trim().length < 3) {
      toast({ title: "Add a topic", description: "Describe what the article is about.", variant: "destructive" });
      return;
    }
    setDrafting(true);
    try {
      const d = await callAdminFunction<{ title: string; excerpt: string; category: string; tags: string[]; content: string }>(
        "blog-ai-draft",
        { topic: ai.topic, keyPoints: ai.keyPoints, audience: ai.audience, tone: ai.tone || undefined },
      );
      setFormData((prev) => ({
        ...prev,
        title: d.title,
        slug: editingId === "new" || !prev.slug ? slugify(d.title) : prev.slug,
        excerpt: d.excerpt,
        category: d.category || prev.category,
        tags: d.tags.join(", "),
        content: d.content,
        published: false,
      }));
      setShowPreview(true);
      toast({ title: "Draft ready", description: "Review and edit it before publishing." });
    } catch (e) {
      toast({ title: "Couldn't draft article", description: e instanceof Error ? e.message : "Try again.", variant: "destructive" });
    } finally {
      setDrafting(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await db.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Error", description: "Failed to fetch articles", variant: "destructive" });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const reset = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowPreview(false);
  };

  const handleEdit = (post: BlogPostRow) => {
    setEditingId(post.id);
    setShowPreview(false);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      cover_image: post.cover_image || "",
      author: post.author || "",
      category: post.category || "",
      tags: (post.tags || []).join(", "),
      published: post.published,
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" });
      return;
    }
    setLoading(true);
    const existing = posts.find((p) => p.id === editingId);
    const payload = {
      title: formData.title.trim(),
      slug: slugify(formData.slug),
      excerpt: formData.excerpt.trim() || null,
      content: formData.content,
      cover_image: formData.cover_image || null,
      author: formData.author.trim() || null,
      category: formData.category.trim() || null,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      published: formData.published,
      published_at: formData.published ? existing?.published_at || new Date().toISOString() : existing?.published_at || null,
    };
    const { error } =
      editingId && editingId !== "new"
        ? await db.from("blog_posts").update(payload).eq("id", editingId)
        : await db.from("blog_posts").insert([payload]);
    setLoading(false);
    if (error) {
      toast({
        title: "Error",
        description: error.code === "23505" ? "That slug is already used" : "Failed to save article",
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Saved", description: payload.published ? "Article published." : "Saved as draft." });
    reset();
    fetchPosts();
  };

  const togglePublished = async (post: BlogPostRow) => {
    const { error } = await db
      .from("blog_posts")
      .update({ published: !post.published, published_at: post.published_at || new Date().toISOString() })
      .eq("id", post.id);
    if (error) toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    const { error } = await db.from("blog_posts").delete().eq("id", id);
    if (error) toast({ title: "Error", description: "Failed to delete article", variant: "destructive" });
    fetchPosts();
  };

  const previewPost: BlogPostRow = {
    id: "preview",
    slug: formData.slug,
    title: formData.title || "Untitled",
    excerpt: formData.excerpt || null,
    content: formData.content,
    cover_image: formData.cover_image || null,
    author: formData.author || null,
    category: formData.category || null,
    tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
    published: formData.published,
    published_at: null,
    created_at: new Date().toISOString(),
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Blog</h2>
          <p className="text-sm text-muted-foreground">Write, preview and publish articles.</p>
        </div>
        <Button onClick={() => { reset(); setEditingId("new"); }} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" /> New article
        </Button>
      </div>

      {editingId !== null && (
        <Card className="mb-6 space-y-4 p-6">
          <h3 className="text-lg font-medium">{editingId === "new" ? "New article" : "Edit article"}</h3>
          <div className="space-y-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="flex items-center gap-2 text-sm font-medium"><Sparkles className="h-4 w-4 text-primary" /> Write with AI</p>
            <Input placeholder="Topic, e.g. How to validate a startup idea in 2 weeks" value={ai.topic} onChange={(e) => setAi({ ...ai, topic: e.target.value })} />
            <Textarea rows={4} placeholder="Key points to cover (one per line)" value={ai.keyPoints} onChange={(e) => setAi({ ...ai, keyPoints: e.target.value })} />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input placeholder="Audience (optional)" value={ai.audience} onChange={(e) => setAi({ ...ai, audience: e.target.value })} />
              <Input placeholder="Tone (optional), e.g. friendly, expert" value={ai.tone} onChange={(e) => setAi({ ...ai, tone: e.target.value })} />
            </div>
            <Button variant="secondary" onClick={generateDraft} disabled={drafting}>
              {drafting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Drafting… (up to a minute)</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate draft</>}
            </Button>
            <p className="text-xs text-muted-foreground">This fills in the fields below. Your current text will be replaced.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData((prev) => ({ ...prev, title, slug: editingId === "new" ? slugify(title) : prev.slug }));
              }}
            />
            <Input placeholder="Slug (URL)" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
            <Input placeholder="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
            <Input placeholder="Category, e.g. Engineering" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            <Input placeholder="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
          </div>
          <Textarea rows={2} placeholder="Short summary (shown on the blog list and in Google)" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
          <Textarea
            rows={16}
            className="font-mono text-sm"
            placeholder={"Article body. Formatting: # Heading, **bold**, *italic*, - list item, [link](https://...), ![image](https://...)"}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <ImageUpload label="Cover image" value={formData.cover_image} onChange={(url) => setFormData({ ...formData, cover_image: url })} placeholder="Enter image URL or upload a file" />
          <PublishSwitch published={formData.published} onChange={(published) => setFormData({ ...formData, published })} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSave} disabled={loading}>{loading ? "Saving…" : "Save"}</Button>
            <Button variant="outline" onClick={() => setShowPreview((v) => !v)}>
              <Eye className="mr-2 h-4 w-4" /> {showPreview ? "Hide preview" : "Preview"}
            </Button>
            <Button variant="outline" onClick={reset}>Cancel</Button>
          </div>
          {showPreview && (
            <div className="rounded-xl border border-dashed border-border bg-background py-10">
              <BlogArticle post={previewPost} />
            </div>
          )}
        </Card>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-medium text-foreground">{post.title}</h3>
                <StatusBadge published={post.published} />
              </div>
              <p className="text-sm text-muted-foreground">/blog/{post.slug}{post.category ? ` · ${post.category}` : ""}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.published && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">View</a>
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => togglePublished(post)}>
                {post.published ? "Unpublish" : "Publish"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEdit(post)}><Edit className="h-3 w-3" /></Button>
              <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(post.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
        {!loading && posts.length === 0 && <p className="text-sm text-muted-foreground">No articles yet.</p>}
      </div>
    </div>
  );
};

export default AdminBlog;
