import React, { useState } from 'react';
import type { SentimentIntelligence } from '../../types/crypto';
import { TrendingUp, Brain } from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface SentimentIntelligenceViewProps {
  sentimentData: SentimentIntelligence | null;
  symbol: string;
}

export const SentimentIntelligenceView: React.FC<SentimentIntelligenceViewProps> = ({
  sentimentData,
  symbol
}) => {
  const [feedFilter, setFeedFilter] = useState<'ALL' | 'NEWS' | 'SOCIAL'>('ALL');

  if (!sentimentData) {
    return (
      <div className="fintech-card p-8 text-center text-slate-400">
        Analyzing news and social NLP streams for {symbol}...
      </div>
    );
  }

  const {
    overall_sentiment,
    positive_pct,
    neutral_pct,
    negative_pct,
    correlation_with_price,
    correlation_label,
    news_articles,
    social_posts,
    sentiment_trend
  } = sentimentData;

  const allFeed = [...news_articles, ...social_posts];
  const filteredFeed = allFeed.filter((item) => {
    if (feedFilter === 'NEWS') return item.source !== 'Reddit' && item.source !== 'Social Pulse';
    if (feedFilter === 'SOCIAL') return item.source === 'Reddit' || item.source === 'Social Pulse';
    return true;
  });

  const getSentimentBadge = (sent: string) => {
    switch (sent) {
      case 'POSITIVE':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'NEGATIVE':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: FinBERT Sentiment Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Gauge Card */}
        <div className="fintech-card p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <Brain className="w-4 h-4" />
              <span>FinBERT NLP Model Output • {symbol}</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">Model Confidence: 89.4%</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-y border-slate-800/80 py-4">
            <div>
              <span className="text-xs text-slate-400 block font-mono">Overall Market Sentiment</span>
              <div
                className={`text-2xl font-black font-mono mt-1 ${
                  overall_sentiment === 'BULLISH'
                    ? 'text-emerald-400'
                    : overall_sentiment === 'BEARISH'
                    ? 'text-rose-400'
                    : 'text-amber-300'
                }`}
              >
                {overall_sentiment}
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs">
              <div className="text-center">
                <span className="text-emerald-400 font-bold block text-base">{positive_pct}%</span>
                <span className="text-slate-500 text-[10px]">Positive</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <span className="text-slate-400 font-bold block text-base">{neutral_pct}%</span>
                <span className="text-slate-500 text-[10px]">Neutral</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <span className="text-rose-400 font-bold block text-base">{negative_pct}%</span>
                <span className="text-slate-500 text-[10px]">Negative</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            NLP pipeline continuously ingests public financial news and crypto subreddit threads, applying FinBERT
            sentiment extraction to compute market confidence and score rolling distributions.
          </p>
        </div>

        {/* Sentiment vs Price Correlation Box */}
        <div className="fintech-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <TrendingUp className="w-4 h-4" />
            <span>Sentiment / Price Correlation</span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-extrabold font-mono text-slate-100">
              {correlation_with_price >= 0 ? `+${correlation_with_price}` : correlation_with_price}
            </div>
            <div className="text-xs font-semibold text-cyan-400 font-mono">{correlation_label}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#161C27] border border-slate-800 text-[11px] text-slate-400">
            Calculated Pearson correlation coefficient over 30-day historical window. High positive values indicate price strongly follows sentiment momentum.
          </div>
        </div>
      </div>

      {/* Dual Axis Chart: Sentiment Score vs Coin Price */}
      <div className="fintech-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 font-mono">
              Rolling Sentiment vs Price Action (30D)
            </h3>
            <p className="text-xs text-slate-400">Comparing daily NLP sentiment score against asset spot price</p>
          </div>
        </div>

        <div className="h-[280px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sentiment_trend} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="timestamp" stroke="#64748B" tick={{ fontSize: 10, fill: '#64748B' }} />
              <YAxis
                yAxisId="price"
                orientation="right"
                domain={['auto', 'auto']}
                stroke="#64748B"
                tick={{ fontSize: 10, fill: '#64748B' }}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
              />
              <YAxis
                yAxisId="sentiment"
                orientation="left"
                domain={[-1.0, 1.0]}
                stroke="#06B6D4"
                tick={{ fontSize: 10, fill: '#06B6D4' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as any;
                    return (
                      <div className="bg-[#0F141C] border border-slate-700 p-3 rounded-lg shadow-2xl font-mono text-xs text-slate-200 space-y-1">
                        <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1 mb-1">{label}</div>
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-400">Price:</span>
                          <span className="font-bold">${data.price_usd?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-cyan-400">Sentiment Score:</span>
                          <span className="font-bold">{data.sentiment_score}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price_usd"
                stroke="#94A3B8"
                strokeWidth={2}
                dot={false}
                name="Spot Price"
              />
              <Line
                yAxisId="sentiment"
                type="monotone"
                dataKey="sentiment_score"
                stroke="#06B6D4"
                strokeWidth={2.5}
                dot={false}
                name="Sentiment Score"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FinBERT Analyzed Feed Section */}
      <div className="fintech-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 font-mono">
              Live News & Social NLP Feed
            </h3>
            <p className="text-xs text-slate-400">FinBERT sentiment score and confidence ratings for recent articles</p>
          </div>

          <div className="flex items-center gap-1 bg-[#161C27] p-1 rounded-lg border border-slate-800 text-xs font-mono">
            {(['ALL', 'NEWS', 'SOCIAL'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFeedFilter(filter)}
                className={`px-3 py-1 rounded transition-all ${
                  feedFilter === filter ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFeed.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#161C27] border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-semibold">{item.source}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 text-[11px] font-mono">{item.timestamp}</span>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getSentimentBadge(
                    item.sentiment
                  )}`}
                >
                  {item.sentiment} ({Math.round(item.confidence * 100)}%)
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-200 line-clamp-2 leading-snug">
                {item.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
