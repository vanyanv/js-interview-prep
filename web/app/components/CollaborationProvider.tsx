'use client';

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { ReactNode } from 'react';

// In a real app, you would use an auth endpoint. 
// For this MVP, we use a public key.
const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;

export function CollaborationProvider({ children, roomId }: { children: ReactNode, roomId: string }) {
  if (!PUBLIC_API_KEY) {
    // Fallback if no key is provided, just render children without collab
    console.warn('NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set. Collaboration disabled.');
    return <>{children}</>;
  }

  return (
    <LiveblocksProvider publicApiKey={PUBLIC_API_KEY}>
      <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={<div>Loading collaboration...</div>}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
