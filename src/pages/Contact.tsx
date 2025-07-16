import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Get Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Contact support for help with the system.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;