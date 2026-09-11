import axios from 'axios';
import type {
  MarketOverview,
  CryptoAsset,
  Candle,
  TechnicalAnalysisResult,
  SentimentIntelligence,
  AIPrediction,
  WhaleTransaction,
  PortfolioSummary,
  PriceAlert,
  CopilotMessage,
  MonteCarloResult,
  CorrelationMatrix,
  OrderBookLiquidation
} from '../types/crypto';

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return '/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});


export const cryptoApi = {
  getMarketOverview: async (): Promise<MarketOverview> => {
    const res = await api.get<MarketOverview>('/market/overview');
    return res.data;
  },

  getTopCryptos: async (): Promise<CryptoAsset[]> => {
    const res = await api.get<CryptoAsset[]>('/market/top');
    return res.data;
  },

  getCandles: async (symbol: string, timeframe: string = '1D'): Promise<Candle[]> => {
    const res = await api.get<Candle[]>(`/market/candles/${symbol}?timeframe=${timeframe}`);
    return res.data;
  },

  getTechnicalAnalysis: async (symbol: string): Promise<TechnicalAnalysisResult> => {
    const res = await api.get<TechnicalAnalysisResult>(`/technical/${symbol}`);
    return res.data;
  },

  getSentimentIntelligence: async (symbol: string): Promise<SentimentIntelligence> => {
    const res = await api.get<SentimentIntelligence>(`/sentiment/${symbol}`);
    return res.data;
  },

  getPrediction: async (symbol: string, horizon: string = '7D', model: string = 'Random Forest'): Promise<AIPrediction> => {
    const res = await api.get<AIPrediction>(`/prediction/${symbol}?horizon=${horizon}&model=${encodeURIComponent(model)}`);
    return res.data;
  },

  getWhales: async (asset: string = 'ALL'): Promise<WhaleTransaction[]> => {
    const res = await api.get<WhaleTransaction[]>(`/whales?asset=${asset}`);
    return res.data;
  },

  getPortfolio: async (): Promise<PortfolioSummary> => {
    const res = await api.get<PortfolioSummary>('/portfolio');
    return res.data;
  },

  addHolding: async (symbol: string, quantity: number, purchasePrice: number): Promise<PortfolioSummary> => {
    const res = await api.post<PortfolioSummary>('/portfolio/holdings', {
      symbol,
      quantity,
      purchase_price: purchasePrice
    });
    return res.data;
  },

  deleteHolding: async (holdingId: string): Promise<PortfolioSummary> => {
    const res = await api.delete<PortfolioSummary>(`/portfolio/holdings/${holdingId}`);
    return res.data;
  },

  getAlerts: async (): Promise<PriceAlert[]> => {
    const res = await api.get<PriceAlert[]>('/alerts');
    return res.data;
  },

  createAlert: async (asset_symbol: string, condition: string, target_price: number): Promise<PriceAlert[]> => {
    const res = await api.post<PriceAlert[]>('/alerts', {
      asset_symbol,
      condition,
      target_price
    });
    return res.data;
  },

  toggleAlert: async (alertId: string): Promise<PriceAlert[]> => {
    const res = await api.put<PriceAlert[]>(`/alerts/${alertId}/toggle`);
    return res.data;
  },

  deleteAlert: async (alertId: string): Promise<PriceAlert[]> => {
    const res = await api.delete<PriceAlert[]>(`/alerts/${alertId}`);
    return res.data;
  },

  chatWithCopilot: async (prompt: string, symbol: string = 'BTC'): Promise<CopilotMessage> => {
    const res = await api.post<CopilotMessage>('/copilot/chat', { prompt, symbol });
    return res.data;
  },

  getMonteCarlo: async (iterations: number = 1000, days: number = 30): Promise<MonteCarloResult> => {
    const res = await api.get<MonteCarloResult>(`/simulation/monte-carlo?iterations=${iterations}&days=${days}`);
    return res.data;
  },

  getCorrelationMatrix: async (): Promise<CorrelationMatrix> => {
    const res = await api.get<CorrelationMatrix>('/correlation');
    return res.data;
  },

  getOrderBook: async (symbol: string): Promise<OrderBookLiquidation> => {
    const res = await api.get<OrderBookLiquidation>(`/orderbook/${symbol}`);
    return res.data;
  }
};
