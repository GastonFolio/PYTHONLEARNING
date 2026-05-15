// Python code execution simulator
// For a real implementation, you could use Pyodide (WebAssembly Python)
// This simulator handles basic Python code for educational purposes

interface ExecutionResult {
  output: string;
  error: string | null;
  success: boolean;
}

// Simple Python interpreter for basic operations
export function executePython(code: string): ExecutionResult {
  try {
    const output: string[] = [];
    const lines = code.split('\n');
    const variables: Record<string, unknown> = {};
    let insideBlock = false;
    let blockIndent = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      const indent = line.length - line.trimStart().length;
      
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) continue;

      // Track if we're inside a function/block definition
      if (trimmed.startsWith('def ') || trimmed.startsWith('class ') || 
          trimmed.startsWith('for ') || trimmed.startsWith('while ') ||
          trimmed.startsWith('if ') || trimmed.startsWith('elif ') ||
          trimmed.startsWith('else:') || trimmed.startsWith('try:') ||
          trimmed.startsWith('except') || trimmed.startsWith('with ')) {
        insideBlock = true;
        blockIndent = indent;
        continue;
      }

      // If we're in a block and this line is indented, skip
      if (insideBlock && indent > blockIndent) {
        continue;
      } else if (insideBlock && indent <= blockIndent) {
        insideBlock = false;
      }

      // Skip certain keywords
      if (trimmed.startsWith('import ') || trimmed.startsWith('from ') ||
          trimmed.startsWith('return ') || trimmed.startsWith('pass') ||
          trimmed.startsWith('break') || trimmed.startsWith('continue')) {
        continue;
      }

      // Handle print statements - improved regex
      const printMatch = trimmed.match(/^print\s*\(\s*(.*)\s*\)$/);
      if (printMatch) {
        const content = printMatch[1];
        try {
          const result = evaluateExpression(content, variables);
          output.push(String(result));
        } catch {
          output.push(`[Erreur dans print: ${content}]`);
        }
        continue;
      }

      // Handle variable assignment with operators
      const assignOpMatch = trimmed.match(/^(\w+)\s*([\+\-\*\/])=\s*(.+)$/);
      if (assignOpMatch) {
        const varName = assignOpMatch[1];
        const op = assignOpMatch[2];
        const rightValue = evaluateExpression(assignOpMatch[3], variables);
        const currentValue = variables[varName] as number || 0;
        if (typeof currentValue === 'number' && typeof rightValue === 'number') {
          switch (op) {
            case '+': variables[varName] = currentValue + rightValue; break;
            case '-': variables[varName] = currentValue - rightValue; break;
            case '*': variables[varName] = currentValue * rightValue; break;
            case '/': variables[varName] = currentValue / rightValue; break;
          }
        }
        continue;
      }

      // Handle simple variable assignment
      const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        try {
          const value = evaluateExpression(assignMatch[2], variables);
          variables[varName] = value;
        } catch {
          variables[varName] = assignMatch[2];
        }
        continue;
      }
    }

    return {
      output: output.join('\n'),
      error: null,
      success: true
    };
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'Erreur inconnue',
      success: false
    };
  }
}

function evaluateExpression(expr: string, variables: Record<string, unknown>): unknown {
  const trimmed = expr.trim();

  // String literal
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  // F-string (simplified)
  if (trimmed.startsWith('f"') || trimmed.startsWith("f'")) {
    let str = trimmed.slice(2, -1);
    // Replace {variable} with values
    str = str.replace(/\{([^}]+)\}/g, (_, varExpr) => {
      const value = evaluateExpression(varExpr.trim(), variables);
      return String(value);
    });
    return str;
  }

  // Number
  if (/^-?\d+$/.test(trimmed)) {
    return parseInt(trimmed);
  }
  if (/^-?\d+\.\d+$/.test(trimmed)) {
    return parseFloat(trimmed);
  }

  // Boolean
  if (trimmed === 'True') return true;
  if (trimmed === 'False') return false;
  if (trimmed === 'None') return null;

  // Variable reference
  if (/^\w+$/.test(trimmed) && trimmed in variables) {
    return variables[trimmed];
  }

  // List literal
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1);
    if (!inner.trim()) return [];
    const items = inner.split(',').map(item => evaluateExpression(item.trim(), variables));
    return items;
  }

  // Basic arithmetic (very simplified)
  if (trimmed.includes('+')) {
    const parts = trimmed.split('+');
    const left = evaluateExpression(parts[0], variables);
    const right = evaluateExpression(parts.slice(1).join('+'), variables);
    if (typeof left === 'number' && typeof right === 'number') {
      return left + right;
    }
    return String(left) + String(right);
  }

  if (trimmed.includes('-') && !trimmed.startsWith('-')) {
    const parts = trimmed.split('-');
    const left = evaluateExpression(parts[0], variables);
    const right = evaluateExpression(parts.slice(1).join('-'), variables);
    if (typeof left === 'number' && typeof right === 'number') {
      return left - right;
    }
  }

  if (trimmed.includes('*')) {
    const parts = trimmed.split('*');
    const left = evaluateExpression(parts[0], variables);
    const right = evaluateExpression(parts.slice(1).join('*'), variables);
    if (typeof left === 'number' && typeof right === 'number') {
      return left * right;
    }
    // String repetition
    if (typeof left === 'string' && typeof right === 'number') {
      return left.repeat(right);
    }
  }

  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    const left = evaluateExpression(parts[0], variables);
    const right = evaluateExpression(parts[1], variables);
    if (typeof left === 'number' && typeof right === 'number') {
      if (right === 0) throw new Error('Division par zéro');
      return left / right;
    }
  }

  // Multiple values (tuple-like for print)
  if (trimmed.includes(',')) {
    const parts = trimmed.split(',');
    return parts.map(p => evaluateExpression(p.trim(), variables)).join(' ');
  }

  // If we can't evaluate, return as string
  return trimmed;
}

// Validate code against expected patterns
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
      results.push({ passed: true, message: `✅ ${test.expected}` });
      passed++;
    } else {
      results.push({ passed: false, message: `❌ Attendu: ${test.expected}` });
    }
  }

  return { passed, total: tests.length, results };
}
