from fastapi import APIRouter, Query
from app.schemas.dto import AIPredictionDTO
from app.services.market_service import MarketService
from app.services.sentiment_service import SentimentService
from app.ml.prediction_engine import AIPredictionEngine

router = APIRouter(prefix="/api/prediction", tags=["AI Price Prediction"])
market_service = MarketService()
sentiment_service = SentimentService(market_service)
prediction_engine = AIPredictionEngine(market_service, sentiment_service)

@router.get("/{symbol}", response_model=AIPredictionDTO)
async def get_prediction(
    symbol: str, 
    horizon: str = Query("7D", description="Horizon: 1D, 7D, 14D, 30D"),
    model: str = Query("Random Forest", description="Model: Random Forest, XGBoost, LSTM / Neural Net")
):
    return await prediction_engine.predict(symbol=symbol, horizon=horizon, selected_model=model)
