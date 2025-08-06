// List of major forex pairs and commodities
const MAJOR_FOREX_PAIRS = [
  'EUR/USD', 'USD/JPY', 'GBP/USD', 'AUD/USD', 'USD/CAD', 
  'USD/CHF', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY',
  // Major commodity pairs
  'XAU/USD', 'XAG/USD', 'XPT/USD', 'XPD/USD', 'OIL/USD',
  'NATURALGAS/USD', 'COPPER/USD', 'PLATINUM/USD', 'PALLADIUM/USD'
];

// List of crypto pairs with their TradingView symbols
const CRYPTO_PAIRS: Record<string, string> = {
  'BTC/USD': 'BINANCE:BTCUSDT',
  'ETH/USD': 'BINANCE:ETHUSDT',
  'XRP/USD': 'BINANCE:XRPUSDT',
  'SOL/USD': 'BINANCE:SOLUSDT',
  'ADA/USD': 'BINANCE:ADAUSDT',
  'DOT/USD': 'BINANCE:DOTUSDT',
  'DOGE/USD': 'BINANCE:DOGEUSDT',
  'AVAX/USD': 'BINANCE:AVAXUSDT',
  'LINK/USD': 'BINANCE:LINKUSDT',
  'MATIC/USD': 'BINANCE:MATICUSDT',
  'BNB/USD': 'BINANCE:BNBUSDT',
  'XLM/USD': 'BINANCE:XLMUSDT',
  'UNI/USD': 'BINANCE:UNIUSDT',
  'ATOM/USD': 'BINANCE:ATOMUSDT',
  'LTC/USD': 'BINANCE:LTCUSDT'
};

// List of stock indices
const STOCK_INDICES = [
  // Global Indices
  'S&P 500', 'DOW', 'NASDAQ', 'FTSE 100', 'DAX',
  'NIKKEI 225', 'HANG SENG', 'ASX 200', 'CAC 40', 
  
  // Indian Indices
  'SENSEX', 'NIFTY 50', 'NIFTY BANK', 'NIFTY NEXT 50',
  'NIFTY IT', 'NIFTY AUTO', 'NIFTY PHARMA', 'NIFTY FIN SERVICE',
  'NIFTY FMCG', 'NIFTY METAL', 'NIFTY REALTY', 'NIFTY PSU BANK',
  'NIFTY MEDIA', 'NIFTY PVT BANK', 'NIFTY CONSUMER DURABLES'
];

// Popular Indian Stocks (NIFTY 50 constituents and other large caps)
const INDIAN_STOCKS: Record<string, string> = {
  // NIFTY 50 Stocks
  'RELIANCE': 'NSE:RELIANCE',
  'TCS': 'NSE:TCS',
  'HDFC BANK': 'NSE:HDFCBANK',
  'ICICI BANK': 'NSE:ICICIBANK',
  'HUL': 'NSE:HINDUNILVR',
  'INFOSYS': 'NSE:INFY',
  'ITC': 'NSE:ITC',
  'BHARTI AIRTEL': 'NSE:BHARTIARTL',
  'SBI': 'NSE:SBIN',
  'LT': 'NSE:LT',
  'HCL TECH': 'NSE:HCLTECH',
  'BAJAJ FINANCE': 'NSE:BAJFINANCE',
  'ASIAN PAINTS': 'NSE:ASIANPAINT',
  'HDFC LIFE': 'NSE:HDFCLIFE',
  'KOTAK MAHINDRA': 'NSE:KOTAKBANK',
  
  // Other popular Indian stocks
  'TATA MOTORS': 'NSE:TATAMOTORS',
  'TATA STEEL': 'NSE:TATASTEEL',
  'WIPRO': 'NSE:WIPRO',
  'ADANI PORTS': 'NSE:ADANIPORTS',
  'NTPC': 'NSE:NTPC',
  'POWERGRID': 'NSE:POWERGRID',
  'ULTRATECH CEMENT': 'NSE:ULTRACEMCO',
  'TITAN': 'NSE:TITAN',
  'SUN PHARMA': 'NSE:SUNPHARMA',
  'NESTLE': 'NSE:NESTLEIND'
};

// Commodities with their specific TradingView symbols
const COMMODITY_SYMBOLS: Record<string, string> = {
  'XAU/USD': 'TVC:GOLD',
  'XAG/USD': 'TVC:SILVER',
  'OIL/USD': 'TVC:USOIL',
  'NATURALGAS/USD': 'NATGASUSD',
  'COPPER/USD': 'XCUUSD',
  'PLATINUM/USD': 'TVC:PLATINUM',
  'PALLADIUM/USD': 'TVC:PALLADIUM',
  'XPT/USD': 'TVC:PLATINUM',
  'XPD/USD': 'TVC:PALLADIUM'
};

// List of indices that only support D, W, M timeframes
const INDICES_WITH_EXTENDED_TIMEFRAMES = [
  'SENSEX',
  'NIFTY 50',
  'NIFTY BANK',
  'NIFTY NEXT 50'
];

/**
 * Formats a trading pair for use with TradingView
 * @param pair - The trading pair (e.g., "EUR/USD", "BTC/USD", "S&P 500")
 * @returns An object containing the formatted symbol and whether it has limited timeframes
 */
interface FormattedSymbol {
  symbol: string;
  limitedTimeframes: boolean;
}

export const formatTradingViewSymbol = (pair: string): FormattedSymbol => {
  // Remove any spaces and convert to uppercase
  const cleanPair = pair.replace(/\s+/g, '').toUpperCase();
  
  // If the pair already has a colon (e.g., "FX:EURUSD"), return as is
  if (cleanPair.includes(':')) {
    return { symbol: cleanPair, limitedTimeframes: false };
  }
  
  // Check if it's a crypto pair
  if (CRYPTO_PAIRS[pair]) {
    return { symbol: CRYPTO_PAIRS[pair], limitedTimeframes: false };
  }
  
  // Check if it's a commodity
  if (COMMODITY_SYMBOLS[pair]) {
    return { symbol: COMMODITY_SYMBOLS[pair], limitedTimeframes: false };
  }
  
  // Handle forex pairs
  if (MAJOR_FOREX_PAIRS.includes(pair)) {
    // For commodity forex pairs like XAU/USD, we've already handled them above
    if (!pair.startsWith('X') || !pair.includes('/USD')) {
      return { symbol: `FX:${cleanPair.replace('/', '')}`, limitedTimeframes: false };
    }
  }
  
  // Handle stock indices
  
  switch (pair) {
    case 'S&P 500': return { symbol: 'SPX', limitedTimeframes: false };
    case 'DOW': return { symbol: 'DOW', limitedTimeframes: false };
    case 'NASDAQ': return { symbol: 'IXIC', limitedTimeframes: false };
    case 'FTSE 100': return { symbol: 'FTSE:UKX', limitedTimeframes: false };
    case 'DAX': return { symbol: 'GER30', limitedTimeframes: false };
    case 'NIKKEI 225': return { symbol: 'JPN225', limitedTimeframes: false };
    case 'HANG SENG': return { symbol: 'HSI', limitedTimeframes: false };
    case 'ASX 200': return { symbol: 'AS51', limitedTimeframes: false };
    case 'CAC 40': return { symbol: 'CAC40', limitedTimeframes: false };
    case 'SENSEX': return { symbol: 'BSE:SENSEX', limitedTimeframes: false };
    case 'NIFTY 50': return { symbol: 'NSE:NIFTY50', limitedTimeframes: false };
    case 'NIFTY BANK': return { symbol: 'NSE:BANKNIFTY', limitedTimeframes: false };
    case 'NIFTY NEXT 50': return { symbol: 'NSE:JUNIORBEES', limitedTimeframes: false };
  }
  
  // Check if it's an Indian stock
  if (INDIAN_STOCKS[pair]) {
    return { symbol: INDIAN_STOCKS[pair], limitedTimeframes: false };
  }
  
  // Default: assume it's a forex pair and format accordingly
  if (cleanPair.includes('/')) {
    return { symbol: `FX:${cleanPair.replace('/', '')}`, limitedTimeframes: false };
  }
  
  // If no formatting needed, return as is
  return { symbol: cleanPair, limitedTimeframes: false };
};

/**
 * Gets all available trading pairs grouped by category
 */
export const getTradingPairs = () => ({
  forex: MAJOR_FOREX_PAIRS.filter(pair => !pair.startsWith('X') || !pair.endsWith('/USD')),
  crypto: Object.keys(CRYPTO_PAIRS),
  indices: STOCK_INDICES,
  indianStocks: Object.keys(INDIAN_STOCKS).sort(),
  commodities: Object.keys(COMMODITY_SYMBOLS)
});
