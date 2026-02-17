'use client';

import React from 'react';
import { useStatus } from '@liveblocks/react';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function NetworkStatus() {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-[10px] font-medium border border-red-500/15">
          <WifiOff size={11} />
          <span>Offline</span>
        </div>
      }
    >
      <RealStatus />
    </ErrorBoundary>
  );
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
