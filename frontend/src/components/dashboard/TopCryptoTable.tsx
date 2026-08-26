import React, { useState } from 'react';
import type { CryptoAsset, Currency } from '../../types/crypto';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatters';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface TopCryptoTableProps {
  assets: CryptoAsset[];
  onSelectAsset: (symbol: string) => void;
  currency?: Currency;
}

export const TopCryptoTable: React.FC<TopCryptoTableProps> = ({ assets, onSelectAsset, currency = 'USD' }) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof CryptoAsset>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;

  const categories = ['ALL', 'Layer 1', 'DeFi', 'Meme'];

  const handleSort = (field: keyof CryptoAsset) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAssets = assets.filter((a) => {
    if (filterCategory === 'ALL') return true;
    return a.category.toLowerCase() === filterCategory.toLowerCase();
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') {
      return sortDirection === 'asc'
        ? (aVal as string).localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal as string);
    }
    return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const totalPages = Math.ceil(sortedAssets.length / pageSize) || 1;
  const paginatedAssets = sortedAssets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="fintech-card p-5 space-y-4 font-mono">
      {/* Header controls & Category filter pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100">Top Cryptocurrency Intelligence Catalog</h3>
          <p className="text-xs text-slate-400">Select any crypto asset to view full market indicators and ML forecasts</p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 bg-[#161C27] p-1 rounded-lg border border-slate-800 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Cryptocurrencies Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] bg-[#161C27]">
              <th className="py-3 px-3 cursor-pointer" onClick={() => handleSort('rank')}>
                <div className="flex items-center gap-1">
                  <span>Rank</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-3 cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">
                  <span>Coin</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-3 text-right cursor-pointer" onClick={() => handleSort('price_usd')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Price ({currency})</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-3 text-right cursor-pointer" onClick={() => handleSort('change_24h_pct')}>
                <div className="flex items-center justify-end gap-1">
                  <span>24H %</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-3 text-right cursor-pointer" onClick={() => handleSort('change_7d_pct')}>
                <div className="flex items-center justify-end gap-1">
                  <span>7D %</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-3 text-right cursor-pointer" onClick={() => handleSort('market_cap_usd')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Market Cap</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
              <th className="py-3 px-3 text-right cursor-pointer" onClick={() => handleSort('volume_24h_usd')}>
                <div className="flex items-center justify-end gap-1">
                  <span>24H Volume</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {paginatedAssets.map((asset) => {
              const is24hUp = asset.change_24h_pct >= 0;
              const is7dUp = asset.change_7d_pct >= 0;

              return (
                <tr
                  key={asset.symbol}
                  onClick={() => onSelectAsset(asset.symbol)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-3 font-mono text-slate-400">#{asset.rank}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-slate-100">{asset.name}</span>
                      <span className="text-slate-400 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                        {asset.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-100">
                    {formatCurrency(asset.price_usd, currency)}
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono font-bold ${is24hUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {is24hUp ? '+' : ''}{asset.change_24h_pct.toFixed(2)}%
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono font-bold ${is7dUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {is7dUp ? '+' : ''}{asset.change_7d_pct.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-200">
                    {formatCompactCurrency(asset.market_cap_usd, currency)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                    {formatCompactCurrency(asset.volume_24h_usd, currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/60">
        <span className="text-slate-400 font-mono">
          Page {currentPage} of {totalPages} ({sortedAssets.length} Cryptocurrencies)
        </span>
        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 rounded bg-[#161C27] border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1 rounded bg-[#161C27] border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
