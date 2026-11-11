import { modules } from '../data/modules';
import { completeProject } from '../data/storage';
import type { UserProgress } from '../data/storage';
import { ArrowLeft, CheckCircle, Terminal } from 'lucide-react';
import StepByStepProject from './StepByStepProject';

interface ProjectPageProps {
  moduleId: string;
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
  onProgressUpdate: () => void;
}

export default function ProjectPage({ moduleId, onNavigate, progress, onProgressUpdate }: ProjectPageProps) {
  const mod = modules.find(m => m.id === moduleId);

  if (!mod || !mod.project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-gray-400">Projet non disponible.</p>
      </div>
    );
  }

  const project = mod.project;
  const isCompleted = progress.completedProjects.includes(moduleId);

  const handleComplete = () => {
    completeProject(moduleId);
    onProgressUpdate();
  };

  // If project has steps, show step-by-step component
  if (project.steps && project.steps.length > 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <button
            onClick={() => onNavigate('module-detail', { moduleId: mod.id })}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Retour au module
          </button>

          <StepByStepProject
            title={project.title}
            description={project.description}
            objectives={project.objectives}
            steps={project.steps}
            onComplete={handleComplete}
          />

          {isCompleted && (
            <div className="mt-8 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
              <span className="flex items-center justify-center gap-2 text-green-400 font-semibold">
                <CheckCircle size={20} />
                🎉 Projet terminé ! Félicitations !
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Otherwise show simple project description
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <button
          onClick={() => onNavigate('module-detail', { moduleId: mod.id })}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Retour au module
        </button>

        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">{project.title}</h1>
          <p className="text-gray-400 mb-6">{project.description}</p>

          {/* Objectives */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">🎯 Objectifs</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle size={16} className="text-accent-green flex-shrink-0 mt-0.5" />
                  {obj}
                </div>
              ))}
            </div>
          </div>

          {/* Local execution notice */}
          <div className="p-4 rounded-xl bg-python-blue/10 border border-python-blue/20">
            <div className="flex items-start gap-3">
              <Terminal size={20} className="text-python-blue flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white mb-1">⚠️ Projet à exécuter localement</p>
                <p className="text-xs text-gray-400">
                  Ce projet doit être exécuté sur votre machine avec Python installé.
                  Créez un fichier .py dans VS Code et lancez-le avec <code className="text-python-yellow">python nom_fichier.py</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Button */}
        <div className="text-center">
          {isCompleted ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 font-semibold">
              <CheckCircle size={20} />
              Projet marqué comme terminé ! 🎉
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-green to-accent-green/80 text-white font-bold text-lg hover:shadow-lg hover:shadow-accent-green/30 transition-all hover:-translate-y-0.5"
            >
              ✅ J'ai terminé ce projet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
