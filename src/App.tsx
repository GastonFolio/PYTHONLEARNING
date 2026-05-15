import { useState, useEffect, useCallback } from 'react';
import { loadProgress } from './data/storage';
import type { UserProgress } from './data/storage';
import { loadPyodideRuntime, isPyodideReady } from './utils/pythonRunner';
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
  const [pyodideStatus, setPyodideStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  const refreshProgress = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  // Update streak on mount + start loading Pyodide in background
  useEffect(() => {
    refreshProgress();

    // Load Pyodide in background — non-blocking
    loadPyodideRuntime().then(ok => {
      setPyodideStatus(ok ? 'ready' : 'fallback');
    });
  }, [refreshProgress]);

  // Poll for Pyodide readiness (in case it finishes later)
  useEffect(() => {
    if (pyodideStatus === 'ready') return;
    const id = setInterval(() => {
      if (isPyodideReady()) {
        setPyodideStatus('ready');
        clearInterval(id);
      }
    }, 2000);
    return () => clearInterval(id);
  }, [pyodideStatus]);

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

      {/* Pyodide status indicator */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${pyodideStatus === 'ready'
            ? 'bg-green-900/60 text-green-400 border-green-700/50'
            : pyodideStatus === 'loading'
              ? 'bg-yellow-900/60 text-yellow-400 border-yellow-700/50 animate-pulse'
              : 'bg-blue-900/60 text-blue-400 border-blue-700/50'
          }`}>
          <span className={`w-2 h-2 rounded-full ${pyodideStatus === 'ready' ? 'bg-green-400' :
              pyodideStatus === 'loading' ? 'bg-yellow-400' : 'bg-blue-400'
            }`} />
          {pyodideStatus === 'ready'
            ? '🐍 Python prêt'
            : pyodideStatus === 'loading'
              ? '⏳ Chargement Python...'
              : '⚡ Mode rapide'}
        </div>
      </div>
    </div>
  );
}
