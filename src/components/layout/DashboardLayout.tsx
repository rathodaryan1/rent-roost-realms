import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, Users, CreditCard, Building2, LogOut,
} from "lucide-react";

const mobileTabs = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { to: "/inmates", icon: Users, label: "Tenants" },
  { to: "/payments", icon: CreditCard, label: "Payments" },
  { to: "/bookings", icon: Building2, label: "Bookings" },
];

export default function DashboardLayout() {
  const { signOut, user } = useAuth();
  const { pathname } = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-secondary/30">
        <div className="hidden md:block"><AppSidebar /></div>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-14 border-b border-border bg-background/80 backdrop-blur-lg flex items-center px-4 gap-3">
            <div className="hidden md:block"><SidebarTrigger /></div>
            <Link to="/dashboard" className="md:hidden flex items-center gap-2 font-display font-bold">
              <div className="h-7 w-7 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground">
                <Building2 className="h-3.5 w-3.5" />
              </div>
              RentRoost
            </Link>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-muted-foreground truncate max-w-[200px]">
                {user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" /> Sign out
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto pb-20 md:pb-0">
            <Outlet />
          </main>

          {/* Mobile bottom nav */}
          <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background border-t border-border grid grid-cols-4">
            {mobileTabs.map((t) => {
              const active = pathname === t.to;
              return (
                <NavLink key={t.to} to={t.to}
                  className={`flex flex-col items-center justify-center py-2 text-xs gap-1 ${active ? "text-primary" : "text-muted-foreground"}`}>
                  <t.icon className="h-5 w-5" />
                  {t.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </SidebarProvider>
  );
}