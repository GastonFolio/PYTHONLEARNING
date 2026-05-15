import { useState } from 'react';
import { Menu, X, BookOpen, Trophy, Map, User } from 'lucide-react';
import type { UserProgress } from '../data/storage';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  progress: UserProgress;
}

export default function Header({ currentPage, onNavigate, progress }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: <BookOpen size={18} /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map size={18} /> },
    { id: 'modules', label: 'Modules', icon: <BookOpen size={18} /> },
    { id: 'badges', label: 'Badges', icon: <Trophy size={18} /> },
    { id: 'profile', label: 'Profil', icon: <User size={18} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
            <span className="text-3xl group-hover:animate-float">🐍</span>
            <div>
              <span className="text-xl font-bold gradient-text">PyMaster</span>
              <span className="hidden sm:inline text-xs text-gray-400 ml-2">Apprendre Python</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-python-blue/30 text-python-yellow'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* XP Badge */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-python-yellow/10 border border-python-yellow/30">
              <span className="text-sm">⭐</span>
              <span className="text-sm font-bold text-python-yellow">{progress.totalXP} XP</span>
            </div>
            {progress.streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30">
                <span className="text-sm">🔥</span>
                <span className="text-sm font-bold text-orange-400">{progress.streak}j</span>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-python-darker/95 backdrop-blur-xl border-b border-white/10 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-python-blue/30 text-python-yellow'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-3 px-4 pt-3 border-t border-white/10">
              <span className="text-python-yellow font-bold">⭐ {progress.totalXP} XP</span>
              {progress.streak > 0 && (
                <span className="text-orange-400 font-bold">🔥 {progress.streak}j</span>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
