import React from 'react';
import type { AIPrediction } from '../../types/crypto';
import {
  BrainCircuit,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface AIPredictionViewProps {
  predictionData: AIPrediction | null;
  symbol: string;
  horizon: string;
  model: string;
  onHorizonChange: (h: string) => void;
  onModelChange: (m: string) => void;
}

export const AIPredictionView: React.FC<AIPredictionViewProps> = ({
  predictionData,
  symbol,
  horizon,
  model,
  onHorizonChange,
  onModelChange
}) => {
  if (!predictionData) {
    return (
      <div className="fintech-card p-8 text-center text-slate-400">
        Training ML forecasting models for {symbol}...
      </div>
    );
  }

  const {
    current_price,
    predicted_price,
    expected_change_pct,
    confidence_pct,
    lower_bound,
    upper_bound,
    forecast_points,
    model_metrics,
    ai_insight_text
  } = predictionData;

  const isUp = expected_change_pct >= 0;

  const horizons = ['1D', '7D', '14D', '30D'];
  const models = ['Random Forest', 'XGBoost', 'LSTM / Neural Net'];

  return (
    <div className="space-y-6">
      {/* Selector Controls Bar */}
      <div className="fintech-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 font-mono">
              AI Price Prediction Model • {symbol}
            </h2>
            <p className="text-xs text-slate-400">Time-series forecasting with technical & sentiment feature embeddings</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          {/* Horizon Selector */}
          <div className="flex items-center gap-1 bg-[#161C27] p-1 rounded-lg border border-slate-800">
            <span className="text-slate-500 px-2">Horizon:</span>
            {horizons.map((h) => (
              <button
                key={h}
                onClick={() => onHorizonChange(h)}
                className={`px-2.5 py-1 rounded transition-all ${
                  horizon === h ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {h}
              </button>
            ))}
          </div>

          {/* Model Selector */}
          <div className="flex items-center gap-1 bg-[#161C27] p-1 rounded-lg border border-slate-800">
            <span className="text-slate-500 px-2">Model:</span>
            {models.map((m) => (
              <button
                key={m}
                onClick={() => onModelChange(m)}
                className={`px-2.5 py-1 rounded transition-all ${
                  model === m ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main KPI Stats Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Price */}
        <div className="fintech-card p-5 space-y-1 font-mono">
          <span className="text-xs text-slate-400">CURRENT PRICE</span>
          <div className="text-2xl font-black text-slate-100">
            ${current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 block">Baseline Spot Price</span>
        </div>

        {/* Predicted Price */}
        <div className="fintech-card p-5 space-y-1 font-mono">
          <span className="text-xs text-slate-400">PREDICTED PRICE ({horizon})</span>
          <div className={`text-2xl font-black ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            ${predicted_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 block">Target ML Forecast</span>
        </div>

        {/* Expected Change */}
        <div className="fintech-card p-5 space-y-1 font-mono">
          <span className="text-xs text-slate-400">EXPECTED CHANGE</span>
          <div className={`text-2xl font-black flex items-center gap-1 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isUp ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            {isUp ? '+' : ''}
            {expected_change_pct.toFixed(2)}%
          </div>
          <span className="text-[10px] text-slate-500 block">Projected % Movement</span>
        </div>

        {/* Confidence Interval */}
        <div className="fintech-card p-5 space-y-1 font-mono">
          <span className="text-xs text-slate-400">MODEL CONFIDENCE</span>
          <div className="text-2xl font-black text-cyan-400">{confidence_pct.toFixed(1)}%</div>
          <span className="text-[10px] text-slate-400 block truncate">
            Range: [${lower_bound.toLocaleString()} - ${upper_bound.toLocaleString()}]
          </span>
        </div>
      </div>

      {/* Actual vs Forecast Chart */}
      <div className="fintech-card p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 font-mono">
              Historical Price vs {model} AI Forecast ({horizon})
            </h3>
            <p className="text-xs text-slate-400">
              Left region shows historical actual close. Right region projects ML forecast path with 95% confidence interval band.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-slate-300 inline-block" />
              <span className="text-slate-400">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-cyan-400 inline-block" />
              <span className="text-cyan-400">Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-cyan-500/20 border border-cyan-500/40 inline-block rounded" />
              <span className="text-slate-400">95% Interval</span>
            </div>
          </div>
        </div>

        <div className="h-[340px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={forecast_points} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="timestamp" stroke="#64748B" tick={{ fontSize: 10, fill: '#64748B' }} />
              <YAxis
                domain={['auto', 'auto']}
                orientation="right"
                stroke="#64748B"
                tick={{ fontSize: 10, fill: '#64748B' }}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as any;
                    return (
                      <div className="bg-[#0F141C] border border-slate-700 p-3 rounded-lg shadow-2xl font-mono text-xs text-slate-200 space-y-1">
                        <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1 mb-1">{label}</div>
                        {data.actual_price && (
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-400">Actual Price:</span>
                            <span className="font-bold">${data.actual_price.toLocaleString()}</span>
                          </div>
                        )}
                        {data.predicted_price && (
                          <div className="flex justify-between gap-4 text-cyan-400">
                            <span>Predicted Price:</span>
                            <span className="font-bold">${data.predicted_price.toLocaleString()}</span>
                          </div>
                        )}
                        {data.lower_bound && (
                          <div className="flex justify-between gap-4 text-[11px] text-slate-500">
                            <span>Confidence Band:</span>
                            <span>
                              [${data.lower_bound.toLocaleString()} - ${data.upper_bound.toLocaleString()}]
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {/* Confidence Interval Band */}
              <Area type="monotone" dataKey="upper_bound" stroke="none" fill="#06B6D4" fillOpacity={0.15} />
              <Area type="monotone" dataKey="lower_bound" stroke="none" fill="#0B0E14" fillOpacity={0.9} />

              <Line type="monotone" dataKey="actual_price" stroke="#E2E8F0" strokeWidth={2.5} dot={false} />
              <Line
                type="monotone"
                dataKey="predicted_price"
                stroke="#06B6D4"
                strokeWidth={2.5}
                strokeDasharray="4 4"
                dot={{ r: 4, fill: '#00F2FE' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Performance Comparison Table */}
      <div className="fintech-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Cross-Validated Model Performance Matrix
            </h3>
            <p className="text-xs text-slate-400">Calculated metrics evaluated on historical out-of-sample test split data</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] bg-[#161C27]">
                <th className="py-3 px-4">Model Name</th>
                <th className="py-3 px-4 text-right">RMSE (Root Mean Sq Error)</th>
                <th className="py-3 px-4 text-right">MAE (Mean Abs Error)</th>
                <th className="py-3 px-4 text-right">R² Score (Variance Explained)</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {model_metrics.map((m) => (
                <tr key={m.model_name} className={m.is_best ? 'bg-cyan-950/30' : ''}>
                  <td className="py-3.5 px-4 font-bold text-slate-200 flex items-center gap-2">
                    {m.model_name}
                    {m.is_best && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-semibold">
                        BEST MODEL
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-300">${m.rmse.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right text-slate-300">${m.mae.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-cyan-400">{m.r2_score}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded ${
                        m.model_name === model
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {m.model_name === model ? 'ACTIVE' : 'STANDBY'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Market Insight Summary Box */}
      <div className="fintech-card p-5 space-y-2 border-l-4 border-l-cyan-500">
        <h4 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          AI Generated Technical Insight Summary
        </h4>
        <p className="text-xs text-slate-300 font-mono whitespace-pre-line leading-relaxed">
          {ai_insight_text}
        </p>
      </div>
    </div>
  );
};
