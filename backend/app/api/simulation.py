from fastapi import APIRouter, Query
from app.schemas.dto import MonteCarloResultDTO
from app.services.market_service import MarketService
from app.services.portfolio_service import PortfolioService
from app.services.simulation_service import SimulationService

router = APIRouter(prefix="/api/simulation", tags=["Monte Carlo Simulation"])
market_service = MarketService()
portfolio_service = PortfolioService(market_service)
simulation_service = SimulationService(portfolio_service)

@router.get("/monte-carlo", response_model=MonteCarloResultDTO)
async def get_monte_carlo(
    iterations: int = Query(1000, description="Number of simulation iterations"),
    days: int = Query(30, description="Horizon days")
):
    return await simulation_service.run_monte_carlo(iterations, days)
