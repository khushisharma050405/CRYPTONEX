import React from 'react';
import type { MarketOverview, Currency } from '../../types/crypto';
import { formatCompactCurrency } from '../../utils/formatters';
import { DollarSign, Activity, PieChart, Smile, Layers } from 'lucide-react';

interface MarketOverviewCardsProps {
  overview: MarketOverview | null;
  currency?: Currency;
}

export const MarketOverviewCards: React.FC<MarketOverviewCardsProps> = ({ overview, currency = 'USD' }) => {
  if (!overview) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="fintech-card p-4 h-24 animate-pulse bg-slate-800/40" />
        ))}
      </div>
    );
  }

  const {
    total_market_cap_usd,
    market_cap_change_24h_pct,
    total_volume_24h_usd,
    volume_change_24h_pct,
    btc_dominance_pct,
    fear_greed_score,
    fear_greed_label,
    active_cryptos
  } = overview;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono">
      {/* Total Market Cap */}
      <div className="fintech-card p-4 space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>TOTAL MARKET CAP</span>
          <DollarSign className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-xl font-bold text-slate-100">
          {formatCompactCurrency(total_market_cap_usd, currency)}
        </div>
        <div
          className={`text-xs font-semibold ${
            market_cap_change_24h_pct >= 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {market_cap_change_24h_pct >= 0 ? '▲ +' : '▼ '}
          {market_cap_change_24h_pct.toFixed(2)}% 24h
        </div>
      </div>

      {/* 24H Volume */}
      <div className="fintech-card p-4 space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>24H VOLUME</span>
          <Activity className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-xl font-bold text-slate-100">
          {formatCompactCurrency(total_volume_24h_usd, currency)}
        </div>
        <div
          className={`text-xs font-semibold ${
            volume_change_24h_pct >= 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {volume_change_24h_pct >= 0 ? '▲ +' : '▼ '}
          {volume_change_24h_pct.toFixed(2)}% 24h
        </div>
      </div>

      {/* BTC Dominance */}
      <div className="fintech-card p-4 space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>BTC DOMINANCE</span>
          <PieChart className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-xl font-bold text-slate-100">{btc_dominance_pct}%</div>
        <div className="text-xs text-slate-500">Bitcoin Market Share</div>
      </div>

      {/* Fear & Greed Index */}
      <div className="fintech-card p-4 space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>FEAR & GREED</span>
          <Smile className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>{fear_greed_score}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-normal">
            {fear_greed_label}
          </span>
        </div>
        <div className="text-xs text-slate-500">Market Sentiment Index</div>
      </div>

      {/* Active Assets */}
      <div className="fintech-card p-4 space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>ACTIVE CRYPTOS</span>
          <Layers className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="text-xl font-bold text-slate-100">{active_cryptos.toLocaleString()}+</div>
        <div className="text-xs text-slate-500">Tracked Market Assets</div>
      </div>
    </div>
  );
};
