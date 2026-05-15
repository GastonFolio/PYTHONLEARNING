import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { executePython } from '../utils/pythonRunner';

interface CodeBlockProps {
  code: string;
  title?: string;
  explanation?: string;
  language?: string;
  executable?: boolean;
}

export default function CodeBlock({ code, title, explanation, language = 'python', executable = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(true);
    
    setTimeout(() => {
      const result = executePython(code);
      if (result.success) {
        setOutput(result.output || '✅ Code exécuté (aucune sortie)');
      } else {
        setOutput(`❌ Erreur: ${result.error}`);
      }
      setIsRunning(false);
    }, 300);
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
                className="flex items-center gap-1 px-2 py-1 rounded bg-green-600/80 hover:bg-green-500 text-white text-xs font-medium transition-colors disabled:opacity-50"
              >
                <Play size={12} />
                {isRunning ? '...' : 'Tester'}
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
          borderRadius: title ? '0' : '0.75rem',
          fontSize: '0.875rem',
          padding: '1.25rem',
          background: '#0d1117',
        }}
        showLineNumbers
        lineNumberStyle={{ color: '#444', fontSize: '0.75rem' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
      
      {/* Output Section */}
      {showOutput && output !== null && (
        <div className="border-t border-white/10 bg-[#0a0a12]">
          <button
            onClick={() => setShowOutput(!showOutput)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs text-gray-400 hover:text-white"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Sortie
            </span>
            {showOutput ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <pre className="px-4 pb-3 text-sm font-mono text-green-400 whitespace-pre-wrap">
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
