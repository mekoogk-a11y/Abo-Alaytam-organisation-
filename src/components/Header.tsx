import React, { useState } from 'react';
import {
  Menu,
  X,
  Heart,
  HandHeart,
  Search,
  Globe,
  ShieldCheck,
  Radio,
  FileText,
  UserCheck,
  ChevronDown,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAudioStudio?: () => void;
  replayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  openAudioStudio,
  replayIntro,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ar' | 'en' | 'fr'>('ar');

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'sectors', label: 'مجالات العمل' },
    { id: 'projects', label: 'المشاريع الإنسانية' },
    { id: 'orphans', label: 'كفالة الأيتام' },
    { id: 'donations', label: 'التبرع الشفاف' },
    { id: 'apply-help', label: 'طلب مساعدة' },
    { id: 'track-help', label: 'متابعة الطلب' },
    { id: 'transparency', label: 'الشفافية والتقارير' },
    { id: 'volunteers', label: 'التطوع' },
    { id: 'news', label: 'الأخبار' },
    { id: 'contact', label: 'تواصل معنا' },
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-colors">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#17365D] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-blue-200">
              <span className="w-2 h-2 rounded-full bg-[#18864B] animate-pulse" />
              <span>المقر: السودان - الخرطوم |</span>
              <span>موبايل: <a href="tel:00249123843772" dir="ltr" className="font-mono text-white hover:underline">00249123843772</a> |</span>
              <span>واتساب: <a href="https://wa.me/249966020666" target="_blank" rel="noopener noreferrer" dir="ltr" className="font-mono text-emerald-300 hover:underline">00249966020666</a></span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {openAudioStudio && (
              <button
                onClick={openAudioStudio}
                className="flex items-center gap-1 text-[#D9AE52] hover:text-amber-300 font-bold transition cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>استمع للإعلان الصوتي الحماسي (سوداني)</span>
              </button>
            )}

            {replayIntro && (
              <button
                onClick={replayIntro}
                className="flex items-center gap-1 text-emerald-300 hover:text-emerald-100 transition cursor-pointer"
                title="إعادة تشغيل انترو شعار المنظمة"
              >
                <span>شاهد الانترو</span>
              </button>
            )}

            <button
              onClick={() => handleNav('track-help')}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition"
            >
              <Search className="w-3.5 h-3.5" />
              <span>الاستعلام عن طلب مساعدة</span>
            </button>

            <button
              onClick={() => handleNav('admin')}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة الإدارة</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-gray-200 hover:text-white text-xs px-2 py-0.5 rounded bg-white/10"
              >
                <Globe className="w-3 h-3" />
                <span>{currentLang === 'ar' ? 'العربية' : currentLang === 'en' ? 'English' : 'Français'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langMenuOpen && (
                <div className="absolute left-0 mt-1 w-28 bg-white text-[#17365D] rounded-lg shadow-xl py-1 border border-gray-100 z-50">
                  <button
                    onClick={() => {
                      setCurrentLang('ar');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-right px-3 py-1 text-xs hover:bg-gray-50 flex items-center justify-between ${
                      currentLang === 'ar' ? 'font-bold text-[#0878C9]' : ''
                    }`}
                  >
                    <span>العربية (الأساسية)</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLang('en');
                      setLangMenuOpen(false);
                      alert('English version prepared in structure. All core content is displayed in primary Sudanese national Arabic as requested.');
                    }}
                    className={`w-full text-right px-3 py-1 text-xs hover:bg-gray-50 ${
                      currentLang === 'en' ? 'font-bold text-[#0878C9]' : ''
                    }`}
                  >
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLang('fr');
                      setLangMenuOpen(false);
                      alert('Version française prête en architecture.');
                    }}
                    className={`w-full text-right px-3 py-1 text-xs hover:bg-gray-50 ${
                      currentLang === 'fr' ? 'font-bold text-[#0878C9]' : ''
                    }`}
                  >
                    <span>Français</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Org Name */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3.5 text-right group text-inherit hover:no-underline focus:outline-none"
          >
            <div className="w-13 h-13 md:w-16 md:h-16 rounded-full bg-white p-1 shadow-md flex items-center justify-center shrink-0 border-2 border-blue-200 overflow-hidden">
              <img
                src="/assets/aistudio/IMG-20261020-WA0007_92126746.jpg"
                alt="شعار منظمة أبو الأيتام"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div>
              <div className="text-base md:text-xl font-black text-[#17365D] tracking-tight group-hover:text-[#0878C9] transition font-sans">
                منظمة أبو الأيتام
              </div>
              <div className="text-[11px] md:text-xs text-[#18864B] font-bold">
                لرعاية وكفالة الأيتام والأرامل
              </div>
              <div className="text-[10px] text-gray-500 hidden sm:block">
                منظمة سودانية وطنية إنسانية - السودان الخرطوم
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold text-[#17365D]">
            {navLinks.slice(0, 7).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-3 py-2 rounded-xl transition cursor-pointer ${
                  currentTab === link.id
                    ? 'text-[#0878C9] bg-blue-50 font-bold'
                    : 'text-gray-700 hover:text-[#0878C9] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="relative group">
              <button className="px-3 py-2 rounded-xl text-gray-700 hover:text-[#0878C9] flex items-center gap-1 cursor-pointer">
                <span>المزيد</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block w-48 bg-white rounded-2xl shadow-xl py-2 border border-gray-100 z-50 text-right">
                {navLinks.slice(7).map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#0878C9] hover:bg-blue-50 transition"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="my-1 border-t border-gray-100" />
                <button
                  onClick={() => handleNav('partners')}
                  className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#0878C9] hover:bg-blue-50 transition"
                >
                  الجهات المانحة والشراكات
                </button>
                <button
                  onClick={() => handleNav('admin')}
                  className="w-full text-right px-4 py-2 text-xs font-bold text-[#17365D] hover:bg-blue-50 transition flex items-center justify-between"
                >
                  <span>لوحة الإدارة المركزية</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0878C9]" />
                </button>
              </div>
            </div>
          </nav>

          {/* Action CTAs: Donate Now + Apply for Assistance + PWA Install */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Assistance Request Button */}
            <button
              onClick={() => handleNav('apply-help')}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[#0878C9] text-[#0878C9] hover:bg-blue-50 transition"
            >
              <HandHeart className="w-4 h-4" />
              <span>طلب مساعدة</span>
            </button>

            {/* Donate Now Button */}
            <button
              onClick={() => handleNav('donations')}
              className="flex items-center gap-1.5 px-4 md:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0878C9] to-[#17365D] hover:from-[#0661a3] hover:to-[#0f2440] text-white text-xs md:text-sm font-black shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-red-300 fill-current" />
              <span>تبرع الآن</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {/* Quick Voiceover CTA in Mobile */}
          {openAudioStudio && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAudioStudio();
              }}
              className="w-full mb-3 p-3 rounded-2xl bg-gradient-to-r from-[#17365D] to-[#0878C9] text-white flex items-center justify-between text-xs font-bold shadow"
            >
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#D9AE52] animate-pulse" />
                استمع للإعلان الصوتي الحماسي (سوداني)
              </span>
              <span className="text-[10px] bg-[#D9AE52] text-[#17365D] px-2 py-0.5 rounded font-black">
                تشغيل
              </span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
            <button
              onClick={() => handleNav('donations')}
              className="w-full py-2.5 rounded-xl bg-[#0878C9] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Heart className="w-4 h-4 fill-current text-white" />
              تبرع الآن
            </button>
            <button
              onClick={() => handleNav('apply-help')}
              className="w-full py-2.5 rounded-xl border border-[#0878C9] text-[#0878C9] font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <HandHeart className="w-4 h-4" />
              طلب مساعدة
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-right px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  currentTab === link.id
                    ? 'bg-blue-50 text-[#0878C9]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => handleNav('admin')}
              className="text-xs font-bold text-[#17365D] flex items-center gap-1.5 py-1"
            >
              <ShieldCheck className="w-4 h-4 text-[#0878C9]" />
              لوحة الإدارة المركزية
            </button>
            <button
              onClick={() => handleNav('partners')}
              className="text-xs font-medium text-gray-600 hover:text-[#0878C9]"
            >
              الشراكات والمانحين
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
