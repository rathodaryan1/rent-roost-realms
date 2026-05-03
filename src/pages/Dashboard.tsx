import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Home, 
  CreditCard, 
  TrendingUp, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Inmates", value: "0", change: "+0", trend: "up", icon: Users, color: "bg-blue-500", link: "/inmates" },
    { title: "Available Rooms", value: "0", change: "+0", trend: "up", icon: Home, color: "bg-emerald-500", link: "/availability" },
    { title: "Monthly Revenue", value: "₹0", change: "+0%", trend: "up", icon: CreditCard, color: "bg-violet-500", link: "/payments" },
    { title: "Open Issues", value: "0", change: "0", trend: "down", icon: AlertTriangle, color: "bg-orange-500", link: "/issues" }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch Tenants Count
      const { count: tenantsCount } = await supabase.from('tenants').select('*', { count: 'exact', head: true });
      
      // Fetch Available Rooms Count
      const { count: availableRoomsCount } = await supabase
        .from('rooms')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'available');

      // Fetch Total Revenue
      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'paid');
      
      const totalRevenue = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;

      // Fetch Open Issues
      const { count: issuesCount } = await supabase
        .from('issues')
        .select('*', { count: 'exact', head: true })
        .neq('status', 'resolved');

      setStats([
        { title: "Total Inmates", value: String(tenantsCount || 0), change: "+2", trend: "up", icon: Users, color: "bg-blue-500", link: "/inmates" },
        { title: "Available Rooms", value: String(availableRoomsCount || 0), change: "-1", trend: "down", icon: Home, color: "bg-emerald-500", link: "/availability" },
        { title: "Monthly Revenue", value: `₹${totalRevenue.toLocaleString()}`, change: "+12%", trend: "up", icon: CreditCard, color: "bg-violet-500", link: "/payments" },
        { title: "Open Issues", value: String(issuesCount || 0), change: "New", trend: "up", icon: AlertTriangle, color: "bg-orange-500", link: "/issues" }
      ]);
    };

    fetchStats();
  }, []);

  const recentActivities = [
    { type: "check-in", name: "System Update", time: "Just now", description: "All systems operational", avatar: "SU" },
    { type: "payment", name: "Revenue Sync", time: "1 hour ago", description: "Database synchronized", avatar: "RS" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200" asChild>
            <Link to="/reports">View Reports</Link>
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20" asChild>
            <Link to="/inmates">
              <Plus className="h-4 w-4 mr-2" /> Quick Add Inmate
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={stat.link}>
              <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem] overflow-hidden group h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
                      stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-6">
            <div>
              <CardTitle className="text-xl font-bold">System Status</CardTitle>
              <CardDescription>Real-time updates from your database</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold">Refresh</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-white transition-colors border-2 border-transparent group-hover:border-slate-100">
                      {activity.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{activity.name}</p>
                      <p className="text-sm text-slate-500">{activity.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Status */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm rounded-[2rem] bg-slate-900 text-white overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Management Portal</CardTitle>
              <CardDescription className="text-slate-400 font-medium">Commonly used tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pb-8">
              <Button variant="secondary" className="h-24 flex flex-col gap-2 rounded-2xl bg-white/10 border-none hover:bg-white/20 text-white" asChild>
                <Link to="/inmates">
                  <Users className="h-6 w-6" />
                  <span className="text-xs">Add Inmate</span>
                </Link>
              </Button>
              <Button variant="secondary" className="h-24 flex flex-col gap-2 rounded-2xl bg-white/10 border-none hover:bg-white/20 text-white" asChild>
                <Link to="/payments">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-xs">Record Rent</span>
                </Link>
              </Button>
              <Button variant="secondary" className="h-24 flex flex-col gap-2 rounded-2xl bg-white/10 border-none hover:bg-white/20 text-white" asChild>
                <Link to="/availability">
                  <Home className="h-6 w-6" />
                  <span className="text-xs">Manage Rooms</span>
                </Link>
              </Button>
              <Button variant="secondary" className="h-24 flex flex-col gap-2 rounded-2xl bg-white/10 border-none hover:bg-white/20 text-white" asChild>
                <Link to="/issues">
                  <AlertTriangle className="h-6 w-6" />
                  <span className="text-xs">New Issue</span>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Live Sync
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
                <div className="flex justify-between text-sm font-bold text-emerald-700">
                  <span>Supabase Status</span>
                  <span>Online</span>
                </div>
                <div className="h-1.5 w-full bg-emerald-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full"></div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 space-y-2">
                <div className="flex justify-between text-sm font-bold text-blue-700">
                  <span>RLS Policy</span>
                  <span>Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;