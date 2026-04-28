import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import PublicLayout from "@/components/layout/PublicLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Public
import Index from "./pages/Index";
import Pricing from "./pages/public/Pricing";
import AboutPublic from "./pages/public/AboutPublic";
import ContactPublic from "./pages/public/ContactPublic";

// Auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard pages (lazy-loaded for perf)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const CheckIn = lazy(() => import("./pages/CheckIn"));
const Availability = lazy(() => import("./pages/Availability"));
const Inmates = lazy(() => import("./pages/Inmates"));
const Payments = lazy(() => import("./pages/Payments"));
const PaymentApprovals = lazy(() => import("./pages/PaymentApprovals"));
const Issues = lazy(() => import("./pages/Issues"));
const Notices = lazy(() => import("./pages/Notices"));
const Checkouts = lazy(() => import("./pages/Checkouts"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Bills = lazy(() => import("./pages/Bills"));
const Payouts = lazy(() => import("./pages/Payouts"));
const Reports = lazy(() => import("./pages/Reports"));
const Tax = lazy(() => import("./pages/Tax"));
const ProfitLoss = lazy(() => import("./pages/ProfitLoss"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading…</div>}>
            <Routes>
              {/* Public site */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<AboutPublic />} />
                <Route path="/contact" element={<ContactPublic />} />
              </Route>

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Protected dashboard */}
              <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
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
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about-app" element={<About />} />
                <Route path="/contact-support" element={<Contact />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
