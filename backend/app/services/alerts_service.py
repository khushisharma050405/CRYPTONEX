from datetime import datetime
from typing import List
from app.schemas.dto import PriceAlertDTO
from app.services.market_service import MarketService

DEFAULT_ALERTS = [
    {
        "id": "alt-001",
        "asset_symbol": "BTC",
        "condition": "ABOVE",
        "target_price_usd": 100000.0,
        "active": True,
        "triggered": False,
        "created_at": "2026-08-20 14:00"
    },
    {
        "id": "alt-002",
        "asset_symbol": "ETH",
        "condition": "BELOW",
        "target_price_usd": 3000.0,
        "active": True,
        "triggered": False,
        "created_at": "2026-08-22 09:30"
    },
    {
        "id": "alt-003",
        "asset_symbol": "SOL",
        "condition": "ABOVE",
        "target_price_usd": 220.0,
        "active": False,
        "triggered": True,
        "created_at": "2026-08-15 11:15"
    }
]

class AlertsService:
    def __init__(self, market_service: MarketService):
        self.market_service = market_service
        self.alerts = list(DEFAULT_ALERTS)

    async def get_alerts(self) -> List[PriceAlertDTO]:
        assets = await self.market_service.get_top_cryptos()
        price_map = {a.symbol: a.price_usd for a in assets}

        res = []
        for a in self.alerts:
            curr_price = price_map.get(a["asset_symbol"], 0.0)
            triggered = a["triggered"]

            if a["active"]:
                if a["condition"] == "ABOVE" and curr_price >= a["target_price_usd"]:
                    triggered = True
                elif a["condition"] == "BELOW" and curr_price <= a["target_price_usd"]:
                    triggered = True

            res.append(PriceAlertDTO(
                id=a["id"],
                asset_symbol=a["asset_symbol"],
                condition=a["condition"],
                target_price_usd=a["target_price_usd"],
                active=a["active"],
                triggered=triggered,
                created_at=a["created_at"]
            ))
        return res

    async def create_alert(self, asset_symbol: str, condition: str, target_price: float) -> List[PriceAlertDTO]:
        new_alert = {
            "id": f"alt-{len(self.alerts) + 1:03d}",
            "asset_symbol": asset_symbol.upper(),
            "condition": condition.upper(),
            "target_price_usd": target_price,
            "active": True,
            "triggered": False,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M")
        }
        self.alerts.append(new_alert)
        return await self.get_alerts()

    async def toggle_alert(self, alert_id: str) -> List[PriceAlertDTO]:
        for a in self.alerts:
            if a["id"] == alert_id:
                a["active"] = not a["active"]
        return await self.get_alerts()

    async def delete_alert(self, alert_id: str) -> List[PriceAlertDTO]:
        self.alerts = [a for a in self.alerts if a["id"] != alert_id]
        return await self.get_alerts()
