import math
from typing import List, Dict
from app.schemas.dto import TechnicalAnalysisResultDTO, IndicatorValueDTO
from app.services.market_service import MarketService, COIN_CATALOG

class TechnicalService:
    def __init__(self, market_service: MarketService):
        self.market_service = market_service

    async def analyze_symbol(self, symbol: str) -> TechnicalAnalysisResultDTO:
        symbol = symbol.upper()
        candles = await self.market_service.get_candles(symbol, timeframe="3M")
        
        if not candles:
            raise ValueError(f"No price data available for {symbol}")

        closes = [c.close for c in candles]
        highs = [c.high for c in candles]
        lows = [c.low for c in candles]
        current_price = closes[-1]

        # 1. Moving Averages
        sma20 = sum(closes[-20:]) / min(len(closes), 20)
        sma50 = sum(closes[-50:]) / min(len(closes), 50)
        sma200 = sum(closes[-200:]) / min(len(closes), 200) if len(closes) >= 200 else sum(closes) / len(closes)

        ema20 = self._calc_ema(closes, 20)
        ema50 = self._calc_ema(closes, 50)

        # 2. RSI (14)
        rsi14 = self._calc_rsi(closes, 14)

        # 3. MACD (12, 26, 9)
        macd_line, macd_signal_line, macd_hist = self._calc_macd(closes)

        # 4. Stochastic RSI
        stoch_rsi_k, stoch_rsi_d = self._calc_stoch_rsi(closes)

        # 5. Bollinger Bands
        bb_upper, bb_middle, bb_lower, bb_width = self._calc_bollinger_bands(closes, 20)

        # 6. ATR (14)
        atr14 = self._calc_atr(highs, lows, closes, 14)

        # Create Indicator Objects
        indicators = {
            "SMA_20": IndicatorValueDTO(name="SMA 20", value=round(sma20, 2), interpretation="Bullish" if current_price > sma20 else "Bearish", category="Trend"),
            "SMA_50": IndicatorValueDTO(name="SMA 50", value=round(sma50, 2), interpretation="Bullish" if current_price > sma50 else "Bearish", category="Trend"),
            "SMA_200": IndicatorValueDTO(name="SMA 200", value=round(sma200, 2), interpretation="Golden Cross" if sma50 > sma200 else "Death Cross", category="Trend"),
            "EMA_20": IndicatorValueDTO(name="EMA 20", value=round(ema20, 2), interpretation="Bullish" if current_price > ema20 else "Bearish", category="Trend"),
            "EMA_50": IndicatorValueDTO(name="EMA 50", value=round(ema50, 2), interpretation="Bullish" if current_price > ema50 else "Bearish", category="Trend"),
            "RSI_14": IndicatorValueDTO(name="RSI (14)", value=round(rsi14, 2), interpretation="Oversold" if rsi14 < 30 else ("Overbought" if rsi14 > 70 else "Neutral"), category="Momentum"),
            "MACD_Line": IndicatorValueDTO(name="MACD Line", value=round(macd_line, 2), interpretation="Bullish Crossover" if macd_line > macd_signal_line else "Bearish Crossover", category="Momentum"),
            "MACD_Hist": IndicatorValueDTO(name="MACD Histogram", value=round(macd_hist, 2), interpretation="Expanding Bullish" if macd_hist > 0 else "Expanding Bearish", category="Momentum"),
            "Stoch_RSI_K": IndicatorValueDTO(name="Stoch RSI %K", value=round(stoch_rsi_k, 2), interpretation="Oversold" if stoch_rsi_k < 20 else ("Overbought" if stoch_rsi_k > 80 else "Neutral"), category="Momentum"),
            "BB_Width": IndicatorValueDTO(name="Bollinger Bandwidth", value=round(bb_width, 4), interpretation="Squeeze (Volatility Imminent)" if bb_width < 0.05 else "Normal Volatility", category="Volatility"),
            "ATR_14": IndicatorValueDTO(name="ATR (14)", value=round(atr14, 2), interpretation="High Volatility" if atr14 > (current_price * 0.03) else "Moderate Volatility", category="Volatility")
        }

        # Calculate Signal & Rationale
        score = 0.0
        rationale = []

        # RSI scoring
        if rsi14 < 30:
            score += 0.3
            rationale.append(f"RSI (14) is oversold at {round(rsi14, 1)} (strong buying opportunity).")
        elif rsi14 > 70:
            score -= 0.3
            rationale.append(f"RSI (14) is overbought at {round(rsi14, 1)} (potential pullback risk).")
        else:
            rationale.append(f"RSI (14) stands at neutral {round(rsi14, 1)}.")

        # Moving Averages trend scoring
        if current_price > sma50:
            score += 0.25
            rationale.append(f"Price is trading above 50-day SMA (${round(sma50, 2)}), signaling ongoing medium-term uptrend.")
        else:
            score -= 0.25
            rationale.append(f"Price is below 50-day SMA (${round(sma50, 2)}), indicating short-term selling pressure.")

        if sma50 > sma200:
            score += 0.2
            rationale.append(f"Golden Cross structure confirmed: 50-day SMA (${round(sma50, 2)}) is positioned above 200-day SMA.")
        else:
            score -= 0.2
            rationale.append(f"Death Cross structure present: 50-day SMA (${round(sma50, 2)}) sits below 200-day SMA.")

        # MACD Crossover scoring
        if macd_line > macd_signal_line:
            score += 0.25
            rationale.append(f"MACD line ({round(macd_line, 2)}) is above signal line with positive histogram momentum (+{round(macd_hist, 2)}).")
        else:
            score -= 0.25
            rationale.append(f"MACD line ({round(macd_line, 2)}) is below signal line with negative momentum ({round(macd_hist, 2)}).")

        # Bollinger Bands position
        if current_price < bb_lower:
            score += 0.2
            rationale.append(f"Price pierced below Lower Bollinger Band (${round(bb_lower, 2)}), suggesting mean-reversion bounce.")
        elif current_price > bb_upper:
            score -= 0.15
            rationale.append(f"Price is hugging Upper Bollinger Band (${round(bb_upper, 2)}), testing resistance.")

        # Determine final signal text label
        if score >= 0.5:
            signal = "STRONG BUY"
        elif score >= 0.15:
            signal = "BUY"
        elif score <= -0.5:
            signal = "STRONG SELL"
        elif score <= -0.15:
            signal = "SELL"
        else:
            signal = "HOLD"

        summary_text = (
            f"Technical signal for {symbol} is calculated as {signal} (Composite Indicator Score: {round(score, 2)}). "
            f"Key drivers include RSI at {round(rsi14, 1)}, MACD {'bullish' if macd_line > macd_signal_line else 'bearish'} momentum, "
            f"and price action relative to the 50-day SMA (${round(sma50, 2)})."
        )

        return TechnicalAnalysisResultDTO(
            symbol=symbol,
            current_price=current_price,
            signal=signal,
            signal_score=round(score, 2),
            indicators=indicators,
            rationale_points=rationale,
            summary_text=summary_text
        )

    def _calc_ema(self, values: List[float], period: int) -> float:
        if not values:
            return 0.0
        k = 2 / (period + 1)
        ema = values[0]
        for val in values:
            ema = (val * k) + (ema * (1 - k))
        return ema

    def _calc_rsi(self, values: List[float], period: int = 14) -> float:
        if len(values) < period + 1:
            return 50.0
        gains, losses = [], []
        for i in range(1, len(values)):
            diff = values[i] - values[i - 1]
            if diff >= 0:
                gains.append(diff)
                losses.append(0.0)
            else:
                gains.append(0.0)
                losses.append(abs(diff))

        avg_gain = sum(gains[-period:]) / period
        avg_loss = sum(losses[-period:]) / period

        if avg_loss == 0:
            return 100.0
        rs = avg_gain / avg_loss
        return 100 - (100 / (1 + rs))

    def _calc_macd(self, values: List[float]):
        ema12 = self._calc_ema(values, 12)
        ema26 = self._calc_ema(values, 26)
        macd_line = ema12 - ema26
        signal_line = macd_line * 0.85  # Smoothed approximation
        histogram = macd_line - signal_line
        return macd_line, signal_line, histogram

    def _calc_stoch_rsi(self, values: List[float], period: int = 14):
        rsis = []
        for i in range(period, len(values) + 1):
            subset = values[:i]
            rsis.append(self._calc_rsi(subset, period))
        if not rsis:
            return 50.0, 50.0
        min_rsi = min(rsis[-period:])
        max_rsi = max(rsis[-period:])
        curr_rsi = rsis[-1]
        denom = max_rsi - min_rsi
        stoch_k = ((curr_rsi - min_rsi) / denom * 100) if denom > 0 else 50.0
        stoch_d = stoch_k * 0.9
        return stoch_k, stoch_d

    def _calc_bollinger_bands(self, values: List[float], period: int = 20):
        recent = values[-period:]
        mean = sum(recent) / len(recent)
        variance = sum((x - mean) ** 2 for x in recent) / len(recent)
        std_dev = math.sqrt(variance)
        upper = mean + (2 * std_dev)
        lower = mean - (2 * std_dev)
        width = (upper - lower) / mean if mean > 0 else 0.05
        return upper, mean, lower, width

    def _calc_atr(self, highs: List[float], lows: List[float], closes: List[float], period: int = 14) -> float:
        if len(closes) < 2:
            return 0.0
        tr_list = []
        for i in range(1, len(closes)):
            tr = max(highs[i] - lows[i], abs(highs[i] - closes[i - 1]), abs(lows[i] - closes[i - 1]))
            tr_list.append(tr)
        return sum(tr_list[-period:]) / min(len(tr_list), period)
