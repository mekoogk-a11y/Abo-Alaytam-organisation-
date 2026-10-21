import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Lock,
  UserCheck,
  FileCheck,
} from 'lucide-react';
import { OrphanProfile } from '../types';
import { StorageService } from '../services/storage';

interface OrphanSponsorshipPageProps {
  setCurrentTab: (tab: string) => void;
  orphans: OrphanProfile[];
  onSponsorOrphan?: (orphan: OrphanProfile) => void;
}

export const OrphanSponsorshipPage: React.FC<OrphanSponsorshipPageProps> = ({
  setCurrentTab,
  orphans,
  onSponsorOrphan,
}) => {
  const [selectedOrphan, setSelectedOrphan] = useState<OrphanProfile | null>(null);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorPhone, setSponsorPhone] = useState('');
  const [sponsorshipPledged, setSponsorshipPledged] = useState(false);

  const handlePledgeSponsorship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrphan) return;

    selectedOrphan.isSponsored = true;
    selectedOrphan.sponsorCode = 'SP-' + Math.floor(1000 + Math.random() * 9000);
    StorageService.saveOrphan(selectedOrphan);
    StorageService.logAction(
      'caseworker_admin',
      'تخصيص كفالة يتيم جديدة',
      selectedOrphan.code,
      `تمت كفالة اليتيم ${selectedOrphan.code} بواسطة ${sponsorName || 'كافل خير'}`
    );

    setSponsorshipPledged(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#17365D] via-[#0878C9] to-[#18864B] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D9AE52] text-xs font-bold border border-white/15">
            برنامج كفالة ورعاية الأيتام والأرامل
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight">
            "أنا وكافل اليتيم في الجنة هكذا"
          </h1>
          <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
            كفالة شاملة تعتني باليتيم داخل كنف أسرته؛ توفر له المخصصات المعيشية الشهرية، والحقيبة والزي المدرسي، والمتابعة الصحية والتربوية مع الحفاظ المطلق على كرامة الطفل وخصوصية عائلته.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold">
            <span className="flex items-center gap-1 text-emerald-200">
              <ShieldCheck className="w-4 h-4" />
              كفالة نقدية تصل مباشرة للأسرة
            </span>
            <span className="flex items-center gap-1 text-amber-200">
              <FileCheck className="w-4 h-4" />
              تقارير دراسية وصحية دورية للكافل
            </span>
            <span className="flex items-center gap-1 text-blue-200">
              <Lock className="w-4 h-4" />
              حماية تامة للبيانات والصور الخاصة
            </span>
          </div>
        </div>
      </div>

      {/* Child Safeguarding & Privacy Charter */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>ضوابط الخصوصية وصون كرامة الأطفال:</strong> التزاماً بالمعايير الإنسانية الدولية وقانون الطفل، تُعرض حالات الأيتام عبر أكواد تعريفية مشفرة (مثل <span className="font-mono font-bold">YTM-SD-101</span>) ومحافظاتهم واحتياجاتهم الدراسية دون نشر صور وجوههم أو أسمائهم الكاملة. يحصل الكافل على تقرير متابعة خاص وموثق بعد إتمام الكفالة.
        </div>
      </div>

      {/* Available Orphans for Sponsorship */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#0878C9] uppercase tracking-wider block mb-1">
              حالات موثقة ومعتمدة ميدانياً
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
              ملفات الأيتام بانتظار الكفالة
            </h2>
          </div>
          <div className="text-xs text-gray-500">
            تكلفة الكفالة الشهرية الشاملة: <strong>120,000 ج.س / 45 دولار شهرياً</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orphans.map((orphan) => {
            const age = new Date().getFullYear() - orphan.birthYear;
            return (
              <div
                key={orphan.id}
                className={`bg-white rounded-3xl p-6 border transition flex flex-col justify-between ${
                  orphan.isSponsored
                    ? 'border-gray-200 opacity-75 bg-gray-50/70'
                    : 'border-gray-200/90 hover:border-[#0878C9] hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Top Bar of card */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="font-mono text-sm font-bold text-[#0878C9] bg-blue-50 px-2.5 py-0.5 rounded-lg">
                      {orphan.code}
                    </span>
                    {orphan.isSponsored ? (
                      <span className="text-[11px] font-bold text-gray-500 px-2.5 py-1 rounded-full bg-gray-100 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        تمت الكفالة بحمد الله
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-[#18864B] px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
                        متاح للكفالة الآن
                      </span>
                    )}
                  </div>

                  {/* Summary Details */}
                  <div className="py-4 space-y-2.5 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-400">العمر والجنس:</span>
                      <span className="font-bold text-[#17365D]">
                        {age} سنوات ({orphan.gender === 'male' ? 'ذكر' : 'أنثى'})
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">المرحلة الدراسية:</span>
                      <span className="font-bold text-[#17365D]">{orphan.educationalStage}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">الولاية:</span>
                      <span className="font-bold text-[#17365D] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#0878C9]" />
                        {orphan.state}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">الحالة الصحية:</span>
                      <span className="font-semibold text-gray-800">{orphan.healthStatus}</span>
                    </div>

                    {/* Needs Tags */}
                    <div className="pt-2">
                      <span className="text-gray-400 block text-[11px] mb-1">الاحتياجات ذات الأولوية:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {orphan.needs.map((need, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#F5F7FA] text-gray-600 text-[10px] font-medium"
                          >
                            {need}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">قيمة الكفالة:</span>
                    <span className="text-xs font-black text-[#18864B] font-mono">
                      {orphan.monthlySponsorshipCostSDG.toLocaleString('ar-EG')} ج.س / شهر
                    </span>
                  </div>

                  {!orphan.isSponsored ? (
                    <button
                      onClick={() => {
                        setSelectedOrphan(orphan);
                        setSponsorshipPledged(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0878C9] hover:bg-[#0661a3] text-white text-xs font-bold transition flex items-center gap-1 shadow-sm active:scale-95"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current text-red-200" />
                      <span>اكفل هذا اليتيم</span>
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 font-mono">
                      كود الكافل: {orphan.sponsorCode}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sponsorship Modal */}
      {selectedOrphan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-right space-y-6 shadow-2xl border border-gray-200">
            {!sponsorshipPledged ? (
              <form onSubmit={handlePledgeSponsorship} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <h3 className="text-lg font-black text-[#17365D]">
                    تأكيد كفالة اليتيم: <span className="font-mono text-[#0878C9]">{selectedOrphan.code}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelectedOrphan(null)}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                  >
                    إلغاء
                  </button>
                </div>

                <div className="bg-[#F5F7FA] p-4 rounded-2xl text-xs space-y-1.5 text-gray-700">
                  <div>المرحلة: <strong>{selectedOrphan.educationalStage}</strong></div>
                  <div>الموقع: <strong>{selectedOrphan.state}</strong></div>
                  <div>المبلغ الشهري: <strong>{selectedOrphan.monthlySponsorshipCostSDG.toLocaleString('ar-EG')} ج.س ($45 USD)</strong></div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    اسم الكافل الكريم (أو فاعل خير):
                  </label>
                  <input
                    type="text"
                    required
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    placeholder="اسم الكافل"
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    رقم الهاتف / الواتساب لإرسال التقارير الدورية:
                  </label>
                  <input
                    type="tel"
                    required
                    value={sponsorPhone}
                    onChange={(e) => setSponsorPhone(e.target.value)}
                    placeholder="09xxxxxxxx أو +966xxxxxxxxx"
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#18864B] hover:bg-[#146f3e] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current text-red-200" />
                  <span>تأكيد الكفالة وإصدار ملف المتابعة</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-green-100 text-[#18864B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-[#17365D]">
                  هنيئاً لك مرافقة النبي في الجنة
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  تم تسجيل كفالتكم لليتيم <strong>{selectedOrphan.code}</strong> بنجاح. سيتواصل معكم منسق الرعاية الأسرية عبر الواتساب لتزويدكم بسند القبض الرسمي ومواعيد استلام تقرير المتابعة الأول.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedOrphan(null)}
                    className="w-full py-3 rounded-xl bg-[#0878C9] text-white text-xs font-bold"
                  >
                    تم، شكراً لكم
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
