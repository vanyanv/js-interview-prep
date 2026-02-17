'use client';

import { useEffect, useState } from 'react';

export function KeyboardShortcut({ keys }: { keys: { mac: string[]; default: string[] } }) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes('MAC'));
  }, []);

  const displayKeys = isMac ? keys.mac : keys.default;

  return (
    <span className="inline-flex items-center gap-0.5 ml-2">
      {displayKeys.map((key, i) => (
        <kbd
          key={i}
          className="px-1.5 py-0.5 text-[10px] font-mono font-medium leading-none
            bg-white/[0.06] border border-white/[0.08] rounded text-zinc-400"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}
