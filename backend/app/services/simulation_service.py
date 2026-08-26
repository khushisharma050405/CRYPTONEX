import numpy as np
from app.schemas.dto import MonteCarloResultDTO, MonteCarloPointDTO
from app.services.portfolio_service import PortfolioService

class SimulationService:
    def __init__(self, portfolio_service: PortfolioService):
        self.portfolio_service = portfolio_service

    async def run_monte_carlo(self, iterations: int = 1000, days: int = 30) -> MonteCarloResultDTO:
        summary = await self.portfolio_service.get_portfolio_summary()
        initial_val = summary.total_value_usd
        if initial_val == 0:
            initial_val = 50000.0

        mu = 0.12 / 365.0  # Annualized expected return ~12%
        sigma = summary.volatility_annualized / np.sqrt(365.0)

        # Run 1,000 statistical geometric Brownian motion simulations
        np.random.seed(42)
        daily_returns = np.random.normal(mu, sigma, (iterations, days))
        price_paths = np.zeros((iterations, days + 1))
        price_paths[:, 0] = initial_val

        for t in range(1, days + 1):
            price_paths[:, t] = price_paths[:, t - 1] * (1 + daily_returns[:, t - 1])

        # Extract percentile paths for 10th, 50th (median), and 90th percentiles
        percentile_points = []
        for d in range(days + 1):
            p10 = float(np.percentile(price_paths[:, d], 10))
            p50 = float(np.percentile(price_paths[:, d], 50))
            p90 = float(np.percentile(price_paths[:, d], 90))
            percentile_points.append(MonteCarloPointDTO(
                day=d,
                p10=round(p10, 2),
                p50=round(p50, 2),
                p90=round(p90, 2)
            ))

        final_values = price_paths[:, -1]
        expected_val = float(np.mean(final_values))
        var_5th_pct = float(np.percentile(final_values, 5))
        var_95_usd = round(initial_val - var_5th_pct, 2)
        var_95_pct = round((var_95_usd / initial_val) * 100, 2)

        return MonteCarloResultDTO(
            iterations=iterations,
            days_horizon=days,
            initial_value_usd=round(initial_val, 2),
            expected_value_usd=round(expected_val, 2),
            var_95_usd=var_95_usd,
            var_95_pct=var_95_pct,
            percentiles_path=percentile_points
        )
