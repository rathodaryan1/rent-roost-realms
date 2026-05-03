import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Mail, Lock, User, ArrowRight, Loader2, Building } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            business_name: businessName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Account created successfully! Check your email for verification.");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-12">
      <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-primary mb-8">
        <div className="bg-primary text-white p-1.5 rounded-xl shadow-lg shadow-primary/20">
          <Home className="h-7 w-7" />
        </div>
        <span>Rent Roost</span>
      </Link>

      <Card className="w-full max-w-md border-none shadow-2xl shadow-slate-200 rounded-3xl overflow-hidden">
        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-slate-500">
            Start your 14-day free trial today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  id="full-name" 
                  placeholder="John Doe" 
                  className="pl-10 h-12 rounded-xl"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-name">PG / Business Name</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  id="business-name" 
                  placeholder="Royal Residency" 
                  className="pl-10 h-12 rounded-xl"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 h-12 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button className="w-full h-12 text-md font-bold rounded-xl shadow-lg shadow-primary/20 mt-4" disabled={loading}>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Get Started <ArrowRight className="ml-2 h-5 w-5" /></>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center pb-8">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
      
      <p className="mt-8 text-center text-xs text-slate-400 max-w-xs">
        By clicking "Get Started", you agree to our{" "}
        <Link to="/terms" className="underline">Terms of Service</Link> and{" "}
        <Link to="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  );
};

export default SignupPage;
