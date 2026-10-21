import React, { useState } from 'react';
import { Search, Filter, MapPin, Layers, Heart } from 'lucide-react';
import { HumanitarianProject, SectorType } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailsModal } from '../components/ProjectDetailsModal';
import { SUDAN_STATES, WORK_SECTORS_DATA } from '../data/mockData';

interface ProjectsPageProps {
  setCurrentTab: (tab: string) => void;
  projects: HumanitarianProject[];
  onDonateToProject: (project: HumanitarianProject) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  setCurrentTab,
  projects,
  onDonateToProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewingProject, setViewingProject] = useState<HumanitarianProject | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.includes(searchQuery) ||
      p.shortDescription.includes(searchQuery) ||
      p.locality.includes(searchQuery);
    const matchesSector = selectedSector === 'all' || p.sector === selectedSector;
    const matchesState = selectedState === 'all' || p.state.includes(selectedState);
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;

    return matchesSearch && matchesSector && matchesState && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#0878C9] uppercase tracking-wider block">
          شفافية ميدانية وإشراف مباشر
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          المشاريع الإنسانية في ولايات السودان
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          نطرح مشاريع حفر الآبار، محطات المياه، السلال الغذائية، وكفالات الأيتام المعتمدة بميزانيات حقيقية ونسب إنجاز موثقة يوماً بيوم.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
            <input
              type="text"
              placeholder="ابحث باسم المشروع أو المنطقة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
            />
          </div>

          {/* Sector Filter */}
          <div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
            >
              <option value="all">كافة مجالات العمل</option>
              {Object.entries(WORK_SECTORS_DATA).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.title}
                </option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
            >
              <option value="all">كافة الولايات السودانية</option>
              {SUDAN_STATES.map((state, i) => (
                <option key={i} value={state.split(' ')[1] || state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
            >
              <option value="all">كافة الحالات التنفيذية</option>
              <option value="active">نشط وقيد جمع التبرع</option>
              <option value="in_progress">قيد التنفيذ الميداني</option>
              <option value="completed">مكتمل وتم تدشينه</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>
            المشاريع المعروضة: <strong>{filteredProjects.length}</strong> من أصل {projects.length}
          </span>
          {(searchQuery || selectedSector !== 'all' || selectedState !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSector('all');
                setSelectedState('all');
                setSelectedStatus('all');
              }}
              className="text-[#0878C9] hover:underline font-bold"
            >
              إعادة تعيين الفلاتر
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={(p) => setViewingProject(p)}
              onDonateToProject={onDonateToProject}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/90 space-y-3">
          <p className="text-gray-500 text-sm">لا توجد مشاريع تطابق الفلاتر المحددة حالياً.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSector('all');
              setSelectedState('all');
              setSelectedStatus('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#0878C9] text-white text-xs font-bold"
          >
            عرض كافة المشاريع
          </button>
        </div>
      )}

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={viewingProject}
        onClose={() => setViewingProject(null)}
        onDonate={(p) => {
          setViewingProject(null);
          onDonateToProject(p);
        }}
      />
    </div>
  );
};
