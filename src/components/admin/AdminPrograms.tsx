import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  arrayToTextarea,
  slugify,
  textareaToArray,
  type AcademyProgram,
} from "@/lib/cms";

const emptyForm = {
  slug: "",
  title: "",
  tagline: "",
  description: "",
  price: "",
  duration: "",
  level: "",
  image: "",
  syllabus: "",
  outcomes: "",
  tools: "",
  sort_order: 0,
  published: true,
};

const AdminPrograms = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<AcademyProgram[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("academy_programs")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Error", description: "Failed to load programs", variant: "destructive" });
    }
    setPrograms((data as AcademyProgram[]) || []);
    setLoading(false);
  };

  const handleEdit = (program: AcademyProgram) => {
    setEditingId(program.id);
    setFormData({
      slug: program.slug,
      title: program.title,
      tagline: program.tagline || "",
      description: program.description || "",
      price: program.price || "",
      duration: program.duration || "",
      level: program.level || "",
      image: program.image || "",
      syllabus: arrayToTextarea(program.syllabus),
      outcomes: arrayToTextarea(program.outcomes),
      tools: arrayToTextarea(program.tools),
      sort_order: program.sort_order,
      published: program.published,
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    const payload = {
      slug: slugify(formData.slug || formData.title),
      title: formData.title.trim(),
      tagline: formData.tagline || null,
      description: formData.description || null,
      price: formData.price || null,
      duration: formData.duration || null,
      level: formData.level || null,
      image: formData.image || null,
      syllabus: textareaToArray(formData.syllabus),
      outcomes: textareaToArray(formData.outcomes),
      tools: textareaToArray(formData.tools),
      sort_order: Number(formData.sort_order) || 0,
      published: formData.published,
    };

    setLoading(true);
    try {
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
      toast({ title: "Saved", description: "Program saved successfully" });
      setEditingId(null);
      setFormData(emptyForm);
      await fetchPrograms();
    } catch (error) {
      console.error("Error saving program:", error);
      toast({ title: "Error", description: "Failed to save program", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this program? This cannot be undone.")) return;
    const { error } = await supabase.from("academy_programs").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete program", variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: "Program removed" });
    await fetchPrograms();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Academy Programs</h2>
        <Button
          onClick={() => {
            setEditingId("new");
            setFormData(emptyForm);
          }}
          className="bg-pulse-500 hover:bg-pulse-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Program
        </Button>
      </div>

      {editingId !== null && (
        <Card className="p-6 mb-6 space-y-4">
          <h3 className="text-lg font-medium">
            {editingId === "new" ? "Add New Program" : "Edit Program"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Input
              placeholder="URL slug (auto-generated from title if empty)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </div>
          <Input
            placeholder="Tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Price (e.g. ₦300,000)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <Input
              placeholder="Duration (e.g. 3 Months)"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <Input
              placeholder="Level"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Textarea
              placeholder="Syllabus highlights (one per line)"
              rows={6}
              value={formData.syllabus}
              onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
            />
            <Textarea
              placeholder="Outcomes (one per line)"
              rows={6}
              value={formData.outcomes}
              onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
            />
            <Textarea
              placeholder="Tools (one per line)"
              rows={6}
              value={formData.tools}
              onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
            />
          </div>
          <ImageUpload
            label="Program Image"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            placeholder="Enter image URL or upload a file"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <Input
              type="number"
              placeholder="Sort order"
              value={formData.sort_order}
              onChange={(e) =>
                setFormData({ ...formData, sort_order: Number(e.target.value) })
              }
            />
            <div className="flex items-center gap-3">
              <Switch
                id="program-published"
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, published: checked })
                }
              />
              <Label htmlFor="program-published">Published</Label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading} className="bg-pulse-500 hover:bg-pulse-600">
              {loading ? "Saving…" : "Save"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setFormData(emptyForm);
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs.map((program) => (
          <Card key={program.id} className="p-4">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-medium">{program.title}</h3>
                <p className="text-xs text-gray-500 mb-2">/academic/{program.slug}</p>
                <p className="text-sm text-gray-600">
                  {program.price} · {program.duration}
                </p>
                {!program.published && (
                  <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                    Draft
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/academic/${program.slug}`} target="_blank">
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(program)}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(program.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPrograms;