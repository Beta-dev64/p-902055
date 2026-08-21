import React, { useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PreviewButton, PublishSwitch, StatusBadge } from "./DraftControls";

interface Program {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  price: string | null;
  duration: string | null;
  level: string | null;
  image: string | null;
  syllabus: string[] | null;
  outcomes: string[] | null;
  tools: string[] | null;
  sort_order: number;
  published: boolean;
}

const emptyForm = {
  title: "",
  slug: "",
  tagline: "",
  description: "",
  price: "",
  duration: "",
  level: "",
  image: "",
  syllabus: "",
  outcomes: "",
  tools: "",
  sort_order: "0",
  published: true,
};

const toLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const AdminPrograms = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("academy_programs")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast({ title: "Error", description: "Failed to fetch programs", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleEdit = (program: Program) => {
    setEditingId(program.id);
    setFormData({
      title: program.title,
      slug: program.slug,
      tagline: program.tagline || "",
      description: program.description || "",
      price: program.price || "",
      duration: program.duration || "",
      level: program.level || "",
      image: program.image || "",
      syllabus: (program.syllabus || []).join("\n"),
      outcomes: (program.outcomes || []).join("\n"),
      tools: (program.tools || []).join("\n"),
      sort_order: String(program.sort_order ?? 0),
      published: program.published,
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        tagline: formData.tagline.trim() || null,
        description: formData.description.trim() || null,
        price: formData.price.trim() || null,
        duration: formData.duration.trim() || null,
        level: formData.level.trim() || null,
        image: formData.image || null,
        syllabus: toLines(formData.syllabus),
        outcomes: toLines(formData.outcomes),
        tools: toLines(formData.tools),
        sort_order: Number(formData.sort_order) || 0,
        published: formData.published,
      };

      if (editingId && editingId !== "new") {
        const { error } = await supabase
          .from("academy_programs")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("academy_programs").insert([payload]);
        if (error) throw error;
      }

      toast({
        title: "Saved",
        description: payload.published
          ? "Program saved and published."
          : "Program saved as a draft — use Preview to review it.",
      });
      await fetchPrograms();
      setEditingId(null);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Error saving program:", error);
      toast({ title: "Error", description: "Failed to save program", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (program: Program) => {
    try {
      const { error } = await supabase
        .from("academy_programs")
        .update({ published: !program.published })
        .eq("id", program.id);
      if (error) throw error;
      await fetchPrograms();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this program?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("academy_programs").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Program removed" });
      await fetchPrograms();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete program", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Academy programs</h2>
          <p className="text-sm text-muted-foreground">
            Draft, preview and publish each program page.
          </p>
        </div>
        <Button onClick={() => { setEditingId("new"); setFormData(emptyForm); }} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>

      {editingId !== null && (
        <Card className="mb-6 space-y-4 p-6">
          <h3 className="text-lg font-medium">
            {editingId === "new" ? "Add new program" : "Edit program"}
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  title,
                  slug: editingId === "new" ? slugify(title) : prev.slug,
                }));
              }}
            />
            <Input
              placeholder="Slug (URL)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
            <Input
              placeholder="Tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            />
            <Input
              placeholder="Price (e.g. ₦350,000)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <Input
              placeholder="Duration (e.g. 12 weeks)"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <Input
              placeholder="Level (e.g. Beginner friendly)"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            />
          </div>

          <Textarea
            rows={4}
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Textarea
              rows={5}
              placeholder="Syllabus (one item per line)"
              value={formData.syllabus}
              onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
            />
            <Textarea
              rows={5}
              placeholder="Outcomes (one per line)"
              value={formData.outcomes}
              onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
            />
            <Textarea
              rows={5}
              placeholder="Tools (one per line)"
              value={formData.tools}
              onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
            />
          </div>

          <ImageUpload
            label="Program image"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            placeholder="Enter image URL or upload a file"
          />

          <PublishSwitch
            published={formData.published}
            onChange={(published) => setFormData({ ...formData, published })}
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving…" : "Save"}
            </Button>
            {formData.slug && <PreviewButton type="program" slug={formData.slug} />}
            <Button variant="outline" onClick={() => { setEditingId(null); setFormData(emptyForm); }}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {programs.map((program) => (
          <Card key={program.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-medium text-foreground">{program.title}</h3>
                <StatusBadge published={program.published} />
              </div>
              <p className="text-sm text-muted-foreground">
                /academic/{program.slug}
                {program.price ? ` · ${program.price}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PreviewButton type="program" slug={program.slug} />
              <Button size="sm" variant="outline" onClick={() => togglePublished(program)}>
                {program.published ? "Unpublish" : "Publish"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEdit(program)}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive"
                onClick={() => handleDelete(program.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPrograms;
