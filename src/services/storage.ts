import {
  AdminRole,
  AssistanceApplication,
  AuditLog,
  DonationRecord,
  HumanitarianProject,
  NewsArticle,
  OrphanProfile,
  VolunteerApplication,
} from '../types';
import {
  INITIAL_APPLICATIONS,
  INITIAL_DONATIONS,
  INITIAL_NEWS,
  INITIAL_ORPHANS,
  INITIAL_PROJECTS,
} from '../data/mockData';

const KEYS = {
  APPLICATIONS: 'abo_aytam_applications_v1',
  PROJECTS: 'abo_aytam_projects_v1',
  ORPHANS: 'abo_aytam_orphans_v1',
  DONATIONS: 'abo_aytam_donations_v1',
  VOLUNTEERS: 'abo_aytam_volunteers_v1',
  AUDIT_LOGS: 'abo_aytam_audit_v1',
  NEWS: 'abo_aytam_news_v1',
};

// Helper for safe JSON
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`Error loading key ${key}:`, e);
    return fallback;
  }
}

function save<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error saving key ${key}:`, e);
  }
}

export const StorageService = {
  // Applications
  getApplications(): AssistanceApplication[] {
    return load<AssistanceApplication[]>(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  },
  saveApplication(app: AssistanceApplication): void {
    const apps = this.getApplications();
    const index = apps.findIndex((a) => a.id === app.id);
    if (index >= 0) {
      apps[index] = app;
    } else {
      apps.unshift(app);
    }
    save(KEYS.APPLICATIONS, apps);
  },
  findApplicationByCode(code: string): AssistanceApplication | undefined {
    const apps = this.getApplications();
    const clean = code.trim().toUpperCase();
    return apps.find((a) => a.trackingCode.trim().toUpperCase() === clean);
  },

  // Projects
  getProjects(): HumanitarianProject[] {
    const list = load<HumanitarianProject[]>(KEYS.PROJECTS, INITIAL_PROJECTS);
    return list.map((p) => {
      if (p.id === 'proj-orphan-02' || (p.image && p.image.includes('photo-1488521787991'))) {
        return { ...p, image: '/assets/images/sudanese_children_hope.jpg' };
      }
      return p;
    });
  },
  saveProject(project: HumanitarianProject): void {
    const list = this.getProjects();
    const index = list.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      list[index] = project;
    } else {
      list.unshift(project);
    }
    save(KEYS.PROJECTS, list);
  },

  // Orphans
  getOrphans(): OrphanProfile[] {
    return load<OrphanProfile[]>(KEYS.ORPHANS, INITIAL_ORPHANS);
  },
  saveOrphan(orphan: OrphanProfile): void {
    const list = this.getOrphans();
    const index = list.findIndex((o) => o.id === orphan.id);
    if (index >= 0) {
      list[index] = orphan;
    } else {
      list.unshift(orphan);
    }
    save(KEYS.ORPHANS, list);
  },

  // Donations
  getDonations(): DonationRecord[] {
    return load<DonationRecord[]>(KEYS.DONATIONS, INITIAL_DONATIONS);
  },
  saveDonation(donation: DonationRecord): void {
    const list = this.getDonations();
    list.unshift(donation);
    save(KEYS.DONATIONS, list);

    // If linked to a project, update project collected amount
    if (donation.projectId) {
      const projects = this.getProjects();
      const p = projects.find((proj) => proj.id === donation.projectId);
      if (p) {
        // Convert to SDG roughly if in USD/SAR for project progress calculation
        let addedSDG = donation.amount;
        if (donation.currency === 'USD') addedSDG = donation.amount * 2600;
        else if (donation.currency === 'SAR') addedSDG = donation.amount * 700;
        else if (donation.currency === 'AED') addedSDG = donation.amount * 700;
        else if (donation.currency === 'EUR') addedSDG = donation.amount * 2800;

        p.collectedAmountSDG += addedSDG;
        this.saveProject(p);
      }
    }
  },

  // Volunteers
  getVolunteers(): VolunteerApplication[] {
    return load<VolunteerApplication[]>(KEYS.VOLUNTEERS, []);
  },
  saveVolunteer(v: VolunteerApplication): void {
    const list = this.getVolunteers();
    list.unshift(v);
    save(KEYS.VOLUNTEERS, list);
  },

  // News
  getNews(): NewsArticle[] {
    return load<NewsArticle[]>(KEYS.NEWS, INITIAL_NEWS);
  },
  saveNews(article: NewsArticle): void {
    const list = this.getNews();
    const index = list.findIndex((n) => n.id === article.id);
    if (index >= 0) {
      list[index] = article;
    } else {
      list.unshift(article);
    }
    save(KEYS.NEWS, list);
  },

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return load<AuditLog[]>(KEYS.AUDIT_LOGS, [
      {
        id: 'log-1',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        userRole: 'caseworker_admin',
        action: 'تحقق من حالة طلب مساعدة',
        targetId: 'ABO-REQ-9821',
        details: 'إتمام الزيارة الميدانية وتحديث الحالة إلى "تم التحقق من الحالة"',
      },
      {
        id: 'log-2',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        userRole: 'finance_admin',
        action: 'تأكيد إيداع تبرع مصرفي',
        targetId: 'REC-2026-0041',
        details: 'مطابقة إشعار تحويل بنكك بمبلغ 1,500,000 ج.س لحساب محطة مياه القضارف',
      },
    ]);
  },
  logAction(userRole: AdminRole, action: string, targetId: string, details: string): void {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      userRole,
      action,
      targetId,
      details,
    });
    save(KEYS.AUDIT_LOGS, logs.slice(0, 200)); // keep last 200 logs
  },
};
