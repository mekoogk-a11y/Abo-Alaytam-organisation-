import React, { useState } from 'react';
import {
  Heart,
  HandHeart,
  Droplets,
  Shield,
  Users,
  Waves,
  Tent,
  AlertCircle,
  GraduationCap,
  UtensilsCrossed,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { SectorType } from '../types';
import { WORK_SECTORS_DATA } from '../data/mockData';

interface SectorsPageProps {
  setCurrentTab: (tab: string) => void;
  selectedSectorId?: SectorType;
}

export const SectorsPage: React.FC<SectorsPageProps> = ({
  setCurrentTab,
  selectedSectorId = 'orphans',
}) => {
  const [activeSector, setActiveSector] = useState<SectorType>(selectedSectorId);

  const sectorIcons: Record<SectorType, React.ElementType> = {
    orphans: Heart,
    widows: Shield,
    families: Users,
    food: UtensilsCrossed,
    water: Droplets,
    wells: Waves,
    displaced: Tent,
    social: HandHeart,
    emergency: AlertCircle,
    development: GraduationCap,
  };

  const currentSectorData = WORK_SECTORS_DATA[activeSector];
  const ActiveIcon = sectorIcons[activeSector];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#18864B] uppercase tracking-wider block">
          برامج وميادين العمل الإنساني
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          مجالات العمل الإنساني العشرة
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          نعمل في منظمة أبو الأيتام عبر 10 قطاعات إنسانية وتنموية متكاملة، تهدف إلى إغاثة المحتاجين، وصون الكرامة، وتحقيق التنمية المستدامة في كافة ربوع السودان.
        </p>
      </div>

      {/* Sectors Horizontal/Grid Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {(Object.keys(WORK_SECTORS_DATA) as SectorType[]).map((key) => {
          const item = WORK_SECTORS_DATA[key];
          const Icon = sectorIcons[key];
          const isSelected = activeSector === key;

          return (
            <button
              key={key}
              onClick={() => setActiveSector(key)}
              className={`p-3.5 rounded-2xl text-right transition-all flex flex-col justify-between border cursor-pointer ${
                isSelected
                  ? 'bg-[#17365D] text-white border-[#17365D] shadow-lg ring-2 ring-[#0878C9]/30'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200/90'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${
                  isSelected ? 'bg-white/15 text-[#D9AE52]' : 'bg-blue-50 text-[#0878C9]'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold line-clamp-1">{item.title}</div>
            </button>
          );
        })}
      </div>

      {/* Main Selected Sector Details Card */}
      <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 shadow-sm space-y-8 animate-fadeIn">
        {/* Top Banner of Sector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0878C9] to-[#17365D] text-white flex items-center justify-center shrink-0 shadow-md">
              <ActiveIcon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#18864B] uppercase tracking-wider block mb-1">
                برنامج إنساني معتمد
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
                {currentSectorData.title}
              </h2>
              <p className="text-sm font-semibold text-gray-500 mt-1">
                {currentSectorData.subtitle}
              </p>
            </div>
          </div>

          {/* Action CTAs for this sector */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentTab('donations')}
              className="px-6 py-3 rounded-xl bg-[#0878C9] hover:bg-[#0661a3] text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current text-red-200" />
              <span>ساهم في تمويل هذا البرنامج</span>
            </button>
            <button
              onClick={() => setCurrentTab('apply-help')}
              className="px-5 py-3 rounded-xl border border-gray-300 hover:border-[#17365D] text-gray-700 hover:text-[#17365D] text-xs sm:text-sm font-bold transition flex items-center gap-1.5"
            >
              <HandHeart className="w-4 h-4 text-[#18864B]" />
              <span>طلب مساعدة في هذا المجال</span>
            </button>
          </div>
        </div>

        {/* Detailed Program Description */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#17365D]">وصف البرنامج ومنهجية العمل</h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {currentSectorData.description}
          </p>
        </div>

        {/* Goals & Beneficiaries 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Objectives */}
          <div className="bg-[#F5F7FA] rounded-2xl p-6 border border-gray-200/80 space-y-4">
            <h4 className="text-base font-bold text-[#17365D] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D9AE52]" />
              أهداف البرنامج الميدانية
            </h4>
            <ul className="space-y-2.5">
              {currentSectorData.goals.map((g, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#18864B] shrink-0 mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Groups & Priority States */}
          <div className="bg-[#F5F7FA] rounded-2xl p-6 border border-gray-200/80 space-y-6">
            <div>
              <h4 className="text-base font-bold text-[#17365D] flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#0878C9]" />
                الفئات المستفيدة ذات الأولوية
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentSectorData.targetGroups.map((tg, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700"
                  >
                    {tg}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-base font-bold text-[#17365D] flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[#D9AE52]" />
                الولايات والمناطق ذات الأولوية
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentSectorData.priorityStates.map((st, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-blue-50 text-[#0878C9] text-xs font-bold"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Link to active projects in this sector */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            هل ترغب في استعراض المشاريع الميدانية الجارية في هذا المجال؟
          </span>
          <button
            onClick={() => setCurrentTab('projects')}
            className="text-xs sm:text-sm font-bold text-[#0878C9] hover:underline flex items-center gap-1"
          >
            <span>استعراض المشاريع النشطة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
