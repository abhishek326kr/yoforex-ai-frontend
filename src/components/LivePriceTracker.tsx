import { useEffect } from "react";

const symbols = [
  { proName: "FX:EURUSD", title: "EUR/USD" },
  { proName: "FX:GBPUSD", title: "GBP/USD" },
  { proName: "FX:USDJPY", title: "USD/JPY" },
  { proName: "FX:AUDUSD", title: "AUD/USD" },
  { proName: "FX:USDCAD", title: "USD/CAD" },
  { proName: "OANDA:XAUUSD", title: "Gold" },
  { proName: "CRYPTO:BTCUSD", title: "Bitcoin" },
  { proName: "CRYPTO:ETHUSD", title: "Ethereum" },
];

const LivePriceTracker = () => {
  useEffect(() => {
    const container = document.getElementById("tradingview-widget");
    if (!container) return;
    container.innerHTML = ""; // Clean up old widget if any

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "compact",
      locale: "en",
      showSymbolLogo: true,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      fontSize: "11px",
      noTimeScale: true,
      valuesTracking: "1",
      enablePublishing: false,
      hideTopToolbar: true,
      hideSideToolbar: true,
      hideVolume: true,
      hideMarketStatus: true,
      hideMarketPanel: true,
      saveImage: false
    });

    container.appendChild(script);
  }, []);

  return (
    <div className="w-full h-full flex items-center">
      <div
        id="tradingview-widget"
        className="w-full h-full"
        style={{
          minHeight: '40px',
          maxHeight: '48px',
          overflow: 'hidden',
          margin: '0 -8px' // Compensate for widget's default padding
        }}
      />
    </div>
  );
};

export default LivePriceTracker;