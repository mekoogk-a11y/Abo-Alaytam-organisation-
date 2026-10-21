import React, { useState } from 'react';
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  MapPin,
  Calendar,
  HelpCircle,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { ApplicationStatus, AssistanceApplication } from '../types';
import { StorageService } from '../services/storage';

interface TrackApplicationPageProps {
  setCurrentTab: (tab: string) => void;
}

export const TrackApplicationPage: React.FC<TrackApplicationPageProps> = ({ setCurrentTab }) => {
  const [searchCode, setSearchCode] = useState('ABO-REQ-9821');
  const [searched, setSearched] = useState(true);
  const [application, setApplication] = useState<AssistanceApplication | null>(() =>
    StorageService.findApplicationByCode('ABO-REQ-9821') || null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    const found = StorageService.findApplicationByCode(searchCode);
    setApplication(found || null);
    setSearched(true);
  };

  const statusWorkflow: { key: ApplicationStatus; label: string; desc: string }[] = [
    { key: 'received', label: 'تم استلام الطلب', desc: 'تم تسجيل الطلب في قاعدة البيانات وتعيين رقم المتابعة.' },
    { key: 'under_review', label: 'قيد المراجعة الميدانية', desc: 'يقوم الباحث الاجتماعي بدراسة البيانات والتواصل مع الأسرة.' },
    { key: 'needs_info', label: 'يحتاج لمعلومات إضافية', desc: 'يتطلب استكمال مستندات أو مراجعة بيانات هاتفية.' },
    { key: 'verified', label: 'تم التحقق من الحالة', desc: 'اكتملت الزيارة الميدانية وتأكدت اللجنة من استحقاق الأسرة.' },
    { key: 'approved', label: 'تمت الموافقة المبدئية', desc: 'اعتمدت اللجنة الإنسانية إدراج الحالة في جدول التوزيع.' },
    { key: 'waitlist', label: 'أُدرج في قائمة التخصيص', desc: 'بانتظار مطابقة كافل أو وصول تمويل المشروع.' },
    { key: 'assisted', label: 'تمت المساعدة والتسليم', desc: 'تم تسليم المساعدة أو صرف مستحقات الكفالة للمستفيد.' },
    { key: 'closed', label: 'أُغلق الطلب', desc: 'تم إغلاق الملف بعد إتمام المساعدة أو لعدم انطباق الشروط.' },
  ];

  // Helper to get step index
  const getStepIndex = (status: ApplicationStatus) => {
    const order: ApplicationStatus[] = [
      'received',
      'under_review',
      'needs_info',
      'verified',
      'approved',
      'waitlist',
      'assisted',
      'closed',
    ];
    return order.indexOf(status);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0878C9] text-xs font-bold border border-blue-200">
          <Clock className="w-3.5 h-3.5" />
          <span>الاستعلام الفوري الآمن</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          متابعة حالة طلب المساعدة الإنسانية
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          أدخل رقم تتبع الطلب الخاص بك (Tracking Code) للاطلاع على المستجدات ومراحل الدراسة الميدانية دون الكشف عن بياناتك الخاصة.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-gray-400 absolute right-4 top-3.5" />
          <input
            type="text"
            required
            placeholder="أدخل كود المتابعة، مثل: ABO-REQ-9821"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="w-full bg-[#F5F7FA] border border-gray-200 rounded-2xl pr-12 pl-4 py-3 text-sm text-[#17365D] font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0878C9] hover:bg-[#0661a3] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>استعلام الآن</span>
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Results View */}
      {searched && (
        <>
          {application ? (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm space-y-8 animate-fadeIn">
              {/* Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 block mb-1">
                    كود الطلب المعتمد:
                  </span>
                  <div className="text-2xl font-black font-mono text-[#0878C9]">
                    {application.trackingCode}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>تاريخ التسجيل: {new Date(application.createdAt).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>

                {/* Current Status Badge */}
                <div className="sm:text-left">
                  <span className="text-xs font-bold text-gray-400 block mb-1">
                    الحالة التنفيذية الراهنة:
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-blue-50 text-[#0878C9] border border-blue-200">
                    <span className="w-2 h-2 rounded-full bg-[#0878C9] animate-pulse" />
                    {statusWorkflow.find((s) => s.key === application.status)?.label || application.status}
                  </span>
                </div>
              </div>

              {/* Status Explanation Box */}
              {application.statusNotes && (
                <div className="p-4 rounded-2xl bg-[#F5F7FA] border border-gray-200 text-xs sm:text-sm text-gray-700 space-y-1">
                  <div className="font-bold text-[#17365D] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#18864B]" />
                    إفادة لجنة البحث الاجتماعي الميداني:
                  </div>
                  <p className="leading-relaxed">{application.statusNotes}</p>
                </div>
              )}

              {/* Progress Milestones */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#17365D]">
                  مراحل مسار دراسة وتنفيذ الطلب:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {statusWorkflow.slice(0, 4).map((step, idx) => {
                    const currentIdx = getStepIndex(application.status);
                    const isDone = currentIdx >= idx;
                    const isCurrent = application.status === step.key;

                    return (
                      <div
                        key={step.key}
                        className={`p-4 rounded-2xl border transition ${
                          isCurrent
                            ? 'bg-blue-50/70 border-[#0878C9] ring-2 ring-[#0878C9]/20'
                            : isDone
                            ? 'bg-green-50/50 border-green-200 text-gray-800'
                            : 'bg-gray-50/50 border-gray-100 text-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono font-bold text-gray-400">
                            مرحلة {idx + 1}
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-300" />
                          )}
                        </div>
                        <div className="text-xs font-bold text-[#17365D] mb-1">
                          {step.label}
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Non-sensitive details confirmed */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block">مجال المساعدة:</span>
                  <span className="font-bold text-[#17365D]">{application.category}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">الولاية:</span>
                  <span className="font-bold text-[#17365D]">{application.state}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">عدد أفراد الأسرة:</span>
                  <span className="font-bold text-[#17365D]">{application.familyMembersCount}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">الأيتام:</span>
                  <span className="font-bold text-[#17365D]">{application.orphansCount}</span>
                </div>
              </div>

              {/* Help & Support note */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-3">
                <span>
                  إذا طُلب منك معلومات إضافية أو واجهت أي استفسار، تواصل مع فريق الرعاية عبر هاتف المنظمة.
                </span>
                <button
                  onClick={() => setCurrentTab('contact')}
                  className="text-[#0878C9] font-bold hover:underline"
                >
                  صفحة التواصل والاستفسار &larr;
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/90 space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#17365D]">
                لم يتم العثور على طلب مطابق للكود المدخل
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                يرجى التأكد من كتابة كود المتابعة بصورة صحيحة (مثال: <span className="font-mono font-bold">ABO-REQ-9821</span>).
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentTab('apply-help')}
                  className="px-6 py-2.5 rounded-xl bg-[#0878C9] text-white text-xs font-bold"
                >
                  تقديم طلب مساعدة جديد
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
