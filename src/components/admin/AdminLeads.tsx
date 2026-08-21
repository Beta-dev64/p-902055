import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { callAdminFunction } from "@/lib/admin-session";

type LeadStatus = "new" | "contacted" | "qualified" | "closed";

interface Lead {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  budget: string | null;
  timeline: string | null;
  service_slug: string | null;
  program_slug: string | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
}

const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "closed"];
const PAGE_SIZES = [10, 25, 50];

const AdminLeads = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | LeadStatus>("all");
  const [type, setType] = useState<"all" | "project" | "enrollment">("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce the search box so typing doesn't hammer the function
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await callAdminFunction<{ leads: Lead[]; total: number }>(
        "admin-leads",
        { action: "list", search, status, type, page, pageSize },
      );
      setLeads(data.leads);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to load leads. Try logging in again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [search, status, type, page, pageSize, toast]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const rangeLabel = useMemo(() => {
    if (total === 0) return "No leads";
    const from = (page - 1) * pageSize + 1;
    const to = Math.min(total, page * pageSize);
    return `${from}–${to} of ${total}`;
  }, [page, pageSize, total]);

  const updateStatus = async (id: string, next: LeadStatus) => {
    try {
      await callAdminFunction("admin-leads", { action: "update", id, status: next });
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: next } : l)));
      toast({ title: "Updated", description: `Lead marked as ${next}.` });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to update lead", variant: "destructive" });
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    try {
      await callAdminFunction("admin-leads", { action: "delete", id });
      toast({ title: "Deleted", description: "Lead removed." });
      fetchLeads();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete lead", variant: "destructive" });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Leads</h2>
        <p className="text-sm text-muted-foreground">
          Project inquiries and academy enrollments, newest first.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search name, email, company or message"
            value={searchInput}
            maxLength={120}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value as typeof status);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full lg:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={type}
          onValueChange={(value) => {
            setType(value as typeof type);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full lg:w-44">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="project">Project inquiry</SelectItem>
            <SelectItem value="enrollment">Enrollment</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            setPageSize(Number(value));
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full lg:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading leads…
        </div>
      ) : leads.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">
          No leads match these filters.
        </Card>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead.id} className="p-5">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-foreground">{lead.name}</h3>
                    <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
                      {lead.type}
                    </span>
                    {(lead.service_slug || lead.program_slug) && (
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                        {lead.service_slug || lead.program_slug}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <a className="hover:underline" href={`mailto:${lead.email}`}>
                      {lead.email}
                    </a>
                    {lead.phone ? ` · ${lead.phone}` : ""}
                    {lead.company ? ` · ${lead.company}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString()}
                    {lead.budget ? ` · Budget: ${lead.budget}` : ""}
                    {lead.timeline ? ` · Timeline: ${lead.timeline}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Select
                    value={lead.status}
                    onValueChange={(value) => updateStatus(lead.id, value as LeadStatus)}
                  >
                    <SelectTrigger className="w-36 capitalize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={() => deleteLead(lead.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {lead.message && (
                <p className="whitespace-pre-line text-sm text-foreground/90">{lead.message}</p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{rangeLabel}</p>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLeads;
