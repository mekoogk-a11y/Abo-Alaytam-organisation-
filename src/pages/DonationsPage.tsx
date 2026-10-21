import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  FileText,
  DollarSign,
  Building,
  CreditCard,
  Send,
  Lock,
} from 'lucide-react';
import { DonationRecord, HumanitarianProject } from '../types';
import { StorageService } from '../services/storage';

interface DonationsPageProps {
  initialProject?: HumanitarianProject | null;
  projects: HumanitarianProject[];
  onDonationSuccess?: (donation: DonationRecord) => void;
}

export const DonationsPage: React.FC<DonationsPageProps> = ({
  initialProject,
  projects,
  onDonationSuccess,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProject ? initialProject.id : 'general'
  );
  const [donationType, setDonationType] = useState<'one_time' | 'monthly'>('one_time');
  const [currency, setCurrency] = useState<'SDG' | 'USD' | 'SAR' | 'AED' | 'EUR'>('SDG');
  const [amount, setAmount] = useState<number>(50000);
  const [donorName, setDonorName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [country, setCountry] = useState<string>('السودان');
  const [paymentMethod, setPaymentMethod] = useState<'bankak' | 'fawry' | 'international_wire' | 'pledge'>('bankak');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState<boolean>(true);
  const [submittedDonation, setSubmittedDonation] = useState<DonationRecord | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'review' | 'confirmed'>('form');

  const presetAmounts: Record<string, number[]> = {
    SDG: [20000, 50000, 100000, 250000, 500000],
    USD: [25, 50, 100, 250, 500],
    SAR: [100, 200, 500, 1000, 2000],
    AED: [100, 200, 500, 1000, 2000],
    EUR: [25, 50, 100, 250, 500],
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToPrivacy) {
      alert('يرجى الموافقة على سياسة الخصوصية وأمان التبرعات للمتابعة.');
      return;
    }
    if (amount <= 0) {
      alert('يرجى تحديد مبلغ تبرع صحيح.');
      return;
    }
    setStep('review');
  };

  const handleConfirmDonation = () => {
    const selectedProj = projects.find((p) => p.id === selectedProjectId);
    const projectName = selectedProj ? selectedProj.title : 'التبرع العام للمنظمة وكفالات الطوارئ';

    const newRecord: DonationRecord = {
      id: 'don-' + Date.now(),
      receiptNumber: 'REC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      donorName: isAnonymous ? 'فاعل خير (مجهول الاسم)' : donorName || 'فاعل خير',
      isAnonymous,
      email: email || undefined,
      phone: phone || undefined,
      country,
      projectId: selectedProjectId === 'general' ? undefined : selectedProjectId,
      projectName,
      amount,
      currency,
      type: donationType,
      paymentMethod,
      status: paymentMethod === 'pledge' ? 'pledged' : 'pending_verification',
      date: new Date().toISOString(),
    };

    StorageService.saveDonation(newRecord);
    StorageService.logAction(
      'finance_admin',
      'تسجيل تبرع / تعهد جديد',
      newRecord.receiptNumber,
      `تسجيل تبرع بمبلغ ${amount} ${currency} لصالح ${projectName}`
    );

    setSubmittedDonation(newRecord);
    setStep('confirmed');
    if (onDonationSuccess) {
      onDonationSuccess(newRecord);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-[#18864B] text-xs font-bold border border-green-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>منظومة التبرع الموثقة والشفافة</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          ساهم في صناعة الأمل وإغاثة المحتاجين
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          جميع التبرعات تودع في حسابات رسمية معتمدة ومخصصة للأغراض الإنسانية المحددة وتخضع للتدقيق المحاسبي المستقل.
        </p>
      </div>

      {/* Official Clarification Banner (WCAG & Transparency rule from prompt) */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-sm font-bold mb-1">
            إشعار الشفافية والأمان المصرفي:
          </strong>
          بوابات الدفع بالبطاقات الدولية المباشرة تخضع حالياً لإجراءات الربط المصرفي النظامي بالسودان. لا نقوم بتخزين أي أرقام بطاقات أو بيانات مصرفية حساسة على الموقع. يتم التحويل عبر الحسابات البنكية الرسمية المعتمدة أدناه (تطبيق بنكك، فوري، أو الحوالات البرقية)، ويتم إصدار إشعار استلام وسند قبض موثق فور التحقق.
        </div>
      </div>

      {step === 'form' && (
        <form onSubmit={handleSubmitForm} className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm space-y-8">
          {/* Step 1: Target Project */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#17365D]">
              1. اختر المشروع أو البرنامج الإنساني المستهدف:
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-gray-200 rounded-2xl p-3.5 text-sm text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
            >
              <option value="general">التبرع العام للمنظمة (صندوق الطوارئ والأيتام الأشد حاجة)</option>
              <option value="orphans_sponsorship">كفالة يتيم شهرية / سنوية</option>
              <option value="widows_fund">صندوق دعم ورعاية وتمكين الأرامل</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.state})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Frequency & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                نوع المساهمة:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDonationType('one_time')}
                  className={`py-3 rounded-xl text-xs font-bold transition border ${
                    donationType === 'one_time'
                      ? 'bg-[#17365D] text-white border-[#17365D] shadow'
                      : 'bg-[#F5F7FA] text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  تبرع لمرة واحدة
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('monthly')}
                  className={`py-3 rounded-xl text-xs font-bold transition border ${
                    donationType === 'monthly'
                      ? 'bg-[#17365D] text-white border-[#17365D] shadow'
                      : 'bg-[#F5F7FA] text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  كفالة / تبرع شهري دوري
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                العملة:
              </label>
              <div className="flex rounded-xl bg-[#F5F7FA] p-1 border border-gray-200">
                {(['SDG', 'USD', 'SAR', 'AED', 'EUR'] as const).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => {
                      setCurrency(curr);
                      setAmount(presetAmounts[curr][1] || 50);
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      currency === curr
                        ? 'bg-[#0878C9] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {curr === 'SDG' ? 'ج.س' : curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Amount Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-700">
              حدد مبلغ التبرع:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {presetAmounts[currency]?.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={`py-2.5 rounded-xl text-xs font-bold border font-mono transition ${
                    amount === preset
                      ? 'bg-[#0878C9] text-white border-[#0878C9] shadow'
                      : 'bg-[#F5F7FA] text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {preset.toLocaleString('ar-EG')} {currency === 'SDG' ? 'ج.س' : currency}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-[11px] text-gray-500 mb-1">
                أو اكتب مبلغاً آخر ترغب في المساهمة به:
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={amount || ''}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-2xl p-3.5 pr-4 pl-16 text-base font-bold text-[#17365D] font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
                <span className="absolute left-4 top-3.5 text-xs font-bold text-gray-400">
                  {currency === 'SDG' ? 'جنيه سوداني' : currency}
                </span>
              </div>
            </div>
          </div>

          {/* Step 4: Donor Details */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#17365D]">
                بيانات المتبرع (اختيارية لحفظ الأمانة وإرسال الإشعار):
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-600">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 accent-[#0878C9]"
                />
                <span>التبرع كفاعل خير (مجهول الاسم)</span>
              </label>
            </div>

            {!isAnonymous && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    الاسم الكامل:
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="اسم المتبرع الكريم"
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    بلد الإقامة:
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="السودان، السعودية، الإمارات، قطر، بريطانيا..."
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    البريد الإلكتروني (اختياري لاستلام الإيصال):
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    رقم الهاتف أو الواتساب:
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xxxxxxxx أو +966xxxxxxxxx"
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 5: Official Payment Channel */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <label className="block text-sm font-bold text-[#17365D]">
              طريقة الإيداع / التحويل المعتمدة:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setPaymentMethod('bankak')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                  paymentMethod === 'bankak'
                    ? 'border-[#0878C9] bg-blue-50/60 ring-2 ring-[#0878C9]/20'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <Building className="w-5 h-5 text-[#0878C9] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#17365D]">
                    تطبيق بنكك (بنك الخرطوم)
                  </div>
                  <div className="text-[11px] text-gray-500">
                    التحويل الفوري المباشر الأكثر انتشاراً في السودان
                  </div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('fawry')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                  paymentMethod === 'fawry'
                    ? 'border-[#0878C9] bg-blue-50/60 ring-2 ring-[#0878C9]/20'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#18864B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#17365D]">
                    تطبيق فوري (بنك فيصل الإسلامي)
                  </div>
                  <div className="text-[11px] text-gray-500">
                    حساب المنظمة الرسمي في بنك فيصل
                  </div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('international_wire')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                  paymentMethod === 'international_wire'
                    ? 'border-[#0878C9] bg-blue-50/60 ring-2 ring-[#0878C9]/20'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <DollarSign className="w-5 h-5 text-[#D9AE52] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#17365D]">
                    حوالة مصرفية دولية (IBAN / SWIFT)
                  </div>
                  <div className="text-[11px] text-gray-500">
                    للمتبرعين من خارج السودان ودول الخليج وأوروبا
                  </div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('pledge')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                  paymentMethod === 'pledge'
                    ? 'border-[#0878C9] bg-blue-50/60 ring-2 ring-[#0878C9]/20'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#17365D]">
                    تسجيل تعهد تبرع خيري موثق
                  </div>
                  <div className="text-[11px] text-gray-500">
                    تسجيل التزامك للتنسيق المباشر مع مسؤول المالية
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600">
              <input
                type="checkbox"
                required
                checked={agreedToPrivacy}
                onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                className="w-4 h-4 accent-[#0878C9] mt-0.5"
              />
              <span>
                أوافق على سياسة الخصوصية وأقر بأن هذه المساهمة مخصصة للأعمال الإنسانية والخيرية التابعة لمنظمة أبو الأيتام في السودان.
              </span>
            </label>
          </div>

          {/* Submit Step 1 Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#0878C9] hover:bg-[#0661a3] text-white font-black text-base shadow-lg shadow-[#0878C9]/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>مراجعة بيانات التبرع وإكمال التحويل</span>
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Step 2: Review Screen */}
      {step === 'review' && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="text-xl font-black text-[#17365D]">
              مراجعة وتأكيد بيانات التبرع
            </h2>
            <button
              onClick={() => setStep('form')}
              className="text-xs text-[#0878C9] font-bold hover:underline"
            >
              تعديل البيانات
            </button>
          </div>

          <div className="bg-[#F5F7FA] rounded-2xl p-6 border border-gray-200/80 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-gray-200/50">
              <span className="text-gray-500">المشروع المستهدف:</span>
              <span className="font-bold text-[#17365D]">
                {projects.find((p) => p.id === selectedProjectId)?.title || 'التبرع العام للمنظمة'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-200/50">
              <span className="text-gray-500">المبلغ والعملة:</span>
              <span className="font-black text-[#18864B] font-mono text-base">
                {amount.toLocaleString('ar-EG')} {currency}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-200/50">
              <span className="text-gray-500">نوع التبرع:</span>
              <span className="font-semibold text-gray-800">
                {donationType === 'one_time' ? 'تبرع لمرة واحدة' : 'تبرع دوري شهري'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-200/50">
              <span className="text-gray-500">اسم المتبرع:</span>
              <span className="font-semibold text-gray-800">
                {isAnonymous ? 'فاعل خير (مجهول الاسم)' : donorName || 'فاعل خير'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">طريقة التحويل المحددة:</span>
              <span className="font-bold text-[#0878C9]">
                {paymentMethod === 'bankak'
                  ? 'بنكك - بنك الخرطوم'
                  : paymentMethod === 'fawry'
                  ? 'فوري - بنك فيصل الإسلامي'
                  : paymentMethod === 'international_wire'
                  ? 'تحويل بنكي دولي'
                  : 'تعهد خيري موثق'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
            بالضغط على "تأكيد واستخراج الإيصال"، سيتم إنشاء رقم تبرع رسمي، وتزويدك ببيانات الحساب البنكي المعتمد لإجراء التحويل عبر تطبيقك المصرفي.
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleConfirmDonation}
              className="flex-1 py-3.5 rounded-xl bg-[#18864B] hover:bg-[#146f3e] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>تأكيد واستخراج تفاصيل الحساب والإيصال</span>
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => setStep('form')}
              className="px-6 py-3.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold transition"
            >
              رجوع
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation and Banking Transfer Voucher */}
      {step === 'confirmed' && submittedDonation && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-green-200 shadow-xl space-y-6 animate-fadeIn">
          <div className="text-center space-y-2 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-green-100 text-[#18864B] flex items-center justify-center mx-auto mb-2 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-[#17365D]">
              جزاكم الله خيراً.. تم تسجيل المساهمة بنجاح
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              رقم العملية المرجعي الرسمي: <strong className="font-mono text-[#0878C9]">{submittedDonation.receiptNumber}</strong>
            </p>
          </div>

          {/* Official Bank Account Cards based on method */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#17365D]">
              بيانات الحساب المصرفي المعتمد لإتمام التحويل:
            </h3>

            {submittedDonation.paymentMethod === 'bankak' && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#17365D]">بنك الخرطوم (Bank of Khartoum - بنكك)</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 text-[#0878C9] font-bold">الحساب الإنساني العام</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                  <div>
                    <span className="text-[10px] text-gray-400 block">رقم الحساب:</span>
                    <span className="text-base sm:text-lg font-mono font-black text-[#17365D]">3492810</span>
                  </div>
                  <button
                    onClick={() => handleCopy('3492810', 'bankak_acc')}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0878C9] text-xs font-bold flex items-center gap-1 transition"
                  >
                    {copiedAccount === 'bankak_acc' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAccount === 'bankak_acc' ? 'تم النسخ' : 'نسخ الرقم'}</span>
                  </button>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>اسم الحساب: <strong>منظمة أبو الأيتام لرعاية وكفالة الأيتام والأرامل</strong></div>
                  <div>المبلغ المطلوب تحويله: <strong>{submittedDonation.amount.toLocaleString('ar-EG')} جنيه سوداني</strong></div>
                </div>
              </div>
            )}

            {submittedDonation.paymentMethod === 'fawry' && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#17365D]">بنك فيصل الإسلامي (Fawry - فوري)</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-green-100 text-[#18864B] font-bold">حساب كفالة الأيتام</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                  <div>
                    <span className="text-[10px] text-gray-400 block">رقم الحساب:</span>
                    <span className="text-base sm:text-lg font-mono font-black text-[#17365D]">19002847</span>
                  </div>
                  <button
                    onClick={() => handleCopy('19002847', 'fawry_acc')}
                    className="px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-[#18864B] text-xs font-bold flex items-center gap-1 transition"
                  >
                    {copiedAccount === 'fawry_acc' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAccount === 'fawry_acc' ? 'تم النسخ' : 'نسخ الرقم'}</span>
                  </button>
                </div>
                <div className="text-xs text-gray-600">
                  اسم الحساب: <strong>منظمة أبو الأيتام الخيرية</strong>
                </div>
              </div>
            )}

            {submittedDonation.paymentMethod === 'international_wire' && (
              <div className="p-5 rounded-2xl bg-[#F5F7FA] border border-gray-200 space-y-3 text-xs">
                <div className="font-bold text-[#17365D] text-sm">تفاصيل الحوالة المصرفية الدولية:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 font-mono">
                  <div>Bank Name: Sudanese Islamic Bank / Omdurman National</div>
                  <div>SWIFT Code: SDISSDHX / ONBKSDHX</div>
                  <div>Account Title: Abo Al-Aytam Humanitarian Org</div>
                  <div>IBAN: SD82SDIS000000003492810</div>
                </div>
              </div>
            )}
          </div>

          {/* Verification instructions */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-2">
            <div className="font-bold text-[#17365D]">الخطوة التالية لتأكيد التبرع:</div>
            <p className="leading-relaxed">
              بعد إتمام عملية التحويل عبر تطبيقك المصرفي، يُرجى إرسال صورة إشعار التحويل موضحاً به رقم العملية المرجعي (<strong className="font-mono text-[#0878C9]">{submittedDonation.receiptNumber}</strong>) إلى قسم المتابعة المالية عبر واتساب المنظمة:
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 font-mono text-[#18864B] font-bold text-xs">
              <div className="flex items-center gap-1.5">
                <span>واتساب المنظمة المعتمد:</span>
                <a href="https://wa.me/249966020666" target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:underline text-emerald-700">00249966020666</a>
              </div>
              <div className="flex items-center gap-1.5 text-gray-700">
                <span>موبايل:</span>
                <a href="tel:00249123843772" dir="ltr" className="hover:underline">00249123843772</a>
              </div>
            </div>
          </div>

          {/* Reset / Done Button */}
          <button
            onClick={() => {
              setSubmittedDonation(null);
              setStep('form');
            }}
            className="w-full py-3 rounded-xl bg-[#17365D] text-white text-xs font-bold hover:bg-[#0f2440] transition"
          >
            إجراء تبرع جديد أو العودة للرئيسية
          </button>
        </div>
      )}
    </div>
  );
};
