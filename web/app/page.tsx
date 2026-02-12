'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Code2, CheckCircle, Circle, Shuffle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProblemCategory {
  category: string;
  problems: string[];
}

interface Progress {
  [key: string]: string; // "completed", "review", etc.
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
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Calculate stats
  const totalProblems = categories.reduce((acc, cat) => acc + cat.problems.length, 0);
  const completedProblems = Object.values(progress).filter(status => status === 'completed').length;
  const completionRate = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

  const chartData = [
    { name: 'Completed', value: completedProblems },
    { name: 'Remaining', value: totalProblems - completedProblems },
  ];
  const COLORS = ['#22c55e', '#1e293b']; // green-500, slate-800

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
      // If all completed, just pick literally any problem
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      const randomProb = randomCat.problems[Math.floor(Math.random() * randomCat.problems.length)];
      router.push(`/problems/${randomCat.category}/${randomProb}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              JS Interview Prep
            </h1>
            <p className="text-slate-400">
              Master JavaScript & TypeScript interview questions.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
            <div className="h-24 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{completionRate}%</div>
              <div className="text-sm text-slate-500">Completed</div>
              <button 
                onClick={handleRandomProblem}
                className="mt-2 flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider"
              >
                <Shuffle className="w-3 h-3" />
                Random Problem
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div className="p-6 border-b border-slate-800 bg-slate-900 group-hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold capitalize text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-blue-500" />
                    {cat.category.replace(/^\d+-/, '').replace(/-/g, ' ')}
                  </h2>
                  {cat.problems.every(p => progress[`${cat.category}/${p}`] === 'completed') && (
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <div className="mt-2 text-sm text-slate-500 flex justify-between">
                  <span>{cat.problems.length} problems</span>
                  <span>
                    {cat.problems.filter(p => progress[`${cat.category}/${p}`] === 'completed').length} / {cat.problems.length} done
                  </span>
                </div>
                {/* Mini Progress Bar */}
                <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ 
                      width: `${(cat.problems.filter(p => progress[`${cat.category}/${p}`] === 'completed').length / cat.problems.length) * 100}%` 
                    }}
                  />
                </div>
              </div>
              
              <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  {cat.problems.map((problem) => {
                    const isCompleted = progress[`${cat.category}/${problem}`] === 'completed';
                    return (
                      <Link 
                        key={problem}
                        href={`/problems/${cat.category}/${problem}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/80 transition-colors group/item"
                      >
                        <span className={`text-sm font-medium transition-colors truncate ${isCompleted ? 'text-slate-500 line-through decoration-slate-600' : 'text-slate-300 group-hover/item:text-white'}`}>
                          {problem.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\.js$/, '')}
                        </span>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-500/50" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-800 group-hover/item:text-slate-600" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
