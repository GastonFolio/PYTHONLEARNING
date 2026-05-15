// ====================================================
// Real Python execution using Pyodide (CPython in WASM)
// Falls back to a basic JS evaluator if Pyodide is not loaded
// ====================================================

interface ExecutionResult {
  output: string;
  error: string | null;
  success: boolean;
}

// --------------- Pyodide singleton ---------------

let pyodideInstance: any = null;
let pyodideLoading: Promise<any> | null = null;
let pyodideReady = false;

declare global {
  interface Window {
    loadPyodide: (config?: any) => Promise<any>;
  }
}

// Inject the Pyodide CDN script once
function injectPyodideScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window.loadPyodide === 'function') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.4/full/pyodide.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Pyodide script'));
    document.head.appendChild(script);
  });
}

export async function loadPyodideRuntime(): Promise<boolean> {
  if (pyodideReady) return true;
  if (pyodideLoading) {
    await pyodideLoading;
    return pyodideReady;
  }

  pyodideLoading = (async () => {
    try {
      await injectPyodideScript();
      pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.4/full/',
      });
      pyodideReady = true;
    } catch (e) {
      console.warn('Pyodide failed to load, using fallback interpreter', e);
      pyodideReady = false;
    }
  })();

  await pyodideLoading;
  return pyodideReady;
}

export function isPyodideReady(): boolean {
  return pyodideReady;
}

// --------------- Execute via Pyodide ---------------

async function runWithPyodide(code: string): Promise<ExecutionResult> {
  if (!pyodideInstance) {
    return { output: '', error: 'Pyodide non chargé', success: false };
  }

  try {
    // Redirect stdout/stderr to capture output
    pyodideInstance.runPython(`
import sys, io
__stdout_capture = io.StringIO()
__stderr_capture = io.StringIO()
sys.stdout = __stdout_capture
sys.stderr = __stderr_capture
`);

    // Run the user's code
    pyodideInstance.runPython(code);

    // Collect output
    const stdout: string = pyodideInstance.runPython('__stdout_capture.getvalue()');
    const stderr: string = pyodideInstance.runPython('__stderr_capture.getvalue()');

    // Reset stdout/stderr
    pyodideInstance.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

    if (stderr && stderr.trim()) {
      return { output: stdout, error: stderr.trim(), success: false };
    }
    return { output: stdout, error: null, success: true };
  } catch (err: any) {
    // Reset stdout/stderr on error too
    try {
      pyodideInstance.runPython(`
import sys
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
    } catch { /* ignore */ }

    const msg = err?.message || String(err);
    // Extract the meaningful Python traceback line
    const lines = msg.split('\n');
    const pyError = lines.filter((l: string) =>
      l.includes('Error') || l.includes('error') || l.includes('Traceback')
    );
    const shortMsg = pyError.length > 0 ? pyError[pyError.length - 1].trim() : msg.split('\n').pop()?.trim() || msg;

    return { output: '', error: shortMsg, success: false };
  }
}

// --------------- Fallback JS interpreter ---------------
// Handles a realistic subset so the platform is usable while Pyodide loads

function runFallback(code: string): ExecutionResult {
  try {
    const output: string[] = [];
    const vars: Record<string, any> = {};
    const lines = code.split('\n');

    // Pre-pass: register simple top-level functions
    const funcs: Record<string, { params: string[]; bodyLines: string[] }> = {};
    let i = 0;
    while (i < lines.length) {
      const m = lines[i].match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/);
      if (m) {
        const name = m[1];
        const params = m[2].split(',').map(p => p.trim().split('=')[0].trim()).filter(Boolean);
        const body: string[] = [];
        i++;
        while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t') || lines[i].trim() === '' || lines[i].trim().startsWith('#'))) {
          body.push(lines[i].replace(/^    /, '').replace(/^\t/, ''));
          i++;
        }
        funcs[name] = { params, bodyLines: body };
        continue;
      }
      i++;
    }

    // Helper: evaluate an expression
    const evalExpr = (expr: string): any => {
      let e = expr.trim();
      if (!e) return '';

      // String literals
      if ((e.startsWith('"') && e.endsWith('"')) || (e.startsWith("'") && e.endsWith("'")))
        return e.slice(1, -1);

      // f-string
      if (e.startsWith('f"') && e.endsWith('"') || e.startsWith("f'") && e.endsWith("'")) {
        const inner = e.slice(2, -1);
        return inner.replace(/\{([^}]+)\}/g, (_, x) => {
          try {
            return String(evalExpr(x.trim()));
          } catch { return `{${x}}`; }
        });
      }

      // Booleans / None
      if (e === 'True') return true;
      if (e === 'False') return false;
      if (e === 'None') return null;

      // Numbers
      if (/^-?\d+$/.test(e)) return parseInt(e, 10);
      if (/^-?\d+\.\d+$/.test(e)) return parseFloat(e);

      // List literal
      if (e.startsWith('[') && e.endsWith(']')) {
        const inner = e.slice(1, -1).trim();
        if (!inner) return [];
        return smartSplit(inner, ',').map(x => evalExpr(x.trim()));
      }

      // Variable
      if (/^\w+$/.test(e) && e in vars) return vars[e];

      // type()
      const typeMatch = e.match(/^type\((.+)\)$/);
      if (typeMatch) {
        const val = evalExpr(typeMatch[1]);
        const t = typeof val;
        if (t === 'number') return Number.isInteger(val) ? "<class 'int'>" : "<class 'float'>";
        if (t === 'string') return "<class 'str'>";
        if (t === 'boolean') return "<class 'bool'>";
        if (val === null) return "<class 'NoneType'>";
        if (Array.isArray(val)) return "<class 'list'>";
        return `<class '${t}'>`;
      }

      // len()
      const lenMatch = e.match(/^len\((.+)\)$/);
      if (lenMatch) {
        const val = evalExpr(lenMatch[1]);
        if (typeof val === 'string' || Array.isArray(val)) return val.length;
        return 0;
      }

      // int() / float() / str() / bool()
      const castMatch = e.match(/^(int|float|str|bool)\((.+)\)$/);
      if (castMatch) {
        const val = evalExpr(castMatch[2]);
        switch (castMatch[1]) {
          case 'int': return typeof val === 'string' ? parseInt(val, 10) : Math.trunc(Number(val));
          case 'float': return parseFloat(String(val));
          case 'str': return String(val);
          case 'bool': return Boolean(val);
        }
      }

      // round()
      const roundMatch = e.match(/^round\((.+)\)$/);
      if (roundMatch) {
        const args = smartSplit(roundMatch[1], ',');
        const num = Number(evalExpr(args[0]));
        const digits = args[1] ? Number(evalExpr(args[1])) : 0;
        return parseFloat(num.toFixed(digits));
      }

      // min / max / sum
      const builtinMatch = e.match(/^(min|max|sum)\((.+)\)$/);
      if (builtinMatch) {
        let arr = evalExpr(builtinMatch[2]);
        if (!Array.isArray(arr)) arr = smartSplit(builtinMatch[2], ',').map(x => evalExpr(x.trim()));
        const nums = (arr as any[]).map(Number);
        if (builtinMatch[1] === 'min') return Math.min(...nums);
        if (builtinMatch[1] === 'max') return Math.max(...nums);
        return nums.reduce((a, b) => a + b, 0);
      }

      // abs()
      const absMatch = e.match(/^abs\((.+)\)$/);
      if (absMatch) return Math.abs(Number(evalExpr(absMatch[1])));

      // sorted()
      const sortedMatch = e.match(/^sorted\((.+)\)$/);
      if (sortedMatch) {
        const val = evalExpr(sortedMatch[1]);
        if (Array.isArray(val)) return [...val].sort((a, b) => Number(a) - Number(b));
      }

      // .upper(), .lower(), .strip(), .title(), .count(), .replace(), .split(), .find()
      const methodMatch = e.match(/^(.+)\.(upper|lower|strip|lstrip|rstrip|title|capitalize|count|replace|split|find|rfind|index|isdigit|isalpha|isalnum|startswith|endswith)\(([^)]*)\)$/);
      if (methodMatch) {
        const obj = evalExpr(methodMatch[1]);
        const method = methodMatch[2];
        const rawArgs = methodMatch[3];
        if (typeof obj === 'string') {
          switch (method) {
            case 'upper': return obj.toUpperCase();
            case 'lower': return obj.toLowerCase();
            case 'strip': return obj.trim();
            case 'lstrip': return obj.trimStart();
            case 'rstrip': return obj.trimEnd();
            case 'title': return obj.replace(/\b\w/g, c => c.toUpperCase());
            case 'capitalize': return obj.charAt(0).toUpperCase() + obj.slice(1).toLowerCase();
            case 'count': { const s = evalExpr(rawArgs); return (obj.split(String(s)).length - 1); }
            case 'replace': { const parts = smartSplit(rawArgs, ','); return obj.split(String(evalExpr(parts[0]))).join(String(evalExpr(parts[1]))); }
            case 'split': { const sep = rawArgs ? String(evalExpr(rawArgs)) : ' '; return obj.split(sep); }
            case 'find': return obj.indexOf(String(evalExpr(rawArgs)));
            case 'rfind': return obj.lastIndexOf(String(evalExpr(rawArgs)));
            case 'index': { const idx = obj.indexOf(String(evalExpr(rawArgs))); if (idx === -1) throw new Error('ValueError'); return idx; }
            case 'isdigit': return /^\d+$/.test(obj);
            case 'isalpha': return /^[a-zA-Z]+$/.test(obj);
            case 'isalnum': return /^[a-zA-Z0-9]+$/.test(obj);
            case 'startswith': return obj.startsWith(String(evalExpr(rawArgs)));
            case 'endswith': return obj.endsWith(String(evalExpr(rawArgs)));
          }
        }
        if (Array.isArray(obj)) {
          if (method === 'index') return obj.indexOf(evalExpr(rawArgs));
          if (method === 'count') { const v = evalExpr(rawArgs); return obj.filter(x => x === v).length; }
        }
      }

      // list .append / .pop (mutating – just evaluate for now)
      const appendMatch = e.match(/^(\w+)\.append\((.+)\)$/);
      if (appendMatch && Array.isArray(vars[appendMatch[1]])) {
        vars[appendMatch[1]].push(evalExpr(appendMatch[2]));
        return undefined;
      }

      // Simple function call
      const funcCallMatch = e.match(/^(\w+)\(([^)]*)\)$/);
      if (funcCallMatch && funcCallMatch[1] in funcs) {
        const fn = funcs[funcCallMatch[1]];
        const argVals = funcCallMatch[2] ? smartSplit(funcCallMatch[2], ',').map(a => evalExpr(a.trim())) : [];
        // Create local scope
        const savedVars = { ...vars };
        fn.params.forEach((p, idx) => { vars[p] = argVals[idx]; });
        let retVal: any = undefined;
        for (const bl of fn.bodyLines) {
          const bt = bl.trim();
          if (!bt || bt.startsWith('#') || bt.startsWith('"""') || bt.startsWith("'''")) continue;
          const retMatch = bt.match(/^return\s+(.+)$/);
          if (retMatch) { retVal = evalExpr(retMatch[1]); break; }
          const printM = bt.match(/^print\s*\((.+)\)$/);
          if (printM) { output.push(String(evalExpr(printM[1]))); continue; }
          const asgn = bt.match(/^(\w+)\s*=\s*(.+)$/);
          if (asgn) { vars[asgn[1]] = evalExpr(asgn[2]); }
        }
        // Restore scope (keep globals that were added)
        Object.keys(savedVars).forEach(k => { if (!(k in funcs)) vars[k] = savedVars[k]; });
        return retVal;
      }

      // Slicing  var[a:b]
      const sliceMatch = e.match(/^(.+)\[(-?\d*):(-?\d*)\]$/);
      if (sliceMatch) {
        const obj = evalExpr(sliceMatch[1]);
        if (typeof obj === 'string' || Array.isArray(obj)) {
          const start = sliceMatch[2] ? parseInt(sliceMatch[2]) : 0;
          const end = sliceMatch[3] ? parseInt(sliceMatch[3]) : obj.length;
          return obj.slice(start < 0 ? obj.length + start : start, end < 0 ? obj.length + end : end);
        }
      }

      // Indexing  var[n]
      const idxMatch = e.match(/^(.+)\[(-?\d+)\]$/);
      if (idxMatch) {
        const obj = evalExpr(idxMatch[1]);
        let idx = parseInt(idxMatch[2]);
        if (typeof obj === 'string' || Array.isArray(obj)) {
          if (idx < 0) idx = obj.length + idx;
          return obj[idx];
        }
      }

      // "in" operator:  x in y
      const inMatch = e.match(/^(.+?)\s+in\s+(.+)$/);
      if (inMatch) {
        const needle = evalExpr(inMatch[1]);
        const haystack = evalExpr(inMatch[2]);
        if (typeof haystack === 'string') return haystack.includes(String(needle));
        if (Array.isArray(haystack)) return haystack.includes(needle);
        return false;
      }

      // Comparison chains: ==, !=, >=, <=, >, <
      for (const op of ['==', '!=', '>=', '<=', '>', '<']) {
        const idx = e.indexOf(op);
        if (idx > 0) {
          const left = evalExpr(e.slice(0, idx));
          const right = evalExpr(e.slice(idx + op.length));
          switch (op) {
            case '==': return left == right;
            case '!=': return left != right;
            case '>=': return Number(left) >= Number(right);
            case '<=': return Number(left) <= Number(right);
            case '>': return Number(left) > Number(right);
            case '<': return Number(left) < Number(right);
          }
        }
      }

      // ** (power) before * /
      if (e.includes('**')) {
        const idx = e.lastIndexOf('**');
        const left = evalExpr(e.slice(0, idx));
        const right = evalExpr(e.slice(idx + 2));
        return Math.pow(Number(left), Number(right));
      }

      // // (floor div)
      if (e.includes('//')) {
        const idx = e.indexOf('//');
        const left = evalExpr(e.slice(0, idx));
        const right = evalExpr(e.slice(idx + 2));
        return Math.floor(Number(left) / Number(right));
      }

      // % (modulo)
      if (e.includes('%') && !e.includes('"%') && !e.includes("'%")) {
        const idx = e.indexOf('%');
        if (idx > 0) {
          const left = evalExpr(e.slice(0, idx));
          const right = evalExpr(e.slice(idx + 1));
          if (typeof left === 'number' && typeof right === 'number') return ((left % right) + Number(right)) % Number(right);
        }
      }

      // Arithmetic + - (handle from right to respect left-to-right associativity)
      // Find the last + or - that is not inside quotes or parens
      {
        let depth = 0;
        let opPos = -1;
        let opChar = '';
        for (let j = e.length - 1; j >= 1; j--) {
          const c = e[j];
          if (c === ')' || c === ']') depth++;
          if (c === '(' || c === '[') depth--;
          if (depth === 0 && (c === '+' || c === '-') && e[j - 1] !== '*' && e[j - 1] !== '/' && e[j - 1] !== '*') {
            opPos = j;
            opChar = c;
            break;
          }
        }
        if (opPos > 0) {
          const left = evalExpr(e.slice(0, opPos));
          const right = evalExpr(e.slice(opPos + 1));
          if (typeof left === 'number' && typeof right === 'number') {
            return opChar === '+' ? left + right : left - right;
          }
          if (opChar === '+') return String(left) + String(right);
        }
      }

      // * and /
      {
        let depth = 0;
        let opPos = -1;
        let opChar = '';
        for (let j = e.length - 1; j >= 0; j--) {
          const c = e[j];
          if (c === ')' || c === ']') depth++;
          if (c === '(' || c === '[') depth--;
          if (depth === 0 && (c === '*' || c === '/') && e[j + 1] !== '*' && (j === 0 || e[j - 1] !== '*') && (j === 0 || e[j - 1] !== '/')) {
            opPos = j;
            opChar = c;
            break;
          }
        }
        if (opPos >= 0) {
          const left = evalExpr(e.slice(0, opPos));
          const right = evalExpr(e.slice(opPos + 1));
          if (opChar === '*') {
            if (typeof left === 'number' && typeof right === 'number') return left * right;
            if (typeof left === 'string' && typeof right === 'number') return left.repeat(right);
          }
          if (opChar === '/') {
            if (Number(right) === 0) throw new Error('ZeroDivisionError: division by zero');
            return Number(left) / Number(right);
          }
        }
      }

      // Parenthesised expression
      if (e.startsWith('(') && e.endsWith(')')) {
        return evalExpr(e.slice(1, -1));
      }

      // Multiple values separated by comma (for print)
      if (e.includes(',')) {
        return smartSplit(e, ',').map(x => String(evalExpr(x.trim()))).join(' ');
      }

      return e;
    };

    // Smart split that respects parentheses and quotes
    function smartSplit(s: string, delim: string): string[] {
      const parts: string[] = [];
      let depth = 0;
      let inStr: string | null = null;
      let cur = '';
      for (let j = 0; j < s.length; j++) {
        const c = s[j];
        if (inStr) {
          cur += c;
          if (c === inStr && s[j - 1] !== '\\') inStr = null;
          continue;
        }
        if (c === '"' || c === "'") { inStr = c; cur += c; continue; }
        if (c === '(' || c === '[' || c === '{') { depth++; cur += c; continue; }
        if (c === ')' || c === ']' || c === '}') { depth--; cur += c; continue; }
        if (depth === 0 && c === delim) { parts.push(cur); cur = ''; continue; }
        cur += c;
      }
      parts.push(cur);
      return parts;
    }

    // Main execution pass — only top-level, non-indented lines
    i = 0;
    while (i < lines.length) {
      const raw = lines[i];
      const trimmed = raw.trim();
      i++;

      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('"""') || trimmed.startsWith("'''")) continue;

      // Skip def / class blocks (already collected)
      if (trimmed.startsWith('def ') || trimmed.startsWith('class ')) {
        while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t') || lines[i].trim() === '' || lines[i].trim().startsWith('#') || lines[i].trim().startsWith('"""') || lines[i].trim().startsWith("'''"))) i++;
        continue;
      }

      // Skip indented lines (belong to a block we can't execute)
      if (raw.startsWith('    ') || raw.startsWith('\t')) continue;

      // Skip imports (can't do in JS)
      if (trimmed.startsWith('import ') || trimmed.startsWith('from ')) continue;

      // print()
      const printM = trimmed.match(/^print\s*\(\s*([\s\S]*)\s*\)$/);
      if (printM) {
        try { output.push(String(evalExpr(printM[1]))); } catch (e: any) { output.push(`Erreur: ${e.message}`); }
        continue;
      }

      // Compound assignment +=, -=, *=, /=
      const compM = trimmed.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);
      if (compM) {
        const cur = vars[compM[1]] ?? 0;
        const val = evalExpr(compM[3]);
        switch (compM[2]) {
          case '+': vars[compM[1]] = typeof cur === 'string' ? cur + String(val) : Number(cur) + Number(val); break;
          case '-': vars[compM[1]] = Number(cur) - Number(val); break;
          case '*': vars[compM[1]] = Number(cur) * Number(val); break;
          case '/': vars[compM[1]] = Number(cur) / Number(val); break;
        }
        continue;
      }

      // Simple assignment
      const asgn = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
      if (asgn) {
        try { vars[asgn[1]] = evalExpr(asgn[2]); } catch { vars[asgn[1]] = asgn[2]; }
        continue;
      }

      // Bare expression (function call at top level)
      if (trimmed.match(/^\w+\(.*\)$/)) {
        try { const r = evalExpr(trimmed); if (r !== undefined) { /* no auto-print */ } } catch { /* ignore */ }
        continue;
      }
    }

    return { output: output.join('\n'), error: null, success: true };
  } catch (err: any) {
    return { output: '', error: err.message || String(err), success: false };
  }
}

// --------------- Public API ---------------

export async function executePythonAsync(code: string): Promise<ExecutionResult> {
  // Try Pyodide first
  if (pyodideReady) {
    return runWithPyodide(code);
  }
  // Otherwise use fallback
  return runFallback(code);
}

// Synchronous version (uses fallback while Pyodide is loading)
export function executePython(code: string): ExecutionResult {
  if (pyodideReady) {
    // We can't call async from sync, so we also provide a sync wrapper
    // that still uses the fallback. The async version is preferred.
    // But Pyodide has a sync runPython, so we can call it synchronously:
    return runWithPyodideSync(code);
  }
  return runFallback(code);
}

function runWithPyodideSync(code: string): ExecutionResult {
  if (!pyodideInstance) return runFallback(code);
  try {
    pyodideInstance.runPython(`
import sys, io
__stdout_capture = io.StringIO()
__stderr_capture = io.StringIO()
sys.stdout = __stdout_capture
sys.stderr = __stderr_capture
`);
    pyodideInstance.runPython(code);
    const stdout: string = pyodideInstance.runPython('__stdout_capture.getvalue()');
    const stderr: string = pyodideInstance.runPython('__stderr_capture.getvalue()');
    pyodideInstance.runPython(`sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__`);
    if (stderr && stderr.trim()) return { output: stdout, error: stderr.trim(), success: false };
    return { output: stdout, error: null, success: true };
  } catch (err: any) {
    try { pyodideInstance.runPython(`import sys; sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__`); } catch { /* ignore */ }
    const msg = String(err?.message || err);
    const lastLine = msg.split('\n').filter((l: string) => l.trim()).pop() || msg;
    return { output: '', error: lastLine, success: false };
  }
}

// Validate user code against expected output patterns
export function validateCode(code: string, tests: { input: string; expected: string }[]): {
  passed: number;
  total: number;
  results: { passed: boolean; message: string }[];
} {
  const results: { passed: boolean; message: string }[] = [];
  let passed = 0;

  const execution = executePython(code);

  for (const test of tests) {
    const outputContains = execution.output.includes(test.expected);
    const codeContains = code.includes(test.expected);

    if (outputContains || codeContains) {
      results.push({ passed: true, message: `✅ ${(test as any).description || test.expected}` });
      passed++;
    } else {
      results.push({ passed: false, message: `❌ Attendu: ${test.expected}` });
    }
  }

  return { passed, total: tests.length, results };
}
