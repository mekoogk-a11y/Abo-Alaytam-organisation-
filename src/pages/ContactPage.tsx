import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { StorageService } from '../services/storage';

interface ContactPageProps {
  setCurrentTab: (tab: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setCurrentTab }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const offices = [
    {
      state: 'المقر الرئيسي للمنظمة - السودان الخرطوم',
      address: 'السودان - الخرطوم',
      contact: 'موبايل: 00249123843772 | واتساب: 00249966020666',
      role: 'الإدارة العامة والتنفيذية - إشراف مدير المنظمة: أ. على الله عطاء المنان فرج الله',
    },
    {
      state: 'مكتب ولاية البحر الأحمر (بورتسودان)',
      address: 'ولاية البحر الأحمر - بورتسودان، حي المطار',
      contact: '00249123843772',
      role: 'التنسيق الإداري وشؤون المنظمات المانحة',
    },
    {
      state: 'مكتب ولاية القضارف',
      address: 'القضارف - حي الميدان، بالقرب من هيئة مياه الريف',
      contact: '00249966020666',
      role: 'إدارة مشاريع حفر الآبار ومحطات مياه الشرب الشمسية',
    },
    {
      state: 'مكتب ولايتي كسلا ونهر النيل',
      address: 'كسلا - حي الميرغنية / عطبرة - حي الداخلة',
      contact: '00249123843772',
      role: 'مشاريع تمكين الأرامل ومخيمات الإيواء الشتوية',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.logAction(
      'super_admin',
      'استلام رسالة تواصل واستفسار',
      'MSG-' + Date.now(),
      `من: ${senderName} (${senderPhone}) - الموضوع: ${subject}`
    );
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#0878C9] uppercase tracking-wider block">
          أبوابنا مفتوحة لخدمة الجميع
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          تواصل مع منظمة أبو الأيتام
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          سواء كنت متبرعاً، أو جهة مانحة، أو أسرة تطلب استفساراً، يسعد فريقنا باستقبال رسائلكم والرد عليها بكل اهتمام.
        </p>
      </div>

      {/* Grid: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#17365D]">أرسل استفسارك أو رسالتك مباشرة</h2>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    الاسم الكريم: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="اسمك الكريم"
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    رقم الهاتف / الواتساب: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="09xxxxxxxx"
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    البريد الإلكتروني:
                  </label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    موضوع الرسالة: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="استفسار عن كفالة، تبرع، شراكة، إلخ..."
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  نص الرسالة أو الاستفسار: <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك بالتفصيل هنا..."
                  className="w-full bg-[#F5F7FA] border border-gray-200 rounded-2xl p-3.5 text-xs text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <button
                type="submit"
                className="py-3.5 px-8 rounded-xl bg-[#0878C9] hover:bg-[#0661a3] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة إلى مكتب الاتصال</span>
              </button>
            </form>
          ) : (
            <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#18864B] mx-auto" />
              <h3 className="text-lg font-bold text-[#17365D]">تم استلام رسالتكم بنجاح</h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                شكراً لتواصلكم، سيقوم منسق الاستجابة والاتصال بالرد عليكم عبر الهاتف أو البريد خلال ساعات الدوام الرسمي.
              </p>
            </div>
          )}
        </div>

        {/* Right: Sudanese Offices & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#17365D] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-[#D9AE52]" />
              قنوات الاتصال المباشرة بالمنظمة
            </h3>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/20">
                <div className="text-[11px] text-[#D9AE52] font-bold">مدير المنظمة:</div>
                <div className="text-sm font-black text-white mt-0.5">الأستاذ على الله عطاء المنان فرج الله</div>
                <div className="text-[11px] text-gray-300 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0878C9]" />
                  <span>الموقع: السودان - الخرطوم</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Phone className="w-4 h-4 text-[#D9AE52] shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-400">موبايل الاتصال المباشر:</div>
                  <a href="tel:00249123843772" dir="ltr" className="font-mono text-sm font-bold text-white hover:text-[#D9AE52]">
                    00249123843772
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-400">واتساب المنظمة المعتمد:</div>
                  <a href="https://wa.me/249966020666" target="_blank" rel="noopener noreferrer" dir="ltr" className="font-mono text-sm font-bold text-emerald-300 hover:text-white">
                    00249966020666
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Mail className="w-4 h-4 text-[#0878C9] shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-400">البريد الإلكتروني الرسمي:</div>
                  <div className="font-mono text-xs font-bold text-white">contact@aboalaytam-sudan.org</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-400">ساعات العمل والتنسيق:</div>
                  <div className="text-xs text-white">السبت - الخميس: 8:00 ص حتى 4:00 م (خدمات الطوارئ 24/7)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Offices List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#17365D]">فروع ومكاتب التنسيق بالولايات:</h4>
            {offices.map((off, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-xs space-y-1 text-xs"
              >
                <div className="font-bold text-[#17365D] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0878C9]" />
                  <span>{off.state}</span>
                </div>
                <p className="text-gray-600 text-[11px] leading-relaxed">{off.address}</p>
                <div className="text-gray-400 text-[10px] pt-1 border-t border-gray-100 flex items-center justify-between">
                  <span>{off.role}</span>
                  <span className="font-mono font-bold text-[#17365D]">{off.contact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
