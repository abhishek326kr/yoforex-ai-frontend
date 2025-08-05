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
import { Landing } from "@/pages/Landing";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicRoute } from "@/components/PublicRoute";
import { AuthProvider } from "@/hooks/useAuth";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Switch>
            <Route path="/auth">
              <PublicRoute>
                <Auth />
              </PublicRoute>
            </Route>
            <Route path="/" component={Landing} />
            <Route path="/dashboard">
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Route>
             
            
            <Route path="/trading">
              <ProtectedRoute>
                <LiveTrading />
              </ProtectedRoute>
            </Route>
            <Route path="/history">
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            </Route>
            <Route path="/active">
              <ProtectedRoute>
                <ActiveTrades />
              </ProtectedRoute>
            </Route>
            <Route path="/settings">
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            </Route>
            <Route path="/pricing">
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            </Route>
            <Route path="/billing">
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
