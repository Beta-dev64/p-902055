
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Portfolio {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  tags: string[] | null;
}

const AdminPortfolios = () => {
  const { toast } = useToast();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    tags: ""
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPortfolios(data || []);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      toast({
        title: "Error",
        description: "Failed to fetch portfolios",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleEdit = (portfolio: Portfolio) => {
    setEditingId(portfolio.id);
    setFormData({
      title: portfolio.title,
      slug: portfolio.slug,
      description: portfolio.description || "",
      image: portfolio.image || "",
      tags: portfolio.tags ? portfolio.tags.join(", ") : ""
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      toast({
        title: "Error",
        description: "Title and slug are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const portfolioData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description || null,
        image: formData.image || null,
        tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : null
      };

      if (editingId) {
        const { error } = await supabase
          .from('portfolios')
          .update(portfolioData)
          .eq('id', editingId);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Portfolio updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('portfolios')
          .insert([portfolioData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Portfolio created successfully"
        });
      }

      await fetchPortfolios();
      setEditingId(null);
      setFormData({ title: "", slug: "", description: "", image: "", tags: "" });
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast({
        title: "Error",
        description: "Failed to save portfolio",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Portfolio deleted successfully"
      });
      
      await fetchPortfolios();
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      toast({
        title: "Error",
        description: "Failed to delete portfolio",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", slug: "", description: "", image: "", tags: "" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Portfolio Management</h2>
        <Button 
          onClick={() => setEditingId("new")}
          className="bg-pulse-500 hover:bg-pulse-600"
          disabled={loading}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Portfolio
        </Button>
      </div>

      {/* Form */}
      {editingId !== null && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingId === "new" ? "Add New Portfolio" : "Edit Portfolio"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setFormData({
                    ...formData, 
                    title: newTitle,
                    slug: editingId === "new" ? generateSlug(newTitle) : formData.slug
                  });
                }}
              />
              <Input
                placeholder="Slug (URL)"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
              />
            </div>
            <ImageUpload
              label="Portfolio Image"
              value={formData.image}
              onChange={(url) => setFormData({...formData, image: url})}
              placeholder="Enter image URL or upload a file"
            />
            <Input
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
          </div>
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="mt-4"
            rows={3}
          />
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} className="bg-pulse-500 hover:bg-pulse-600" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Portfolio List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="overflow-hidden">
            <img
              src={portfolio.image}
              alt={portfolio.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">{portfolio.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {portfolio.description || "No description"}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {portfolio.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                )) || []}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(portfolio)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(portfolio.id)}
                  className="text-red-600 hover:text-red-700"
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

export default AdminPortfolios;
