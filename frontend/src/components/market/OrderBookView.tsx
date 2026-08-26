import React, { useState, useEffect } from 'react';
import type { OrderBookLiquidation } from '../../types/crypto';
import { cryptoApi } from '../../services/api';
import { Layers } from 'lucide-react';

interface OrderBookViewProps {
  symbol: string;
}

export const OrderBookView: React.FC<OrderBookViewProps> = ({ symbol }) => {
  const [data, setData] = useState<OrderBookLiquidation | null>(null);

  useEffect(() => {
    cryptoApi.getOrderBook(symbol).then(setData).catch(console.error);
  }, [symbol]);

  if (!data) return null;

  const { bids, asks, long_liquidations_24h_usd, short_liquidations_24h_usd, bid_ask_ratio, sentiment_bias } = data;

  return (
    <div className="fintech-card p-5 space-y-4 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Market Depth & Leverage Liquidations ({symbol})
          </h3>
          <p className="text-xs text-slate-400">Order book bid/ask wall pressure & 24h liquidation totals</p>
        </div>

        <div className="flex items-center gap-4 text-xs bg-[#161C27] px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-500 block text-[10px]">24H LONG LIQUIDATIONS</span>
            <span className="text-rose-400 font-bold">${(long_liquidations_24h_usd / 1e6).toFixed(1)}M</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">24H SHORT LIQUIDATIONS</span>
            <span className="text-emerald-400 font-bold">${(short_liquidations_24h_usd / 1e6).toFixed(1)}M</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">BUY/SELL WALL RATIO</span>
            <span className="text-cyan-400 font-bold">{bid_ask_ratio} ({sentiment_bias})</span>
          </div>
        </div>
      </div>

      {/* Two Column Order Book Bids vs Asks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Bids Column */}
        <div className="space-y-2">
          <h4 className="text-emerald-400 font-bold text-xs border-b border-slate-800 pb-1">Bids (Buy Orders)</h4>
          <div className="space-y-1">
            {bids.map((b, idx) => (
              <div key={idx} className="flex justify-between p-1.5 rounded bg-emerald-950/20 text-emerald-300">
                <span>${b.price.toLocaleString()}</span>
                <span>{b.amount} {symbol}</span>
                <span className="text-slate-400">${b.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Asks Column */}
        <div className="space-y-2">
          <h4 className="text-rose-400 font-bold text-xs border-b border-slate-800 pb-1">Asks (Sell Orders)</h4>
          <div className="space-y-1">
            {asks.map((a, idx) => (
              <div key={idx} className="flex justify-between p-1.5 rounded bg-rose-950/20 text-rose-300">
                <span>${a.price.toLocaleString()}</span>
                <span>{a.amount} {symbol}</span>
                <span className="text-slate-400">${a.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
