from fastapi import APIRouter
from app.schemas.dto import TechnicalAnalysisResultDTO
from app.services.market_service import MarketService
from app.services.technical_service import TechnicalService

router = APIRouter(prefix="/api/technical", tags=["Technical Analysis"])
market_service = MarketService()
technical_service = TechnicalService(market_service)

@router.get("/{symbol}", response_model=TechnicalAnalysisResultDTO)
async def get_technical_analysis(symbol: str):
    return await technical_service.analyze_symbol(symbol)
