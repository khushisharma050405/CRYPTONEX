import React, { useState } from 'react';
import { BrainCircuit, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Key, Wallet } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('alex.mercer@cryptonex.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLoginSuccess({
        name: 'Alex Mercer',
        email: email || 'alex.mercer@cryptonex.ai',
        role: 'Institutional Pro'
      });
      setLoading(false);
    }, 600);
  };

  const handleDemoAccess = () => {
    onLoginSuccess({
      name: 'Alex Mercer',
      email: 'alex.mercer@cryptonex.ai',
      role: 'Institutional Pro'
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0E14] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Neon Glow Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-[#0F141C] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Left Side: Brand Feature Highlights */}
        <div className="p-8 bg-gradient-to-b from-[#121721] to-[#0A0D13] border-r border-slate-800/80 flex flex-col justify-between space-y-8">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                  CRYPTONEX
                </h1>
                <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
                  AI Cryptocurrency Intelligence
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-100 font-mono leading-tight mb-3">
              Institutional AI Market & NLP Intelligence
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Access real-time cryptocurrency technical signals, FinBERT sentiment scoring, 1,000 Monte Carlo simulations, and multi-model machine learning forecasts.
            </p>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#161C27] border border-slate-800">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Multi-Model ML Price Forecasting (Random Forest, XGBoost, Neural Nets)</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#161C27] border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>FinBERT NLP News & Social Sentiment Pipeline</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#161C27] border border-slate-800">
                <Key className="w-4 h-4 text-amber-400 shrink-0" />
                <span>1,000 Monte Carlo Risk Simulations & 95% Value at Risk (VaR)</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono">
            CRYPTONEX Terminal v1.1.0 • Protected by 256-Bit SSL Encryption
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-100 font-mono">Terminal Sign In</h3>
            <p className="text-xs text-slate-400 mt-1">Enter your institutional credentials to unlock full intelligence</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-mono">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                />
                <span>Remember session</span>
              </label>
              <a href="#forgot" className="text-cyan-400 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              {loading ? 'Authenticating Terminal...' : 'Sign In to CRYPTONEX'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-800" />
            <span className="bg-[#0F141C] px-3 text-[10px] text-slate-500 font-mono uppercase absolute">
              Instant Access
            </span>
          </div>

          {/* Demo Instant Access Button */}
          <div className="space-y-2 font-mono">
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Wallet className="w-4 h-4 text-indigo-400" />
              Demo Quick Access (One-Click Sign In)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
