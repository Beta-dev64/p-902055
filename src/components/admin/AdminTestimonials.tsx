
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
  backgroundImage: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      content: "The team delivered our e-commerce platform ahead of schedule. The custom features they built have increased our conversion rate by 45%.",
      author: "Sarah Chen",
      role: "CEO, TechFlow Commerce",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      backgroundImage: "/background-section1.png"
    }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    content: "",
    author: "",
    role: "",
    avatar: "",
    backgroundImage: ""
  });

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      content: testimonial.content,
      author: testimonial.author,
      role: testimonial.role,
      avatar: testimonial.avatar,
      backgroundImage: testimonial.backgroundImage
    });
  };

  const handleSave = () => {
    if (editingId) {
      setTestimonials(testimonials.map(t => 
        t.id === editingId ? { ...t, ...formData } : t
      ));
    } else {
      const newTestimonial: Testimonial = {
        id: Date.now(),
        ...formData
      };
      setTestimonials([...testimonials, newTestimonial]);
    }
    
    setEditingId(null);
    setFormData({ content: "", author: "", role: "", avatar: "", backgroundImage: "" });
  };

  const handleDelete = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
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
          onClick={() => setEditingId(0)}
          className="bg-pulse-500 hover:bg-pulse-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Form */}
      {editingId !== null && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingId === 0 ? "Add New Testimonial" : "Edit Testimonial"}
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
            <Button onClick={handleSave} className="bg-pulse-500 hover:bg-pulse-600">
              Save
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
              style={{ backgroundImage: `url('${testimonial.backgroundImage}')` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm mb-2 line-clamp-2">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
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
