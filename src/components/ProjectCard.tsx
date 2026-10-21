import React from 'react';
import {
  MapPin,
  Users,
  ShieldCheck,
  ArrowLeft,
  Heart,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { HumanitarianProject } from '../types';

interface ProjectCardProps {
  project: HumanitarianProject;
  onSelectProject?: (project: HumanitarianProject) => void;
  onDonateToProject?: (project: HumanitarianProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  onDonateToProject,
}) => {
  const progressPercent = Math.min(
    100,
    Math.round((project.collectedAmountSDG / project.targetBudgetSDG) * 100)
  );

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image Banner */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-gray-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* State / Location Tag */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#17365D]/90 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
          <MapPin className="w-3.5 h-3.5 text-[#D9AE52]" />
          <span>{project.state}</span>
        </div>

        {/* Verified Status Tag */}
        {project.isVerified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#18864B]/95 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-bold shadow">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>مشروع معتمد</span>
          </div>
        )}

        {/* Bottom Title inside Image */}
        <div className="absolute bottom-3 right-3 left-3 text-white">
          <span className="text-[11px] font-semibold text-amber-300 block mb-0.5">
            {project.locality}
          </span>
          <h3 className="text-base sm:text-lg font-bold line-clamp-1 leading-snug">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Metrics Grid */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
            <span className="flex items-center gap-1 text-gray-500">
              <Users className="w-3.5 h-3.5 text-[#0878C9]" />
              المستفيدون المستهدفون:
            </span>
            <span className="font-bold text-[#17365D]">
              {project.beneficiariesCount.toLocaleString('ar-EG')} مستفيد
            </span>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1 font-semibold">
              <span className="text-gray-500">المجموع الموثق:</span>
              <span className="text-[#0878C9] font-bold font-mono">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#0878C9] to-[#18864B] rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
              <span>
                المحقق: {(project.collectedAmountSDG / 1000000).toFixed(1)} مليون ج.س
              </span>
              <span>
                الهدف: {(project.targetBudgetSDG / 1000000).toFixed(1)} مليون ج.س
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          {onDonateToProject && (
            <button
              onClick={() => onDonateToProject(project)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#0878C9] hover:bg-[#0661a3] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-red-200" />
              <span>ساهم الآن</span>
            </button>
          )}

          {onSelectProject && (
            <button
              onClick={() => onSelectProject(project)}
              className="py-2.5 px-3 rounded-xl border border-gray-300 hover:border-[#0878C9] text-gray-700 hover:text-[#0878C9] text-xs font-bold transition flex items-center gap-1"
            >
              <span>التفاصيل والتقارير</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
