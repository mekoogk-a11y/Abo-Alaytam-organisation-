/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SudaneseVoiceoverStudio } from './components/SudaneseVoiceoverStudio';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SectorsPage } from './pages/SectorsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { DonationsPage } from './pages/DonationsPage';
import { ApplyAssistancePage } from './pages/ApplyAssistancePage';
import { TrackApplicationPage } from './pages/TrackApplicationPage';
import { OrphanSponsorshipPage } from './pages/OrphanSponsorshipPage';
import { TransparencyPage } from './pages/TransparencyPage';
import { PartnersPage } from './pages/PartnersPage';
import { VolunteersPage } from './pages/VolunteersPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ChildProtectionPage } from './pages/ChildProtectionPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { IntroSplash } from './components/IntroSplash';
import { StorageService } from './services/storage';
import { HumanitarianProject, OrphanProfile, NewsArticle } from './types';
import { Radio, X, Heart, HandHeart, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [showAudioStudioModal, setShowAudioStudioModal] = useState<boolean>(false);
  const [selectedDonationProject, setSelectedDonationProject] = useState<HumanitarianProject | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [introKey, setIntroKey] = useState<number>(1);

  const [projects, setProjects] = useState<HumanitarianProject[]>(() => StorageService.getProjects());
  const [orphans, setOrphans] = useState<OrphanProfile[]>(() => StorageService.getOrphans());
  const [news, setNews] = useState<NewsArticle[]>(() => StorageService.getNews());

  // Listen for hash changes or back/forward
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDonateToProject = (project: HumanitarianProject) => {
    setSelectedDonationProject(project);
    handleNav('donations');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#17365D] selection:bg-[#0878C9] selection:text-white" dir="rtl">
      {/* Animated Organization Logo Intro on Site Open */}
      {showIntro && (
        <IntroSplash
          key={introKey}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Offline Connectivity Toast (PWA) */}
      <OfflineIndicator />

      {/* Institutional Global Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleNav}
        openAudioStudio={() => setShowAudioStudioModal(true)}
        replayIntro={() => {
          setShowIntro(true);
          setIntroKey((k) => k + 1);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            setCurrentTab={handleNav}
            projects={projects}
            news={news}
            onSelectProject={(p) => handleDonateToProject(p)}
          />
        )}

        {currentTab === 'about' && <AboutPage setCurrentTab={handleNav} />}

        {currentTab === 'sectors' && <SectorsPage setCurrentTab={handleNav} />}

        {currentTab === 'projects' && (
          <ProjectsPage
            setCurrentTab={handleNav}
            projects={projects}
            onDonateToProject={handleDonateToProject}
          />
        )}

        {currentTab === 'orphans' && (
          <OrphanSponsorshipPage
            setCurrentTab={handleNav}
            orphans={orphans}
          />
        )}

        {currentTab === 'donations' && (
          <DonationsPage
            initialProject={selectedDonationProject}
            projects={projects}
            onDonationSuccess={() => {
              setProjects(StorageService.getProjects());
            }}
          />
        )}

        {currentTab === 'apply-help' && (
          <ApplyAssistancePage
            setCurrentTab={handleNav}
            onApplicationCreated={() => {
              // updated in storage
            }}
          />
        )}

        {currentTab === 'track-help' && (
          <TrackApplicationPage setCurrentTab={handleNav} />
        )}

        {currentTab === 'transparency' && (
          <TransparencyPage setCurrentTab={handleNav} />
        )}

        {currentTab === 'partners' && (
          <PartnersPage setCurrentTab={handleNav} />
        )}

        {currentTab === 'volunteers' && (
          <VolunteersPage setCurrentTab={handleNav} />
        )}

        {currentTab === 'news' && (
          <NewsPage news={news} setCurrentTab={handleNav} />
        )}

        {currentTab === 'contact' && (
          <ContactPage setCurrentTab={handleNav} />
        )}

        {currentTab === 'privacy' && (
          <PrivacyPolicyPage />
        )}

        {currentTab === 'child-protection' && (
          <ChildProtectionPage />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard setCurrentTab={handleNav} />
        )}
      </main>

      {/* Institutional Global Footer */}
      <Footer
        setCurrentTab={handleNav}
        openAudioStudio={() => setShowAudioStudioModal(true)}
      />

      {/* Floating Action Button for Sudanese Voiceover Studio */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => setShowAudioStudioModal(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#17365D] to-[#0878C9] hover:from-[#0E2849] hover:to-[#0661a3] text-white shadow-2xl border-2 border-[#D9AE52]/40 transition transform hover:scale-105 group cursor-pointer"
          title="استمع للإعلان الصوتي الحماسي بالعامية السودانية"
        >
          <div className="w-8 h-8 rounded-full bg-[#D9AE52] flex items-center justify-center text-[#17365D] shrink-0 shadow">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-right">
            <div className="text-[10px] text-amber-300 font-bold leading-none">صوت رجالي حماسي</div>
            <div className="text-xs font-black leading-tight mt-0.5">استوديو الإعلان السوداني</div>
          </div>
        </button>
      </div>

      {/* Sudanese Voiceover Studio Full Modal */}
      {showAudioStudioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative max-w-4xl w-full my-8">
            <button
              onClick={() => setShowAudioStudioModal(false)}
              className="absolute -top-3 -left-3 z-50 w-9 h-9 rounded-full bg-white text-[#17365D] shadow-xl hover:bg-gray-100 flex items-center justify-center border border-gray-200 transition"
              title="إغلاق الاستوديو"
            >
              <X className="w-5 h-5" />
            </button>
            <SudaneseVoiceoverStudio />
          </div>
        </div>
      )}
    </div>
  );
}
