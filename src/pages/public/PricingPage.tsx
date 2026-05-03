import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for managing a single small property.",
      features: [
        "Up to 10 Inmates",
        "Basic Payment Tracking",
        "Room Availability",
        "Email Support",
        "Single Property"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: isYearly ? "499" : "599",
      description: "Best for growing PG businesses with multiple floors.",
      features: [
        "Up to 50 Inmates",
        "Automated Invoicing",
        "Expense Management",
        "Priority Email Support",
        "Up to 3 Properties",
        "Basic Analytics"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: isYearly ? "999" : "1199",
      description: "Advanced tools for large scale rental networks.",
      features: [
        "Unlimited Inmates",
        "Custom Roles & Permissions",
        "Advanced Financial Reports",
        "24/7 Phone Support",
        "Unlimited Properties",
        "API Access"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-slate-600">
            Choose the plan that fits your business. Scale as you grow.
          </p>

          <div className="flex items-center justify-center gap-4 pt-8">
            <Label htmlFor="pricing-toggle" className={`text-sm font-medium ${!isYearly ? 'text-primary' : 'text-slate-500'}`}>
              Monthly
            </Label>
            <Switch 
              id="pricing-toggle" 
              checked={isYearly} 
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="pricing-toggle" className={`text-sm font-medium ${isYearly ? 'text-primary' : 'text-slate-500'}`}>
              Yearly <span className="ml-1 text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Save 20%</span>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all hover:scale-105 ${
                plan.popular ? 'border-primary' : 'border-transparent'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">₹{plan.price}</span>
                  <span className="text-slate-500 font-medium">/{isYearly ? 'year' : 'month'}</span>
                </div>
                {isYearly && plan.price !== "0" && (
                  <p className="text-xs text-green-600 font-semibold mt-1">Billed annually</p>
                )}
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <Link to="/signup">
                <Button 
                  className={`w-full h-12 text-md font-bold rounded-xl ${
                    plan.popular ? 'bg-primary' : 'bg-slate-900'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-full border shadow-sm text-sm font-medium">
            <Info className="h-4 w-4" />
            All plans include a 14-day free trial. No credit card required.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
