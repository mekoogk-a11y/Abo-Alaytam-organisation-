import React from 'react';
import {
  Shield,
  Heart,
  Target,
  Eye,
  Award,
  Users,
  CheckCircle,
  FileText,
  MapPin,
  Scale,
} from 'lucide-react';

interface AboutPageProps {
  setCurrentTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentTab }) => {
  const values = [
    {
      title: 'الكرامة الإنسانية',
      desc: 'نضع كرامة اليتيم والأرملة والأسرة فوق كل اعتبار؛ لا نشترط التشهير مقابل المساعدة، ونقدم العون بإحسان وسرية.',
      icon: Heart,
    },
    {
      title: 'الشفافية والأمانة',
      desc: 'كل قرش يدخل حسابات المنظمة يخضع لتدقيق محاسبي وقانوني صارم، وتصدر له تقارير ميدانية موثقة وقابلة للمراجعة.',
      icon: Scale,
    },
    {
      title: 'العدالة والاستحقاق',
      desc: 'المعايير الإنسانية والاحتياج الحقيقي هما الأساس الأوحد لاختيار المستفيدين، بعيداً عن أي تمييز قبلي أو جهوي أو فئوي.',
      icon: Target,
    },
    {
      title: 'الاستدامة وبناء الإنسان',
      desc: 'لا نكتفي بالإغاثة اللحظية، بل نهدف إلى تمكين الأمهات الأرامل وتأهيل الأيتام تعليمياً وحرفياً لتحقيق الاكتفاء الذاتي.',
      icon: Award,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#17365D] via-[#0E2849] to-[#0878C9] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D9AE52] text-xs font-bold border border-white/10">
            منظمة سودانية وطنية إنسانية
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight">
            من نحن.. مسيرة عهد ووفاء لأهلنا في السودان
          </h1>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            منظمة أبو الأيتام لرعاية وكفالة الأيتام والأرامل هي كيان إنساني وطني نابع من روح الشهامة والتكافل السودانية؛ تأسست لتكون سنداً حقيقياً لكل يتيم فقد الأب، ولكل أم أرملة تصارع من أجل عيش كريم لأطفالها في أوقات المحن والأزمات.
          </p>
        </div>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0878C9] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-[#17365D]">رؤيتنا الاستراتيجية</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              أن نكون المنصة الإنسانية الرائدة وطنياً في رعاية الأيتام والأرامل وسقيا الماء في السودان، معياراً في النزاهة والكرامة، ومحركاً للتكافل الاجتماعي المستدام الذي ينقل الأسر من دائرة الحاجة والهشاشة إلى فضاء الاستقرار والإنتاج.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-[#0878C9]">
            شعارنا: "معاً لرعاية الأيتام، وإغاثة المحتاجين، وصناعة الأمل"
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-[#18864B] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-[#17365D]">رسالتنا الإنسانية</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              حماية ورعاية الأيتام والأرامل والفئات الهشة في جميع أنحاء السودان عبر توفير الكفالة الشاملة، ومشاريع المياه والغذاء، والخدمات الصحية والتعليمية، بدعم كوادر ميدانية متخصصة وبشراكات مجتمعية موثوقة تحفظ الكرامة وتعزز التماسك الاجتماعي.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-[#18864B]">
            المبادئ: الإنسانية • الشفافية • الاستقلالية • عدم التمييز
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#0878C9] uppercase tracking-wider block mb-1">
            المبادئ الحاكمة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
            قيمنا المؤسسية الراسخة
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] text-[#0878C9] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17365D] mb-2">{v.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Organizational Structure & Legal Registry */}
      <div className="bg-[#F5F7FA] rounded-3xl p-8 border border-gray-200/80 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-[#17365D]">
          الهيكل المؤسسي والحوكمة المعتمدة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-700">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 space-y-2">
            <h4 className="font-bold text-[#17365D] text-sm">مجلس الأمناء</h4>
            <p className="leading-relaxed">
              هيئة إشرافية مستقلة تضم شخصيات وطنية وقانونية وعلماء مشهود لهم بالأمانة والنزاهة، تتولى رسم السياسات العامة ومراقبة الأداء المالي والأخلاقي.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 space-y-2">
            <h4 className="font-bold text-[#17365D] text-sm">الإدارة العامة والتنفيذية</h4>
            <div className="text-xs text-[#0878C9] font-bold">
              مدير المنظمة: الأستاذ على الله عطاء المنان فرج الله
            </div>
            <p className="leading-relaxed">
              المقر الرئيسي: السودان - الخرطوم. يشرف على باحثين اجتماعيين ومهندسي مياه وإنشاءات وفرق إغاثة ميدانية تعمل في خطوط الاحتياج الحقيقي بالولايات.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 space-y-2">
            <h4 className="font-bold text-[#17365D] text-sm">لجنة الرقابة والتدقيق الداخلي</h4>
            <p className="leading-relaxed">
              لجنة متخصصة ترفع تقاريرها مباشرة لمجلس الأمناء وتفحص كافة أذونات الصرف، وسجلات المستفيدين، ومطابقات الحسابات البنكية بدقة متناهية.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
          <span>
            <strong>الوضع القانوني:</strong> منظمة وطنية إنسانية مسجلة وفق قانون تنظيم العمل الطوعي والإنساني بالسودان.
          </span>
          <button
            onClick={() => setCurrentTab('transparency')}
            className="text-[#0878C9] font-bold hover:underline"
          >
            الاطلاع على وثائق الشفافية والتقارير المالية &larr;
          </button>
        </div>
      </div>
    </div>
  );
};
