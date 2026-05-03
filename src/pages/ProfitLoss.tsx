import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const ProfitLoss = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profit & Loss</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            P&L Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Track profit and loss statements.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitLoss;