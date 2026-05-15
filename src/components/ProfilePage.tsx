import { useState } from 'react';
import { modules } from '../data/modules';
import type { UserProgress } from '../data/storage';
import { saveProgress, resetProgress } from '../data/storage';
import { User, RotateCcw, Save, AlertTriangle } from 'lucide-react';

interface ProfilePageProps {
  progress: UserProgress;
  onProgressUpdate: () => void;
}

export default function ProfilePage({ progress, onProgressUpdate }: ProfilePageProps) {
  const [name, setName] = useState(progress.userName || '');
  const [saved, setSaved] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalQuizzes = modules.length;
  const totalProjects = modules.filter(m => m.project).length;

  const handleSaveName = () => {
    const updated = { ...progress, userName: name };
    saveProgress(updated);
    onProgressUpdate();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetProgress();
    onProgressUpdate();
    setShowReset(false);
    setName('');
  };

  // Level calculation
  const level = Math.floor(progress.totalXP / 200) + 1;
  const xpForNext = 200 - (progress.totalXP % 200);
  const levelProgress = ((progress.totalXP % 200) / 200) * 100;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            👤 <span className="gradient-text">Profil</span>
          </h1>
        </div>

        {/* User Card */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-python-blue to-python-yellow flex items-center justify-center">
              {progress.userName ? (
                <span className="text-4xl font-bold text-white">
                  {progress.userName.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User size={40} className="text-white" />
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom..."
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-python-blue"
                />
                <button
                  onClick={handleSaveName}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-python-blue/20 text-python-blue hover:bg-python-blue/30 transition-all border border-python-blue/30"
                >
                  <Save size={16} />
                  {saved ? '✓' : 'Sauver'}
                </button>
              </div>
              
              {/* Level */}
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-400">Niveau</span>
                  <span className="text-lg font-black text-python-yellow">{level}</span>
                  <span className="text-xs text-gray-500">({xpForNext} XP pour le suivant)</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden max-w-xs">
                  <div
                    className="h-full bg-gradient-to-r from-python-blue to-python-yellow rounded-full transition-all"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'XP Total', value: progress.totalXP, icon: '⭐', color: '#FFD43B' },
            { label: 'Leçons', value: `${progress.completedLessons.length}/${totalLessons}`, icon: '📚', color: '#10b981' },
            { label: 'Quiz', value: `${progress.completedQuizzes.length}/${totalQuizzes}`, icon: '✅', color: '#8b5cf6' },
            { label: 'Projets', value: `${progress.completedProjects.length}/${totalProjects}`, icon: '🚀', color: '#ef4444' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <span className="text-2xl block mb-1">{stat.icon}</span>
              <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Module Progress */}
        <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">📊 Progression par module</h2>
          <div className="space-y-4">
            {modules.map(mod => {
              const lessonIds = mod.lessons.map(l => l.id);
              const completed = lessonIds.filter(id => progress.completedLessons.includes(id)).length;
              const pct = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;
              const quizScore = progress.quizScores[mod.id];

              return (
                <div key={mod.id} className="flex items-center gap-4">
                  <span className="text-2xl w-10 text-center">{mod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white truncate">{mod.title}</span>
                      <div className="flex items-center gap-3">
                        {quizScore !== undefined && (
                          <span className="text-xs text-python-yellow">Quiz: {Math.round(quizScore * 100)}%</span>
                        )}
                        <span className="text-xs font-bold" style={{ color: mod.color }}>{pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: mod.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        {progress.badges.length > 0 && (
          <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">🏆 Badges obtenus</h2>
            <div className="flex flex-wrap gap-3">
              {progress.badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-python-yellow/10 border border-python-yellow/20">
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-sm font-medium text-white">{badge.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div className="glass rounded-2xl p-6 sm:p-8 border border-red-500/20">
          <h2 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} />
            Zone dangereuse
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Réinitialiser votre progression supprimera toutes vos données locales
            (leçons, quiz, badges, XP). Cette action est irréversible.
          </p>
          
          {showReset ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
              >
                Confirmer la réinitialisation
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="px-4 py-2 rounded-lg border border-white/20 text-gray-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowReset(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <RotateCcw size={16} />
              Réinitialiser la progression
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
