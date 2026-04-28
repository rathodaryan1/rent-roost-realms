import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free", monthly: 0, yearly: 0,
    desc: "For owners just getting started.",
    features: ["1 property", "Up to 10 tenants", "Basic dashboard", "Email support"],
    cta: "Start free",
  },
  {
    name: "Pro", monthly: 499, yearly: 4990, popular: true,
    desc: "For serious PG operators.",
    features: ["Up to 5 properties", "Unlimited tenants", "Payments & expenses", "Reports & P&L", "Priority support"],
    cta: "Start Pro trial",
  },
  {
    name: "Premium", monthly: 1499, yearly: 14990,
    desc: "Multi-PG businesses.",
    features: ["Unlimited properties", "Team accounts", "Custom reports", "API access", "Dedicated support"],
    cta: "Contact sales",
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, fair pricing</h1>
        <p className="text-muted-foreground text-lg">Pick a plan. Change or cancel anytime.</p>
        <div className="inline-flex items-center gap-2 mt-8 p-1 rounded-full border border-border bg-card">
          <button onClick={() => setYearly(false)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${!yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            Monthly
          </button>
          <button onClick={() => setYearly(true)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            Yearly <span className="text-xs opacity-80">(save 17%)</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((p) => (
          <Card key={p.name}
            className={`p-8 relative ${p.popular ? "border-primary shadow-glow" : "border-border/60"}`}>
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-brand text-primary-foreground text-xs font-semibold">
                Most popular
              </div>
            )}
            <h3 className="font-display text-xl font-bold mb-1">{p.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{p.desc}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹{yearly ? p.yearly : p.monthly}</span>
              <span className="text-muted-foreground text-sm">/{yearly ? "year" : "month"}</span>
            </div>
            <Button asChild className={`w-full mb-6 ${p.popular ? "bg-gradient-brand" : ""}`} variant={p.popular ? "default" : "outline"}>
              <Link to="/signup">{p.cta}</Link>
            </Button>
            <ul className="space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}