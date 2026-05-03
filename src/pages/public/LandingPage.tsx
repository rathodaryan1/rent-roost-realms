import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  Home, 
  CreditCard, 
  ShieldCheck, 
  BarChart3, 
  MessageSquare,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const LandingPage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Trusted by 500+ PG Owners
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900"
            >
              Manage Your PG Like a <span className="text-primary">Pro</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto"
            >
              The all-in-one platform to track inmates, payments, and rooms. 
              Automate your billing and grow your rental business with ease.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/signup">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold">
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900">Everything you need</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools makes managing your property a breeze.
            </p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: Users, 
                title: "Tenant Management", 
                desc: "Store all tenant information, documents, and history in one secure place." 
              },
              { 
                icon: CreditCard, 
                title: "Automated Payments", 
                desc: "Generate invoices automatically and track payments with real-time status." 
              },
              { 
                icon: Home, 
                title: "Room Inventory", 
                desc: "Real-time visibility into room availability across multiple floors or properties." 
              },
              { 
                icon: ShieldCheck, 
                title: "Security Deposit", 
                desc: "Keep track of deposits and deductions during check-out with full history." 
              },
              { 
                icon: BarChart3, 
                title: "Smart Analytics", 
                desc: "Visualise your occupancy rates, revenue trends, and expense reports." 
              },
              { 
                icon: MessageSquare, 
                title: "Complaint Tracking", 
                desc: "Resolve maintenance issues quickly with our integrated ticketing system." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={item}
                className="p-8 rounded-2xl border bg-white hover:shadow-xl transition-shadow group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16">Loved by PG Owners Everywhere</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                text: "Rent Roost changed how I run my PG. I used to spend hours on spreadsheets, now it takes 5 minutes a day.",
                author: "Rajesh Kumar",
                role: "Sunshine PG Owner"
              },
              {
                text: "The payment tracking is flawless. I no longer miss rent collection from any of my 50 inmates.",
                author: "Priya Sharma",
                role: "Harmony Homes"
              },
              {
                text: "Finally, a management app that works on my phone as well as it does on my laptop.",
                author: "Vikram Singh",
                role: "Royal Residency"
              }
            ].map((testimonial, i) => (
              <div key={i} className="space-y-6">
                <div className="flex justify-center text-yellow-400">
                  {[...Array(5)].map((_, i) => <CheckCircle2 key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-lg italic text-slate-300">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to streamline your PG?</h2>
            <p className="text-white/80 text-xl">
              Join hundreds of owners who have already modernized their property management.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="h-14 px-12 text-lg font-bold">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
