import { getStandaloneProject } from '../data/projects';
import { completeProject } from '../data/storage';
import type { UserProgress } from '../data/storage';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import StepByStepProject from './StepByStepProject';

interface ProjectDetailPageProps {
  projectId: string;
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
  onProgressUpdate: () => void;
}

export default function ProjectDetailPage({ projectId, onNavigate, progress, onProgressUpdate }: ProjectDetailPageProps) {
  const project = getStandaloneProject(projectId);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Projet non trouvé.</p>
        <button
          onClick={() => onNavigate('projects')}
          className="text-python-yellow hover:underline"
        >
          ← Retour aux projets
        </button>
      </div>
    );
  }

  const isCompleted = progress.completedProjects.includes(project.id);

  const handleComplete = () => {
    completeProject(project.id);
    onProgressUpdate();
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <button
          onClick={() => onNavigate('projects')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Retour aux projets
        </button>

        <StepByStepProject
          title={`${project.icon} ${project.title}`}
          description={project.description}
          objectives={project.objectives}
          steps={project.steps}
          onComplete={handleComplete}
        />

        {isCompleted && (
          <div className="mt-8 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
            <span className="flex items-center justify-center gap-2 text-green-400 font-semibold">
              <CheckCircle size={20} />
              🎉 Projet terminé ! +100 XP — Pensez à l'exécuter en local pour le voir en vrai.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
