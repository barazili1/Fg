import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Download,
  Copy,
  User,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Activity,
  X
} from 'lucide-react';

interface ConditionPageProps {
  initialPlatform: '1xbet' | 'melbet';
  onBack: () => void;
  onSubmit: (userId: string, platform: '1xbet' | 'melbet', subPlatform: string, depositScreenshot: string, promoScreenshot: string) => void;
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export default function ConditionPage({ initialPlatform, onBack, onSubmit }: ConditionPageProps) {
  const [platform, setPlatform] = useState<'1xbet' | 'melbet'>(initialPlatform);
  const [subPlatform, setSubPlatform] = useState<string>(initialPlatform + ' vip');
  const [userId, setUserId] = useState('');

  // Verification task completed statuses
  const [telegramJoined, setTelegramJoined] = useState(false);
  const [platformInstalled, setPlatformInstalled] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  // Submit loading states
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState(0);
  const [verifyStatusText, setVerifyStatusText] = useState('جاري تهيئة قناة الاتصال...');

  // Sync initial platform when it changes in parent
  useEffect(() => {
    setPlatform(initialPlatform);
    setSubPlatform(initialPlatform + ' vip');
  }, [initialPlatform]);

  const getPromoCode = () => {
    return 'TOP1';
  };

  const handleCopyPromo = () => {
    navigator.clipboard.writeText(getPromoCode());
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSocialClick = (url: string, type: 'telegram') => {
    window.open(url, '_blank');
    if (type === 'telegram') {
      setTelegramJoined(true);
    }
  };

  const handleInstallClick = () => {
    setShowDownloadDialog(true);
  };

  const handleDownloadPlatform = (selected: '1xbet' | 'melbet') => {
    const url = selected === '1xbet' ? 'https://eg-1xbet.com/ar/mobile' : 'https://melbetegypt.com/en/mobile';
    window.open(url, '_blank');
    setPlatformInstalled(true);
    setShowDownloadDialog(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId.trim()) {
      // Highlight or focus the user id input
      const inputEl = document.getElementById('user-id-input');
      if (inputEl) {
        inputEl.focus();
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Launch futuristic loading overlay
    setIsVerifying(true);
    setVerifyProgress(0);
    setVerifyStatusText('جاري فتح قناة التحقق الآمنة...');

    const verificationSteps = [
      { progress: 18, text: 'جاري فحص اتصال خادم اللاعب ومطابقة الـ ID الرقمي...' },
      { progress: 38, text: 'التحقق من صحة المعطيات وسجلات قناة التليجرام...' },
      { progress: 62, text: `مزامنة كود الخصم المعتمد [${getPromoCode()}] في قاعدة البيانات...` },
      { progress: 85, text: 'استيراد رخصة المرور وتأمين نظام تجنب الحظر لشبكة VIP...' },
      { progress: 100, text: 'تم إنشاء ترخيص VIP بنجاح! جاري تحويلك لبوابة التوقعات...' }
    ];

    let checkIdx = 0;
    const timer = setInterval(() => {
      setVerifyProgress((prev) => {
        const nextVal = prev + 1;
        
        if (checkIdx < verificationSteps.length && nextVal >= verificationSteps[checkIdx].progress) {
          setVerifyStatusText(verificationSteps[checkIdx].text);
          checkIdx++;
        }

        if (nextVal >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVerifying(false);
            onSubmit(
              userId.trim(),
              platform,
              subPlatform,
              'deposit_confirmed',
              'promo_registered'
            );
          }, 500);
          return 100;
        }
        return nextVal;
      });
    }, 40); // ~4 seconds
  };

  // Calculate steps completed
  const completedCount = 
    (telegramJoined ? 1 : 0) + 
    (platformInstalled ? 1 : 0) + 
    1 + // Step 3 (promo code is prefilled/active)
    1 + // Step 4 (passive active)
    (userId.trim().length >= 4 ? 1 : 0);

  return (
    <div
      id="condition-main-screen"
      className="min-h-screen bg-transparent text-slate-100 flex flex-col py-6 px-4 relative overflow-y-auto select-none pb-16 font-sans"
    >
      {/* Mesh and glowing vector lines in crimson red */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto relative z-10 flex-1 flex flex-col">
        
        {/* Navigation / Back */}
        <div className="flex items-center justify-between mb-8">
          <button
            id="back-to-platform"
            onClick={onBack}
            className="group flex items-center gap-2.5 text-slate-400 hover:text-white transition-all text-xs font-black tracking-wider uppercase py-2.5 px-4 rounded-xl bg-neutral-900/60 border border-white/[0.05] hover:border-red-500/30 cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-red-500 group-hover:translate-x-[-3px] transition-transform" />
            <span>رجوع لتغيير المنصة | BACK</span>
          </button>
        </div>

        {/* Title Block */}
        <div className="mb-10 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-500/25 mb-4.5 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[9px] font-mono tracking-[0.25em] text-red-400 font-extrabold uppercase">
              VIP TERMINAL ACCREDITATION
            </span>
          </div>
          
          <h2 className="text-4xl font-black tracking-wider text-white uppercase leading-none mt-1">
            شروط <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.75)] font-extrabold">التفعيل الحصري</span>
          </h2>
          
          <p className="text-xs text-slate-400 mt-3 max-w-md mx-auto leading-relaxed font-semibold">
            نفذ الخطوات الـ 5 البسيطة التالية لربط حسابك وتفعيل خادم التوقعات VIP تلقائياً
          </p>

          {/* Stepper Progress Bar */}
          <div className="mt-8 bg-neutral-950/80 border border-white/[0.05] rounded-2xl p-4 max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-2.5 text-xs">
              <span className="text-red-400 font-black flex items-center gap-1.5 flex-row-reverse">
                <span>خطوات مكتملة</span>
                <span className="font-mono bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">{completedCount}/5</span>
              </span>
              <span className="text-slate-400 font-bold">مستوى التقدم الكلي</span>
            </div>
            
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-[1px] border border-white/[0.03]">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                style={{ width: `${(completedCount / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Vertically Arranged Conditions Stack */}
        <div className="space-y-6 w-full mb-10">
          
          {/* Step 1: Join Telegram */}
          <div className="rounded-3xl p-6 border-2 border-white/[0.03] hover:border-red-500/30 bg-neutral-950/45 backdrop-blur-md shadow-2xl hover:shadow-[0_8px_30px_rgba(239,68,68,0.05)] transition-all duration-300 text-right relative overflow-hidden group">
            {/* Status light badge */}
            <div className="absolute top-5 left-5">
              <span className={`text-[10px] px-3 py-1 rounded-full font-black border transition-all ${
                telegramJoined 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                  : 'bg-amber-500/5 text-amber-400 border-amber-500/20'
              }`}>
                {telegramJoined ? 'مكتمل ✓' : 'مطلوب خطوة 1'}
              </span>
            </div>

            <div className="flex items-center gap-3.5 flex-row-reverse mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center text-sm font-mono font-black text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] shrink-0 group-hover:scale-105 transition-transform">
                ١
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-100">الانضمام لقناة التلجرام</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">تابع كود التفعيل اليومي والتحديثات المباشرة للهاك</p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => handleSocialClick('https://t.me/+M1rJzZZGaRFmOTc0', 'telegram')}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-black/80 border-2 border-white/[0.04] hover:border-red-500/40 hover:bg-red-950/10 transition-all duration-300 flex-row-reverse text-right cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/15 shadow-[0_0_8px_rgba(239,68,68,0.2)] shrink-0">
                  <Send className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200">قناة التليجرام الرسمية للهاك</h4>
                  <p className="text-[9px] text-slate-500 font-bold mt-0.5">انقر هنا للانضمام المباشر</p>
                </div>
              </div>
              
              <span className={`text-[10px] px-4 py-2 rounded-xl font-black transition-all ${
                telegramJoined 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' 
                  : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-[0_0_15px_rgba(239,68,68,0.35)] shadow-md'
              }`}>
                {telegramJoined ? '✓ تم الانضمام' : 'انضمام الآن'}
              </span>
            </button>
          </div>

          {/* Step 2: Download platform app with Dialog Trigger */}
          <div className="rounded-3xl p-6 border-2 border-white/[0.03] hover:border-red-500/30 bg-neutral-950/45 backdrop-blur-md shadow-2xl hover:shadow-[0_8px_30px_rgba(239,68,68,0.05)] transition-all duration-300 text-right relative overflow-hidden group">
            {/* Status light badge */}
            <div className="absolute top-5 left-5">
              <span className={`text-[10px] px-3 py-1 rounded-full font-black border transition-all ${
                platformInstalled 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                  : 'bg-amber-500/5 text-amber-400 border-amber-500/20'
              }`}>
                {platformInstalled ? 'مكتمل ✓' : 'مطلوب خطوة 2'}
              </span>
            </div>

            <div className="flex items-center gap-3.5 flex-row-reverse mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center text-sm font-mono font-black text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] shrink-0 group-hover:scale-105 transition-transform">
                ٢
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-100">تحميل تطبيق المنصة</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">تأكد من تنزيل النسخة المتوافقة لربط الحساب بنجاح</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-black/80 border-2 border-white/[0.04] hover:border-red-500/40 hover:bg-red-950/10 transition-all duration-300 flex-row-reverse text-right cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/15 shadow-[0_0_8px_rgba(239,68,68,0.2)] shrink-0">
                  <Download className="w-4.5 h-4.5 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200">تنزيل النسخة الرسمية المؤمّنة</h4>
                  <p className="text-[9px] text-slate-500 font-bold mt-0.5">انقر للاختيار والتحميل</p>
                </div>
              </div>

              <span className={`text-[10px] px-4 py-2 rounded-xl font-black transition-all ${
                platformInstalled 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' 
                  : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-[0_0_15px_rgba(239,68,68,0.35)] shadow-md'
              }`}>
                {platformInstalled ? '✓ تم التحميل' : 'تحميل الآن'}
              </span>
            </button>
          </div>

          {/* Step 3: Promo code */}
          <div className="rounded-3xl p-6 border-2 border-white/[0.03] hover:border-red-500/30 bg-neutral-950/45 backdrop-blur-md shadow-2xl hover:shadow-[0_8px_30px_rgba(239,68,68,0.05)] transition-all duration-300 text-right relative overflow-hidden group">
            {/* Status light badge */}
            <div className="absolute top-5 left-5">
              <span className="text-[10px] px-3 py-1 rounded-full font-black border bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all">
                مفعّل ونشط ✓
              </span>
            </div>

            <div className="flex items-center gap-3.5 flex-row-reverse mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center text-sm font-mono font-black text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] shrink-0 group-hover:scale-105 transition-transform">
                ٣
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-100">كود الخصم المعتمد</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">يجب التسجيل بهذا الكود لربط حسابك بخادم VIP والحصول على التوقعات الدقيقة</p>
              </div>
            </div>

            <div className="p-4.5 rounded-2xl bg-black/80 border-2 border-red-500/15 hover:border-red-500/35 transition-all duration-300 flex items-center justify-between gap-4 flex-row-reverse">
              <div>
                <span className="text-xs font-black text-slate-300 block">بروموكود التفعيل للهاك:</span>
                <span className="text-[10px] text-red-400 font-bold block mt-0.5">انسخ الكود واكتبه عند إنشاء حساب جديد</span>
              </div>

              <div className="flex items-center gap-2 bg-neutral-900 border-2 border-white/[0.08] py-1.5 px-4 rounded-xl justify-between shadow-inner">
                <span className="font-mono text-lg font-black text-red-500 tracking-wider drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]">
                  {getPromoCode()}
                </span>
                
                <button
                  type="button"
                  onClick={handleCopyPromo}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-all cursor-pointer border border-red-500/20 ml-2"
                  title="نسخ الكود"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Glowing Copy Indicator Toast inline style */}
            {copied && (
              <div className="mt-3 text-center bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl text-emerald-400 text-xs font-black animate-fade-in flex items-center justify-center gap-1.5">
                <span>🔥 تم نسخ كود التفعيل بنجاح! جاهز للتسجيل</span>
              </div>
            )}
          </div>

          {/* Step 4: Minimum deposit */}
          <div className="rounded-3xl p-6 border-2 border-white/[0.03] hover:border-red-500/30 bg-neutral-950/45 backdrop-blur-md shadow-2xl hover:shadow-[0_8px_30px_rgba(239,68,68,0.05)] transition-all duration-300 text-right relative overflow-hidden group">
            {/* Status light badge */}
            <div className="absolute top-5 left-5">
              <span className="text-[10px] px-3 py-1 rounded-full font-black border bg-red-500/10 text-red-400 border-red-500/20 transition-all animate-pulse">
                خطوة 4 معلقة ✖
              </span>
            </div>

            <div className="flex items-center gap-3.5 flex-row-reverse mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center text-sm font-mono font-black text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] shrink-0 group-hover:scale-105 transition-transform">
                ٤
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-100">إيداع الحد الأدنى لتفعيل الرصيد</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">يجب أن يحتوي رصيد حسابك على المبلغ الموضح لتأكيد الهوية النشطة</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/80 border-2 border-white/[0.04] hover:border-red-500/30 transition-all duration-300">
              <div className="text-xs font-black text-white leading-relaxed text-right flex flex-row-reverse justify-start items-center gap-2 flex-wrap">
                <span>الحد الأدنى المطلوب في رصيدك لتفعيل VIP:</span>
                
                <span className="bg-red-500/15 text-red-400 border border-red-500/35 font-extrabold px-3 py-1 rounded-lg shadow-sm font-mono text-sm">
                  {subPlatform.endsWith('vip') ? '300 EGP' : '200 EGP'}
                </span>
                
                <span className="text-neutral-700">|</span>
                
                <span className="bg-red-600 text-white font-extrabold px-2.5 py-1 rounded-lg text-xs font-mono shadow-md">
                  {subPlatform.endsWith('vip') ? '5$' : '3$'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-semibold">المبلغ يظل في حسابك بالكامل كأرصدة قابلة للعب والسحب في أي وقت.</p>
            </div>
          </div>

          {/* Step 5: Player ID submission */}
          <div className="rounded-3xl p-6 border-2 border-white/[0.03] hover:border-red-500/30 bg-neutral-950/45 backdrop-blur-md shadow-2xl hover:shadow-[0_8px_30px_rgba(239,68,68,0.05)] transition-all duration-300 text-right relative overflow-hidden group">
            {/* Status light badge */}
            <div className="absolute top-5 left-5">
              <span className={`text-[10px] px-3 py-1 rounded-full font-black border transition-all ${
                userId.trim().length >= 4 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]' 
                  : 'bg-red-500/5 text-red-400 border-red-500/20'
              }`}>
                {userId.trim().length >= 4 ? 'رقم ID جاهز ✓' : 'مطلوب خطوة 5'}
              </span>
            </div>

            <div className="flex items-center gap-3.5 flex-row-reverse mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border-2 border-red-500/25 flex items-center justify-center text-sm font-mono font-black text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] shrink-0 group-hover:scale-105 transition-transform">
                ٥
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-100">رقم حساب اللاعب (ID)</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">أدخل معرفك الرقمي في الخانة لمطابقة الترخيص وتفعيل نظام الإشارات</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="relative flex items-center bg-black/90 rounded-2xl border-2 border-white/[0.08] focus-within:border-red-500 focus-within:shadow-[0_0_20px_rgba(239,68,68,0.25)] transition-all duration-300 p-1">
                <span className="pl-4 text-slate-500 shrink-0">
                  <User className="w-5 h-5 text-red-500/70" />
                </span>
                
                <input
                  id="user-id-input"
                  type="text"
                  dir="ltr"
                  placeholder="مثال: 529048322"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none py-3 pr-4 font-mono font-black text-sm text-right"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Global Submit Trigger Button */}
        <div className="w-full max-w-md mx-auto mt-2">
          <button
            onClick={handleSubmit}
            className="w-full relative group overflow-hidden py-4.5 rounded-2xl font-sans text-xs font-black cursor-pointer text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] border border-red-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-600 to-red-400 group-hover:opacity-95 transition-all rounded-2xl" />
            <div className="absolute -inset-2 bg-red-600 blur-xl opacity-20 group-hover:opacity-40 transition-all rounded-2xl" />
            
            <span className="relative flex items-center justify-center gap-2 text-white font-black text-sm uppercase tracking-wide">
              <span>إرسال البيانات ومطابقة الخوادم ⚡</span>
            </span>
          </button>
          
          <p className="text-center text-[10px] text-slate-500 font-bold mt-3">بمجرد الإرسال، سيتولى الذكاء الاصطناعي فحص ترخيص الـ ID الخاص بك وفتح خادم التنبؤ تلقائيًا.</p>
        </div>

      </div>

      {/* Futuristic Verification Modal overlay */}
      {isVerifying && (
        <div
          id="verification-modal"
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Visual background details */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.012)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

          <div className="w-full max-w-md text-center relative z-10 flex flex-col items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
              
              <div className="w-24 h-24 rounded-full border-2 border-red-500/50 flex items-center justify-center relative bg-black/90 shadow-2xl">
                <Activity className="w-12 h-12 text-red-500 stroke-[1.25] animate-pulse" />
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-red-500/20 scale-110" />
              </div>
            </div>

            <h4 className="text-xs font-mono tracking-[0.25em] text-slate-400 font-black mb-2 uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-500 animate-bounce" />
              VERIFYING ACCREDITATION
            </h4>
            <p className="text-[11px] font-sans text-red-400 font-black uppercase tracking-wider mb-8 h-10 flex items-center justify-center text-center px-4">
              {verifyStatusText}
            </p>

            {/* Dynamic visual loader */}
            <div className="w-full bg-white/5 h-3.5 rounded-full border border-white/[0.08] p-[2px] mb-4 shadow-inner overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-700 via-red-500 to-red-400 h-full rounded-full transition-all duration-75 relative"
                style={{ width: `${verifyProgress}%` }}
              >
                <div className="absolute -right-1 -top-1 w-5 h-5 bg-red-500 blur-md rounded-full" />
              </div>
            </div>

            <div className="w-full flex items-center justify-between text-[8px] font-mono tracking-widest text-slate-500 font-bold">
              <span>SECURITY LEVEL: ENCRYPTED CORE</span>
              <span className="text-white font-extrabold">{verifyProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Platform Select Download Modal */}
      {showDownloadDialog && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm bg-gradient-to-b from-[#0f0707] to-[#040101] border-2 border-red-500/30 rounded-3xl p-5 shadow-[0_0_35px_rgba(220,38,38,0.2)] relative text-right overflow-hidden"
          >
            {/* Elegant glowing indicator */}
            <div className="absolute top-0 right-1/4 left-1/4 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={() => setShowDownloadDialog(false)}
              className="absolute top-4 left-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mt-2 mb-6 text-center">
              <h3 className="text-base font-black text-white">اختر المنصة للتحميل</h3>
              <p className="text-[10px] text-slate-400 mt-1 font-bold">يرجى تحميل المنصة المعتمدة لتشغيل الهاك بمزامنة دقيقة</p>
            </div>

            <div className="space-y-3">
              {/* Option 1: 1X CASINO */}
              <button
                type="button"
                onClick={() => handleDownloadPlatform('1xbet')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-black/60 border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-950/10 transition-all duration-300 flex-row-reverse text-right cursor-pointer group"
              >
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-black border border-blue-500/20 shrink-0">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsRBeLNrj4EDPxWbAkLLw6DJsJmZMLnwhNMdlhU5HEw&s=10" 
                      alt="1X CASINO" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white group-hover:text-blue-400 transition-colors">تحميل تطبيق 1X CASINO</h4>
                    <p className="text-[9px] text-slate-500 font-bold mt-0.5">الموقع الرسمي للتنزيل</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-black text-blue-400 group-hover:translate-x-[-2px] transition-transform flex items-center gap-1 flex-row-reverse">
                  تحميل 📥
                </span>
              </button>

              {/* Option 2: AVABET */}
              <button
                type="button"
                onClick={() => handleDownloadPlatform('melbet')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-black/60 border border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-950/10 transition-all duration-300 flex-row-reverse text-right cursor-pointer group"
              >
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-black border border-amber-500/20 shrink-0">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9KLV7HEKfqgyWj5wGpcq2N918Gnowqhp6NofT5z7M1bM17a7ezw01G8&s=10" 
                      alt="AVABET" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white group-hover:text-amber-400 transition-colors">تحميل تطبيق AVABET</h4>
                    <p className="text-[9px] text-slate-500 font-bold mt-0.5">الموقع الرسمي للتنزيل</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-black text-amber-400 group-hover:translate-x-[-2px] transition-transform flex items-center gap-1 flex-row-reverse">
                  تحميل 📥
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
