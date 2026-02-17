'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Code2, CheckCircle, Circle, Shuffle, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProblemCategory {
  category: string;
  problems: string[];
}

interface Progress {
  [key: string]: string;
}

export default function Dashboard() {
  const [categories, setCategories] = useState<ProblemCategory[]>([]);
  const [progress, setProgress] = useState<Progress>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, progRes] = await Promise.all([
          fetch('/api/problems'),
          fetch('/api/progress')
        ]);

        const catsData = await catsRes.json();
        const progData = await progRes.json();

        setCategories(catsData);
        setProgress(progData);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  const totalProblems = categories.reduce((acc, cat) => acc + cat.problems.length, 0);
  const completedProblems = Object.values(progress).filter(status => status === 'completed').length;
  const completionRate = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

  const chartData = [
    { name: 'Completed', value: completedProblems },
    { name: 'Remaining', value: totalProblems - completedProblems },
  ];
  const COLORS = ['#22c55e', 'rgba(255,255,255,0.04)'];

  const handleRandomProblem = () => {
    const allProblems: { category: string; slug: string }[] = [];
    categories.forEach(cat => {
      cat.problems.forEach(prob => {
        if (progress[`${cat.category}/${prob}`] !== 'completed') {
          allProblems.push({ category: cat.category, slug: prob });
        }
      });
    });

    if (allProblems.length > 0) {
      const random = allProblems[Math.floor(Math.random() * allProblems.length)];
      router.push(`/problems/${random.category}/${random.slug}`);
    } else {
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      const randomProb = randomCat.problems[Math.floor(Math.random() * randomCat.problems.length)];
      router.push(`/problems/${randomCat.category}/${randomProb}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                JS Interview Prep
              </h1>
            </div>
            <p className="text-zinc-500 text-sm">
              Master JavaScript & TypeScript interview questions.
            </p>
          </div>

          <div className="flex items-center gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-4">
            <div className="h-20 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={28}
                    outerRadius={36}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      borderColor: 'rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    itemStyle={{ color: '#a1a1aa' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">{completionRate}%</div>
              <div className="text-xs text-zinc-500 font-medium">
                {completedProblems}/{totalProblems} solved
              </div>
              <button
                onClick={handleRandomProblem}
                className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest"
              >
                <Shuffle className="w-3 h-3" />
                Random
              </button>
            </div>
          </div>
        </motion.header>

        {/* Category Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => {
            const catCompleted = cat.problems.filter(p => progress[`${cat.category}/${p}`] === 'completed').length;
            const allDone = catCompleted === cat.problems.length;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl
                           overflow-hidden transition-all duration-300
                           hover:border-white/[0.1] hover:bg-white/[0.04]
                           hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.08)]"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[15px] font-semibold capitalize text-white flex items-center gap-2.5">
                      <Code2 className="w-4 h-4 text-blue-400" />
                      {cat.category.replace(/^\d+-/, '').replace(/-/g, ' ')}
                    </h2>
                    {allDone && (
                      <Trophy className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-zinc-500">
                    <span>{cat.problems.length} problems</span>
                    <span className="tabular-nums font-medium">
                      {catCompleted}/{cat.problems.length}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 h-[3px] w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${(catCompleted / cat.problems.length) * 100}%`,
                        boxShadow: catCompleted > 0 ? '0 0 8px rgba(59,130,246,0.4)' : 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Problem List */}
                <div className="p-3 max-h-[280px] overflow-y-auto">
                  <div className="space-y-0.5">
                    {cat.problems.map((problem) => {
                      const isCompleted = progress[`${cat.category}/${problem}`] === 'completed';
                      return (
                        <Link
                          key={problem}
                          href={`/problems/${cat.category}/${problem}`}
                          className="flex items-center justify-between p-2.5 rounded-lg
                                     transition-all duration-200 group/item
                                     hover:bg-white/[0.04] hover:pl-4
                                     border-l-2 border-transparent hover:border-blue-500/50"
                        >
                          <span className={`text-[13px] font-medium transition-colors truncate ${
                            isCompleted
                              ? 'text-zinc-600 line-through decoration-zinc-700'
                              : 'text-zinc-400 group-hover/item:text-white'
                          }`}>
                            {problem.replace(/^\w+-\d+-/, '').replace(/-/g, ' ')}
                          </span>
                          {isCompleted ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500/40 flex-shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-zinc-800 group-hover/item:text-zinc-600 flex-shrink-0" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
