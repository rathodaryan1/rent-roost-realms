import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

const Checkouts = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Checkouts</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Checkout Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Process inmate checkouts and final settlements.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkouts;