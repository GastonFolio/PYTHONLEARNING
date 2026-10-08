import { standaloneProjects } from '../data/projects';
import type { UserProgress } from '../data/storage';
import { CheckCircle, ChevronRight, Clock } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
}

const LEVEL_COLORS: Record<string, string> = {
  'Débutant': '#10b981',
  'Intermédiaire': '#f59e0b',
  'Avancé': '#ef4444',
};

export default function ProjectsPage({ onNavigate, progress }: ProjectsPageProps) {
  const done = progress.completedProjects.length;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🚀 Projets <span className="gradient-text">Guidés</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            C'est en construisant qu'on devient développeur. Chaque projet est guidé
            étape par étape, avec tout le code fourni et expliqué. Réalisez-les dans
            l'ordre ou au fil des modules.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/30">
            <span className="text-accent-green font-bold">{done}</span>
            <span className="text-gray-400">/ {standaloneProjects.length} projets terminés</span>
          </div>
        </div>

        {/* Conseils */}
        <div className="glass rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start gap-4">
          <span className="text-3xl">💡</span>
          <div className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">Comment travailler un projet :</strong> lisez
            l'objectif de l'étape, essayez d'écrire le code vous-même, validez, puis comparez
            avec la solution. À la fin, <strong className="text-white">téléchargez le .py</strong> et
            exécutez-le sur votre machine avec <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-python-yellow">python projet.py</code> pour
            le voir vivre en vrai (input, fichiers, argparse ne marchent que en local).
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {standaloneProjects.map((proj, i) => {
            const isDone = progress.completedProjects.includes(proj.id);
            const color = LEVEL_COLORS[proj.level] || '#10b981';

            return (
              <button
                key={proj.id}
                onClick={() => onNavigate('project-detail', { projectId: proj.id })}
                className="glass rounded-2xl p-6 sm:p-8 text-left card-hover group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{proj.icon}</span>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      {proj.level}
                    </span>
                    {isDone && (
                      <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                        <CheckCircle size={14} /> Terminé
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Projet {i + 1} • {proj.steps.length} étapes
                </span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-python-yellow transition-colors">
                  {proj.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{proj.description}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {proj.duration}
                  </span>
                  <span>📝 {proj.steps.length} étapes guidées</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.objectives.slice(0, 2).map((obj, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">
                        {obj.length > 32 ? obj.slice(0, 32) + '…' : obj}
                      </span>
                    ))}
                  </div>
                  <ChevronRight size={20} className="text-gray-500 group-hover:text-python-yellow transition-colors flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
