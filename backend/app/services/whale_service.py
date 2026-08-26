from datetime import datetime, timedelta
from typing import List
from app.schemas.dto import WhaleTransactionDTO

WHALE_MOCK_STREAM = [
    {
        "id": "wh-001",
        "ago_mins": 8,
        "asset": "BTC",
        "amount_coins": 1250.0,
        "amount_usd": 118562500.0,
        "from_address": "Binance Hot Wallet",
        "to_address": "Unknown Cold Storage 0x3f...8a2b",
        "transaction_type": "EXCHANGE_OUTFLOW"
    },
    {
        "id": "wh-002",
        "ago_mins": 19,
        "asset": "ETH",
        "amount_coins": 18500.0,
        "amount_usd": 64380000.0,
        "from_address": "Kraken Treasury",
        "to_address": "Coinbase Institutional",
        "transaction_type": "TRANSFER"
    },
    {
        "id": "wh-003",
        "ago_mins": 34,
        "asset": "SOL",
        "amount_coins": 250000.0,
        "amount_usd": 48625000.0,
        "from_address": "Unknown Whale 0x9b...11c4",
        "to_address": "OKX Exchange",
        "transaction_type": "EXCHANGE_INFLOW"
    },
    {
        "id": "wh-004",
        "ago_mins": 52,
        "asset": "BTC",
        "amount_coins": 820.0,
        "amount_usd": 77777000.0,
        "from_address": "Bitfinex Hot Wallet",
        "to_address": "Institutional Custody",
        "transaction_type": "ACCUMULATION"
    },
    {
        "id": "wh-005",
        "ago_mins": 78,
        "asset": "XRP",
        "amount_coins": 15000000.0,
        "amount_usd": 36750000.0,
        "from_address": "Ripple Escrow Wallet",
        "to_address": "Unknown Wallet 0x7a...4e1d",
        "transaction_type": "TRANSFER"
    },
    {
        "id": "wh-006",
        "ago_mins": 115,
        "asset": "BNB",
        "amount_coins": 45000.0,
        "amount_usd": 29025000.0,
        "from_address": "Binance Vault",
        "to_address": "PancakeSwap Liquidity Pool",
        "transaction_type": "ACCUMULATION"
    }
]

class WhaleService:
    async def get_whale_transactions(self, asset: str = "ALL") -> List[WhaleTransactionDTO]:
        now = datetime.now()
        txs = []
        for item in WHALE_MOCK_STREAM:
            if asset.upper() == "ALL" or item["asset"] == asset.upper():
                dt = now - timedelta(minutes=item["ago_mins"])
                txs.append(WhaleTransactionDTO(
                    id=item["id"],
                    timestamp=dt.strftime("%H:%M:%S"),
                    asset=item["asset"],
                    amount_coins=item["amount_coins"],
                    amount_usd=item["amount_usd"],
                    from_address=item["from_address"],
                    to_address=item["to_address"],
                    transaction_type=item["transaction_type"]
                ))
        return txs
