import { useState, useEffect } from 'react';
import type { ProjectStep } from '../data/modules';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Lightbulb, Code2, Download } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { executePython } from '../utils/pythonRunner';

interface StepByStepProjectProps {
  title: string;
  description: string;
  objectives: string[];
  steps: ProjectStep[];
  onComplete: () => void;
}

export default function StepByStepProject({
  title,
  description,
  objectives,
  steps,
  onComplete
}: StepByStepProjectProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [codes, setCodes] = useState<string[]>(steps.map(s => s.starterCode));
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [accumulatedCode, setAccumulatedCode] = useState('');

  const currentStep = steps[currentStepIndex];
  const progress = (completedSteps.size / steps.length) * 100;

  useEffect(() => {
    // Build accumulated code from all completed steps
    const completed = codes.slice(0, currentStepIndex).join('\n\n');
    setAccumulatedCode(completed);
  }, [currentStepIndex, codes]);

  const handleCodeChange = (code: string) => {
    const newCodes = [...codes];
    newCodes[currentStepIndex] = code;
    setCodes(newCodes);
  };

  const handleRun = (codeFromEditor?: string) => {
    const currentCode = codeFromEditor || codes[currentStepIndex];
    const fullCode = accumulatedCode + '\n\n' + currentCode;
    const result = executePython(fullCode);
    if (result.error) {
      setOutput(`❌ Erreur: ${result.error}`);
    } else {
      setOutput(result.output || '✅ Code exécuté (aucune sortie)');
    }
  };

  const handleValidate = () => {
    const userCode = codes[currentStepIndex];
    const validation = currentStep.validation;

    // Simple validation: check if the code contains the expected pattern
    const normalizedUser = userCode.replace(/\s+/g, ' ').toLowerCase();
    const normalizedValidation = validation.replace(/\s+/g, ' ').toLowerCase();
    
    if (normalizedUser.includes(normalizedValidation) || 
        userCode.includes(validation) || 
        userCode.replace(/\s/g, '').includes(validation.replace(/\s/g, ''))) {
      
      setOutput('✅ Bravo ! Étape validée avec succès !');
      
      const newCompleted = new Set(completedSteps);
      newCompleted.add(currentStepIndex);
      setCompletedSteps(newCompleted);

      if (newCompleted.size === steps.length) {
        onComplete();
      }

      // Auto advance to next step after showing success
      if (currentStepIndex < steps.length - 1) {
        setTimeout(() => {
          setCurrentStepIndex(currentStepIndex + 1);
          setShowHint(false);
          setOutput('');
        }, 1500);
      }
    } else {
      setOutput(`❌ Le code ne correspond pas à ce qui est attendu.\n\n💡 Indice: Votre code doit contenir "${validation}"\n\nVérifiez votre syntaxe et réessayez.`);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setShowHint(false);
      setOutput('');
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1 && completedSteps.has(currentStepIndex)) {
      setCurrentStepIndex(currentStepIndex + 1);
      setShowHint(false);
      setOutput('');
    }
  };

  const handleDownload = () => {
    const fullCode = codes.filter((_, i) => completedSteps.has(i)).join('\n\n');
    const blob = new Blob([fullCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s/g, '_')}.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-accent-green/10 flex items-center justify-center flex-shrink-0">
            <Code2 size={28} className="text-accent-green" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progression</span>
            <span className="font-bold text-accent-green">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-green to-accent-green/60 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Étape {currentStepIndex + 1}/{steps.length} • {completedSteps.size} complétée(s)
          </p>
        </div>

        {/* Objectives */}
        <div className="grid sm:grid-cols-2 gap-2">
          {objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <CheckCircle size={14} className="text-accent-green flex-shrink-0 mt-0.5" />
              {obj}
            </div>
          ))}
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => {
              if (i <= currentStepIndex || completedSteps.has(i - 1) || i === 0) {
                setCurrentStepIndex(i);
                setShowHint(false);
                setOutput('');
              }
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              i === currentStepIndex
                ? 'bg-python-blue text-white'
                : completedSteps.has(i)
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            {completedSteps.has(i) ? (
              <CheckCircle size={14} />
            ) : (
              <Circle size={14} />
            )}
            {i + 1}
          </button>
        ))}
      </div>

      {/* Current Step */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-gray-500">Étape {currentStepIndex + 1}</span>
            <h3 className="text-lg font-bold text-white">{currentStep.title}</h3>
          </div>
          {completedSteps.has(currentStepIndex) && (
            <span className="flex items-center gap-1 text-green-400 text-sm font-semibold">
              <CheckCircle size={16} /> Validé
            </span>
          )}
        </div>

        <p className="text-gray-300 mb-4">{currentStep.instruction}</p>

        {/* Code Editor */}
        <CodeEditor
          initialCode={codes[currentStepIndex]}
          onCodeChange={handleCodeChange}
          onRun={handleRun}
          output={output}
          height="200px"
        />

        {/* Hint */}
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 mt-4 text-sm text-yellow-400 hover:underline"
        >
          <Lightbulb size={16} />
          {showHint ? 'Masquer l\'indice' : 'Afficher un indice'}
        </button>

        {showHint && (
          <div className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 animate-fade-in">
            <p className="text-sm text-yellow-300">💡 {currentStep.hint}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
            Précédent
          </button>

          {!completedSteps.has(currentStepIndex) ? (
            <button
              onClick={handleValidate}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:shadow-lg transition-all"
            >
              <CheckCircle size={18} />
              Valider cette étape
            </button>
          ) : currentStepIndex < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-python-blue text-white font-semibold hover:bg-python-blue/80 transition-colors"
            >
              Suivant
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-accent-purple text-white font-semibold hover:bg-accent-purple/80 transition-colors"
            >
              <Download size={18} />
              Télécharger le projet
            </button>
          )}
        </div>
      </div>

      {/* Accumulated Code Preview */}
      {completedSteps.size > 0 && (
        <div className="glass rounded-2xl p-6">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Code2 size={16} />
            Code accumulé ({completedSteps.size} étapes)
          </h4>
          <CodeEditor
            initialCode={codes.filter((_, i) => completedSteps.has(i)).join('\n\n')}
            readOnly
            showRunButton={false}
            height="150px"
          />
        </div>
      )}
    </div>
  );
}
