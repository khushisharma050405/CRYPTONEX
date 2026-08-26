import React, { useState, useEffect } from 'react';
import { CryptonexLogo } from '../logo/CryptonexLogo';
import { ArrowRight, Sparkles, BrainCircuit, LineChart } from 'lucide-react';

interface CinematicIntroProps {
  onContinue: () => void;
  isReturningVisitor?: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onContinue,
  isReturningVisitor = false
}) => {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'hero' | 'exiting'>('logo');

  useEffect(() => {
    if (isReturningVisitor) {
      // Faster progression for returning users
      const timer1 = setTimeout(() => setPhase('tagline'), 400);
      const timer2 = setTimeout(() => setPhase('hero'), 900);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // Smooth cinematic timing for first-time visitors
      const timer1 = setTimeout(() => setPhase('tagline'), 800);
      const timer2 = setTimeout(() => setPhase('hero'), 1600);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isReturningVisitor]);

  const handleContinueClick = () => {
    setPhase('exiting');
    setTimeout(() => {
      onContinue();
    }, 450);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-[#0B0E14] text-slate-100 flex flex-col justify-between p-6 sm:p-12 overflow-hidden transition-opacity duration-500 font-sans ${
      phase === 'exiting' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* Background Financial Pattern Grid & Subtle Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 80px 80px, 80px 80px'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between relative z-10 font-mono text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>CRYPTONEX TERMINAL v1.1</span>
        </div>
        <div>INSTITUTIONAL AI INTELLIGENCE</div>
      </div>

      {/* Main Centered Cinematic Content */}
      <div className="max-w-2xl w-full mx-auto text-center space-y-8 relative z-10 my-auto">
        {/* Logo Section with Fade + Scale Animation */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="transition-all duration-1000 transform scale-110">
            <CryptonexLogo size={80} />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black font-mono tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            CRYPTONEX
          </h1>
        </div>

        {/* Tagline Animation */}
        <div className={`transition-all duration-700 ${
          phase !== 'logo' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-sm sm:text-base font-mono text-cyan-400 tracking-widest uppercase font-semibold">
            AI-Powered Cryptocurrency Intelligence
          </p>
        </div>

        {/* Hero Message & Supporting Text */}
        <div className={`space-y-4 transition-all duration-700 delay-200 ${
          phase === 'hero' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
            Understand the Market. Predict the Trend.
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg mx-auto font-sans">
            AI-powered cryptocurrency analytics combining real-time market data, mathematical technical analysis, FinBERT NLP sentiment, and machine learning time-series forecasting.
          </p>

          {/* Key Intelligence Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141A24] border border-slate-800">
              <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
              ML Forecast Models
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141A24] border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              FinBERT Sentiment
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141A24] border border-slate-800">
              <LineChart className="w-3.5 h-3.5 text-indigo-400" />
              Calculated Signals
            </span>
          </div>

          {/* Prominent Action Button: Sign In / Access Terminal */}
          <div className="pt-6">
            <button
              onClick={handleContinueClick}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-mono font-bold text-sm transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              <span>Sign In to Terminal</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Disclaimer */}
      <div className="text-center relative z-10 font-mono text-[10px] text-slate-600">
        CRYPTONEX DATA SCIENCE & QUANTITATIVE ANALYTICS ENGINE
      </div>
    </div>
  );
};
