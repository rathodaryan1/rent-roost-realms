import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">How we protect your data and privacy.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy;