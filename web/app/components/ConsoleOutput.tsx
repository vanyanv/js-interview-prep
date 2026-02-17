'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Clock, ChevronDown, ChevronRight, Terminal, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/app/lib/cn';

interface TestResult {
  passed: boolean;
  input: any;
  expected: any;
  actual: any;
  error?: string;
  duration: number;
}

interface RunResult {
  stdout?: string;
  stderr?: string;
  results?: TestResult[];
  totalTests?: number;
  passedTests?: number;
  passed?: boolean;
}

interface ConsoleOutputProps {
  result: RunResult | null;
  isLoading: boolean;
}

type Tab = 'tests' | 'console';

export default function ConsoleOutput({ result, isLoading }: ConsoleOutputProps) {
  const [activeTab, setActiveTab] = useState<Tab>('tests');
  const [expandedTests, setExpandedTests] = useState<Set<number>>(new Set());

  const toggleTest = (index: number) => {
    setExpandedTests(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const hasResults = result?.results && result.results.length > 0;
  const hasConsoleOutput = result?.stdout || result?.stderr;

  return (
    <div className="h-full w-full rounded-xl border border-white/[0.06] overflow-hidden bg-[#0f0f11] flex flex-col">
      {/* Terminal Chrome Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04] bg-white/[0.02] flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 ml-3">
          <button
            onClick={() => setActiveTab('tests')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
              activeTab === 'tests'
                ? 'bg-white/[0.06] text-zinc-200'
                : 'text-zinc-500 hover:text-zinc-400'
            )}
          >
            <List size={12} />
            Tests
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
              activeTab === 'console'
                ? 'bg-white/[0.06] text-zinc-200'
                : 'text-zinc-500 hover:text-zinc-400'
            )}
          >
            <Terminal size={12} />
            Console
          </button>
        </div>

        {/* Summary badge */}
        {hasResults && (
          <div className="ml-auto flex items-center gap-1.5 text-xs font-mono">
            <span className={result!.passed ? 'text-green-400' : 'text-red-400'}>
              {result!.passedTests}
            </span>
            <span className="text-zinc-600">/ {result!.totalTests} passed</span>
          </div>
        )}

        {isLoading && (
          <div className="ml-auto flex items-center gap-2 text-xs text-zinc-500">
            <div className="w-3 h-3 border-[1.5px] border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            Running...
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Empty state */}
        {!result && !isLoading && (
          <div className="h-full flex items-center justify-center">
            <p className="text-zinc-600 text-sm font-mono">
              <span className="terminal-cursor">Run your code to see results</span>
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && !result && (
          <div className="h-full flex items-center justify-center">
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-mono">
              <div className="flex gap-1">
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>
              Executing...
            </div>
          </div>
        )}

        {/* Test Results Tab */}
        {activeTab === 'tests' && hasResults && (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {result!.results!.map((test, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  className={cn(
                    'rounded-lg border p-3 transition-colors',
                    test.passed
                      ? 'border-green-500/15 bg-green-500/[0.03]'
                      : 'border-red-500/15 bg-red-500/[0.03]'
                  )}
                >
                  <button
                    onClick={() => toggleTest(index)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      {test.passed ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                      )}
                      <span className="text-xs font-medium text-zinc-300">
                        Test {index + 1}
                      </span>
                      {!test.passed && (
                        expandedTests.has(index)
                          ? <ChevronDown size={12} className="text-zinc-500" />
                          : <ChevronRight size={12} className="text-zinc-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-zinc-600">
                      <Clock size={10} />
                      <span className="text-[10px] font-mono tabular-nums">
                        {test.duration < 1 ? '<1' : Math.round(test.duration)}ms
                      </span>
                    </div>
                  </button>

                  {/* Expanded details for failed tests */}
                  <AnimatePresence>
                    {(expandedTests.has(index) || !test.passed) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2.5 pt-2.5 border-t border-white/[0.04] space-y-2 font-mono text-[11px]">
                          <div className="flex gap-2">
                            <span className="text-zinc-500 w-16 flex-shrink-0">Input</span>
                            <span className="text-zinc-300 break-all">
                              {JSON.stringify(test.input)}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-zinc-500 w-16 flex-shrink-0">Expected</span>
                            <span className="text-green-400/80 break-all">
                              {JSON.stringify(test.expected)}
                            </span>
                          </div>
                          {!test.passed && (
                            <div className="flex gap-2">
                              <span className="text-zinc-500 w-16 flex-shrink-0">Actual</span>
                              <span className="text-red-400/80 break-all">
                                {test.error ? test.error : JSON.stringify(test.actual)}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Error message without test results */}
        {activeTab === 'tests' && !hasResults && result?.stderr && (
          <div className="rounded-lg border border-red-500/15 bg-red-500/[0.03] p-3">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-medium text-red-400">Error</span>
            </div>
            <pre className="text-red-300/80 text-xs font-mono whitespace-pre-wrap">
              {result.stderr}
            </pre>
          </div>
        )}

        {/* Console Tab */}
        {activeTab === 'console' && (
          <div className="font-mono text-xs">
            {hasConsoleOutput ? (
              <>
                {result!.stdout && (
                  <pre className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {result!.stdout}
                  </pre>
                )}
                {result!.stderr && (
                  <pre className="text-red-400/80 whitespace-pre-wrap mt-2 pt-2 border-t border-white/[0.04]">
                    {result!.stderr}
                  </pre>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-600 py-8">
                No console output
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
