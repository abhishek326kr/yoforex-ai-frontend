import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useState } from "react";

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


function LiveSignals() {
    const [expandedSignal, setExpandedSignal] = useState<number | null>(0);

    return (
        <Card className="p-4 bg-gradient-glass backdrop-blur-sm border-border/20">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Live Signals</h3>
                <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 rounded-full bg-trading-profit animate-pulse" />
                    <span className="text-xs text-muted-foreground">Real-time</span>
                </div>
            </div>
            <Accordion 
                type="single" 
                collapsible 
                className="space-y-4"
                value={expandedSignal?.toString()}
                onValueChange={(value) => setExpandedSignal(value ? parseInt(value) : null)}
            >
                {liveSignals.map((signal, index) => (
                    <AccordionItem 
                        key={index} 
                        value={index.toString()}
                        className="border-0"
                    >
                        <div className="p-4 rounded-lg bg-gradient-dark border border-border/10">
                            <AccordionTrigger className="hover:no-underline p-0">
                                <div className="flex items-center justify-between w-full pr-2">
                                    <div className="flex items-center space-x-2">
                                        <Badge
                                            variant={signal.direction === 'BUY' ? 'default' : 'destructive'}
                                            className={signal.direction === 'BUY' ? 'bg-gradient-profit' : 'bg-gradient-loss'}
                                        >
                                            {signal.direction}
                                        </Badge>
                                        <span className="font-medium text-foreground">{signal.pair}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <span className="text-sm font-medium text-foreground">{signal.confidence}%</span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4">
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
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                                    <span>{signal.aiModel}</span>
                                    <span>{signal.time}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <Button size="sm" className="flex-1 bg-gradient-profit hover:bg-accent/90">
                                        Execute Trade
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1">
                                        Copy Signal
                                    </Button>
                                </div>
                            </AccordionContent>
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>


        </Card>
    );
}

export default LiveSignals;
