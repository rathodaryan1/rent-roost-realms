import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const Tax = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tax</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Tax Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Handle tax calculations and compliance.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tax;