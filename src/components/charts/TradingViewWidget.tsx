import { useEffect, useRef, memo, useMemo, useState } from 'react';
import { formatTradingViewSymbol } from '@/utils/trading';

export interface TradingViewWidgetProps {
  symbol: string;
  interval?: string;
  theme?: 'light' | 'dark';
  autosize?: boolean;
  hideSideToolbar?: boolean;
  hideTopToolbar?: boolean;
  width?: string | number;
  height?: string | number;
  style?: string;
  allowSymbolChange?: boolean;
  saveImage?: boolean;
  showVolume?: boolean;
  hideVolume?: boolean;
  containerId?: string;
  onTimeframeChange?: (timeframe: string) => void;
}

const TradingViewWidget = ({
  symbol,
  interval = '60',
  theme = 'dark',
  autosize = true,
  hideSideToolbar = false,
  hideTopToolbar = false,
  width = '100%',
  height = '100%',
  style = '1',
  allowSymbolChange = true,
  saveImage = true,
  showVolume = true,
  hideVolume = false,
  containerId = 'tradingview-widget-container',
  onTimeframeChange,
}: TradingViewWidgetProps) => {
  const container = useRef<HTMLDivElement>(null);
  const [widgetInitialized, setWidgetInitialized] = useState(false);

  // Format the symbol for TradingView and check if it has limited timeframes
  const { symbol: formattedSymbol, limitedTimeframes } = useMemo(() => formatTradingViewSymbol(symbol), [symbol]);
  
  // Handle interval for indices with limited timeframes (only D, W, M)
  const safeInterval = useMemo(() => {
    if (!limitedTimeframes) return interval;
    
    // Convert interval to uppercase for comparison
    const upperInterval = interval.toUpperCase();
    
    // If the interval is already one of the allowed ones, return it
    if (['D', 'W', 'M'].includes(upperInterval)) {
      return upperInterval;
    }
    
    // Default to 'D' (daily) for indices with limited timeframes
    return 'D';
  }, [interval, limitedTimeframes]);

  // Initialize widget
  useEffect(() => {
    const containerElement = container.current;
    if (!containerElement || widgetInitialized) return;

    // Clear container
    while (containerElement.firstChild) {
      containerElement.removeChild(containerElement.firstChild);
    }

    // Check if TradingView script is already loaded
    if (window.TradingView) {
      initializeWidget();
      return;
    }

    // Load TradingView script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.id = 'tradingview-widget-script';
    
    script.onload = () => {
      if (window.TradingView) {
        initializeWidget();
      }
    };

    script.onerror = () => {
      console.error('Failed to load TradingView widget script');
    };

    document.body.appendChild(script);

    return () => {
      // Clean up script if it's still in the document
      const existingScript = document.getElementById('tradingview-widget-script');
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }
    };
  }, [widgetInitialized]);

  // Handle symbol and interval changes
  useEffect(() => {
    if (!widgetInitialized) return;
    
    // If widget is already initialized, update it by reinitializing with new symbol/interval
    setWidgetInitialized(false);
    setTimeout(() => setWidgetInitialized(true), 100);
    
    // Notify parent component about the timeframe change if needed
    if (limitedTimeframes && safeInterval !== interval && onTimeframeChange) {
      onTimeframeChange(safeInterval);
    }
  }, [formattedSymbol, interval, safeInterval, limitedTimeframes, widgetInitialized]);

  const initializeWidget = () => {
    const containerElement = container.current;
    if (!containerElement) return;

    // Clear container
    while (containerElement.firstChild) {
      containerElement.removeChild(containerElement.firstChild);
    }

    // Create new container for the widget
    const widgetContainer = document.createElement('div');
    widgetContainer.id = containerId;
    containerElement.appendChild(widgetContainer);

    // Initialize the widget
    const widgetOptions: any = {
      autosize,
      symbol: formattedSymbol,
      interval: safeInterval,
      timezone: 'exchange',
      theme,
      style,
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: !limitedTimeframes, // Disable symbol change for indices with limited timeframes
      hide_side_toolbar: hideSideToolbar,
      hide_top_toolbar: hideTopToolbar,
      save_image: saveImage,
      hide_volume: hideVolume,
      container_id: containerId,
      ...(showVolume && { studies: ['Volume@tv-basicstudies'] }),
    };
    
    // Add a message for indices with limited timeframes
    if (limitedTimeframes) {
      widgetOptions.overrides = {
        'mainSeriesProperties.candleStyle.upColor': '#26a69a',
        'mainSeriesProperties.candleStyle.downColor': '#ef5350',
        'mainSeriesProperties.candleStyle.borderUpColor': '#26a69a',
        'mainSeriesProperties.candleStyle.borderDownColor': '#ef5350',
        'mainSeriesProperties.candleStyle.wickUpColor': '#26a69a',
        'mainSeriesProperties.candleStyle.wickDownColor': '#ef5350',
      };
    }
    
    new window.TradingView.widget(widgetOptions);

    setWidgetInitialized(true);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      const containerElement = container.current;
      if (containerElement) {
        while (containerElement.firstChild) {
          containerElement.removeChild(containerElement.firstChild);
        }
      }
    };
  }, []);

  return (
    <div
      id={containerId}
      ref={container}
      style={{
        width,
        height,
        minHeight: '400px',
        position: 'relative',
      }}
    >
      {limitedTimeframes && (
        <div className="absolute top-2 left-2 z-10 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
          Only D, W, M timeframes are supported for this symbol
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading chart...
        </div>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
