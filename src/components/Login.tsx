import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, Activity, Flame, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (password: string) => void;
  onGetPassword: () => void;
  prefilledPassword?: string;
  generatedKey?: string;
}

export default function Login({ onLogin, onGetPassword }: LoginProps) {
  const [onlineNodes, setOnlineNodes] = useState(1648);
  const [connectingServer, setConnectingServer] = useState<string | null>(null);
  const [sysStability, setSysStability] = useState(99.98);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineNodes((prev) => {
        const diff = Math.floor(Math.random() * 15) - 7;
        return Math.max(1450, Math.min(1850, prev + diff));
      });
      setSysStability((prev) => Math.max(99.94, Math.min(99.99, prev + (Math.random() > 0.5 ? 0.01 : -0.01))));
    }, 1300);

    return () => clearInterval(interval);
  }, []);

  const handleServerSelect = () => {
    setConnectingServer('main');
    // Secure tunnel handshake simulation
    setTimeout(() => {
      onGetPassword();
    }, 1200);
  };

  return (
    <div
      id="login-main-screen"
      className="min-h-screen bg-[#000000] text-slate-100 flex flex-col justify-between py-10 px-4 relative overflow-hidden select-none"
    >
      {/* Immersive red/black design backdrops */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-red-600/[0.05] to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/[0.03] rounded-full blur-[130px] pointer-events-none" />

      {/* Futuristic Navigation Header */}
      <div
        id="elegant-top-bar"
        className="w-full max-w-md mx-auto flex items-center justify-between px-4.5 py-3 rounded-2xl bg-neutral-950 backdrop-blur-3xl border border-red-600/25 shadow-[0_0_20px_rgba(239,68,68,0.1)] relative z-10"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-red-500 p-[1px] bg-neutral-950 shadow-[0_0_12px_rgba(239,68,68,0.3)] flex items-center justify-center">
            {/* Elegant SVG Red Apple */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500 fill-current">
              <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,22c-1.34,0-1.77-.82-3.31-.82s-2,.8-3.32.85C7.69,22.09,6.71,20.8,5.88,19.62,4.17,17.17,2.87,12.68,4.61,9.66c.86-1.5,2.41-2.45,4.1-2.48,1.29,0,2.5.89,3.29.89s2.22-1.07,3.75-.91a5.07,5.07,0,0,1,4,2.22,4.89,4.89,0,0,0-2.35,4.12,4.9,4.9,0,0,0,2.89,4.45C19.93,18.49,19.34,18.57,18.71,19.5ZM15.91,5a4.87,4.87,0,0,0,1.13-3.52,4.9,4.9,0,0,0-3.21,1.65,4.72,4.72,0,0,0-1.18,3.37A4.27,4.27,0,0,0,15.91,5Z" />
            </svg>
          </div>
          <span className="text-xs font-mono tracking-[0.2em] text-white font-extrabold uppercase">
            APPLE <span className="text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]">HACK</span>
          </span>
        </div>

        {/* Active nodes HUD indicator */}
        <div className="flex items-center gap-2 bg-red-600/10 border border-red-500/30 px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span className="text-[8.5px] font-mono font-black text-red-400 tracking-wider">
            {onlineNodes} ACTIVE NODES
          </span>
        </div>
      </div>

      {/* Core Dashboard area */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center relative z-10 my-6">
        
        {/* Dynamic Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 mb-4 shadow-[0_0_12px_rgba(239,68,68,0.1)]">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[8.5px] font-mono tracking-[0.15em] text-red-400 font-extrabold uppercase">SECURE GATEWAY PORTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-orbitron tracking-wide text-white uppercase leading-none">
            APPLE <span className="text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] font-extrabold">HACK</span>
          </h2>
          <p className="text-xs font-sans text-slate-400 mt-3 max-w-xs mx-auto leading-relaxed font-bold uppercase tracking-wide">
            ادخل لمطابقة خادم التوقع ومباشرة تفعيل الباقة
          </p>
        </div>

        {/* Diagnostics Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-8 text-center">
          <div className="bg-neutral-950 border border-white/[0.04] p-3 rounded-xl flex flex-col justify-center">
            <span className="text-[8px] font-mono text-neutral-500 uppercase font-bold">STABILITY</span>
            <span className="text-[11px] font-mono text-red-500 font-black mt-1">{sysStability}%</span>
          </div>
          <div className="bg-neutral-950 border border-white/[0.04] p-3 rounded-xl flex flex-col justify-center">
            <span className="text-[8px] font-mono text-neutral-500 uppercase font-bold">ENCRYPTION</span>
            <span className="text-[11px] font-mono text-red-500 font-black mt-1">AES-256 GCM</span>
          </div>
          <div className="bg-neutral-950 border border-white/[0.04] p-3 rounded-xl flex flex-col justify-center">
            <span className="text-[8px] font-mono text-neutral-500 uppercase font-bold">FIREWALL</span>
            <span className="text-[11px] font-mono text-red-500 font-black mt-1">BYPASSED</span>
          </div>
        </div>

        {/* Action area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {connectingServer ? (
              <motion.div
                key="loading-tunnel"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-neutral-950 p-8 rounded-3xl border border-red-500/30 shadow-[0_0_35px_rgba(239,68,68,0.15)] flex flex-col items-center justify-center gap-6 py-16 text-center"
              >
                <div className="relative">
                  {/* Glowing rotating spinner circles */}
                  <div className="w-16 h-16 rounded-full border-2 border-red-600/10 border-t-red-500 animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 rounded-full border border-dashed border-red-500/20 scale-125 animate-pulse" />
                  <Flame className="absolute inset-0 m-auto w-5.5 h-5.5 text-red-500 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-black tracking-[0.2em] text-white uppercase">
                    ESTABLISHING TUNNEL
                  </h3>
                  <p className="text-[10px] font-sans text-red-400 font-bold mt-2.5 uppercase tracking-widest animate-pulse">
                    جاري التوجيه المشفر وفحص جودة الاتصال بالبوابة...
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="start-button-area"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  id="start-activation-btn"
                  type="button"
                  onClick={handleServerSelect}
                  className="w-full relative p-6 rounded-2xl bg-neutral-950 border border-red-600/30 hover:border-red-500/60 hover:bg-neutral-900/40 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group shadow-2xl hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] gap-3"
                >
                  <div className="absolute inset-x-0 bottom-0 h-[3px] bg-red-600 rounded-b-2xl opacity-80 group-hover:bg-red-500 transition-colors" />
                  
                  <div className="p-4 rounded-full bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  
                  <div className="text-center mt-1">
                    <h3 className="text-lg font-black tracking-widest text-white uppercase flex items-center justify-center gap-2">
                      ابدأ التفعيل الآن
                      <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1.5 transition-transform" />
                    </h3>
                    <p className="text-xs font-sans text-slate-400 font-bold mt-1.5 uppercase tracking-wide">
                      رابط خادم التوقعات الفسفورية الحية والذكاء الاصطناعي
                    </p>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cyber Minimalist Footer */}
      <div id="login-footer" className="w-full max-w-md mx-auto text-center relative z-10">
        <p className="text-[8.5px] text-neutral-600 font-mono uppercase tracking-[0.35em] font-extrabold">
          SECURE SHIELD CORE PROTOCOL • APPLE HACK GATEWAY
        </p>
      </div>
    </div>
  );
}
