'use client';

interface ProblemDescriptionProps {
  title: string;
  category: string;
  difficulty: string;
  description: string;
}

export default function ProblemDescription({ title, category, difficulty, description }: ProblemDescriptionProps) {
  // Parsing the title from slug (e.g. easy-01-count-occurrences -> Count Occurrences)
  const displayTitle = title
    .split('-')
    .slice(2) // remove easy-01
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">{displayTitle}</h1>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider">
            {category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            difficulty.toLowerCase().includes('easy') ? 'bg-green-500/10 text-green-400' :
            difficulty.toLowerCase().includes('medium') ? 'bg-yellow-500/10 text-yellow-400' :
            difficulty.toLowerCase().includes('hard') ? 'bg-red-500/10 text-red-400' :
            'bg-gray-500/10 text-gray-400'
          }`}>
            {difficulty}
          </span>
        </div>
      </div>
      
      <div className="prose prose-invert prose-slate max-w-none mt-6">
        <div className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          {description}
        </div>
      </div>
    </div>
  );
}
