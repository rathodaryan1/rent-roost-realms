import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { AppSidebar } from "./components/AppSidebar";

// Layouts
import PublicLayout from "./components/layout/PublicLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import PricingPage from "./pages/public/PricingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import CheckIn from "./pages/CheckIn";
import Availability from "./pages/Availability";
import Inmates from "./pages/Inmates";
import Payments from "./pages/Payments";
import PaymentApprovals from "./pages/PaymentApprovals";
import Issues from "./pages/Issues";
import Notices from "./pages/Notices";
import Checkouts from "./pages/Checkouts";
import Expenses from "./pages/Expenses";
import Bills from "./pages/Bills";
import Payouts from "./pages/Payouts";
import Reports from "./pages/Reports";
import Tax from "./pages/Tax";
import ProfitLoss from "./pages/ProfitLoss";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Properties from "./pages/Properties";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="flex min-h-screen w-full bg-slate-50">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-4 md:hidden">
          <SidebarTrigger />
          <div className="flex items-center gap-2 font-bold text-primary">
            <Home className="h-6 w-6" />
            <span>Rent Roost</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Dashboard Routes - Now at top level for cleaner URLs */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/inmates" element={<Inmates />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/payment-approvals" element={<PaymentApprovals />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/checkouts" element={<Checkouts />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/payouts" element={<Payouts />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/tax" element={<Tax />} />
              <Route path="/profit-loss" element={<ProfitLoss />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
