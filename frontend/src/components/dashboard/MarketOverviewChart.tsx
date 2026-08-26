import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import type { Candle, CryptoAsset } from '../../types/crypto';

interface MarketOverviewChartProps {
  candles: Candle[];
  asset: CryptoAsset | null;
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
}

export const MarketOverviewChart: React.FC<MarketOverviewChartProps> = ({
  candles,
  asset,
  timeframe,
  onTimeframeChange
}) => {
  const timeframes = ['1H', '1D', '1W', '1M', '3M', '1Y', 'ALL'];

  const [overlays, setOverlays] = useState({
    price: true,
    volume: false,
    sma20: true,
    sma50: false,
    ema20: false,
    ema50: false,
    bollinger: false
  });

  const toggleOverlay = (key: keyof typeof overlays) => {
    setOverlays((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isPositive = asset ? asset.change_24h_pct >= 0 : true;

  return (
    <div className="fintech-card p-5 space-y-4">
      {/* Top Header Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-100 font-mono tracking-tight">
              {asset ? asset.name : 'Bitcoin'} <span className="text-slate-400">({asset ? asset.symbol : 'BTC'})</span>
            </h2>
            {asset && (
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isPositive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {isPositive ? '+' : ''}
                {asset.change_24h_pct.toFixed(2)}%
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">Real-Time Technical Price Chart & Overlay Analysis</p>
        </div>

        {/* Financial Metrics Stats Pill */}
        {asset && (
          <div className="flex items-center gap-4 text-xs font-mono bg-[#161C27] px-4 py-2 rounded-lg border border-slate-800">
            <div>
              <span className="text-slate-500 block text-[10px]">CURRENT PRICE</span>
              <span className="text-slate-100 font-bold text-sm">
                ${asset.price_usd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">24H HIGH</span>
              <span className="text-slate-200">${asset.high_24h_usd.toLocaleString()}</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">24H LOW</span>
              <span className="text-slate-200">${asset.low_24h_usd.toLocaleString()}</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">24H VOLUME</span>
              <span className="text-slate-200">${(asset.volume_24h_usd / 1e9).toFixed(2)}B</span>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar: Timeframe & Overlays */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Timeframe Buttons */}
        <div className="flex items-center gap-1 bg-[#161C27] p-1 rounded-lg border border-slate-800">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-2.5 py-1 rounded font-mono font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Technical Overlays Toggles */}
        <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono text-slate-400">
          <span className="text-slate-500">Overlays:</span>
          {[
            { key: 'price', label: 'Price' },
            { key: 'volume', label: 'Volume' },
            { key: 'sma20', label: 'SMA 20' },
            { key: 'sma50', label: 'SMA 50' },
            { key: 'ema20', label: 'EMA 20' },
            { key: 'ema50', label: 'EMA 50' },
            { key: 'bollinger', label: 'Bollinger' },
          ].map((item) => {
            const active = overlays[item.key as keyof typeof overlays];
            return (
              <button
                key={item.key}
                onClick={() => toggleOverlay(item.key as keyof typeof overlays)}
                className={`px-2 py-0.5 rounded border transition-all ${
                  active
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="h-[360px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={candles} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#64748B" tick={{ fontSize: 10, fill: '#64748B' }} />
            <YAxis
              yAxisId="price"
              domain={['auto', 'auto']}
              orientation="right"
              stroke="#64748B"
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickFormatter={(v) => `$${v.toLocaleString()}`}
            />
            {overlays.volume && (
              <YAxis yAxisId="volume" domain={[0, 'auto']} hide={true} />
            )}

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as Candle;
                  return (
                    <div className="bg-[#0F141C] border border-slate-700 p-3 rounded-lg shadow-2xl font-mono text-xs text-slate-200 space-y-1">
                      <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1 mb-1">
                        {label}
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Close:</span>
                        <span className="font-bold text-slate-100">${data.close.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between gap-4 text-[11px]">
                        <span className="text-slate-400">High / Low:</span>
                        <span>${data.high} / ${data.low}</span>
                      </div>
                      {data.sma20 && (
                        <div className="flex justify-between gap-4 text-[11px] text-indigo-400">
                          <span>SMA 20:</span>
                          <span>${data.sma20}</span>
                        </div>
                      )}
                      {data.sma50 && (
                        <div className="flex justify-between gap-4 text-[11px] text-amber-400">
                          <span>SMA 50:</span>
                          <span>${data.sma50}</span>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Volume Bar */}
            {overlays.volume && (
              <Bar yAxisId="volume" dataKey="volume" fill="#334155" opacity={0.4} />
            )}

            {/* Main Price Line */}
            {overlays.price && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="close"
                stroke={isPositive ? '#10B981' : '#EF4444'}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#00F2FE' }}
              />
            )}

            {/* Indicator Overlays */}
            {overlays.sma20 && (
              <Line yAxisId="price" type="monotone" dataKey="sma20" stroke="#818CF8" strokeWidth={1.5} dot={false} />
            )}
            {overlays.sma50 && (
              <Line yAxisId="price" type="monotone" dataKey="sma50" stroke="#F59E0B" strokeWidth={1.5} dot={false} />
            )}
            {overlays.ema20 && (
              <Line yAxisId="price" type="monotone" dataKey="ema20" stroke="#06B6D4" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
            )}
            {overlays.ema50 && (
              <Line yAxisId="price" type="monotone" dataKey="ema50" stroke="#EC4899" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
            )}
            {overlays.bollinger && (
              <>
                <Line yAxisId="price" type="monotone" dataKey="bb_upper" stroke="#94A3B8" strokeWidth={1} strokeDasharray="2 2" dot={false} />
                <Line yAxisId="price" type="monotone" dataKey="bb_lower" stroke="#94A3B8" strokeWidth={1} strokeDasharray="2 2" dot={false} />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
