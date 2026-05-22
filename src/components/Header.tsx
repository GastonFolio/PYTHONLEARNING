import { useState } from 'react';
import { Menu, X, BookOpen, Trophy, Map, User, Terminal } from 'lucide-react';
import type { UserProgress } from '../data/storage';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  progress: UserProgress;
}

// SVG Snake icon to replace emoji
function SnakeIcon({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 2c-1.5 0-3 1-3 3s1 3 3 3" />
      <path d="M8 8c-2 0-4 1.5-4 4s2 4 4 4" />
      <path d="M8 16c-1.5 0-3 1-3 3s1.5 3 3 3" />
      <path d="M8 2v20" />
      <circle cx="10" cy="4" r="0.5" fill="currentColor" />
      <path d="M12 6c2 0 4-1 4-3s-2-3-4-3" />
      <path d="M12 12c2.5 0 5-1.5 5-4s-2.5-4-5-4" />
      <path d="M12 18c2 0 4-1 4-3s-2-3-4-3" />
    </svg>
  );
}

export default function Header({ currentPage, onNavigate, progress }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: <BookOpen size={18} /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map size={18} /> },
    { id: 'modules', label: 'Modules', icon: <Terminal size={18} /> },
    { id: 'badges', label: 'Badges', icon: <Trophy size={18} /> },
    { id: 'profile', label: 'Profil', icon: <User size={18} /> },
  ];

  return (
    <header className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto">
      <div className="glass rounded-2xl border border-white/10 shadow-lg shadow-black/20">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group focus-ring rounded-lg"
              aria-label="Retour à l'accueil"
            >
              <span className="text-python-yellow group-hover:animate-float">
                <SnakeIcon size={28} />
              </span>
              <div>
                <span className="text-lg font-bold gradient-text">PyMaster</span>
                <span className="hidden sm:inline text-xs text-gray-400 ml-2">Apprendre Python</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Navigation principale">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all focus-ring ${
                    currentPage === item.id
                      ? 'bg-python-blue/30 text-python-yellow'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* XP Badge */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-python-yellow/10 border border-python-yellow/30">
                <span className="text-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-python-yellow">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
                <span className="text-sm font-bold text-python-yellow">{progress.totalXP} XP</span>
              </div>
              {progress.streak > 0 && (
                <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                  <span className="text-sm font-bold text-orange-400">{progress.streak}j</span>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300 focus-ring"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-python-darker/95 backdrop-blur-xl border-t border-white/10 animate-slide-up rounded-b-2xl">
            <div className="px-4 py-4 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all focus-ring cursor-pointer ${
                    currentPage === item.id
                      ? 'bg-python-blue/30 text-python-yellow'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <div className="flex items-center gap-3 px-4 pt-3 border-t border-white/10">
                <span className="text-python-yellow font-bold flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {progress.totalXP} XP
                </span>
                {progress.streak > 0 && (
                  <span className="text-orange-400 font-bold flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                    {progress.streak}j
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
