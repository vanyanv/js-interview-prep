'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { SerializedValue } from '@/app/hooks/useCodeRunner';

interface ConsoleValueProps {
  value: SerializedValue;
  depth?: number;
}

const TYPE_COLORS: Record<string, string> = {
  string: 'text-green-400',
  number: 'text-amber-400',
  boolean: 'text-purple-400',
  null: 'text-zinc-500',
  undefined: 'text-zinc-500',
  function: 'text-cyan-400',
  symbol: 'text-amber-300',
  bigint: 'text-amber-400',
  regexp: 'text-red-400',
  date: 'text-purple-300',
  error: 'text-red-400',
};

export default function ConsoleValue({ value, depth = 0 }: ConsoleValueProps) {
  const [expanded, setExpanded] = useState(depth < 1);

  // Primitives
  if (value.type === 'string') {
    return <span className={TYPE_COLORS.string}>&quot;{value.value}&quot;</span>;
  }
  if (value.type === 'number' || value.type === 'bigint') {
    return <span className={TYPE_COLORS.number}>{value.value}</span>;
  }
  if (value.type === 'boolean') {
    return <span className={TYPE_COLORS.boolean}>{String(value.value)}</span>;
  }
  if (value.type === 'null') {
    return <span className={TYPE_COLORS.null}>null</span>;
  }
  if (value.type === 'undefined') {
    return <span className={TYPE_COLORS.undefined}>undefined</span>;
  }
  if (value.type === 'function') {
    return <span className={TYPE_COLORS.function}>{value.value}</span>;
  }
  if (value.type === 'symbol') {
    return <span className={TYPE_COLORS.symbol}>{value.value}</span>;
  }
  if (value.type === 'regexp') {
    return <span className={TYPE_COLORS.regexp}>{value.value}</span>;
  }
  if (value.type === 'date') {
    return <span className={TYPE_COLORS.date}>{value.value}</span>;
  }
  if (value.type === 'error') {
    return <span className={TYPE_COLORS.error}>Error: {value.value}</span>;
  }

  // Array
  if (value.type === 'array') {
    const items = value.value as SerializedValue[];
    if (items.length === 0) return <span className="text-zinc-400">[]</span>;

    // Short arrays of primitives render inline
    const allPrimitive = items.every((item: SerializedValue) =>
      ['string', 'number', 'boolean', 'null', 'undefined'].includes(item.type)
    );
    if (allPrimitive && items.length <= 5 && depth > 0) {
      return (
        <span className="text-zinc-300">
          [
          {items.map((item: SerializedValue, i: number) => (
            <span key={i}>
              <ConsoleValue value={item} depth={depth + 1} />
              {i < items.length - 1 && <span className="text-zinc-600">, </span>}
            </span>
          ))}
          ]
        </span>
      );
    }

    return (
      <span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-0.5 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
          <span className="text-zinc-400">
            Array({items.length})
          </span>
        </button>
        {expanded && (
          <div className="ml-4 border-l border-white/[0.06] pl-2 mt-0.5">
            {items.map((item: SerializedValue, i: number) => (
              <div key={i} className="flex gap-1.5">
                <span className="text-zinc-600 select-none flex-shrink-0">{i}:</span>
                <ConsoleValue value={item} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  // Object
  if (value.type === 'object') {
    const entries = Object.entries(value.value as Record<string, SerializedValue>);
    if (entries.length === 0) return <span className="text-zinc-400">{'{}'}</span>;

    return (
      <span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-0.5 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
          <span className="text-zinc-400">{'{…}'}</span>
        </button>
        {expanded && (
          <div className="ml-4 border-l border-white/[0.06] pl-2 mt-0.5">
            {entries.map(([key, val]) => (
              <div key={key} className="flex gap-1.5">
                <span className="text-purple-300 flex-shrink-0">{key}:</span>
                <ConsoleValue value={val} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  // Map
  if (value.type === 'map') {
    return (
      <span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-0.5 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
          <span className="text-zinc-400">Map({value.size})</span>
        </button>
        {expanded && (
          <div className="ml-4 border-l border-white/[0.06] pl-2 mt-0.5">
            {(value.value as [SerializedValue, SerializedValue][]).map(([k, v], i) => (
              <div key={i} className="flex gap-1.5">
                <ConsoleValue value={k} depth={depth + 1} />
                <span className="text-zinc-600">→</span>
                <ConsoleValue value={v} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  // Set
  if (value.type === 'set') {
    return (
      <span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-0.5 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {expanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
          <span className="text-zinc-400">Set({value.size})</span>
        </button>
        {expanded && (
          <div className="ml-4 border-l border-white/[0.06] pl-2 mt-0.5">
            {(value.value as SerializedValue[]).map((item, i) => (
              <div key={i}>
                <ConsoleValue value={item} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  return <span className="text-zinc-300">{String(value.value)}</span>;
}
