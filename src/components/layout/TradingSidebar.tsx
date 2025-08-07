import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  BarChart3,
  TrendingUp,
  History,
  Target,
  BookOpen,
  Settings,
  CreditCard,
  HelpCircle,
  Menu,
  X,
  Home,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Live Trading", href: "/trading", icon: TrendingUp },
  { name: "History", href: "/history", icon: History },
  { name: "Active Trades", href: "/active", icon: Activity },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
  { name: "Billing", href: "/billing", icon: Target },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
];

export function TradingSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  const SidebarContent = () => (

    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border ">
      {/* Logo Section */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border py-2">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">YoForex</h1>
            <p className="text-xs text-sidebar-foreground/60">AI Trading</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                active
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  active ? "text-white" : "text-sidebar-foreground/60"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Credit Counter */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-gradient-glass backdrop-blur-sm rounded-lg p-4 border border-border/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-sidebar-foreground">Credits</span>
            <span className="text-xs text-sidebar-foreground/60">Pro Plan</span>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm">
              <span className="text-sidebar-foreground/80">2,153 / 5,000</span>
              <span className="text-primary font-medium">43%</span>
            </div>
            <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[43%] bg-gradient-primary rounded-full transition-all duration-500" />
            </div>
          </div>
          <p className="text-xs text-sidebar-foreground/60">Resets in 8h 42m</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-card/80 backdrop-blur-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-60 z-50">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}