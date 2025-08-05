import { useState } from "react";
import { TradingLayout } from "@/components/layout/TradingLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Zap,
  Upload,
  Search,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Shield,
  DollarSign,
  Activity,
  BarChart3,
  ChevronRight,
  Mic
} from "lucide-react";

const forexPairs = [
  { pair: "EUR/USD", price: "1.0847", change: "+0.0023", positive: true, favorite: true },
  { pair: "GBP/USD", price: "1.2634", change: "-0.0015", positive: false, favorite: false },
  { pair: "USD/JPY", price: "149.82", change: "+0.34", positive: true, favorite: true },
  { pair: "AUD/USD", price: "0.6542", change: "-0.0008", positive: false, favorite: false },
  { pair: "USD/CHF", price: "0.8745", change: "+0.0012", positive: true, favorite: false },
  { pair: "EUR/JPY", price: "162.45", change: "+0.23", positive: true, favorite: true }
];

const timeframes = ["1M", "5M", "15M", "30M", "1H", "4H", "8H", "1D", "1W", "1MO"];

const aiModels = {
  free: [
    { name: "Claude Haiku", description: "Fast technical analysis", credits: 1, accuracy: 78 },
    { name: "Gemini 1.5 Flash", description: "Market sentiment", credits: 1, accuracy: 75 },
    { name: "Mistral 7B", description: "Pattern recognition", credits: 1, accuracy: 72 },
    { name: "Llama 3.1 8B", description: "Support/resistance", credits: 1, accuracy: 74 }
  ],
  pro: [
    { name: "GPT-4 Omni", description: "Advanced analysis", credits: 150, accuracy: 89 },
    { name: "Claude 3.5 Sonnet", description: "Deep patterns", credits: 150, accuracy: 91 },
    { name: "Gemini 1.5 Pro", description: "News integration", credits: 150, accuracy: 87 }
  ],
  max: [
    { name: "GPT-4 Turbo", description: "Institutional analysis", credits: 100, accuracy: 94 },
    { name: "Claude 3 Opus", description: "Deep reasoning", credits: 100, accuracy: 92 },
    { name: "Grok AI", description: "Pay-per-use", credits: "Variable", accuracy: 88 }
  ]
};

const strategies = [
  { name: "Breakout Strategy", credits: 2, winRate: 68, risk: "Medium", tier: "free" },
  { name: "Fibonacci Retracement", credits: 2, winRate: 72, risk: "Low", tier: "free" },
  { name: "Trend Following", credits: 2, winRate: 75, risk: "Low", tier: "free" },
  { name: "ICT Concept", credits: 5, winRate: 81, risk: "Medium", tier: "pro" },
  { name: "SMC Strategy", credits: 5, winRate: 79, risk: "Medium", tier: "pro" },
  { name: "Advanced SMC", credits: 8, winRate: 84, risk: "High", tier: "max" },
  { name: "Custom Strategy Builder", credits: 10, winRate: 86, risk: "Variable", tier: "max" }
];

const liveSignals = [
  {
    pair: "EUR/USD",
    direction: "BUY",
    confidence: 89,
    entry: "1.0847",
    sl: "1.0820",
    tp: "1.0875",
    time: "2 min ago",
    aiModel: "GPT-4 Omni",
    reasoning: "Strong bullish momentum with RSI divergence and breakout above key resistance level."
  },
  {
    pair: "GBP/JPY",
    direction: "SELL",
    confidence: 82,
    entry: "189.45",
    sl: "190.20",
    tp: "188.20",
    time: "8 min ago",
    aiModel: "Claude 3.5 Sonnet",
    reasoning: "Bearish engulfing pattern at key resistance with declining volume."
  }
];

export function LiveTrading() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1H");
  const [selectedPair, setSelectedPair] = useState("EUR/USD");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [analysisText, setAnalysisText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const toggleModel = (modelName: string) => {
    setSelectedModels(prev => 
      prev.includes(modelName) 
        ? prev.filter(m => m !== modelName)
        : [...prev, modelName]
    );
  };

  const toggleStrategy = (strategyName: string) => {
    if (selectedStrategies.length < 3 || selectedStrategies.includes(strategyName)) {
      setSelectedStrategies(prev => 
        prev.includes(strategyName) 
          ? prev.filter(s => s !== strategyName)
          : [...prev, strategyName]
      );
    }
  };

  return (
    <TradingLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Live Trading</h1>
            <p className="text-muted-foreground mt-1">AI-powered forex analysis and automated trading</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Badge variant="secondary" className="bg-gradient-profit text-white">
              <Activity className="h-3 w-3 mr-1" />
              Live Markets
            </Badge>
            <Button className="bg-gradient-primary hover:bg-primary-hover">
              <Zap className="h-4 w-4 mr-2" />
              Emergency Stop
            </Button>
          </div>
        </div>

        <Tabs defaultValue="automated" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="automated">Automated AI Trading</TabsTrigger>
            <TabsTrigger value="manual">Manual AI Confirmation</TabsTrigger>
          </TabsList>

          {/* Automated Trading Tab */}
          <TabsContent value="automated">
            <div className="grid grid-cols-12 gap-6 min-h-[800px]">
              {/* Left Panel - Market Selection & AI Config */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                {/* Market Selection */}
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Market Selection</h3>
                  
                  {/* Currency Pair Tabs */}
                  <Tabs defaultValue="forex" className="mb-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="forex" className="text-xs">FOREX (67)</TabsTrigger>
                      <TabsTrigger value="crypto" className="text-xs">CRYPTO (156)</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search pairs..." className="pl-10" />
                  </div>

                  {/* Forex Pairs */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {forexPairs.map((item) => (
                      <div
                        key={item.pair}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedPair === item.pair 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border/20 hover:border-border/40'
                        }`}
                        onClick={() => setSelectedPair(item.pair)}
                      >
                        <div className="flex items-center space-x-2">
                          <Star className={`h-4 w-4 ${item.favorite ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                          <span className="font-medium text-foreground">{item.pair}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{item.price}</p>
                          <p className={`text-xs ${item.positive ? 'text-trading-profit' : 'text-trading-loss'}`}>
                            {item.change}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Timeframe Selection */}
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Timeframe</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeframes.map((tf) => (
                      <Button
                        key={tf}
                        variant={selectedTimeframe === tf ? "default" : "outline"}
                        size="sm"
                        className={selectedTimeframe === tf ? "bg-gradient-primary" : ""}
                        onClick={() => setSelectedTimeframe(tf)}
                      >
                        {tf}
                      </Button>
                    ))}
                  </div>
                </Card>

                {/* AI Models */}
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">AI Models</h3>
                    <Badge variant="secondary">2,153 credits</Badge>
                  </div>

                  <div className="space-y-4">
                    {/* Free Tier */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Free Tier</h4>
                      <div className="space-y-2">
                        {aiModels.free.map((model) => (
                          <div
                            key={model.name}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedModels.includes(model.name)
                                ? 'border-primary bg-gradient-secondary'
                                : 'border-border/20 hover:border-border/40 bg-gradient-secondary/50'
                            }`}
                            onClick={() => toggleModel(model.name)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground">{model.name}</span>
                              <Badge variant="outline" className="text-xs">{model.credits} credit</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{model.description}</p>
                            <p className="text-xs text-trading-neutral mt-1">{model.accuracy}% accuracy</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pro Tier */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Pro Tier</h4>
                      <div className="space-y-2">
                        {aiModels.pro.map((model) => (
                          <div
                            key={model.name}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedModels.includes(model.name)
                                ? 'border-primary bg-gradient-primary/20'
                                : 'border-primary/30 hover:border-primary/50 bg-gradient-primary/10'
                            }`}
                            onClick={() => toggleModel(model.name)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground">{model.name}</span>
                              <Badge className="bg-gradient-primary text-xs">{model.credits} credits</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{model.description}</p>
                            <p className="text-xs text-primary mt-1">{model.accuracy}% accuracy</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Strategy Selection */}
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Strategies</h3>
                    <Badge variant="outline">{selectedStrategies.length}/3</Badge>
                  </div>

                  <div className="space-y-2">
                    {strategies.map((strategy) => (
                      <div
                        key={strategy.name}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedStrategies.includes(strategy.name)
                            ? 'border-primary bg-primary/10'
                            : selectedStrategies.length >= 3
                            ? 'border-border/10 bg-muted/30 opacity-50 cursor-not-allowed'
                            : 'border-border/20 hover:border-border/40'
                        }`}
                        onClick={() => toggleStrategy(strategy.name)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{strategy.name}</span>
                          <Badge 
                            variant={strategy.tier === 'free' ? 'secondary' : strategy.tier === 'pro' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {strategy.credits} credits
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-trading-profit">{strategy.winRate}% win rate</span>
                          <span className="text-muted-foreground">{strategy.risk} risk</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Center Panel - Trading Chart */}
              <div className="col-span-12 lg:col-span-6">
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{selectedPair} Chart</h3>
                      <p className="text-sm text-muted-foreground">TradingView Professional Chart</p>
                    </div>
                    <Badge variant="outline" className="bg-trading-profit/20 text-trading-profit">
                      {selectedTimeframe} Timeframe
                    </Badge>
                  </div>
                  
                  {/* Placeholder for TradingView Chart */}
                  <div className="h-[600px] bg-gradient-dark rounded-lg border border-border/20 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-foreground mb-2">TradingView Chart Integration</h4>
                      <p className="text-sm text-muted-foreground">Professional charting with AI signal overlays</p>
                    </div>
                  </div>

                  {/* Chart Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">Drawing Tools</Button>
                      <Button size="sm" variant="outline">Indicators</Button>
                      <Button size="sm" variant="outline">Save Layout</Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-gradient-primary">
                        <Brain className="h-4 w-4 mr-2" />
                        Analyze Chart
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Panel - Live Signals */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Live Signals</h3>
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 rounded-full bg-trading-profit animate-pulse" />
                      <span className="text-xs text-muted-foreground">Real-time</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {liveSignals.map((signal, index) => (
                      <div key={index} className="p-4 rounded-lg bg-gradient-dark border border-border/10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={signal.direction === 'BUY' ? 'default' : 'destructive'}
                              className={signal.direction === 'BUY' ? 'bg-gradient-profit' : 'bg-gradient-loss'}
                            >
                              {signal.direction}
                            </Badge>
                            <span className="font-medium text-foreground">{signal.pair}</span>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <span className="text-sm font-medium text-foreground">{signal.confidence}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="text-center p-2 bg-card/30 rounded">
                            <p className="text-xs text-muted-foreground">Entry</p>
                            <p className="text-sm font-medium text-foreground">{signal.entry}</p>
                          </div>
                          <div className="text-center p-2 bg-card/30 rounded">
                            <p className="text-xs text-muted-foreground">SL</p>
                            <p className="text-sm font-medium text-trading-loss">{signal.sl}</p>
                          </div>
                          <div className="text-center p-2 bg-card/30 rounded">
                            <p className="text-xs text-muted-foreground">TP</p>
                            <p className="text-sm font-medium text-trading-profit">{signal.tp}</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground mb-1">AI Reasoning:</p>
                          <p className="text-xs text-foreground/80 leading-relaxed">{signal.reasoning}</p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{signal.aiModel}</span>
                          <span>{signal.time}</span>
                        </div>

                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" className="flex-1 bg-gradient-profit hover:bg-accent/90">
                            Execute Trade
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Copy Signal
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Active Positions */}
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Active Positions</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-gradient-dark border border-border/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">EUR/USD</span>
                        <Badge className="bg-gradient-profit text-xs">+$124.50</Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Entry: 1.0820</span>
                        <span>Current: 1.0847</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Manual AI Confirmation Tab */}
          <TabsContent value="manual">
            <div className="grid grid-cols-12 gap-6 min-h-[800px]">
              {/* Left Panel - Analysis Input */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Analysis Input</h3>
                  
                  {/* Upload Section */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-2">Upload Chart</h4>
                    <div className="border-2 border-dashed border-border/40 rounded-lg p-6 text-center hover:border-border/60 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-foreground">Drop chart screenshot here</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 10MB</p>
                    </div>
                  </div>

                  {/* Text Analysis */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-foreground">Text Analysis</h4>
                      <Button size="sm" variant="outline">
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Describe the market situation, ask specific questions, or paste trading analysis..."
                      className="min-h-[120px] resize-none"
                      value={analysisText}
                      onChange={(e) => setAnalysisText(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">{analysisText.length}/2000</span>
                      <Select>
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue placeholder="Template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Analysis</SelectItem>
                          <SelectItem value="sentiment">Market Sentiment</SelectItem>
                          <SelectItem value="risk">Risk Management</SelectItem>
                          <SelectItem value="multi">Multi-timeframe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Input Type Selection */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-2">Analysis Type</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" className="justify-start h-auto p-3">
                        <div className="text-left">
                          <p className="text-sm font-medium">Text Only</p>
                          <p className="text-xs text-muted-foreground">Standard text analysis</p>
                        </div>
                      </Button>
                      <Button variant="outline" className="justify-start h-auto p-3">
                        <div className="text-left">
                          <p className="text-sm font-medium">Image Only</p>
                          <p className="text-xs text-muted-foreground">Chart screenshot analysis</p>
                        </div>
                      </Button>
                      <Button className="justify-start h-auto p-3 bg-gradient-primary">
                        <div className="text-left">
                          <p className="text-sm font-medium">Text + Image</p>
                          <p className="text-xs opacity-90">Combined analysis</p>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* AI Model Selection */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">AI Models</h4>
                    <div className="space-y-2">
                      {aiModels.pro.slice(0, 2).map((model) => (
                        <div
                          key={model.name}
                          className="p-3 rounded-lg border border-primary/30 bg-gradient-primary/10 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{model.name}</span>
                            <Badge className="bg-gradient-primary text-xs">{model.credits} credits</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{model.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4 bg-gradient-primary hover:bg-primary-hover">
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze with AI
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Center Panel - Interactive Chart */}
              <div className="col-span-12 lg:col-span-6">
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Interactive Chart</h3>
                      <p className="text-sm text-muted-foreground">Annotate and analyze with drawing tools</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">Screenshot</Button>
                      <Button size="sm" variant="outline">Annotate</Button>
                    </div>
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="h-[600px] bg-gradient-dark rounded-lg border border-border/20 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-foreground mb-2">Interactive TradingView Chart</h4>
                      <p className="text-sm text-muted-foreground">Full drawing tools and annotation capabilities</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Panel - AI Analysis Results */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">AI Analysis Results</h3>
                  
                  {/* Individual Model Responses */}
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">GPT-4 Omni</span>
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-xs text-foreground">87%</span>
                        </div>
                      </div>
                      <p className="text-xs text-foreground/80 mb-2">
                        Strong bullish momentum identified with breakout above key resistance. RSI divergence suggests continuation.
                      </p>
                      <Badge className="bg-gradient-profit text-xs">BUY Signal</Badge>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Claude 3.5 Sonnet</span>
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-xs text-foreground">91%</span>
                        </div>
                      </div>
                      <p className="text-xs text-foreground/80 mb-2">
                        Market structure supports bullish bias. Clean break of previous high with strong volume confirmation.
                      </p>
                      <Badge className="bg-gradient-profit text-xs">BUY Signal</Badge>
                    </div>
                  </div>

                  {/* Consensus Recommendation */}
                  <div className="p-4 rounded-lg bg-gradient-profit/20 border border-accent/30">
                    <div className="text-center mb-4">
                      <Badge className="bg-gradient-profit text-lg px-4 py-2 mb-2">BUY</Badge>
                      <div className="flex items-center justify-center space-x-1">
                        <div className="h-3 w-3 rounded-full bg-accent" />
                        <span className="text-sm font-medium text-foreground">89% Confidence</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/80">Entry Price:</span>
                        <span className="font-medium text-foreground">1.0847</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/80">Stop Loss:</span>
                        <span className="font-medium text-trading-loss">1.0820</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/80">Take Profit:</span>
                        <span className="font-medium text-trading-profit">1.0875</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/80">Risk/Reward:</span>
                        <span className="font-medium text-foreground">1:1.04</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/80">Position Size:</span>
                        <span className="font-medium text-foreground">2% of account</span>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-gradient-profit hover:bg-accent/90">
                      <Target className="h-4 w-4 mr-2" />
                      Execute Trade
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Execution Results Component */}
        <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-border/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">Trade Execution Analysis</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trade Signal & Entry */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Signal & Entry</h4>
              <div className="p-4 rounded-lg bg-gradient-profit/20 border border-accent/30">
                <div className="flex items-center justify-center mb-3">
                  <Badge className="bg-gradient-profit text-lg px-4 py-2">BUY EUR/USD</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Confidence:</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[89%] bg-accent rounded-full" />
                      </div>
                      <span className="font-medium text-foreground">89%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Entry Price:</span>
                    <span className="font-medium text-foreground">1.0847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Position Size:</span>
                    <span className="font-medium text-foreground">$2,000 (2%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Time Sensitivity:</span>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      5 minutes
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Risk Management</h4>
              <div className="p-4 rounded-lg bg-gradient-loss/20 border border-destructive/30">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Stop Loss:</span>
                    <span className="font-medium text-trading-loss">1.0820 (-27 pips)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Take Profit 1:</span>
                    <span className="font-medium text-trading-profit">1.0875 (+28 pips)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Take Profit 2:</span>
                    <span className="font-medium text-trading-profit">1.0895 (+48 pips)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Risk/Reward:</span>
                    <span className="font-medium text-foreground">1:1.04</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Max Loss:</span>
                    <span className="font-medium text-trading-loss">$54.00 (2.7%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Margin Req:</span>
                    <span className="font-medium text-foreground">$66.95</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">AI Consensus Reasoning</h4>
              <div className="p-4 rounded-lg bg-gradient-primary/20 border border-primary/30">
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-foreground/80">Multi-AI Analysis:</span>
                    <div className="mt-1 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">GPT-4 Omni</span>
                        <Badge className="bg-gradient-profit text-xs">BUY 87%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Claude 3.5</span>
                        <Badge className="bg-gradient-profit text-xs">BUY 91%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-foreground/80">Key Factors:</span>
                    <ul className="mt-1 space-y-1 text-xs text-foreground/70">
                      <li>• Breakout above 1.0840 resistance</li>
                      <li>• RSI bullish divergence detected</li>
                      <li>• Volume confirmation present</li>
                      <li>• USD weakness in session</li>
                    </ul>
                  </div>

                  <div className="text-sm">
                    <span className="text-foreground/80">Market Timing:</span>
                    <p className="text-xs text-foreground/70 mt-1">
                      European session opening with high volatility expected. News calendar clear for next 2 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <Button size="lg" className="bg-gradient-profit hover:bg-accent/90 px-8">
              <Target className="h-5 w-5 mr-2" />
              Execute Trade Now
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              <Shield className="h-5 w-5 mr-2" />
              Set Alert Only
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              <BarChart3 className="h-5 w-5 mr-2" />
              Modify Parameters
            </Button>
          </div>
        </Card>
      </div>
    </TradingLayout>
  );
}