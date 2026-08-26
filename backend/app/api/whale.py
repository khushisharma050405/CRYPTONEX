from fastapi import APIRouter, Query
from typing import List
from app.schemas.dto import WhaleTransactionDTO
from app.services.whale_service import WhaleService

router = APIRouter(prefix="/api/whales", tags=["Whale Intelligence"])
whale_service = WhaleService()

@router.get("", response_model=List[WhaleTransactionDTO])
async def get_whale_activity(asset: str = Query("ALL")):
    return await whale_service.get_whale_transactions(asset=asset)
