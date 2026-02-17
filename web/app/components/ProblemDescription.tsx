'use client';

import { cn } from '@/app/lib/cn';

interface ProblemDescriptionProps {
  title: string;
  category: string;
  difficulty: string;
  description: string;
}

export default function ProblemDescription({ title, category, difficulty, description }: ProblemDescriptionProps) {
  const displayTitle = title
    .split('-')
    .slice(2)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="relative h-full rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden flex flex-col">
      {/* Accent gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500/60 via-purple-500/40 to-transparent" />

      <div className="p-5 flex-1 overflow-y-auto">
        <div className="flex items-start justify-between gap-3 mb-5">
          <h1 className="text-lg font-bold text-white leading-tight">{displayTitle}</h1>
          <div className="flex gap-1.5 flex-shrink-0">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/15">
              {category.replace(/^\d+-/, '').replace(/-/g, ' ')}
            </span>
            <span className={cn(
              'px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border',
              difficulty.toLowerCase().includes('easy') && 'bg-green-500/10 text-green-400 border-green-500/15',
              difficulty.toLowerCase().includes('medium') && 'bg-amber-500/10 text-amber-400 border-amber-500/15',
              difficulty.toLowerCase().includes('hard') && 'bg-red-500/10 text-red-400 border-red-500/15',
              !difficulty.toLowerCase().match(/easy|medium|hard/) && 'bg-zinc-500/10 text-zinc-400 border-zinc-500/15'
            )}>
              {difficulty}
            </span>
          </div>
        </div>

        <div className="text-[13px] text-zinc-400 leading-relaxed whitespace-pre-wrap">
          {description}
        </div>
      </div>
    </div>
  );
}
