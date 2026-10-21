import React from 'react';
import {
  Heart,
  Shield,
  Phone,
  Mail,
  MapPin,
  Lock,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Radio,
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openAudioStudio?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openAudioStudio }) => {
  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#17365D] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-lg border-2 border-white overflow-hidden">
                <img src="/assets/aistudio/IMG-20261020-WA0007_92126746.jpg" alt="شعار المنظمة" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-sans">
                  منظمة أبو الأيتام
                </h3>
                <p className="text-xs font-bold text-[#D9AE52]">
                  لرعاية وكفالة الأيتام والأرامل
                </p>
                <p className="text-[11px] text-gray-300">
                  منظمة سودانية وطنية إنسانية
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              منظمة وطنية إنسانية مستقلة، تأسست بروح التكافل والشهامة السودانية الأصيلة لتقديم رعاية شاملة للأيتام والأرامل، وتأمين المياه النقية والغذاء والمساعدات الطارئة في كافة ولايات السودان بكرامة وشفافية مطلقة.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-blue-100 flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[#18864B] shrink-0" />
              <span>
                <strong>التزام الصرامة الإنسانية:</strong> لا ننشر صوراً تنتهك كرامة الأسر، ونخضع كافة التبرعات والمشاريع لتدقيق مالي وقانوني مستقل.
              </span>
            </div>

            {openAudioStudio && (
              <button
                onClick={openAudioStudio}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#D9AE52]/20 hover:bg-[#D9AE52]/30 text-[#D9AE52] border border-[#D9AE52]/30 text-xs font-bold transition"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>الاستماع للإعلان الصوتي الحماسي (عامية سودانية)</span>
              </button>
            )}
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 rounded-full bg-[#0878C9]" />
              روابط المنصة
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition">
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition">
                  عن المنظمة ورسالتنا
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sectors')} className="hover:text-white transition">
                  مجالات العمل الإنساني (10)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-white transition">
                  المشاريع الإنسانية النشطة
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('orphans')} className="hover:text-white transition">
                  برنامج كفالة الأيتام
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('donations')} className="hover:text-white transition font-bold text-[#D9AE52]">
                  طرق التبرع المعتمدة
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('volunteers')} className="hover:text-white transition">
                  التطوع مع فريق المنظمة
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Beneficiaries & Governance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 rounded-full bg-[#18864B]" />
              المستفيدين والشفافية
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => handleNav('apply-help')} className="hover:text-white transition font-bold text-emerald-300">
                  تقديم طلب مساعدة إنسانية
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('track-help')} className="hover:text-white transition">
                  الاستعلام عن حالة الطلب
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('transparency')} className="hover:text-white transition">
                  ميثاق الشفافية والتقارير
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('child-protection')} className="hover:text-white transition">
                  سياسة حماية وصون الأطفال
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-white transition">
                  سياسة خصوصية البيانات
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partners')} className="hover:text-white transition">
                  بوابة الجهات المانحة والشراكات
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-white transition text-blue-300 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>دخول الكادر الإداري</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Field Presence in Sudan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 rounded-full bg-[#D9AE52]" />
              التواجد الميداني في السودان
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0878C9] shrink-0 mt-0.5" />
                <span>
                  <strong>المقر الرئيسي للمنظمة:</strong> السودان - الخرطوم.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>مدير المنظمة:</strong> الأستاذ على الله عطاء المنان فرج الله.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9AE52] shrink-0" />
                <span>
                  موبايل: <a href="tel:00249123843772" dir="ltr" className="font-mono text-gray-200 hover:text-white">00249123843772</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  واتساب: <a href="https://wa.me/249966020666" target="_blank" rel="noopener noreferrer" dir="ltr" className="font-mono text-gray-200 hover:text-white">00249966020666</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0878C9] shrink-0" />
                <span className="font-mono text-gray-200">contact@aboalaytam-sudan.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Principles */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} منظمة أبو الأيتام لرعاية وكفالة الأيتام والأرامل - السودان. جميع الحقوق محفوظة.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>منظمة وطنية غير ربحية</span>
            </span>
            <button onClick={() => handleNav('transparency')} className="hover:text-white transition">
              مكافحة الاحتيال
            </button>
            <button onClick={() => handleNav('child-protection')} className="hover:text-white transition">
              حماية الأطفال
            </button>
            <button onClick={() => handleNav('privacy')} className="hover:text-white transition">
              الخصوصية
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
