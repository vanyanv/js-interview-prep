'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface SerializedValue {
  type: 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'function' | 'symbol' |
        'bigint' | 'array' | 'object' | 'error' | 'regexp' | 'date' | 'map' | 'set';
  value: any;
  length?: number;
  size?: number;
  stack?: string;
}

export interface ConsoleEntry {
  level: 'log' | 'warn' | 'error' | 'info' | 'debug' | 'table';
  args: SerializedValue[];
  timestamp: number; // ms since execution start
}

export interface TestResult {
  passed: boolean;
  input: any;
  expected: any;
  actual: any;
  error?: string;
  duration: number;
}

export interface RunResult {
  results: TestResult[];
  totalTests: number;
  passedTests: number;
  passed: boolean;
  totalDuration: number;
  error?: string;
  consoleEntries: ConsoleEntry[];
}

interface TestCase {
  input: any[];
  expected: any;
}

const TIMEOUT_MS = 5000;

export function useCodeRunner() {
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const consoleEntriesRef = useRef<ConsoleEntry[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    consoleEntriesRef.current = [];
  }, []);

  const runCode = useCallback((
    code: string,
    tests: TestCase[],
    functionName: string,
    language: 'javascript' | 'typescript'
  ): Promise<RunResult> => {
    return new Promise((resolve) => {
      // Terminate any previous worker
      workerRef.current?.terminate();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setIsRunning(true);
      consoleEntriesRef.current = [];

      const worker = new Worker('/sandbox-worker.js');
      workerRef.current = worker;

      // Set timeout — kill worker after TIMEOUT_MS
      timeoutRef.current = setTimeout(() => {
        worker.terminate();
        workerRef.current = null;

        const timeoutResult: RunResult = {
          results: [],
          totalTests: tests.length,
          passedTests: 0,
          passed: false,
          totalDuration: TIMEOUT_MS,
          error: `Execution timed out after ${TIMEOUT_MS / 1000}s. Check for infinite loops.`,
          consoleEntries: consoleEntriesRef.current,
        };

        setResult(timeoutResult);
        setIsRunning(false);
        resolve(timeoutResult);
      }, TIMEOUT_MS);

      worker.onmessage = (e) => {
        const { type, payload } = e.data;

        if (type === 'console') {
          consoleEntriesRef.current.push(payload);
          return;
        }

        if (type === 'console-clear') {
          consoleEntriesRef.current = [];
          return;
        }

        if (type === 'result') {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          worker.terminate();
          workerRef.current = null;

          const finalResult: RunResult = {
            ...payload,
            consoleEntries: consoleEntriesRef.current,
          };

          setResult(finalResult);
          setIsRunning(false);
          resolve(finalResult);
        }
      };

      worker.onerror = (err) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        worker.terminate();
        workerRef.current = null;

        const errorResult: RunResult = {
          results: [],
          totalTests: tests.length,
          passedTests: 0,
          passed: false,
          totalDuration: 0,
          error: err.message || 'An unexpected error occurred.',
          consoleEntries: consoleEntriesRef.current,
        };

        setResult(errorResult);
        setIsRunning(false);
        resolve(errorResult);
      };

      // Send code to worker
      worker.postMessage({ code, tests, functionName, language });
    });
  }, []);

  return { result, isRunning, runCode, clearResult };
}
