import React, { useState } from 'react';
import type { CryptoAsset, Candle, TechnicalAnalysisResult, SentimentIntelligence, AIPrediction, Currency } from '../../types/crypto';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatters';
import { MarketOverviewChart } from '../dashboard/MarketOverviewChart';
import { TechnicalIndicatorsView } from '../technical/TechnicalIndicatorsView';
import { SentimentIntelligenceView } from '../sentiment/SentimentIntelligenceView';
import { AIPredictionView } from '../prediction/AIPredictionView';
import { OrderBookView } from '../market/OrderBookView';
import { ReportExporter } from '../common/ReportExporter';
import { LineChart, Cpu, MessageSquareQuote, BrainCircuit, Layers } from 'lucide-react';

interface CoinDetailViewProps {
  asset: CryptoAsset | null;
  candles: Candle[];
  technicalData: TechnicalAnalysisResult | null;
  sentimentData: SentimentIntelligence | null;
  predictionData: AIPrediction | null;
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
  horizon: string;
  model: string;
  onHorizonChange: (h: string) => void;
  onModelChange: (m: string) => void;
  currency?: Currency;
}

export const CoinDetailView: React.FC<CoinDetailViewProps> = ({
  asset,
  candles,
  technicalData,
  sentimentData,
  predictionData,
  timeframe,
  onTimeframeChange,
  horizon,
  model,
  onHorizonChange,
  onModelChange,
  currency = 'USD'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'chart' | 'technical' | 'sentiment' | 'prediction' | 'orderbook'>('chart');

  if (!asset) return null;

  const isUp = asset.change_24h_pct >= 0;

  return (
    <div className="space-y-6">
      {/* Top Asset Key Stats Banner */}
      <div className="fintech-card p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold font-mono text-cyan-400 text-lg shadow-lg">
              {asset.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-100 font-mono tracking-tight">{asset.name}</h1>
                <span className="text-sm font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {asset.symbol}
                </span>
                <span className="text-xs text-slate-400 font-mono">Rank #{asset.rank}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Category: {asset.category}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <ReportExporter asset={asset} technical={technicalData} sentiment={sentimentData} prediction={predictionData} />

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black font-mono text-slate-100">
                {formatCurrency(asset.price_usd, currency)}
              </span>
              <span
                className={`text-sm font-mono font-bold px-2.5 py-1 rounded border ${
                  isUp ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}
              >
                {isUp ? '+' : ''}
                {asset.change_24h_pct.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-slate-800/80 font-mono text-xs">
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">MARKET CAP</span>
            <span className="font-bold text-slate-200">{formatCompactCurrency(asset.market_cap_usd, currency)}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">24H VOLUME</span>
            <span className="font-bold text-slate-200">{formatCompactCurrency(asset.volume_24h_usd, currency)}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">24H HIGH / LOW</span>
            <span className="font-bold text-slate-200">{formatCurrency(asset.high_24h_usd, currency)} / {formatCurrency(asset.low_24h_usd, currency)}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">CIRCULATING SUPPLY</span>
            <span className="font-bold text-slate-200">{(asset.circulating_supply / 1e6).toFixed(1)}M {asset.symbol}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">ALL-TIME HIGH</span>
            <span className="font-bold text-slate-200">{formatCurrency(asset.ath_usd, currency)}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">ALL-TIME LOW</span>
            <span className="font-bold text-slate-200">{formatCurrency(asset.atl_usd, currency)}</span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'chart', label: 'Interactive Price Chart', icon: LineChart },
          { id: 'technical', label: 'Technical Signal Engine', icon: Cpu },
          { id: 'sentiment', label: 'NLP Sentiment Intelligence', icon: MessageSquareQuote },
          { id: 'prediction', label: 'AI Price Prediction', icon: BrainCircuit },
          { id: 'orderbook', label: 'Order Book Depth & Liquidations', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                active
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Sub-Tab View Content */}
      {activeSubTab === 'chart' && (
        <MarketOverviewChart
          candles={candles}
          asset={asset}
          timeframe={timeframe}
          onTimeframeChange={onTimeframeChange}
        />
      )}

      {activeSubTab === 'technical' && (
        <TechnicalIndicatorsView technicalData={technicalData} symbol={asset.symbol} />
      )}

      {activeSubTab === 'sentiment' && (
        <SentimentIntelligenceView sentimentData={sentimentData} symbol={asset.symbol} />
      )}

      {activeSubTab === 'prediction' && (
        <AIPredictionView
          predictionData={predictionData}
          symbol={asset.symbol}
          horizon={horizon}
          model={model}
          onHorizonChange={onHorizonChange}
          onModelChange={onModelChange}
        />
      )}

      {activeSubTab === 'orderbook' && (
        <OrderBookView symbol={asset.symbol} />
      )}
    </div>
  );
};
