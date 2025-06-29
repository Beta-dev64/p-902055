
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
}

const AdminTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Lead Developer",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      linkedin: "https://linkedin.com/in/sarah-johnson",
      twitter: "https://twitter.com/sarah_codes",
      portfolio: "https://sarahjohnson.dev"
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "UI/UX Designer",
      image: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
      linkedin: "https://linkedin.com/in/michael-chen",
      twitter: "https://twitter.com/mike_designs",
      portfolio: "https://michaelchen.design"
    }
  ]);

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    linkedin: "",
    twitter: "",
    portfolio: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMember) {
      // Update existing member
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === editingMember.id 
            ? { ...member, ...formData }
            : member
        )
      );
      toast({
        title: "Team member updated",
        description: "The team member has been successfully updated."
      });
    } else {
      // Add new member
      const newMember: TeamMember = {
        id: Date.now().toString(),
        ...formData
      };
      setTeamMembers(prev => [...prev, newMember]);
      toast({
        title: "Team member added",
        description: "New team member has been successfully added."
      });
    }

    // Reset form
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

  const handleDelete = (id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    toast({
      title: "Team member deleted",
      description: "The team member has been successfully deleted."
    });
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
              
              <div>
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

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
                <Button type="submit" className="bg-pulse-500 hover:bg-pulse-600">
                  {editingMember ? "Update" : "Add"} Team Member
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
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
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
                        <Pencil className="h-4 w-4" />
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
