# CRYPTONEX — AI-Powered Cryptocurrency Intelligence & NLP Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688.svg?style=flat&logo=FastAPI&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB.svg?style=flat&logo=React&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6.svg?style=flat&logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?style=flat&logo=Tailwind-CSS&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB.svg?style=flat&logo=Python&logoColor=white)](https://www.python.org/)
[![FinBERT](https://img.shields.io/badge/NLP-FinBERT-FF6F00.svg?style=flat&logo=HuggingFace&logoColor=white)](https://huggingface.co/ProsusAI/finbert)

**CRYPTONEX** is an institutional-grade cryptocurrency market intelligence and artificial intelligence platform. It combines real-time cryptocurrency market data, mathematical technical indicators, FinBERT NLP sentiment analysis, multi-model machine learning time-series price predictions, 1,000-iteration Monte Carlo risk simulations, and leverage order book liquidations into a dark Bloomberg Terminal-inspired fintech web application.

---

## 🌟 Key Features

- **🎬 Cinematic Opening Experience**: Full-screen dark brand introduction with logo scale animations, hero messaging, authentic login/signup flows, and Netflix-style auto-login session persistence.
- **📈 Real-Time Market Data Ingestion**: Live Binance REST ticker ingestion for top cryptocurrencies (**BTC, ETH, SOL, BNB, XRP, ADA, DOGE, AVAX, LINK, DOT**).
- **⚡ Technical Indicator Signal Engine**: Calculates SMA 20/50/200, EMA 20/50, RSI 14, MACD Line & Histogram, Stochastic RSI, Bollinger Bands, and ATR 14; computes itemized **BUY / HOLD / SELL / STRONG BUY** signals with diagnostic rationale text.
- **🧠 FinBERT NLP Sentiment Intelligence**: Sentiment pipeline classifying financial news headlines and public social discussions into Positive/Neutral/Negative distributions, rolling 30-day sentiment trends, and dual-axis **Sentiment vs Price Pearson Correlation Plot**.
- **🤖 Machine Learning Price Forecasting**: Time-series feature engineering combining OHLCV, momentum, volatility, and sentiment scores. Trains **Random Forest**, **XGBoost**, and **Neural Net** regressors with 95% confidence bands, cross-validated test evaluation metrics (`RMSE`, `MAE`, `R²`), and automated AI Market Insight summaries.
- **🎲 1,000 Monte Carlo Risk Simulations**: Runs 1,000 statistical Geometric Brownian Motion outcome simulations over 30-day horizons and calculates 95% Value at Risk (VaR) in USD and percentage.
- **📊 Multi-Asset Correlation Heatmap**: 30-day rolling cross-asset Pearson correlation grid comparing top crypto assets against macro benchmarks (**S&P 500**, **Gold**).
- **⚡ Order Book Depth & Leverage Liquidations**: Tracks 7-level bid/ask depth walls, buy/sell wall pressure ratios, and 24H long vs short liquidation totals.
- **💱 Live Multi-Currency Switcher**: Real-time conversion across **USD ($)**, **EUR (€)**, **GBP (£)**, **JPY (¥)**, and **BTC (₿)**.
- **🤖 CRYPTONEX AI Copilot**: Floating interactive financial chatbot assistant trained on technical indicators, sentiment, forecasts, and portfolio risk.
- **📄 Institutional Executive Report Exporter**: One-click generation of downloadable Markdown market intelligence reports.

---

## 🏗️ System Architecture

```text
                                  +-----------------------+
                                  |     React + Vite      |
                                  |   (TypeScript UI)     |
                                  +-----------+-----------+
                                              |
                                              | REST API
                                              v
                                  +-----------+-----------+
                                  |    FastAPI Backend    |
                                  |    (Python Engine)    |
                                  +-----+-----+-----+-----+
                                        |     |     |
            +---------------------------+     |     +---------------------------+
            |                                 |                                 |
            v                                 v                                 v
+-----------+-----------+         +-----------+-----------+         +-----------+-----------+
|    Binance REST API   |         |  FinBERT NLP Pipeline |         |   Scikit-Learn / ML   |
|   (Market Time-Series)|         |  (Sentiment Ingestion)|         |  (Prediction Engine)  |
+-----------------------+         +-----------------------+         +-----------------------+
```

---

## 🛠️ Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 20.19+ / npm

### 1. Backend Setup (FastAPI)
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 run_backend.py
```
*Backend server will start at `http://127.0.0.1:8000` with interactive API docs at `http://127.0.0.1:8000/docs`.*

### 2. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*Frontend dev server will start at `http://127.0.0.1:3000`.*

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
