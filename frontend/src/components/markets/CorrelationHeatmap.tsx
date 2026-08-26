import React from 'react';
import type { CorrelationMatrix } from '../../types/crypto';
import { Grid } from 'lucide-react';

interface CorrelationHeatmapProps {
  correlationData: CorrelationMatrix | null;
}

export const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({ correlationData }) => {
  if (!correlationData) return null;

  const { symbols, matrix } = correlationData;

  const getBgColor = (val: number) => {
    if (val === 1.0) return 'bg-slate-800 text-slate-400 font-bold';
    if (val > 0.7) return 'bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40';
    if (val > 0.4) return 'bg-emerald-500/15 text-emerald-400';
    if (val > 0) return 'bg-slate-800/80 text-slate-300';
    if (val < -0.1) return 'bg-rose-500/30 text-rose-300 font-bold border border-rose-500/40';
    return 'bg-rose-500/15 text-rose-400';
  };

  return (
    <div className="fintech-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
            <Grid className="w-4 h-4 text-cyan-400" />
            Multi-Asset Cross Correlation Heatmap (30D)
          </h3>
          <p className="text-xs text-slate-400">
            Calculated Pearson correlation coefficients between crypto assets and traditional benchmarks
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs font-mono border-collapse">
          <thead>
            <tr>
              <th className="p-2 border border-slate-800 bg-[#161C27] text-slate-400">Asset</th>
              {symbols.map((sym) => (
                <th key={sym} className="p-2 border border-slate-800 bg-[#161C27] text-cyan-400 font-bold">
                  {sym}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {symbols.map((rowSym, rIdx) => (
              <tr key={rowSym}>
                <td className="p-2 border border-slate-800 bg-[#161C27] text-cyan-400 font-bold text-left">
                  {rowSym}
                </td>
                {symbols.map((colSym, cIdx) => {
                  const val = matrix[rIdx][cIdx];
                  return (
                    <td key={colSym} className={`p-2 border border-slate-800 ${getBgColor(val)}`}>
                      {val > 0 && val !== 1.0 ? `+${val}` : val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
