import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPublic() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); toast.success("Message sent! We'll be in touch."); (e.target as HTMLFormElement).reset(); }, 600);
  };
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in touch</h1>
        <p className="text-muted-foreground text-lg">We usually respond within a few hours.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="md:col-span-2">
          <Card className="p-6">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name</label>
                  <Input required name="name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input required type="email" name="email" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <Textarea required name="message" rows={5} />
              </div>
              <Button disabled={sending} className="bg-gradient-brand">{sending ? "Sending..." : "Send message"}</Button>
            </form>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="p-5">
            <Mail className="h-5 w-5 text-primary mb-2" />
            <p className="font-semibold text-sm">Email</p>
            <p className="text-sm text-muted-foreground">hello@rentroost.app</p>
          </Card>
          <Card className="p-5">
            <Phone className="h-5 w-5 text-primary mb-2" />
            <p className="font-semibold text-sm">Phone</p>
            <p className="text-sm text-muted-foreground">+91 80000 00000</p>
          </Card>
          <Card className="p-5">
            <MapPin className="h-5 w-5 text-primary mb-2" />
            <p className="font-semibold text-sm">Office</p>
            <p className="text-sm text-muted-foreground">Bengaluru, India</p>
          </Card>
        </div>
      </div>
    </div>
  );
}