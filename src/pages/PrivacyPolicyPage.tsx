import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0878C9] text-xs font-bold border border-blue-200">
          <Lock className="w-3.5 h-3.5" />
          <span>حماية البيانات وحفظ الكرامة</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          سياسة الخصوصية وحماية بيانات المستفيدين
        </h1>
        <p className="text-sm text-gray-500">
          آخر تحديث: مارس 2026 | معتمدة من مجلس أمناء منظمة أبو الأيتام
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm space-y-8 text-sm text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17365D]">1. التزامنا الأخلاقي والإنساني</h2>
          <p>
            تلتزم "منظمة أبو الأيتام لرعاية وكفالة الأيتام والأرامل" بحماية خصوصية وأمان كافة المستفيدين من أيتام وأرامل وأسر متعففة، وكذلك خصوصية المتبرعين والشركاء والمتطوعين. نحن نؤمن بأن طلب المساعدة الإنسانية حق مشروع لا يجوز أن يقابله أي انتهاك لحرمة الحياة الخاصة أو تشهير بكرامة المحتاج.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17365D]">2. البيانات التي نجمعها ولماذا</h2>
          <ul className="list-disc pr-6 space-y-2 text-xs sm:text-sm text-gray-600">
            <li>
              <strong>بيانات المستفيدين:</strong> الاسم الرباعي، أرقام التواصل، الولاية والمحلية، عدد أفراد الأسرة، والأوراق الثبوتية (شهادات الوفاة، أرقام وطنية). تُستخدم هذه البيانات حصراً للتحقق الميداني وتحديد الاستحقاق الإنساني.
            </li>
            <li>
              <strong>بيانات المتبرعين:</strong> الاسم، البريد، ورقم الهاتف لإصدار إيصالات القبض والتقارير الدورية، مع إتاحة التبرع كفاعل خير دون تسجيل الاسم.
            </li>
            <li>
              <strong>لا نقوم أبداً بجمع أو تخزين أرقام البطاقات المصرفية أو كلمات المرور البنكية</strong> على منصتنا؛ وتتم كافة التحويلات عبر التطبيقات المصرفية المباشرة (مثل بنكك وفوري).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17365D]">3. عدم مشاركة البيانات مع أي طرف ثالث</h2>
          <p>
            نحن لا نبيع ولا نؤجر ولا نشارك أي بيانات شخصية أو مستندات أسرية مع أي جهة تجارية أو إعلانية أو سياسية. يتم تخزين البيانات في خوادم آمنة ومشفرة، ولا يتاح الوصول إليها إلا للباحثين الاجتماعيين المصرح لهم بموجب توقيع ميثاق عدم الإفصاح.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17365D]">4. سياسة التوثيق والتصوير في الميدان</h2>
          <p>
            يُحظر حظراً تاماً على فرق المنظمة الميدانية تصوير وجوه الأطفال الأيتام أو الأرامل أثناء تسليم المعونات بغرض النشر العام على الإنترنت. جميع الصور التوثيقية المسموحة تقتصر على المواد الإغاثية ومحطات المياه وآبار السقيا دون إظهار وجوه المستفيدين حفاظاً على سترهم وكرامتهم.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17365D]">5. حقوق المستفيدين والمتبرعين</h2>
          <p>
            يحق لأي متقدم بطلب مساعدة أو متبرع طلب مراجعة بياناته، أو تعديلها، أو سحب طلبه في أي وقت عبر التواصل مع مكتب إدارة السجلات وحماية البيانات:
            <br />
            البريد: <span className="font-mono text-[#0878C9]">privacy@aboalaytam-sudan.org</span>
          </p>
        </section>
      </div>
    </div>
  );
};
