import React, { useState } from 'react';
import type { PriceAlert } from '../../types/crypto';
import { Bell, Plus, Trash2, CheckCircle, AlertTriangle, Power } from 'lucide-react';

interface PriceAlertsViewProps {
  alerts: PriceAlert[];
  onCreateAlert: (symbol: string, condition: string, price: number) => void;
  onToggleAlert: (id: string) => void;
  onDeleteAlert: (id: string) => void;
}

export const PriceAlertsView: React.FC<PriceAlertsViewProps> = ({
  alerts,
  onCreateAlert,
  onToggleAlert,
  onDeleteAlert
}) => {
  const [showModal, setShowModal] = useState(false);
  const [assetSymbol, setAssetSymbol] = useState('BTC');
  const [condition, setCondition] = useState('ABOVE');
  const [targetPrice, setTargetPrice] = useState('100000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAlert(assetSymbol, condition, parseFloat(targetPrice));
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="fintech-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100 font-mono">
              Custom Price Alerts Engine
            </h2>
            <p className="text-xs text-slate-400">Configure target threshold triggers for real-time notification alerts</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create New Alert
        </button>
      </div>

      {/* Alerts Grid */}
      <div className="fintech-card p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] bg-[#161C27]">
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4">Condition</th>
                <th className="py-3 px-4 text-right">Target Price</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {alerts.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-100">{a.asset_symbol}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        a.condition === 'ABOVE'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      Price {a.condition}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-cyan-400">
                    ${a.target_price_usd.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{a.created_at}</td>
                  <td className="py-3.5 px-4 text-center">
                    {a.triggered ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center gap-1 w-24 mx-auto">
                        <AlertTriangle className="w-3 h-3" />
                        TRIGGERED
                      </span>
                    ) : a.active ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-1 w-24 mx-auto">
                        <CheckCircle className="w-3 h-3" />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-500 flex items-center justify-center gap-1 w-24 mx-auto">
                        DISABLED
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onToggleAlert(a.id)}
                        className={`p-1.5 rounded transition-colors ${
                          a.active ? 'hover:bg-amber-500/20 text-emerald-400' : 'hover:bg-emerald-500/20 text-slate-500'
                        }`}
                        title={a.active ? 'Disable Alert' : 'Enable Alert'}
                      >
                        <Power className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteAlert(a.id)}
                        className="p-1.5 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete Alert"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Alert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121721] border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 font-mono">
            <h3 className="text-lg font-bold text-slate-100">Create Target Price Alert</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Asset Symbol</label>
                <input
                  type="text"
                  value={assetSymbol}
                  onChange={(e) => setAssetSymbol(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Trigger Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="ABOVE">Price Rises Above Target</option>
                  <option value="BELOW">Price Drops Below Target</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Target Price ($ USD)</label>
                <input
                  type="number"
                  step="any"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                >
                  Create Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
