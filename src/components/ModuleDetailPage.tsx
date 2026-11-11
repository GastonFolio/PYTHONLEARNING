import { useState } from 'react';
import { modules } from '../data/modules';
import type { UserProgress } from '../data/storage';
import { completeLesson } from '../data/storage';
import { ArrowLeft, CheckCircle, BookOpen, HelpCircle, Rocket, ChevronDown, ChevronUp, Code2 } from 'lucide-react';
import CodeBlock from './CodeBlock';
import ExercisePanel from './ExercisePanel';

interface ModuleDetailPageProps {
  moduleId: string;
  onNavigate: (page: string, data?: Record<string, string>) => void;
  progress: UserProgress;
  onProgressUpdate: () => void;
}

export default function ModuleDetailPage({ moduleId, onNavigate, progress, onProgressUpdate }: ModuleDetailPageProps) {
  const mod = modules.find(m => m.id === moduleId);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  if (!mod) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-gray-400">Module non trouvé.</p>
      </div>
    );
  }

  const lessonIds = mod.lessons.map(l => l.id);
  const completed = lessonIds.filter(id => progress.completedLessons.includes(id)).length;
  const pct = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;

  const handleCompleteLesson = (lessonId: string) => {
    completeLesson(lessonId);
    onProgressUpdate();
  };

  const activeLessonData = mod.lessons.find(l => l.id === activeLesson);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('modules')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Retour aux modules
        </button>

        {/* Module Header */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0"
              style={{ backgroundColor: `${mod.color}15` }}
            >
              {mod.icon}
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Module {mod.number} • {mod.difficulty}
              </span>
              <h1 className="text-3xl font-bold text-white mt-1 mb-2">{mod.title}</h1>
              <p className="text-gray-400 mb-4">{mod.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <BookOpen size={14} /> {mod.lessons.length} leçons
                </span>
                <span>~{mod.estimatedHours}h</span>
                {mod.quiz.length > 0 && <span>✅ {mod.quiz.length} questions quiz</span>}
                {mod.project && <span>🚀 1 projet</span>}
              </div>

              {/* Progress */}
              <div className="mt-4 max-w-md">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progression</span>
                  <span className="font-bold" style={{ color: mod.color }}>{pct}%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: mod.color }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content (when active) */}
        {activeLessonData ? (
          <div className="animate-fade-in">
            <button
              onClick={() => setActiveLesson(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={18} />
              Retour au module
            </button>

            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs text-gray-500">{activeLessonData.duration}</span>
                  <h2 className="text-2xl font-bold text-white">{activeLessonData.title}</h2>
                </div>
                {!progress.completedLessons.includes(activeLessonData.id) ? (
                  <button
                    onClick={() => handleCompleteLesson(activeLessonData.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all text-sm font-semibold"
                  >
                    <CheckCircle size={16} />
                    Marquer comme terminé
                  </button>
                ) : (
                  <span className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                    <CheckCircle size={16} />
                    Terminé ✓
                  </span>
                )}
              </div>

              {/* Lesson Content */}
              <div className="prose prose-invert max-w-none">
                {activeLessonData.content.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white mt-6 mb-3">{line.slice(2)}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-python-yellow mt-6 mb-3">{line.slice(3)}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-white mt-4 mb-2">{line.slice(4)}</h3>;
                  if (line.startsWith('- ')) return <li key={i} className="text-gray-300 ml-4 mb-1">{line.slice(2)}</li>;
                  if (line.startsWith('| ')) {
                    const cells = line.split('|').filter(c => c.trim());
                    if (cells.every(c => c.trim().match(/^-+$/))) return null;
                    return (
                      <div key={i} className="flex gap-4 text-sm py-1">
                        {cells.map((cell, j) => (
                          <span key={j} className={`${j === 0 ? 'text-python-yellow font-mono min-w-[100px]' : 'text-gray-300'}`}>
                            {cell.trim()}
                          </span>
                        ))}
                      </div>
                    );
                  }
                  if (line.trim() === '') return <div key={i} className="h-3" />;
                  
                  // Handle inline code and code blocks
                  if (line.startsWith('```')) return null;
                  
                  // Handle inline code
                  const parts = line.split(/(`[^`]+`)/g);
                  return (
                    <p key={i} className="text-gray-300 mb-2 leading-relaxed">
                      {parts.map((part, j) =>
                        part.startsWith('`') && part.endsWith('`')
                          ? <code key={j} className="bg-python-blue/20 text-python-yellow px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>
                          : <span key={j} dangerouslySetInnerHTML={{ __html: part.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
                      )}
                    </p>
                  );
                })}
              </div>

              {/* Code Examples */}
              {activeLessonData.codeExamples.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    💻 Exemples de Code
                  </h3>
                  {activeLessonData.codeExamples.map((ex, i) => (
                    <CodeBlock
                      key={i}
                      code={ex.code}
                      title={ex.title}
                      explanation={ex.explanation}
                    />
                  ))}
                </div>
              )}

              {/* Exercises */}
              {activeLessonData.exercises && activeLessonData.exercises.length > 0 && (
                <div className="mt-8">
                  <button
                    onClick={() => setExpandedExercise(expandedExercise === activeLessonData.id ? null : activeLessonData.id)}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/30 hover:bg-accent-purple/15 transition-all"
                  >
                    <span className="flex items-center gap-2 font-bold text-accent-purple">
                      <Code2 size={18} />
                      🏋️ Exercices Pratiques ({activeLessonData.exercises.length})
                    </span>
                    {expandedExercise === activeLessonData.id ? <ChevronUp size={18} className="text-accent-purple" /> : <ChevronDown size={18} className="text-accent-purple" />}
                  </button>
                  
                  {expandedExercise === activeLessonData.id && (
                    <div className="mt-4 space-y-4 animate-fade-in">
                      {activeLessonData.exercises.map((exercise) => (
                        <ExercisePanel
                          key={exercise.id}
                          exercise={exercise}
                          onComplete={() => {
                            // Could track exercise completion here
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-10 pt-6 border-t border-white/10 flex justify-between">
                {(() => {
                  const idx = mod.lessons.findIndex(l => l.id === activeLessonData.id);
                  const prev = idx > 0 ? mod.lessons[idx - 1] : null;
                  const next = idx < mod.lessons.length - 1 ? mod.lessons[idx + 1] : null;
                  return (
                    <>
                      {prev ? (
                        <button onClick={() => setActiveLesson(prev.id)} className="text-sm text-gray-400 hover:text-white transition-colors">
                          ← {prev.title}
                        </button>
                      ) : <div />}
                      {next ? (
                        <button onClick={() => setActiveLesson(next.id)} className="text-sm text-python-yellow hover:text-white transition-colors">
                          {next.title} →
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigate('quiz', { moduleId: mod.id })}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-python-yellow/20 text-python-yellow border border-python-yellow/30 hover:bg-python-yellow/30 transition-all text-sm font-semibold"
                        >
                          Passer le Quiz →
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Lessons List */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen size={20} />
                Leçons
              </h2>
              <div className="space-y-3">
                {mod.lessons.map((lesson, i) => {
                  const isCompleted = progress.completedLessons.includes(lesson.id);
                  const exerciseCount = lesson.exercises?.length || 0;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson.id)}
                      className="w-full glass rounded-xl p-4 sm:p-5 text-left card-hover group flex items-center gap-4"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                          isCompleted
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-white/5 text-gray-500 border border-white/10'
                        }`}
                      >
                        {isCompleted ? <CheckCircle size={18} /> : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-python-yellow transition-colors">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span>{lesson.duration}</span>
                          <span>{lesson.codeExamples.length} exemples</span>
                          {exerciseCount > 0 && <span>🏋️ {exerciseCount} exercice(s)</span>}
                        </div>
                      </div>
                      <ChevronDown size={16} className="text-gray-500 group-hover:text-white transition-colors rotate-[-90deg]" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quiz Section */}
            {mod.quiz.length > 0 && (
              <div className="mb-8">
                <button
                  onClick={() => onNavigate('quiz', { moduleId: mod.id })}
                  className="w-full glass rounded-xl p-6 text-left card-hover group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-python-yellow/10 flex items-center justify-center">
                      <HelpCircle size={24} className="text-python-yellow" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white group-hover:text-python-yellow transition-colors">
                        Quiz — {mod.quiz.length} questions
                      </h3>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Testez vos connaissances sur ce module
                      </p>
                      {progress.quizScores[mod.id] !== undefined && (
                        <span className="text-sm text-python-yellow font-semibold mt-1 inline-block">
                          Meilleur score : {Math.round(progress.quizScores[mod.id] * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Project Section */}
            {mod.project && (
              <div>
                <button
                  onClick={() => onNavigate('project', { moduleId: mod.id })}
                  className="w-full glass rounded-xl p-6 text-left card-hover group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center">
                      <Rocket size={24} className="text-accent-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white group-hover:text-accent-green transition-colors">
                        🚀 Projet : {mod.project.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-0.5">{mod.project.description}</p>
                      {progress.completedProjects.includes(mod.id) && (
                        <span className="text-sm text-green-400 font-semibold mt-1 inline-block flex items-center gap-1">
                          <CheckCircle size={14} /> Projet terminé
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
