import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { Users, Target, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              Our Mission is to <span className="text-primary">Simplify</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We started Rent Roost because we saw how difficult it was for PG owners to manage their businesses using paper and spreadsheets. We're building the tools to modernize the rental industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">The Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To become the global standard for property management, empowering landlords with data-driven insights and automated workflows.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Our Values</h3>
              <p className="text-slate-600 leading-relaxed">
                Transparency, security, and simplicity are at the core of everything we build. We believe technology should serve people, not the other way around.
              </p>
            </div>
          </div>

          <div className="text-center space-y-8 bg-slate-900 rounded-[3rem] p-12 text-white">
            <h2 className="text-3xl font-bold">Building for the Future</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-slate-400 text-sm">Active Owners</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                <div className="text-slate-400 text-sm">Tenants Managed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">₹5Cr+</div>
                <div className="text-slate-400 text-sm">Rent Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-slate-400 text-sm">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;