import React, { useState } from 'react';
import {
  Handshake,
  Download,
  Building2,
  Globe,
  FileCheck,
  Send,
  CheckCircle2,
  Mail,
  Phone,
  Compass,
} from 'lucide-react';
import { StorageService } from '../services/storage';

interface PartnersPageProps {
  setCurrentTab: (tab: string) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ setCurrentTab }) => {
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partnerType, setPartnerType] = useState('foundation');
  const [interestSector, setInterestSector] = useState('wells');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.logAction(
      'super_admin',
      'طلب شراكة / تمويل مانح جديد',
      orgName || 'جهة مانحة',
      `اهتمام بقطاع: ${interestSector} من ${contactPerson} (${email})`
    );
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#17365D] via-[#0878C9] to-[#12588F] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D9AE52] text-xs font-bold border border-white/15">
            بوابة المؤسسات والمنظمات المانحة
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight">
            الشراكات الاستراتيجية والجهات المانحة
          </h1>
          <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
            نرحب بالتعاون مع الصناديق الخيرية، والمؤسسات المانحة الإقليمية والدولية، وروابط المغتربين السودانيين لتنفيذ مشاريع إنسانية نوعية ذات أثر مستدام في السودان.
          </p>

          <div className="pt-2">
            <button
              onClick={() => alert('جاري تحميل الملف التعريفي المؤسسي (Profile PDF) لمنظمة أبو الأيتام')}
              className="px-6 py-3 rounded-2xl bg-[#D9AE52] hover:bg-[#c49a40] text-[#17365D] font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>تحميل الملف التعريفي المؤسسي للمنظمة (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Strategic Value Proposition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878C9] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">وصول ميداني موثوق في 9 ولايات</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            فرقنا الميدانية وكوادرنا التطوعية متواجدة على الأرض في خطوط الاحتياج الحقيقي بأرياف ومخيمات السودان، مما يضمن التنفيذ السريع والمباشر.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-[#18864B] flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">تقارير موثقة وإسناد هندسي</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            نوفر للشركاء تقارير دورية معززة بإحداثيات GPS، وفحوصات معملية للمياه، ومحاضر استلام موثقة دون أي مساس بكرامة المستفيدين.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D9AE52] flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">امتثال مالي وقانوني كامل</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            حسابات مصرفية نظامية تخضع للرقابة المالية المعتمدة بالسودان، مع إمكانية التنسيق المباشر لمقترحات المشاريع (Project Proposals).
          </p>
        </div>
      </div>

      {/* Partner Contact & Project Funding Form */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17365D]">
            نموذج إبداء الرغبة في التمويل أو الشراكة الإنسانية
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            يسعدنا تواصل مسؤولي البرامج والمنح لدى الجهات المانحة لتزويدكم بمقترحات المشاريع المفصلة ودراسات الجدوى الميدانية.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  اسم المؤسسة / الصندوق / الجهة المانحة: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="مثال: مؤسسة العطاء الخيرية / جمعية رعاية الأيتام"
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  اسم ضابط الاتصال أو ممثل الجهة: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="الاسم والصفة الوظيفية"
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  البريد الإلكتروني الرسمي للمراسلات: <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@foundation.org"
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  رقم الهاتف للتنسيق المباشر: <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966xxxxxxxxx أو +249xxxxxxxxx"
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  تصنيف الجهة:
                </label>
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                >
                  <option value="foundation">مؤسسة مانحة / وقف خيري</option>
                  <option value="diaspora">رابطة أو جالية سودانية بالخارج</option>
                  <option value="corporate_csr">مسؤولية مجتمعية لشركة (CSR)</option>
                  <option value="international_ngo">منظمة إنسانية إقليمية أو دولية</option>
                  <option value="major_donor">محسن فردي / متبرع كبير</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  القطاع الإنساني محل الاهتمام والتمويل:
                </label>
                <select
                  value={interestSector}
                  onChange={(e) => setInterestSector(e.target.value)}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                >
                  <option value="wells">حفر الآبار ومحطات المياه بالطاقة الشمسية</option>
                  <option value="orphans">كفالات الأيتام السنوية الجماعية</option>
                  <option value="widows">تمكين الأرامل ومشاريع الإنتاج المنزلي</option>
                  <option value="food">السلال الغذائية والمطابخ المجتمعية</option>
                  <option value="emergency">الإغاثة العاجلة وطوارئ السيول والنزوح</option>
                  <option value="all">حزمة مشاريع متكاملة</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                تفاصيل الشراكة أو المشروع المقترح أو الميزانية المتوقعة:
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب هنا رغبتكم في رعاية مشروع محدد أو الولاية المستهدفة وسيتولى مكتب الشراكات إعداد مسودة العقد ودراسة الجدوى الفنية..."
                className="w-full bg-[#F5F7FA] border border-gray-200 rounded-2xl p-3.5 text-xs text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              />
            </div>

            <button
              type="submit"
              className="py-3.5 px-8 rounded-xl bg-[#0878C9] hover:bg-[#0661a3] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>إرسال طلب الشراكة والمقترح الفني</span>
            </button>
          </form>
        ) : (
          <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#18864B] mx-auto" />
            <h3 className="text-lg font-black text-[#17365D]">
              شكراً لاهتمامكم الكريم بالشراكة معنا
            </h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              تم استلام بيانات مؤسستكم الموقرة بنجاح، وسيقوم مسؤول الشراكات والعلاقات المؤسسية بالتواصل معكم خلال 24 ساعة عبر البريد الإلكتروني والهاتف.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
