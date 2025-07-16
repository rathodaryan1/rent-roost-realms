import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const Expenses = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Expense Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Track and manage all PG expenses.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;