from fastapi import APIRouter, Body
from app.schemas.dto import PortfolioSummaryDTO
from app.services.market_service import MarketService
from app.services.portfolio_service import PortfolioService

router = APIRouter(prefix="/api/portfolio", tags=["Portfolio & Risk Analytics"])
market_service = MarketService()
portfolio_service = PortfolioService(market_service)

@router.get("", response_model=PortfolioSummaryDTO)
async def get_portfolio():
    return await portfolio_service.get_portfolio_summary()

@router.post("/holdings", response_model=PortfolioSummaryDTO)
async def add_holding(payload: dict = Body(...)):
    symbol = payload.get("symbol", "BTC")
    quantity = float(payload.get("quantity", 1.0))
    purchase_price = float(payload.get("purchase_price", 50000.0))
    return await portfolio_service.add_holding(symbol, quantity, purchase_price)

@router.delete("/holdings/{holding_id}", response_model=PortfolioSummaryDTO)
async def delete_holding(holding_id: str):
    return await portfolio_service.delete_holding(holding_id)
