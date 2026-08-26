import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  LineChart,
  BrainCircuit,
  MessageSquareQuote,
  Fish,
  Wallet,
  Bell,
  Cpu
} from 'lucide-react';

export type NavTab = 
  | 'dashboard' 
  | 'markets' 
  | 'coin' 
  | 'technical' 
  | 'prediction' 
  | 'sentiment' 
  | 'whales' 
  | 'portfolio' 
  | 'alerts';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedSymbol: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, selectedSymbol }) => {
  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'markets', label: 'Markets', icon: TrendingUp },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'coin', label: `${selectedSymbol} Analysis`, icon: LineChart },
        { id: 'technical', label: 'Technical Analysis', icon: Cpu },
        { id: 'prediction', label: 'AI Price Forecast', icon: BrainCircuit },
        { id: 'sentiment', label: 'NLP Sentiment', icon: MessageSquareQuote },
        { id: 'whales', label: 'Whale Activity', icon: Fish },
      ]
    },
    {
      title: 'PORTFOLIO & RISK',
      items: [
        { id: 'portfolio', label: 'My Portfolio & Risk', icon: Wallet },
      ]
    },
    {
      title: 'TOOLS',
      items: [
        { id: 'alerts', label: 'Price Alerts', icon: Bell },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0F141C] border-r border-slate-800/80 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              CRYPTONEX
            </h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-wide uppercase">
              AI Crypto Intelligence
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="p-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as NavTab)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Status */}
      <div className="p-4 border-t border-slate-800/80 bg-[#0B0E14]/50">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            FinBERT ML Engine
          </span>
          <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-1.5 py-0.5 rounded">
            v1.1
          </span>
        </div>
        <p className="text-[10px] text-slate-500 leading-snug">
          Real-Time Market & NLP Intelligence Platform
        </p>
      </div>
    </aside>
  );
};
