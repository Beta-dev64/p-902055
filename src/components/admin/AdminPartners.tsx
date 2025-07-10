
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Partner {
  id: string;
  name: string;
  logo: string | null;
}

const AdminPartners = () => {
  const { toast } = useToast();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", logo: "" });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast({
        title: "Error",
        description: "Failed to fetch partners",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setFormData({ name: partner.name, logo: partner.logo || "" });
  };

  const handleSave = async () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Partner name is required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const partnerData = {
        name: formData.name,
        logo: formData.logo || null
      };

      if (editingId) {
        const { error } = await supabase
          .from('partners')
          .update(partnerData)
          .eq('id', editingId);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Partner updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('partners')
          .insert([partnerData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Partner created successfully"
        });
      }

      await fetchPartners();
      setEditingId(null);
      setFormData({ name: "", logo: "" });
    } catch (error) {
      console.error('Error saving partner:', error);
      toast({
        title: "Error",
        description: "Failed to save partner",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Partner deleted successfully"
      });
      
      await fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast({
        title: "Error",
        description: "Failed to delete partner",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
          onClick={() => setEditingId("new")}
          className="bg-pulse-500 hover:bg-pulse-600"
          disabled={loading}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Form */}
      {editingId !== null && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingId === "new" ? "Add New Partner" : "Edit Partner"}
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
            <Button onClick={handleSave} className="bg-pulse-500 hover:bg-pulse-600" disabled={loading}>
              {loading ? "Saving..." : "Save"}
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
              {partner.logo && (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              )}
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
