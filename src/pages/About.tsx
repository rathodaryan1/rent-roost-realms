import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

const About = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About This System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Learn more about the PG management system.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;