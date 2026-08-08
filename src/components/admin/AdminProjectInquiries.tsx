import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type InquiryStatus = "new" | "contacted" | "closed";

interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company_website: string | null;
  services: string | null;
  budget: string | null;
  project_details: string | null;
  status: InquiryStatus;
  source: string;
  created_at: string;
}

const AdminProjectInquiries = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<"all" | InquiryStatus>("new");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("project_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries((data as Inquiry[]) || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast({
        title: "Error",
        description:
          "Failed to load project requests. Run the latest Supabase migration if the table is missing.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  const updateStatus = async (id: string, status: InquiryStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("project_inquiries")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Updated", description: `Marked as ${status}` });
      await fetchInquiries();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project request?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("project_inquiries").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Project request removed" });
      await fetchInquiries();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Project Requests</h2>
          <p className="text-sm text-muted-foreground">
            Build requests submitted from the Let's Build Together form.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["new", "contacted", "closed", "all"] as const).map((key) => (
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
                  ({inquiries.filter((i) => i.status === key).length})
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {loading && inquiries.length === 0 ? (
        <p className="text-muted-foreground">Loading project requests...</p>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No {filter === "all" ? "" : filter} project requests yet.
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((inquiry) => (
            <Card key={inquiry.id} className="p-5">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {inquiry.first_name} {inquiry.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">
                      {inquiry.email}
                    </a>
                    {inquiry.company_website ? ` · ${inquiry.company_website}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(inquiry.created_at).toLocaleString()} · {inquiry.source}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {inquiry.status !== "contacted" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(inquiry.id, "contacted")}
                      disabled={loading}
                    >
                      Mark contacted
                    </Button>
                  )}
                  {inquiry.status !== "closed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(inquiry.id, "closed")}
                      disabled={loading}
                    >
                      Close
                    </Button>
                  )}
                  {inquiry.status !== "new" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(inquiry.id, "new")}
                      disabled={loading}
                    >
                      Reopen
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDelete(inquiry.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <p>
                  <span className="font-medium text-foreground">Services:</span>{" "}
                  {inquiry.services || "—"}
                </p>
                <p>
                  <span className="font-medium text-foreground">Budget:</span>{" "}
                  {inquiry.budget || "—"}
                </p>
              </div>
              {inquiry.project_details && (
                <p className="mt-3 text-foreground">{inquiry.project_details}</p>
              )}
              <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                Status: {inquiry.status}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjectInquiries;
