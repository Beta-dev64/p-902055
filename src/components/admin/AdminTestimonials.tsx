
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  avatar: string | null;
  background_image: string | null;
}

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    content: "",
    author: "",
    role: "",
    avatar: "",
    backgroundImage: ""
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      content: testimonial.content,
      author: testimonial.author,
      role: testimonial.role,
      avatar: testimonial.avatar || "",
      backgroundImage: testimonial.background_image || ""
    });
  };

  const handleSave = async () => {
    if (!formData.content || !formData.author || !formData.role) {
      toast({
        title: "Error",
        description: "Content, author, and role are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const testimonialData = {
        content: formData.content,
        author: formData.author,
        role: formData.role,
        avatar: formData.avatar || null,
        background_image: formData.backgroundImage || null
      };

      if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingId);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Testimonial updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Testimonial created successfully"
        });
      }

      await fetchTestimonials();
      setEditingId(null);
      setFormData({ content: "", author: "", role: "", avatar: "", backgroundImage: "" });
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Testimonial deleted successfully"
      });
      
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ content: "", author: "", role: "", avatar: "", backgroundImage: "" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Testimonial Management</h2>
        <Button 
          onClick={() => setEditingId("new")}
          className="bg-pulse-500 hover:bg-pulse-600"
          disabled={loading}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Form */}
      {editingId !== null && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingId === "new" ? "Add New Testimonial" : "Edit Testimonial"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Author Name"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
              />
              <Input
                placeholder="Role/Position"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
            </div>
            <ImageUpload
              label="Author Avatar"
              value={formData.avatar}
              onChange={(url) => setFormData({...formData, avatar: url})}
              placeholder="Enter avatar URL or upload a file"
            />
            <ImageUpload
              label="Background Image"
              value={formData.backgroundImage}
              onChange={(url) => setFormData({...formData, backgroundImage: url})}
              placeholder="Enter background image URL or upload a file"
            />
          </div>
          <Textarea
            placeholder="Testimonial Content"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="mt-4"
            rows={4}
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

      {/* Testimonial List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden">
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${testimonial.background_image || "/background-section1.png"}')` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm mb-2 line-clamp-2">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs opacity-80">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(testimonial)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(testimonial.id)}
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

export default AdminTestimonials;
