import axios from 'axios';

// Supported timeframes in the format expected by the API
export type Timeframe = 'M1' | 'M5' | 'M15' | 'M30' | 'H1' | 'H4' | 'H8' | 'D1' | 'W1' | 'M';

// Supported trading strategies
export type TradingStrategy = 'breakout' | 'ict' | 'advanced_smc' | 'smc' | 'fibonacci' | 'trend_following' | 'momentum' | 'volatility_breakout' | 'carry_trade' | 'options_straddle';

// Candle data structure
export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Analysis response structure
interface AnalysisResponse {
  pair: string;
  granularity: string;
  candles: CandleData[];
  analysis: {
    signal: 'BUY' | 'SELL' | 'HOLD';
    confidence: number;
    entry: number;
    stop_loss: number;
    take_profit: number;
    risk_reward_ratio: string;
    timeframe: string;
    technical_analysis: {
      Support_Level: number;
      Resistance_Level: number;
      Volume_Confirmation: string;
      Breakout_Direction: string;
    };
    recommendation: string;
  };
}

interface AnalysisParams {
  pair: string;          // e.g., 'EUR_USD', 'XAU_USD'
  timeframe: Timeframe;   // e.g., 'M15', 'H1', 'H4'
  strategy: TradingStrategy;
  count?: number;         // Default: 100
}

/**
 * Fetches trading analysis for the given parameters
 * @param params Analysis parameters
 * @returns Promise with analysis data
 */
// Helper function to convert UI strategy name to API-expected format
const formatStrategyForApi = (strategy: string): string => {
  switch (strategy) {
    case 'Breakout Strategy':
      return 'breakout';
    case 'ICT Concept':
      return 'ict';
    case 'Advanced SMC':
      return 'advanced_smc';
    case 'SMC Strategy':
      return 'smc';
    case 'Fibonacci Retracement':
      return 'fibonacci';
    case 'Trend Following':
      return 'trend_following';
    case 'Momentum':
      return 'momentum';
    case 'Volatility Breakout':
      return 'volatility_breakout';
    case 'Carry Trade':
      return 'carry_trade';
    case 'Options Straddle':
      return 'options_straddle';
    default:
      return 'breakout';
  }
};

export const fetchTradingAnalysis = async (params: AnalysisParams): Promise<AnalysisResponse> => {
  const { pair, timeframe, strategy, count = 100 } = params;
  
  try {
    const baseUrl = 'https://backend.axiontrust.com';
    
    // Format parameters for API
    const formattedPair = formatPairForApi(pair);
    const formattedStrategy = formatStrategyForApi(strategy);
    const formattedTimeframe = timeframe.replace(/(\d+)([mhdwM])/i, (_, num, unit) => 
      unit.toLowerCase() === 'm' ? `M${num}` : 
      unit.toLowerCase() === 'h' ? `H${num}` : 
      unit.toLowerCase() === 'd' ? 'D1' : 
      unit.toLowerCase() === 'w' ? 'W1' : 'H1'
    );
    
    const url = `${baseUrl}/analysis/strategy?strategy=${formattedStrategy}&pair=${formattedPair}&granularity=${formattedTimeframe}&count=${count}`;
    
    console.log('Making API request to:', url);
    const response = await axios.post<AnalysisResponse>(url);
    
    console.log('Analysis response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching trading analysis:', error);
    throw error;
  }
};

/**
 * Converts a standard timeframe string to the API's expected format
 * @param timeframe Standard timeframe string (e.g., '1m', '15m', '1h', '4h')
 * @returns Formatted timeframe string (e.g., 'M1', 'M15', 'H1', 'H4')
 */
export const formatTimeframe = (timeframe: string): Timeframe => {
  const match = timeframe.match(/^(\d+)([mhdwM])/);
  if (!match) return 'H1'; // Default to 1 hour if format is unrecognized
  
  const [value, unit] = match;
  
  switch (unit) {
    case 'm': // minutes
      return `M${value}` as Timeframe;
    case 'h': // hours
      return `H${value}` as Timeframe;
    case 'd': // days
      return 'D1' as Timeframe;
    case 'w': // weeks
      return 'W1' as Timeframe;
    case 'M': // months
      return 'M' as Timeframe;
    default:
      return 'H1' as Timeframe;
  }
};

/**
 * Formats a currency pair for the API (e.g., 'EUR/USD' -> 'EUR_USD')
 * @param pair Currency pair in standard format
 * @returns Formatted pair for the API
 */
export const formatPairForApi = (pair: string): string => {
  return pair.replace('/', '_').toUpperCase();
};


