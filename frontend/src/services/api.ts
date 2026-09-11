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

import {
  fallbackMarketOverview,
  fallbackTopCryptos,
  getFallbackCandles,
  getFallbackTechnical,
  getFallbackSentiment,
  getFallbackPrediction,
  fallbackWhales,
  getDynamicPortfolioSummary,
  addHoldingToStore,
  deleteHoldingFromStore,
  getDynamicAlerts,
  createAlertInStore,
  toggleAlertInStore,
  deleteAlertFromStore,
  fallbackCorrelation,
  getFallbackOrderBook,
  getFallbackMonteCarlo,
  getFallbackCopilot
} from './mockData';

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return '/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const cryptoApi = {
  getMarketOverview: async (): Promise<MarketOverview> => {
    try {
      const res = await api.get<MarketOverview>('/market/overview');
      return res.data;
    } catch (e) {
      console.warn("Using fallback market overview due to API error:", e);
      return fallbackMarketOverview;
    }
  },

  getTopCryptos: async (): Promise<CryptoAsset[]> => {
    try {
      const res = await api.get<CryptoAsset[]>('/market/top');
      return res.data;
    } catch (e) {
      console.warn("Using fallback top cryptos due to API error:", e);
      return fallbackTopCryptos;
    }
  },

  getCandles: async (symbol: string, timeframe: string = '1D'): Promise<Candle[]> => {
    try {
      const res = await api.get<Candle[]>(`/market/candles/${symbol}?timeframe=${timeframe}`);
      return res.data;
    } catch (e) {
      console.warn(`Using fallback candles for ${symbol} (${timeframe}) due to API error:`, e);
      return getFallbackCandles(symbol, timeframe);
    }
  },

  getTechnicalAnalysis: async (symbol: string): Promise<TechnicalAnalysisResult> => {
    try {
      const res = await api.get<TechnicalAnalysisResult>(`/technical/${symbol}`);
      return res.data;
    } catch (e) {
      console.warn(`Using fallback technical analysis for ${symbol} due to API error:`, e);
      return getFallbackTechnical(symbol);
    }
  },

  getSentimentIntelligence: async (symbol: string): Promise<SentimentIntelligence> => {
    try {
      const res = await api.get<SentimentIntelligence>(`/sentiment/${symbol}`);
      return res.data;
    } catch (e) {
      console.warn(`Using fallback sentiment intelligence for ${symbol} due to API error:`, e);
      return getFallbackSentiment(symbol);
    }
  },

  getPrediction: async (symbol: string, horizon: string = '7D', model: string = 'Random Forest'): Promise<AIPrediction> => {
    try {
      const res = await api.get<AIPrediction>(`/prediction/${symbol}?horizon=${horizon}&model=${encodeURIComponent(model)}`);
      return res.data;
    } catch (e) {
      console.warn(`Using fallback ML prediction for ${symbol} due to API error:`, e);
      return getFallbackPrediction(symbol, horizon, model);
    }
  },

  getWhales: async (asset: string = 'ALL'): Promise<WhaleTransaction[]> => {
    try {
      const res = await api.get<WhaleTransaction[]>(`/whales?asset=${asset}`);
      return res.data;
    } catch (e) {
      console.warn("Using fallback whale activity due to API error:", e);
      return fallbackWhales;
    }
  },

  getPortfolio: async (): Promise<PortfolioSummary> => {
    try {
      const res = await api.get<PortfolioSummary>('/portfolio');
      return res.data;
    } catch (e) {
      console.warn("Using fallback portfolio due to API error:", e);
      return getDynamicPortfolioSummary();
    }
  },

  addHolding: async (symbol: string, quantity: number, purchasePrice: number): Promise<PortfolioSummary> => {
    try {
      const res = await api.post<PortfolioSummary>('/portfolio/holdings', {
        symbol,
        quantity,
        purchase_price: purchasePrice
      });
      return res.data;
    } catch (e) {
      console.warn("Using reactive store add holding fallback");
      return addHoldingToStore(symbol, quantity, purchasePrice);
    }
  },

  deleteHolding: async (holdingId: string): Promise<PortfolioSummary> => {
    try {
      const res = await api.delete<PortfolioSummary>(`/portfolio/holdings/${holdingId}`);
      return res.data;
    } catch (e) {
      console.warn("Using reactive store delete holding fallback");
      return deleteHoldingFromStore(holdingId);
    }
  },

  getAlerts: async (): Promise<PriceAlert[]> => {
    try {
      const res = await api.get<PriceAlert[]>('/alerts');
      return res.data;
    } catch (e) {
      console.warn("Using fallback alerts due to API error:", e);
      return getDynamicAlerts();
    }
  },

  createAlert: async (asset_symbol: string, condition: string, target_price: number): Promise<PriceAlert[]> => {
    try {
      const res = await api.post<PriceAlert[]>('/alerts', {
        asset_symbol,
        condition,
        target_price
      });
      return res.data;
    } catch (e) {
      console.warn("Using reactive store create alert fallback");
      return createAlertInStore(asset_symbol, condition, target_price);
    }
  },

  toggleAlert: async (alertId: string): Promise<PriceAlert[]> => {
    try {
      const res = await api.put<PriceAlert[]>(`/alerts/${alertId}/toggle`);
      return res.data;
    } catch (e) {
      console.warn("Using reactive store toggle alert fallback");
      return toggleAlertInStore(alertId);
    }
  },

  deleteAlert: async (alertId: string): Promise<PriceAlert[]> => {
    try {
      const res = await api.delete<PriceAlert[]>(`/alerts/${alertId}`);
      return res.data;
    } catch (e) {
      console.warn("Using reactive store delete alert fallback");
      return deleteAlertFromStore(alertId);
    }
  },

  chatWithCopilot: async (prompt: string, symbol: string = 'BTC'): Promise<CopilotMessage> => {
    try {
      const res = await api.post<CopilotMessage>('/copilot/chat', { prompt, symbol });
      return res.data;
    } catch (e) {
      console.warn("Using fallback copilot chat due to API error:", e);
      return getFallbackCopilot(prompt, symbol);
    }
  },

  getMonteCarlo: async (iterations: number = 1000, days: number = 30): Promise<MonteCarloResult> => {
    try {
      const res = await api.get<MonteCarloResult>(`/simulation/monte-carlo?iterations=${iterations}&days=${days}`);
      return res.data;
    } catch (e) {
      console.warn("Using fallback Monte Carlo simulation");
      return getFallbackMonteCarlo(iterations, days);
    }
  },

  getCorrelationMatrix: async (): Promise<CorrelationMatrix> => {
    try {
      const res = await api.get<CorrelationMatrix>('/correlation');
      return res.data;
    } catch (e) {
      console.warn("Using fallback correlation matrix due to API error:", e);
      return fallbackCorrelation;
    }
  },

  getOrderBook: async (symbol: string): Promise<OrderBookLiquidation> => {
    try {
      const res = await api.get<OrderBookLiquidation>(`/orderbook/${symbol}`);
      return res.data;
    } catch (e) {
      console.warn(`Using fallback orderbook for ${symbol} due to API error:`, e);
      return getFallbackOrderBook(symbol);
    }
  }
};
