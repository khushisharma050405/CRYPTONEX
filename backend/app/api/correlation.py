from fastapi import APIRouter
from app.schemas.dto import CorrelationMatrixDTO
from app.services.market_service import MarketService
from app.services.correlation_service import CorrelationService

router = APIRouter(prefix="/api/correlation", tags=["Correlation Matrix"])
market_service = MarketService()
correlation_service = CorrelationService(market_service)

@router.get("", response_model=CorrelationMatrixDTO)
async def get_correlation_matrix():
    return await correlation_service.get_correlation_matrix()
