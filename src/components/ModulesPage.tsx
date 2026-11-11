import { modules } from '../data/modules';
import type { UserProgress } from '../data/storage';
import { Clock, BookOpen, ChevronRight, CheckCircle } from 'lucide-react';

interface ModulesPageProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
}

export default function ModulesPage({ onNavigate, progress }: ModulesPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            📚 Tous les <span className="gradient-text">Modules</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explorez chaque module en détail. Chaque module contient des leçons,
            des exemples de code, des quiz et un projet pratique.
          </p>
        </div>

        {/* Difficulty Filter Info */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {['Débutant', 'Intermédiaire', 'Avancé'].map(level => {
            const colors: Record<string, string> = {
              'Débutant': '#10b981',
              'Intermédiaire': '#f59e0b',
              'Avancé': '#ef4444',
            };
            const count = modules.filter(m => m.difficulty === level).length;
            return (
              <span
                key={level}
                className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: `${colors[level]}10`,
                  color: colors[level],
                  borderColor: `${colors[level]}30`,
                }}
              >
                {level} ({count})
              </span>
            );
          })}
        </div>

        {/* Module Cards */}
        <div className="space-y-6">
          {modules.map((mod) => {
            const lessonIds = mod.lessons.map(l => l.id);
            const completed = lessonIds.filter(id => progress.completedLessons.includes(id)).length;
            const pct = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;
            const quizDone = progress.completedQuizzes.includes(mod.id);
            const quizScore = progress.quizScores[mod.id];

            return (
              <button
                key={mod.id}
                onClick={() => onNavigate('module-detail', { moduleId: mod.id })}
                className="w-full glass rounded-2xl p-6 sm:p-8 text-left card-hover group"
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
                          ✅ {mod.quiz.length} questions
                        </span>
                      )}
                      {mod.project && (
                        <span className="flex items-center gap-1">
                          🚀 Projet inclus
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
                  <ChevronRight size={24} className="text-gray-500 group-hover:text-python-yellow transition-colors flex-shrink-0 hidden sm:block" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
