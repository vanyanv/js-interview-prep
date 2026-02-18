/**
 * ⚠️  SOLUTION FILE — Do not open until you've fixed broken.ts!
 * ─────────────────────────────────────────────────────────────────
 *
 * Fix: Store listener references in a Map so they can be removed.
 * The critical insight: EventEmitter.off() requires the SAME function reference.
 */

import { EventEmitter } from 'events';

export class UserNotificationService {
  private readonly emitter: EventEmitter;

  // Store listener references keyed by userId so we can remove them later
  // Maps userId → listener function
  private readonly listenerMap = new Map<string, (msg: string) => void>();

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
  }

  startSession(userId: string, onNotification: (msg: string) => void): void {
    // If there's already a listener for this user, remove it first
    // (prevents double-registration if startSession is called twice)
    this.endSession(userId, onNotification);

    // Store the reference so we can remove it later
    this.listenerMap.set(userId, onNotification);
    this.emitter.on(`notification:${userId}`, onNotification);
  }

  sendNotification(userId: string, message: string): void {
    this.emitter.emit(`notification:${userId}`, message);
  }

  endSession(userId: string, _onNotification: (msg: string) => void): void {
    const listener = this.listenerMap.get(userId);
    if (listener) {
      this.emitter.off(`notification:${userId}`, listener);
      this.listenerMap.delete(userId);
    }
  }

  getListenerCount(userId: string): number {
    return this.emitter.listenerCount(`notification:${userId}`);
  }
}
