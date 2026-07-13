import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200; // Fast responsive splash
    const intervalTime = 20;
    const increment = (100 / duration) * intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      id="splash-screen"
      className="fixed inset-0 bg-black/35 backdrop-blur-[1px] flex flex-col justify-between py-16 px-6 select-none z-50 overflow-hidden"
    >
      {/* Red ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Spacer */}
      <div className="h-4" />

      {/* Simplified, Elegant Title Area */}
      <div className="flex flex-col items-center relative z-10 my-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          {/* Crimson Aura backplate */}
          <div className="absolute -inset-10 bg-red-600/20 rounded-full blur-2xl" />
          
          <div className="relative w-28 h-28 rounded-3xl bg-neutral-950 flex items-center justify-center border border-red-600/30 shadow-[0_0_30px_rgba(255,0,51,0.25)] overflow-hidden">
            <img 
              src="https://cdn.phototourl.com/free/2026-07-13-3b44d7af-3f59-4ae9-b6b8-1db9963126cb.jpg" 
              alt="Apple Hack Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Title and subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-[0.25em] text-white font-orbitron select-none leading-none">
            APPLE <span className="text-red-600 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">HACK</span>
          </h1>

          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 font-bold uppercase">
              PREMIUM ACCELERATOR v6.0
            </span>
            <Sparkles className="w-3 h-3 text-red-400" />
          </div>
        </motion.div>
      </div>

      {/* Simplified Loader Area */}
      <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-4 relative z-10">
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-slate-500 font-bold uppercase">
            <span>جاري التحميل...</span>
            <span className="text-red-500 font-black">{Math.min(100, Math.round(progress))}%</span>
          </div>

          <div className="w-full h-[6px] bg-neutral-900 rounded-full border border-white/[0.05] relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-800 to-red-500 rounded-full transition-all duration-75 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Pulse glow dot */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-400 rounded-full blur-[2px]" />
            </div>
          </div>
        </div>

        {/* Quiet copyright info */}
        <div className="text-[9px] text-neutral-700 font-mono tracking-widest uppercase mt-2">
          SECURE CONNECTION • BY VIP TEAM
        </div>
      </div>
    </div>
  );
}
