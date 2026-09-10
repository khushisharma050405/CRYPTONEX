from fastapi import APIRouter, Body
from app.schemas.dto import CopilotMessageDTO
from app.services.market_service import MarketService
from app.services.technical_service import TechnicalService
from app.services.sentiment_service import SentimentService
from app.services.whale_service import WhaleService
from app.services.portfolio_service import PortfolioService
from app.services.copilot_service import CopilotService
from app.ml.prediction_engine import AIPredictionEngine

router = APIRouter(prefix="/api/copilot", tags=["AI Copilot Assistant"])
market_service = MarketService()
technical_service = TechnicalService(market_service)
sentiment_service = SentimentService(market_service)
prediction_engine = AIPredictionEngine(market_service, sentiment_service)
whale_service = WhaleService()
portfolio_service = PortfolioService(market_service)

copilot_service = CopilotService(
    market_service=market_service,
    technical_service=technical_service,
    sentiment_service=sentiment_service,
    prediction_engine=prediction_engine,
    whale_service=whale_service,
    portfolio_service=portfolio_service
)

@router.post("/chat", response_model=CopilotMessageDTO)
async def chat_with_copilot(payload: dict = Body(...)):
    prompt = payload.get("prompt", "")
    symbol = payload.get("symbol", "BTC")
    return await copilot_service.answer_prompt(prompt, symbol)
