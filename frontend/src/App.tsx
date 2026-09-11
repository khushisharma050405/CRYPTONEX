import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import type { NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { AuthScreen } from './components/auth/AuthScreen';
import { MarketOverviewCards } from './components/dashboard/MarketOverviewCards';
import { MarketOverviewChart } from './components/dashboard/MarketOverviewChart';
import { TopCryptoTable } from './components/dashboard/TopCryptoTable';
import { CoinDetailView } from './components/coin/CoinDetailView';
import { TechnicalIndicatorsView } from './components/technical/TechnicalIndicatorsView';
import { SentimentIntelligenceView } from './components/sentiment/SentimentIntelligenceView';
import { AIPredictionView } from './components/prediction/AIPredictionView';
import { WhaleActivityView } from './components/whale/WhaleActivityView';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { PriceAlertsView } from './components/alerts/PriceAlertsView';
import { CorrelationHeatmap } from './components/markets/CorrelationHeatmap';
import { AICopilotDrawer } from './components/copilot/AICopilotDrawer';
import { FinancialDisclaimer } from './components/common/FinancialDisclaimer';
import { cryptoApi } from './services/api';
import type {
  MarketOverview,
  CryptoAsset,
  Candle,
  TechnicalAnalysisResult,
  SentimentIntelligence,
  AIPrediction,
  WhaleTransaction,
  PortfolioSummary,
  PriceAlert,
  CorrelationMatrix,
  Currency
} from './types/crypto';

export function App() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    const saved = localStorage.getItem('cryptonex_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Flow State Machine: Authenticated users go straight to Dashboard, new visitors to Auth Login Screen
  const [flowState, setFlowState] = useState<'intro' | 'auth' | 'dashboard'>(() => {
    const saved = localStorage.getItem('cryptonex_user');
    return saved ? 'dashboard' : 'auth';
  });


  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTC');
  const [timeframe, setTimeframe] = useState<string>('1D');
  const [horizon, setHorizon] = useState<string>('7D');
  const [model, setModel] = useState<string>('Random Forest');
  const [whaleAssetFilter, setWhaleAssetFilter] = useState<string>('ALL');

  const [currency, setCurrency] = useState<Currency>('USD');
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);

  // Data states
  const [marketOverview, setMarketOverview] = useState<MarketOverview | null>(null);
  const [topAssets, setTopAssets] = useState<CryptoAsset[]>([]);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [technicalData, setTechnicalData] = useState<TechnicalAnalysisResult | null>(null);
  const [sentimentData, setSentimentData] = useState<SentimentIntelligence | null>(null);
  const [predictionData, setPredictionData] = useState<AIPrediction | null>(null);
  const [whales, setWhales] = useState<WhaleTransaction[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [correlationData, setCorrelationData] = useState<CorrelationMatrix | null>(null);

  const [error, setError] = useState<string | null>(null);

  // Fetch initial market data & top assets
  const loadMarketData = async () => {
    try {
      setError(null);
      const [ov, top, port, alt, corr] = await Promise.all([
        cryptoApi.getMarketOverview(),
        cryptoApi.getTopCryptos(),
        cryptoApi.getPortfolio(),
        cryptoApi.getAlerts(),
        cryptoApi.getCorrelationMatrix()
      ]);
      setMarketOverview(ov);
      setTopAssets(top);
      setPortfolio(port);
      setAlerts(alt);
      setCorrelationData(corr);
    } catch (err: any) {
      console.error("Market API error:", err);
      setError("Failed to synchronize market data. Check backend connection.");
    }
  };

  // Fetch symbol specific data
  const loadSymbolData = async (sym: string, tf: string, hor: string, mdl: string) => {
    try {
      const [c, tech, sent, pred] = await Promise.all([
        cryptoApi.getCandles(sym, tf),
        cryptoApi.getTechnicalAnalysis(sym),
        cryptoApi.getSentimentIntelligence(sym),
        cryptoApi.getPrediction(sym, hor, mdl)
      ]);
      setCandles(c);
      setTechnicalData(tech);
      setSentimentData(sent);
      setPredictionData(pred);
    } catch (err: any) {
      console.error("Symbol API error:", err);
    }
  };

  // Fetch whale activity data
  const loadWhaleData = async (asset: string) => {
    try {
      const w = await cryptoApi.getWhales(asset);
      setWhales(w);
    } catch (err) {
      console.error("Whales API error:", err);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, []);

  useEffect(() => {
    loadSymbolData(selectedSymbol, timeframe, horizon, model);
  }, [selectedSymbol, timeframe, horizon, model]);

  useEffect(() => {
    loadWhaleData(whaleAssetFilter);
  }, [whaleAssetFilter]);

  const handleIntroContinue = () => {
    if (user) {
      setFlowState('dashboard');
    } else {
      setFlowState('auth');
    }
  };

  const handleAuthSuccess = (userData: { name: string; email: string; role: string }) => {
    setUser(userData);
    localStorage.setItem('cryptonex_user', JSON.stringify(userData));
    setFlowState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cryptonex_user');
    setFlowState('auth');
  };

  const handleSelectAsset = (symbol: string) => {
    setSelectedSymbol(symbol);
    if (activeTab === 'dashboard' || activeTab === 'markets') {
      setActiveTab('coin');
    }
  };

  const handleAddHolding = async (symbol: string, qty: number, price: number) => {
    const updated = await cryptoApi.addHolding(symbol, qty, price);
    setPortfolio({ ...updated });
  };

  const handleDeleteHolding = async (id: string) => {
    const updated = await cryptoApi.deleteHolding(id);
    setPortfolio({ ...updated });
  };

  const handleCreateAlert = async (symbol: string, cond: string, target: number) => {
    const updated = await cryptoApi.createAlert(symbol, cond, target);
    setAlerts([...updated]);
  };

  const handleToggleAlert = async (id: string) => {
    const updated = await cryptoApi.toggleAlert(id);
    setAlerts([...updated]);
  };

  const handleDeleteAlert = async (id: string) => {
    const updated = await cryptoApi.deleteAlert(id);
    setAlerts([...updated]);
  };


  // RENDER FLOW STATES
  if (flowState === 'intro') {
    return (
      <CinematicIntro
        onContinue={handleIntroContinue}
        isReturningVisitor={false}
      />
    );
  }

  if (flowState === 'auth' || !user) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  const currentAsset = topAssets.find((a) => a.symbol === selectedSymbol) || (topAssets[0] || null);

  return (
    <div className="flex min-h-screen bg-[#0B0E14] text-slate-100 font-sans relative">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSymbol={selectedSymbol}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          selectedSymbol={selectedSymbol}
          onSelectSymbol={handleSelectAsset}
          topAssets={topAssets}
          onRefresh={loadMarketData}
          alertCount={alerts.filter((a) => a.triggered).length}
          onOpenAlerts={() => setActiveTab('alerts')}
          onOpenCopilot={() => setIsCopilotOpen(true)}
          currency={currency}
          onCurrencyChange={setCurrency}
          user={user}
          onLogout={handleLogout}
        />

        <main className="p-6 space-y-6 flex-1 max-w-7xl w-full mx-auto">
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-mono flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={loadMarketData}
                className="px-3 py-1 bg-rose-900 rounded font-bold hover:bg-rose-800"
              >
                Retry
              </button>
            </div>
          )}

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <MarketOverviewCards overview={marketOverview} currency={currency} />

              <MarketOverviewChart
                candles={candles}
                asset={currentAsset}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
              />

              <CorrelationHeatmap correlationData={correlationData} />

              <TopCryptoTable assets={topAssets} onSelectAsset={handleSelectAsset} currency={currency} />
            </div>
          )}

          {/* MARKETS TAB */}
          {activeTab === 'markets' && (
            <div className="space-y-6">
              <MarketOverviewCards overview={marketOverview} currency={currency} />
              <CorrelationHeatmap correlationData={correlationData} />
              <TopCryptoTable assets={topAssets} onSelectAsset={handleSelectAsset} currency={currency} />
            </div>
          )}

          {/* COIN ANALYSIS TAB */}
          {activeTab === 'coin' && (
            <CoinDetailView
              asset={currentAsset}
              candles={candles}
              technicalData={technicalData}
              sentimentData={sentimentData}
              predictionData={predictionData}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              horizon={horizon}
              model={model}
              onHorizonChange={setHorizon}
              onModelChange={setModel}
              currency={currency}
            />
          )}

          {/* TECHNICAL ANALYSIS TAB */}
          {activeTab === 'technical' && (
            <TechnicalIndicatorsView technicalData={technicalData} symbol={selectedSymbol} />
          )}

          {/* AI PREDICTION TAB */}
          {activeTab === 'prediction' && (
            <AIPredictionView
              predictionData={predictionData}
              symbol={selectedSymbol}
              horizon={horizon}
              model={model}
              onHorizonChange={setHorizon}
              onModelChange={setModel}
            />
          )}

          {/* SENTIMENT INTELLIGENCE TAB */}
          {activeTab === 'sentiment' && (
            <SentimentIntelligenceView sentimentData={sentimentData} symbol={selectedSymbol} />
          )}

          {/* WHALE ACTIVITY TAB */}
          {activeTab === 'whales' && (
            <WhaleActivityView
              whales={whales}
              selectedAssetFilter={whaleAssetFilter}
              onAssetFilterChange={setWhaleAssetFilter}
            />
          )}

          {/* MY PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <PortfolioView
              portfolio={portfolio}
              onAddHolding={handleAddHolding}
              onDeleteHolding={handleDeleteHolding}
              currency={currency}
            />
          )}

          {/* PRICE ALERTS TAB */}
          {activeTab === 'alerts' && (
            <PriceAlertsView
              alerts={alerts}
              onCreateAlert={handleCreateAlert}
              onToggleAlert={handleToggleAlert}
              onDeleteAlert={handleDeleteAlert}
            />
          )}

          <FinancialDisclaimer />
        </main>
      </div>

      {/* AI Copilot Chatbot Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        selectedSymbol={selectedSymbol}
      />
    </div>
  );
}
