// Style: CMS utility surface — clear, restrained, and focused on the one thing the public marquee needs: a credible logo asset.
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Partner = { id: string; name: string; logo: string | null };
const emptyForm = { name: "", logo: "" };

const AdminPartners = () => {
  const { toast } = useToast();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const fetchPartners = async () => { setLoading(true); const { data, error } = await supabase.from("partners").select("id, name, logo").order("created_at", { ascending: false }); if (error) toast({ title: "Could not load partners", description: error.message, variant: "destructive" }); setPartners((data as Partner[]) || []); setLoading(false); };
  useEffect(() => { fetchPartners(); }, []);
  const handleSave = async () => { const name = formData.name.trim(); const logo = formData.logo.trim(); if (!name || !logo) { toast({ title: "Name and logo required", description: "Only partners with a logo appear in the public marquee.", variant: "destructive" }); return; } setLoading(true); const payload = { name, logo }; const result = editingId && editingId !== "new" ? await supabase.from("partners").update(payload).eq("id", editingId) : await supabase.from("partners").insert([payload]); if (result.error) toast({ title: "Could not save partner", description: result.error.message, variant: "destructive" }); else toast({ title: editingId === "new" ? "Partner added" : "Partner updated", description: "The public marquee will use this logo on its next load." }); setEditingId(null); setFormData(emptyForm); await fetchPartners(); setLoading(false); };
  const handleDelete = async (id: string) => { if (!window.confirm("Remove this partner from the public marquee?")) return; setLoading(true); const { error } = await supabase.from("partners").delete().eq("id", id); if (error) toast({ title: "Could not delete partner", description: error.message, variant: "destructive" }); else toast({ title: "Partner removed", description: "The logo will no longer appear publicly." }); await fetchPartners(); setLoading(false); };
  return <div className="p-6"><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-semibold">Partner marquee</h2><p className="mt-1 text-sm text-muted-foreground">Manage the brands shown in the public grayscale-to-color proof rail.</p></div><Button onClick={() => { setEditingId("new"); setFormData(emptyForm); }} disabled={loading}><Plus className="mr-2 h-4 w-4" />Add partner</Button></div>{editingId !== null && <Card className="mb-6 p-6"><h3 className="mb-4 text-lg font-medium">{editingId === "new" ? "Add partner" : "Edit partner"}</h3><div className="grid gap-4 md:grid-cols-2"><Input placeholder="Company name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} /><ImageUpload label="Logo asset" value={formData.logo} onChange={(logo) => setFormData({ ...formData, logo })} placeholder="Enter a logo URL or upload a file" /></div><p className="mt-3 text-xs text-muted-foreground">Use a transparent PNG, SVG, or hosted logo with enough contrast for grayscale display.</p><div className="mt-5 flex gap-2"><Button onClick={handleSave} disabled={loading}>{loading ? "Saving…" : "Save partner"}</Button><Button onClick={() => { setEditingId(null); setFormData(emptyForm); }} variant="outline">Cancel</Button></div></Card>}{partners.length === 0 ? <Card className="p-10 text-center text-sm text-muted-foreground">No partners yet. Add the first brand to activate the public proof rail.</Card> : <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">{partners.map((partner) => <Card key={partner.id} className="overflow-hidden p-4"><div className="flex aspect-video items-center justify-center bg-muted/40 p-5"><img src={partner.logo || undefined} alt={partner.name} className="max-h-full max-w-full object-contain grayscale transition hover:grayscale-0" /></div><h3 className="mt-4 truncate font-medium">{partner.name}</h3><div className="mt-3 flex items-center justify-between gap-2"><span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Eye className="h-3.5 w-3.5" /> Public</span><div className="flex gap-2"><Button size="sm" variant="outline" aria-label={`Edit ${partner.name}`} onClick={() => { setEditingId(partner.id); setFormData({ name: partner.name, logo: partner.logo || "" }); }}><Edit className="h-3 w-3" /></Button><Button size="sm" variant="outline" aria-label={`Remove ${partner.name}`} onClick={() => handleDelete(partner.id)} className="text-red-600 hover:text-red-700"><Trash2 className="h-3 w-3" /></Button></div></div></Card>)}</div>}</div>;
};

export default AdminPartners;
