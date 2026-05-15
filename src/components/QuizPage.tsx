import { useState } from 'react';
import { modules } from '../data/modules';
import { completeQuiz } from '../data/storage';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface QuizPageProps {
  moduleId: string;
  onNavigate: (page: string, data?: Record<string, string>) => void;
  onProgressUpdate: () => void;
}

export default function QuizPage({ moduleId, onNavigate, onProgressUpdate }: QuizPageProps) {
  const mod = modules.find(m => m.id === moduleId);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  if (!mod || mod.quiz.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-gray-400">Quiz non disponible.</p>
      </div>
    );
  }

  const quiz = mod.quiz;
  const question = quiz[currentQ];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const newAnswers = [...answers, index];
    setAnswers(newAnswers);

    // Score is computed from answers array

  };

  const handleNext = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const actualScore = answers.reduce((acc: number, ans, i) => acc + (ans === quiz[i].correctIndex ? 1 : 0), 0);
      completeQuiz(moduleId, actualScore / quiz.length);
      onProgressUpdate();
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setFinished(false);
    setAnswers([]);
  };

  const finalScoreValue = answers.length > 0 
    ? Math.round((answers.filter((ans, i) => ans === quiz[i].correctIndex).length / quiz.length) * 100) 
    : 0;

  if (finished) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl p-8 text-center animate-slide-up">
            <div className="text-6xl mb-6">
              {finalScoreValue >= 80 ? '🏆' : finalScoreValue >= 50 ? '👍' : '📚'}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Quiz Terminé !</h2>
            <p className="text-gray-400 mb-8">Module : {mod.title}</p>

            {/* Score Circle */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={finalScoreValue >= 80 ? '#10b981' : finalScoreValue >= 50 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="8"
                  strokeDasharray={`${(finalScoreValue / 100) * 339.3} 339.3`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{finalScoreValue}%</span>
                <span className="text-sm text-gray-400">
                  {answers.filter((ans, i) => ans === quiz[i].correctIndex).length}/{quiz.length}
                </span>
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8">
              {finalScoreValue >= 80
                ? '🎉 Excellent ! Vous maîtrisez ce module !'
                : finalScoreValue >= 50
                ? '👍 Bien joué ! Relisez les leçons pour vous améliorer.'
                : '📚 Continuez à étudier les leçons et réessayez !'}
            </p>

            {/* Answers Review */}
            <div className="text-left space-y-3 mb-8">
              {quiz.map((q, i) => {
                const isCorrect = answers[i] === q.correctIndex;
                return (
                  <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" /> : <XCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />}
                      <div>
                        <p className="text-sm text-white font-medium">{q.question}</p>
                        <p className="text-xs text-gray-400 mt-1">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all"
              >
                <RotateCcw size={18} />
                Réessayer
              </button>
              <button
                onClick={() => onNavigate('module-detail', { moduleId: mod.id })}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-python-blue text-white hover:bg-python-blue/80 transition-all"
              >
                <Trophy size={18} />
                Retour au module
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <button
          onClick={() => onNavigate('module-detail', { moduleId: mod.id })}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Retour au module
        </button>

        <div className="glass rounded-2xl p-6 sm:p-8">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-400">
              Question {currentQ + 1}/{quiz.length}
            </span>
            <span className="text-sm font-bold text-python-yellow">
              {mod.icon} {mod.title}
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-python-blue to-python-yellow rounded-full transition-all duration-500"
              style={{ width: `${((currentQ + 1) / quiz.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold text-white mb-6">{question.question}</h2>

          {/* Options */}
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
                } else if (i === selectedAnswer && i !== question.correctIndex) {
                  borderColor = 'border-red-500';
                  bgColor = 'bg-red-500/10';
                  textColor = 'text-red-400';
                }
              } else if (selectedAnswer === i) {
                borderColor = 'border-python-blue';
                bgColor = 'bg-python-blue/10';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border ${borderColor} ${bgColor} ${textColor} transition-all ${
                    !showResult ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${
                      showResult && i === question.correctIndex ? 'border-green-500 bg-green-500/20' :
                      showResult && i === selectedAnswer ? 'border-red-500 bg-red-500/20' :
                      'border-white/20 bg-white/5'
                    }`}>
                      {showResult && i === question.correctIndex ? '✓' :
                       showResult && i === selectedAnswer && i !== question.correctIndex ? '✗' :
                       String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-4 rounded-xl mb-6 animate-fade-in ${
              selectedAnswer === question.correctIndex
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}>
              <p className="text-sm">
                <span className="font-bold text-white">
                  {selectedAnswer === question.correctIndex ? '✅ Correct !' : '❌ Incorrect'}
                </span>
                <br />
                <span className="text-gray-300 mt-1 block">{question.explanation}</span>
              </p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-python-blue to-python-blue/80 text-white font-bold hover:shadow-lg transition-all animate-fade-in"
            >
              {currentQ < quiz.length - 1 ? 'Question suivante →' : 'Voir les résultats 🏆'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
