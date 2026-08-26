import React, { useState } from 'react';
import type { PortfolioSummary } from '../../types/crypto';
import { MonteCarloCard } from './MonteCarloCard';
import {
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  PieChart as PieIcon,
  ShieldAlert
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

interface PortfolioViewProps {
  portfolio: PortfolioSummary | null;
  onAddHolding: (symbol: string, quantity: number, price: number) => void;
  onDeleteHolding: (id: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  portfolio,
  onAddHolding,
  onDeleteHolding
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState('SOL');
  const [newQty, setNewQty] = useState('10');
  const [newPrice, setNewPrice] = useState('180');

  if (!portfolio) {
    return (
      <div className="fintech-card p-8 text-center text-slate-400">
        Calculating portfolio risk and asset allocations...
      </div>
    );
  }

  const {
    total_value_usd,
    total_invested_usd,
    total_profit_loss_usd,
    total_profit_loss_pct,
    risk_level,
    volatility_annualized,
    sharpe_ratio,
    max_drawdown_pct,
    holdings,
    performance_history
  } = portfolio;

  const isProfitable = total_profit_loss_usd >= 0;
  const COLORS = ['#00F2FE', '#818CF8', '#F59E0B', '#10B981', '#EC4899'];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddHolding(newSymbol.toUpperCase(), parseFloat(newQty), parseFloat(newPrice));
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Value */}
        <div className="fintech-card p-5 space-y-1 font-mono">
          <span className="text-xs text-slate-400">TOTAL PORTFOLIO VALUE</span>
          <div className="text-2xl font-black text-slate-100">
            ${total_value_usd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 block">Live Market Valuation</span>
        </div>

        {/* Total Invested */}
        <div className="fintech-card p-5 space-y-1 font-mono">
          <span className="text-xs text-slate-400">INVESTED CAPITAL</span>
          <div className="text-2xl font-black text-slate-300">
            ${total_invested_usd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 block">Total Cost Basis</span>
        </div>

        {/* Total P&L */}
        <div className="fintech-card p-5 space-y-1 font-mono">
          <span className="text-xs text-slate-400">TOTAL PROFIT / LOSS</span>
          <div className={`text-2xl font-black flex items-center gap-1 ${isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isProfitable ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            {isProfitable ? '+' : ''}
            ${Math.abs(total_profit_loss_usd).toLocaleString()} ({isProfitable ? '+' : ''}
            {total_profit_loss_pct.toFixed(2)}%)
          </div>
          <span className="text-[10px] text-slate-500 block">All-Time ROI</span>
        </div>

        {/* Risk Score */}
        <div className="fintech-card p-5 space-y-1 font-mono">
          <span className="text-xs text-slate-400">PORTFOLIO RISK SCORE</span>
          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-black px-3 py-1 rounded border ${
                risk_level === 'HIGH'
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : risk_level === 'MEDIUM'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}
            >
              {risk_level} RISK
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block">Volatility & Concentration Engine</span>
        </div>
      </div>

      {/* Monte Carlo Risk Simulation & VaR */}
      <MonteCarloCard />

      {/* Allocation & Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Allocation Donut */}
        <div className="fintech-card p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-cyan-400" />
            Asset Allocation
          </h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={holdings}
                  dataKey="current_value_usd"
                  nameKey="symbol"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {holdings.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#0F141C] border border-slate-700 p-2 rounded text-xs font-mono text-slate-200">
                          <span className="font-bold text-cyan-400">{data.symbol}</span>: ${data.current_value_usd.toLocaleString()} ({data.allocation_pct}%)
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Line Chart */}
        <div className="fintech-card p-5 lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 font-mono">
            Portfolio Growth vs Invested Capital (30D)
          </h3>
          <div className="h-[220px] w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performance_history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748B" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis
                  orientation="right"
                  stroke="#64748B"
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  tickFormatter={(v) => `$${v.toLocaleString()}`}
                />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#0F141C] border border-slate-700 p-2 rounded text-xs font-mono text-slate-200 space-y-1">
                          <div className="text-cyan-400 font-bold">{label}</div>
                          <div>Value: ${data.portfolio_value.toLocaleString()}</div>
                          <div>Invested: ${data.invested_capital.toLocaleString()}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="portfolio_value" stroke="#00F2FE" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="invested_capital" stroke="#64748B" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Portfolio Risk Analytics Engine Matrix */}
      <div className="fintech-card p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          Quantitative Risk Factor Matrix
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-3.5 rounded-lg bg-[#161C27] border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">ANNUALIZED VOLATILITY</span>
            <div className="text-lg font-bold text-slate-100">{(volatility_annualized * 100).toFixed(1)}%</div>
            <span className="text-[10px] text-slate-500">Standard deviation of daily returns</span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#161C27] border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">SHARPE RATIO</span>
            <div className="text-lg font-bold text-emerald-400">{sharpe_ratio}</div>
            <span className="text-[10px] text-slate-500">Risk-adjusted return ratio</span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#161C27] border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">MAXIMUM DRAWDOWN</span>
            <div className="text-lg font-bold text-amber-400">-{max_drawdown_pct}%</div>
            <span className="text-[10px] text-slate-500">Peak to trough historical decline</span>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="fintech-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100 font-mono">My Asset Holdings</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Asset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] bg-[#161C27]">
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4 text-right">Quantity</th>
                <th className="py-3 px-4 text-right">Avg Purchase Price</th>
                <th className="py-3 px-4 text-right">Current Price</th>
                <th className="py-3 px-4 text-right">Current Value</th>
                <th className="py-3 px-4 text-right">Profit / Loss</th>
                <th className="py-3 px-4 text-right">Allocation</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {holdings.map((item) => {
                const pos = item.profit_loss_usd >= 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-100">{item.asset_name} ({item.symbol})</td>
                    <td className="py-3.5 px-4 text-right text-slate-200">{item.quantity}</td>
                    <td className="py-3.5 px-4 text-right text-slate-300">${item.purchase_price_usd.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right text-slate-100 font-bold">${item.current_price_usd.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-cyan-400">${item.current_value_usd.toLocaleString()}</td>
                    <td className={`py-3.5 px-4 text-right font-bold ${pos ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {pos ? '+' : ''}${item.profit_loss_usd.toLocaleString()} ({pos ? '+' : ''}{item.profit_loss_pct}%)
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300">{item.allocation_pct}%</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onDeleteHolding(item.id)}
                        className="p-1.5 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Holding Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121721] border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 font-mono">
            <h3 className="text-lg font-bold text-slate-100">Add Portfolio Holding</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Asset Symbol</label>
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Quantity</label>
                <input
                  type="number"
                  step="any"
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Purchase Price ($ USD)</label>
                <input
                  type="number"
                  step="any"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
