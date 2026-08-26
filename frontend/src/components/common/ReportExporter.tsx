import React from 'react';
import type { CryptoAsset, TechnicalAnalysisResult, SentimentIntelligence, AIPrediction } from '../../types/crypto';
import { Download, FileText } from 'lucide-react';

interface ReportExporterProps {
  asset: CryptoAsset | null;
  technical: TechnicalAnalysisResult | null;
  sentiment: SentimentIntelligence | null;
  prediction: AIPrediction | null;
}

export const ReportExporter: React.FC<ReportExporterProps> = ({
  asset,
  technical,
  sentiment,
  prediction
}) => {
  const handleExport = () => {
    if (!asset) return;

    const reportContent = `
# CRYPTONEX INSTITUTIONAL MARKET INTELLIGENCE REPORT
Generated: ${new Date().toLocaleString()}
Asset: ${asset.name} (${asset.symbol})

================================================================================
1. MARKET SUMMARY
--------------------------------------------------------------------------------
Current Price: $${asset.price_usd.toLocaleString()}
24H Change: ${asset.change_24h_pct >= 0 ? '+' : ''}${asset.change_24h_pct}%
24H High / Low: $${asset.high_24h_usd} / $${asset.low_24h_usd}
Market Cap: $${(asset.market_cap_usd / 1e9).toFixed(2)} Billion
24H Volume: $${(asset.volume_24h_usd / 1e9).toFixed(2)} Billion
Circulating Supply: ${asset.circulating_supply.toLocaleString()} ${asset.symbol}

================================================================================
2. CALCULATED TECHNICAL ANALYSIS
--------------------------------------------------------------------------------
Technical Signal: ${technical?.signal || 'N/A'} (Score: ${technical?.signal_score || 0})
Summary: ${technical?.summary_text || ''}

Key Indicators:
- RSI (14): ${technical?.indicators['RSI_14']?.value || 'N/A'} (${technical?.indicators['RSI_14']?.interpretation || ''})
- MACD Line: ${technical?.indicators['MACD_Line']?.value || 'N/A'} (${technical?.indicators['MACD_Line']?.interpretation || ''})
- SMA 50: $${technical?.indicators['SMA_50']?.value || 'N/A'}
- SMA 200: $${technical?.indicators['SMA_200']?.value || 'N/A'}

================================================================================
3. FinBERT NLP SENTIMENT INTELLIGENCE
--------------------------------------------------------------------------------
Overall Sentiment: ${sentiment?.overall_sentiment || 'N/A'}
Distribution: Positive ${sentiment?.positive_pct}% | Neutral ${sentiment?.neutral_pct}% | Negative ${sentiment?.negative_pct}%
Price Correlation: ${sentiment?.correlation_with_price || 0} (${sentiment?.correlation_label || ''})

================================================================================
4. MACHINE LEARNING PRICE FORECAST
--------------------------------------------------------------------------------
Selected Model: ${prediction?.selected_model || 'N/A'}
Target Horizon: ${prediction?.horizon || '7D'}
Predicted Price: $${prediction?.predicted_price.toLocaleString() || 'N/A'} (${prediction?.expected_change_pct}% expected movement)
Model Confidence: ${prediction?.confidence_pct}%
Confidence Interval: [$${prediction?.lower_bound.toLocaleString()} - $${prediction?.upper_bound.toLocaleString()}]

--------------------------------------------------------------------------------
DISCLAIMER: CRYPTONEX reports are generated algorithmically for educational and research purposes only.
================================================================================
`;

    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CRYPTONEX_Report_${asset.symbol}_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#161C27] border border-cyan-500/40 hover:bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold transition-all shadow-sm"
      title="Download Institutional Markdown/PDF Executive Report"
    >
      <FileText className="w-4 h-4" />
      <span>Export Executive Report</span>
      <Download className="w-3.5 h-3.5 ml-0.5" />
    </button>
  );
};
