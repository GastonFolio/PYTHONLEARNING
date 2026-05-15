import { useState, useEffect, useCallback } from 'react';
import { loadProgress } from './data/storage';
import type { UserProgress } from './data/storage';
import Header from './components/Header';
import HomePage from './components/HomePage';
import RoadmapPage from './components/RoadmapPage';
import ModulesPage from './components/ModulesPage';
import ModuleDetailPage from './components/ModuleDetailPage';
import QuizPage from './components/QuizPage';
import ProjectPage from './components/ProjectPage';
import BadgesPage from './components/BadgesPage';
import ProfilePage from './components/ProfilePage';

interface NavigationState {
  page: string;
  data: Record<string, string>;
}

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [nav, setNav] = useState<NavigationState>({ page: 'home', data: {} });

  const refreshProgress = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  // Update streak on mount
  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  const handleNavigate = useCallback((page: string, data?: Record<string, string>) => {
    setNav({ page, data: data || {} });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderPage = () => {
    switch (nav.page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} progress={progress} />;
      case 'roadmap':
        return <RoadmapPage onNavigate={handleNavigate} progress={progress} />;
      case 'modules':
        return <ModulesPage onNavigate={handleNavigate} progress={progress} />;
      case 'module-detail':
        return (
          <ModuleDetailPage
            moduleId={nav.data.moduleId || ''}
            onNavigate={handleNavigate}
            progress={progress}
            onProgressUpdate={refreshProgress}
          />
        );
      case 'quiz':
        return (
          <QuizPage
            moduleId={nav.data.moduleId || ''}
            onNavigate={handleNavigate}
            onProgressUpdate={refreshProgress}
          />
        );
      case 'project':
        return (
          <ProjectPage
            moduleId={nav.data.moduleId || ''}
            onNavigate={handleNavigate}
            progress={progress}
            onProgressUpdate={refreshProgress}
          />
        );
      case 'badges':
        return <BadgesPage progress={progress} />;
      case 'profile':
        return <ProfilePage progress={progress} onProgressUpdate={refreshProgress} />;
      default:
        return <HomePage onNavigate={handleNavigate} progress={progress} />;
    }
  };

  return (
    <div className="min-h-screen bg-python-darker text-white">
      <Header currentPage={nav.page} onNavigate={handleNavigate} progress={progress} />
      <main>{renderPage()}</main>
    </div>
  );
}
