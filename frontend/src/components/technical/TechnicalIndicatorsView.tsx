import React from 'react';
import type { TechnicalAnalysisResult } from '../../types/crypto';
import { Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface TechnicalIndicatorsViewProps {
  technicalData: TechnicalAnalysisResult | null;
  symbol: string;
}

export const TechnicalIndicatorsView: React.FC<TechnicalIndicatorsViewProps> = ({
  technicalData,
  symbol
}) => {
  if (!technicalData) {
    return (
      <div className="fintech-card p-8 text-center text-slate-400">
        Loading technical indicator metrics for {symbol}...
      </div>
    );
  }

  const { signal, signal_score, indicators, rationale_points, summary_text, current_price } = technicalData;

  const getSignalBadgeColor = (sig: string) => {
    switch (sig) {
      case 'STRONG_BUY':
      case 'BUY':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 glow-green';
      case 'STRONG_SELL':
      case 'SELL':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40 glow-red';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  const indicatorCategories = ['Trend', 'Momentum', 'Volatility'];

  return (
    <div className="space-y-6">
      {/* Top Banner: Technical Signal Gauge Card */}
      <div className="fintech-card p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>Calculated Technical Engine • {symbol}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 font-mono">
              ${current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              {summary_text}
            </p>
          </div>

          {/* Main Calculated Signal Badge */}
          <div className="flex items-center gap-6 bg-[#161C27] p-5 rounded-xl border border-slate-800 shrink-0">
            <div>
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Technical Signal</span>
              <div
                className={`mt-1 text-lg font-black font-mono px-4 py-1.5 rounded-lg border text-center ${getSignalBadgeColor(
                  signal
                )}`}
              >
                {signal.replace('_', ' ')}
              </div>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Composite Score</span>
              <span className="text-xl font-bold font-mono text-slate-100 block">
                {signal_score > 0 ? `+${signal_score}` : signal_score}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Range: [-1.0, +1.0]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rationale Points Section */}
      <div className="fintech-card p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          Signal Calculation Rationale
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rationale_points.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#161C27] border border-slate-800 text-xs text-slate-300"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators Grid by Category */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-100 font-mono">
          Indicator Breakdown Matrix
        </h3>

        {indicatorCategories.map((cat) => {
          const catIndicators = Object.values(indicators).filter((ind) => ind.category === cat);
          if (catIndicators.length === 0) return null;

          return (
            <div key={cat} className="fintech-card p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                {cat} Indicators
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {catIndicators.map((ind) => {
                  const isBullish = ind.interpretation.toLowerCase().includes('bullish') || ind.interpretation.toLowerCase().includes('oversold') || ind.interpretation.toLowerCase().includes('golden');
                  const isBearish = ind.interpretation.toLowerCase().includes('bearish') || ind.interpretation.toLowerCase().includes('overbought') || ind.interpretation.toLowerCase().includes('death');

                  return (
                    <div
                      key={ind.name}
                      className="p-3.5 rounded-lg bg-[#161C27] border border-slate-800 space-y-2 font-mono"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{ind.name}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            isBullish
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : isBearish
                              ? 'bg-rose-500/20 text-rose-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {ind.interpretation}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-slate-100">
                        {typeof ind.value === 'number' ? ind.value.toLocaleString() : ind.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
