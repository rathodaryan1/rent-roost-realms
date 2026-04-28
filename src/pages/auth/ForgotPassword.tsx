import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Building2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Check your inbox for the reset link.");
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8 font-display font-bold text-lg">
          <div className="h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground">
            <Building2 className="h-4 w-4" />
          </div>
          RentRoost
        </Link>
        <Card className="p-8 shadow-elevated">
          <h1 className="text-2xl font-bold mb-1">Reset password</h1>
          <p className="text-sm text-muted-foreground mb-6">We'll email you a reset link.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" disabled={loading} className="w-full bg-gradient-brand">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
            </Button>
          </form>
          <p className="text-sm text-center text-muted-foreground mt-6">
            <Link to="/login" className="text-primary hover:underline">Back to sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}