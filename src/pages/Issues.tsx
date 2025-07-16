import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const Issues = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Issues</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Issue Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Track and manage maintenance issues and complaints.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Issues;