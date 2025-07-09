
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const AdminPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([
    { id: 1, name: "Microsoft", logo: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png" },
    { id: 2, name: "Google", logo: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png" },
    { id: 3, name: "Amazon", logo: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png" },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", logo: "" });

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setFormData({ name: partner.name, logo: partner.logo });
  };

  const handleSave = () => {
    if (editingId) {
      setPartners(partners.map(p => 
        p.id === editingId ? { ...p, ...formData } : p
      ));
    } else {
      const newPartner: Partner = {
        id: Date.now(),
        ...formData
      };
      setPartners([...partners, newPartner]);
    }
    
    setEditingId(null);
    setFormData({ name: "", logo: "" });
  };

  const handleDelete = (id: number) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", logo: "" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Partner Management</h2>
        <Button 
          onClick={() => setEditingId(0)}
          className="bg-pulse-500 hover:bg-pulse-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Form */}
      {editingId !== null && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingId === 0 ? "Add New Partner" : "Edit Partner"}
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="Company Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <ImageUpload
              label="Company Logo"
              value={formData.logo}
              onChange={(url) => setFormData({...formData, logo: url})}
              placeholder="Enter logo URL or upload a file"
            />
          </div>
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

      {/* Partner List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} className="p-4">
            <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h3 className="font-medium text-center mb-3">{partner.name}</h3>
            <div className="flex justify-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(partner)}
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(partner.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPartners;
