export type SectorType =
  | 'orphans'
  | 'widows'
  | 'families'
  | 'food'
  | 'water'
  | 'wells'
  | 'displaced'
  | 'social'
  | 'emergency'
  | 'development';

export type ApplicationStatus =
  | 'received'          // تم استلام الطلب
  | 'under_review'      // قيد المراجعة الميدانية
  | 'needs_info'        // يحتاج إلى معلومات إضافية
  | 'verified'          // تم التحقق من الحالة
  | 'approved'          // تمت الموافقة المبدئية
  | 'waitlist'          // أُدرج في قائمة الانتظار
  | 'assisted'          // تمت المساعدة والتسليم
  | 'closed';           // أُغلق الطلب

export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'normal';

export interface AssistanceApplication {
  id: string;
  trackingCode: string;
  applicantName: string;
  phone: string;
  whatsapp?: string;
  alternatePhone?: string;
  state: string; // ولاية
  locality: string; // محلية أو منطقة
  addressDetails: string;
  category: SectorType;
  description: string;
  familyMembersCount: number;
  orphansCount: number;
  monthlyIncomeEst?: string;
  housingType: 'owned' | 'rented' | 'shelter' | 'displaced_camp' | 'relatives';
  status: ApplicationStatus;
  statusNotes?: string;
  priority: PriorityLevel;
  internalNotes: string[];
  createdAt: string;
  updatedAt: string;
  documentsAttached: string[];
}

export interface HumanitarianProject {
  id: string;
  title: string;
  slug: string;
  sector: SectorType;
  shortDescription: string;
  fullDescription: string;
  targetBudgetSDG: number;
  collectedAmountSDG: number;
  beneficiariesCount: number;
  state: string;
  locality: string;
  status: 'planning' | 'active' | 'in_progress' | 'completed';
  image: string;
  isVerified: boolean;
  startDate: string;
  completionDate?: string;
  updates: {
    date: string;
    title: string;
    description: string;
    photo?: string;
  }[];
}

export interface OrphanProfile {
  id: string;
  code: string; // e.g. YTM-KRT-042
  gender: 'male' | 'female';
  birthYear: number;
  state: string;
  educationalStage: string;
  healthStatus: string;
  needs: string[];
  monthlySponsorshipCostSDG: number;
  monthlySponsorshipCostUSD: number;
  isSponsored: boolean;
  sponsorCode?: string;
  registeredDate: string;
  lastReportDate: string;
}

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  donorName: string;
  isAnonymous: boolean;
  email?: string;
  phone?: string;
  country: string;
  projectId?: string;
  projectName: string;
  amount: number;
  currency: 'SDG' | 'USD' | 'SAR' | 'AED' | 'EUR';
  type: 'one_time' | 'monthly';
  paymentMethod: 'bankak' | 'fawry' | 'telecom_cash' | 'international_wire' | 'pledge';
  status: 'confirmed' | 'pending_verification' | 'pledged';
  date: string;
  notes?: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  state: string;
  profession: string;
  skills: string[];
  availability: 'weekends' | 'evenings' | 'full_time' | 'on_call';
  experienceDetails: string;
  status: 'pending' | 'interviewed' | 'accepted' | 'active' | 'archived';
  submittedAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'field_update' | 'success_story' | 'press_release' | 'campaign';
  summary: string;
  content: string;
  date: string;
  state: string;
  image: string;
  author: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userRole: AdminRole;
  action: string;
  targetId: string;
  details: string;
}

export type AdminRole =
  | 'super_admin'       // مدير النظام
  | 'finance_admin'     // الإدارة المالية
  | 'caseworker_admin'  // موظف دراسة وبحث الحالات
  | 'project_admin';    // مسؤول المشاريع الميدانية
