import React, { useState } from 'react';
import { Search, Bell, RefreshCw, ChevronDown, BrainCircuit, Globe, LogOut, Play } from 'lucide-react';
import type { CryptoAsset, Currency } from '../../types/crypto';
import { formatCurrency } from '../../utils/formatters';

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

interface HeaderProps {
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  topAssets: CryptoAsset[];
  onRefresh: () => void;
  alertCount: number;
  onOpenAlerts: () => void;
  onOpenCopilot: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  user: UserProfile | null;
  onLogout: () => void;
  onReplayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedSymbol,
  onSelectSymbol,
  topAssets,
  onRefresh,
  alertCount,
  onOpenAlerts,
  onOpenCopilot,
  currency,
  onCurrencyChange,
  user,
  onLogout,
  onReplayIntro
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'BTC'];

  const filteredAssets = topAssets.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentAsset = topAssets.find((a) => a.symbol === selectedSymbol) || topAssets[0];

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const userInitials = getInitials(user?.name);

  return (
    <header className="h-16 bg-[#0F141C] border-b border-slate-800/80 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 font-sans">
      {/* Unified Search Input & All 10 Crypto Assets Selector */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search crypto asset (BTC, ETH, SOL, BNB, XRP, ADA, DOGE, AVAX, LINK, DOT)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full bg-[#161C27] border border-slate-800 rounded-lg pl-10 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-slate-500 font-mono"
          />

          {/* Search Dropdown Results */}
          {isDropdownOpen && searchQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-[#121721] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 max-h-72 overflow-y-auto font-mono">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <button
                    key={asset.symbol}
                    onClick={() => {
                      onSelectSymbol(asset.symbol);
                      setSearchQuery('');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 flex items-center justify-between text-xs hover:bg-slate-800/60 transition-colors border-b border-slate-800/40 last:border-0"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-slate-200">{asset.name}</span>
                      <span className="text-slate-400 font-mono text-[10px] bg-slate-800/80 px-1.5 py-0.5 rounded">
                        {asset.symbol}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-slate-200 font-medium">
                        {formatCurrency(asset.price_usd, currency)}
                      </span>
                      <span
                        className={`block text-[10px] font-mono ${
                          asset.change_24h_pct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {asset.change_24h_pct >= 0 ? '+' : ''}
                        {asset.change_24h_pct.toFixed(2)}%
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">No matching cryptocurrencies</div>
              )}
            </div>
          )}
        </div>

        {/* Single Unified Coin Selector Pill */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-[#161C27] border border-cyan-500/30 px-3 py-1.5 rounded-lg hover:border-cyan-500/60 transition-all text-xs font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-bold text-slate-200">{selectedSymbol}</span>
            {currentAsset && (
              <span className="font-mono text-cyan-400">
                {formatCurrency(currentAsset.price_usd, currency)}
              </span>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Right Header Status Bar & User Profile */}
      <div className="flex items-center gap-3 font-mono text-xs">
        {/* Currency Switcher */}
        <div className="flex items-center gap-1 bg-[#161C27] p-1 rounded-lg border border-slate-800">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1" />
          {currencies.map((c) => (
            <button
              key={c}
              onClick={() => onCurrencyChange(c)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                currency === c ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* AI Copilot Drawer Trigger */}
        <button
          onClick={onOpenCopilot}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 text-cyan-300 font-bold hover:border-cyan-400 transition-all shadow-sm"
        >
          <BrainCircuit className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>AI Copilot</span>
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="p-2 rounded-lg bg-[#161C27] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
          title="Refresh Market Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onOpenAlerts}
          className="relative p-2 rounded-lg bg-[#161C27] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
        >
          <Bell className="w-4 h-4" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-[10px] font-bold text-slate-950 rounded-full flex items-center justify-center">
              {alertCount}
            </span>
          )}
        </button>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg bg-[#161C27] border border-slate-800 hover:border-slate-700 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 font-bold flex items-center justify-center text-[10px]">
              {userInitials}
            </div>
            <span className="text-slate-200 text-xs font-bold hidden md:inline">{user?.name || 'User Account'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#121721] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 p-3 space-y-2">
              <div className="border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-200 block text-xs">{user?.name || 'User Account'}</span>
                <span className="text-[10px] text-slate-400 block">{user?.email || 'user@cryptonex.ai'}</span>
                <span className="text-[9px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-1.5 py-0.5 rounded font-mono inline-block mt-1">
                  {user?.role || 'Trader Member'}
                </span>
              </div>

              {onReplayIntro && (
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-cyan-400 hover:bg-cyan-950/40 transition-colors font-mono"
                >
                  <Play className="w-4 h-4" />
                  <span>Replay Cinematic Intro</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-950/40 transition-colors font-mono"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Terminal</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
