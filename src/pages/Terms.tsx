import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Terms of service for using the PG management system.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;