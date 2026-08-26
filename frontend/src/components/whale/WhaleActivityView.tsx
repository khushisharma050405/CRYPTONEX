import React, { useState } from 'react';
import type { WhaleTransaction } from '../../types/crypto';
import { Fish } from 'lucide-react';

interface WhaleActivityViewProps {
  whales: WhaleTransaction[];
  selectedAssetFilter: string;
  onAssetFilterChange: (asset: string) => void;
}

export const WhaleActivityView: React.FC<WhaleActivityViewProps> = ({
  whales,
  selectedAssetFilter,
  onAssetFilterChange
}) => {
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const assets = ['ALL', 'BTC', 'ETH', 'SOL', 'XRP', 'BNB'];
  const types = ['ALL', 'ACCUMULATION', 'TRANSFER', 'EXCHANGE_INFLOW', 'EXCHANGE_OUTFLOW'];

  const filteredWhales = whales.filter((tx) => {
    const matchType = typeFilter === 'ALL' || tx.transaction_type === typeFilter;
    return matchType;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'ACCUMULATION':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'EXCHANGE_OUTFLOW':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'EXCHANGE_INFLOW':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const totalVolUsd = filteredWhales.reduce((acc, curr) => acc + curr.amount_usd, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="fintech-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Fish className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100 font-mono">
              Whale Transaction Intelligence
            </h2>
            <p className="text-xs text-slate-400">Tracking large wallet movements (&gt; $500k USD) and exchange liquidity flows</p>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs bg-[#161C27] px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-500 block text-[10px]">TRACKED VOLUME</span>
            <span className="text-slate-100 font-bold text-sm">
              ${(totalVolUsd / 1e6).toFixed(1)}M USD
            </span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">TRANSACTIONS</span>
            <span className="text-slate-100 font-bold text-sm">{filteredWhales.length}</span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="fintech-card p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Asset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Asset:</span>
          <div className="flex items-center gap-1 bg-[#161C27] p-1 rounded-lg border border-slate-800">
            {assets.map((a) => (
              <button
                key={a}
                onClick={() => onAssetFilterChange(a)}
                className={`px-2.5 py-1 rounded transition-all ${
                  selectedAssetFilter === a ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Type Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Type:</span>
          <div className="flex items-center gap-1 bg-[#161C27] p-1 rounded-lg border border-slate-800">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded transition-all ${
                  typeFilter === t ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="fintech-card p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] bg-[#161C27]">
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4 text-right">Amount (Coins)</th>
                <th className="py-3 px-4 text-right">USD Value</th>
                <th className="py-3 px-4">From Wallet</th>
                <th className="py-3 px-4">To Wallet</th>
                <th className="py-3 px-4 text-center">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredWhales.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 text-slate-400">{tx.timestamp}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-100">{tx.asset}</td>
                  <td className="py-3.5 px-4 text-right text-slate-200">
                    {tx.amount_coins.toLocaleString()} {tx.asset}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-cyan-400">
                    ${(tx.amount_usd / 1e6).toFixed(2)}M
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 truncate max-w-[140px]">{tx.from_address}</td>
                  <td className="py-3.5 px-4 text-slate-300 truncate max-w-[140px]">{tx.to_address}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded border ${getTypeBadge(tx.transaction_type)}`}>
                      {tx.transaction_type.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
