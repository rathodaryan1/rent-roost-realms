import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, Building2, Users, CreditCard, BarChart3, Shield,
  Zap, Check, Star,
} from "lucide-react";

const features = [
  { icon: Building2, title: "Properties & Rooms", desc: "Manage multiple PGs, floors, and rooms with real-time occupancy." },
  { icon: Users, title: "Tenant Records", desc: "Store IDs, contacts, and check-in history securely in one place." },
  { icon: CreditCard, title: "Rent Tracking", desc: "Automated reminders, payment status, and full ledger per tenant." },
  { icon: BarChart3, title: "Reports & P&L", desc: "Monthly revenue, expenses, and profit insights — exportable to CSV." },
  { icon: Shield, title: "Bank-grade security", desc: "Row-level security ensures your data is yours alone." },
  { icon: Zap, title: "Built for speed", desc: "Stripe-fast UI that works beautifully on mobile and desktop." },
];

const testimonials = [
  { name: "Rahul K.", role: "Owner, 3 PGs in Bengaluru", quote: "Cut my admin time in half. Rent collection used to be a nightmare." },
  { name: "Priya S.", role: "Owner, Pune", quote: "Finally a tool that actually looks good and just works on my phone." },
  { name: "Aman D.", role: "Owner, Hyderabad", quote: "The reports alone are worth it. I see profit per property at a glance." },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <Star className="h-3 w-3 fill-current" /> Loved by 500+ PG owners across India
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              The modern way to <span className="text-gradient-brand">run your PG</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rooms, tenants, rent, and expenses — beautifully organized in one dashboard.
              Stop chasing spreadsheets. Start growing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-gradient-brand hover:opacity-90 shadow-glow">
                <Link to="/signup">Start free trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/pricing">View pricing</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">No credit card required · 14-day free trial</p>
          </div>

          {/* Mock dashboard preview */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
              <div className="h-8 bg-secondary/50 border-b border-border flex items-center px-3 gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
              </div>
              <div className="grid md:grid-cols-4 gap-4 p-6">
                {[
                  { label: "Tenants", value: "24", trend: "+3" },
                  { label: "Occupancy", value: "92%", trend: "+5%" },
                  { label: "Revenue", value: "₹1.2L", trend: "+12%" },
                  { label: "Pending", value: "₹8.5K", trend: "-2" },
                ].map((s) => (
                  <Card key={s.label} className="p-4 shadow-soft">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-bold mt-1">{s.value}</p>
                    <p className="text-xs text-success mt-1">{s.trend} this month</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to run a PG</h2>
          <p className="text-muted-foreground text-lg">Replace 5 spreadsheets, 2 apps, and a notebook.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="p-6 hover:shadow-elevated transition-shadow border-border/60">
              <div className="h-10 w-10 rounded-lg bg-primary/10 grid place-items-center text-primary mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Owners love RentRoost</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-1 mb-3 text-warning">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-sm mb-4">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-4">
        <Card className="bg-gradient-brand text-primary-foreground p-12 text-center border-0 shadow-elevated">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to simplify your PG?</h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">Join hundreds of owners running calmer, more profitable PGs.</p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/signup">Start your free trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}