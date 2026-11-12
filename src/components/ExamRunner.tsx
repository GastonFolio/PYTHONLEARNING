import { useState, useEffect } from 'react';
import { exams } from '../data/verification';
import { completeExam, loadProgress } from '../data/storage';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Clock, Trophy, Eye, EyeOff } from 'lucide-react';
import ExercisePanel from './ExercisePanel';

interface ExamRunnerProps {
  examId: string;
  onNavigate: (page: string, data?: Record<string, string>) => void;
  onProgressUpdate: () => void;
}

type Phase = 'qcm' | 'theorie' | 'pratique' | 'resultat';

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function ExamRunner({ examId, onNavigate, onProgressUpdate }: ExamRunnerProps) {
  const exam = exams.find(e => e.id === examId);

  const [phase, setPhase] = useState<Phase>(() => {
    if (!exam) return 'qcm';
    if (exam.questions.length > 0) return 'qcm';
    if (exam.theory && exam.theory.length > 0) return 'theorie';
    return 'pratique';
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => (exam ? new Array(exam.questions.length).fill(null) : []));
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => (exam ? exam.durationMinutes * 60 : 0));

  // --- Théorie : réponse libre + auto-évaluation ---
  const [theoryText, setTheoryText] = useState<string[]>(() => (exam?.theory ? exam.theory.map(() => '') : []));
  const [theoryRevealed, setTheoryRevealed] = useState<boolean[]>(() => (exam?.theory ? exam.theory.map(() => false) : []));
  const [theoryAssess, setTheoryAssess] = useState<(number | null)[]>(() => (exam?.theory ? exam.theory.map(() => null) : []));

  const [pratiqueDone, setPratiqueDone] = useState<boolean[]>(() => (exam ? exam.practical.map(p => {
    try {
      return (loadProgress().completedExercises || []).includes(p.id);
    } catch {
      return false;
    }
  }) : []));
  const [finalScore, setFinalScore] = useState<number | null>(null);

  // Chronomètre : fin automatique du QCM à 0:00
  useEffect(() => {
    if (phase !== 'qcm' || !exam) return;
    if (timeLeft <= 0) {
      goNextPhaseFromQcm();
      return;
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  if (!exam) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-gray-400">Examen introuvable.</p>
      </div>
    );
  }

  const usesPoints = !!exam.theory || exam.practical.some(p => p.points !== undefined);
  const question = exam.questions[currentQ];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    const next = [...answers];
    next[currentQ] = index;
    setAnswers(next);
    setShowResult(true);
  };

  function goNextPhaseFromQcm() {
    if (exam!.theory && exam!.theory.length > 0) setPhase('theorie');
    else setPhase('pratique');
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleNext = () => {
    if (currentQ < exam.questions.length - 1) {
      setCurrentQ(c => c + 1);
      setShowResult(false);
    } else {
      goNextPhaseFromQcm();
    }
  };

  const handlePratiqueComplete = (i: number) => {
    setPratiqueDone(prev => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
    onProgressUpdate();
  };

  const assessTheory = (i: number, value: number) => {
    setTheoryAssess(prev => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };

  const finishExam = () => {
    let score: number;
    if (usesPoints) {
      const theoryTotal = exam.theory?.reduce((a, t) => a + t.points, 0) ?? 0;
      const theoryEarned = exam.theory?.reduce((a, t, i) => a + t.points * (theoryAssess[i] ?? 0), 0) ?? 0;
      const pratTotal = exam.practical.reduce((a, p) => a + (p.points ?? 10), 0);
      const pratEarned = exam.practical.reduce((a, p, i) => a + (pratiqueDone[i] ? (p.points ?? 10) : 0), 0);
      const max = theoryTotal + pratTotal;
      score = max > 0 ? Math.round(((theoryEarned + pratEarned) / max) * 100) : 0;
    } else {
      const qcmGood = answers.filter((a, i) => a === exam.questions[i].correctIndex).length;
      const qcmPct = exam.questions.length > 0 ? Math.round((qcmGood / exam.questions.length) * 100) : 0;
      const pratPct = exam.practical.length > 0
        ? Math.round((pratiqueDone.filter(Boolean).length / exam.practical.length) * 100)
        : 100;
      score = Math.round(qcmPct * 0.6 + pratPct * 0.4);
    }
    setFinalScore(score);
    completeExam(exam.id, score, exam.xpReward, exam.passingScore);
    onProgressUpdate();
    setPhase('resultat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setPhase(exam.questions.length > 0 ? 'qcm' : exam.theory && exam.theory.length > 0 ? 'theorie' : 'pratique');
    setCurrentQ(0);
    setAnswers(new Array(exam.questions.length).fill(null));
    setShowResult(false);
    setTimeLeft(exam.durationMinutes * 60);
    setTheoryText(exam.theory ? exam.theory.map(() => '') : []);
    setTheoryRevealed(exam.theory ? exam.theory.map(() => false) : []);
    setTheoryAssess(exam.theory ? exam.theory.map(() => null) : []);
    setFinalScore(null);
  };

  // ---------- RÉSULTAT ----------
  if (phase === 'resultat' && finalScore !== null) {
    const passed = finalScore >= exam.passingScore;
    const qcmGood = answers.filter((a, i) => a === exam.questions[i].correctIndex).length;
    const theoryEarned = exam.theory?.reduce((a, t, i) => a + t.points * (theoryAssess[i] ?? 0), 0) ?? 0;
    const theoryTotal = exam.theory?.reduce((a, t) => a + t.points, 0) ?? 0;
    const pratTotal = exam.practical.reduce((a, p) => a + (p.points ?? 10), 0);
    const pratEarned = exam.practical.reduce((a, p, i) => a + (pratiqueDone[i] ? (p.points ?? 10) : 0), 0);

    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl p-8 text-center animate-slide-up">
            <div className="text-6xl mb-6">{passed ? (exam.id === 'exam-certification' ? '🌟' : '🏆') : '📚'}</div>
            <h2 className="text-3xl font-bold text-white mb-2">{passed ? 'Examen validé !' : 'Non validé...'}</h2>
            <p className="text-gray-400 mb-8">{exam.title}</p>

            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={passed ? '#10b981' : '#f59e0b'}
                  strokeWidth="8"
                  strokeDasharray={`${(finalScore / 100) * 339.3} 339.3`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{finalScore}%</span>
                <span className="text-sm text-gray-400">seuil {exam.passingScore}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
              {exam.questions.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-gray-400">QCM</div>
                  <div className="text-white font-bold">{qcmGood}/{exam.questions.length}</div>
                </div>
              )}
              {theoryTotal > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-gray-400">Théorie</div>
                  <div className="text-white font-bold">{theoryEarned}/{theoryTotal} pts</div>
                </div>
              )}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-gray-400">Pratique</div>
                <div className="text-white font-bold">{pratEarned}/{pratTotal} pts</div>
              </div>
            </div>

            <p className="text-gray-300 mb-8">
              {passed
                ? `🎉 Bravo ! +${exam.xpReward} XP (première réussite).`
                : '💪 Relisez les corrections ci-dessous, entraînez-vous en Intensif, puis retentez.'}
            </p>

            {/* Revue théorie */}
            {exam.theory && exam.theory.length > 0 && (
              <div className="text-left space-y-3 mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">✍️ Corrigé théorique</h3>
                {exam.theory.map((t, i) => {
                  const earned = t.points * (theoryAssess[i] ?? 0);
                  return (
                    <div key={t.id} className={`p-4 rounded-xl border ${earned >= t.points ? 'border-green-500/30 bg-green-500/5' : earned > 0 ? 'border-orange-500/30 bg-orange-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                      <p className="text-sm text-white font-medium">Q{i + 1}. {t.question}</p>
                      <p className="text-xs text-gray-400 mt-1">Note : {earned}/{t.points} pts</p>
                      {theoryText[i] && (
                        <p className="text-xs text-gray-500 mt-2 whitespace-pre-wrap"><strong className="text-gray-400">Votre réponse :</strong> {theoryText[i]}</p>
                      )}
                      <p className="text-xs text-gray-300 mt-2 whitespace-pre-wrap"><strong className="text-green-400">Corrigé :</strong> {t.modelAnswer}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Revue QCM */}
            {exam.questions.length > 0 && (
              <div className="text-left space-y-3 mb-8">
                {exam.questions.map((q, i) => {
                  const ok = answers[i] === q.correctIndex;
                  return (
                    <div key={q.id} className={`p-4 rounded-xl border ${ok ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                      <div className="flex items-start gap-3">
                        {ok ? <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" /> : <XCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />}
                        <div>
                          <p className="text-sm text-white font-medium">Q{i + 1}. {q.question}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {answers[i] === null ? '⏱ Sans réponse (temps écoulé). ' : ''}
                            Bonne réponse : {q.options[q.correctIndex]} — {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={restart}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all"
              >
                <RotateCcw size={18} /> Réessayer
              </button>
              <button
                onClick={() => onNavigate('verification')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-python-blue text-white hover:bg-python-blue/80 transition-all"
              >
                <Trophy size={18} /> Retour vérification
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- THÉORIE ----------
  if (phase === 'theorie' && exam.theory) {
    const assessedCount = theoryAssess.filter(a => a !== null).length;
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => onNavigate('verification')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} /> Abandonner
          </button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">✍️ Questions théoriques</h1>
            <p className="text-gray-400 text-sm">
              Rédigez votre réponse, affichez le corrigé, puis évaluez-vous honnêtement.
              Barème : {exam.theory.reduce((a, t) => a + t.points, 0)} points.
            </p>
          </div>

          <div className="space-y-5">
            {exam.theory.map((t, i) => (
              <div key={t.id} className="glass rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="text-base font-bold text-white">
                    <span className="text-python-yellow">Q{i + 1}.</span> {t.question}
                  </h2>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/10 text-gray-300 flex-shrink-0">
                    {t.points} pts
                  </span>
                </div>
                <textarea
                  value={theoryText[i]}
                  onChange={e => {
                    const next = [...theoryText];
                    next[i] = e.target.value;
                    setTheoryText(next);
                  }}
                  rows={4}
                  placeholder="Rédigez votre réponse ici (brouillon conservé pendant la session)..."
                  className="w-full rounded-xl bg-black/30 border border-white/15 p-3 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-python-blue resize-y font-mono"
                />
                <button
                  onClick={() => {
                    const next = [...theoryRevealed];
                    next[i] = !next[i];
                    setTheoryRevealed(next);
                  }}
                  className="mt-3 flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300"
                >
                  {theoryRevealed[i] ? <EyeOff size={15} /> : <Eye size={15} />}
                  {theoryRevealed[i] ? 'Masquer le corrigé' : 'Voir le corrigé'}
                </button>

                {theoryRevealed[i] && (
                  <div className="mt-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/25 animate-fade-in">
                    <p className="text-sm text-gray-200 whitespace-pre-wrap">{t.modelAnswer}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {t.keyPoints.map(k => (
                        <span key={k} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10">
                          ✓ {k}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-gray-400 mt-4 mb-2">Auto-évaluation :</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { v: 1, label: `Acquis (${t.points})`, cls: 'border-green-500/40 text-green-400 hover:bg-green-500/15' },
                        { v: 0.5, label: `Partiel (${t.points / 2})`, cls: 'border-orange-500/40 text-orange-400 hover:bg-orange-500/15' },
                        { v: 0, label: 'À revoir (0)', cls: 'border-red-500/40 text-red-400 hover:bg-red-500/15' },
                      ].map(o => (
                        <button
                          key={o.v}
                          onClick={() => assessTheory(i, o.v)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${o.cls} ${theoryAssess[i] === o.v ? 'bg-white/10 ring-1 ring-white/30' : ''}`}
                        >
                          {theoryAssess[i] === o.v ? '✓ ' : ''}{o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => { setPhase('pratique'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={assessedCount < exam.theory.length}
            className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-python-blue to-python-blue/80 text-white font-bold text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {assessedCount < exam.theory.length
              ? `Auto-évaluez toutes les questions (${assessedCount}/${exam.theory.length})`
              : 'Passer aux épreuves pratiques 💻'}
          </button>
        </div>
      </div>
    );
  }

  // ---------- PRATIQUE ----------
  if (phase === 'pratique') {
    const totalPrat = exam.practical.reduce((a, p) => a + (p.points ?? 10), 0);
    const earnedPrat = exam.practical.reduce((a, p, i) => a + (pratiqueDone[i] ? (p.points ?? 10) : 0), 0);
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => onNavigate('verification')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} /> Quitter l'examen
          </button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">💻 Épreuves pratiques</h1>
            <p className="text-gray-400 text-sm">
              Validez chaque exercice. Points acquis : {earnedPrat}/{totalPrat}.
            </p>
          </div>
          <div className="space-y-6">
            {exam.practical.map((ex, i) => (
              <div key={ex.id}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${pratiqueDone[i] ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-300'}`}>
                    {ex.points ?? 10} pts {pratiqueDone[i] ? '✓' : ''}
                  </span>
                </div>
                <ExercisePanel exercise={ex} onComplete={() => handlePratiqueComplete(i)} />
              </div>
            ))}
          </div>
          <button
            onClick={finishExam}
            className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-python-blue text-white font-bold text-lg hover:shadow-lg transition-all"
          >
            Voir mon résultat 🏆 ({pratiqueDone.filter(Boolean).length}/{exam.practical.length} exercices validés)
          </button>
        </div>
      </div>
    );
  }

  // ---------- QCM ----------
  const answered = answers.filter(a => a !== null).length;
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => onNavigate('verification')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} /> Retour vérification
        </button>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">Question {currentQ + 1}/{exam.questions.length}</span>
            <span className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${timeLeft < 300 ? 'bg-red-500/15 text-red-400' : 'bg-white/5 text-python-yellow'}`}>
              <Clock size={14} /> {formatTime(timeLeft)}
            </span>
          </div>
          <div className="text-xs text-gray-500 mb-4">Répondu : {answered}/{exam.questions.length} — {exam.icon} {exam.title}</div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-python-blue to-python-yellow rounded-full transition-all duration-500"
              style={{ width: `${((currentQ + 1) / exam.questions.length) * 100}%` }}
            />
          </div>

          <h2 className="text-xl font-bold text-white mb-6">{question.question}</h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option, i) => {
              let borderColor = 'border-white/10';
              let bgColor = 'bg-white/5 hover:bg-white/10';
              let textColor = 'text-gray-300';
              if (showResult) {
                if (i === question.correctIndex) {
                  borderColor = 'border-green-500';
                  bgColor = 'bg-green-500/10';
                  textColor = 'text-green-400';
                } else if (i === answers[currentQ] && i !== question.correctIndex) {
                  borderColor = 'border-red-500';
                  bgColor = 'bg-red-500/10';
                  textColor = 'text-red-400';
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border ${borderColor} ${bgColor} ${textColor} transition-all ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-white/20 bg-white/5">
                      {showResult && i === question.correctIndex ? '✓' : showResult && i === answers[currentQ] && i !== question.correctIndex ? '✗' : String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`p-4 rounded-xl mb-6 animate-fade-in ${answers[currentQ] === question.correctIndex ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <p className="text-sm">
                <span className="font-bold text-white">{answers[currentQ] === question.correctIndex ? '✅ Correct !' : '❌ Incorrect'}</span>
                <br />
                <span className="text-gray-300 mt-1 block">{question.explanation}</span>
              </p>
            </div>
          )}

          {showResult && (
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-python-blue to-python-blue/80 text-white font-bold hover:shadow-lg transition-all animate-fade-in"
            >
              {currentQ < exam.questions.length - 1
                ? 'Question suivante →'
                : exam.theory && exam.theory.length > 0
                  ? 'Passer à la théorie ✍️'
                  : 'Passer aux épreuves pratiques 💻'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
