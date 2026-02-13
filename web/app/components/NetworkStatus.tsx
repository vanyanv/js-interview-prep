'use client';

import React, { useEffect, useState } from 'react';
import { useStatus } from '@liveblocks/react'; 
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

class ErrorBoundary extends React.Component<{fallback: React.ReactNode, children: React.ReactNode}, {hasError: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

export default function NetworkStatus() {
  return (
      <ErrorBoundary fallback={
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-medium border border-red-500/20" title="Missing API Key or Room Context">
            <WifiOff size={14} />
            <span>Offline</span>
        </div>
      }>
        <RealStatus />
      </ErrorBoundary>
  );
}

function RealStatus() {
    const status = useStatus();

    if (status === 'connected') {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
                <Wifi size={14} />
                <span>Live</span>
            </div>
        );
    }
    
    if (status === 'reconnecting' || status === 'connecting') {
        return (
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium border border-yellow-500/20">
                <Loader2 size={14} className="animate-spin" />
                <span>{status === 'connecting' ? 'Connecting...' : 'Reconnecting...'}</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-700 text-slate-400 text-xs font-medium border border-slate-600">
            <WifiOff size={14} />
            <span>Disconnected</span>
        </div>
    );
}
