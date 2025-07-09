
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Portfolio {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const AdminPortfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([
    {
      id: 1,
      slug: "e-commerce-platform",
      title: "E-Commerce Platform Redesign",
      description: "Complete overhaul of a legacy e-commerce system with modern architecture and improved user experience, resulting in 300% increase in conversion rates.",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      tags: ["React", "Node.js", "AWS", "Stripe"]
    }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    tags: ""
  });

  const handleEdit = (portfolio: Portfolio) => {
    setEditingId(portfolio.id);
    setFormData({
      title: portfolio.title,
      slug: portfolio.slug,
      description: portfolio.description,
      image: portfolio.image,
      tags: portfolio.tags.join(", ")
    });
  };

  const handleSave = () => {
    if (editingId) {
      setPortfolios(portfolios.map(p => 
        p.id === editingId 
          ? {
              ...p,
              ...formData,
              tags: formData.tags.split(",").map(tag => tag.trim())
            }
          : p
      ));
    } else {
      const newPortfolio: Portfolio = {
        id: Date.now(),
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim())
      };
      setPortfolios([...portfolios, newPortfolio]);
    }
    
    setEditingId(null);
    setFormData({ title: "", slug: "", description: "", image: "", tags: "" });
  };

  const handleDelete = (id: number) => {
    setPortfolios(portfolios.filter(p => p.id !== id));
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
          onClick={() => setEditingId(0)}
          className="bg-pulse-500 hover:bg-pulse-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Portfolio
        </Button>
      </div>

      {/* Form */}
      {editingId !== null && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingId === 0 ? "Add New Portfolio" : "Edit Portfolio"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
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
            <Button onClick={handleSave} className="bg-pulse-500 hover:bg-pulse-600">
              Save
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
                {portfolio.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {portfolio.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
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
