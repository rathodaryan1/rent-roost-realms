import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Index from "./pages/Index";
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
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Index />} />
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
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
