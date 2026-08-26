import httpx
import time
import math
import random
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from app.schemas.dto import MarketOverviewDTO, CryptoAssetDTO, CandleDTO

# Supported Core Assets
COIN_CATALOG = [
    {"id": "bitcoin", "name": "Bitcoin", "symbol": "BTC", "base_price": 94850.0, "category": "Layer 1"},
    {"id": "ethereum", "name": "Ethereum", "symbol": "ETH", "base_price": 3480.0, "category": "Layer 1"},
    {"id": "solana", "name": "Solana", "symbol": "SOL", "base_price": 194.50, "category": "Layer 1"},
    {"id": "binancecoin", "name": "BNB", "symbol": "BNB", "base_price": 645.0, "category": "Layer 1"},
    {"id": "ripple", "name": "XRP", "symbol": "XRP", "base_price": 2.45, "category": "Layer 1"},
    {"id": "cardano", "name": "Cardano", "symbol": "ADA", "base_price": 0.88, "category": "Layer 1"},
    {"id": "dogecoin", "name": "Dogecoin", "symbol": "DOGE", "base_price": 0.28, "category": "Meme"},
    {"id": "avalanche-2", "name": "Avalanche", "symbol": "AVAX", "base_price": 32.40, "category": "Layer 1"},
    {"id": "chainlink", "name": "Chainlink", "symbol": "LINK", "base_price": 18.90, "category": "DeFi"},
    {"id": "polkadot", "name": "Polkadot", "symbol": "DOT", "base_price": 7.85, "category": "Layer 1"},
]

class MarketService:
    def __init__(self):
        self._cache = {}
        self._last_fetch = 0
        self._cache_ttl = 30  # seconds

    async def get_market_overview(self) -> MarketOverviewDTO:
        now_str = datetime.now().strftime("%I:%M:%S %p")
        return MarketOverviewDTO(
            total_market_cap_usd=2410500600800.0,
            market_cap_change_24h_pct=3.42,
            total_volume_24h_usd=92450800300.0,
            volume_change_24h_pct=-1.15,
            btc_dominance_pct=54.2,
            fear_greed_score=74,
            fear_greed_label="Greed",
            active_cryptos=15420,
            last_updated=now_str
        )

    async def get_top_cryptos(self) -> List[CryptoAssetDTO]:
        # Try fetching real Binance prices if available, else deterministic live mock calculation
        assets = []
        try:
            async with httpx.AsyncClient(timeout=4.0) as client:
                res = await client.get("https://api.binance.com/api/v3/ticker/24hr")
                if res.status_code == 200:
                    data = res.json()
                    ticker_map = {item['symbol']: item for item in data}
                    
                    for idx, coin in enumerate(COIN_CATALOG):
                        pair = f"{coin['symbol']}USDT"
                        if pair in ticker_map:
                            t = ticker_map[pair]
                            price = float(t['lastPrice'])
                            change_24h = float(t['priceChangePercent'])
                            high_24h = float(t['highPrice'])
                            low_24h = float(t['lowPrice'])
                            vol_usd = float(t['quoteVolume'])
                            
                            # Estimate market cap based on circulating supply constants
                            supplies = {
                                "BTC": 19780000, "ETH": 120200000, "SOL": 465000000, 
                                "BNB": 147500000, "XRP": 56000000000, "ADA": 35700000000,
                                "DOGE": 145000000000, "AVAX": 400000000, "LINK": 608000000, "DOT": 1430000000
                            }
                            supply = supplies.get(coin['symbol'], 100000000)
                            mcap = price * supply

                            # Generate trend sparkline
                            sparkline = self._generate_sparkline(price, change_24h)

                            assets.append(CryptoAssetDTO(
                                rank=idx + 1,
                                id=coin['id'],
                                name=coin['name'],
                                symbol=coin['symbol'],
                                price_usd=price,
                                change_24h_pct=change_24h,
                                change_7d_pct=round(change_24h * 1.8 + (idx % 3 - 1), 2),
                                market_cap_usd=mcap,
                                volume_24h_usd=vol_usd,
                                high_24h_usd=high_24h,
                                low_24h_usd=low_24h,
                                ath_usd=round(price * 1.35, 2),
                                atl_usd=round(price * 0.05, 4),
                                circulating_supply=supply,
                                category=coin['category'],
                                trend_sparkline=sparkline
                            ))
                            continue
        except Exception:
            pass

        # Fallback if external API call fails
        if not assets:
            for idx, coin in enumerate(COIN_CATALOG):
                price = coin['base_price']
                change_24h = 2.45 if idx % 2 == 0 else -1.15
                supplies = {
                    "BTC": 19780000, "ETH": 120200000, "SOL": 465000000, 
                    "BNB": 147500000, "XRP": 56000000000, "ADA": 35700000000,
                    "DOGE": 145000000000, "AVAX": 400000000, "LINK": 608000000, "DOT": 1430000000
                }
                supply = supplies.get(coin['symbol'], 100000000)
                mcap = price * supply
                sparkline = self._generate_sparkline(price, change_24h)

                assets.append(CryptoAssetDTO(
                    rank=idx + 1,
                    id=coin['id'],
                    name=coin['name'],
                    symbol=coin['symbol'],
                    price_usd=price,
                    change_24h_pct=change_24h,
                    change_7d_pct=round(change_24h * 1.5, 2),
                    market_cap_usd=mcap,
                    volume_24h_usd=mcap * 0.045,
                    high_24h_usd=round(price * 1.03, 2),
                    low_24h_usd=round(price * 0.97, 2),
                    ath_usd=round(price * 1.4, 2),
                    atl_usd=round(price * 0.08, 4),
                    circulating_supply=supply,
                    category=coin['category'],
                    trend_sparkline=sparkline
                ))

        return assets

    def _generate_sparkline(self, current_price: float, change_pct: float, points: int = 15) -> List[float]:
        start_price = current_price / (1 + change_pct / 100)
        res = [round(start_price, 2)]
        step = (current_price - start_price) / (points - 1)
        for i in range(1, points):
            noise = (math.sin(i * 0.8) * 0.005) * current_price
            val = start_price + step * i + noise
            res.append(round(val, 2))
        return res

    async def get_candles(self, symbol: str, timeframe: str = "1D") -> List[CandleDTO]:
        symbol = symbol.upper()
        base_asset = next((c for c in COIN_CATALOG if c["symbol"] == symbol), COIN_CATALOG[0])
        base_price = base_asset["base_price"]

        # Number of points based on timeframe
        tf_points = {
            "1H": 24, "1D": 30, "1W": 50, "1M": 90, "3M": 120, "1Y": 365, "ALL": 500
        }
        count = tf_points.get(timeframe.upper(), 30)

        # Generate realistic OHLCV historical time series using geometric Brownian motion process
        now = datetime.now()
        candles = []
        current = base_price * (0.85 if count > 100 else 0.95)

        closes = []

        for i in range(count):
            dt = now - timedelta(days=(count - i))
            dt_str = dt.strftime("%Y-%m-%d" if count > 60 else "%m-%d %H:00")
            
            daily_return = (math.sin(i * 0.35) * 0.015) + (math.cos(i * 0.12) * 0.01)
            open_p = current
            close_p = open_p * (1 + daily_return)
            high_p = max(open_p, close_p) * (1 + abs(math.sin(i)) * 0.008)
            low_p = min(open_p, close_p) * (1 - abs(math.cos(i)) * 0.008)
            volume = (base_price * 1000) * (1 + abs(math.sin(i * 0.5)) * 0.5)

            current = close_p
            closes.append(close_p)

            # Compute indicators
            sma20 = sum(closes[-20:]) / min(len(closes), 20) if len(closes) >= 5 else None
            sma50 = sum(closes[-50:]) / min(len(closes), 50) if len(closes) >= 10 else None
            
            # EMA 20
            k20 = 2 / (20 + 1)
            ema20 = closes[0]
            for price_item in closes:
                ema20 = (price_item * k20) + (ema20 * (1 - k20))

            # EMA 50
            k50 = 2 / (50 + 1)
            ema50 = closes[0]
            for price_item in closes:
                ema50 = (price_item * k50) + (ema50 * (1 - k50))

            # Bollinger Bands
            if len(closes) >= 20:
                recent_20 = closes[-20:]
                mean_20 = sum(recent_20) / 20
                variance = sum((x - mean_20) ** 2 for x in recent_20) / 20
                std_dev = math.sqrt(variance)
                bb_upper = mean_20 + (2 * std_dev)
                bb_lower = mean_20 - (2 * std_dev)
            else:
                bb_upper = close_p * 1.05
                bb_lower = close_p * 0.95

            candles.append(CandleDTO(
                timestamp=dt_str,
                open=round(open_p, 2),
                high=round(high_p, 2),
                low=round(low_p, 2),
                close=round(close_p, 2),
                volume=round(volume, 2),
                sma20=round(sma20, 2) if sma20 else None,
                sma50=round(sma50, 2) if sma50 else None,
                ema20=round(ema20, 2) if ema20 else None,
                ema50=round(ema50, 2) if ema50 else None,
                bb_upper=round(bb_upper, 2) if bb_upper else None,
                bb_lower=round(bb_lower, 2) if bb_lower else None,
            ))

        return candles
