import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Play, X } from 'lucide-react';
import { executePythonAsync } from '../utils/pythonRunner';

interface CodeBlockProps {
  code: string;
  title?: string;
  explanation?: string;
  language?: string;
  executable?: boolean;
}

export default function CodeBlock({ code, title, explanation, language = 'python', executable = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setHasError(false);

    const result = await executePythonAsync(code);
    if (result.success) {
      setOutput(result.output || '(aucune sortie)');
    } else {
      setOutput(result.output ? result.output + '\n' + result.error : (result.error || 'Erreur inconnue'));
      setHasError(true);
    }
    setIsRunning(false);
  };

  const handleCloseOutput = () => {
    setOutput(null);
    setHasError(false);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 my-4">
      {title && (
        <div className="flex items-center justify-between bg-[#1e1e3a] px-4 py-2 border-b border-white/10">
          <span className="text-sm font-medium text-python-yellow font-mono">{title}</span>
          <div className="flex items-center gap-2">
            {executable && language === 'python' && (
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-green-600/80 hover:bg-green-500 text-white text-xs font-medium transition-colors disabled:opacity-50"
              >
                <Play size={12} />
                {isRunning ? 'Exécution...' : '▶ Exécuter'}
              </button>
            )}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              {copied ? 'Copié !' : 'Copier'}
            </button>
          </div>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.875rem',
          padding: '1.25rem',
          background: '#0d1117',
        }}
        showLineNumbers
        lineNumberStyle={{ color: '#444', fontSize: '0.75rem' }}
      >
        {code.trim()}
      </SyntaxHighlighter>

      {/* Output panel */}
      {output !== null && (
        <div className={`border-t ${hasError ? 'border-red-500/30' : 'border-green-500/30'} bg-[#0a0e14]`}>
          <div className="flex items-center justify-between px-4 py-1.5 bg-[#111820]">
            <span className={`flex items-center gap-2 text-xs font-medium ${hasError ? 'text-red-400' : 'text-green-400'}`}>
              <span className={`w-2 h-2 rounded-full ${hasError ? 'bg-red-400' : 'bg-green-400'}`} />
              {hasError ? 'Erreur' : 'Sortie'}
            </span>
            <button onClick={handleCloseOutput} className="text-gray-500 hover:text-white">
              <X size={14} />
            </button>
          </div>
          <pre className={`px-4 py-3 text-sm font-mono whitespace-pre-wrap max-h-48 overflow-auto ${hasError ? 'text-red-400' : 'text-green-400'}`}>
            {output}
          </pre>
        </div>
      )}

      {explanation && (
        <div className="bg-python-blue/10 border-t border-python-blue/20 px-4 py-3">
          <p className="text-sm text-blue-200/80">
            <span className="text-python-yellow font-semibold">💡 Explication :</span> {explanation}
          </p>
        </div>
      )}
    </div>
  );
}
