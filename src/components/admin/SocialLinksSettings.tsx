import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SOCIAL_FIELDS } from "@/components/FollowUs";

export function SocialLinksSettings() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (supabase as any).from("site_settings").select("*").eq("id", 1).maybeSingle().then(({ data }: any) => {
      const v: Record<string, string> = {};
      SOCIAL_FIELDS.forEach((f) => (v[f.key] = data?.[f.key] || ""));
      setValues(v);
    });
  }, []);

  const save = async () => {
    for (const f of SOCIAL_FIELDS) {
      const v = values[f.key]?.trim();
      if (v && !/^https:\/\/\S+$/.test(v)) {
        toast({ title: `${f.label} link must start with https://`, variant: "destructive" });
        return;
      }
    }
    setSaving(true);
    const row: Record<string, string | null> = {};
    SOCIAL_FIELDS.forEach((f) => (row[f.key] = values[f.key]?.trim() || null));
    const { error } = await (supabase as any).from("site_settings").upsert({ id: 1, ...row });
    setSaving(false);
    toast(error ? { title: "Couldn't save", description: error.message, variant: "destructive" } : { title: "Social links saved" });
  };

  return (
    <Card className="space-y-3 p-4">
      <div>
        <h3 className="font-medium">Social profile links</h3>
        <p className="text-sm text-muted-foreground">Shown in the footer and under each article as "Follow us". Leave blank to hide.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {SOCIAL_FIELDS.map((f) => (
          <Input key={f.key} placeholder={`${f.label} URL (https://...)`} value={values[f.key] || ""}
            onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
        ))}
      </div>
      <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save links"}</Button>
    </Card>
  );
}
