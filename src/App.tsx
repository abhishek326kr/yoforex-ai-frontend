import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { Dashboard } from "@/pages/Dashboard";
import { LiveTrading } from "@/pages/LiveTrading";
import { History } from "@/pages/History";
import { ActiveTrades } from "@/pages/ActiveTrades";
import { Settings } from "@/pages/Settings";
import { Pricing } from "@/pages/Pricing";
import { Billing } from "@/pages/Billing";
import { Auth } from "@/pages/Auth";
// import { Landing } from "@/pages/Landing";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/hooks/useAuth";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <AuthProvider>
          <Switch>
            {/* Public routes */}
            <Route path="/auth" component={Auth} />

            {/* Protected routes */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/trading" component={LiveTrading} />

            <Route path="/history" component={History} />

            <Route path="/active"   component={ActiveTrades} />

            <Route path="/settings" component={Settings} />

            <Route path="/pricing" component={Pricing} />
            <Route path="/billing" component={Billing} />
            

            <Route path="/pricing" component={Pricing} />
             

            <Route path="/billing" component={Billing} />

            {/* Catch-all route - redirects based on auth status */}
            <Route path="/">
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Route>
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
