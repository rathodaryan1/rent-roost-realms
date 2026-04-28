import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, CreditCard } from "lucide-react";
import { usePayments, useTenants } from "@/hooks/usePgData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function Payments() {
  const { user } = useAuth();
  const { data: payments, isLoading } = usePayments();
  const { data: tenants } = useTenants();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    tenant_id: "", amount: "", month: "", status: "paid", method: "upi", payment_date: new Date().toISOString().slice(0, 10),
  });

  const onSave = async () => {
    if (!form.amount) return toast.error("Amount required");
    setSaving(true);
    const { error } = await supabase.from("payments").insert({
      owner_id: user!.id,
      tenant_id: form.tenant_id || null,
      amount: Number(form.amount),
      month: form.month || null,
      status: form.status as any,
      method: form.method as any,
      payment_date: form.payment_date,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Payment recorded");
    qc.invalidateQueries({ queryKey: ["payments"] });
    setOpen(false);
  };

  const totalPaid = payments?.filter((p) => p.status === "paid").reduce((s, p) => s + Number(p.amount), 0) ?? 0;
  const totalPending = payments?.filter((p) => p.status !== "paid").reduce((s, p) => s + Number(p.amount), 0) ?? 0;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Payments</h1>
          <p className="text-sm text-muted-foreground">Track rent collection and dues.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-gradient-brand"><Plus className="h-4 w-4 mr-2" />Record payment</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Record payment</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Tenant</label>
                <Select value={form.tenant_id} onValueChange={(v) => setForm({ ...form, tenant_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select tenant (optional)" /></SelectTrigger>
                  <SelectContent>{tenants?.map((t) => <SelectItem key={t.id} value={t.id}>{t.full_name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Amount (₹) *</label>
                  <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Month (e.g. 2026-04)</label>
                  <Input value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} placeholder="2026-04" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Status</label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Method</label>
                  <Select value={form.method} onValueChange={(v) => setForm({ ...form, method: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank_transfer">Bank transfer</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Payment date</label>
                <Input type="date" value={form.payment_date} onChange={(e) => setForm({ ...form, payment_date: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={onSave} disabled={saving} className="bg-gradient-brand">{saving ? "Saving..." : "Save"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <Card className="p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground">Collected</p>
          <p className="text-2xl font-bold mt-1">{inr(totalPaid)}</p>
        </Card>
        <Card className="p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground">Outstanding</p>
          <p className="text-2xl font-bold mt-1 text-warning">{inr(totalPending)}</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-2">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-12" />)}</div>
        ) : !payments?.length ? (
          <div className="p-12 text-center">
            <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold mb-1">No payments yet</p>
            <p className="text-sm text-muted-foreground mb-4">Record your first payment to track rent.</p>
            <Button onClick={() => setOpen(true)} className="bg-gradient-brand"><Plus className="h-4 w-4 mr-2" />Record payment</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Month</th>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t border-border/60">
                    <td className="px-4 py-3">{p.payment_date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.month || "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">{p.method?.replace("_", " ") || "-"}</td>
                    <td className="px-4 py-3 text-right font-semibold">{inr(Number(p.amount))}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.status === "paid" ? "bg-success/10 text-success" :
                        p.status === "overdue" ? "bg-destructive/10 text-destructive" :
                        "bg-warning/10 text-warning"
                      }`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
