'use client';

import React from 'react';
import { useStatus } from '@liveblocks/react';
import { useRoom } from '@liveblocks/react/suspense';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

export default function NetworkStatus() {
  // Check if Liveblocks context is available
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRoom();
    return <RealStatus />;
  } catch {
    // No RoomProvider in tree — collaboration disabled
    return null;
  }
}

function RealStatus() {
  const status = useStatus();

  if (status === 'connected') {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-[10px] font-medium border border-green-500/15">
        <Wifi size={11} />
        <span>Live</span>
      </div>
    );
  }

  if (status === 'reconnecting' || status === 'connecting') {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-medium border border-amber-500/15">
        <Loader2 size={11} className="animate-spin" />
        <span>{status === 'connecting' ? 'Connecting' : 'Reconnecting'}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-500 text-[10px] font-medium border border-zinc-700">
      <WifiOff size={11} />
      <span>Disconnected</span>
    </div>
  );
}
