'use client';

import React, { useState } from 'react';
import { useOthers, useSelf } from '@liveblocks/react/suspense';
import { motion, AnimatePresence } from 'framer-motion';

class AvatarErrorBoundary extends React.Component<
  { children: React.ReactNode },
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
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function AvatarStack() {
  const others = useOthers();
  const self = useSelf();
  const [showPopover, setShowPopover] = useState(false);

  if (others.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowPopover(!showPopover)}
        className="flex items-center -space-x-1.5 hover:opacity-90 transition-opacity"
      >
        {others.slice(0, 3).map((user) => {
          const color = user.info?.color || '#3b82f6';
          const name = user.info?.name || 'User';
          return (
            <motion.div
              key={user.connectionId}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-[#09090b]"
              style={{ backgroundColor: color }}
              title={name}
            >
              {name[0].toUpperCase()}
            </motion.div>
          );
        })}
        {others.length > 3 && (
          <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[9px] font-medium text-zinc-300 ring-2 ring-[#09090b]">
            +{others.length - 3}
          </div>
        )}
      </button>

      <AnimatePresence>
        {showPopover && (
          <>
            {/* Click-away backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowPopover(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 w-52 rounded-xl border border-white/[0.08] bg-[#18181b] backdrop-blur-xl p-3 shadow-2xl z-50"
            >
              <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest mb-2.5">
                In this room
              </p>

              {/* Self */}
              {self && (
                <div className="flex items-center gap-2.5 py-1.5">
                  <div
                    className="w-5 h-5 rounded-full text-[8px] font-bold flex items-center justify-center text-white"
                    style={{ backgroundColor: self.info?.color || '#3b82f6' }}
                  >
                    {(self.info?.name || 'You')[0].toUpperCase()}
                  </div>
                  <span className="text-xs text-zinc-300">
                    {self.info?.name || 'You'}
                  </span>
                  <span className="text-[10px] text-zinc-600 ml-auto">you</span>
                </div>
              )}

              {/* Others */}
              {others.map((user) => (
                <div key={user.connectionId} className="flex items-center gap-2.5 py-1.5">
                  <div
                    className="w-5 h-5 rounded-full text-[8px] font-bold flex items-center justify-center text-white"
                    style={{ backgroundColor: user.info?.color || '#3b82f6' }}
                  >
                    {(user.info?.name || '?')[0].toUpperCase()}
                  </div>
                  <span className="text-xs text-zinc-300">
                    {user.info?.name || 'Anonymous'}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 ml-auto" />
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CollaborationAvatars() {
  return (
    <AvatarErrorBoundary>
      <AvatarStack />
    </AvatarErrorBoundary>
  );
}
