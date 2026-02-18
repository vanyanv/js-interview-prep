'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, ChevronDown, ChevronRight, Terminal, List, Trash2, AlertTriangle, Info, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/app/lib/cn';
import ConsoleValue from './ConsoleValue';
import type { ConsoleEntry, RunResult } from '@/app/hooks/useCodeRunner';

interface ConsoleOutputProps {
  result: RunResult | null;
  isLoading: boolean;
  onClear?: () => void;
}

type Tab = 'tests' | 'console';

const LEVEL_STYLES: Record<string, { bg: string; border: string; icon: React.ReactNode; text: string }> = {
  log: { bg: '', border: '', icon: null, text: 'text-zinc-300' },
  warn: { bg: 'bg-amber-500/[0.04]', border: 'border-l-2 border-l-amber-500/30', icon: <AlertTriangle size={10} className="text-amber-400 flex-shrink-0 mt-0.5" />, text: 'text-amber-200' },
  error: { bg: 'bg-red-500/[0.04]', border: 'border-l-2 border-l-red-500/30', icon: <XCircle size={10} className="text-red-400 flex-shrink-0 mt-0.5" />, text: 'text-red-300' },
  info: { bg: 'bg-blue-500/[0.04]', border: 'border-l-2 border-l-blue-500/30', icon: <Info size={10} className="text-blue-400 flex-shrink-0 mt-0.5" />, text: 'text-blue-300' },
  debug: { bg: 'bg-zinc-500/[0.04]', border: 'border-l-2 border-l-zinc-500/30', icon: null, text: 'text-zinc-400' },
  table: { bg: '', border: '', icon: null, text: 'text-zinc-300' },
};

export default function ConsoleOutput({ result, isLoading, onClear }: ConsoleOutputProps) {
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
  const hasConsoleOutput = result?.consoleEntries && result.consoleEntries.length > 0;
  const hasError = !!result?.error;

  // Auto-switch to relevant tab when results arrive
  useEffect(() => {
    if (!result) return;
    if (hasResults || hasError) {
      setActiveTab('tests');
    } else if (hasConsoleOutput && !hasResults) {
      setActiveTab('console');
    }
  }, [result, hasResults, hasConsoleOutput, hasError]);

  const formatTime = (ms: number) => {
    if (ms < 1) return '<1ms';
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

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
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors relative',
              activeTab === 'console'
                ? 'bg-white/[0.06] text-zinc-200'
                : 'text-zinc-500 hover:text-zinc-400'
            )}
          >
            <Terminal size={12} />
            Console
            {hasConsoleOutput && activeTab !== 'console' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Right side: Summary + Actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* Total execution time */}
          {result?.totalDuration != null && (
            <div className="flex items-center gap-1 text-[10px] text-zinc-600 font-mono">
              <Timer size={10} />
              {formatTime(result.totalDuration)}
            </div>
          )}

          {/* Test summary badge */}
          {hasResults && (
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className={result!.passed ? 'text-green-400' : 'text-red-400'}>
                {result!.passedTests}
              </span>
              <span className="text-zinc-600">/ {result!.totalTests} passed</span>
            </div>
          )}

          {/* Clear button */}
          {(result || hasConsoleOutput) && onClear && (
            <button
              onClick={onClear}
              className="text-zinc-600 hover:text-zinc-400 transition-colors p-1 rounded hover:bg-white/[0.04]"
              title="Clear output"
            >
              <Trash2 size={12} />
            </button>
          )}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <div className="w-3 h-3 border-[1.5px] border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              Running...
            </div>
          )}
        </div>
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

        {/* Error without test results */}
        {activeTab === 'tests' && !hasResults && result?.error && (
          <div className="rounded-lg border border-red-500/15 bg-red-500/[0.03] p-3">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-medium text-red-400">Error</span>
            </div>
            <pre className="text-red-300/80 text-xs font-mono whitespace-pre-wrap">
              {result.error}
            </pre>
          </div>
        )}

        {/* Console Tab */}
        {activeTab === 'console' && (
          <div className="font-mono text-xs space-y-0.5">
            {hasConsoleOutput ? (
              result!.consoleEntries.map((entry: ConsoleEntry, i: number) => {
                const style = LEVEL_STYLES[entry.level] || LEVEL_STYLES.log;
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex items-start gap-2 px-2 py-1 rounded',
                      style.bg,
                      style.border,
                    )}
                  >
                    {/* Timestamp */}
                    <span className="text-[10px] text-zinc-600 tabular-nums flex-shrink-0 mt-px select-none">
                      +{formatTime(entry.timestamp)}
                    </span>

                    {/* Level icon */}
                    {style.icon}

                    {/* Values */}
                    <div className={cn('flex-1 flex flex-wrap gap-x-2', style.text)}>
                      {entry.args.map((arg, j) => (
                        <ConsoleValue key={j} value={arg} />
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-600 py-8">
                No console output
              </div>
            )}

            {/* Show errors in console tab too */}
            {result?.error && (
              <div className={cn(
                'flex items-start gap-2 px-2 py-1 rounded mt-1',
                'bg-red-500/[0.04] border-l-2 border-l-red-500/30'
              )}>
                <XCircle size={10} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-red-300">{result.error}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
