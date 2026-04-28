import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Search, Phone, Calendar as CalIcon, Users } from "lucide-react";
import { useTenants } from "@/hooks/usePgData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Inmates() {
  const { user } = useAuth();
  const { data: tenants, isLoading } = useTenants();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ full_name: "", phone: "", monthly_rent: "", check_in_date: "" });
  const [saving, setSaving] = useState(false);

  const filtered = tenants?.filter(
    (t) => !q || t.full_name.toLowerCase().includes(q.toLowerCase()) || t.phone?.includes(q)
  );

  const onSave = async () => {
    if (!form.full_name) return toast.error("Name is required");
    setSaving(true);
    const { error } = await supabase.from("tenants").insert({
      owner_id: user!.id,
      full_name: form.full_name,
      phone: form.phone || null,
      monthly_rent: form.monthly_rent ? Number(form.monthly_rent) : 0,
      check_in_date: form.check_in_date || null,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Tenant added");
    qc.invalidateQueries({ queryKey: ["tenants"] });
    setForm({ full_name: "", phone: "", monthly_rent: "", check_in_date: "" });
    setOpen(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Tenants</h1>
          <p className="text-sm text-muted-foreground">Manage all your inmates and their details.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-brand"><Plus className="h-4 w-4 mr-2" />Add tenant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New tenant</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full name *</label>
                <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Phone</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Monthly rent (₹)</label>
                  <Input type="number" value={form.monthly_rent} onChange={(e) => setForm({ ...form, monthly_rent: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Check-in date</label>
                  <Input type="date" value={form.check_in_date} onChange={(e) => setForm({ ...form, check_in_date: e.target.value })} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={onSave} disabled={saving} className="bg-gradient-brand">{saving ? "Saving..." : "Add tenant"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search by name or phone..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      ) : !filtered?.length ? (
        <Card className="p-12 text-center border-dashed">
          <div className="h-14 w-14 rounded-full bg-primary/10 grid place-items-center mx-auto mb-4 text-primary">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="font-semibold text-lg mb-1">No tenants yet</h2>
          <p className="text-sm text-muted-foreground mb-6">Add your first tenant to get started.</p>
          <Button onClick={() => setOpen(true)} className="bg-gradient-brand"><Plus className="h-4 w-4 mr-2" />Add tenant</Button>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <Card key={t.id} className="p-5 hover:shadow-elevated transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{t.full_name}</h3>
                  <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                    t.status === "active" ? "bg-success/10 text-success" :
                    t.status === "checked_out" ? "bg-muted text-muted-foreground" :
                    "bg-warning/10 text-warning"
                  }`}>{t.status}</span>
                </div>
                <p className="text-sm font-bold">₹{Number(t.monthly_rent ?? 0).toLocaleString("en-IN")}</p>
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                {t.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {t.phone}</div>}
                {t.check_in_date && <div className="flex items-center gap-2"><CalIcon className="h-3.5 w-3.5" /> Since {t.check_in_date}</div>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
