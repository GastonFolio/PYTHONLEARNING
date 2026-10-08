import { exams } from '../data/verification';
import type { UserProgress } from '../data/storage';
import { CheckCircle, ChevronRight, Clock } from 'lucide-react';

interface VerificationPageProps {
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
}

const LEVEL_COLORS: Record<string, string> = {
  'Fondations': '#10b981',
  'Intermédiaire': '#f59e0b',
  'Certification': '#8b5cf6',
};

export default function VerificationPage({ onNavigate, progress }: VerificationPageProps) {
  const scores = progress.examScores || {};
  const done = progress.completedExams || [];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            ✅ Vérification des <span className="gradient-text">connaissances</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Prouvez votre niveau : QCM chronométré (60% de la note) + épreuves pratiques (40%).
            Atteignez le seuil pour valider et gagner de l'XP. La certification exige 80%.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
            <span className="text-purple-400 font-bold">{done.length}</span>
            <span className="text-gray-400">/ {exams.length} examens validés</span>
          </div>
        </div>

        {/* Règles */}
        <div className="glass rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start gap-4">
          <span className="text-3xl">📜</span>
          <div className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">Règles :</strong> le chronomètre tourne dès le début du QCM
            (fin auto à 0:00) — les tentatives sont illimitées mais l'XP n'est donnée qu'à la{' '}
            <strong className="text-white">première réussite</strong> et seul le{' '}
            <strong className="text-white">meilleur score</strong> est conservé. Pour la certification,
            relisez vos erreurs avant de retenter : visez 80% minimum.
          </div>
        </div>

        {/* Exam cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {exams.map((exam) => {
            const best = scores[exam.id];
            const passed = done.includes(exam.id);
            const color = LEVEL_COLORS[exam.level] || '#10b981';
            return (
              <div key={exam.id} className="glass rounded-2xl p-6 sm:p-8 flex flex-col" style={{ borderTop: `3px solid ${color}` }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{exam.icon}</span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    {exam.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{exam.title}</h3>
                <p className="text-sm text-gray-400 mb-4 flex-1">{exam.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {exam.objectives.map(o => (
                    <span key={o} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                      {o}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock size={13} /> {exam.durationMinutes} min</span>
                  <span>❓ {exam.questions.length} QCM</span>
                  <span>💻 {exam.practical.length} pratiques</span>
                  <span>🏆 +{exam.xpReward} XP</span>
                </div>

                {best !== undefined && (
                  <div className={`flex items-center gap-2 text-sm font-bold mb-4 ${passed ? 'text-green-400' : 'text-orange-400'}`}>
                    {passed && <CheckCircle size={16} />}
                    {passed ? `Validé — meilleur score : ${best}%` : `Meilleur score : ${best}% (seuil ${exam.passingScore}%)`}
                  </div>
                )}

                <button
                  onClick={() => onNavigate('exam', { examId: exam.id })}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
                >
                  {passed ? 'Retenter l\'examen' : best !== undefined ? 'Retenter (non validé)' : 'Passer l\'examen'}
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
