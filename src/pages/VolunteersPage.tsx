import React, { useState } from 'react';
import {
  Users,
  Heart,
  CheckCircle2,
  Send,
  MapPin,
  Sparkles,
  Award,
  Shield,
} from 'lucide-react';
import { VolunteerApplication } from '../types';
import { StorageService } from '../services/storage';
import { SUDAN_STATES } from '../data/mockData';

interface VolunteersPageProps {
  setCurrentTab: (tab: string) => void;
}

export const VolunteersPage: React.FC<VolunteersPageProps> = ({ setCurrentTab }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState(SUDAN_STATES[0]);
  const [profession, setProfession] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['باحث اجتماعي ميداني']);
  const [availability, setAvailability] = useState<VolunteerApplication['availability']>('on_call');
  const [experienceDetails, setExperienceDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableSkills = [
    'باحث اجتماعي ميداني',
    'طبيب / ممرض / رعاية صحية',
    'مهندس مياه وطاقة شمسية',
    'معلم / إسناد تعليمي للأيتام',
    'لوجستيات وإدارة سلاسل إمداد',
    'إعلام وتوثيق وتصوير إنساني',
    'إسعافات أولية وطوارئ',
    'دعم نفسي واجتماعي للأطفال',
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      alert('يرجى تحديد مهارة أو مجال تطوعي واحد على الأقل.');
      return;
    }

    const newVol: VolunteerApplication = {
      id: 'vol-' + Date.now(),
      fullName,
      phone,
      email,
      state,
      profession,
      skills: selectedSkills,
      availability,
      experienceDetails,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    StorageService.saveVolunteer(newVol);
    StorageService.logAction(
      'super_admin',
      'تسجيل متطوع جديد في نفير المنظمة',
      newVol.id,
      `المتطوع: ${fullName} (${profession}) بولاية ${state}`
    );
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#18864B] via-[#0878C9] to-[#17365D] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
          <Heart className="w-3.5 h-3.5 fill-current text-red-200" />
          <span>نفير وشهامة أبناء السودان</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black">
          انضم إلى فريق متطوعي منظمة أبو الأيتام
        </h1>
        <p className="text-sm sm:text-base text-gray-100 max-w-2xl mx-auto leading-relaxed">
          العمل الإنساني يقوم على سواعد المتطوعين المخلصين. ضع خبرتك ومهارتك ووقتك في خدمة أيتام وأرامل وأهالي السودان في أوقات الشدة.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm space-y-8">
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-[#17365D]">استمارة تسجيل المتطوع الميداني</h2>
            <p className="text-xs text-gray-500 mt-1">
              سيتم التواصل معكم لإجراء المقابلة التعريفية وضمكم لشبكة المتطوعين في ولايتكم
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                الاسم الرباعي: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="الاسم الكامل"
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xxxxxxxx"
                className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                البريد الإلكتروني:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                المهنة أو التخصص الأكاديمي: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="مهندس، معلم، طبيب، خريج، طالب..."
                className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                الولاية التي ترغب في العمل التطوعي بها: <span className="text-red-500">*</span>
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
                أوقات الجاهزية والتفرغ:
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as VolunteerApplication['availability'])}
                className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              >
                <option value="on_call">عند الطوارئ ونداءات الفزعة</option>
                <option value="weekends">عطلات نهاية الأسبوع</option>
                <option value="evenings">الفترات المسائية</option>
                <option value="full_time">تفرغ كامل للمشاريع</option>
              </select>
            </div>
          </div>

          {/* Skill Matrix Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-gray-700">
              المجالات والمهارات التي تود المساهمة بها:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {availableSkills.map((sk) => {
                const isSelected = selectedSkills.includes(sk);
                return (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => toggleSkill(sk)}
                    className={`p-3 rounded-xl text-right text-xs font-semibold border transition ${
                      isSelected
                        ? 'bg-[#18864B] text-white border-[#18864B] shadow-sm'
                        : 'bg-[#F5F7FA] text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {sk}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              موجز عن خبراتك التطوعية السابقة إن وجدت:
            </label>
            <textarea
              rows={3}
              value={experienceDetails}
              onChange={(e) => setExperienceDetails(e.target.value)}
              placeholder="هل شاركت سابقاً في قوافل إغاثية أو لجان أحياء أو مبادرات إنسانية؟"
              className="w-full bg-[#F5F7FA] border border-gray-200 rounded-2xl p-3.5 text-xs text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#18864B] hover:bg-[#146f3e] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>إرسال طلب الانضمام لفريق التطوع</span>
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-green-200 text-center space-y-4 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-14 h-14 text-[#18864B] mx-auto" />
          <h3 className="text-2xl font-black text-[#17365D]">
            مرحباً بك في أسرة منظمة أبو الأيتام
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            تم تسجيل بياناتك ضمن شبكة المتطوعين الوطنية. سيتواصل معك منسق العمل التطوعي بالولاية لترتيب مشاركتك في أقرب نشاط ميداني.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentTab('home')}
              className="px-6 py-2.5 rounded-xl bg-[#0878C9] text-white text-xs font-bold"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
