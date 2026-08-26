from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class MarketOverviewDTO(BaseModel):
    total_market_cap_usd: float
    market_cap_change_24h_pct: float
    total_volume_24h_usd: float
    volume_change_24h_pct: float
    btc_dominance_pct: float
    fear_greed_score: int
    fear_greed_label: str
    active_cryptos: int
    last_updated: str

class CryptoAssetDTO(BaseModel):
    rank: int
    id: str
    name: str
    symbol: str
    price_usd: float
    change_24h_pct: float
    change_7d_pct: float
    market_cap_usd: float
    volume_24h_usd: float
    high_24h_usd: float
    low_24h_usd: float
    ath_usd: float
    atl_usd: float
    circulating_supply: float
    category: str = "Layer 1"
    trend_sparkline: List[float] = []

class CandleDTO(BaseModel):
    timestamp: str
    open: float
    high: float
    low: float
    close: float
    volume: float
    sma20: Optional[float] = None
    sma50: Optional[float] = None
    ema20: Optional[float] = None
    ema50: Optional[float] = None
    bb_upper: Optional[float] = None
    bb_lower: Optional[float] = None

class IndicatorValueDTO(BaseModel):
    name: str
    value: float
    interpretation: str
    category: str  # Trend, Momentum, Volatility

class TechnicalAnalysisResultDTO(BaseModel):
    symbol: str
    current_price: float
    signal: str  # STRONG_BUY, BUY, HOLD, SELL, STRONG_SELL
    signal_score: float  # -1.0 to 1.0
    indicators: Dict[str, IndicatorValueDTO]
    rationale_points: List[str]
    summary_text: str

class SentimentArticleDTO(BaseModel):
    id: str
    title: str
    source: str
    timestamp: str
    coin_symbol: str
    sentiment: str  # POSITIVE, NEUTRAL, NEGATIVE
    confidence: float  # 0.0 - 1.0
    summary: str
    url: str = "#"

class SentimentPointDTO(BaseModel):
    timestamp: str
    sentiment_score: float  # -1.0 to 1.0
    news_score: float
    social_score: float
    price_usd: Optional[float] = None

class SentimentIntelligenceDTO(BaseModel):
    symbol: str
    overall_sentiment: str  # BULLISH, NEUTRAL, BEARISH
    positive_pct: float
    neutral_pct: float
    negative_pct: float
    sentiment_score: float
    correlation_with_price: float
    correlation_label: str
    news_articles: List[SentimentArticleDTO]
    social_posts: List[SentimentArticleDTO]
    sentiment_trend: List[SentimentPointDTO]

class ForecastPointDTO(BaseModel):
    timestamp: str
    actual_price: Optional[float] = None
    predicted_price: Optional[float] = None
    lower_bound: Optional[float] = None
    upper_bound: Optional[float] = None

class ModelMetricDTO(BaseModel):
    model_name: str
    rmse: float
    mae: float
    r2_score: float
    is_best: bool = False

class AIPredictionDTO(BaseModel):
    symbol: str
    horizon: str  # 1D, 7D, 14D, 30D
    selected_model: str
    current_price: float
    predicted_price: float
    expected_change_pct: float
    confidence_pct: float
    lower_bound: float
    upper_bound: float
    forecast_points: List[ForecastPointDTO]
    model_metrics: List[ModelMetricDTO]
    ai_insight_text: str

class WhaleTransactionDTO(BaseModel):
    id: str
    timestamp: str
    asset: str
    amount_coins: float
    amount_usd: float
    from_address: str
    to_address: str
    transaction_type: str  # ACCUMULATION, TRANSFER, EXCHANGE_INFLOW, EXCHANGE_OUTFLOW

class PortfolioAssetDTO(BaseModel):
    id: str
    asset_name: str
    symbol: str
    quantity: float
    purchase_price_usd: float
    purchase_date: str
    current_price_usd: float
    current_value_usd: float
    profit_loss_usd: float
    profit_loss_pct: float
    allocation_pct: float

class PortfolioSummaryDTO(BaseModel):
    total_value_usd: float
    total_invested_usd: float
    total_profit_loss_usd: float
    total_profit_loss_pct: float
    risk_level: str  # LOW, MEDIUM, HIGH
    volatility_annualized: float
    sharpe_ratio: float
    max_drawdown_pct: float
    holdings: List[PortfolioAssetDTO]
    performance_history: List[Dict[str, Any]]

class PriceAlertDTO(BaseModel):
    id: str
    asset_symbol: str
    condition: str  # ABOVE, BELOW
    target_price_usd: float
    active: bool
    triggered: bool
    created_at: str

# NEW DTOS FOR EXTENDED FEATURES
class CopilotMessageDTO(BaseModel):
    sender: str  # "user" or "copilot"
    text: str
    timestamp: str

class CopilotQueryDTO(BaseModel):
    prompt: str
    symbol: Optional[str] = "BTC"

class MonteCarloPointDTO(BaseModel):
    day: int
    p10: float
    p50: float
    p90: float

class MonteCarloResultDTO(BaseModel):
    iterations: int
    days_horizon: int
    initial_value_usd: float
    expected_value_usd: float
    var_95_usd: float
    var_95_pct: float
    percentiles_path: List[MonteCarloPointDTO]

class CorrelationMatrixDTO(BaseModel):
    symbols: List[str]
    matrix: List[List[float]]

class OrderBookItemDTO(BaseModel):
    price: float
    amount: float
    total: float

class OrderBookLiquidationDTO(BaseModel):
    symbol: str
    current_price: float
    bids: List[OrderBookItemDTO]
    asks: List[OrderBookItemDTO]
    long_liquidations_24h_usd: float
    short_liquidations_24h_usd: float
    bid_ask_ratio: float
    sentiment_bias: str
