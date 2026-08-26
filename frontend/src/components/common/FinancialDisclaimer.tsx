import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const FinancialDisclaimer: React.FC = () => {
  return (
    <footer className="mt-12 p-4 rounded-xl bg-[#0F141C] border border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-start gap-3">
      <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
      <div>
        <span className="font-bold text-slate-400 block mb-0.5">FINANCIAL & LEGAL DISCLAIMER</span>
        CRYPTONEX provides algorithmic analytical insights, technical calculations, and sentiment scores strictly for educational and research purposes. It does not constitute financial advice, investment recommendations, or guarantees of future price performance.
      </div>
    </footer>
  );
};
