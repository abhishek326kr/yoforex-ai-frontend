import { Badge } from "@/components/ui/badge";

interface StrategyItemProps {
  strategy: {
    name: string;
    credits: number;
    winRate: number;
    risk: string;
    tier: string;
  };
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (name: string) => void;
}

export function StrategyItem({ strategy, isSelected, isDisabled, onSelect }: StrategyItemProps) {
  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-primary bg-primary/10'
          : isDisabled
          ? 'border-border/10 bg-muted/30 opacity-50 cursor-not-allowed'
          : 'border-border/20 hover:border-border/40'
      }`}
      onClick={() => !isDisabled && onSelect(strategy.name)}
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
  );
}
