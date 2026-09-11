export interface MarketOverview {
  total_market_cap_usd: number;
  market_cap_change_24h_pct: number;
  total_volume_24h_usd: number;
  volume_change_24h_pct: number;
  btc_dominance_pct: number;
  fear_greed_score: number;
  fear_greed_label: string;
  active_cryptos: number;
  last_updated: string;
}

export interface CryptoAsset {
  rank: number;
  id: string;
  name: string;
  symbol: string;
  price_usd: number;
  change_24h_pct: number;
  change_7d_pct: number;
  market_cap_usd: number;
  volume_24h_usd: number;
  high_24h_usd: number;
  low_24h_usd: number;
  ath_usd: number;
  atl_usd: number;
  circulating_supply: number;
  category: string;
  trend_sparkline: number[];
}

export interface Candle {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  sma20?: number;
  sma50?: number;
  ema20?: number;
  ema50?: number;
  bb_upper?: number;
  bb_lower?: number;
}

export interface IndicatorValue {
  name: string;
  value: number;
  interpretation: string;
  category: string;
}

export interface TechnicalAnalysisResult {
  symbol: string;
  current_price: number;
  signal: 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL';
  signal_score: number;
  indicators: Record<string, IndicatorValue>;
  rationale_points: string[];
  summary_text: string;
}

export interface SentimentArticle {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  coin_symbol: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  confidence: number;
  summary: string;
  url: string;
}

export interface SentimentPoint {
  timestamp: string;
  sentiment_score: number;
  news_score: number;
  social_score: number;
  price_usd?: number;
}

export interface SentimentIntelligence {
  symbol: string;
  overall_sentiment: 'BULLISH' | 'NEUTRAL' | 'BEARISH';
  positive_pct: number;
  neutral_pct: number;
  negative_pct: number;
  sentiment_score: number;
  correlation_with_price: number;
  correlation_label: string;
  news_articles: SentimentArticle[];
  social_posts: SentimentArticle[];
  sentiment_trend: SentimentPoint[];
}

export interface ForecastPoint {
  timestamp: string;
  actual_price?: number;
  predicted_price?: number;
  lower_bound?: number;
  upper_bound?: number;
}

export interface ModelMetric {
  model_name: string;
  rmse: number;
  mae: number;
  r2_score: number;
  is_best: boolean;
}

export interface AIPrediction {
  symbol: string;
  horizon: string;
  selected_model: string;
  current_price: number;
  predicted_price: number;
  expected_change_pct: number;
  confidence_pct: number;
  lower_bound: number;
  upper_bound: number;
  forecast_points: ForecastPoint[];
  model_metrics: ModelMetric[];
  ai_insight_text: string;
}

export interface WhaleTransaction {
  id: string;
  timestamp: string;
  asset: string;
  amount_coins: number;
  amount_usd: number;
  from_address: string;
  to_address: string;
  transaction_type: 'ACCUMULATION' | 'TRANSFER' | 'EXCHANGE_INFLOW' | 'EXCHANGE_OUTFLOW';
}

export interface PortfolioAsset {
  id: string;
  asset_name: string;
  symbol: string;
  quantity: number;
  purchase_price_usd: number;
  purchase_date: string;
  current_price_usd: number;
  current_value_usd: number;
  profit_loss_usd: number;
  profit_loss_pct: number;
  allocation_pct: number;
}

export interface PortfolioSummary {
  total_value_usd: number;
  total_invested_usd: number;
  total_profit_loss_usd: number;
  total_profit_loss_pct: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  volatility_annualized: number;
  sharpe_ratio: number;
  max_drawdown_pct: number;
  holdings: PortfolioAsset[];
  performance_history: Array<{
    timestamp: string;
    portfolio_value: number;
    invested_capital: number;
  }>;
}

export interface PriceAlert {
  id: string;
  asset_symbol: string;
  condition: 'ABOVE' | 'BELOW';
  target_price_usd: number;
  active: boolean;
  triggered: boolean;
  created_at: string;
}

export interface CopilotMessage {
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
}

export interface MonteCarloPoint {
  day: number;
  p10: number;
  p50: number;
  p90: number;
}

export interface MonteCarloResult {
  iterations: number;
  days_horizon: number;
  initial_value_usd: number;
  expected_value_usd: number;
  var_95_usd: number;
  var_95_pct: number;
  percentiles_path: MonteCarloPoint[];
}

export interface CorrelationMatrix {
  symbols: string[];
  matrix: number[][];
}

export interface OrderBookItem {
  price: number;
  amount: number;
  total: number;
}

export interface OrderBookLiquidation {
  symbol: string;
  current_price: number;
  bids: OrderBookItem[];
  asks: OrderBookItem[];
  long_liquidations_24h_usd: number;
  short_liquidations_24h_usd: number;
  bid_ask_ratio: number;
  sentiment_bias: string;
}

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'JPY' | 'BTC';

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  token_type: string;
  user: AuthUser;
}

