'use client';

import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

interface ConsoleOutputProps {
  output: string | null;
  error: string | null;
  isLoading: boolean;
}

export default function ConsoleOutput({ output, error, isLoading }: ConsoleOutputProps) {
  return (
    <div className="h-full w-full bg-slate-900 rounded-lg border border-slate-700 p-4 font-mono text-sm overflow-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 font-semibold">Console Output</span>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
      </div>
      
      {output && (
        <pre className="text-slate-200 whitespace-pre-wrap font-mono">
          {output}
        </pre>
      )}
      
      {error && (
        <pre className="text-red-400 whitespace-pre-wrap font-mono mt-2">
          {error}
        </pre>
      )}

      {!output && !error && !isLoading && (
        <div className="text-slate-600 italic">
          Run your code to see results...
        </div>
      )}
    </div>
  );
}
