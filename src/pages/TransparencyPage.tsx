import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  Scale,
  Download,
  Lock,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  HelpCircle,
} from 'lucide-react';
import { StorageService } from '../services/storage';

interface TransparencyPageProps {
  setCurrentTab: (tab: string) => void;
}

export const TransparencyPage: React.FC<TransparencyPageProps> = ({ setCurrentTab }) => {
  const [complaintType, setComplaintType] = useState('financial_integrity');
  const [complaintDetails, setComplaintDetails] = useState('');
  const [complaintContact, setComplaintContact] = useState('');
  const [complaintSent, setComplaintSent] = useState(false);

  const reports = [
    {
      title: 'التقرير المالي والسنوي المدقق لعام 2025',
      desc: 'بيان ختامي بالحسابات المصرفية ومصارف التبرعات ومحاضر التسليم الميداني معتمد من مكتب مراجع قانوني خارجي.',
      size: '2.4 MB',
      date: 'يناير 2026',
    },
    {
      title: 'تقرير التدخل المائي وسقيا القرى بريف القضارف والبحر الأحمر',
      desc: 'توثيق هندسي ومعملي للمياه المنتجة من المحطات الشمسية وعدد المستفيدين الموثقين وتكلفة التنفيذ.',
      size: '3.8 MB',
      date: 'فبراير 2026',
    },
    {
      title: 'دليل مصفوفة حماية وصون الأطفال المستفيدين',
      desc: 'الوثيقة الإجرائية الملزمة لكافة موظفي وباحثي المنظمة في الميدان لضمان كرامة وأمان الأطفال الأيتام.',
      size: '1.2 MB',
      date: 'مارس 2026',
    },
  ];

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.logAction(
      'super_admin',
      'استلام بلاغ شكوى / مقترح عبر منصة الشفافية',
      'COMPLAINT-' + Date.now(),
      `نوع البلاغ: ${complaintType}`
    );
    setComplaintSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0878C9] text-xs font-bold border border-blue-200">
          <Scale className="w-3.5 h-3.5" />
          <span>ميثاق النزاهة والحوكمة الرشيدة</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          الشفافية، الرقابة، والتقارير المعتمدة
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          نؤمن في منظمة أبو الأيتام بأن ثقة المتبرعين وكرامة المستفيدين هما رأسمالنا الحقيقي؛ لذا نضع كافة لوائحنا وتقاريرنا المالية والميدانية بين يدي الجميع بكل وضوح وتجرد.
        </p>
      </div>

      {/* 4 Pillars of Governance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-[#18864B] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">سياسة مكافحة الاحتيال والفساد</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            حظر تام لأي استغلال للمساعدات أو وساطات أو طلب مقابل مالي من المستفيدين، مع تدقيق دوري ومطابقات بنكية أسبوعية.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878C9] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">سياسة حماية وصون الأطفال</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            حظر تصوير وجوه الأطفال بغرض التسويق المهين للكرامة، وحظر جمع أو تداول وثائقهم الشخصية إلا في نطاق التحقق الداخلي المشفر.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D9AE52] flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17365D]">الحسابات المصرفية والتدقيق الخارجي</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            تخضع كافة المعاملات المالية لحسابات بنكية رسمية باسم المنظمة فقط، وتراجع سنوياً بواسطة مراجع قانوني معتمد ومسجل.
          </p>
        </div>
      </div>

      {/* Downloadable Annual Reports & Statements */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#17365D]">
              التقارير السنوية والميدانية المعتمدة
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              وثائق رسمية متاحة للتحميل والاطلاع العام لكافة الجهات المانحة والمجتمع
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-[#0878C9] font-bold self-start sm:self-auto">
            محدثة دورياً
          </span>
        </div>

        <div className="space-y-4">
          {reports.map((rep, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#F5F7FA] border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white hover:border-[#0878C9] transition"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-[#0878C9] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17365D] mb-0.5">{rep.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-xl">{rep.desc}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1 font-mono">
                    <span>التاريخ: {rep.date}</span>
                    <span>الحجم: {rep.size}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`جاري تنزيل الملف التعريفي: ${rep.title}`)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-xs font-bold text-[#17365D] transition flex items-center justify-center gap-1.5 self-start sm:self-auto shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#0878C9]" />
                <span>تحميل PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Complaints and Grievance Mechanism (آلية الشكاوى والمقترحات) */}
      <div className="bg-gradient-to-br from-[#17365D] to-[#0E2849] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-[#D9AE52] uppercase tracking-wider block">
            صوتكم أمانة ومسؤولية
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            آلية استقبال الشكاوى والتبليغ السري المستقل
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            إذا لاحظت أي مخالفة، أو واجهت سلوكاً غير لائق من أي منسق ميداني، أو كان لديك مقترح لتحسين الخدمات، يمكنك إرسال بلاغ سري يصل مباشرة إلى مكتب رئيس مجلس الأمناء ولجنة الرقابة.
          </p>
        </div>

        {!complaintSent ? (
          <form onSubmit={handleComplaintSubmit} className="space-y-4 max-w-2xl bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  تصنيف البلاغ / الملاحظة:
                </label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                >
                  <option value="financial_integrity" className="bg-[#17365D]">نزاهة مالية أو اشتباه احتيال</option>
                  <option value="child_protection" className="bg-[#17365D]">مخالفة في حماية وكرامة الأطفال</option>
                  <option value="delay" className="bg-[#17365D]">تأخر غير مبرر في دراسة طلب مساعدة</option>
                  <option value="field_conduct" className="bg-[#17365D]">شكوى ضد أداء أو سلوك ميداني</option>
                  <option value="general_feedback" className="bg-[#17365D]">مقترح تحسين عام</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  بيانات التواصل (اختيارية للمتابعة):
                </label>
                <input
                  type="text"
                  value={complaintContact}
                  onChange={(e) => setComplaintContact(e.target.value)}
                  placeholder="رقم الهاتف أو البريد (يمكنك الإرسال دون اسمك)"
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                تفاصيل البلاغ أو الملاحظة: <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={complaintDetails}
                onChange={(e) => setComplaintDetails(e.target.value)}
                placeholder="يرجى ذكر الوقائع والولاية والمنطقة بدقة لتمكين لجنة التحقيق من اتخاذ الإجراء..."
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-[#D9AE52] hover:bg-[#c49a40] text-[#17365D] font-black text-xs transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>إرسال البلاغ بسرية تامة لمجلس الأمناء</span>
            </button>
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-white/10 border border-green-400/40 text-center max-w-2xl space-y-2">
            <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
            <h4 className="font-bold text-white text-base">تم استلام بلاغكم بأمانة</h4>
            <p className="text-xs text-gray-300">
              تم تحويل البلاغ مباشرة إلى لجنة الرقابة المستقلة للتحقيق والمتابعة بموجب ميثاق الشفافية.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
