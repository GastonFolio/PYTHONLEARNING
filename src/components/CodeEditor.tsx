import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Copy, Check, Loader2 } from 'lucide-react';
import { executePythonAsync } from '../utils/pythonRunner';

interface CodeEditorProps {
  initialCode: string;
  onRun?: (code: string) => void | Promise<void>;
  onCodeChange?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
  showRunButton?: boolean;
  output?: string;
  isRunning?: boolean;
  /** If true, the editor manages its own execution via Pyodide (ignores onRun) */
  selfExecute?: boolean;
}

export default function CodeEditor({
  initialCode,
  onRun,
  onCodeChange,
  readOnly = false,
  height = '200px',
  showRunButton = true,
  output: externalOutput,
  isRunning: externalIsRunning = false,
  selfExecute = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [internalOutput, setInternalOutput] = useState<string | undefined>(undefined);
  const [internalRunning, setInternalRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const output = selfExecute ? internalOutput : externalOutput;
  const isRunning = selfExecute ? internalRunning : externalIsRunning;

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = useCallback(async () => {
    if (selfExecute) {
      setInternalRunning(true);
      const result = await executePythonAsync(code);
      if (result.success) {
        setInternalOutput(result.output || '(aucune sortie)');
      } else {
        const msg = result.output
          ? result.output + '\n❌ ' + result.error
          : '❌ ' + (result.error || 'Erreur inconnue');
        setInternalOutput(msg);
      }
      setInternalRunning(false);
    } else {
      onRun?.(code);
    }
  }, [code, selfExecute, onRun]);

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange?.(initialCode);
    if (selfExecute) setInternalOutput(undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      onCodeChange?.(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
    // Ctrl+Enter to run
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleRun();
    }
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-mono">🐍 Python</span>
          <span className="text-[10px] text-gray-600">Ctrl+Enter pour exécuter</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copié' : 'Copier'}
          </button>
          {!readOnly && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}
          {showRunButton && (onRun || selfExecute) && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-500 text-white text-xs font-bold transition-colors disabled:opacity-50"
            >
              {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              {isRunning ? 'Exécution...' : '▶ Exécuter'}
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex overflow-auto" style={{ height }}>
        {/* Line numbers */}
        <div className="bg-[#0d1117] text-gray-600 text-xs font-mono py-3 px-2 text-right select-none border-r border-white/5 flex-shrink-0">
          {lineNumbers.map(n => (
            <div key={n} className="leading-6 h-6">{n}</div>
          ))}
        </div>

        {/* Code area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className="flex-1 bg-transparent text-gray-200 font-mono text-sm p-3 resize-none focus:outline-none leading-6 min-w-0"
          spellCheck={false}
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Output */}
      {output !== undefined && (
        <div className="border-t border-white/10 bg-[#080c10]">
          <div className="px-4 py-1.5 bg-[#111820] text-xs text-gray-400 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Sortie
          </div>
          <pre className="p-4 text-sm font-mono whitespace-pre-wrap max-h-48 overflow-auto text-green-400">
            {output || '(Aucune sortie)'}
          </pre>
        </div>
      )}
    </div>
  );
}
