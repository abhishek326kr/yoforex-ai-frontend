import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, Shield, BarChart3 } from "lucide-react";
import { FC } from 'react';

interface AISignal {
  model: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
}

interface TradeSignal {
  pair: string;
  action: 'BUY' | 'SELL';
  entryPrice: string;
  confidence: number;
  positionSize: string;
  timeSensitivity: string;
}

interface RiskManagement {
  stopLoss: string;
  takeProfit1: string;
  takeProfit2: string;
  riskReward: string;
  maxLoss: string;
  marginRequired: string;
}

interface AIAnalysis {
  signals: AISignal[];
  keyFactors: string[];
  marketTiming: string;
}

const TradeSignalCard: FC<{ signal: TradeSignal }> = ({ signal }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-medium text-muted-foreground">Signal & Entry</h4>
    <div className="p-4 rounded-lg bg-gradient-profit/20 border border-accent/30">
      <div className="flex items-center justify-center mb-3">
        <Badge className="bg-gradient-profit text-lg px-4 py-2">
          {signal.action} {signal.pair}
        </Badge>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground/80">Confidence:</span>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full" 
                style={{ width: `${signal.confidence}%` }}
              />
            </div>
            <span className="font-medium text-foreground">{signal.confidence}%</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/80">Entry Price:</span>
          <span className="font-medium text-foreground">{signal.entryPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/80">Position Size:</span>
          <span className="font-medium text-foreground">{signal.positionSize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/80">Time Sensitivity:</span>
          <Badge variant="secondary" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {signal.timeSensitivity}
          </Badge>
        </div>
      </div>
    </div>
  </div>
);

const RiskManagementCard: FC<{ risk: RiskManagement }> = ({ risk }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-medium text-muted-foreground">Risk Management</h4>
    <div className="p-4 rounded-lg bg-gradient-loss/20 border border-destructive/30">
      <div className="space-y-3 text-sm">
        {Object.entries(risk).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-foreground/80">
              {key.split(/(?=[A-Z])/).map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}:
            </span>
            <span className={`font-medium ${
              key.includes('Loss') ? 'text-trading-loss' : 
              key.includes('Profit') ? 'text-trading-profit' : 'text-foreground'
            }`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AIAnalysisCard: FC<{ analysis: AIAnalysis }> = ({ analysis }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-medium text-muted-foreground">AI Consensus Reasoning</h4>
    <div className="p-4 rounded-lg bg-gradient-primary/20 border border-primary/30">
      <div className="space-y-3">
        <div className="text-sm">
          <span className="text-foreground/80">Multi-AI Analysis:</span>
          <div className="mt-1 space-y-1">
            {analysis.signals.map((signal, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-xs text-muted-foreground">{signal.model}</span>
                <Badge className="bg-gradient-profit text-xs">
                  {signal.action} {signal.confidence}%
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm">
          <span className="text-foreground/80">Key Factors:</span>
          <ul className="mt-1 space-y-1 text-xs text-foreground/70">
            {analysis.keyFactors.map((factor, index) => (
              <li key={index}>• {factor}</li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <span className="text-foreground/80">Market Timing:</span>
          <p className="text-xs text-foreground/70 mt-1">
            {analysis.marketTiming}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ActionButtons: FC = () => (
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
);

const TradeExecution: FC = () => {
  // Mock data - in a real app, this would come from props or a state management solution
  const tradeSignal: TradeSignal = {
    pair: 'EUR/USD',
    action: 'BUY',
    entryPrice: '1.0847',
    confidence: 89,
    positionSize: '$2,000 (2%)',
    timeSensitivity: '5 minutes'
  };

  const riskManagement: RiskManagement = {
    stopLoss: '1.0820 (-27 pips)',
    takeProfit1: '1.0875 (+28 pips)',
    takeProfit2: '1.0895 (+48 pips)',
    riskReward: '1:1.04',
    maxLoss: '$54.00 (2.7%)',
    marginRequired: '$66.95'
  };

  const aiAnalysis: AIAnalysis = {
    signals: [
      { model: 'GPT-4 Omni', action: 'BUY', confidence: 87 },
      { model: 'Claude 3.5', action: 'BUY', confidence: 91 }
    ],
    keyFactors: [
      'Breakout above 1.0840 resistance',
      'RSI bullish divergence detected',
      'Volume confirmation present',
      'USD weakness in session'
    ],
    marketTiming: 'European session opening with high volatility expected. News calendar clear for next 2 hours.'
  };

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-border/20">
      
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TradeSignalCard signal={tradeSignal} />
        <RiskManagementCard risk={riskManagement} />
        <AIAnalysisCard analysis={aiAnalysis} />
      </div>
      
      <ActionButtons />
    </Card>
  );
};

export default TradeExecution;
