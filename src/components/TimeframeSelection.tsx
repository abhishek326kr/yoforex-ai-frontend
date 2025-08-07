import { Card } from "./ui/card"
import { Button } from "./ui/button"

const timeframes = ["1M", "5M", "15M", "30M", "1H", "4H", "8H", "1D", "1W", "1MO"];

interface TimeframeSelectionProps {
    selectedTimeframe: string;
    onTimeframeSelect: (timeframe: string) => void;
}

export default function TimeframeSelection({ selectedTimeframe, onTimeframeSelect }: TimeframeSelectionProps) {
    
    return (
    <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20 flex-shrink-0">
    <h3 className="text-lg font-semibold text-foreground mb-4">Timeframe</h3>
    <div className="grid grid-cols-3 gap-2">
      {timeframes.map((tf) => (
        <Button
          key={tf}
          variant={selectedTimeframe === tf ? "default" : "outline"}
          size="sm"
          className={selectedTimeframe === tf ? "bg-gradient-primary" : ""}
          onClick={() => onTimeframeSelect(tf)}
        >
          {tf}
        </Button>
      ))}
    </div>
  </Card>
    )
}