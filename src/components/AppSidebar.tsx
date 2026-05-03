import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  UserCheck, 
  CheckCircle, 
  Users, 
  CreditCard, 
  CheckSquare,
  AlertCircle,
  Bell,
  LogOut,
  Calculator,
  Receipt,
  Wallet,
  BarChart,
  DollarSign,
  TrendingUp,
  Settings,
  HelpCircle,
  Phone,
  FileText,
  Shield,
  Info,
  Menu,
  X,
  ChevronRight,
  Plus,
  Building
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const mainMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Properties", url: "/properties", icon: Building },
  { title: "Bookings", url: "/bookings", icon: Calendar },
  { title: "Check-in", url: "/checkin", icon: UserCheck },
  { title: "Availability", url: "/availability", icon: CheckCircle },
  { title: "Inmates", url: "/inmates", icon: Users },
  { title: "Payments", url: "/payments", icon: CreditCard },
  { title: "Approvals", url: "/payment-approvals", icon: CheckSquare },
  { title: "Issues", url: "/issues", icon: AlertCircle },
  { title: "Notices", url: "/notices", icon: Bell },
];

const financeMenuItems = [
  { title: "Expenses", url: "/expenses", icon: Calculator },
  { title: "Reports", url: "/reports", icon: BarChart },
  { title: "Profit/Loss", url: "/profit-loss", icon: TrendingUp },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setProfile({
          name: user.user_metadata.full_name || "Owner",
          business: user.user_metadata.business_name || "My PG",
          avatar: user.user_metadata.avatar_url
        });
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
    } else {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r border-slate-200" collapsible="icon">
      <SidebarHeader className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight">Rent Roost</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-8 w-8 text-slate-500 hover:bg-slate-100"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            {!collapsed && "Management"}
          </SidebarGroupLabel>
          <SidebarMenu>
            {mainMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <NavLink 
                    to={item.url} 
                    end={item.url === "/dashboard"}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200
                      ${isActive 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 font-semibold" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                    `}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            {!collapsed && "Finance"}
          </SidebarGroupLabel>
          <SidebarMenu>
            {financeMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <NavLink 
                    to={item.url} 
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200
                      ${isActive 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 font-semibold" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                    `}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-100">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
            <AvatarImage src={profile?.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {profile?.name?.charAt(0) || "O"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{profile?.name}</p>
              <p className="text-xs text-slate-500 truncate">{profile?.business}</p>
            </div>
          )}
          {!collapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-500 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
        {collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="mt-4 text-slate-400 hover:text-red-500 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}