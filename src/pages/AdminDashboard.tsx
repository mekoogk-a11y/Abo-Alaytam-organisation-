import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  HandHeart,
  Heart,
  Droplets,
  DollarSign,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  Plus,
  Edit,
  Save,
  Search,
  Lock,
  LogOut,
  Layers,
  ChevronDown,
  UserCheck,
  Eye,
} from 'lucide-react';
import {
  AdminRole,
  ApplicationStatus,
  AssistanceApplication,
  DonationRecord,
  HumanitarianProject,
  OrphanProfile,
  VolunteerApplication,
  AuditLog,
} from '../types';
import { StorageService } from '../services/storage';

interface AdminDashboardProps {
  setCurrentTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentTab }) => {
  // Staff login simulation (secure staff portal)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<AdminRole>('super_admin');
  const [activeTab, setActiveTab] = useState<'applications' | 'donations' | 'orphans' | 'projects' | 'volunteers' | 'audit'>('applications');

  // State data
  const [applications, setApplications] = useState<AssistanceApplication[]>(() =>
    StorageService.getApplications()
  );
  const [donations, setDonations] = useState<DonationRecord[]>(() => StorageService.getDonations());
  const [orphans, setOrphans] = useState<OrphanProfile[]>(() => StorageService.getOrphans());
  const [projects, setProjects] = useState<HumanitarianProject[]>(() => StorageService.getProjects());
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(() => StorageService.getVolunteers());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => StorageService.getAuditLogs());

  // Search and filters
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<AssistanceApplication | null>(null);
  const [newInternalNote, setNewInternalNote] = useState('');
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('under_review');
  const [newStatusNote, setNewStatusNote] = useState('');

  // Role permissions matrix
  const canManageFinance = currentRole === 'super_admin' || currentRole === 'finance_admin';
  const canManageCases = currentRole === 'super_admin' || currentRole === 'caseworker_admin';
  const canManageProjects = currentRole === 'super_admin' || currentRole === 'project_admin';

  // Handle application update
  const handleUpdateApplication = () => {
    if (!selectedApp) return;

    const updated: AssistanceApplication = {
      ...selectedApp,
      status: newStatus,
      statusNotes: newStatusNote || selectedApp.statusNotes,
      internalNotes: newInternalNote.trim()
        ? [
            ...selectedApp.internalNotes,
            `${new Date().toISOString().split('T')[0]} (${currentRole}): ${newInternalNote.trim()}`,
          ]
        : selectedApp.internalNotes,
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveApplication(updated);
    StorageService.logAction(
      currentRole,
      'تحديث حالة طلب مساعدة',
      updated.trackingCode,
      `تم تغيير الحالة إلى "${newStatus}" مع إضافة ملاحظات متابعة`
    );

    // Refresh state
    setApplications(StorageService.getApplications());
    setAuditLogs(StorageService.getAuditLogs());
    setSelectedApp(updated);
    setNewInternalNote('');
    alert('تم حفظ تحديثات الحالة وسجل الملاحظات بنجاح!');
  };

  // Handle donation status confirmation
  const handleConfirmDonation = (don: DonationRecord) => {
    don.status = 'confirmed';
    StorageService.saveDonation(don);
    StorageService.logAction(
      currentRole,
      'تأكيد استلام تبرع مصرفي',
      don.receiptNumber,
      `تم اعتماد إيداع ${don.amount} ${don.currency}`
    );
    setDonations(StorageService.getDonations());
    setAuditLogs(StorageService.getAuditLogs());
  };

  const filteredApps = applications.filter((a) => {
    const matchSearch =
      a.trackingCode.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.applicantName.includes(appSearch) ||
      a.state.includes(appSearch);
    const matchStatus = appStatusFilter === 'all' || a.status === appStatusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Control Bar */}
      <div className="bg-[#17365D] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0878C9] p-2 flex items-center justify-center shrink-0 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#18864B] text-white">
                بوابة الإدارة المركزية
              </span>
              <span className="text-xs text-blue-200">صلاحيات آمنة RBAC</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1">
              لوحة التحكم والإشراف الميداني | منظمة أبو الأيتام
            </h1>
          </div>
        </div>

        {/* Role Switcher (RBAC compliance demonstration) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
            <span className="text-[11px] text-gray-300 block">الصلاحية المفعلة حالياً:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              <option value="super_admin" className="text-[#17365D]">1. مدير النظام العام (Super Admin)</option>
              <option value="caseworker_admin" className="text-[#17365D]">2. موظف دراسة وبحث الحالات (Caseworker)</option>
              <option value="finance_admin" className="text-[#17365D]">3. الإدارة المالية والتدقيق (Finance)</option>
              <option value="project_admin" className="text-[#17365D]">4. مسؤول المشاريع الميدانية (Projects)</option>
            </select>
          </div>

          <button
            onClick={() => setCurrentTab('home')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>العودة للموقع العام</span>
          </button>
        </div>
      </div>

      {/* Quick KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>إجمالي طلبات المساعدة</span>
            <HandHeart className="w-4 h-4 text-[#0878C9]" />
          </div>
          <div className="text-2xl font-black text-[#17365D] font-mono">
            {applications.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">
            {applications.filter((a) => a.status === 'verified' || a.status === 'approved').length} حالة مؤكدة الاستحقاق
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>التبرعات المسجلة</span>
            <DollarSign className="w-4 h-4 text-[#18864B]" />
          </div>
          <div className="text-2xl font-black text-[#17365D] font-mono">
            {donations.length}
          </div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">
            {donations.filter((d) => d.status === 'confirmed').length} تبرعات معتمدة مصرفياً
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>ملفات الأيتام الموثقة</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-[#17365D] font-mono">
            {orphans.length}
          </div>
          <div className="text-[11px] text-purple-600 font-bold mt-1">
            {orphans.filter((o) => o.isSponsored).length} مكفول حالياً
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
            <span>المشاريع الميدانية</span>
            <Droplets className="w-4 h-4 text-[#D9AE52]" />
          </div>
          <div className="text-2xl font-black text-[#17365D] font-mono">
            {projects.length}
          </div>
          <div className="text-[11px] text-gray-500 font-bold mt-1">
            {projects.filter((p) => p.status === 'active' || p.status === 'in_progress').length} قيد التنفيذ المباشر
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        {canManageCases && (
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-[#0878C9] text-white shadow'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <HandHeart className="w-4 h-4" />
            <span>طلبات المساعدة ({applications.length})</span>
          </button>
        )}

        {canManageFinance && (
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'donations'
                ? 'bg-[#0878C9] text-white shadow'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>سجل التبرعات والتحويلات ({donations.length})</span>
          </button>
        )}

        {canManageCases && (
          <button
            onClick={() => setActiveTab('orphans')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'orphans'
                ? 'bg-[#0878C9] text-white shadow'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>ملفات الأيتام ({orphans.length})</span>
          </button>
        )}

        {canManageProjects && (
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#0878C9] text-white shadow'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>المشاريع الميدانية ({projects.length})</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('volunteers')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'volunteers'
              ? 'bg-[#0878C9] text-white shadow'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>المتطوعون ({volunteers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-[#0878C9] text-white shadow'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>سجل التدقيق الإداري (Audit Log)</span>
        </button>
      </div>

      {/* Tab 1: Manage Applications */}
      {activeTab === 'applications' && canManageCases && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
              <input
                type="text"
                placeholder="بحث بكود الطلب، الاسم، أو الولاية..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl pr-9 pl-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              />
            </div>

            <div>
              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="bg-[#F5F7FA] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
              >
                <option value="all">كافة الحالات</option>
                <option value="received">تم الاستلام</option>
                <option value="under_review">قيد المراجعة</option>
                <option value="needs_info">يحتاج لمعلومات</option>
                <option value="verified">تم التحقق</option>
                <option value="approved">تمت الموافقة</option>
                <option value="assisted">تمت المساعدة</option>
                <option value="closed">مغلق</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#F5F7FA] text-gray-600 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4">كود الطلب</th>
                    <th className="p-4">مقدم الطلب</th>
                    <th className="p-4">الهاتف</th>
                    <th className="p-4">الولاية / المحلية</th>
                    <th className="p-4">المجال</th>
                    <th className="p-4">الأولوية</th>
                    <th className="p-4">الحالة الراهنة</th>
                    <th className="p-4 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-blue-50/40 transition">
                      <td className="p-4 font-mono font-bold text-[#0878C9]">{app.trackingCode}</td>
                      <td className="p-4 font-bold text-[#17365D]">{app.applicantName}</td>
                      <td className="p-4 font-mono text-gray-600" dir="ltr">{app.phone}</td>
                      <td className="p-4 text-gray-600">{app.state} - {app.locality}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold text-gray-700">
                          {app.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            app.priority === 'urgent'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {app.priority === 'urgent' ? 'عاجل جداً' : 'عادي'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-[#0878C9]">
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setNewStatus(app.status);
                            setNewStatusNote(app.statusNotes || '');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#0878C9] hover:bg-[#0661a3] text-white font-bold text-xs transition"
                        >
                          دراسة وتحديث
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Application Case Detail & Edit Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 text-right my-8">
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <span className="text-xs text-gray-400">ملف دراسة الحالة الاجتماعية:</span>
                <h3 className="text-xl font-black text-[#17365D]">
                  {selectedApp.applicantName} - <span className="font-mono text-[#0878C9]">{selectedApp.trackingCode}</span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 text-sm"
              >
                إغلاق
              </button>
            </div>

            {/* Case Details */}
            <div className="bg-[#F5F7FA] p-4 rounded-2xl text-xs space-y-2 text-gray-700">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>الولاية: <strong>{selectedApp.state}</strong></div>
                <div>المحلية: <strong>{selectedApp.locality}</strong></div>
                <div>السكن: <strong>{selectedApp.housingType}</strong></div>
                <div>أفراد الأسرة: <strong>{selectedApp.familyMembersCount}</strong></div>
                <div>الأيتام: <strong>{selectedApp.orphansCount}</strong></div>
                <div>الهاتف: <strong className="font-mono">{selectedApp.phone}</strong></div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <span className="text-gray-500 block mb-0.5">وصف الاحتياج المقدم:</span>
                <p className="leading-relaxed font-medium">{selectedApp.description}</p>
              </div>
            </div>

            {/* Change Status */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#17365D]">تحديث مرحلة دراسة الطلب:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">الحالة الإجرائية الجديدة:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  >
                    <option value="received">تم استلام الطلب</option>
                    <option value="under_review">قيد المراجعة الميدانية</option>
                    <option value="needs_info">يحتاج إلى معلومات إضافية</option>
                    <option value="verified">تم التحقق من الحالة</option>
                    <option value="approved">تمت الموافقة المبدئية</option>
                    <option value="waitlist">أُدرج في قائمة الانتظار</option>
                    <option value="assisted">تمت المساعدة والتسليم</option>
                    <option value="closed">مغلق مع التوضيح</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">ملاحظة الحالة للمستفيد (تظهر عند التتبع):</label>
                  <input
                    type="text"
                    value={newStatusNote}
                    onChange={(e) => setNewStatusNote(e.target.value)}
                    placeholder="ملاحظات الباحث للمستفيد..."
                    className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                  />
                </div>
              </div>

              {/* Internal Notes History */}
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">سجل الملاحظات الداخلية للباحثين:</label>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1 max-h-28 overflow-y-auto">
                  {selectedApp.internalNotes.map((note, i) => (
                    <div key={i} className="text-gray-600 font-mono text-[11px]">
                      • {note}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={newInternalNote}
                  onChange={(e) => setNewInternalNote(e.target.value)}
                  placeholder="أضف ملاحظة داخلية جديدة للملف..."
                  className="w-full mt-2 bg-[#F5F7FA] border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0878C9]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleUpdateApplication}
                  className="px-6 py-2.5 rounded-xl bg-[#18864B] hover:bg-[#146f3e] text-white font-bold text-xs transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التحديثات وتسجيل الإجراء</span>
                </button>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Donations */}
      {activeTab === 'donations' && canManageFinance && (
        <div className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-[#17365D] text-sm">سجل التحويلات المصرفية والتعهدات الموثقة</h3>
            <span className="text-xs text-gray-500">إجمالي السجلات: {donations.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#F5F7FA] text-gray-600 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4">رقم الإيصال</th>
                  <th className="p-4">المتبرع</th>
                  <th className="p-4">المبلغ والعملة</th>
                  <th className="p-4">المشروع المستهدف</th>
                  <th className="p-4">طريقة التحويل</th>
                  <th className="p-4">التاريخ</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">إجراء المالية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donations.map((don) => (
                  <tr key={don.id} className="hover:bg-blue-50/40 transition">
                    <td className="p-4 font-mono font-bold text-[#0878C9]">{don.receiptNumber}</td>
                    <td className="p-4 font-bold text-[#17365D]">{don.donorName}</td>
                    <td className="p-4 font-mono font-black text-[#18864B]">
                      {don.amount.toLocaleString('ar-EG')} {don.currency}
                    </td>
                    <td className="p-4 text-gray-600">{don.projectName}</td>
                    <td className="p-4 font-semibold text-gray-700">{don.paymentMethod}</td>
                    <td className="p-4 text-gray-500 font-mono text-[11px]">
                      {new Date(don.date).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          don.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {don.status === 'confirmed' ? 'مؤكد ومودع' : 'قيد المطابقة'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {don.status !== 'confirmed' ? (
                        <button
                          onClick={() => handleConfirmDonation(don)}
                          className="px-3 py-1 rounded-lg bg-[#18864B] hover:bg-[#146f3e] text-white text-[11px] font-bold transition"
                        >
                          تأكيد الاستلام
                        </button>
                      ) : (
                        <span className="text-gray-400 text-[11px]">معتمد بنكياً</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Audit Log (سجل التدقيق الإداري) */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#17365D] text-sm">سجل التدقيق والعمليات الإدارية (Audit Trail)</h3>
              <p className="text-[11px] text-gray-400">توثيق غير قابل للتعديل لكافة الإجراءات الإدارية والمالية لضمان النزاهة والامتثال</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-[#0878C9] font-mono font-bold">
              {auditLogs.length} عملية مسجلة
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#F5F7FA] text-gray-600 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4">الوقت والتاريخ</th>
                  <th className="p-4">الموظف / الدور</th>
                  <th className="p-4">الإجراء</th>
                  <th className="p-4">الكود / المعرف</th>
                  <th className="p-4">تفاصيل العملية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString('ar-EG')}
                    </td>
                    <td className="p-4 font-bold text-[#17365D] font-sans">{log.userRole}</td>
                    <td className="p-4 text-[#0878C9] font-sans font-bold">{log.action}</td>
                    <td className="p-4 text-gray-700 font-bold">{log.targetId}</td>
                    <td className="p-4 text-gray-600 font-sans">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Volunteers */}
      {activeTab === 'volunteers' && (
        <div className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-[#17365D] text-sm">طلبات المتطوعين المسجلين</h3>
          </div>

          <div className="p-6">
            {volunteers.length > 0 ? (
              <div className="space-y-3">
                {volunteers.map((vol) => (
                  <div key={vol.id} className="p-4 rounded-xl bg-[#F5F7FA] border border-gray-200 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#17365D] text-sm">{vol.fullName} ({vol.profession})</div>
                      <div className="text-gray-500">{vol.state} • {vol.skills.join(', ')}</div>
                      <div className="text-gray-400 font-mono mt-0.5">{vol.phone} • {vol.email}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0878C9] font-bold text-xs">
                      {vol.availability}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 text-xs py-8">
                لا توجد طلبات تطوع جديدة حالياً. سيتم عرض الطلبات فور إرسالها من صفحة التطوع.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
