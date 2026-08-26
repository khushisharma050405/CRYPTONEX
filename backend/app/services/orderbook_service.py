import math
from app.schemas.dto import OrderBookLiquidationDTO, OrderBookItemDTO
from app.services.market_service import MarketService, COIN_CATALOG

class OrderBookService:
    def __init__(self, market_service: MarketService):
        self.market_service = market_service

    async def get_orderbook(self, symbol: str) -> OrderBookLiquidationDTO:
        symbol = symbol.upper()
        candles = await self.market_service.get_candles(symbol, timeframe="1D")
        current_price = candles[-1].close if candles else 94850.0

        bids = []
        asks = []

        # Generate realistic 10-level order book bid/ask depth
        for i in range(1, 8):
            bid_price = round(current_price * (1 - (i * 0.002)), 2)
            bid_amt = round((10.0 / (i * 0.8)) + (math.sin(i) * 2.0), 3)
            bids.append(OrderBookItemDTO(price=bid_price, amount=bid_amt, total=round(bid_price * bid_amt, 2)))

            ask_price = round(current_price * (1 + (i * 0.002)), 2)
            ask_amt = round((10.0 / (i * 0.8)) + (math.cos(i) * 2.0), 3)
            asks.append(OrderBookItemDTO(price=ask_price, amount=ask_amt, total=round(ask_price * ask_amt, 2)))

        total_bids = sum([b.total for b in bids])
        total_asks = sum([a.total for a in asks])
        ratio = round(total_bids / total_asks, 2) if total_asks > 0 else 1.0

        return OrderBookLiquidationDTO(
            symbol=symbol,
            current_price=current_price,
            bids=bids,
            asks=asks,
            long_liquidations_24h_usd=42850000.0,
            short_liquidations_24h_usd=89200000.0,
            bid_ask_ratio=ratio,
            sentiment_bias="BULLISH BUY WALL" if ratio > 1.1 else ("BEARISH SELL WALL" if ratio < 0.9 else "BALANCED")
        )
