'use client';

import { useState, useEffect } from 'react';
import { Play, Save, ChevronLeft, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

import CodeEditor from './CodeEditor';
import ConsoleOutput from './ConsoleOutput';
import ProblemDescription from './ProblemDescription';

interface ProblemWorkspaceProps {
  params: {
    category: string;
    slug: string;
  };
}

export default function ProblemWorkspace({ params }: ProblemWorkspaceProps) {
  const [problem, setProblem] = useState<any>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState<'javascript' | 'typescript'>('javascript');
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Update code when language changes, but only if we have the problem data
  useEffect(() => {
    if (problem) {
      // Logic to switch code could be smarter (preserving content if compatible), 
      // but simpler for now to reset to starter code if switching languages
      // or we can keep separate state for each language.
      setCode(problem.starterCode[language]);
    }
  }, [language, problem]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          problemName: problem.slug, // using slug as filename base
          language
        }),
      });
      
      const result = await res.json();
      
      if (result.stdout) {
        setOutput(result.stdout);
        // Auto-mark as complete if tests passed
        if (result.stdout.includes('All tests passed')) {
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
      }
      
      if (result.stderr) {
        // If there's stderr, append it
        setOutput(prev => (prev ? `${prev}\n\nERROR:\n${result.stderr}` : `ERROR:\n${result.stderr}`));
      }

      if (!result.stdout && !result.stderr) {
         setOutput('No output returned.');
      }

    } catch (error) {
      setOutput('Failed to execute code.');
    } finally {
      setIsRunning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        Loading problem...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        Problem not found.
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <ChevronLeft size={18} />
            Back
          </Link>
          <div className="h-4 w-px bg-slate-700 mx-2" />
          <h1 className="font-semibold">{problem.slug}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'javascript' | 'typescript')}
            className="bg-slate-800 border-none rounded px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
          </select>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-1.5 rounded font-medium transition-all ${
              isRunning 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
            }`}
          >
            <Play size={16} fill="currentColor" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left: Description */}
        <div className="w-1/3 flex-shrink-0 h-full">
          <ProblemDescription 
            title={problem.slug} 
            category={problem.category}
            difficulty={problem.difficulty}
            description={problem.description}
          />
        </div>

        {/* Right: Editor & Console */}
        <div className="flex-1 flex flex-col gap-4 h-full min-w-0">
          <div className="flex-1 min-h-0">
            <CodeEditor 
              code={code} 
              onChange={(val) => setCode(val || '')} 
              language={language}
            />
          </div>
          <div className="h-1/3 min-h-[200px] flex-shrink-0">
            <ConsoleOutput 
              output={output} 
              error={null} // parsing not implemented separate yet
              isLoading={isRunning}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-green-500/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-green-500/10 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Great Job!</h2>
              <p className="text-slate-400 mb-8">
                You've successfully solved <span className="text-white font-medium">{problem.slug}</span>.
              </p>
              
              <div className="flex flex-col gap-3">
                <Link 
                  href="/"
                  className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all"
                >
                  Back to Dashboard
                </Link>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-3 px-4 text-slate-400 hover:text-white transition-colors"
                >
                  Stay Here
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
