import React from 'react';
import { ShieldCheck, Heart, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

export const ChildProtectionPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-[#18864B] text-xs font-bold border border-green-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>حماية وصون الأطفال (Child Safeguarding)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          سياسة حماية وصون كرامة الأطفال الأيتام
        </h1>
        <p className="text-sm text-gray-500">
          وثيقة السياسات الإجرائية المعتمدة للعمل الإنساني الميداني في السودان
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm space-y-8 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17365D]">1. المبدأ الأساسي: مصلحة الطفل الفضلى</h2>
          <p>
            تضع منظمة أبو الأيتام مصلحة الطفل الفضلى وحمايته الجسدية والنفسية والأخلاقية فوق كل اعتبار برامجي أو إعلامي، مسترشدة باتفاقية حقوق الطفل الدولية وقانون الطفل السوداني، ومبادئ الشريعة الإسلامية السمحة في رعاية اليتيم وإكرامه.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17365D]">2. محاذير صارمة في التسويق وجمع التبرعات</h2>
          <ul className="list-disc pr-6 space-y-2 text-xs sm:text-sm text-gray-600">
            <li>
              <strong>حظر استغلال صور الأطفال:</strong> يُمنع منعاً باتاً نشر صور الأطفال الأيتام بملامح حزينة أو مهينة، أو في أوضاع تظهر البؤس لغرض حث الناس على التبرع ("Poverty Porn").
            </li>
            <li>
              <strong>استخدام الأكواد المشفرة:</strong> تُعرض حالات الكفالة برمز مشفر فقط (مثل YTM-SD-101)، مع ذكر العمر والمرحلة الدراسية دون نشر الاسم الكامل أو العنوان المفصل.
            </li>
            <li>
              <strong>الموافقة المستنيرة:</strong> أي توثيق استثنائي لقصة نجاح يتطلب موافقة كتابية صريحة ومستنيرة من ولي أمر الطفل (الأم الأرملة أو الوصي الشرعي) مع حق حجب الوجه.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17365D]">3. فحص وتأهيل الكوادر والمتطوعين</h2>
          <p>
            يخضع جميع الموظفين والباحثين الاجتماعيين والمتطوعين الذين يتعاملون مباشرة مع الأطفال للفحص الأمني والأخلاقي، ويوقعون إقراراً ملزماً بمدونة السلوك الخاصة بحماية الطفل (Code of Conduct)، وتُفرض عقوبات فورية تشمل الفصل والإحالة للعدالة عند أي تجاوز.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17365D]">4. قنوات التبليغ الآمنة لحماية الأطفال</h2>
          <p>
            تخصص المنظمة خطاً ساخناً سرياً للتبليغ عن أي انتهاك أو اشتباه في إساءة معاملة أي طفل مستفيد:
            <br />
            هاتف وموبايل المنظمة: <a href="tel:00249123843772" dir="ltr" className="font-mono font-bold text-[#18864B] hover:underline">00249123843772</a> | واتساب: <a href="https://wa.me/249966020666" target="_blank" rel="noopener noreferrer" dir="ltr" className="font-mono font-bold text-emerald-700 hover:underline">00249966020666</a>
            <br />
            البريد المباشر: <span className="font-mono text-[#0878C9]">safeguarding@aboalaytam-sudan.org</span> (المقر الرئيسي: السودان - الخرطوم)
          </p>
        </section>
      </div>
    </div>
  );
};
