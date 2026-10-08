import { useState, useMemo } from 'react';
import { modules } from '../data/modules';
import type { UserProgress } from '../data/storage';
import { isModuleUnlocked } from '../data/storage';
import { Clock, BookOpen, ChevronRight, CheckCircle, Lock } from 'lucide-react';
import { Search, Filter, Rocket } from 'lucide-react';

interface ModulesPageProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
}

type DifficultyFilter = 'all' | 'Débutant' | 'Intermédiaire' | 'Avancé';

export default function ModulesPage({ onNavigate, progress }: ModulesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');

  const filteredModules = useMemo(() => {
    return modules.filter(mod => {
      const matchesSearch = searchQuery === '' ||
        mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || mod.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  const difficultyColors: Record<string, string> = {
    'Débutant': '#10b981',
    'Intermédiaire': '#f59e0b',
    'Avancé': '#ef4444',
  };

  const filters: { key: DifficultyFilter; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'Débutant', label: 'Débutant' },
    { key: 'Intermédiaire', label: 'Intermédiaire' },
    { key: 'Avancé', label: 'Avancé' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Tous les <span className="gradient-text">Modules</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explorez chaque module en détail. Chaque module contient des leçons,
            des exemples de code, des exercices et un quiz. Les modules se
            déverrouillent au fur et à mesure de votre progression.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un module..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-python-blue focus-ring transition-colors"
              aria-label="Rechercher un module"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-gray-500" />
            {filters.map(f => {
              const count = f.key === 'all' ? modules.length : modules.filter(m => m.difficulty === f.key).length;
              const isActive = difficultyFilter === f.key;
              const color = f.key === 'all' ? '#306998' : difficultyColors[f.key];
              return (
                <button
                  key={f.key}
                  onClick={() => setDifficultyFilter(f.key)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all focus-ring cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  style={isActive
                    ? { backgroundColor: `${color}30`, borderColor: `${color}60`, color }
                    : { backgroundColor: `${color}10`, borderColor: `${color}30` }
                  }
                >
                  {f.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        {(searchQuery || difficultyFilter !== 'all') && (
          <p className="text-sm text-gray-500 mb-6">
            {filteredModules.length} module{filteredModules.length > 1 ? 's' : ''} trouvé{filteredModules.length > 1 ? 's' : ''}
          </p>
        )}

        {/* Module Cards */}
        <div className="space-y-6">
          {filteredModules.length === 0 ? (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">Aucun module ne correspond à votre recherche.</p>
              <button
                onClick={() => { setSearchQuery(''); setDifficultyFilter('all'); }}
                className="mt-4 px-4 py-2 rounded-lg text-python-blue hover:bg-python-blue/10 transition-colors focus-ring cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            filteredModules.map((mod) => {
              const moduleIndex = modules.indexOf(mod);
              const unlocked = isModuleUnlocked(modules, progress, moduleIndex);
              const lessonIds = mod.lessons.map(l => l.id);
              const completed = lessonIds.filter(id => progress.completedLessons.includes(id)).length;
              const pct = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;
              const quizDone = progress.completedQuizzes.includes(mod.id);
              const quizScore = progress.quizScores[mod.id];

              return (
                <button
                  key={mod.id}
                  onClick={() => unlocked && onNavigate('module-detail', { moduleId: mod.id })}
                  disabled={!unlocked}
                  className={`w-full glass rounded-2xl p-6 sm:p-8 text-left group focus-ring ${
                    unlocked ? 'card-hover cursor-pointer' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    {/* Icon & Number */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                        style={{ backgroundColor: `${mod.color}15` }}
                      >
                        {mod.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Module {mod.number}
                        </span>
                        <span
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `${mod.color}20`, color: mod.color }}
                        >
                          {mod.difficulty}
                        </span>
                        {pct === 100 && (
                          <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                            <CheckCircle size={14} /> Terminé
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-python-yellow transition-colors mb-2">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{mod.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen size={14} /> {mod.lessons.length} leçons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> ~{mod.estimatedHours}h
                        </span>
                        {mod.quiz.length > 0 && (
                          <span className="flex items-center gap-1">
                            <CheckCircle size={14} /> {mod.quiz.length} questions
                          </span>
                        )}
                        {mod.project && (
                          <span className="flex items-center gap-1">
                            <Rocket size={14} /> Projet inclus
                          </span>
                        )}
                        {quizDone && quizScore !== undefined && (
                          <span className="text-python-yellow font-semibold">
                            Quiz: {Math.round(quizScore * 100)}%
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {pct > 0 && (
                        <div className="mt-4 max-w-md">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, backgroundColor: mod.color }}
                            />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">{completed}/{lessonIds.length} leçons</span>
                            <span className="text-xs font-semibold" style={{ color: mod.color }}>{pct}%</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    {unlocked ? (
                      <ChevronRight size={24} className="text-gray-500 group-hover:text-python-yellow transition-colors flex-shrink-0 hidden sm:block" />
                    ) : (
                      <span className="flex items-center gap-2 text-gray-500 text-sm flex-shrink-0 hidden sm:flex">
                        <Lock size={18} /> Verrouillé
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
