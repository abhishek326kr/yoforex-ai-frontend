import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Bell, User, ChevronDown, TrendingUp, TrendingDown, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

export function TradingHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/prices/prices", {
          headers: { Accept: "application/json" },
        });
        setMarketData(response.data);
      } catch (err: any) {
        setError("Failed to load prices");
      } finally {
        setLoading(false);
      }
    }
    fetchPrices();
    // Optionally, poll every 10 seconds:
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 md:left-60 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border/20">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Market Ticker */}
        <div className="hidden lg:flex items-center space-x-6 flex-1">
          {loading ? (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading prices...</span>
            </div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : (
            marketData.map((item) => (
              <div key={item.pair} className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-foreground">{item.pair}</span>
                <span className="text-foreground/80">{item.price}</span>
                <div className={`flex items-center space-x-1 ${
                  item.change > 0 ? 'text-trading-profit' : item.change < 0 ? 'text-trading-loss' : 'text-muted-foreground'
                }`}>
                  {item.change > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : item.change < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  <span className="text-xs">{item.change > 0 ? '+' : ''}{item.change}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search currencies, strategies..."
              className="pl-10 bg-muted/50 border-0 focus:bg-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Credit Display */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gradient-glass backdrop-blur-sm rounded-lg border border-border/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">2,153</span>
            <span className="text-xs text-muted-foreground">credits</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-foreground">John Trader</p>
                  <p className="text-xs text-muted-foreground">Pro Plan</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Account Balance</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}