import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const Notices = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Notices</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notice Board
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage notices and announcements for inmates.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notices;