/* eslint-disable no-restricted-globals */
/**
 * Sandbox Worker — Executes user code in a Web Worker context.
 * Receives: { code, tests, functionName, language }
 * Posts back: { type: 'result', payload: RunResult } or { type: 'console', payload: ConsoleEntry }
 */

// Load Babel for TypeScript transpilation (loaded lazily)
let babelLoaded = false;

function ensureBabel() {
  if (babelLoaded) return;
  try {
    importScripts('https://unpkg.com/@babel/standalone@7.26.9/babel.min.js');
    babelLoaded = true;
  } catch (e) {
    throw new Error('Failed to load TypeScript transpiler. Check your internet connection.');
  }
}

function transpileTS(code) {
  ensureBabel();
  const result = self.Babel.transform(code, {
    presets: ['typescript'],
    filename: 'solution.ts',
  });
  return result.code;
}

// Deep equality check
function deepEqual(a, b) {
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

// Serialize a value for safe transfer (handles circular refs, functions, etc.)
function serialize(value, depth = 0) {
  if (depth > 8) return { type: 'string', value: '[Max depth]' };
  if (value === null) return { type: 'null', value: null };
  if (value === undefined) return { type: 'undefined', value: undefined };
  if (typeof value === 'function') return { type: 'function', value: `ƒ ${value.name || 'anonymous'}()` };
  if (typeof value === 'symbol') return { type: 'symbol', value: value.toString() };
  if (typeof value === 'number' || typeof value === 'boolean') return { type: typeof value, value };
  if (typeof value === 'string') return { type: 'string', value };
  if (typeof value === 'bigint') return { type: 'bigint', value: value.toString() + 'n' };

  if (Array.isArray(value)) {
    return {
      type: 'array',
      value: value.map(item => serialize(item, depth + 1)),
      length: value.length,
    };
  }

  if (value instanceof Error) {
    return { type: 'error', value: value.message, stack: value.stack };
  }

  if (value instanceof RegExp) return { type: 'regexp', value: value.toString() };
  if (value instanceof Date) return { type: 'date', value: value.toISOString() };
  if (value instanceof Map) {
    return {
      type: 'map',
      value: Array.from(value.entries()).map(([k, v]) => [serialize(k, depth + 1), serialize(v, depth + 1)]),
      size: value.size,
    };
  }
  if (value instanceof Set) {
    return {
      type: 'set',
      value: Array.from(value).map(item => serialize(item, depth + 1)),
      size: value.size,
    };
  }

  // Plain object
  if (typeof value === 'object') {
    const entries = {};
    for (const key of Object.keys(value)) {
      entries[key] = serialize(value[key], depth + 1);
    }
    return { type: 'object', value: entries };
  }

  return { type: 'string', value: String(value) };
}

// Create console interceptors
function createConsole(startTime) {
  function emit(level, args) {
    self.postMessage({
      type: 'console',
      payload: {
        level,
        args: args.map(a => serialize(a)),
        timestamp: performance.now() - startTime,
      },
    });
  }

  return {
    log: (...args) => emit('log', args),
    warn: (...args) => emit('warn', args),
    error: (...args) => emit('error', args),
    info: (...args) => emit('info', args),
    debug: (...args) => emit('debug', args),
    table: (data) => emit('table', [data]),
    dir: (...args) => emit('log', args),
    trace: (...args) => {
      try { throw new Error(); } catch (e) {
        emit('log', [...args, e.stack]);
      }
    },
    assert: (condition, ...args) => {
      if (!condition) emit('error', ['Assertion failed:', ...args]);
    },
    clear: () => self.postMessage({ type: 'console-clear' }),
    count: (() => {
      const counts = {};
      return (label = 'default') => {
        counts[label] = (counts[label] || 0) + 1;
        emit('log', [`${label}: ${counts[label]}`]);
      };
    })(),
    time: (() => {
      const timers = {};
      return (label = 'default') => { timers[label] = performance.now(); };
    })(),
    timeEnd: (() => {
      const timers = {};
      return (label = 'default') => {
        const start = timers[label];
        if (start !== undefined) {
          emit('log', [`${label}: ${(performance.now() - start).toFixed(3)}ms`]);
          delete timers[label];
        }
      };
    })(),
  };
}

self.onmessage = function (e) {
  const { code, tests, functionName, language } = e.data;
  const executionStart = performance.now();

  try {
    // Transpile TypeScript if needed
    let executableCode = code;
    if (language === 'typescript') {
      executableCode = transpileTS(code);
    }

    // Strip export keywords
    executableCode = executableCode
      .replace(/export\s+default\s+function/g, 'function')
      .replace(/export\s+function/g, 'function')
      .replace(/export\s+const/g, 'const')
      .replace(/export\s+let/g, 'let')
      .replace(/export\s+var/g, 'var')
      .replace(/export\s+class/g, 'class');

    // Create sandboxed console
    const sandboxConsole = createConsole(executionStart);

    // Build a function that provides console in scope
    const wrappedCode = `
      (function(console) {
        ${executableCode}
        return typeof ${functionName} === 'function' ? ${functionName} : undefined;
      })
    `;

    // eslint-disable-next-line no-eval
    const factory = eval(wrappedCode);
    const userFn = factory(sandboxConsole);

    if (typeof userFn !== 'function') {
      throw new Error(`Function '${functionName}' not found in your code. Make sure you've defined it.`);
    }

    // Run tests
    const results = [];
    let passedTests = 0;

    for (const test of tests) {
      const testStart = performance.now();
      let passed = false;
      let actual;
      let errorMsg;

      try {
        const inputClone = JSON.parse(JSON.stringify(test.input));
        actual = userFn(...inputClone);
        passed = deepEqual(actual, test.expected);
      } catch (err) {
        errorMsg = err.message || String(err);
        passed = false;
      }

      const testEnd = performance.now();
      if (passed) passedTests++;

      results.push({
        passed,
        input: test.input,
        expected: test.expected,
        actual,
        error: errorMsg,
        duration: testEnd - testStart,
      });
    }

    const totalDuration = performance.now() - executionStart;

    self.postMessage({
      type: 'result',
      payload: {
        results,
        totalTests: tests.length,
        passedTests,
        passed: tests.length > 0 && passedTests === tests.length,
        totalDuration,
      },
    });
  } catch (err) {
    const totalDuration = performance.now() - executionStart;

    self.postMessage({
      type: 'result',
      payload: {
        results: [],
        totalTests: 0,
        passedTests: 0,
        passed: false,
        totalDuration,
        error: err.message || String(err),
      },
    });
  }
};
