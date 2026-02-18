/**
 * These tests import from ./broken — fix broken.ts to make them pass.
 * Do NOT modify this test file.
 */
import { describe, it, expect, vi } from 'vitest';
import { EventEmitter } from 'events';
import { UserNotificationService } from './broken';

function makeService(): { service: UserNotificationService; emitter: EventEmitter } {
  const emitter = new EventEmitter();
  emitter.setMaxListeners(100); // allow many listeners for testing
  const service = new UserNotificationService(emitter);
  return { service, emitter };
}

describe('UserNotificationService (fix memory leak in broken.ts)', () => {
  it('delivers notifications to a user during an active session', () => {
    const { service } = makeService();
    const received: string[] = [];

    const onNotification = (msg: string): void => { received.push(msg); };
    service.startSession('user-1', onNotification);
    service.sendNotification('user-1', 'Hello!');

    expect(received).toEqual(['Hello!']);
  });

  it('stops delivering notifications after endSession', () => {
    const { service } = makeService();
    const received: string[] = [];
    const onNotification = (msg: string): void => { received.push(msg); };

    service.startSession('user-1', onNotification);
    service.sendNotification('user-1', 'Before end');
    service.endSession('user-1', onNotification);
    service.sendNotification('user-1', 'After end'); // should NOT be received

    expect(received).toEqual(['Before end']);
  });

  it('listener count is 1 after a single startSession', () => {
    const { service } = makeService();
    const onNotification = vi.fn();

    service.startSession('user-1', onNotification);
    expect(service.getListenerCount('user-1')).toBe(1);
  });

  it('listener count returns to 0 after endSession', () => {
    const { service } = makeService();
    const onNotification = vi.fn();

    service.startSession('user-1', onNotification);
    service.endSession('user-1', onNotification);

    // The key test: memory leak fixed means listener count drops to 0
    expect(service.getListenerCount('user-1')).toBe(0);
  });

  it('multiple startSession calls do not accumulate listeners', () => {
    const { service } = makeService();
    const onNotification = vi.fn();

    // Simulating a component that mounts/unmounts and re-mounts
    service.startSession('user-1', onNotification);
    service.endSession('user-1', onNotification);
    service.startSession('user-1', onNotification);
    service.endSession('user-1', onNotification);
    service.startSession('user-1', onNotification);

    // Should only have 1 listener despite 3 startSession calls
    expect(service.getListenerCount('user-1')).toBe(1);
  });

  it('starting and ending 10 sessions does not accumulate listeners', () => {
    const { service } = makeService();

    for (let i = 0; i < 10; i++) {
      const onNotification = vi.fn();
      service.startSession('user-1', onNotification);
      service.endSession('user-1', onNotification);
    }

    expect(service.getListenerCount('user-1')).toBe(0);
  });

  it('different users have independent listener counts', () => {
    const { service } = makeService();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    service.startSession('user-1', fn1);
    service.startSession('user-2', fn2);

    expect(service.getListenerCount('user-1')).toBe(1);
    expect(service.getListenerCount('user-2')).toBe(1);

    service.endSession('user-1', fn1);
    expect(service.getListenerCount('user-1')).toBe(0);
    expect(service.getListenerCount('user-2')).toBe(1); // unaffected
  });

  it('sendNotification does not affect other users', () => {
    const { service } = makeService();
    const user1Msgs: string[] = [];
    const user2Msgs: string[] = [];

    service.startSession('user-1', (msg) => user1Msgs.push(msg));
    service.startSession('user-2', (msg) => user2Msgs.push(msg));

    service.sendNotification('user-1', 'For user 1');
    service.sendNotification('user-2', 'For user 2');

    expect(user1Msgs).toEqual(['For user 1']);
    expect(user2Msgs).toEqual(['For user 2']);
  });

  it('endSession is safe to call if session was never started', () => {
    const { service } = makeService();
    const fn = vi.fn();
    expect(() => service.endSession('nonexistent', fn)).not.toThrow();
  });
});
