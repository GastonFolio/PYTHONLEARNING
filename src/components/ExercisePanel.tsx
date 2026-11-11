import { useState } from 'react';
import type { Exercise } from '../data/modules';
import { executePythonAsync, validateCode } from '../utils/pythonRunner';
import { RotateCcw, CheckCircle, XCircle, Lightbulb, Eye, EyeOff } from 'lucide-react';
import CodeEditor from './CodeEditor';

interface ExercisePanelProps {
  exercise: Exercise;
  onComplete: () => void;
}

export default function ExercisePanel({ exercise, onComplete }: ExercisePanelProps) {
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [validationResults, setValidationResults] = useState<{
    passed: number;
    total: number;
    results: { passed: boolean; message: string }[];
  } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleRun = async (codeFromEditor?: string) => {
    const codeToRun = codeFromEditor || code;
    setIsRunning(true);
    setValidationResults(null);

    const result = await executePythonAsync(codeToRun);
    if (result.success) {
      setOutput(result.output || '(aucune sortie)');
    } else {
      setOutput(result.output ? result.output + '\n❌ ' + result.error : '❌ ' + (result.error || 'Erreur'));
    }
    setIsRunning(false);
  };

  const handleValidate = async () => {
    setIsRunning(true);

    const result = await executePythonAsync(code);
    setOutput(result.success ? (result.output || '(aucune sortie)') : ('❌ ' + result.error));

    const validation = validateCode(code, exercise.tests);
    setValidationResults(validation);

    if (validation.passed === validation.total) {
      setIsCompleted(true);
      onComplete();
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(exercise.starterCode);
    setOutput('');
    setValidationResults(null);
  };

  const handleNextHint = () => {
    if (currentHint < exercise.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30'
  };
  const difficultyLabels = { easy: '🟢 Facile', medium: '🟡 Moyen', hard: '🔴 Difficile' };

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${difficultyColors[exercise.difficulty]}`}>
              {difficultyLabels[exercise.difficulty]}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                <CheckCircle size={14} /> Complété
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-white">{exercise.title}</h3>
        </div>
      </div>

      {/* Instruction */}
      <div className="bg-python-blue/10 border border-python-blue/20 rounded-xl p-4 mb-4">
        <p className="text-gray-300 text-sm">📋 <strong>Instruction :</strong> {exercise.instruction}</p>
      </div>

      {/* Code Editor */}
      <CodeEditor
        initialCode={code}
        onCodeChange={setCode}
        onRun={handleRun}
        output={output}
        isRunning={isRunning}
        height="180px"
      />

      {/* Validation Results */}
      {validationResults && (
        <div className={`mt-4 p-4 rounded-xl border ${validationResults.passed === validationResults.total
            ? 'bg-green-500/10 border-green-500/30'
            : 'bg-orange-500/10 border-orange-500/30'
          }`}>
          <div className="flex items-center gap-2 mb-2">
            {validationResults.passed === validationResults.total ? (
              <CheckCircle size={18} className="text-green-400" />
            ) : (
              <XCircle size={18} className="text-orange-400" />
            )}
            <span className="font-semibold text-white">
              Tests: {validationResults.passed}/{validationResults.total}
            </span>
          </div>
          <div className="space-y-1">
            {validationResults.results.map((r, i) => (
              <div key={i} className={`text-sm ${r.passed ? 'text-green-400' : 'text-red-400'}`}>
                {r.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          onClick={handleValidate}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors disabled:opacity-50"
        >
          <CheckCircle size={16} />
          Valider
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 text-sm transition-colors"
        >
          <RotateCcw size={16} />
          Réinitialiser
        </button>
        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 text-sm transition-colors"
        >
          <Lightbulb size={16} />
          {showHints ? 'Masquer indices' : 'Indices'}
        </button>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 text-sm transition-colors"
        >
          {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
          {showSolution ? 'Masquer' : 'Solution'}
        </button>
      </div>

      {/* Hints */}
      {showHints && exercise.hints.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-yellow-400" />
            <span className="font-semibold text-yellow-400">
              Indice {currentHint + 1}/{exercise.hints.length}
            </span>
          </div>
          <p className="text-gray-300 text-sm">{exercise.hints[currentHint]}</p>
          {currentHint < exercise.hints.length - 1 && (
            <button onClick={handleNextHint} className="mt-2 text-xs text-yellow-400 hover:underline">
              → Indice suivant
            </button>
          )}
        </div>
      )}

      {/* Solution */}
      {showSolution && (
        <div className="mt-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={16} className="text-purple-400" />
            <span className="font-semibold text-purple-400">Solution</span>
          </div>
          <CodeEditor
            initialCode={exercise.solution}
            readOnly
            showRunButton={false}
            height="150px"
          />
        </div>
      )}
    </div>
  );
}
