from fastapi import APIRouter
from app.schemas.dto import SentimentIntelligenceDTO
from app.services.market_service import MarketService
from app.services.sentiment_service import SentimentService

router = APIRouter(prefix="/api/sentiment", tags=["NLP Sentiment Intelligence"])
market_service = MarketService()
sentiment_service = SentimentService(market_service)

@router.get("/{symbol}", response_model=SentimentIntelligenceDTO)
async def get_sentiment_intelligence(symbol: str):
    return await sentiment_service.get_sentiment_intelligence(symbol)
