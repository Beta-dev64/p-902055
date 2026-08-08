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
import { arrayToTextarea, slugify, textareaToArray, type Service } from "@/lib/cms";

const emptyForm = {
  slug: "",
  title: "",
  tagline: "",
  description: "",
  icon: "",
  image: "",
  highlights: "",
  deliverables: "",
  process: "",
  sort_order: 0,
  published: true,
};

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
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Error", description: "Failed to load services", variant: "destructive" });
    }
    setServices((data as Service[]) || []);
    setLoading(false);
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      slug: service.slug,
      title: service.title,
      tagline: service.tagline || "",
      description: service.description || "",
      icon: service.icon || "",
      image: service.image || "",
      highlights: arrayToTextarea(service.highlights),
      deliverables: arrayToTextarea(service.deliverables),
      process: arrayToTextarea(service.process),
      sort_order: service.sort_order,
      published: service.published,
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
      icon: formData.icon || null,
      image: formData.image || null,
      highlights: textareaToArray(formData.highlights),
      deliverables: textareaToArray(formData.deliverables),
      process: textareaToArray(formData.process),
      sort_order: Number(formData.sort_order) || 0,
      published: formData.published,
    };

    setLoading(true);
    try {
      if (editingId && editingId !== "new") {
        const { error } = await supabase.from("services").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert([payload]);
        if (error) throw error;
      }
      toast({ title: "Saved", description: "Service saved successfully" });
      setEditingId(null);
      setFormData(emptyForm);
      await fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      toast({ title: "Error", description: "Failed to save service", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete service", variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: "Service removed" });
    await fetchServices();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Services</h2>
        <Button
          onClick={() => {
            setEditingId("new");
            setFormData(emptyForm);
          }}
          className="bg-pulse-500 hover:bg-pulse-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {editingId !== null && (
        <Card className="p-6 mb-6 space-y-4">
          <h3 className="text-lg font-medium">
            {editingId === "new" ? "Add New Service" : "Edit Service"}
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
            <Textarea
              placeholder="Highlights (one per line)"
              rows={5}
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
            />
            <Textarea
              placeholder="Deliverables (one per line)"
              rows={5}
              value={formData.deliverables}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
            />
            <Textarea
              placeholder="Process steps (one per line)"
              rows={5}
              value={formData.process}
              onChange={(e) => setFormData({ ...formData, process: e.target.value })}
            />
          </div>
          <ImageUpload
            label="Service Image"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            placeholder="Enter image URL or upload a file"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <Input
              placeholder="Lucide icon name (e.g. Rocket)"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            />
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
                id="service-published"
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, published: checked })
                }
              />
              <Label htmlFor="service-published">Published</Label>
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
        {services.map((service) => (
          <Card key={service.id} className="p-4">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-medium">{service.title}</h3>
                <p className="text-xs text-gray-500 mb-2">/services/{service.slug}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{service.tagline}</p>
                {!service.published && (
                  <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                    Draft
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/services/${service.slug}`} target="_blank">
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(service.id)}
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

export default AdminServices;