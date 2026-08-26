from fastapi import APIRouter, Body
from typing import List
from app.schemas.dto import PriceAlertDTO
from app.services.market_service import MarketService
from app.services.alerts_service import AlertsService

router = APIRouter(prefix="/api/alerts", tags=["Price Alerts"])
market_service = MarketService()
alerts_service = AlertsService(market_service)

@router.get("", response_model=List[PriceAlertDTO])
async def get_alerts():
    return await alerts_service.get_alerts()

@router.post("", response_model=List[PriceAlertDTO])
async def create_alert(payload: dict = Body(...)):
    asset_symbol = payload.get("asset_symbol", "BTC")
    condition = payload.get("condition", "ABOVE")
    target_price = float(payload.get("target_price", 100000.0))
    return await alerts_service.create_alert(asset_symbol, condition, target_price)

@router.put("/{alert_id}/toggle", response_model=List[PriceAlertDTO])
async def toggle_alert(alert_id: str):
    return await alerts_service.toggle_alert(alert_id)

@router.delete("/{alert_id}", response_model=List[PriceAlertDTO])
async def delete_alert(alert_id: str):
    return await alerts_service.delete_alert(alert_id)
