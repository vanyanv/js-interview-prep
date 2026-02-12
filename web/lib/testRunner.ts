
import vm from 'vm';
import { performance } from 'perf_hooks';

interface TestResult {
  passed: boolean;
  input: any;
  expected: any;
  actual: any;
  error?: string;
  duration: number;
}

interface RunResult {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: TestResult[];
  consoleOutput: string[];
  isError?: boolean;
  message?: string;
}

export async function runTests(
  userCode: string,
  language: 'javascript' | 'typescript',
  problems: any // The problem definition module
): Promise<RunResult> {
  const consoleOutput: string[] = [];
  
  // Create a sandbox environment
  const sandbox = {
    console: {
      log: (...args: any[]) => {
        consoleOutput.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '));
      },
      error: (...args: any[]) => {
         consoleOutput.push('[ERROR] ' + args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '));
      }
    },
    // Add any other globals needed
  };

  const context = vm.createContext(sandbox);
  
  try {
    // Compile and run user code
    // For TypeScript, we're assuming it's already transpiled or valid JS for now.
    // In a real app, we'd transpile TS here.
    
    // We need to wrap the user code to extract the exported function
    const wrappedCode = `
      ${userCode}
      
      // Attempt to find the exported function
      // If user did 'export function fnName', it might not be directly available in vm context 
      // unless we parse it.
      // A simpler way for this MVP: we expect the user code to be valid JS.
      // We will look for the function name in the context after execution.
    `;

    // However, vm.runInContext doesn't handle ES module exports easily without source text parsing.
    // A trick is to use a CommonJS-like mock or just expect a global function definition if we strip 'export'.
    
    // Let's strip 'export' keywords for soft compatibility with the existing starter code
    const executableCode = userCode.replace(/export\s+function/g, 'function').replace(/export\s+const/g, 'const');
    
    vm.runInContext(executableCode, context);
    
    // Get the function name from the problem definition
    const functionName = problems.functionName || 'solution';
    const userFn = context[functionName];

    if (typeof userFn !== 'function') {
      throw new Error(`Function '${functionName}' not found in your code.`);
    }

    const results: TestResult[] = [];
    let passedTests = 0;

    for (const test of problems.tests) {
      const startTime = performance.now();
      let passed = false;
      let actual: any;
      let errorMsg: string | undefined;

      try {
        // Deep clone input to prevent mutation side effects between tests
        const inputClone = JSON.parse(JSON.stringify(test.input));
        actual = userFn(...inputClone);
        
        passed = deepEqual(actual, test.expected);
      } catch (err: any) {
        errorMsg = err.message;
        passed = false;
      }

      const endTime = performance.now();
      
      if (passed) passedTests++;
      
      results.push({
        passed,
        input: test.input,
        expected: test.expected,
        actual,
        error: errorMsg,
        duration: endTime - startTime
      });
    }

    return {
      totalTests: problems.tests.length,
      passedTests,
      failedTests: problems.tests.length - passedTests,
      results,
      consoleOutput
    };

  } catch (err: any) {
    return {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      results: [],
      consoleOutput,
      isError: true,
      message: err.message
    };
  }
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
        if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  return false;
}

export function parseProblemDefinition(fileContent: string): { tests: any[], functionName: string } {
    const sandbox = {
        tests: [],
        functionName: 'solution',
        // Mocking console to avoid noise during parsing
        console: { log: () => {} }
    };
    
    const context = vm.createContext(sandbox);
    
    // Strip export keywords to make it executable in a simple context
    const executableCode = fileContent
        .replace(/export\s+const\s+tests/g, 'const tests')
        .replace(/export\s+const\s+functionName/g, 'const functionName');

    vm.runInContext(executableCode, context);
    
    return {
        tests: sandbox.tests,
        functionName: sandbox.functionName
    };
}
