import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Lead } from "@/lib/cms";

const STATUSES = ["new", "contacted", "qualified", "won", "lost"];

interface AdminLeadsProps {
  adminPassword: string;
}

const AdminLeads = ({ adminPassword }: AdminLeadsProps) => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "project" | "academy">("all");

  const call = useCallback(
    async (payload: Record<string, unknown>) => {
      const { data, error } = await supabase.functions.invoke("admin-leads", {
        body: { password: adminPassword, ...payload },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    [adminPassword],
  );

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await call({ action: "list" });
      setLeads((data?.leads as Lead[]) || []);
    } catch (error) {
      console.error("Failed to load leads:", error);
      toast({
        title: "Could not load leads",
        description:
          "Check that the admin password matches the ADMIN_PASSWORD secret.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [call, toast]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await call({ action: "update", id, status });
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (error) {
      toast({ title: "Error", description: "Failed to update lead", variant: "destructive" });
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    try {
      await call({ action: "delete", id });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast({ title: "Deleted", description: "Lead removed" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete lead", variant: "destructive" });
    }
  };

  const visible = leads.filter((l) => filter === "all" || l.type === filter);

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold">
          Leads <span className="text-gray-400 text-base">({visible.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All submissions</SelectItem>
              <SelectItem value="project">Project inquiries</SelectItem>
              <SelectItem value="academy">Academy enrollments</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchLeads} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {visible.length === 0 && !loading && (
        <p className="text-gray-500">No submissions yet.</p>
      )}

      <div className="space-y-4">
        {visible.map((lead) => (
          <Card key={lead.id} className="p-5">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{lead.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-pulse-100 text-pulse-700">
                    {lead.type === "academy" ? "Academy" : "Project"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <a href={`mailto:${lead.email}`} className="hover:underline">
                    {lead.email}
                  </a>
                  {lead.phone ? ` · ${lead.phone}` : ""}
                  {lead.company ? ` · ${lead.company}` : ""}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {lead.program_slug || lead.service_slug || "—"}
                  {lead.budget ? ` · ${lead.budget}` : ""}
                  {lead.timeline ? ` · ${lead.timeline}` : ""}
                  {" · "}
                  {new Date(lead.created_at).toLocaleString()}
                </p>
                {lead.message && (
                  <p className="text-sm text-gray-700 mt-3 whitespace-pre-wrap">
                    {lead.message}
                  </p>
                )}
              </div>
              <div className="flex items-start gap-2">
                <Select
                  value={lead.status}
                  onValueChange={(value) => updateStatus(lead.id, value)}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="icon"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => deleteLead(lead.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminLeads;