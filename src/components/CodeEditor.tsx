import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Loader2 } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  onRun?: (code: string) => void;
  onCodeChange?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
  showRunButton?: boolean;
  output?: string;
  isRunning?: boolean;
}

export default function CodeEditor({
  initialCode,
  onRun,
  onCodeChange,
  readOnly = false,
  height = '200px',
  showRunButton = true,
  output,
  isRunning = false
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleRun = () => {
    onRun?.(code);
  };

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange?.(initialCode);
  };

  // Simple line numbers
  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/10">
        <span className="text-xs text-gray-400 font-mono">Python</span>
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
          {showRunButton && onRun && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              {isRunning ? 'Exécution...' : 'Exécuter'}
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex" style={{ height }}>
        {/* Line numbers */}
        <div className="bg-[#0d1117] text-gray-600 text-xs font-mono py-3 px-2 text-right select-none border-r border-white/5">
          {lineNumbers.map(n => (
            <div key={n} className="leading-6">{n}</div>
          ))}
        </div>

        {/* Code area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          readOnly={readOnly}
          className="flex-1 bg-transparent text-gray-200 font-mono text-sm p-3 resize-none focus:outline-none leading-6"
          spellCheck={false}
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Output */}
      {output !== undefined && (
        <div className="border-t border-white/10 bg-[#0d1117]">
          <div className="px-4 py-1 bg-[#161b22] text-xs text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Sortie
          </div>
          <pre className="p-4 text-sm font-mono text-green-400 whitespace-pre-wrap max-h-40 overflow-auto">
            {output || '(Aucune sortie)'}
          </pre>
        </div>
      )}
    </div>
  );
}
