import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">FAQ</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Common questions and answers about PG management.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;