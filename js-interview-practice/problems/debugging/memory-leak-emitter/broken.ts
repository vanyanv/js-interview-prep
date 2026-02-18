/**
 * DEBUGGING CHALLENGE — Memory Leak: Event Emitter
 *
 * UserNotificationService has a memory leak.
 * Event listeners are registered but never removed.
 *
 * Fix the bugs so that tests pass.
 * Do NOT modify the test file.
 *
 * Run tests:
 *   npx vitest run problems/debugging/memory-leak-emitter/memory-leak-emitter.test.ts
 */

import { EventEmitter } from 'events';

export class UserNotificationService {
  private readonly emitter: EventEmitter;
  // Bug: no storage for listener references — can't remove them later

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
  }

  /**
   * Start a user session and listen for notifications.
   * Bug: registers a new listener every call without removing old ones.
   */
  startSession(userId: string, onNotification: (msg: string) => void): void {
    this.emitter.on(`notification:${userId}`, onNotification);
    // Bug: the listener reference is not stored anywhere for cleanup
  }

  /**
   * Send a notification to a user.
   */
  sendNotification(userId: string, message: string): void {
    this.emitter.emit(`notification:${userId}`, message);
  }

  /**
   * End a user session and clean up listeners.
   * Bug: this does nothing — listeners are never removed.
   */
  endSession(userId: string, _onNotification: (msg: string) => void): void {
    // Bug: should remove the listener, but doesn't
    void userId;
  }

  /**
   * Get the current listener count for a user (for debugging/testing).
   */
  getListenerCount(userId: string): number {
    return this.emitter.listenerCount(`notification:${userId}`);
  }
}
