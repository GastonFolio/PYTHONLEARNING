import { useState } from 'react';
import { intensivePaliers, totalIntensiveCount } from '../data/intensive';
import { loadProgress, isPalierUnlocked, isIntensiveExUnlocked, countIntensiveDone } from '../data/storage';
import type { UserProgress } from '../data/storage';
import { allIntensiveExercises } from '../data/intensive';
import { CheckCircle, ChevronRight } from 'lucide-react';
import ExercisePanel from './ExercisePanel';

interface IntensivePageProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
  onProgressUpdate: () => void;
}

export default function IntensivePage({ progress, onProgressUpdate }: IntensivePageProps) {
  const [palierIdx, setPalierIdx] = useState(0);
  const [exIdx, setExIdx] = useState(0);
  const [refresh, setRefresh] = useState(0);

  // Progression fraîche (le parent peut avoir un état daté après validation)
  const fresh: UserProgress = refresh >= 0 ? { ...progress, completedExercises: loadProgress().completedExercises } : progress;
  const doneCount = countIntensiveDone(fresh, allIntensiveExercises().map(e => e.id));
  const total = totalIntensiveCount();
  const pct = Math.round((doneCount / total) * 100);

  const palier = intensivePaliers[palierIdx];
  const palierOpen = isPalierUnlocked(intensivePaliers, fresh, palierIdx);
  const done = fresh.completedExercises || [];

  const handleComplete = () => {
    setRefresh(r => r + 1);
    onProgressUpdate();
    // Avance auto vers l'exercice suivant s'il existe
    if (exIdx < palier.exercises.length - 1) {
      setExIdx(exIdx + 1);
    }
  };

  const current = palier.exercises[exIdx];
  const currentUnlocked = isIntensiveExUnlocked(palier, fresh, exIdx, palierOpen);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🏋️ Entraînement <span className="gradient-text">Intensif</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {total} exercices <strong className="text-white">consécutifs</strong> : chaque exercice déverrouille
            le suivant, chaque palier déverrouille le suivant. Zéro saut possible — la maîtrise se prouve dans l'ordre.
          </p>
          <div className="mt-4 max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Progression intensive</span>
              <span className="font-bold text-python-yellow">{doneCount}/{total} ({pct}%)</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-python-blue to-python-yellow rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Paliers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {intensivePaliers.map((p, i) => {
            const open = isPalierUnlocked(intensivePaliers, fresh, i);
            const pDone = p.exercises.filter(e => done.includes(e.id)).length;
            const active = i === palierIdx;
            return (
              <button
                key={p.id}
                disabled={!open}
                onClick={() => { setPalierIdx(i); setExIdx(0); }}
                className={`rounded-xl p-3 text-center border transition-all ${
                  active
                    ? 'border-python-yellow bg-python-yellow/10'
                    : open
                      ? 'border-white/10 bg-white/5 hover:bg-white/10'
                      : 'border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-2xl mb-1">{open ? p.icon : '🔒'}</div>
                <div className="text-xs font-bold text-white">P{p.number}</div>
                <div className="text-[11px] text-gray-400 truncate">{p.title}</div>
                <div className="text-[11px] font-semibold" style={{ color: p.color }}>
                  {pDone}/{p.exercises.length}
                </div>
              </button>
            );
          })}
        </div>

        {/* Palier info */}
        <div className="glass rounded-2xl p-6 mb-6" style={{ borderTop: `3px solid ${palier.color}` }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {palier.icon} Palier {palier.number} : {palier.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">{palier.description}</p>
              <p className="text-xs text-gray-500 mt-1">📚 Révision conseillée : {palier.moduleRef}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {palier.objectives.map(o => (
                <span key={o} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Liste d'exercices */}
          <div className="lg:col-span-1 space-y-2">
            {palier.exercises.map((ex, i) => {
              const unlocked = isIntensiveExUnlocked(palier, fresh, i, palierOpen);
              const isDone = done.includes(ex.id);
              const active = i === exIdx;
              return (
                <button
                  key={ex.id}
                  disabled={!unlocked}
                  onClick={() => setExIdx(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    active
                      ? 'border-python-blue bg-python-blue/15'
                      : unlocked
                        ? 'border-white/10 bg-white/5 hover:bg-white/10'
                        : 'border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border border-white/20 bg-white/5 flex-shrink-0">
                    {!unlocked ? '🔒' : isDone ? <CheckCircle size={14} className="text-green-400" /> : i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-white truncate">{ex.title}</span>
                    <span className="block text-xs text-gray-500">
                      {ex.difficulty === 'easy' ? '🟢 Facile' : ex.difficulty === 'medium' ? '🟡 Moyen' : '🔴 Difficile'}
                    </span>
                  </span>
                  {active && <ChevronRight size={16} className="text-python-yellow flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Runner */}
          <div className="lg:col-span-2">
            {currentUnlocked ? (
              <ExercisePanel key={current.id} exercise={current} onComplete={handleComplete} />
            ) : (
              <div className="glass rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-white mb-2">Exercice verrouillé</h3>
                <p className="text-gray-400 text-sm">
                  Terminez l'exercice précédent pour déverrouiller celui-ci. Pas de raccourci — c'est ça, l'intensif.
                </p>
              </div>
            )}
            <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-500 leading-relaxed">
              💡 <strong className="text-gray-300">Note d'exécution :</strong> l'éditeur intégré valide vos motifs
              de code et les affichages simples. Pour voir les boucles, fonctions et fichiers s'exécuter pour de vrai,
              copiez votre solution dans VS Code et lancez <code className="bg-white/10 px-1 rounded font-mono text-python-yellow">python script.py</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
