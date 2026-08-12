import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Check, Edit, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ReviewStatus = "pending" | "approved" | "rejected";

interface Review {
  id: string;
  content: string;
  author: string;
  role: string;
  rating: number | null;
  status: ReviewStatus;
  source: string;
  created_at: string;
}

const AdminReviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<"all" | ReviewStatus>("pending");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    author: "",
    role: "",
    rating: "5",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("source", "visitor")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews((data as Review[]) || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast({
        title: "Error",
        description: "Failed to fetch visitor reviews. Apply the latest DB migration if columns are missing.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  const setStatus = async (id: string, status: ReviewStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      toast({
        title: "Updated",
        description:
          status === "approved"
            ? "Review approved and now visible on the site."
            : `Review marked as ${status}.`,
      });
      await fetchReviews();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setFormData({
      content: review.content,
      author: review.author,
      role: review.role,
      rating: String(review.rating ?? 5),
    });
  };

  const handleSave = async () => {
    if (!editingId || !formData.content || !formData.author || !formData.role) {
      toast({
        title: "Error",
        description: "Content, author, and role are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({
          content: formData.content,
          author: formData.author,
          role: formData.role,
          rating: Number(formData.rating) || null,
        })
        .eq("id", editingId);
      if (error) throw error;
      toast({ title: "Saved", description: "Review updated successfully" });
      setEditingId(null);
      await fetchReviews();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to save review", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this visitor review?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Review removed" });
      await fetchReviews();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete review", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status: ReviewStatus) => {
    const styles: Record<ReviewStatus, string> = {
      pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
      approved: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
      rejected: "bg-red-500/15 text-red-700 dark:text-red-300",
    };
    return (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Visitor Reviews</h2>
          <p className="text-sm text-muted-foreground">
            Approve, edit, or delete reviews submitted by site visitors.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["pending", "approved", "rejected", "all"] as const).map((key) => (
            <Button
              key={key}
              size="sm"
              variant={filter === key ? "default" : "outline"}
              onClick={() => setFilter(key)}
              className="capitalize"
            >
              {key}
              {key !== "all" && (
                <span className="ml-1 opacity-70">
                  ({reviews.filter((r) => r.status === key).length})
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {editingId && (
        <Card className="mb-6 space-y-4 p-6">
          <h3 className="text-lg font-medium">Edit review</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
            <Input
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
            <Input
              type="number"
              min={1}
              max={5}
              placeholder="Rating"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            />
          </div>
          <Textarea
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setEditingId(null)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {loading && reviews.length === 0 ? (
        <p className="text-muted-foreground">Loading reviews...</p>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No {filter === "all" ? "" : filter} visitor reviews yet.
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((review) => (
            <Card key={review.id} className="p-5">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-foreground">{review.author}</h3>
                    {statusBadge(review.status)}
                    {review.rating != null && (
                      <span className="text-sm text-muted-foreground">{review.rating}/5</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.role}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {review.status !== "approved" && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setStatus(review.id, "approved")}
                      disabled={loading}
                    >
                      <Check className="mr-1 h-3 w-3" />
                      Approve
                    </Button>
                  )}
                  {review.status !== "rejected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setStatus(review.id, "rejected")}
                      disabled={loading}
                    >
                      <X className="mr-1 h-3 w-3" />
                      Reject
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleEdit(review)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDelete(review.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-foreground">"{review.content}"</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
