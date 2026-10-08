import { useState, useEffect, useCallback } from 'react';
import { loadProgress } from './data/storage';
import type { UserProgress } from './data/storage';
import { loadPyodideRuntime, isPyodideReady } from './utils/pythonRunner';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import HomePage from './components/HomePage';
import RoadmapPage from './components/RoadmapPage';
import ModulesPage from './components/ModulesPage';
import ProjectsPage from './components/ProjectsPage';
import IntensivePage from './components/IntensivePage';
import VerificationPage from './components/VerificationPage';
import ExamRunner from './components/ExamRunner';
import ProjectDetailPage from './components/ProjectDetailPage';
import ModuleDetailPage from './components/ModuleDetailPage';
import QuizPage from './components/QuizPage';
import ProjectPage from './components/ProjectPage';
import BadgesPage from './components/BadgesPage';
import ProfilePage from './components/ProfilePage';

interface NavigationState {
  page: string;
  data: Record<string, string>;
}

// Breadcrumb definitions per page
const breadcrumbMap: Record<string, (data: Record<string, string>, navigate: (page: string, data?: Record<string, string>) => void) => { label: string; onClick?: () => void }[]> = {
  home: () => [],
  roadmap: () => [{ label: 'Roadmap' }],
  modules: () => [{ label: 'Modules' }],
  badges: () => [{ label: 'Badges' }],
  profile: () => [{ label: 'Profil' }],
  'module-detail': (_data, nav) => [
    { label: 'Modules', onClick: () => nav('modules') },
    { label: _data.moduleTitle || 'Détail' },
  ],
  quiz: (_data, nav) => [
    { label: 'Modules', onClick: () => nav('modules') },
    { label: _data.moduleTitle || 'Module', onClick: () => nav('module-detail', { moduleId: _data.moduleId || '' }) },
    { label: 'Quiz' },
  ],
  project: (_data, nav) => [
    { label: 'Modules', onClick: () => nav('modules') },
    { label: _data.moduleTitle || 'Module', onClick: () => nav('module-detail', { moduleId: _data.moduleId || '' }) },
    { label: 'Projet' },
  ],
};

const VALID_PAGES = [
  'home', 'roadmap', 'modules', 'projects', 'project-detail',
  'module-detail', 'quiz', 'project', 'badges', 'profile',
  'intensive', 'verification', 'exam',
];

// Routage par hash : #/modules, #/module-detail?moduleId=mod-1 ...
// => le bouton retour du navigateur fonctionne, le refresh garde la page,
// et les liens vers un module/quiz/projet sont partageables.
function parseHash(): NavigationState {
  try {
    const raw = window.location.hash.replace(/^#\/?/, '');
    const [page, qs] = raw.split('?');
    const data: Record<string, string> = {};
    if (qs) {
      for (const part of qs.split('&')) {
        const [k, v] = part.split('=');
        if (k) data[decodeURIComponent(k)] = decodeURIComponent(v || '');
      }
    }
    if (VALID_PAGES.includes(page)) return { page, data };
  } catch {
    // ignore et retourne l'accueil
  }
  return { page: 'home', data: {} };
}

function toHash(page: string, data?: Record<string, string>): string {
  const qs = data && Object.keys(data).length > 0
    ? '?' + Object.entries(data).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
    : '';
  return `#/${page}${qs}`;
}

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [nav, setNav] = useState<NavigationState>(() => parseHash());
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

  // Synchronise la navigation avec l'URL (bouton retour/refresh/liens)
  useEffect(() => {
    const onHashChange = () => {
      setNav(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) {
      window.location.hash = toHash('home');
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = useCallback((page: string, data?: Record<string, string>) => {
    const hash = toHash(page, data);
    if (window.location.hash === hash) {
      setNav({ page, data: data || {} });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = hash;
    }
  }, []);

  const renderPage = () => {
    switch (nav.page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} progress={progress} />;
      case 'roadmap':
        return <RoadmapPage onNavigate={handleNavigate} progress={progress} />;
      case 'modules':
        return <ModulesPage onNavigate={handleNavigate} progress={progress} />;
      case 'projects':
        return <ProjectsPage onNavigate={handleNavigate} progress={progress} />;
      case 'project-detail':
        return (
          <ProjectDetailPage
            projectId={nav.data.projectId || ''}
            onNavigate={handleNavigate}
            progress={progress}
            onProgressUpdate={refreshProgress}
          />
        );
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
      case 'intensive':
        return (
          <IntensivePage
            onNavigate={handleNavigate}
            progress={progress}
            onProgressUpdate={refreshProgress}
          />
        );
      case 'verification':
        return <VerificationPage onNavigate={handleNavigate} progress={progress} />;
      case 'exam':
        return (
          <ExamRunner
            examId={nav.data.examId || ''}
            onNavigate={handleNavigate}
            onProgressUpdate={refreshProgress}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} progress={progress} />;
    }
  };

  const breadcrumbs = (breadcrumbMap[nav.page] || (() => []))(nav.data, handleNavigate);

  return (
    <div className="min-h-screen bg-python-darker text-white">
      <Header currentPage={nav.page} onNavigate={handleNavigate} progress={progress} />
      <main className="pt-24">
        {breadcrumbs.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        {renderPage()}
      </main>

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
            ? 'Python prêt'
            : pyodideStatus === 'loading'
              ? 'Chargement Python...'
              : 'Mode rapide'}
        </div>
      </div>
    </div>
  );
}
