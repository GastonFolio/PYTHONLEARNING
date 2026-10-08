import type { UserProgress } from '../data/storage';
import { CheckCircle, ChevronRight, Clock } from 'lucide-react';

interface JeuxPageProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
}

export interface GameInfo {
  id: string;
  title: string;
  icon: string;
  genre: string;
  color: string;
  duration: string;
  description: string;
  objectives: string[];
  xp: number;
}

export const GAMES: GameInfo[] = [
  {
    id: 'python-hero',
    title: 'Super Python Hero',
    icon: '🐍',
    genre: 'Plateformer',
    color: '#3fae4a',
    duration: '~15 min',
    description:
      'Notre premier jeu : un platformer style Super Mario ! Cours, saute sur les bugs, ramasse les pièces et atteins le drapeau sur 3 niveaux.',
    objectives: ['3 niveaux', 'Écraser les 🐛', 'Pièces 🪙 = points'],
    xp: 50,
  },
];

const COMING_SOON = [
  { icon: '🐍', title: 'Snake Python', desc: 'Le serpent classique : mange, grandis, évite les murs.' },
  { icon: '🧱', title: 'PyTetris', desc: 'Empile les blocs qui tombent, fais des lignes.' },
  { icon: '👾', title: 'Invaders du Code', desc: 'Défends la console contre les vagues de bugs.' },
];

export default function JeuxPage({ onNavigate, progress }: JeuxPageProps) {
  const done = progress.completedGames || [];
  const scores = progress.gameScores || {};

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🎮 <span className="gradient-text">Divertissements</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Apprendre, c'est bien. Jouer, c'est mieux ! Des jeux 100% navigateur,
            sans installation. Terminer un jeu rapporte de l'XP et un badge.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
            <span className="text-green-400 font-bold">{done.length}</span>
            <span className="text-gray-400">/ {GAMES.length} jeu(x) terminé(s)</span>
          </div>
        </div>

        {/* Jeux disponibles */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {GAMES.map((g) => {
            const isDone = done.includes(g.id);
            const best = scores[g.id];
            return (
              <button
                key={g.id}
                onClick={() => onNavigate('jeu', { gameId: g.id })}
                className="glass rounded-2xl p-6 sm:p-8 text-left card-hover group"
                style={{ borderTop: `3px solid ${g.color}` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-6xl group-hover:scale-110 transition-transform">{g.icon}</span>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${g.color}20`, color: g.color }}
                    >
                      {g.genre}
                    </span>
                    {isDone && (
                      <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                        <CheckCircle size={14} /> Terminé
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-python-yellow transition-colors">
                  {g.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{g.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {g.objectives.map(o => (
                    <span key={o} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                      {o}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-gray-500">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock size={13} /> {g.duration}</span>
                    <span>🏆 +{g.xp} XP</span>
                    {best !== undefined && <span>⭐ Record {best}</span>}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-python-yellow">
                    Jouer <ChevronRight size={16} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bientôt */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">🔜 Bientôt dans l'arcade</h2>
          <p className="text-gray-500 text-sm">Vote pour ton prochain jeu en continuant à jouer !</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 opacity-70">
          {COMING_SOON.map(c => (
            <div key={c.title} className="glass rounded-xl p-6 text-center">
              <span className="text-4xl mb-2 block grayscale">{c.icon}</span>
              <h3 className="font-bold text-white">{c.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
              <span className="inline-block mt-3 text-xs font-bold px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                En développement
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
