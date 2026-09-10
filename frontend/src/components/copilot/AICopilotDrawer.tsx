import React, { useState, useRef, useEffect } from 'react';
import type { CopilotMessage } from '../../types/crypto';
import { cryptoApi } from '../../services/api';
import { BrainCircuit, X, Send, Sparkles, User, Bot, RefreshCcw } from 'lucide-react';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSymbol: string;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  selectedSymbol
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      sender: 'copilot',
      text: `Hello! I am your **CRYPTONEX AI Copilot**.\nI analyze real-time market data, FinBERT sentiment, technical indicators, and ML forecasting models.\n\nHow can I help you analyze **${selectedSymbol}** today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptChips = [
    `Why is ${selectedSymbol} moving today?`,
    `Analyze ${selectedSymbol} technical indicators`,
    `What is the FinBERT sentiment?`,
    `7-day ML price prediction for ${selectedSymbol}`,
    `Evaluate portfolio risk & VaR`
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isThinking, isOpen]);

  const handleSend = async (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: CopilotMessage = {
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    try {
      const response = await cryptoApi.chatWithCopilot(promptText, selectedSymbol);
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error("Copilot Chat Error:", err);
      const fallbackMsg: CopilotMessage = {
        sender: 'copilot',
        text: `⚠️ Unable to connect to AI Copilot service. Please verify backend connection.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  // Inline Formatter for markdown syntax (bold **text**, bullets • / -, section headers)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      // Split on bold syntax **...**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const lineContent = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-cyan-300">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      const isHeader =
        line.startsWith('📊 ') ||
        line.startsWith('⚡ ') ||
        line.startsWith('🧠 ') ||
        line.startsWith('🔮 ') ||
        line.startsWith('🐋 ') ||
        line.startsWith('🛡️ ') ||
        line.startsWith('🎯 ') ||
        line.startsWith('🤖 ');

      if (isHeader) {
        return (
          <div key={lIdx} className="font-bold text-slate-100 mt-2 mb-1.5 text-xs tracking-wide">
            {lineContent}
          </div>
        );
      }

      if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
        return (
          <div key={lIdx} className="flex items-start gap-1.5 ml-1.5 my-1">
            <span className="text-cyan-400 font-bold">•</span>
            <span className="flex-1 leading-relaxed">{lineContent}</span>
          </div>
        );
      }

      return (
        <div key={lIdx} className={line.trim() === '' ? 'h-2' : 'my-0.5 leading-relaxed'}>
          {lineContent}
        </div>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-[#0F141C] border-l border-slate-800 shadow-2xl z-50 flex flex-col justify-between font-sans">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-[#121721]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 font-mono">CRYPTONEX AI Copilot</h3>
            <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Context: {selectedSymbol} Intelligence
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Close Copilot"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages Stream */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4 font-mono text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[88%] p-3.5 rounded-xl space-y-1 ${
                msg.sender === 'user'
                  ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-100 rounded-tr-none'
                  : 'bg-[#161C27] border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              <div>{renderFormattedText(msg.text)}</div>
              <span className="text-[9px] text-slate-500 block text-right pt-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2">
            <RefreshCcw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>AI Copilot analyzing multi-factor metrics...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Chips & Input Bar */}
      <div className="p-4 border-t border-slate-800/80 bg-[#121721] space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 rounded-full bg-[#161C27] border border-slate-800 hover:border-cyan-500/50 text-[10px] text-slate-300 font-mono whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {chip}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputPrompt);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={`Ask Copilot about ${selectedSymbol}...`}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 bg-[#161C27] border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isThinking}
            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-50 transition-all shadow-md shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
