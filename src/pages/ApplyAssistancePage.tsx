import React, { useState } from 'react';
import {
  HandHeart,
  ShieldAlert,
  FileCheck2,
  CheckCircle2,
  UploadCloud,
  FileText,
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
  Clock,
} from 'lucide-react';
import { AssistanceApplication, SectorType } from '../types';
import { StorageService } from '../services/storage';
import { SUDAN_STATES, WORK_SECTORS_DATA } from '../data/mockData';

interface ApplyAssistancePageProps {
  setCurrentTab: (tab: string) => void;
  onApplicationCreated?: (app: AssistanceApplication) => void;
}

export const ApplyAssistancePage: React.FC<ApplyAssistancePageProps> = ({
  setCurrentTab,
  onApplicationCreated,
}) => {
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [state, setState] = useState(SUDAN_STATES[0]);
  const [locality, setLocality] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [category, setCategory] = useState<SectorType>('orphans');
  const [description, setDescription] = useState('');
  const [familyMembersCount, setFamilyMembersCount] = useState<number>(4);
  const [orphansCount, setOrphansCount] = useState<number>(2);
  const [monthlyIncomeEst, setMonthlyIncomeEst] = useState('');
  const [housingType, setHousingType] = useState<AssistanceApplication['housingType']>('rented');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [createdApplication, setCreatedApplication] = useState<AssistanceApplication | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleFakeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setAttachedFiles((prev) => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('يرجى تأكيد صحة البيانات والموافقة على سياسة الخصوصية للمتابعة.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `ABO-REQ-${randomSuffix}`;

    const newApp: AssistanceApplication = {
      id: 'app-' + Date.now(),
      trackingCode,
      applicantName,
      phone,
      whatsapp: whatsapp || phone,
      alternatePhone,
      state,
      locality,
      addressDetails,
      category,
      description,
      familyMembersCount,
      orphansCount,
      monthlyIncomeEst,
      housingType,
      status: 'received',
      statusNotes: 'تم تسجيل الطلب بالنظام بنجاح، وسيتم إحالته للباحث الميداني المختص بالولاية لدراسة الحالة.',
      priority: orphansCount > 2 || category === 'emergency' ? 'urgent' : 'high',
      internalNotes: [
        `${new Date().toISOString().split('T')[0]}: تم تقديم الطلب إلكترونياً عبر المنصة وتعيين أولوية المراجعة.`,
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documentsAttached: attachedFiles.length > 0 ? attachedFiles : ['شهادة وفاة مبدئية', 'إثبات سكن'],
    };

    StorageService.saveApplication(newApp);
    StorageService.logAction(
      'caseworker_admin',
      'استلام طلب مساعدة إنسانية جديد',
      trackingCode,
      `طلب ${category} مقدم من ${applicantName} بولاية ${state}`
    );

    setCreatedApplication(newApp);
    if (onApplicationCreated) {
      onApplicationCreated(newApp);
    }
  };

  const handleCopyCode = () => {
    if (createdApplication) {
      navigator.clipboard.writeText(createdApplication.trackingCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0878C9] text-xs font-bold border border-blue-200">
          <HandHeart className="w-3.5 h-3.5" />
          <span>خدمة الأسر بكرامة وإحسان</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          بوابة تقديم طلبات المساعدة الإنسانية
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          نحن هنا لنكون سنداً لكم. يرجى تزويدنا بالبيانات الدقيقة لنتمكن من دراسة الحالة عبر باحثينا الميدانيين وتقديم العون المناسب في أقرب وقت.
        </p>
      </div>

      {/* Dignity & Privacy Notice */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#0878C9] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>ميثاق صون الكرامة والسرية:</strong> جميع البيانات والمستندات المقدمة تُعامل بسرية بالغة ولا يطلع عليها سوى لجنة البحث الاجتماعي المصرح لها. لن يتم نشر صوركم أو أسماء أسركم على أي منصة عامة إطلاقاً.
        </div>
      </div>

      {!createdApplication ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm space-y-8">
          {/* Section 1: Basic Applicant Info */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#17365D] border-b pb-2">
              1. بيانات مقدم الطلب ووسائل التواصل
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  الاسم الرباعي لمقدم الطلب: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="مثال: فاطمة محمد إبراهيم أحمد"
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  رقم الهاتف الأساسي للاتصال: <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xxxxxxxx أو 01xxxxxxxx"
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  رقم الواتساب للتواصل وإرسال الإشعارات:
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="09xxxxxxxx"
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  هاتف بديل (قريب أو جار في حال انقطاع الشبكة):
                </label>
                <input
                  type="tel"
                  value={alternatePhone}
                  onChange={(e) => setAlternatePhone(e.target.value)}
                  placeholder="09xxxxxxxx"
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Geographic Location in Sudan */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#17365D] border-b pb-2">
              2. الموقع الجغرافي والإقامة في السودان
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  الولاية الحالية: <span className="text-red-500">*</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                >
                  {SUDAN_STATES.map((s, idx) => (
                    <option key={idx} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  المحلية أو المدينة: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="مثال: محلية كرري / شندي / دنقلا"
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  طبيعة السكن الحالية:
                </label>
                <select
                  value={housingType}
                  onChange={(e) => setHousingType(e.target.value as AssistanceApplication['housingType'])}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                >
                  <option value="rented">إيجار</option>
                  <option value="displaced_camp">مركز إيواء / مدرسة نزوح</option>
                  <option value="relatives">استضافة لدى أقارب أو معارف</option>
                  <option value="shelter">مأوى مؤقت / خيمة</option>
                  <option value="owned">ملك</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                تفاصيل الحي وأقرب معلم بارز (لتسهيل وصول الباحث الميداني):
              </label>
              <input
                type="text"
                required
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                placeholder="الحي، رقم الحارة أو المربع، جوار المسجد أو المستوصف..."
                className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              />
            </div>
          </div>

          {/* Section 3: Assistance Category & Household */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#17365D] border-b pb-2">
              3. نوع المساعدة الإنسانية المطلوبة وتفاصيل الأسرة
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  نوع المساعدة المطلوبة: <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SectorType)}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                >
                  <option value="orphans">رعاية وكفالة أيتام</option>
                  <option value="widows">مساندة أم أرملة معيلة</option>
                  <option value="food">سلة غذائية / إطعام</option>
                  <option value="water">سقيا ماء وتوفير مياه نقية</option>
                  <option value="wells">حفر بئر أو صيانة محطة مياه للقرية</option>
                  <option value="families">دعم أسرة متعففة</option>
                  <option value="displaced">إيواء واحتياجات نازحين</option>
                  <option value="emergency">مساعدة طارئة عاجلة</option>
                  <option value="social">خدمات اجتماعية وعلاجية</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  عدد أفراد الأسرة المقيمين معاً:
                </label>
                <input
                  type="number"
                  min="1"
                  value={familyMembersCount}
                  onChange={(e) => setFamilyMembersCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  عدد الأطفال الأيتام في الأسرة (إن وجد):
                </label>
                <input
                  type="number"
                  min="0"
                  value={orphansCount}
                  onChange={(e) => setOrphansCount(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                وصف مختصر لاحتياج الحالة والظروف المعيشية: <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اشرح بإيجاز وضع الأسرة، تاريخ وفاة العائل، الظروف الصحية أو التعليمية للأطفال، وأبرز الاحتياجات العاجلة..."
                className="w-full bg-[#F5F7FA] border border-gray-200 rounded-2xl p-3.5 text-xs text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              />
            </div>
          </div>

          {/* Section 4: Document Attachments */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#17365D] border-b pb-2">
              4. المستندات والوثائق الداعمة (اختيارية وتساعد على سرعة التحقق)
            </h3>
            <p className="text-xs text-gray-500">
              مثل: صورة شهادة وفاة الأب، الأرقام الوطنية، عقود إيجار، أو تقارير طبية.
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#0878C9] transition bg-[#F5F7FA]/50">
              <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer block">
                <span className="text-xs font-bold text-[#0878C9] hover:underline">
                  اضغط هنا لاختيار المستندات من جهازك
                </span>
                <input
                  type="file"
                  multiple
                  onChange={handleFakeFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-[11px] text-gray-400 block mt-1">
                صور أو ملفات PDF (حجم أقصى 10 ميجابايت)
              </span>
            </div>

            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {attachedFiles.map((name, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-green-50 border border-green-200 text-[#18864B] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-700">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-[#0878C9] mt-0.5"
              />
              <span>
                أقر بصحة جميع البيانات الواردة في هذا الطلب، وأعلم أن الموافقة تخضع للمعاينة والتحقق الميداني من قبل باحثي منظمة أبو الأيتام وفق معايير الاستحقاق الإنساني.
              </span>
            </label>
          </div>

          {/* Submit Application Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#0878C9] hover:bg-[#0661a3] text-white font-black text-base shadow-lg shadow-[#0878C9]/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>إرسال الطلب والحصول على كود المتابعة</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </form>
      ) : (
        /* Success Screen with Unique Tracking Code */
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-green-200 shadow-xl space-y-6 animate-fadeIn">
          <div className="text-center space-y-3 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-green-100 text-[#18864B] flex items-center justify-center mx-auto mb-2 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-[#17365D]">
              تم استلام طلبكم وتسجيله بالنظام بنجاح
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
              نشكركم على ثقتكم في منظمة أبو الأيتام. سيتم مراجعة الطلب بواسطة الباحث الميداني المختص في ولايتكم في أقرب فرصة ممكنة.
            </p>
          </div>

          {/* Tracking Code Highlight Box */}
          <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-gray-200 text-center space-y-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
              رقم تتبع ومتابعة الطلب الفريد (Tracking Code):
            </span>
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border-2 border-[#0878C9] shadow-sm">
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#0878C9] tracking-wider">
                {createdApplication.trackingCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0878C9] transition"
                title="نسخ كود التتبع"
              >
                {copiedCode ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              احتفظ بهذا الرقم جيداً لمتابعة مراحل دراسة طلبك والموافقة عبر صفحة "متابعة الطلب".
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setCurrentTab('track-help')}
              className="flex-1 py-3.5 rounded-xl bg-[#0878C9] hover:bg-[#0661a3] text-white font-bold text-xs sm:text-sm shadow transition flex items-center justify-center gap-2"
            >
              <span>الانتقال لمتابعة حالة الطلب الآن</span>
              <Clock className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCreatedApplication(null);
                setApplicantName('');
                setDescription('');
              }}
              className="px-6 py-3.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold transition"
            >
              تقديم طلب آخر
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
