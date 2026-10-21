import React from 'react';
import {
  Heart,
  HandHeart,
  Droplets,
  ShieldCheck,
  Users,
  Compass,
  ArrowLeft,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Radio,
  FileText,
  HelpCircle,
  Phone,
} from 'lucide-react';
import { HumanitarianProject, NewsArticle, SectorType } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { WORK_SECTORS_DATA } from '../data/mockData';
import { SudaneseVoiceoverStudio } from '../components/SudaneseVoiceoverStudio';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  projects: HumanitarianProject[];
  news: NewsArticle[];
  onSelectProject: (p: HumanitarianProject) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentTab,
  projects,
  news,
  onSelectProject,
}) => {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(0);

  const stats = [
    { label: 'أيتام وأرامل مسجلون في برامج الرعاية', value: '1,420+', icon: Users, color: 'text-[#0878C9]' },
    { label: 'سلال غذائية ووجبات مطابخ مجتمعية موثقة', value: '18,500+', icon: HandHeart, color: 'text-[#18864B]' },
    { label: 'محطات مياه وآبار شمسية تعمل بالميدان', value: '14 محطة', icon: Droplets, color: 'text-[#0878C9]' },
    { label: 'ولايات سودانية مغطاة بالتدخل الميداني', value: '9 ولايات', icon: MapPin, color: 'text-[#D9AE52]' },
  ];

  const faqs = [
    {
      q: 'ما هي منظمة أبو الأيتام وكيف تأسست؟',
      a: 'منظمة أبو الأيتام هي منظمة سودانية وطنية إنسانية مستقلة غير ربحية، أسسها نخبة من أبناء السودان الخيرين والمتخصصين في العمل الإنساني والاجتماعي. تعمل المنظمة في مجالات رعاية وكفالة الأيتام والأرامل، وسقيا الماء، وتوفير الغذاء، ومساندة الأسر المتعففة في مختلف ولايات السودان وفق معايير الحوكمة والكرامة الإنسانية.',
    },
    {
      q: 'كيف تضمن المنظمة وصول المساعدات لمستحقيها بكرامة وبدون وساطة؟',
      a: 'نتبع مساراً بحثياً صارماً يبدأ بتسجيل الطلب عبر المنصة أو اللجان الأهلية، ثم زيارة باحث أو باحثة اجتماعية ميدانية للمعاينة والتأكد من المستندات الرسمية (شهادات الوفاة، أرقام وطنية). ويتم الصرف والتسليم بمحاضر استلام موثقة مع الحفاظ التام على خصوصية وكرامة المستفيدين دون نشر صور وجوههم في الفضاء العام.',
    },
    {
      q: 'ما هي الطرق المتاحة للتبرع من داخل السودان وخارجه؟',
      a: 'نظراً للظروف المصرفية، تعتمد المنظمة حسابات مصرفية رسمية مدققة تشمل: تطبيق بنكك (بنك الخرطوم)، تطبيق فوري (بنك فيصل الإسلامي)، الحوالات البرقية الدولية للحسابات الإنسانية المعتمدة، بالإضافة للتبرع العيني والتعهدات الخيرية المباشرة مع إصدار سندات قبض إلكترونية رسمية.',
    },
    {
      q: 'كيف يمكن لأسرة محتاجة أو أم أيتام تقديم طلب مساعدة؟',
      a: 'يمكن تقديم الطلب بسهولة عبر صفحة "طلب مساعدة" على هذا الموقع، وتعبئة بيانات السكن والحالة الاجتماعية وإرفاق المستندات المتاحة. يحصل مقدم الطلب على رقم تتبع فريد (Tracking Code) يستطيع من خلاله الاستعلام عن حالة طلبه في أي وقت.',
    },
    {
      q: 'هل المنظمة مرتبطة بأي جهة سياسية أو حزبية؟',
      a: 'كلا، منظمة أبو الأيتام منظمة إنسانية وطنية محايدة تماماً تعمل لخدمة كل إنسان سوداني محتاج بغض النظر عن القبيلة أو الانتماء الجغرافي أو السياسي، وتلتزم بالمبادئ الإنسانية العالمية الأربعة: الإنسانية، الحياد، النزاهة، والاستقلالية.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-[#F5F7FA] to-[#F5F7FA] pt-8 md:pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Right: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-right">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-[#0878C9] text-xs font-black tracking-wide border border-blue-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#18864B] animate-ping" />
                <span>منظمة سودانية وطنية إنسانية مستقلة</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#17365D] leading-[1.25] tracking-tight font-sans">
                معاً نصنع الأمل ونصل إلى <span className="text-[#0878C9] underline decoration-[#D9AE52]/70 decoration-wavy underline-offset-8">مستحقي الدعم</span>
              </h1>

              {/* Mission Statement */}
              <p className="text-base sm:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
                في منظمة أبو الأيتام، نلتزم بحفظ كرامة الإنسان السوداني؛ نرعى الأيتام ونكفلهم في كنف أسرهم، نساند الأمهات الأرامل، ونروي ظمأ القرى العطشى عبر محطات المياه والآبار الدائمة، ونطعم الجائعين بأمانة وتكافل أصيل.
              </p>

              {/* Slogan Card */}
              <div className="p-4 rounded-2xl bg-white/90 border border-blue-100/90 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D9AE52]/20 flex items-center justify-center shrink-0 text-[#17365D]">
                  <Sparkles className="w-5 h-5 text-[#D9AE52]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">شعار المنظمة المعتمد:</div>
                  <div className="text-sm sm:text-base font-black text-[#17365D]">
                    "معاً لرعاية الأيتام، وإغاثة المحتاجين، وصناعة الأمل"
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentTab('donations')}
                  className="px-8 py-4 rounded-2xl bg-[#0878C9] hover:bg-[#0661a3] text-white font-black text-base shadow-xl shadow-[#0878C9]/30 transition transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-current text-red-200" />
                  <span>ساهم في الخير (تبرع الآن)</span>
                </button>

                <button
                  onClick={() => setCurrentTab('apply-help')}
                  className="px-7 py-4 rounded-2xl bg-white hover:bg-gray-50 text-[#17365D] border-2 border-[#17365D]/20 hover:border-[#17365D] font-bold text-base shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <HandHeart className="w-5 h-5 text-[#18864B]" />
                  <span>اطلب المساعدة الإنسانية</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-gray-500 font-semibold">
                <span className="flex items-center gap-1.5 text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#18864B]" />
                  حسابات مصرفية رسمية مدققة
                </span>
                <span className="flex items-center gap-1.5 text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#0878C9]" />
                  حماية كاملة لبيانات وكرامة الأسر
                </span>
                <span className="flex items-center gap-1.5 text-gray-700">
                  <Compass className="w-4 h-4 text-[#D9AE52]" />
                  تواجد ميداني في 9 ولايات
                </span>
              </div>
            </div>

            {/* Left: Hero Image / Visual Collage */}
            <div className="lg:col-span-5 relative">
              {/* Floating Official Logo Badge */}
              <div className="absolute -top-6 -right-4 sm:-right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border-2 border-blue-100 flex items-center gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1 border-2 border-[#18864B] overflow-hidden shrink-0 shadow-xs">
                  <img
                    src="/assets/aistudio/IMG-20261020-WA0007_92126746.jpg"
                    alt="شعار منظمة أبو الأيتام الرسمي"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 font-bold block">الشعار الرسمي للمنظمة</span>
                  <span className="text-xs sm:text-sm font-black text-[#17365D] block">منظمة أبو الأيتام</span>
                  <span className="text-[10px] text-[#18864B] font-bold">لكفالة ورعاية الأيتام</span>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 bg-gray-200">
                <img
                  src="/assets/images/sudanese_children_hope.jpg"
                  alt="أطفال سودانيون في أمل وكرامة - منظمة أبو الأيتام"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17365D]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#18864B] inline-block mb-1">
                    أمل وتكافل مستمر
                  </span>
                  <h4 className="text-sm sm:text-base font-bold">
                    أطفال السودان أمانة في أعناقنا، نصنع لهم حاضراً آمناً ومستقبلاً زاهراً
                  </h4>
                </div>
              </div>

              {/* Floating Quick Metric Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-[#18864B]">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-black text-[#17365D]">100%</div>
                  <div className="text-xs text-gray-500 font-semibold">مياه عذبة نقية للمجتمعات العطشى</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Leadership & Direct Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-blue-200 overflow-hidden shrink-0 shadow-sm">
              <img
                src="/assets/aistudio/IMG-20261020-WA0007_92126746.jpg"
                alt="شعار المنظمة"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold">المقر الرئيسي: السودان - الخرطوم</div>
              <div className="text-sm font-bold text-[#17365D]">
                إشراف مدير المنظمة: <span className="text-[#0878C9]">الأستاذ على الله عطاء المنان فرج الله</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:00249123843772"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0878C9] text-xs font-bold transition border border-blue-200"
            >
              <Phone className="w-4 h-4" />
              <span>موبايل:</span>
              <span dir="ltr" className="font-mono">00249123843772</span>
            </a>
            <a
              href="https://wa.me/249966020666"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 hover:bg-green-100 text-[#18864B] text-xs font-bold transition border border-green-200"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>واتساب:</span>
              <span dir="ltr" className="font-mono">00249966020666</span>
            </a>
          </div>
        </div>
      </section>

      {/* SPECIAL FEATURE: Sudanese Audio Broadcast Studio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SudaneseVoiceoverStudio />
      </section>

      {/* Verified Field Achievements & Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200/90 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0878C9] uppercase tracking-wider block mb-1">
              الشفافية الميدانية الموثقة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
              إنجازات بالأرقام.. أثر حقيقي على أرض الواقع
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              جميع الأرقام والإحصاءات مستمدة من سجلات وتقارير لجان المسح الميداني الرسمية للمنظمة في مختلف الولايات.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F5F7FA] border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-lg transition duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-3 ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#17365D] tracking-tight font-mono">
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 font-semibold leading-relaxed">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 Work Sectors Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#18864B] uppercase tracking-wider block mb-1">
              شريان العطاء الإنساني
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
              مجالات العمل الإنساني العشرة
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              برامج منظمة ومدروسة تلبي الاحتياجات الأساسية وتدعم التنمية المستدامة
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('sectors')}
            className="text-sm font-bold text-[#0878C9] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>استعراض كافة المجالات بالتفصيل</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(WORK_SECTORS_DATA).map(([key, item]) => (
            <div
              key={key}
              onClick={() => setCurrentTab('sectors')}
              className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-[#0878C9] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878C9] group-hover:bg-[#0878C9] group-hover:text-white transition flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#17365D] group-hover:text-[#0878C9] transition mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-[#0878C9]">
                <span>التفاصيل والأهداف</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Humanitarian Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0878C9] uppercase tracking-wider block mb-1">
              مشاريع حية قيد التنفيذ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
              المشاريع الإنسانية الحالية في ولايات السودان
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              مشاريع مائية وغذائية وكفالات أسرية خاضعة للرقابة الهندسية والمالية
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('projects')}
            className="text-sm font-bold text-[#0878C9] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>عرض جميع المشاريع المعتمدة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
              onDonateToProject={() => setCurrentTab('donations')}
            />
          ))}
        </div>
      </section>

      {/* Dignified Stories of Hope & Resilience */}
      <section className="bg-gradient-to-br from-[#17365D] to-[#0A1D36] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#D9AE52] uppercase tracking-wider block mb-1">
              أثر التكافل والأمانة
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              قصص أمل.. كيف تصنع كفالتك فارقاً حقيقياً؟
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2">
              تُروى جميع القصص بعد الحصول على الموافقة الحرة المستنيرة للأسر وأولياء الأمور مع حماية بياناتهم الشخصية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#D9AE52] font-bold mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>قصة نجاح وتمكين: مشغل الخياطة المنزلي للأرملة مريم</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  من ألم الفقد إلى عزة الإنتاج واستقرار الأبناء
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  "بعد وفاة زوجي كنت لا أنام الليل قلقاً على أطفالي الثلاثة وإيجار الغرفة. لما تواصلت معي باحثة منظمة أبو الأيتام، ما اكتفوا بسلة الغذاء؛ دربوني على الخياطة وسلموني ماكينة كهربائية. اليوم أنا بكفي أطفالي بكرامتي وبدفع مصاريف مدارسهم."
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>المستفيدة: الأخت مريم ع. - دنقلا</span>
                <span className="text-emerald-400 font-bold">برنامج رعاية وتمكين الأرامل</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#0878C9] font-bold mb-3">
                  <Droplets className="w-4 h-4" />
                  <span>قصة سقيا: محطة مياه ود الحليو الشمسية بريف القضارف</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  انتهت رحلة العطش.. ماء عذب يتدفق في قلوب القرية
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  "كنا نشرب من خيران ملوثة وكان أطفالنا يمرضون بالإسهالات ونتكبد مشاق السفر لجلب جرعة ماء. محطة مياه منظمة أبو الأيتام اليوم شغالة بالطاقة الشمسية بدون انقطاع، روت القرية ومواشينا وفتحت باب استقرار لأكثر من 4,500 شخص."
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>لجنة أهالي القرية - القلابات</span>
                <span className="text-emerald-400 font-bold">مشروع حفر الآبار ومحطات المياه</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Field News & Activities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0878C9] uppercase tracking-wider block mb-1">
              نبض الميدان
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
              أحدث الأخبار والأنشطة الميدانية
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('news')}
            className="text-sm font-bold text-[#0878C9] hover:underline flex items-center gap-1.5"
          >
            <span>جميع التقارير والأخبار</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => setCurrentTab('news')}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="font-semibold text-[#0878C9]">{item.state}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#17365D] line-clamp-2 leading-snug hover:text-[#0878C9] transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0">
                <span className="text-xs font-bold text-[#0878C9] flex items-center gap-1">
                  اقرأ التقرير الكامل
                  <ArrowLeft className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Partners & Humanitarian Networks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-200/90 text-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            التنسيق والعمل المشترك
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-[#17365D] mb-6">
            شبكات التنسيق والجهات الداعمة المعتمدة
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center opacity-80">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs font-bold text-gray-600">
              مفوضية العون الإنساني (HAC)
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs font-bold text-gray-600">
              لجان التكافل والمياه بالأرياف
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs font-bold text-gray-600">
              شبكة المنظمات الوطنية الطوعية
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs font-bold text-gray-600">
              رابطة كافلي الأيتام بالسودان
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#0878C9] uppercase tracking-wider block mb-1">
            إجابات واضحة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
            الأسئلة الشائعة حول المنظمة وبرامجها
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 text-right font-bold text-[#17365D] flex items-center justify-between gap-4 hover:bg-gray-50 transition"
                >
                  <span className="text-sm sm:text-base flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0878C9] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0878C9]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Urgent Bottom Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0878C9] to-[#17365D] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black">
              كن سنداً لأيتام وأرامل السودان اليوم
            </h3>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl">
              صدقتك تروي عطشاناً، وتكفل يتيماً، وتطعم أسرة متعففة في أحلك الظروف. يد على يد تصنع الأمل.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentTab('donations')}
              className="px-8 py-3.5 rounded-2xl bg-[#D9AE52] hover:bg-[#c49a40] text-[#17365D] font-black text-sm sm:text-base shadow-lg transition transform hover:-translate-y-0.5"
            >
              ساهم في التبرع الآن
            </button>
            <button
              onClick={() => setCurrentTab('apply-help')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition"
            >
              تقديم طلب مساعدة
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
