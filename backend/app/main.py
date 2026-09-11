from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, market, technical, sentiment, prediction, whale, portfolio, alerts, copilot, simulation, correlation, orderbook

app = FastAPI(
    title="CRYPTONEX API",
    description="Production-Quality Cryptocurrency Intelligence & AI Platform Engine",
    version="1.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(market.router)

app.include_router(technical.router)
app.include_router(sentiment.router)
app.include_router(prediction.router)
app.include_router(whale.router)
app.include_router(portfolio.router)
app.include_router(alerts.router)
app.include_router(copilot.router)
app.include_router(simulation.router)
app.include_router(correlation.router)
app.include_router(orderbook.router)

@app.get("/health")
async def health_check():
    return {"status": "online", "brand": "CRYPTONEX", "version": "1.1.0"}
