from fastapi import APIRouter, Depends, Query
from typing import List
from app.schemas.dto import MarketOverviewDTO, CryptoAssetDTO, CandleDTO
from app.services.market_service import MarketService

router = APIRouter(prefix="/api/market", tags=["Market Data"])
market_service = MarketService()

@router.get("/overview", response_model=MarketOverviewDTO)
async def get_market_overview():
    return await market_service.get_market_overview()

@router.get("/top", response_model=List[CryptoAssetDTO])
async def get_top_cryptos():
    return await market_service.get_top_cryptos()

@router.get("/candles/{symbol}", response_model=List[CandleDTO])
async def get_candles(symbol: str, timeframe: str = Query("1D", description="Timeframe: 1H, 1D, 1W, 1M, 3M, 1Y, ALL")):
    return await market_service.get_candles(symbol=symbol, timeframe=timeframe)
