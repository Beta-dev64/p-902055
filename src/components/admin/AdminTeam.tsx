
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImageUpload } from "@/components/ui/image-upload";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  portfolio?: string | null;
}

const AdminTeam = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    linkedin: "",
    twitter: "",
    portfolio: ""
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role) {
      toast({
        title: "Error",
        description: "Name and role are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const memberData = {
        name: formData.name,
        role: formData.role,
        image: formData.image || null,
        linkedin: formData.linkedin || null,
        twitter: formData.twitter || null,
        portfolio: formData.portfolio || null
      };

      if (editingMember) {
        const { error } = await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', editingMember.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Team member updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([memberData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Team member added successfully"
        });
      }

      await fetchTeamMembers();
      setFormData({
        name: "",
        role: "",
        image: "",
        linkedin: "",
        twitter: "",
        portfolio: ""
      });
      setEditingMember(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving team member:', error);
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image,
      linkedin: member.linkedin || "",
      twitter: member.twitter || "",
      portfolio: member.portfolio || ""
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Team member deleted successfully"
      });
      
      await fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      role: "",
      image: "",
      linkedin: "",
      twitter: "",
      portfolio: ""
    });
    setEditingMember(null);
    setIsFormOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Team Management</h2>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-pulse-500 hover:bg-pulse-600"
          disabled={loading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isFormOpen && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingMember ? "Edit Team Member" : "Add New Team Member"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <ImageUpload
                label="Team Member Image *"
                value={formData.image}
                onChange={(url) => setFormData(prev => ({...prev, image: url}))}
                placeholder="Enter image URL or upload a file"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio URL</Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://portfolio.com"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-pulse-500 hover:bg-pulse-600" disabled={loading}>
                  {loading ? "Saving..." : (editingMember ? "Update" : "Add")} Team Member
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Social Links</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    {member.image && (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {member.linkedin && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          LinkedIn
                        </span>
                      )}
                      {member.twitter && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          Twitter
                        </span>
                      )}
                      {member.portfolio && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Portfolio
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTeam;
