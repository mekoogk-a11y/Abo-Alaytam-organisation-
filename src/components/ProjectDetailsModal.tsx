import React from 'react';
import {
  X,
  MapPin,
  Users,
  ShieldCheck,
  Calendar,
  Heart,
  Droplets,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { HumanitarianProject } from '../types';

interface ProjectDetailsModalProps {
  project: HumanitarianProject | null;
  onClose: () => void;
  onDonate: (project: HumanitarianProject) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onDonate,
}) => {
  if (!project) return null;

  const progressPercent = Math.min(
    100,
    Math.round((project.collectedAmountSDG / project.targetBudgetSDG) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 text-right my-8">
        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 bg-gray-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Location Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17365D]/90 text-white text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#D9AE52]" />
            <span>{project.state} - {project.locality}</span>
          </div>

          <div className="absolute bottom-4 right-6 left-6 text-white">
            {project.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#18864B] text-white mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                مشروع معتمد وموثق ميدانياً
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-black leading-snug">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Progress & Target Stats */}
          <div className="bg-[#F5F7FA] rounded-2xl p-5 border border-gray-200/90 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-700">
              <span>نسبة الإنجاز المالي:</span>
              <span className="text-[#0878C9] font-mono text-base">{progressPercent}%</span>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#0878C9] to-[#18864B] rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div>
                <span className="text-gray-500 block">الميزانية المعتمدة:</span>
                <span className="font-bold text-[#17365D] font-mono">
                  {project.targetBudgetSDG.toLocaleString('ar-EG')} ج.س
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">المبلغ المجموع فعلياً:</span>
                <span className="font-bold text-[#18864B] font-mono">
                  {project.collectedAmountSDG.toLocaleString('ar-EG')} ج.س
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">المستفيدون الموثقون:</span>
                <span className="font-bold text-[#17365D]">
                  {project.beneficiariesCount.toLocaleString('ar-EG')} مستفيد
                </span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#17365D]">عن المشروع والاحتياج الميداني:</h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Field Updates Timeline */}
          {project.updates && project.updates.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h3 className="text-base font-bold text-[#17365D] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0878C9]" />
                سجل التحديثات والإنجاز الميداني:
              </h3>
              <div className="space-y-3">
                {project.updates.map((up, i) => (
                  <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-bold text-[#17365D]">{up.title}</span>
                      <span className="font-mono">{up.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{up.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs in Modal Footer */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onDonate(project);
              }}
              className="flex-1 py-3 px-6 rounded-xl bg-[#0878C9] hover:bg-[#0661a3] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current text-red-200" />
              <span>ساهم في تمويل هذا المشروع</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold transition"
            >
              إغلاق النافذة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
