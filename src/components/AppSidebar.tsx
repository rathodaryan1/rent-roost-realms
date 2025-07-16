import { useState } from "react";
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
  X
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mainMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Bookings", url: "/bookings", icon: Calendar },
  { title: "Check-in", url: "/checkin", icon: UserCheck },
  { title: "Availability", url: "/availability", icon: CheckCircle },
  { title: "Inmates", url: "/inmates", icon: Users },
  { title: "Payments", url: "/payments", icon: CreditCard },
  { title: "Payment Approvals", url: "/payment-approvals", icon: CheckSquare },
  { title: "Issues", url: "/issues", icon: AlertCircle },
  { title: "Notices", url: "/notices", icon: Bell },
  { title: "Checkouts", url: "/checkouts", icon: LogOut },
];

const financeMenuItems = [
  { title: "Expenses", url: "/expenses", icon: Calculator },
  { title: "Bills", url: "/bills", icon: Receipt },
  { title: "Payouts", url: "/payouts", icon: Wallet },
  { title: "Reports", url: "/reports", icon: BarChart },
  { title: "Tax", url: "/tax", icon: DollarSign },
  { title: "Profit/Loss", url: "/profit-loss", icon: TrendingUp },
];

const supportMenuItems = [
  { title: "FAQ", url: "/faq", icon: HelpCircle },
  { title: "Contact Us", url: "/contact", icon: Phone },
  { title: "Terms of Use", url: "/terms", icon: FileText },
  { title: "Privacy Policy", url: "/privacy", icon: Shield },
  { title: "About", url: "/about", icon: Info },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getNavCls = (path: string) => 
    isActive(path) 
      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
      : "hover:bg-sidebar-accent text-sidebar-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                AR
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-sidebar-foreground">Aryan Rathod</span>
                <span className="text-xs text-sidebar-primary bg-sidebar-primary/10 px-2 py-1 rounded">
                  Owner
                </span>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-8 w-8 hover:bg-sidebar-accent"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
        {!collapsed && (
          <div className="mt-2 text-center">
            <div className="text-sm font-medium text-sidebar-foreground">EKKA OG</div>
            <div className="text-xs text-sidebar-primary">PG ID: PGMR6635</div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">
            {!collapsed && "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">
            {!collapsed && "Finance"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financeMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">
            {!collapsed && "Support"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}