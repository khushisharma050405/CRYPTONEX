from fastapi import APIRouter
from app.schemas.dto import OrderBookLiquidationDTO
from app.services.market_service import MarketService
from app.services.orderbook_service import OrderBookService

router = APIRouter(prefix="/api/orderbook", tags=["Order Book Depth & Liquidations"])
market_service = MarketService()
orderbook_service = OrderBookService(market_service)

@router.get("/{symbol}", response_model=OrderBookLiquidationDTO)
async def get_orderbook(symbol: str):
    return await orderbook_service.get_orderbook(symbol)
