import React, { useState } from 'react';
import { CryptonexLogo } from '../logo/CryptonexLogo';
import { Mail, Lock, User, ArrowRight, CheckCircle, Wallet, X, KeyRound, LogIn, UserPlus, ShieldCheck } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: (user: { name: string; email: string; role: string }) => void;
  initialMode?: 'login' | 'signup';
}

const getRegisteredUsers = () => {
  const saved = localStorage.getItem('cryptonex_registered_users');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return {};
    }
  }
  return {
    'trader@cryptonex.ai': {
      name: 'Alex Mercer',
      email: 'trader@cryptonex.ai',
      password: 'password123',
      role: 'Institutional Pro'
    }
  };
};

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);

    const emailClean = loginEmail.toLowerCase().trim();
    
    setTimeout(() => {
      const users = getRegisteredUsers();
      const existingUser = users[emailClean];

      if (existingUser) {
        if (existingUser.password !== loginPassword) {
          setLoginError('Invalid password. Please check your credentials.');
          setLoading(false);
          return;
        }
        
        onAuthSuccess({
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role || 'Pro Member'
        });
      } else {
        // Auto register & log in clean credentials
        const emailName = loginEmail ? loginEmail.split('@')[0] : 'Trader';
        const formattedName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
        const newUser = {
          name: formattedName,
          email: emailClean,
          password: loginPassword,
          role: 'Pro Member'
        };
        users[emailClean] = newUser;
        localStorage.setItem('cryptonex_registered_users', JSON.stringify(users));

        onAuthSuccess({
          name: formattedName,
          email: emailClean,
          role: 'Pro Member'
        });
      }
      setLoading(false);
    }, 400);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (signupPassword !== confirmPassword) {
      setSignupError('Passwords do not match. Please verify your confirmation password.');
      return;
    }

    if (signupPassword.length < 4) {
      setSignupError('Password must be at least 4 characters long.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const users = getRegisteredUsers();
      const userKey = signupEmail.toLowerCase().trim();

      const newUser = {
        name: fullName || 'Crypto Trader',
        email: userKey,
        password: signupPassword,
        role: 'Pro Member'
      };

      users[userKey] = newUser;
      localStorage.setItem('cryptonex_registered_users', JSON.stringify(users));

      onAuthSuccess({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      });
      setLoading(false);
    }, 400);
  };

  const handleQuickFill = () => {
    setLoginEmail('trader@cryptonex.ai');
    setLoginPassword('password123');
  };

  const handleDemoAccess = () => {
    onAuthSuccess({
      name: 'Alex Mercer',
      email: 'alex.mercer@cryptonex.ai',
      role: 'Institutional Pro'
    });
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0E14] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Authentic Login Card */}
      <div className="w-full max-w-md bg-[#0F141C] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative z-10 font-sans">
        {/* Card Header: Brand Logo & Title */}
        <div className="text-center space-y-2">
          <div className="inline-block mb-1">
            <CryptonexLogo size={54} />
          </div>

          <h2 className="text-xl font-bold font-mono text-slate-100">
            {mode === 'login' ? 'Sign In to CRYPTONEX' : 'Create your CRYPTONEX Account'}
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            {mode === 'login'
              ? 'Enter your account credentials to access the AI intelligence terminal.'
              : 'Unlock AI predictions, FinBERT sentiment, and Monte Carlo risk analytics.'}
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        <div className="flex bg-[#161C27] p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setLoginError(null);
            }}
            className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              mode === 'login' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setSignupError(null);
            }}
            className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              mode === 'signup' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* LOGIN FORM MODE */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono">
            {loginError && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="text-xs text-slate-400 block mb-1.5" htmlFor="login-email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="name@company.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5" htmlFor="login-password">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            {/* Quick Credentials Info Box */}
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-between text-[11px] font-sans text-cyan-300">
              <div className="space-y-0.5 font-mono">
                <div className="font-bold flex items-center gap-1 text-cyan-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Default Pro Credentials
                </div>
                <div className="text-[10px] text-slate-400">trader@cryptonex.ai / password123</div>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 font-mono text-[10px] font-bold transition-all"
              >
                Auto Fill
              </button>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs font-sans text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                />
                <span>Remember session</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(true);
                  setResetSent(false);
                }}
                className="text-cyan-400 hover:underline font-mono text-[11px]"
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              {loading ? 'Authenticating...' : 'Sign In to Terminal'}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Bottom Footer Switcher */}
            <div className="text-center pt-1 text-xs font-sans text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setSignupError(null);
                }}
                className="text-cyan-400 font-semibold font-mono hover:underline ml-1"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {/* SIGNUP FORM MODE */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5 font-mono">
            {signupError && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs">
                {signupError}
              </div>
            )}

            <div>
              <label className="text-xs text-slate-400 block mb-1" htmlFor="signup-name">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="signup-name"
                  type="text"
                  placeholder="e.g. Sarah Connor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1" htmlFor="signup-email">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="signup-email"
                  type="email"
                  placeholder="name@company.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1" htmlFor="signup-pass">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="signup-pass"
                  type="password"
                  placeholder="••••••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1" htmlFor="confirm-pass">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="confirm-pass"
                  type="password"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#161C27] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 pt-3"
            >
              {loading ? 'Registering Account...' : 'Create Account & Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mode Switcher Footer */}
            <div className="text-center pt-2 text-xs font-sans text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setLoginError(null);
                }}
                className="text-cyan-400 font-semibold font-mono hover:underline ml-1"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Quick Demo Instant Access Bar */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleDemoAccess}
            className="w-full py-2 px-3 rounded-lg bg-cyan-950/60 border border-cyan-800/50 hover:bg-cyan-900/60 text-cyan-300 text-[11px] font-mono flex items-center justify-center gap-2 transition-colors"
          >
            <Wallet className="w-3.5 h-3.5 text-cyan-400" />
            1-Click Institutional Pro Access
          </button>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-mono">
          <div className="bg-[#121721] border border-slate-800 p-6 rounded-2xl w-full max-w-sm space-y-4 relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-cyan-400">
              <KeyRound className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-100">Reset CRYPTONEX Password</h3>
            </div>

            {resetSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Password Reset Link Dispatched
                </div>
                <p className="text-[11px] text-emerald-400 leading-relaxed font-sans">
                  We have dispatched a password reset authorization link to <strong>{resetEmail || 'your email'}</strong>. Please check your inbox.
                </p>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-2 bg-emerald-900 hover:bg-emerald-800 rounded text-xs font-bold text-emerald-100 mt-2"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Enter your registered work email address below to receive password recovery instructions.
                </p>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Registered Email</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full bg-[#161C27] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
