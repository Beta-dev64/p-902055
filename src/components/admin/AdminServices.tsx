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

interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  icon: string | null;
  image: string | null;
  highlights: string[] | null;
  deliverables: string[] | null;
  process: string[] | null;
  sort_order: number;
  published: boolean;
}

const emptyForm = {
  title: "",
  slug: "",
  tagline: "",
  description: "",
  icon: "",
  image: "",
  highlights: "",
  deliverables: "",
  process: "",
  sort_order: "0",
  published: true,
};

const toLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const AdminServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({ title: "Error", description: "Failed to fetch services", variant: "destructive" });
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

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      slug: service.slug,
      tagline: service.tagline || "",
      description: service.description || "",
      icon: service.icon || "",
      image: service.image || "",
      highlights: (service.highlights || []).join("\n"),
      deliverables: (service.deliverables || []).join("\n"),
      process: (service.process || []).join("\n"),
      sort_order: String(service.sort_order ?? 0),
      published: service.published,
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
        icon: formData.icon.trim() || null,
        image: formData.image || null,
        highlights: toLines(formData.highlights),
        deliverables: toLines(formData.deliverables),
        process: toLines(formData.process),
        sort_order: Number(formData.sort_order) || 0,
        published: formData.published,
      };

      if (editingId && editingId !== "new") {
        const { error } = await supabase.from("services").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert([payload]);
        if (error) throw error;
      }

      toast({
        title: "Saved",
        description: payload.published
          ? "Service saved and published."
          : "Service saved as a draft — use Preview to review it.",
      });
      await fetchServices();
      setEditingId(null);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Error saving service:", error);
      toast({ title: "Error", description: "Failed to save service", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (service: Service) => {
    try {
      const { error } = await supabase
        .from("services")
        .update({ published: !service.published })
        .eq("id", service.id);
      if (error) throw error;
      await fetchServices();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Service removed" });
      await fetchServices();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete service", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Services</h2>
          <p className="text-sm text-muted-foreground">
            Draft, preview and publish each service page.
          </p>
        </div>
        <Button onClick={() => { setEditingId("new"); setFormData(emptyForm); }} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {editingId !== null && (
        <Card className="mb-6 space-y-4 p-6">
          <h3 className="text-lg font-medium">
            {editingId === "new" ? "Add new service" : "Edit service"}
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
              type="number"
              placeholder="Sort order"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
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
              placeholder="Highlights (one per line)"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
            />
            <Textarea
              rows={5}
              placeholder="Deliverables (one per line)"
              value={formData.deliverables}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
            />
            <Textarea
              rows={5}
              placeholder="Process steps (one per line)"
              value={formData.process}
              onChange={(e) => setFormData({ ...formData, process: e.target.value })}
            />
          </div>

          <ImageUpload
            label="Service image"
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
            {formData.slug && <PreviewButton type="service" slug={formData.slug} />}
            <Button variant="outline" onClick={() => { setEditingId(null); setFormData(emptyForm); }}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-medium text-foreground">{service.title}</h3>
                <StatusBadge published={service.published} />
              </div>
              <p className="text-sm text-muted-foreground">/services/{service.slug}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PreviewButton type="service" slug={service.slug} />
              <Button size="sm" variant="outline" onClick={() => togglePublished(service)}>
                {service.published ? "Unpublish" : "Publish"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive"
                onClick={() => handleDelete(service.id)}
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

export default AdminServices;
