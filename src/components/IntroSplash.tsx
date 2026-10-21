import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

interface IntroSplashProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const OFFICIAL_LOGO_SRC = '/assets/aistudio/IMG-20261020-WA0007_92126746.jpg';

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation over 2.6 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 60);

    // Trigger fade-out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 700);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 300);
  };

  if (!isVisible && !forceShow) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#17365D] via-[#0E2849] to-[#08182B] text-white transition-all duration-700 select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      dir="rtl"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#0878C9]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#18864B]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#D9AE52]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 border border-white/20 transition-all backdrop-blur-md flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
      >
        <span>تخطي المقدمة</span>
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      {/* Main Centerpiece */}
      <div className="relative z-10 max-w-lg w-full px-6 flex flex-col items-center text-center space-y-6">
        {/* Quranic Bismillah */}
        <div className="text-xs sm:text-sm font-serif text-[#D9AE52] tracking-widest opacity-90 animate-fadeIn">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        {/* Logo Container with Golden / Cyan Pulsing Rings */}
        <div className="relative">
          {/* Animated Halo Rings */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#0878C9] via-[#18864B] to-[#D9AE52] opacity-75 blur-md animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute -inset-1 rounded-full bg-white/20 blur-xs" />

          {/* The Exact Official Logo uploaded by User */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white p-2.5 shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white/90">
            <img
              src={OFFICIAL_LOGO_SRC}
              alt="شعار منظمة أبو الأيتام لكفالة ورعاية الأيتام"
              className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Title & Slogan */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#D9AE52] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>منظمة سودانية وطنية إنسانية</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug font-sans">
            منظمة أبو الأيتام
          </h1>

          <div className="text-sm sm:text-base font-bold text-[#18864B] bg-white/95 px-4 py-1 rounded-full inline-block shadow-md">
            لكفالة ورعاية الأيتام والأرامل
          </div>

          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-md mx-auto pt-1 leading-relaxed">
            "معاً لرعاية الأيتام، وإغاثة المحتاجين، وصناعة الأمل"
          </p>

          <div className="text-[11px] text-[#D9AE52] font-semibold">
            السودان - الخرطوم
          </div>
        </div>

        {/* Progress Bar Shimmer */}
        <div className="w-64 space-y-2 pt-2">
          <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#0878C9] via-[#18864B] to-[#D9AE52] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
            <span>جاري تهيئة المنصة الإنسانية...</span>
            <span>{Math.min(100, Math.round(progress))}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
