import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const Payouts = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Payouts</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Payout Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Handle refunds and payouts to inmates.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payouts;