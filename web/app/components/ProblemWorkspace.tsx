'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, ChevronLeft, CheckCircle, Users, Link2 } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

import CodeEditor from './CodeEditor';
import ConsoleOutput from './ConsoleOutput';
import ProblemDescription from './ProblemDescription';
import { CollaborationProvider } from './CollaborationProvider';
import NetworkStatus from './NetworkStatus';
import CollaborationAvatars from './CollaborationAvatars';
import { KeyboardShortcut } from './ui/KeyboardShortcut';
import { useCodeRunner } from '@/app/hooks/useCodeRunner';

interface ProblemWorkspaceProps {
  params: {
    category: string;
    slug: string;
  };
  roomSessionId?: string;
}

interface ProblemData {
  slug: string;
  category: string;
  functionName: string;
  description: string;
  difficulty: string;
  tests: Array<{ input: any[]; expected: any }>;
  starterCode: {
    javascript: string;
    typescript: string;
  };
}

export default function ProblemWorkspace({ params, roomSessionId }: ProblemWorkspaceProps) {
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'javascript' | 'typescript'>('javascript');
  const [showSuccess, setShowSuccess] = useState(false);

  const { result: runResult, isRunning, runCode, clearResult } = useCodeRunner();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`/api/problems/${params.category}/${params.slug}`);
        const data = await res.json();
        setProblem(data);
        setCode(data.starterCode[language]);
      } catch (error) {
        console.error('Failed to load problem', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblem();
  }, [params.category, params.slug]);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language]);
    }
  }, [language, problem]);

  const handleRun = useCallback(async () => {
    if (isRunning || !problem) return;

    const result = await runCode(code, problem.tests, problem.functionName, language);

    if (result.passed) {
      setShowSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: `${problem.category}/${problem.slug}`,
          status: 'completed'
        })
      });
    }
  }, [code, problem, language, isRunning, runCode]);

  const activeRoomId = roomSessionId || `${params.category}-${params.slug}`;
  const isPrivateSession = !!roomSessionId;

  const handleShare = () => {
    if (!isPrivateSession) {
      const newSessionId = Math.random().toString(36).substring(2, 10);
      const url = new URL(window.location.href);
      url.searchParams.set('room', newSessionId);
      window.location.href = url.toString();
      return;
    }

    navigator.clipboard.writeText(window.location.href);
    alert('Session URL copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen text-zinc-400">
        Problem not found.
      </div>
    );
  }

  return (
    <CollaborationProvider roomId={activeRoomId}>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="h-13 border-b border-white/[0.04] flex items-center justify-between px-5 bg-white/[0.02] backdrop-blur-xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5">
              <ChevronLeft size={16} />
              <span className="text-xs font-medium">Back</span>
            </Link>
            <div className="h-4 w-px bg-white/[0.06]" />
            <h1 className="text-sm font-semibold text-zinc-200">
              {problem.slug}
            </h1>
            {isPrivateSession && (
              <span className="text-[10px] bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-md border border-purple-500/20 font-medium">
                Private
              </span>
            )}
            <NetworkStatus />
          </div>

          <div className="flex items-center gap-3">
            {/* Collaboration Avatars */}
            <CollaborationAvatars />

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04]"
            >
              {isPrivateSession ? (
                <>
                  <Link2 size={12} />
                  Copy Link
                </>
              ) : (
                <>
                  <Users size={12} />
                  Collaborate
                </>
              )}
            </button>

            <div className="h-4 w-px bg-white/[0.06]" />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'javascript' | 'typescript')}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
            </select>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isRunning
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30'
              }`}
            >
              <Play size={12} fill="currentColor" />
              {isRunning ? 'Running...' : 'Run'}
              {!isRunning && (
                <KeyboardShortcut keys={{ mac: ['⌘', '⏎'], default: ['Ctrl', '⏎'] }} />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden p-3 gap-3">
          {/* Left: Description */}
          <div className="w-[340px] flex-shrink-0 h-full">
            <ProblemDescription
              title={problem.slug}
              category={problem.category}
              difficulty={problem.difficulty}
              description={problem.description}
            />
          </div>

          {/* Right: Editor & Console */}
          <div className="flex-1 flex flex-col gap-3 h-full min-w-0">
            <div className="flex-1 min-h-0">
              <CodeEditor
                code={code}
                onChange={(val) => setCode(val || '')}
                language={language}
                onRun={handleRun}
              />
            </div>
            <div className="h-[35%] min-h-[180px] flex-shrink-0">
              <ConsoleOutput
                result={runResult}
                isLoading={isRunning}
                onClear={clearResult}
              />
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 12 }}
                className="rounded-2xl border border-green-500/20 bg-[#111113] p-8 max-w-sm w-full shadow-2xl shadow-green-500/5 text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-400" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-1.5">Nice work!</h2>
                <p className="text-zinc-500 text-sm mb-8">
                  You solved <span className="text-zinc-300 font-medium">{problem.slug}</span>
                </p>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/"
                    className="w-full py-2.5 px-4 bg-white/[0.06] hover:bg-white/[0.1] text-white rounded-xl text-sm font-medium transition-all border border-white/[0.06]"
                  >
                    Back to Dashboard
                  </Link>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="w-full py-2.5 px-4 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                  >
                    Keep Practicing
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CollaborationProvider>
  );
}
