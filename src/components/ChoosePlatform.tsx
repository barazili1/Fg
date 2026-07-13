import { motion } from 'motion/react';
import { ArrowLeft, Shield, Sparkles, Trophy, Zap } from 'lucide-react';

interface ChoosePlatformProps {
  onSelect: (platform: '1xbet' | 'melbet') => void;
  onBack?: () => void;
}

export default function ChoosePlatform({ onSelect, onBack }: ChoosePlatformProps) {
  return (
    <div
      id="choose-platform-screen"
      className="min-h-screen bg-transparent text-slate-100 flex flex-col py-6 px-4 relative overflow-y-auto select-none pb-12"
    >
      {/* Red ambient mesh background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar Component */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between border-b border-white/[0.06] pb-4 mb-8">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/[0.05]"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-400 font-extrabold uppercase">
              APPLE HACK VIP
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4 text-red-500" />
          <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider">
            SECURE PORT
          </span>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center">
        {/* Main Header Text */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-3 shadow-[0_0_12px_rgba(239,68,68,0.1)]">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[9px] font-mono tracking-[0.2em] text-red-400 font-black uppercase">
              PLATFORM CONFIGURATION
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-sans text-white">
            اختر <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.7)] font-extrabold">المنصة</span> الخاصة بك
          </h2>
          <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed font-semibold">
            يرجى اختيار المنصة التي تريد ربط السيرفر وتوليد التوقعات عليها
          </p>
        </div>

        {/* Platforms Stack */}
        <div className="space-y-4 w-full">
          {/* 1X CASINO Card */}
          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect('1xbet')}
            className="w-full relative group text-right rounded-2xl p-5 border border-white/[0.08] hover:border-red-500/50 bg-gradient-to-l from-neutral-950 to-neutral-900/90 hover:from-neutral-950 hover:to-red-950/20 shadow-xl transition-all overflow-hidden flex items-center justify-between gap-4 cursor-pointer"
          >
            {/* Soft background light */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Left side: Arrow indicator / Action */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-500 group-hover:border-red-400 text-slate-400 group-hover:text-white transition-all">
                <Zap className="w-4 h-4 group-hover:animate-bounce" />
              </div>
            </div>

            {/* Right side: Content + Logo */}
            <div className="flex items-center gap-4 flex-row-reverse text-right">
              {/* Customized 1X CASINO Logo Image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-black border border-blue-500/30 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/10 group-hover:border-blue-400/50 transition-all shrink-0">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsRBeLNrj4EDPxWbAkLLw6DJsJmZMLnwhNMdlhU5HEw&s=10" 
                  alt="1X CASINO" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="block text-[10px] font-mono tracking-widest text-blue-400 font-extrabold uppercase mb-0.5">
                  1X CASINO NETWORK
                </span>
                <h3 className="text-lg font-black text-slate-100 font-sans tracking-wide">
                  1X CASINO
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  تفعيل الخادم لتوقعات كازينو 1X والمنصة الشريكة
                </p>
              </div>
            </div>
          </motion.button>

          {/* AVABET Card */}
          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect('melbet')}
            className="w-full relative group text-right rounded-2xl p-5 border border-white/[0.08] hover:border-red-500/50 bg-gradient-to-l from-neutral-950 to-neutral-900/90 hover:from-neutral-950 hover:to-red-950/20 shadow-xl transition-all overflow-hidden flex items-center justify-between gap-4 cursor-pointer"
          >
            {/* Soft background light */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Left side: Arrow indicator / Action */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-500 group-hover:border-red-400 text-slate-400 group-hover:text-white transition-all">
                <Trophy className="w-4 h-4" />
              </div>
            </div>

            {/* Right side: Content + Logo */}
            <div className="flex items-center gap-4 flex-row-reverse text-right">
              {/* Customized AVABET Logo Image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-black border border-amber-500/30 flex items-center justify-center shadow-lg group-hover:shadow-amber-500/10 group-hover:border-amber-400/50 transition-all shrink-0">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9KLV7HEKfqgyWj5wGpcq2N918Gnowqhp6NofT5z7M1bM17a7ezw01G8&s=10" 
                  alt="AVABET" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="block text-[10px] font-mono tracking-widest text-amber-500 font-extrabold uppercase mb-0.5">
                  AVABET ELITE NETWORK
                </span>
                <h3 className="text-lg font-black text-slate-100 font-sans tracking-wide">
                  AVABET
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  تفعيل الخادم المباشر وتوقعات ذكاء AVABET الاصطناعي
                </p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Bottom security assurance */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
            SECURE VERIFICATION LAYER • ALL SYSTEM PORTS LOGGED
          </p>
        </div>
      </div>
    </div>
  );
}
