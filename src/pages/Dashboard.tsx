import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, CreditCard, TrendingUp, Calendar, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Inmates",
      value: "24",
      change: "+2 from last month",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Available Rooms",
      value: "8",
      change: "3 rooms vacant",
      icon: Home,
      color: "text-green-600"
    },
    {
      title: "Monthly Revenue",
      value: "₹45,000",
      change: "+12% from last month",
      icon: CreditCard,
      color: "text-purple-600"
    },
    {
      title: "Occupancy Rate",
      value: "75%",
      change: "Above average",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    { type: "check-in", name: "John Doe", time: "2 hours ago", room: "Room 12" },
    { type: "payment", name: "Sarah Wilson", time: "4 hours ago", amount: "₹3,500" },
    { type: "check-out", name: "Mike Johnson", time: "Yesterday", room: "Room 8" },
    { type: "issue", name: "Room 15", time: "2 days ago", issue: "AC not working" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest activities in your PG
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'check-in' ? 'bg-green-500' :
                    activity.type === 'payment' ? 'bg-blue-500' :
                    activity.type === 'check-out' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.room || activity.amount || activity.issue} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Pending Actions
            </CardTitle>
            <CardDescription>
              Items that need your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Rent Overdue</p>
                  <p className="text-xs text-muted-foreground">3 inmates</p>
                </div>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">High</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Maintenance Requests</p>
                  <p className="text-xs text-muted-foreground">2 pending</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Medium</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Payment Approvals</p>
                  <p className="text-xs text-muted-foreground">5 pending</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;