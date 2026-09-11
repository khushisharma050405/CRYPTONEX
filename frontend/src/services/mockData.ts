import type {
  MarketOverview,
  CryptoAsset,
  Candle,
  TechnicalAnalysisResult,
  SentimentIntelligence,
  AIPrediction,
  WhaleTransaction,
  PortfolioSummary,
  PortfolioAsset,
  PriceAlert,
  CopilotMessage,
  MonteCarloResult,
  CorrelationMatrix,
  OrderBookLiquidation
} from '../types/crypto';

export const fallbackMarketOverview: MarketOverview = {
  total_market_cap_usd: 2684900000000,
  market_cap_change_24h_pct: 3.42,
  total_volume_24h_usd: 98500000000,
  volume_change_24h_pct: 8.15,
  btc_dominance_pct: 54.8,
  fear_greed_score: 72,
  fear_greed_label: 'Greed',
  active_cryptos: 11420,
  last_updated: new Date().toISOString()
};

export const fallbackTopCryptos: CryptoAsset[] = [
  {
    rank: 1,
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price_usd: 68450.00,
    change_24h_pct: 4.25,
    change_7d_pct: 8.12,
    market_cap_usd: 1348500000000,
    volume_24h_usd: 38500000000,
    high_24h_usd: 69200.00,
    low_24h_usd: 65400.00,
    ath_usd: 73750.00,
    atl_usd: 67.81,
    circulating_supply: 19750000,
    category: 'Layer 1',
    trend_sparkline: [64200, 64800, 65100, 66000, 65800, 67400, 68450]
  },
  {
    rank: 2,
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price_usd: 3540.20,
    change_24h_pct: 2.85,
    change_7d_pct: 5.40,
    market_cap_usd: 425800000000,
    volume_24h_usd: 18400000000,
    high_24h_usd: 3610.00,
    low_24h_usd: 3420.00,
    ath_usd: 4891.70,
    atl_usd: 0.42,
    circulating_supply: 120200000,
    category: 'Layer 1',
    trend_sparkline: [3350, 3380, 3410, 3490, 3450, 3510, 3540]
  },
  {
    rank: 3,
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price_usd: 162.80,
    change_24h_pct: 6.90,
    change_7d_pct: 14.50,
    market_cap_usd: 76400000000,
    volume_24h_usd: 6200000000,
    high_24h_usd: 168.00,
    low_24h_usd: 151.20,
    ath_usd: 260.06,
    atl_usd: 0.50,
    circulating_supply: 468000000,
    category: 'Layer 1',
    trend_sparkline: [142, 145, 148, 153, 156, 160, 162.8]
  },
  {
    rank: 4,
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    price_usd: 585.40,
    change_24h_pct: 1.75,
    change_7d_pct: 3.20,
    market_cap_usd: 86200000000,
    volume_24h_usd: 1450000000,
    high_24h_usd: 594.00,
    low_24h_usd: 574.00,
    ath_usd: 720.67,
    atl_usd: 0.096,
    circulating_supply: 147300000,
    category: 'Layer 1',
    trend_sparkline: [565, 568, 572, 580, 578, 582, 585.4]
  },
  {
    rank: 5,
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    price_usd: 0.582,
    change_24h_pct: 3.10,
    change_7d_pct: 4.80,
    market_cap_usd: 32800000000,
    volume_24h_usd: 1850000000,
    high_24h_usd: 0.598,
    low_24h_usd: 0.561,
    ath_usd: 3.84,
    atl_usd: 0.0028,
    circulating_supply: 56300000000,
    category: 'Payment',
    trend_sparkline: [0.55, 0.56, 0.565, 0.572, 0.575, 0.58, 0.582]
  },
  {
    rank: 6,
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price_usd: 0.385,
    change_24h_pct: 2.15,
    change_7d_pct: 6.30,
    market_cap_usd: 13800000000,
    volume_24h_usd: 480000000,
    high_24h_usd: 0.395,
    low_24h_usd: 0.372,
    ath_usd: 3.10,
    atl_usd: 0.019,
    circulating_supply: 35800000000,
    category: 'Layer 1',
    trend_sparkline: [0.36, 0.365, 0.37, 0.375, 0.38, 0.382, 0.385]
  },
  {
    rank: 7,
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price_usd: 0.118,
    change_24h_pct: 5.40,
    change_7d_pct: 11.20,
    market_cap_usd: 17200000000,
    volume_24h_usd: 950000000,
    high_24h_usd: 0.122,
    low_24h_usd: 0.110,
    ath_usd: 0.737,
    atl_usd: 0.000085,
    circulating_supply: 145800000000,
    category: 'Meme',
    trend_sparkline: [0.104, 0.108, 0.110, 0.114, 0.112, 0.116, 0.118]
  },
  {
    rank: 8,
    id: 'avalanche-2',
    name: 'Avalanche',
    symbol: 'AVAX',
    price_usd: 28.40,
    change_24h_pct: 4.80,
    change_7d_pct: 9.60,
    market_cap_usd: 11400000000,
    volume_24h_usd: 420000000,
    high_24h_usd: 29.10,
    low_24h_usd: 26.80,
    ath_usd: 146.22,
    atl_usd: 2.79,
    circulating_supply: 401000000,
    category: 'Layer 1',
    trend_sparkline: [25.8, 26.2, 26.9, 27.4, 27.8, 28.1, 28.4]
  },
  {
    rank: 9,
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    price_usd: 5.15,
    change_24h_pct: 1.95,
    change_7d_pct: 4.10,
    market_cap_usd: 7300000000,
    volume_24h_usd: 210000000,
    high_24h_usd: 5.25,
    low_24h_usd: 4.98,
    ath_usd: 55.00,
    atl_usd: 2.69,
    circulating_supply: 1410000000,
    category: 'Layer 1',
    trend_sparkline: [4.9, 4.95, 5.0, 5.05, 5.08, 5.12, 5.15]
  },
  {
    rank: 10,
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    price_usd: 13.85,
    change_24h_pct: 3.60,
    change_7d_pct: 7.90,
    market_cap_usd: 8400000000,
    volume_24h_usd: 310000000,
    high_24h_usd: 14.20,
    low_24h_usd: 13.10,
    ath_usd: 52.88,
    atl_usd: 0.125,
    circulating_supply: 608000000,
    category: 'DeFi',
    trend_sparkline: [12.7, 13.0, 13.2, 13.5, 13.4, 13.7, 13.85]
  }
];

export const getFallbackCandles = (symbol: string, timeframe: string = '1D'): Candle[] => {
  const asset = fallbackTopCryptos.find((a) => a.symbol === symbol.toUpperCase());
  const basePrice = asset ? asset.price_usd : (symbol.toUpperCase() === 'BTC' ? 68450 : 3540);
  
  let pointsCount = 30;
  let intervalMs = 24 * 60 * 60 * 1000;
  
  switch (timeframe.toUpperCase()) {
    case '1H':
      pointsCount = 24;
      intervalMs = 60 * 60 * 1000;
      break;
    case '1D':
      pointsCount = 30;
      intervalMs = 24 * 60 * 60 * 1000;
      break;
    case '1W':
      pointsCount = 28;
      intervalMs = 6 * 60 * 60 * 1000;
      break;
    case '1M':
      pointsCount = 30;
      intervalMs = 24 * 60 * 60 * 1000;
      break;
    case '3M':
      pointsCount = 45;
      intervalMs = 2 * 24 * 60 * 60 * 1000;
      break;
    case '1Y':
    case 'ALL':
      pointsCount = 52;
      intervalMs = 7 * 24 * 60 * 60 * 1000;
      break;
    default:
      pointsCount = 30;
      intervalMs = 24 * 60 * 60 * 1000;
  }

  const result: Candle[] = [];
  const now = new Date();
  
  for (let i = pointsCount; i >= 0; i--) {
    const d = new Date(now.getTime() - i * intervalMs);
    const dateStr = timeframe === '1H'
      ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : d.toISOString().slice(5, 10);
      
    const sinFactor = Math.sin((pointsCount - i) * 0.3);
    const variance = (sinFactor * 0.04 + ((i % 5) * 0.005) - 0.01) * basePrice;
    const close = Math.round((basePrice + variance) * 100) / 100;
    const open = Math.round((close + (Math.sin(i) * 0.015) * basePrice) * 100) / 100;
    const high = Math.max(open, close) + Math.round(0.008 * basePrice * 100) / 100;
    const low = Math.min(open, close) - Math.round(0.008 * basePrice * 100) / 100;

    result.push({
      timestamp: dateStr,
      open,
      high,
      low,
      close,
      volume: Math.round(basePrice * 80000 + (Math.abs(sinFactor) * 5000000)),
      sma20: Math.round((close * 0.982) * 100) / 100,
      sma50: Math.round((close * 0.954) * 100) / 100,
      ema20: Math.round((close * 0.988) * 100) / 100,
      ema50: Math.round((close * 0.961) * 100) / 100,
      bb_upper: Math.round((close * 1.045) * 100) / 100,
      bb_lower: Math.round((close * 0.925) * 100) / 100
    });
  }
  return result;
};

export const getFallbackTechnical = (symbol: string): TechnicalAnalysisResult => {
  const asset = fallbackTopCryptos.find((a) => a.symbol === symbol.toUpperCase());
  const price = asset ? asset.price_usd : 68450;
  return {
    symbol: symbol.toUpperCase(),
    current_price: price,
    signal: 'BUY',
    signal_score: 0.68,
    indicators: {
      'RSI_14': { name: 'RSI (14)', value: 62.4, interpretation: 'Bullish Momentum', category: 'Oscillator' },
      'MACD_Line': { name: 'MACD Line', value: price * 0.006, interpretation: 'Positive Crossover', category: 'Trend' },
      'SMA_50': { name: 'SMA 50', value: price * 0.94, interpretation: 'Price Above SMA 50', category: 'Moving Average' },
      'SMA_200': { name: 'SMA 200', value: price * 0.86, interpretation: 'Golden Cross Active', category: 'Moving Average' },
      'Stoch_K': { name: 'Stochastic %K', value: 74.2, interpretation: 'Neutral-High', category: 'Oscillator' },
      'ADX': { name: 'ADX (14)', value: 28.5, interpretation: 'Strong Trend Established', category: 'Trend Strength' }
    },
    rationale_points: [
      `RSI (14) at 62.4 confirms sustained buyers strength without reaching overbought levels (>70).`,
      `MACD histogram exhibits positive divergence above zero line.`,
      `Price maintains technical structure above 20-day and 50-day exponential moving averages.`
    ],
    summary_text: `${symbol.toUpperCase()} exhibits strong bullish technical confluence across multi-timeframe indicators.`
  };
};

export const getFallbackSentiment = (symbol: string): SentimentIntelligence => ({
  symbol: symbol.toUpperCase(),
  overall_sentiment: 'BULLISH',
  positive_pct: 68.5,
  neutral_pct: 22.0,
  negative_pct: 9.5,
  sentiment_score: 0.59,
  correlation_with_price: 0.82,
  correlation_label: 'Strong Positive Correlation',
  news_articles: [
    {
      id: 'news-1',
      title: `${symbol.toUpperCase()} Institutional Inflows Surge as ETFs Record Record Net Buying`,
      source: 'Bloomberg Crypto',
      timestamp: '15 mins ago',
      coin_symbol: symbol.toUpperCase(),
      sentiment: 'POSITIVE',
      confidence: 0.94,
      summary: 'Institutional wallet accumulation hit multi-month highs amidst macroeconomic easing.',
      url: '#'
    },
    {
      id: 'news-2',
      title: `On-Chain Analytics Reveal High Exchange Outflows for ${symbol.toUpperCase()}`,
      source: 'CoinDesk',
      timestamp: '1 hour ago',
      coin_symbol: symbol.toUpperCase(),
      sentiment: 'POSITIVE',
      confidence: 0.89,
      summary: 'Whales moved significant token reserves to cold storage wallets.',
      url: '#'
    }
  ],
  social_posts: [
    {
      id: 'soc-1',
      title: `FinBERT NLP sentiment rating on ${symbol.toUpperCase()} mentions jumped to +0.65`,
      source: 'X Intelligence Scraper',
      timestamp: '5 mins ago',
      coin_symbol: symbol.toUpperCase(),
      sentiment: 'POSITIVE',
      confidence: 0.91,
      summary: 'Community discussion sentiment points towards high upside conviction.',
      url: '#'
    }
  ],
  sentiment_trend: [
    { timestamp: '08:00', sentiment_score: 0.42, news_score: 0.45, social_score: 0.39, price_usd: 67200 },
    { timestamp: '12:00', sentiment_score: 0.51, news_score: 0.53, social_score: 0.48, price_usd: 67800 },
    { timestamp: '16:00', sentiment_score: 0.59, news_score: 0.62, social_score: 0.56, price_usd: 68450 }
  ]
});

export const getFallbackPrediction = (symbol: string, horizon: string, model: string): AIPrediction => {
  const asset = fallbackTopCryptos.find((a) => a.symbol === symbol.toUpperCase());
  const current = asset ? asset.price_usd : 68450;
  const target = Math.round(current * 1.074 * 100) / 100;
  return {
    symbol: symbol.toUpperCase(),
    horizon,
    selected_model: model,
    current_price: current,
    predicted_price: target,
    expected_change_pct: 7.4,
    confidence_pct: 88.5,
    lower_bound: Math.round(current * 0.98 * 100) / 100,
    upper_bound: Math.round(current * 1.15 * 100) / 100,
    forecast_points: [
      { timestamp: 'Historical', actual_price: current * 0.94 },
      { timestamp: 'Today', actual_price: current, predicted_price: current },
      { timestamp: 'Forecast Target', predicted_price: target, lower_bound: current * 0.98, upper_bound: current * 1.15 }
    ],
    model_metrics: [
      { model_name: 'Random Forest', rmse: 142.5, mae: 108.2, r2_score: 0.912, is_best: true },
      { model_name: 'XGBoost', rmse: 156.8, mae: 119.4, r2_score: 0.895, is_best: false },
      { model_name: 'LSTM / Neural Net', rmse: 172.1, mae: 135.0, r2_score: 0.868, is_best: false }
    ],
    ai_insight_text: `AI MARKET INSIGHT FOR ${symbol.toUpperCase()}: The ${model} model forecasts an upward movement of +7.40% over the next ${horizon} horizon to approximately $${target.toLocaleString()}. Model validation yields an R² score of 0.912.`
  };
};

export const fallbackWhales: WhaleTransaction[] = [
  {
    id: 'w-101',
    timestamp: '12 mins ago',
    asset: 'BTC',
    amount_coins: 1450,
    amount_usd: 99252500,
    from_address: '1P5ZEDW...3qZ7',
    to_address: 'Coinbase Custody',
    transaction_type: 'ACCUMULATION'
  },
  {
    id: 'w-102',
    timestamp: '34 mins ago',
    asset: 'ETH',
    amount_coins: 24500,
    amount_usd: 86734900,
    from_address: 'Binance Cold Wallet',
    to_address: '0x742d...44e',
    transaction_type: 'EXCHANGE_OUTFLOW'
  },
  {
    id: 'w-103',
    timestamp: '1 hour ago',
    asset: 'SOL',
    amount_coins: 185000,
    amount_usd: 30118000,
    from_address: 'Unknown Whale',
    to_address: 'Kraken Vault',
    transaction_type: 'ACCUMULATION'
  }
];

// --- DYNAMIC PORTFOLIO STORE ---
let mutableHoldings: PortfolioAsset[] = [
  {
    id: 'h-1',
    asset_name: 'Bitcoin',
    symbol: 'BTC',
    quantity: 1.25,
    purchase_price_usd: 54000,
    purchase_date: '2024-01-15',
    current_price_usd: 68450,
    current_value_usd: 85562.50,
    profit_loss_usd: 18062.50,
    profit_loss_pct: 26.76,
    allocation_pct: 68.5
  },
  {
    id: 'h-2',
    asset_name: 'Ethereum',
    symbol: 'ETH',
    quantity: 8.5,
    purchase_price_usd: 2800,
    purchase_date: '2024-02-10',
    current_price_usd: 3540.20,
    current_value_usd: 30091.70,
    profit_loss_usd: 6291.70,
    profit_loss_pct: 26.43,
    allocation_pct: 24.1
  }
];

export const getDynamicPortfolioSummary = (): PortfolioSummary => {
  const total_value_usd = mutableHoldings.reduce((sum, h) => sum + h.current_value_usd, 0);
  const total_invested_usd = mutableHoldings.reduce((sum, h) => sum + (h.quantity * h.purchase_price_usd), 0);
  const total_profit_loss_usd = total_value_usd - total_invested_usd;
  const total_profit_loss_pct = total_invested_usd > 0 ? (total_profit_loss_usd / total_invested_usd) * 100 : 0;

  // Re-calculate allocation percentages
  mutableHoldings.forEach((h) => {
    h.allocation_pct = total_value_usd > 0 ? Math.round((h.current_value_usd / total_value_usd) * 1000) / 10 : 0;
  });

  return {
    total_value_usd,
    total_invested_usd,
    total_profit_loss_usd,
    total_profit_loss_pct,
    risk_level: mutableHoldings.length > 3 ? 'LOW' : 'MEDIUM',
    volatility_annualized: 38.5,
    sharpe_ratio: 2.15,
    max_drawdown_pct: 12.4,
    holdings: [...mutableHoldings],
    performance_history: [
      { timestamp: 'Jan', portfolio_value: total_invested_usd, invested_capital: total_invested_usd },
      { timestamp: 'Feb', portfolio_value: total_invested_usd * 1.05, invested_capital: total_invested_usd },
      { timestamp: 'Mar', portfolio_value: total_invested_usd * 1.18, invested_capital: total_invested_usd },
      { timestamp: 'Today', portfolio_value: total_value_usd, invested_capital: total_invested_usd }
    ]
  };
};

export const addHoldingToStore = (symbol: string, quantity: number, purchasePrice: number): PortfolioSummary => {
  const sym = symbol.toUpperCase();
  const asset = fallbackTopCryptos.find((a) => a.symbol === sym);
  const currentPrice = asset ? asset.price_usd : purchasePrice;
  const currentVal = quantity * currentPrice;
  const invested = quantity * purchasePrice;
  const pnlUsd = currentVal - invested;
  const pnlPct = invested > 0 ? (pnlUsd / invested) * 100 : 0;

  const newHolding: PortfolioAsset = {
    id: `h-${Date.now()}`,
    asset_name: asset ? asset.name : sym,
    symbol: sym,
    quantity,
    purchase_price_usd: purchasePrice,
    purchase_date: new Date().toISOString().slice(0, 10),
    current_price_usd: currentPrice,
    current_value_usd: currentVal,
    profit_loss_usd: pnlUsd,
    profit_loss_pct: Math.round(pnlPct * 100) / 100,
    allocation_pct: 0
  };

  mutableHoldings.push(newHolding);
  return getDynamicPortfolioSummary();
};

export const deleteHoldingFromStore = (holdingId: string): PortfolioSummary => {
  mutableHoldings = mutableHoldings.filter((h) => h.id !== holdingId);
  return getDynamicPortfolioSummary();
};

// --- DYNAMIC PRICE ALERTS STORE ---
let mutableAlerts: PriceAlert[] = [
  {
    id: 'alt-1',
    asset_symbol: 'BTC',
    condition: 'ABOVE',
    target_price_usd: 70000,
    active: true,
    triggered: false,
    created_at: '2026-09-10'
  },
  {
    id: 'alt-2',
    asset_symbol: 'ETH',
    condition: 'ABOVE',
    target_price_usd: 3800,
    active: true,
    triggered: false,
    created_at: '2026-09-10'
  }
];

export const getDynamicAlerts = (): PriceAlert[] => [...mutableAlerts];

export const createAlertInStore = (asset_symbol: string, condition: 'ABOVE' | 'BELOW' | string, target_price: number): PriceAlert[] => {
  const newAlert: PriceAlert = {
    id: `alt-${Date.now()}`,
    asset_symbol: asset_symbol.toUpperCase(),
    condition: condition.toUpperCase() === 'BELOW' ? 'BELOW' : 'ABOVE',
    target_price_usd: target_price,
    active: true,
    triggered: false,
    created_at: new Date().toISOString().slice(0, 10)
  };
  mutableAlerts = [newAlert, ...mutableAlerts];
  return [...mutableAlerts];
};

export const toggleAlertInStore = (alertId: string): PriceAlert[] => {
  mutableAlerts = mutableAlerts.map((a) => a.id === alertId ? { ...a, active: !a.active } : a);
  return [...mutableAlerts];
};

export const deleteAlertFromStore = (alertId: string): PriceAlert[] => {
  mutableAlerts = mutableAlerts.filter((a) => a.id !== alertId);
  return [...mutableAlerts];
};

export const fallbackCorrelation: CorrelationMatrix = {
  symbols: ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'ADA'],
  matrix: [
    [1.00, 0.88, 0.74, 0.65, 0.52, 0.58],
    [0.88, 1.00, 0.81, 0.62, 0.49, 0.64],
    [0.74, 0.81, 1.00, 0.55, 0.43, 0.59],
    [0.65, 0.62, 0.55, 1.00, 0.48, 0.51],
    [0.52, 0.49, 0.43, 0.48, 1.00, 0.62],
    [0.58, 0.64, 0.59, 0.51, 0.62, 1.00]
  ]
};

export const getFallbackOrderBook = (symbol: string): OrderBookLiquidation => ({
  symbol: symbol.toUpperCase(),
  current_price: symbol === 'BTC' ? 68450 : 3540,
  bids: [
    { price: 68420, amount: 4.82, total: 329784.4 },
    { price: 68380, amount: 8.15, total: 557297.0 },
    { price: 68350, amount: 12.40, total: 847540.0 }
  ],
  asks: [
    { price: 68480, amount: 5.10, total: 349248.0 },
    { price: 68520, amount: 9.25, total: 633810.0 },
    { price: 68560, amount: 15.60, total: 1069536.0 }
  ],
  long_liquidations_24h_usd: 18450000,
  short_liquidations_24h_usd: 42800000,
  bid_ask_ratio: 1.34,
  sentiment_bias: 'BULLISH ACCUMULATION'
});

export const getFallbackMonteCarlo = (iterations: number = 1000, days: number = 30): MonteCarloResult => {
  const initial = getDynamicPortfolioSummary().total_value_usd || 124850.50;
  const path = [];
  
  for (let i = 1; i <= days; i++) {
    const growth = 1 + (i * 0.0035);
    const spread = Math.sqrt(i) * 0.012;
    path.push({
      day: i,
      p10: Math.round(initial * (growth - spread * 1.5)),
      p50: Math.round(initial * growth),
      p90: Math.round(initial * (growth + spread * 1.8))
    });
  }

  const expected = path[path.length - 1].p50;
  const varUsd = Math.round(initial - path[path.length - 1].p10);
  const varPct = Math.round((varUsd / initial) * 1000) / 10;

  return {
    iterations,
    days_horizon: days,
    initial_value_usd: Math.round(initial),
    expected_value_usd: expected,
    var_95_usd: varUsd,
    var_95_pct: varPct,
    percentiles_path: path
  };
};

export const getFallbackCopilot = (prompt: string, symbol: string): CopilotMessage => {
  const cleanPrompt = prompt.toLowerCase();
  const asset = fallbackTopCryptos.find((a) => a.symbol === symbol.toUpperCase());
  const name = asset ? asset.name : symbol.toUpperCase();
  const price = asset ? `$${asset.price_usd.toLocaleString()}` : '$68,450.00';
  const change = asset ? `${asset.change_24h_pct >= 0 ? '+' : ''}${asset.change_24h_pct.toFixed(2)}%` : '+4.25%';

  let reply = `🤖 **CRYPTONEX AI Synthesis for ${name} (${symbol.toUpperCase()})**\n\n`;

  if (cleanPrompt.includes('why') || cleanPrompt.includes('moving') || cleanPrompt.includes('dump') || cleanPrompt.includes('pump') || cleanPrompt.includes('price')) {
    reply += `**Spot Price**: **${price}** (${change} 24h)\n`;
    reply += `**Market Catalysts & Drivers**:\n`;
    reply += `• Institutional net ETF inflows and spot volume expansion ($38.5B 24h volume).\n`;
    reply += `• FinBERT NLP sentiment rating stands at **BULLISH** (+0.59 score).\n`;
    reply += `• On-chain metrics confirm net accumulation by top tier 1 whale wallets.\n\n`;
    reply += `**AI Recommendation**: Maintain exposure above key 20-day moving average support.`;
  } else if (cleanPrompt.includes('rsi') || cleanPrompt.includes('indicator') || cleanPrompt.includes('technical') || cleanPrompt.includes('macd')) {
    reply += `⚡ **Technical Indicator Matrix**:\n`;
    reply += `• **Composite Signal**: **BUY** (Score: +0.68)\n`;
    reply += `• **Relative Strength Index (RSI 14)**: 62.4 (Bullish Momentum)\n`;
    reply += `• **MACD Indicator**: Positive Crossover above zero line\n`;
    reply += `• **SMA 50 / 200**: Golden Cross intact\n\n`;
    reply += `**Insight**: Multi-timeframe momentum is aligned for upward continuation.`;
  } else if (cleanPrompt.includes('prediction') || cleanPrompt.includes('predict') || cleanPrompt.includes('forecast') || cleanPrompt.includes('target')) {
    const targetPrice = asset ? Math.round(asset.price_usd * 1.074) : 73500;
    reply += `🔮 **7-Day ML Machine Learning Forecast**:\n`;
    reply += `• **Current Spot Price**: ${price}\n`;
    reply += `• **7-Day Target**: **$${targetPrice.toLocaleString()}** (+7.4% expected gain)\n`;
    reply += `• **Model Confidence**: 88.5% (Random Forest Ensemble)\n`;
    reply += `• **Confidence Bounds**: $${Math.round(targetPrice * 0.94).toLocaleString()} — $${Math.round(targetPrice * 1.08).toLocaleString()}\n`;
  } else if (cleanPrompt.includes('portfolio') || cleanPrompt.includes('risk') || cleanPrompt.includes('var')) {
    const p = getDynamicPortfolioSummary();
    reply += `🛡️ **Portfolio Risk Assessment**:\n`;
    reply += `• **Total Value**: $${p.total_value_usd.toLocaleString()}\n`;
    reply += `• **Sharpe Ratio**: ${p.sharpe_ratio} | **Risk Level**: **${p.risk_level}**\n`;
    reply += `• **95% VaR (30-Day)**: $${p.total_value_usd > 0 ? Math.round(p.total_value_usd * 0.075).toLocaleString() : '9,400'}\n`;
  } else {
    reply += `• **Spot Price**: **${price}** (${change} 24h)\n`;
    reply += `• **Technical Signal**: **BUY** (Score: +0.68)\n`;
    reply += `• **FinBERT NLP Rating**: **BULLISH** (+0.59)\n`;
    reply += `• **ML Target**: **$${(asset ? Math.round(asset.price_usd * 1.074) : 73500).toLocaleString()}**\n\n`;
    reply += `How would you like to proceed? You can ask me:\n`;
    reply += `• *\"Why is ${symbol} moving today?\"*\n`;
    reply += `• *\"Show technical RSI and MACD indicators\"*\n`;
    reply += `• *\"What is the 7-day ML price prediction?\"*`;
  }
  
  return {
    sender: 'copilot',
    text: reply,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};
