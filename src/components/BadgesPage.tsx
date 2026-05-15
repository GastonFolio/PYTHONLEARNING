import type { UserProgress } from '../data/storage';
import { BADGE_DEFINITIONS } from '../data/storage';
import { Lock } from 'lucide-react';

interface BadgesPageProps {
  progress: UserProgress;
}

export default function BadgesPage({ progress }: BadgesPageProps) {
  const earnedIds = new Set(progress.badges.map(b => b.id));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🏆 Vos <span className="gradient-text">Badges</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Gagnez des badges en complétant des leçons, quiz et projets.
            Chaque action vous rapproche d'un nouveau succès !
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-python-yellow/10 border border-python-yellow/30">
            <span className="text-python-yellow font-bold">{progress.badges.length}</span>
            <span className="text-gray-400">/ {BADGE_DEFINITIONS.length} badges débloqués</span>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {BADGE_DEFINITIONS.map(def => {
            const earned = earnedIds.has(def.id);
            const badge = progress.badges.find(b => b.id === def.id);

            return (
              <div
                key={def.id}
                className={`glass rounded-2xl p-6 text-center transition-all ${
                  earned
                    ? 'border-python-yellow/30 card-hover'
                    : 'opacity-50'
                }`}
              >
                <div className={`text-5xl mb-3 ${earned ? '' : 'grayscale'}`}>
                  {earned ? def.icon : <Lock size={40} className="mx-auto text-gray-600" />}
                </div>
                <h3 className={`font-bold mb-1 ${earned ? 'text-white' : 'text-gray-500'}`}>
                  {def.title}
                </h3>
                <p className={`text-xs ${earned ? 'text-gray-400' : 'text-gray-600'}`}>
                  {def.description}
                </p>
                {badge && (
                  <p className="text-xs text-python-yellow mt-2">
                    Obtenu le {new Date(badge.earnedAt).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-12 glass rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">📊 Statistiques</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-python-yellow mb-1">{progress.totalXP}</div>
              <div className="text-sm text-gray-400">XP Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-accent-green mb-1">{progress.completedLessons.length}</div>
              <div className="text-sm text-gray-400">Leçons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-accent-purple mb-1">{progress.completedQuizzes.length}</div>
              <div className="text-sm text-gray-400">Quiz</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-accent-orange mb-1">{progress.streak}</div>
              <div className="text-sm text-gray-400">Jours consécutifs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
