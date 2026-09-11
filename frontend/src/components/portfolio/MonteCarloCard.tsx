import React, { useState, useEffect } from 'react';
import type { MonteCarloResult } from '../../types/crypto';
import { cryptoApi } from '../../services/api';
import { Activity } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const MonteCarloCard: React.FC = () => {
  const [data, setData] = useState<MonteCarloResult | null>(null);

  useEffect(() => {
    cryptoApi.getMonteCarlo(1000, 30).then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  const { expected_value_usd, var_95_usd, var_95_pct, percentiles_path } = data;

  return (
    <div className="fintech-card p-5 space-y-4 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Monte Carlo Risk Simulation (1,000 Iterations)
          </h3>
          <p className="text-xs text-slate-400">Statistical 30-day Geometric Brownian Motion outcome paths</p>
        </div>

        <div className="flex items-center gap-4 text-xs bg-[#161C27] px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-500 block text-[10px]">95% VALUE AT RISK (VaR)</span>
            <span className="text-rose-400 font-bold">-${var_95_usd.toLocaleString()} (-{var_95_pct}%)</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">EXPECTED VALUE</span>
            <span className="text-emerald-400 font-bold">${expected_value_usd.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Fan Chart */}
      <div className="h-[240px] w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={percentiles_path}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="day" stroke="#64748B" tick={{ fontSize: 10, fill: '#64748B' }} tickFormatter={(d) => `Day ${d}`} />
            <YAxis orientation="right" stroke="#64748B" tick={{ fontSize: 10, fill: '#64748B' }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload as any;
                  return (
                    <div className="bg-[#0F141C] border border-slate-700 p-2.5 rounded text-xs text-slate-200 space-y-1">
                      <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">Day {label} Outcome</div>
                      <div className="text-emerald-400">90th Percentile (Bull): ${d.p90.toLocaleString()}</div>
                      <div className="text-cyan-300">50th Percentile (Median): ${d.p50.toLocaleString()}</div>
                      <div className="text-rose-400">10th Percentile (Bear): ${d.p10.toLocaleString()}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area type="monotone" dataKey="p90" stroke="none" fill="#10B981" fillOpacity={0.15} />
            <Area type="monotone" dataKey="p10" stroke="none" fill="#0B0E14" fillOpacity={0.9} />
            <Line type="monotone" dataKey="p90" stroke="#10B981" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
            <Line type="monotone" dataKey="p50" stroke="#00F2FE" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="p10" stroke="#EF4444" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
