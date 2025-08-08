import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Info, ArrowUp, ArrowDown } from 'lucide-react';

interface AnalysisDisplayProps {
  analysis: {
    confidence: number;
    entry: number;
    recommendation: string;
    risk_reward_ratio: number;
    signal: string;
    stop_loss: number;
    take_profit: number;
    technical_analysis: {
      Breakout_Direction: string;
      Resistance_Level: number;
      Support_Level: number;
      Volume_Confirmation: string;
    };
  };
}

export function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  const isBullish = analysis.signal === 'BUY';
  const confidencePercentage = Math.round(analysis.confidence * 100);
  
  const getSignalVariant = () => {
    if (analysis.signal === 'BUY') return 'bg-green-500/10 text-green-500';
    if (analysis.signal === 'SELL') return 'bg-red-500/10 text-red-500';
    return 'bg-yellow-500/10 text-yellow-500';
  };

  const getRecommendationVariant = () => {
    if (analysis.recommendation === 'STRONG_BUY' || analysis.recommendation === 'STRONG_SELL') {
      return 'bg-amber-500/10 text-amber-500';
    }
    return 'bg-blue-500/10 text-blue-500';
  };

  return (
    <div className="space-y-4">
      {/* Signal and Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Signal</p>
              <div className="flex items-center mt-1">
                <Badge 
                  className={`${getSignalVariant()} text-sm font-medium px-3 py-1`}
                >
                  {isBullish ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {analysis.signal}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Confidence</p>
              <p className="text-2xl font-bold">{confidencePercentage}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Recommendation</p>
              <Badge className={`${getRecommendationVariant()} mt-1 text-sm font-medium px-3 py-1`}>
                {analysis.recommendation.replace('_', ' ')}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Risk/Reward</p>
              <p className="text-2xl font-bold">{analysis.risk_reward_ratio.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Entry, SL, TP */}
      <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
        <h3 className="text-md font-medium mb-3">Trade Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/10 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">Entry</p>
            <p className="text-lg font-semibold">{analysis.entry.toFixed(5)}</p>
          </div>
          <div className="bg-red-500/10 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">Stop Loss</p>
            <p className="text-lg font-semibold text-red-500">{analysis.stop_loss.toFixed(5)}</p>
          </div>
          <div className="bg-green-500/10 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">Take Profit</p>
            <p className="text-lg font-semibold text-green-500">{analysis.take_profit.toFixed(5)}</p>
          </div>
        </div>
      </Card>

      {/* Technical Analysis */}
      <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
        <h3 className="text-md font-medium mb-3">Technical Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="bg-muted/10 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Support Level</p>
              <p className="font-medium">{analysis.technical_analysis.Support_Level?.toFixed(5) || 'N/A'}</p>
            </div>
            <div className="bg-muted/10 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Resistance Level</p>
              <p className="font-medium">{analysis.technical_analysis.Resistance_Level?.toFixed(5) || 'N/A'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-muted/10 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Breakout Direction</p>
              <div className="flex items-center">
                {analysis.technical_analysis.Breakout_Direction === 'UP' ? (
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                ) : analysis.technical_analysis.Breakout_Direction === 'DOWN' ? (
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <Info className="h-4 w-4 text-blue-500 mr-1" />
                )}
                <p className="font-medium">{analysis.technical_analysis.Breakout_Direction || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-muted/10 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Volume Confirmation</p>
              <div className="flex items-center">
                {analysis.technical_analysis.Volume_Confirmation === 'High' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                )}
                <p className="font-medium">{analysis.technical_analysis.Volume_Confirmation || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
