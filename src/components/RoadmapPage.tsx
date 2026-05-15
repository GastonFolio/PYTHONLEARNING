import { modules } from '../data/modules';
import type { UserProgress } from '../data/storage';
import { CheckCircle, Circle, Lock, ChevronRight } from 'lucide-react';

interface RoadmapPageProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
}

export default function RoadmapPage({ onNavigate, progress }: RoadmapPageProps) {
  const getModuleStatus = (mod: typeof modules[0], index: number) => {
    const lessonIds = mod.lessons.map(l => l.id);
    const completed = lessonIds.filter(id => progress.completedLessons.includes(id)).length;
    const pct = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;

    if (pct === 100) return 'completed';
    if (pct > 0) return 'in-progress';
    if (index === 0) return 'available';
    
    // Check if previous module is at least started
    const prevMod = modules[index - 1];
    const prevCompleted = prevMod.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    if (prevCompleted > 0) return 'available';
    
    return 'locked';
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🗺️ Roadmap <span className="gradient-text">Python</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Votre parcours d'apprentissage Python étape par étape. Suivez la progression
            du débutant absolu au développeur Python autonome.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-python-blue via-python-yellow to-accent-purple" />

          {modules.map((mod, i) => {
            const status = getModuleStatus(mod, i);
            const isLeft = i % 2 === 0;
            const lessonIds = mod.lessons.map(l => l.id);
            const completed = lessonIds.filter(id => progress.completedLessons.includes(id)).length;
            const pct = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;

            return (
              <div
                key={mod.id}
                className={`relative flex items-center mb-12 ${
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } flex-row`}
              >
                {/* Node */}
                <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 ${
                      status === 'completed'
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : status === 'in-progress'
                        ? 'bg-python-yellow/20 border-python-yellow text-python-yellow animate-pulse-glow'
                        : status === 'available'
                        ? 'bg-python-blue/20 border-python-blue text-python-blue'
                        : 'bg-gray-800 border-gray-600 text-gray-500'
                    }`}
                  >
                    {status === 'completed' ? (
                      <CheckCircle size={24} />
                    ) : status === 'locked' ? (
                      <Lock size={18} />
                    ) : (
                      <Circle size={20} />
                    )}
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`ml-20 sm:ml-0 sm:w-[calc(50%-3rem)] ${
                    isLeft ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'
                  }`}
                >
                  <button
                    onClick={() => status !== 'locked' && onNavigate('module-detail', { moduleId: mod.id })}
                    disabled={status === 'locked'}
                    className={`w-full text-left glass rounded-2xl p-6 transition-all ${
                      status === 'locked'
                        ? 'opacity-50 cursor-not-allowed'
                        : 'card-hover cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{mod.icon}</span>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Module {mod.number}
                        </span>
                        <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{mod.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{mod.lessons.length} leçons</span>
                        <span>•</span>
                        <span>~{mod.estimatedHours}h</span>
                        <span>•</span>
                        <span
                          className="font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${mod.color}20`, color: mod.color }}
                        >
                          {mod.difficulty}
                        </span>
                      </div>
                      {status !== 'locked' && <ChevronRight size={16} className="text-gray-500" />}
                    </div>

                    {pct > 0 && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Progression</span>
                          <span style={{ color: mod.color }}>{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, backgroundColor: mod.color }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-16 glass rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">🎓 Objectif Final</h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            À la fin de ce parcours, vous serez capable de créer des applications Python complètes :
            scripts CLI, applications desktop Tkinter, automatisation, analyse de données et plus encore.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Scripts CLI', 'Apps Tkinter', 'Automatisation', 'Web Scraping', 'Analyse CSV', 'APIs'].map(skill => (
              <span key={skill} className="px-4 py-2 rounded-xl bg-accent-purple/10 text-accent-purple text-sm font-medium border border-accent-purple/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
