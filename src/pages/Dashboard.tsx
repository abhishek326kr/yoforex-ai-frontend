import { TradingLayout } from "@/components/layout/TradingLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  BarChart3,
  Zap,
  Brain,
  ArrowRight
} from "lucide-react";

const portfolioStats = [
  {
    title: "Portfolio Value",
    value: "$12,847.92",
    change: "+$1,247.83",
    changePercent: "+10.8%",
    positive: true,
    icon: DollarSign
  },
  {
    title: "Active Trades",
    value: "7",
    change: "+3",
    changePercent: "Today",
    positive: true,
    icon: Activity
  },
  {
    title: "Win Rate",
    value: "73.4%",
    change: "+2.1%",
    changePercent: "This month",
    positive: true,
    icon: Target
  },
  {
    title: "AI Signals",
    value: "156",
    change: "+23",
    changePercent: "24h",
    positive: true,
    icon: Brain
  }
];

const recentSignals = [
  {
    pair: "EUR/USD",
    direction: "BUY",
    confidence: 89,
    entry: "1.0847",
    target: "1.0875",
    time: "2 min ago",
    aiModel: "GPT-4.1"
  },
  {
    pair: "GBP/JPY",
    direction: "SELL",
    confidence: 82,
    entry: "189.45",
    target: "188.20",
    time: "8 min ago",
    aiModel: "Claude 4 Sonnet"
  },
  {
    pair: "USD/CAD",
    direction: "BUY",
    confidence: 76,
    entry: "1.3612",
    target: "1.3648",
    time: "15 min ago",
    aiModel: "Gemini 2.5 Pro"
  }
];

const aiModels = [
  { name: "GPT-4.1", status: "active", accuracy: "89%", signals: "12" },
  { name: "Claude 4 Sonnet", status: "active", accuracy: "91%", signals: "8" },
  { name: "Gemini 2.5 Pro", status: "standby", accuracy: "87%", signals: "5" },
  { name: "Mistral 7B", status: "active", accuracy: "72%", signals: "15" }
];

export function Dashboard() {
  return (
    <TradingLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Trading Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, John. Here's your AI-powered trading overview.
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Badge variant="secondary" className="bg-gradient-profit text-white">
              <div className="h-2 w-2 rounded-full bg-white mr-2 animate-pulse" />
              Live Trading Active
            </Badge>
            <Button className="bg-gradient-primary hover:bg-primary-hover">
              <Zap className="h-4 w-4 mr-2" />
              Start AI Analysis
            </Button>
          </div>
        </div>

        {/* Portfolio Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className={`trading-card-hover p-6 fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <div className={`flex items-center mt-2 text-sm ${
                      stat.positive ? 'text-trading-profit' : 'text-trading-loss'
                    }`}>
                      {stat.positive ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="font-medium">{stat.change}</span>
                      <span className="text-muted-foreground ml-1">{stat.changePercent}</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent AI Signals */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-border/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Recent AI Signals</h3>
                  <p className="text-sm text-muted-foreground">Latest trading opportunities from AI analysis</p>
                </div>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentSignals.map((signal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/10 hover:border-border/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        signal.direction === 'BUY' 
                          ? 'bg-trading-profit/20 text-trading-profit' 
                          : 'bg-trading-loss/20 text-trading-loss'
                      }`}>
                        {signal.direction}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{signal.pair}</p>
                        <p className="text-xs text-muted-foreground">{signal.aiModel}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">{signal.entry}</p>
                      <p className="text-xs text-muted-foreground">Entry</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">{signal.target}</p>
                      <p className="text-xs text-muted-foreground">Target</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">{signal.confidence}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{signal.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* AI Models Status */}
          <div>
            <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-border/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AI Models</h3>
                  <p className="text-sm text-muted-foreground">Active analysis engines</p>
                </div>
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              
              <div className="space-y-4">
                {aiModels.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-border/10">
                    <div className="flex items-center space-x-3">
                      <div className={`h-3 w-3 rounded-full ${
                        model.status === 'active' ? 'bg-trading-profit animate-pulse' : 'bg-muted'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{model.name}</p>
                        <p className="text-xs text-muted-foreground">{model.signals} signals today</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{model.accuracy}</p>
                      <p className="text-xs text-muted-foreground">Accuracy</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 bg-gradient-primary hover:bg-primary-hover">
                <Brain className="h-4 w-4 mr-2" />
                Configure Models
              </Button>
            </Card>
          </div>
        </div>

        {/* Market Overview */}
        <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-border/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Market Overview</h3>
              <p className="text-sm text-muted-foreground">Key forex pairs and market sentiment</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-trading-profit animate-pulse" />
              <span className="text-sm text-foreground">Markets Open</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { pair: "EUR/USD", price: "1.0847", change: "+0.23%", sentiment: "Bullish" },
              { pair: "GBP/USD", price: "1.2634", change: "-0.15%", sentiment: "Bearish" },
              { pair: "USD/JPY", price: "149.82", change: "+0.34%", sentiment: "Bullish" },
              { pair: "AUD/USD", price: "0.6542", change: "-0.08%", sentiment: "Neutral" }
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-card/30 border border-border/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{item.pair}</span>
                  <Badge variant={item.sentiment === 'Bullish' ? 'default' : item.sentiment === 'Bearish' ? 'destructive' : 'secondary'} className="text-xs">
                    {item.sentiment}
                  </Badge>
                </div>
                <p className="text-xl font-bold text-foreground">{item.price}</p>
                <p className={`text-sm ${
                  item.change.startsWith('+') ? 'text-trading-profit' : 'text-trading-loss'
                }`}>
                  {item.change}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </TradingLayout>
  );
}