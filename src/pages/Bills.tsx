import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";

const Bills = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bills</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Bill Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage utility bills and invoices.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bills;