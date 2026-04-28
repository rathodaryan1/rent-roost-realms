import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import {
  Users, Home, CreditCard, TrendingUp, Plus, ArrowUpRight, AlertCircle,
} from "lucide-react";
import { useTenants, useRooms, usePayments, useExpenses } from "@/hooks/usePgData";
import { useAuth } from "@/hooks/useAuth";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function Dashboard() {
  const { user } = useAuth();
  const { data: tenants, isLoading: tLoad } = useTenants();
  const { data: rooms, isLoading: rLoad } = useRooms();
  const { data: payments, isLoading: pLoad } = usePayments();
  const { data: expenses } = useExpenses();

  const activeTenants = tenants?.filter((t) => t.status === "active").length ?? 0;
  const totalRooms = rooms?.length ?? 0;
  const occupiedRooms = rooms?.filter((r) => r.status === "occupied").length ?? 0;
  const occupancy = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthRevenue = payments
    ?.filter((p) => p.status === "paid" && p.payment_date?.startsWith(thisMonth))
    .reduce((s, p) => s + Number(p.amount), 0) ?? 0;
  const pendingDues = payments
    ?.filter((p) => p.status === "pending" || p.status === "overdue")
    .reduce((s, p) => s + Number(p.amount), 0) ?? 0;

  const stats = [
    { title: "Active Tenants", value: String(activeTenants), icon: Users, hint: `${tenants?.length ?? 0} total` },
    { title: "Occupancy", value: `${occupancy}%`, icon: Home, hint: `${occupiedRooms}/${totalRooms} rooms` },
    { title: "Revenue (this month)", value: inr(monthRevenue), icon: CreditCard, hint: "Paid invoices" },
    { title: "Pending dues", value: inr(pendingDues), icon: TrendingUp, hint: "Across all tenants" },
  ];

  const loading = tLoad || rLoad || pLoad;
  const empty = !loading && totalRooms === 0 && (tenants?.length ?? 0) === 0;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening at your PG today.</p>
        </div>
        <Button asChild className="bg-gradient-brand"><Link to="/inmates"><Plus className="h-4 w-4 mr-2" />Add tenant</Link></Button>
      </div>

      {empty ? (
        <Card className="p-12 text-center border-dashed">
          <div className="h-14 w-14 rounded-full bg-primary/10 grid place-items-center mx-auto mb-4 text-primary">
            <Home className="h-6 w-6" />
          </div>
          <h2 className="font-semibold text-lg mb-1">Let's set up your first PG</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Add a property and rooms to start tracking tenants and rent.
          </p>
          <Button asChild className="bg-gradient-brand"><Link to="/availability">Add your first room</Link></Button>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s) =>
              loading ? (
                <Skeleton key={s.title} className="h-28 rounded-xl" />
              ) : (
                <Card key={s.title} className="p-4 md:p-5 shadow-soft hover:shadow-elevated transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">{s.title}</p>
                    <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center text-primary">
                      <s.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.hint}</p>
                </Card>
              )
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="p-5 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent payments</h3>
                <Button asChild variant="ghost" size="sm"><Link to="/payments">View all <ArrowUpRight className="h-3 w-3 ml-1" /></Link></Button>
              </div>
              {!payments?.length ? (
                <p className="text-sm text-muted-foreground py-8 text-center">No payments yet.</p>
              ) : (
                <div className="space-y-2">
                  {payments.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b border-border/60 last:border-0">
                      <div>
                        <p className="text-sm font-medium">{p.month || "Rent"}</p>
                        <p className="text-xs text-muted-foreground">{p.payment_date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{inr(Number(p.amount))}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          p.status === "paid" ? "bg-success/10 text-success" :
                          p.status === "overdue" ? "bg-destructive/10 text-destructive" :
                          "bg-warning/10 text-warning"
                        }`}>{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><AlertCircle className="h-4 w-4 text-warning" /> Quick actions</h3>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start"><Link to="/checkin">Check in a guest</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start"><Link to="/payments">Record payment</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start"><Link to="/expenses">Log expense</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start"><Link to="/issues">Report issue</Link></Button>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
